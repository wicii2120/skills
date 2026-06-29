# online-docs

Indexed, cached path to remote documentation. Use for online package,
product, API, SDK, and framework docs. Use `domains` for cross-project
domain knowledge.

Cache script paths are relative to this skill directory; resolve them to
absolute paths when running from another cwd.

Source of truth: `~/.knowledge/online-docs/REFERENCE.md`. Do not add
alternate indexes.

Mapping format:

```markdown
## react

location: https://react.dev/llms.txt

aliases:
- react docs

## hey-api

location: https://heyapi.dev/llms.txt

aliases:
- @hey-api/openapi-ts
```

`location:` values must be exact `http(s)` documentation entrypoints. Do not
infer URL conventions, append filenames, assume `llms.txt`, or guess docs
roots.

## read

Resolve, cache, then inspect only selected docs.

1. Identify source identity separately from topic terms. Resolve one docs
   source/package/product at a time; do not use action words or whole task
   phrases as identities. Preserve package punctuation when possible
   (`hey-api`, `@hey-api/openapi-ts`, `shadcn/ui`).
2. Read `~/.knowledge/online-docs/REFERENCE.md` and resolve by heading or
   `aliases`. Use a mapping only when one entry is clearly intended. For
   ambiguous candidates, ask or refine. For unmatched candidates, ask for a
   docs URL or use training-data knowledge only if acceptable; do not invent
   a URL.
3. Fetch each resolved entrypoint into the deterministic persistent
   cache:
   ```bash
   python3 scripts/cache-url.py "https://example.com/docs"
   ```
   Default cache root is `~/.cache/online-docs`. Cached entries are reused
   for 14 days by default, then conditionally revalidated. If the user asks
   for latest docs, use `--refresh`. Override freshness with
   `--max-age-hours N` when needed.
4. Inspect the cached file. If it is an index (`llms.txt`, Markdown link
   list, HTML nav, JSON catalog), search that index for the user's topic and
   fetch only selected follow-up links from explicit links in the cached
   source. Resolve relative links with the page's final URL as base (read
   `final-url.txt` or `metadata.json` beside cached content if redirects
   occurred):
   ```bash
   python3 scripts/cache-url.py --base "https://example.com/docs/" "./api"
   ```
5. Read only relevant cached files. Cite docs source and cache path when
   useful. Do not crawl whole sites unless the user asks.

**Done when** relevant source has been resolved, needed URLs are cached,
selected docs have been read, and either the answer uses those docs or no
indexed online docs are available.

## cache discipline

Cache writes are read-mode side effects; index writes still require the
write gate.

- Cache key is canonical URL: resolved base, no fragment, normalized
  scheme/host/port.
- Default read is cache-first and persistent across sessions, with 14-day
  stale revalidation.
- `--refresh` and stale `--max-age-hours` runs send `If-None-Match` and
  `If-Modified-Since` when previous `ETag` or `Last-Modified` exists.
- `304 Not Modified` reuses bytes and updates metadata; it does not
  re-download content.

## write

Write only if the current user request explicitly asks for
`online-docs write`, or says to add/update the online docs index.

1. Record only reusable cross-project documentation entrypoints: official
   docs, official `llms.txt`, vendor API references, repository docs, or
   user-approved docs URLs. Values must be exact `http(s)` URLs.
2. Dedup by inspecting existing headings and `aliases` for the source name
   and aliases. If a mapping already covers it, update that mapping in
   place; do not append a duplicate.
3. Write Markdown to `~/.knowledge/online-docs/REFERENCE.md`, using the
   mapping format above. Preserve existing entries and aliases.
4. Verify by re-reading the Markdown and fetching the URL:
   ```bash
   python3 scripts/cache-url.py <resolved-url>
   ```

**Done when** `~/.knowledge/online-docs/REFERENCE.md` contains the
deduplicated mapping, agent resolution finds it by heading or alias, cache
fetch succeeds or reuses valid cached content, and no non-explicit index
write was made.
