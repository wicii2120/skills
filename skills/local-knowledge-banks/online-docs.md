# online-docs

Project-local docs mapping and cache for the current repo. Use it for docs
entrypoints this project depends on, especially private docs, pinned vendor
docs, or project-approved docs sources.

Cache script paths are relative to this skill directory; resolve them to
absolute paths when running from another cwd.

Source of truth: `.agents/knowledge/online-docs/REFERENCE.md`. Do not add
alternate local indexes.

Cache root: `.agents/knowledge/online-docs/cache/`

Mapping format:

```markdown
## react

location: https://react.dev/llms.txt

aliases:
- react docs

## internal-api

location: https://docs.example.invalid/api

aliases:
- project api docs
```

`location:` values must be exact `http(s)` documentation entrypoints. Do not
infer URL conventions, append filenames, assume `llms.txt`, or guess docs
roots.

## read

Resolve, cache locally, then inspect only selected docs.

1. Identify source identity separately from topic terms. Resolve one docs
   source/package/product at a time; do not use action words or whole task
   phrases as identities. Preserve package punctuation when possible
   (`hey-api`, `@hey-api/openapi-ts`, `shadcn/ui`).
2. If `.agents/knowledge/online-docs/REFERENCE.md` does not exist, say no
   local docs mapping exists; do not create it.
3. Read `.agents/knowledge/online-docs/REFERENCE.md` and resolve by heading
   or `aliases`. Use a mapping only when one entry is clearly intended. For
   ambiguous candidates, ask or refine. For unmatched candidates, say no
   local docs mapping exists for that source; do not invent a URL.
4. Fetch each resolved entrypoint into the project-local cache:
   ```bash
   python3 scripts/cache-url.py \
     --cache-root .agents/knowledge/online-docs/cache \
     "https://example.com/docs"
   ```
   Cached entries are reused for 14 days by default, then conditionally
   revalidated. If the user asks for latest docs, use `--refresh`. Override
   freshness with `--max-age-hours N` when needed.
5. Inspect the cached file. If it is an index (`llms.txt`, Markdown link
   list, HTML nav, JSON catalog), search that index for the user's topic and
   fetch only selected follow-up links from explicit links in the cached
   source. Resolve relative links with the page's final URL as base (read
   `final-url.txt` or `metadata.json` beside cached content if redirects
   occurred):
   ```bash
   python3 scripts/cache-url.py \
     --cache-root .agents/knowledge/online-docs/cache \
     --base "https://example.com/docs/" \
     "./api"
   ```
6. Read only relevant cached files. Cite docs source and cache path when
   useful. Do not crawl whole sites unless the user asks.

**Done when** the local source has been resolved, needed URLs are cached
under `.agents/knowledge/online-docs/cache/`, selected docs have been read,
and either the answer uses those docs or no local docs mapping exists.

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

Write only if the current user request explicitly asks for local/project
`online-docs write`, or says to add/update the project docs index in
`.agents/knowledge`.

1. Record only reusable current-repo documentation entrypoints: official
   docs, official `llms.txt`, vendor API references, repository docs,
   private docs, or user-approved docs URLs. Values must be exact
   `http(s)` URLs.
2. Dedup by inspecting existing headings and `aliases` for the source name
   and aliases. If a mapping already covers it, update that mapping in
   place; do not append a duplicate.
3. Write Markdown to `.agents/knowledge/online-docs/REFERENCE.md`, using
   the mapping format above. Preserve existing entries and aliases.
4. Verify by re-reading the Markdown and fetching the URL:
   ```bash
   python3 scripts/cache-url.py \
     --cache-root .agents/knowledge/online-docs/cache \
     <resolved-url>
   ```

**Done when** `.agents/knowledge/online-docs/REFERENCE.md` contains the
deduplicated mapping, agent resolution finds it by heading or alias, cache
fetch succeeds or reuses valid cached content, and no global index was
edited.
