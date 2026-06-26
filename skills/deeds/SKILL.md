---
name: deeds
description: "Deeds pattern bank. Use before recreating a time-consuming solution pattern in another project — search prior worked-out deeds — or, after finishing a reusable pattern, record it (arg: write). Default: read."
---

# Deeds

A cross-project pattern bank for hard-won work — reusable moves, recipes,
and checks that took real time to work out — at `~/.knowledge/deeds`.
Start with one `index.md`; split by area only when sprawl makes scanning
slow. Each block is self-contained so `rg` lands on the whole pattern.

Use `gotchas` for footguns with symptom/cause/fix. Use `deeds` for
successful patterns worth repeating.

Two modes, picked by argument: **read** (default) and **write**.

## read

Search before re-inventing a solution pattern.

1. Derive keywords from the current work: domain words (`skills`, `Docker`,
   `chat UI`), stack names (`Nuxt`, `pnpm`, `GitLab`), pattern words
   (`migration`, `router`, `cache`, `screenshot diff`), and artifacts
   (`SKILL.md`, `Dockerfile`, `workflow`). The blocks' `tags:` lines are
   the vocabulary a future builder types — mirror them.
2. Search the directory (recursive, case-insensitive):
   ```bash
   rg -i -n '<kw1>|<kw2>|<kw3>' ~/.knowledge/deeds/
   ```
   If unsure which keywords, skim `~/.knowledge/deeds/index.md`'s header —
   it lists example searches and an area index.
3. For each hit, read the whole block: blocks run from a
   `## [area] title` heading to the next blank `---` separator.
4. If a block's `problem shape:` matches the current work, apply or adapt
   its `move:`, `recipe:`, and `checks:`. Respect `constraints:` and
   `transfer notes:`. If nothing matches, say "no deed recorded for this" —
   do not fabricate one.

**Done when** every plausible keyword has been tried and either a matching
deed is applied or "no deed recorded" is stated.

## write

Record a reusable pattern after it works. Arg: `write`.

1. **Gate** — record only if all hold. Skip writing otherwise.
   - It took real time to work out, or collapsed repeated reasoning into a
     reusable move.
   - It could recur in a different project/session — not tied to one
     codebase's specifics.
   - The outcome has evidence: tests, command output, merged code,
     screenshot comparison, user acceptance, or another concrete check.
   - It is not mainly a footgun. If the reusable value is symptom/cause/fix,
     write `gotchas` instead.
2. **Dedup** — `rg -i` the KB for the pattern's keywords. If a block already
   covers it, edit that block in place; do not append a duplicate.
3. **Strip project/session specifics**: MR/issue numbers, commit shas,
   project file paths, org/team names, private URLs, temp paths, secrets.
   Keep the reusable problem shape, constraints, move, recipe, checks, and
   evidence type.
4. **Append** a block to `~/.knowledge/deeds/index.md`, separated from the
   previous block by a blank `---` line, in this format:

   ```markdown
   ## [<area>] <short title> — <pattern tagline>

   tags: <space-separated keywords a future builder would type>

   area: <where this pattern applies>

   problem shape: <when this deed applies>

   constraints: <assumptions and boundary conditions>

   move: <core insight or strategy>

   recipe:
   - <step worth repeating>

   checks:
   - <evidence that the pattern worked>

   transfer notes: <how to adapt it, and when not to use it>
   ```

   Match the style of the blocks already in the file. Keep each block
   self-contained: a future `rg` hit must land on enough context to replay
   the pattern without reading neighbours.

**Done when** the block is present in `index.md`, deduplicated, free of
project/session specifics, evidence-backed, and follows the format above.
