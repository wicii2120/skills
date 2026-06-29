---
name: local-knowledge-banks
description: "Project-local knowledge banks in `.agents/knowledge/`. Use when needing or recording current-repo domain context, repo-specific solution patterns, local footguns, or project docs mappings. Read by default."
---

# Local Knowledge Banks

One installed skill for four project-local banks in the current repo:
`domains`, `deeds`, `gotchas`, `online-docs`. Use `knowledge-banks` for
cross-project knowledge in `~/.knowledge`.

A local bank is a durable current-repo source of truth. Search before
guessing; record only when the selected branch gate passes.

Repo root: use `git rev-parse --show-toplevel`; if not in a Git repo, use
the current working directory. Store root: `.agents/knowledge/`. Do not
create the store during read mode.

## Branch and mode

1. Pick one branch for the current pass. If the task needs several banks,
   finish one branch's done criterion before starting the next.
2. Read the selected branch file before acting:
   - [`domains.md`](domains.md) — current-repo product/business context,
     terminology, workflows, constraints, decisions, invariants.
   - [`deeds.md`](deeds.md) — repo-specific solution patterns worth
     repeating.
   - [`gotchas.md`](gotchas.md) — local footguns with symptom, cause, and
     fix.
   - [`online-docs.md`](online-docs.md) — project docs mappings and local
     docs cache.
3. Pick mode:
   - `read` by default.
   - `write` only when selected branch file's write gate passes. `domains`
     and `online-docs` require explicit local/project write request.
     `deeds` and `gotchas` may write after proven reusable work/fixes in
     this repo; ask if unsure.

**Done when** each chosen branch file has been read, each chosen branch has
a mode, and its done criterion is met.

## Text-bank protocol

Use this protocol for `domains`, `deeds`, and `gotchas` after reading the
selected branch file.

### read

1. Derive keywords from current work using the branch profile. Mirror
   `tags:` vocabulary because tags are what future runs search.
2. If the branch store does not exist, treat it as no local record and do
   not create it.
3. Search the branch store with the branch command. Try plausible keywords
   and combinations.
4. For each hit, read the whole block. Blocks run from a `## [area] title`
   or `## [domain] title` heading to the next blank `---` separator.
5. Apply only if the branch match predicate passes. If nothing matches,
   say the branch no-match phrase; never fabricate entries.

**Done when** every plausible keyword has been tried and either a matching
local record is applied or the branch no-match phrase is stated.

### write

1. Enforce the branch gate. If it fails, do not write; ask only when an
   explicit local/project gate could be satisfied by confirmation.
2. Create only the needed branch directory.
3. Dedup by searching the local branch store for the same terms. If a block
   already covers it, edit that block in place; do not append a duplicate.
4. Strip unsafe details listed in the branch profile. Keep project-specific
   names and paths when they are the reusable point of the local record.
5. Write the branch format. Keep each block self-contained so an `rg` hit
   lands on enough context to use the record without neighbours.
6. If the user expects committed persistence, check whether `.agents` is
   ignored. If ignored, ask whether to unignore `.agents/knowledge/` or keep
   local disk-only persistence.

**Done when** the record is present under `.agents/knowledge/`,
deduplicated against local records, sanitized, and no global knowledge file
was edited.
