---
name: knowledge-banks
description: "Cross-project knowledge banks: domains, deeds, gotchas, and online-docs. Use when needing reusable cross-project domain context, prior solution patterns, known footguns while debugging, or current package/product/API docs; also when recording approved entries. Read by default."
---

# Knowledge Banks

One installed skill for four cross-project banks. Legacy branch names:
`domains`, `deeds`, `gotchas`, `online-docs`.

A bank is a durable cross-project source of truth. Search before guessing;
record only when the selected branch gate passes. Use `local-knowledge-banks`
for current-repo knowledge.

## Branch and mode

1. Pick one branch for the current pass. If the task needs several banks,
   finish one branch's done criterion before starting the next.
2. Read the selected branch file before acting:
   - [`domains.md`](domains.md) — reusable product/business context,
     terminology, workflows, constraints, decisions, invariants.
   - [`deeds.md`](deeds.md) — successful hard-won solution patterns worth
     repeating.
   - [`gotchas.md`](gotchas.md) — known footguns with symptom, cause, and
     fix.
   - [`online-docs.md`](online-docs.md) — indexed, cached current docs for
     packages, products, APIs, SDKs, and frameworks.
3. Pick mode:
   - `read` by default.
   - `write` only when selected branch file's write gate passes. `domains`
     and `online-docs` require explicit user request. `deeds` and `gotchas`
     may write after proven reusable work/fixes; ask if unsure.

**Done when** each chosen branch file has been read, each chosen branch has
a mode, and its done criterion is met.

## Text-bank protocol

Use this protocol for `domains`, `deeds`, and `gotchas` after reading the
selected branch file.

### read

1. Derive keywords from current work using the branch profile. Mirror
   `tags:` vocabulary because tags are what future runs search.
2. Search the branch store with the branch command. Try plausible keywords
   and combinations.
3. For each hit, read the whole block. Blocks run from a `## [area] title`
   or `## [domain] title` heading to the next blank `---` separator.
4. Apply only if the branch match predicate passes. If nothing matches,
   say the branch no-match phrase; never fabricate entries.

**Done when** every plausible keyword has been tried and either a matching
record is applied or the branch no-match phrase is stated.

### write

1. Enforce the branch gate. If it fails, do not write; ask only when an
   explicit gate could be satisfied by confirmation.
2. Dedup by searching the branch store for the same terms. If a block
   already covers it, edit that block in place; do not append a duplicate.
3. Strip unsafe and session-specific details listed in the branch profile.
4. Write the branch format. Keep each block self-contained so an `rg` hit
   lands on enough context to use the record without neighbours.

**Done when** the record is present in the branch source of truth,
deduplicated, evidence-backed where required, sanitized, and in branch
format.
