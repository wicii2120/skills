---
name: gotchas
description: "Footgun knowledge base. Use when debugging a failure that might be a known footgun — search the KB before re-deriving the cause — or, after fixing a failure that could recur across projects, record it (arg: write). Default: read."
---

# Gotchas

A cross-project log of footguns — pitfalls that cost real time because the
docs didn't warn you — at `~/.knowledge/gotchas`. Each block is
self-contained so `rg` lands on the whole story: symptom, cause, fix.

Two modes, picked by argument: **read** (default) and **write**.

## read

Search the KB before re-deriving a cause.

1. Derive keywords from the current problem: error strings verbatim
   (`SSL_ERROR_SYSCALL`, `Exit status 143`), symptom words (`shimmer`,
   `empty render`, `page scrolls`), library/tool names (`comark`, `turbo`,
   `glab`). The blocks' `tags:` lines are the vocabulary a future debugger
   types — mirror them.
2. Search the directory (recursive, case-insensitive):
   ```bash
   rg -i -n '<kw1>|<kw2>|<kw3>' ~/.knowledge/gotchas/
   ```
   If unsure which keywords, skim `~/.knowledge/gotchas/index.md`'s header
   — it lists example searches and an area index.
3. For each hit, read the whole block: blocks run from a
   `## [area] title` heading to the next blank `---` separator.
4. If a block's `symptom:` matches the current problem, apply its
   `fix:` / `debug pattern:`. Try keyword combinations if one alone is
   thin. If nothing matches, say "no gotcha recorded for this" — do not
   fabricate one.

**Done when** every plausible keyword has been tried and either a matching
gotcha is applied or "no gotcha recorded" is stated.

## write

Record a footgun after it's fixed. Arg: `write`.

1. **Gate** — record only if all hold. Skip writing otherwise.
   - It cost real debug time, or rested on a wrong assumption (not
     something obvious to anyone who'd read the docs).
   - It could recur in a different project/session — not tied to one
     codebase's specifics.
2. **Dedup** — `rg -i` the KB for the footgun's keywords. If a block
   already covers it, edit that block in place; do not append a duplicate.
3. **Strip project/session specifics**: MR/issue numbers, commit shas,
   package names, project file paths, team/org names, temp paths. Keep the
   reusable mechanism — the library/tool, the symptom class, the cause,
   the fix.
4. **Append** a block to `~/.knowledge/gotchas/index.md`, separated from
   the previous block by a blank `---` line, in this format:

   ```markdown
   ## [<area>] <short title> — <optional tagline>

   tags: <space-separated keywords a future debugger would type>

   area: <where this footgun bites>

   symptom: <observable behavior — the thing that makes you notice>

   cause: <why it happens — the non-obvious root>

   fix: <what to do>

   debug pattern: <optional — how to confirm the cause>
   ```

   Match the style of the blocks already in the file. Keep each block
   self-contained: a future `rg` hit must land on the whole story without
   reading neighbours.

**Done when** the block is present in `index.md`, deduplicated, free of
project/session specifics, and follows the format above.
