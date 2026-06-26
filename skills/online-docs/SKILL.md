---
name: online-docs
description: "Online docs index. Use when needing current package/product/API docs: resolve source in the docs index, cache exact URLs, then read selected docs. Read by default; write only when user explicitly says `online-docs write`."
---

# Online Docs

A cross-project indexed, cached path to remote documentation. Use it for
online package, product, API, SDK, and framework docs. Use `domains` for
cross-project domain knowledge.

Two modes, picked by argument: **read** (default) and **write**. Never enter
write mode unless the user explicitly asks for `online-docs write` or says
to add/update the online docs index.

## Index locations

Resolver precedence, highest last write wins:

1. Bundled seed: `REFERENCE.json` in this skill directory
2. Cross-project index: `~/.knowledge/online-docs/REFERENCE.json`

The cross-project index overrides bundled entries.

Mapping format:

```json
{
  "react": "https://react.dev/llms.txt",
  "hey-api": {
    "location": "https://heyapi.dev/llms.txt",
    "aliases": ["@hey-api/openapi-ts"]
  }
}
```

Values must be exact `http(s)` documentation entrypoints. Do not infer URL
conventions, append filenames, assume `llms.txt`, or guess arbitrary docs
roots.

## read

Resolve, cache, then inspect only selected docs.

1. Identify source identity separately from topic terms. Pass one docs
   source/package/product per resolver argument; do not pass action words or
   whole task phrases. Preserve package punctuation when possible
   (`hey-api`, `@hey-api/openapi-ts`, `shadcn/ui`).
2. Run resolver from this skill directory:
   ```bash
   python3 scripts/resolve-reference.py react Node.js vite
   ```
   Use only `matches[].resolved_value` as confident source URLs. For
   `ambiguous`, ask or refine candidate. For `unmatched`, ask for a docs
   URL or use training-data knowledge only if acceptable; do not invent a
   URL.
3. Fetch the exact matched entrypoint into the deterministic persistent
   cache:
   ```bash
   python3 scripts/cache-url.py "https://example.com/docs"
   ```
   Default cache root is `~/.cache/online-docs`. Cache hits return the
   existing content path without network. If the user asks for latest docs,
   use `--refresh`; if freshness matters but latest was not explicitly
   requested, use a bounded revalidation such as `--max-age-hours 24`.
4. Inspect the cached file. If it is an index (`llms.txt`, Markdown link
   list, HTML nav, JSON catalog), search that index for the user's topic and
   fetch only selected follow-up links from explicit links in the cached
   source. Resolve relative links with the page's final URL as base (read
   `final-url.txt` or `metadata.json` beside the cached content if redirects
   occurred):
   ```bash
   python3 scripts/cache-url.py --base "https://example.com/docs/" "./api"
   ```
5. Read only relevant cached files. Cite the docs source and cache path when
   useful. Do not crawl whole sites unless the user asks.

**Done when** the relevant source has been resolved, the needed URLs are
cached, selected docs have been read, and either the answer uses those docs
or no indexed online docs are available.

## cache discipline

The cache is optimized for repeat runs:

- Cache key is the canonical URL: resolved base, no fragment, normalized
  scheme/host/port.
- Default read is cache-first and persistent across sessions.
- `--refresh` and stale `--max-age-hours` runs send `If-None-Match` and
  `If-Modified-Since` when previous `ETag` or `Last-Modified` exists.
- `304 Not Modified` reuses bytes and updates metadata; it does not
  re-download content.
- Cache writes are part of read mode. Index writes still require explicit
  `online-docs write`.

## write

Add or update an online docs mapping only on explicit user request. Arg:
`write`.

1. **Explicit gate** — proceed only if the current user request explicitly
   asks for `online-docs write`, or says to add/update the online docs index.
   Otherwise do not write; ask for explicit confirmation if needed.
2. **Gate** — record only reusable cross-project documentation entrypoints:
   official docs, official `llms.txt`, vendor API references, repository
   docs, or user-approved docs URLs. Values must be exact `http(s)` URLs.
3. **Dedup** — run `scripts/resolve-reference.py` for the source name and
   aliases. If a mapping already covers it, update that mapping in place;
   do not append a duplicate.
4. **Write JSON** to `~/.knowledge/online-docs/REFERENCE.json` using the
   mapping format above. Preserve existing entries and aliases. Prefer
   object form when aliases are useful.
5. **Verify** by resolving the name and fetching the URL:
   ```bash
   python3 scripts/resolve-reference.py <name-or-alias>
   python3 scripts/cache-url.py <resolved-url>
   ```

**Done when** `~/.knowledge/online-docs/REFERENCE.json` contains the
deduplicated mapping, resolver finds it, cache fetch succeeds or reuses
valid cached content, and no non-explicit index write was made.
