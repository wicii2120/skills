---
name: knowledge-banks
description: "Global and project-local knowledge banks for domains, deeds, gotchas, and online-docs. Use when needing reusable or repo-specific context, prior solution patterns, known footguns, or documentation pointers; also when recording approved knowledge. Reads consider both scopes. Writes require an explicit global or local target."
---

# Knowledge Banks

One installed skill operates four banks in two target modes:

- `global` — cross-project artifacts under `~/.knowledge/`.
- `local` — canonical current-project artifacts under
  `<project-root>/docs/agents/`.

Never copy or install this skill inside a project. Local mode creates only
project artifacts and direct discovery links in root `AGENTS.md`.

Resolve project root with `git rev-parse --show-toplevel`; outside Git, use
the current working directory.

## Scope rules

Target mode controls setup and writes, not read visibility.

- Every read considers existing global and local artifacts. Missing paths mean
  no record; do not create them during an ordinary read.
- Local records are specific to the current project and take precedence over
  global records. Surface material conflicts.
- Write only when the user explicitly asks to record or update knowledge and
  names `global` or `local` as target. Do not infer target from cwd, record
  content, or prior requests. Ask for target when absent.
- A target applies only to the current requested write. Never edit the other
  target as a side effect.

## Local setup

Before an explicit `local` write, ensure each local bank is directly
discoverable:

1. Create `docs/agents/` and the selected branch directory when absent. Do not
   create other branch directories or a project-local copy of this skill.
2. Ensure root `AGENTS.md` contains one non-duplicated Markdown link directly
   to the selected branch directory. Also link every other existing local bank
   directory (`domains`, `deeds`, `gotchas`, or `online-docs`) directly. Reuse
   an existing docs/agent index section, or append a small
   `## Project knowledge` section. Create `AGENTS.md` when absent; preserve all
   existing instructions.
3. Do not create or link through `docs/agents/README.md`.

Setup writes require explicit write intent and an explicit `local` target.

## Branch protocol

Pick one branch per pass and read its file before acting:

- [`domains.md`](domains.md) — terminology, workflows, constraints,
  decisions, and invariants.
- [`deeds.md`](deeds.md) — successful hard-won solution patterns.
- [`gotchas.md`](gotchas.md) — footguns with symptom, cause, and fix.
- [`online-docs.md`](online-docs.md) — minimal documentation mappings.

If several branches apply, finish one branch before starting the next.

### Read

1. Derive plausible keywords using the branch read profile.
2. Search all existing stores. Try keyword variants and combinations.
3. Read each matching record in full and apply it only when the branch match
   predicate passes.
4. If neither scope matches, state the branch no-match phrase. Never invent a
   record.

For text banks, a record runs from a `## [area] ...` or `## [domain] ...`
heading to the next blank `---` separator.

### Write

1. Require explicit write intent and an explicit `global` or `local` target.
2. Enforce the branch eligibility gate. If it fails, do not write.
3. For local target, complete local setup first.
4. Search global and local stores for overlap, then deduplicate within the
   selected target. Update an existing target record instead of appending a
   duplicate.
5. Sanitize according to branch and target rules. Write only selected target
   in branch format.
6. Re-read the result and verify target path, content, and direct `AGENTS.md`
   directory links.

**Done when** selected branches were read from all available stores, each
requested write changed only its explicit target, every existing local bank
directory is linked directly from root `AGENTS.md`, and local mode
has no project-local skill copy.
