#!/usr/bin/env python3
"""Fetch one remote documentation URL into a deterministic persistent cache.

Usage:
  python3 scripts/cache-url.py [--refresh] [--max-age-hours N] [--base URL] URL

Prints cached content path on stdout by default. Use --json for metadata.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable
from urllib.error import HTTPError, URLError
from urllib.parse import urldefrag, urljoin, urlparse, urlunparse
from urllib.request import Request, urlopen

TEXT_EXTENSIONS = {
    ".css",
    ".csv",
    ".html",
    ".js",
    ".json",
    ".jsx",
    ".md",
    ".mdx",
    ".rss",
    ".svg",
    ".toml",
    ".ts",
    ".tsx",
    ".txt",
    ".xml",
    ".yaml",
    ".yml",
}

DEFAULT_MAX_AGE_HOURS = 14 * 24

CONTENT_TYPE_EXTENSIONS = {
    "application/javascript": ".js",
    "application/json": ".json",
    "application/ld+json": ".json",
    "application/markdown": ".md",
    "application/rss+xml": ".xml",
    "application/xml": ".xml",
    "text/css": ".css",
    "text/csv": ".csv",
    "text/html": ".html",
    "text/javascript": ".js",
    "text/markdown": ".md",
    "text/plain": ".txt",
    "text/xml": ".xml",
}


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def parse_time(value: Any) -> datetime | None:
    if not isinstance(value, str) or not value:
        return None
    try:
        parsed = datetime.fromisoformat(value)
    except ValueError:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def canonical_url(raw_url: str, base: str | None = None) -> str:
    """Resolve, strip fragment, and normalize scheme/host for cache key."""
    resolved = urljoin(base, raw_url) if base else raw_url
    resolved, _fragment = urldefrag(resolved)
    parsed = urlparse(resolved)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise SystemExit(f"Expected http(s) URL, got: {raw_url}")

    scheme = parsed.scheme.lower()
    netloc = parsed.netloc.lower()
    if scheme == "http" and netloc.endswith(":80"):
        netloc = netloc[:-3]
    if scheme == "https" and netloc.endswith(":443"):
        netloc = netloc[:-4]

    path = parsed.path or "/"
    return urlunparse((scheme, netloc, path, "", parsed.query, ""))


def safe_slug(parts: Iterable[str], max_len: int = 80) -> str:
    text = "-".join(part for part in parts if part)
    text = re.sub(r"[^A-Za-z0-9._-]+", "-", text).strip("-._")
    text = re.sub(r"-+", "-", text)
    return (text[:max_len].strip("-._") or "root").lower()


def cache_dir_for(url: str, cache_root: Path) -> Path:
    parsed = urlparse(url)
    digest = hashlib.sha256(url.encode("utf-8")).hexdigest()[:16]
    slug = safe_slug([parsed.netloc, parsed.path.replace("/", "-")])
    return cache_root / f"{slug}-{digest}"


def extension_for(url: str, content_type: str | None) -> str:
    suffix = Path(urlparse(url).path).suffix.lower()
    if suffix in TEXT_EXTENSIONS:
        return suffix

    media_type = (content_type or "").split(";", 1)[0].strip().lower()
    if media_type in CONTENT_TYPE_EXTENSIONS:
        return CONTENT_TYPE_EXTENSIONS[media_type]
    if media_type.startswith("text/"):
        return ".txt"
    return ".bin"


def read_metadata(entry_dir: Path) -> dict[str, Any] | None:
    metadata_path = entry_dir / "metadata.json"
    if not metadata_path.exists():
        return None
    try:
        data = json.loads(metadata_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None
    return data if isinstance(data, dict) else None


def write_metadata(entry_dir: Path, metadata: dict[str, Any]) -> None:
    entry_dir.mkdir(parents=True, exist_ok=True)
    (entry_dir / "metadata.json").write_text(
        json.dumps(metadata, indent=2, sort_keys=True), encoding="utf-8"
    )


def cached_content_path(entry_dir: Path, metadata: dict[str, Any] | None = None) -> Path | None:
    metadata = metadata or read_metadata(entry_dir)
    if not metadata:
        return None
    content_name = metadata.get("content_file")
    if not isinstance(content_name, str):
        return None
    content_path = entry_dir / content_name
    return content_path if content_path.exists() else None


def cache_is_fresh(metadata: dict[str, Any] | None, max_age_hours: float | None) -> bool:
    if max_age_hours is None:
        return True
    checked_at = parse_time(metadata.get("checked_at") if metadata else None)
    if checked_at is None:
        checked_at = parse_time(metadata.get("fetched_at") if metadata else None)
    if checked_at is None:
        return False
    age_hours = (datetime.now(timezone.utc) - checked_at).total_seconds() / 3600
    return age_hours <= max_age_hours


def request_headers(metadata: dict[str, Any] | None) -> dict[str, str]:
    headers = {
        # Keep Accept neutral. Some docs hosts use text/markdown as a
        # content-negotiation signal and redirect /llms.txt to unavailable
        # Markdown variants.
        "Accept": "*/*",
        "User-Agent": "online-docs-skill/1.0",
    }
    if metadata:
        etag = metadata.get("etag")
        last_modified = metadata.get("last_modified")
        if isinstance(etag, str) and etag:
            headers["If-None-Match"] = etag
        if isinstance(last_modified, str) and last_modified:
            headers["If-Modified-Since"] = last_modified
    return headers


def headers_dict(headers: Any) -> dict[str, str]:
    return {key: value for key, value in headers.items()}


def header_value(headers: dict[str, str], name: str) -> str | None:
    lower = name.lower()
    for key, value in headers.items():
        if key.lower() == lower:
            return value
    return None


def hash_bytes(body: bytes) -> str:
    return hashlib.sha256(body).hexdigest()


def write_http_sidecars(entry_dir: Path, url: str, final_url: str, headers: dict[str, str]) -> None:
    (entry_dir / "url.txt").write_text(f"{url}\n", encoding="utf-8")
    (entry_dir / "final-url.txt").write_text(f"{final_url}\n", encoding="utf-8")
    (entry_dir / "headers.json").write_text(
        json.dumps(headers, indent=2, sort_keys=True), encoding="utf-8"
    )


def fetch(url: str, entry_dir: Path, previous: dict[str, Any] | None) -> tuple[Path, dict[str, Any]]:
    entry_dir.mkdir(parents=True, exist_ok=True)
    request = Request(url, headers=request_headers(previous))

    try:
        with urlopen(request, timeout=30) as response:
            body = response.read()
            final_url = response.geturl()
            headers = headers_dict(response.headers)
            status = getattr(response, "status", None)
    except HTTPError as error:
        existing_path = cached_content_path(entry_dir, previous)
        if error.code == 304 and existing_path is not None and previous is not None:
            headers = headers_dict(error.headers)
            merged = dict(previous)
            merged.update(
                {
                    "cache_status": "not-modified",
                    "checked_at": now_iso(),
                    "http_status": 304,
                    "etag": header_value(headers, "ETag") or previous.get("etag"),
                    "last_modified": header_value(headers, "Last-Modified")
                    or previous.get("last_modified"),
                }
            )
            write_metadata(entry_dir, merged)
            return existing_path, merged
        raise SystemExit(f"HTTP {error.code} fetching {url}: {error.reason}") from error
    except URLError as error:
        raise SystemExit(f"Failed fetching {url}: {error.reason}") from error

    content_type = header_value(headers, "Content-Type")
    extension = extension_for(final_url, content_type)
    content_path = entry_dir / f"content{extension}"
    content_path.write_bytes(body)
    write_http_sidecars(entry_dir, url, final_url, headers)

    fetched_at = now_iso()
    metadata = {
        "cache_status": "fetched" if previous is None else "refreshed",
        "checked_at": fetched_at,
        "content_file": content_path.name,
        "content_sha256": hash_bytes(body),
        "content_type": content_type,
        "etag": header_value(headers, "ETag"),
        "expires": header_value(headers, "Expires"),
        "fetched_at": fetched_at,
        "final_url": final_url,
        "http_date": header_value(headers, "Date"),
        "http_status": status,
        "last_modified": header_value(headers, "Last-Modified"),
        "url": url,
    }
    write_metadata(entry_dir, metadata)
    return content_path, metadata


def output(path: Path, metadata: dict[str, Any], as_json: bool) -> None:
    if not as_json:
        print(path)
        return
    payload = dict(metadata)
    payload["content_path"] = str(path)
    payload["entry_dir"] = str(path.parent)
    print(json.dumps(payload, indent=2, sort_keys=True))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("url", help="Remote URL to fetch. May be relative if --base is provided.")
    parser.add_argument("--base", help="Base URL for resolving relative URL argument.")
    parser.add_argument(
        "--cache-root",
        default=os.environ.get("ONLINE_DOCS_CACHE", str(Path.home() / ".cache" / "online-docs")),
        help="Cache root. Defaults to ~/.cache/online-docs or ONLINE_DOCS_CACHE.",
    )
    parser.add_argument("--refresh", action="store_true", help="Revalidate/fetch even if cached content exists.")
    parser.add_argument(
        "--max-age-hours",
        type=float,
        default=DEFAULT_MAX_AGE_HOURS,
        help="Revalidate when cached metadata was last checked more than N hours ago. Defaults to 336 (14 days).",
    )
    parser.add_argument("--json", action="store_true", help="Print metadata JSON instead of content path.")
    args = parser.parse_args()

    url = canonical_url(args.url, args.base)
    entry_dir = cache_dir_for(url, Path(args.cache_root).expanduser())
    metadata = read_metadata(entry_dir)
    content_path = cached_content_path(entry_dir, metadata)

    if content_path is not None and not args.refresh and cache_is_fresh(metadata, args.max_age_hours):
        cached = dict(metadata or {})
        cached["cache_status"] = "hit"
        output(content_path, cached, args.json)
        return 0

    content_path, metadata = fetch(url, entry_dir, metadata)
    output(content_path, metadata, args.json)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
