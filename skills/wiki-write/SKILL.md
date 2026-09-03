---
name: wiki-write
description: Record or update durable, provenance-backed wiki knowledge.
disable-model-invocation: true
---

# Wiki Write

A direct invocation is write intent. If no knowledge was supplied, ask what to record and make no changes.

## Required contract load

Before interpreting the request, searching, or writing, use the read tool to load [the shared record contract](../wiki-read/references/record-contract.md) in full. The skill invocation identifies this `SKILL.md` path; resolve the link relative to its directory. Stop without writing if the contract cannot be loaded. No record may be created or changed before this gate passes.

## 1. Resolve the target

Resolve `<project-root>` with `git rev-parse --show-toplevel`; outside Git, use the current working directory. The stores are `~/wiki/` and `<project-root>/docs/agents/wiki/`.

Choose scope in this order:

1. An explicit `global` or `local` target wins.
2. Repository-specific knowledge defaults local.
3. Reusable cross-project knowledge defaults global.
4. Ask one focused question before writing only when scope remains materially ambiguous.

The selected target applies only to this write. Never mutate the other store as a side effect.

**Gate:** One target is resolved without guessing.

## 2. Establish eligibility

Record stable, reusable knowledge. Documentation wayfinding must be non-obvious and verifiable; a lesson must capture hard-won, recurring reasoning with concrete evidence; factual or decision knowledge must have a stable source.

Exclude transient state, guesses, secrets, credentials, personal data, temporary paths, and chat-only context. Preserve uncertainty and applicability limits that a future reader needs.

**Gate:** The proposed record is durable, reusable, safe, and sourceable.

## 3. Search and deduplicate

Search file names and contents across both stores, excluding `README.md` and `_quarantine/**`. Read every overlapping record. In the selected target, update a matching record rather than creating a duplicate; overlap in the other target informs conflict handling but is never mutated as a side effect.

Choose a semantic topic and descriptive kebab-case filename. Keep one cohesive subject per record; split unrelated knowledge. Write records only as topic files, never into a README or aggregate catalog.

**Gate:** Overlap in both stores is accounted for and the destination is semantic and unique.

## 4. Verify, sanitize, and write

Verify the proposed sources and every load-bearing date, number, or quotation. Then write a freeform body followed by provenance conforming to the shared contract.

For a global record, remove project and private details while retaining the reusable mechanism. For a local record, retain useful project names, paths, modules, commands, and private locators while still removing secrets and personal data.

If provenance cannot be established, ask for a source and make no active write. When the user explicitly asks to preserve the material anyway, place it under `_quarantine/<topic>/` using the quarantine contract.

For a local target, ensure `docs/agents/wiki/README.md` briefly describes the unified store and points to `wiki-read` and `wiki-write`. Where project instructions need a pointer, link that README exactly once while preserving unrelated instructions.

**Gate:** The body is sanitized for its scope and the final provenance is verified and complete.

## 5. Verify the result

Re-read the shared contract and every complete result. Repair or remove any output that does not conform before reporting success. Verify:

- selected target and semantic path;
- no duplicate in that target;
- one cohesive subject;
- sanitization and preserved limits;
- valid, sufficient provenance;
- only the selected target and required local setup files changed.

**Completion:** The record is grounded and reusable in the selected scope, or it was not written actively and the provenance blocker was reported.
