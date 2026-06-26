#!/usr/bin/env python3
"""Resolve ~/.knowledge/online-docs/REFERENCE.json mappings with fzf.

Usage:
  python3 scripts/resolve-reference.py react "Node docs" vite

Prints JSON with confident fuzzy matches only in ``matches``.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

FIELD_SEP = "\x1f"
REFERENCE_PATH = Path.home() / ".knowledge" / "online-docs" / "REFERENCE.json"
NOISE_TOKENS = {
    "doc",
    "docs",
    "documentation",
    "guide",
    "guides",
    "manual",
    "official",
    "reference",
    "references",
}


@dataclass(frozen=True)
class Entry:
    key: str
    value: str
    aliases: tuple[str, ...]


@dataclass(frozen=True)
class FzfMatch:
    entry: Entry
    alias: str


def normalize(text: str) -> str:
    text = unicodedata.normalize("NFKC", text).casefold()
    text = text.replace("&", " and ")
    text = re.sub(r"[’'`]+", "", text)
    text = re.sub(r"[^\w]+", " ", text, flags=re.UNICODE)
    text = text.replace("_", " ")
    return re.sub(r"\s+", " ", text).strip()


def compact(text: str) -> str:
    return normalize(text).replace(" ", "")


def split_aliases(key: str, extra_aliases: tuple[str, ...] = ()) -> tuple[str, ...]:
    aliases: list[str] = []

    def add(alias: str) -> None:
        alias = alias.strip()
        if alias and alias not in aliases:
            aliases.append(alias)

    add(key)
    # Split human alias rows like "oxc / oxfmt / oxlint" without splitting
    # package scopes like "shadcn/ui" or "@scope/pkg".
    for part in re.split(r"\s+(?:/|\||,|;)\s+", key):
        add(part)
    for alias in extra_aliases:
        add(alias)
    return tuple(aliases)


def query_variants(candidate: str) -> list[str]:
    raw = candidate.strip()
    variants: list[str] = []

    def add(value: str) -> None:
        value = value.strip()
        if value and value not in variants:
            variants.append(value)

    add(raw)
    normalized = normalize(raw)
    if normalized:
        tokens = normalized.split()
        stripped = " ".join(token for token in tokens if token not in NOISE_TOKENS)
        add(stripped)
        add(compact(stripped))
    return variants


def is_remote(value: str) -> bool:
    parsed = urlparse(value)
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


def entry_to_json(match: FzfMatch, *, candidate: str, query: str, confidence: str) -> dict[str, Any]:
    entry = match.entry
    return {
        "candidate": candidate,
        "key": entry.key,
        "value": entry.value,
        "resolved_value": entry.value,
        "source": "knowledge",
        "reference_path": str(REFERENCE_PATH),
        "matched_alias": match.alias,
        "query": query,
        "confidence": confidence,
    }


def extract_mapping_value(key: str, value: Any) -> tuple[str, tuple[str, ...]]:
    if isinstance(value, str):
        return value, ()

    # Optional extension for aliases while keeping key -> location as core model:
    # {"react": {"location": "https://react.dev/llms.txt", "aliases": ["react docs"]}}
    if isinstance(value, dict):
        location = value.get("location") or value.get("url") or value.get("path")
        aliases = value.get("aliases", ())
        if not isinstance(location, str) or not location.strip():
            raise SystemExit(f"{REFERENCE_PATH}: mapping for {key!r} needs string location/url/path")
        if isinstance(aliases, str):
            aliases = (aliases,)
        elif isinstance(aliases, list) and all(isinstance(alias, str) for alias in aliases):
            aliases = tuple(aliases)
        elif aliases in (None, ()):  # tolerate missing/null aliases
            aliases = ()
        else:
            raise SystemExit(f"{REFERENCE_PATH}: aliases for {key!r} must be string or string list")
        return location, tuple(aliases)

    raise SystemExit(f"{REFERENCE_PATH}: mapping for {key!r} must be string or object")


def load_entries() -> tuple[list[Entry], bool]:
    if not REFERENCE_PATH.exists():
        return [], False

    try:
        data = json.loads(REFERENCE_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        raise SystemExit(f"{REFERENCE_PATH}: invalid JSON: {error}") from error
    except OSError as error:
        raise SystemExit(f"{REFERENCE_PATH}: failed to read: {error}") from error

    if not isinstance(data, dict):
        raise SystemExit(f"{REFERENCE_PATH}: expected top-level JSON object")

    entries: list[Entry] = []
    for key, raw_value in data.items():
        if not isinstance(key, str) or not key.strip():
            raise SystemExit(f"{REFERENCE_PATH}: mapping keys must be non-empty strings")
        value, extra_aliases = extract_mapping_value(key, raw_value)
        if not is_remote(value):
            raise SystemExit(
                f"{REFERENCE_PATH}: online-docs mapping for {key!r} must be an http(s) URL"
            )
        entries.append(Entry(key=key, value=value, aliases=split_aliases(key, extra_aliases)))

    return sorted(entries, key=lambda entry: normalize(entry.key)), True


def collect_candidates(args: argparse.Namespace) -> list[str]:
    candidates = list(args.candidates)

    if args.candidate_file:
        try:
            candidates.extend(
                line.strip()
                for line in Path(args.candidate_file).read_text(encoding="utf-8").splitlines()
                if line.strip()
            )
        except OSError as error:
            raise SystemExit(f"{args.candidate_file}: failed to read: {error}") from error

    if not candidates and not sys.stdin.isatty():
        candidates.extend(line.strip() for line in sys.stdin if line.strip())

    seen: set[str] = set()
    unique: list[str] = []
    for candidate in candidates:
        if candidate not in seen:
            seen.add(candidate)
            unique.append(candidate)
    return unique


def build_fzf_records(entries: list[Entry]) -> tuple[list[str], dict[str, FzfMatch]]:
    records: list[str] = []
    by_id: dict[str, FzfMatch] = {}
    record_id = 0
    for entry in entries:
        for alias in entry.aliases:
            clean_alias = alias.replace(FIELD_SEP, " ").replace("\n", " ")
            clean_key = entry.key.replace(FIELD_SEP, " ").replace("\n", " ")
            record_key = str(record_id)
            record_id += 1
            records.append(FIELD_SEP.join((clean_alias, clean_key, record_key)))
            by_id[record_key] = FzfMatch(entry=entry, alias=alias)
    return records, by_id


def fzf_filter(query: str, records: list[str], by_id: dict[str, FzfMatch]) -> list[FzfMatch]:
    if not records:
        return []

    command = [
        "fzf",
        "--filter",
        query,
        "--sync",
        "--scheme=default",
        "--tiebreak=length,index",
        "--delimiter",
        FIELD_SEP,
        "--nth",
        "1",
    ]
    completed = subprocess.run(
        command,
        input="\n".join(records) + "\n",
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        check=False,
    )
    if completed.returncode not in (0, 1):
        raise SystemExit(completed.stderr.strip() or f"fzf failed with exit code {completed.returncode}")

    matches: list[FzfMatch] = []
    for line in completed.stdout.splitlines():
        parts = line.split(FIELD_SEP)
        if len(parts) != 3:
            continue
        match = by_id.get(parts[2])
        if match:
            matches.append(match)
    return matches


def collapse_by_entry(matches: list[FzfMatch]) -> list[FzfMatch]:
    seen: set[str] = set()
    collapsed: list[FzfMatch] = []
    for match in matches:
        identity = normalize(match.entry.key)
        if identity in seen:
            continue
        seen.add(identity)
        collapsed.append(match)
    return collapsed


def exact_match(query: str, match: FzfMatch) -> bool:
    query_norm = normalize(query)
    query_compact = compact(query)
    values = (match.alias, match.entry.key)
    return any(query_norm == normalize(value) or query_compact == compact(value) for value in values)


def resolve_candidate(
    candidate: str,
    records: list[str],
    by_id: dict[str, FzfMatch],
) -> tuple[dict[str, Any] | None, list[FzfMatch]]:
    best_alternatives: list[FzfMatch] = []

    for query in query_variants(candidate):
        matches = collapse_by_entry(fzf_filter(query, records, by_id))
        if not matches:
            continue

        exact_matches = [match for match in matches if exact_match(query, match)]
        if len(exact_matches) == 1:
            match = exact_matches[0]
            return entry_to_json(match, candidate=candidate, query=query, confidence="exact"), matches[1:4]

        if len(matches) == 1:
            match = matches[0]
            return entry_to_json(match, candidate=candidate, query=query, confidence="single-fzf-match"), []

        if not best_alternatives:
            best_alternatives = matches[:4]

    return None, best_alternatives


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Resolve online-docs mappings via fzf.")
    parser.add_argument("candidates", nargs="*", help="Candidate names to fuzzy-match.")
    parser.add_argument("--candidate-file", help="Newline-delimited candidate names.")
    return parser.parse_args()


def main() -> int:
    if not shutil.which("fzf"):
        raise SystemExit("fzf not found on PATH; install fzf or add it to PATH")

    args = parse_args()
    candidates = collect_candidates(args)
    entries, loaded_reference = load_entries()
    records, by_id = build_fzf_records(entries)

    matches: list[dict[str, Any]] = []
    unmatched: list[str] = []
    ambiguous: list[dict[str, Any]] = []

    for candidate in candidates:
        result, alternatives = resolve_candidate(candidate, records, by_id)
        if result:
            matches.append(result)
        elif alternatives:
            ambiguous.append(
                {
                    "candidate": candidate,
                    "alternatives": [
                        {
                            "key": alternative.entry.key,
                            "value": alternative.entry.value,
                            "resolved_value": alternative.entry.value,
                            "source": "knowledge",
                            "reference_path": str(REFERENCE_PATH),
                            "matched_alias": alternative.alias,
                        }
                        for alternative in alternatives
                    ],
                }
            )
        else:
            unmatched.append(candidate)

    print(
        json.dumps(
            {
                "reference_files": [str(REFERENCE_PATH)] if loaded_reference else [],
                "search_tool": "fzf",
                "matches": matches,
                "ambiguous": ambiguous,
                "unmatched": unmatched,
            },
            ensure_ascii=False,
            indent=2,
            sort_keys=False,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
