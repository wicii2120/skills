---
name: wiki-read
description: Unified wiki lookup. Use when documentation, project behavior, domain context, constraints, prior implementation knowledge, or known fixes could materially affect work.
---

# Wiki Read

Operate read-only. Search and read existing grounded records while leaving every store unchanged.

## Required contract load

Before searching, use the read tool to load [the shared record contract](references/record-contract.md) in full. The skill invocation identifies this `SKILL.md` path; resolve the link relative to its directory. Stop if the contract cannot be loaded.

## 1. Resolve context

Resolve `<project-root>` with `git rev-parse --show-toplevel`; outside Git, use the current working directory. Resolve both stores:

- global: `~/wiki/`
- local: `<project-root>/docs/agents/wiki/`

A missing store is an empty result.

**Gate:** The project root and both stores are resolved, and the contract is loaded.

## 2. Search the wiki

1. Derive search terms from the request, including meaningful synonyms, tool or package names, commands, errors, paths, and domain vocabulary.
2. Search file names and contents recursively in both stores. Exclude `README.md` and `_quarantine/**` from every ordinary search.
3. Try useful term variants and combinations rather than relying on one broad query.
4. Read every plausible matching record in full, including its final provenance section.

Use filename search and content search as separate recall paths. For example, filter recursive Markdown file lists for filename terms, and use `rg -i -l` for content terms with `--glob '!README.md'` and `--glob '!_quarantine/**'`.

**Gate:** Both existing stores and useful variants were searched, and every plausible match was read fully.

## 3. Validate and apply

Apply a record only when its content, scope, limits, and provenance fit the task. Validate the final provenance section against the shared contract. An active record with missing or malformed provenance is not grounded knowledge: do not rely on it, and report that it needs repair or quarantine. Reverify volatile or apparently stale locators before relying on them.

Applicable project-local knowledge is canonical for that project. Surface a material conflict with global knowledge instead of silently merging the records.

If no applicable record remains after both stores and useful variants are searched, report `no matching wiki knowledge was found globally or locally`.

**Completion:** Every plausible match was applied, rejected with a reason, or reported as needing repair; all stores remain unchanged.
