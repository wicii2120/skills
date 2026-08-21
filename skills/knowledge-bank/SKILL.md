---
name: knowledge-bank
description: Documentation and context lookup from the knowledge bank. Use when looking up documentation, or when tool/project behavior, product-specific rules, or prior implementation knowledge could affect the work.
---

# Knowledge Bank Lookup

Operate read-only: search and read existing records while leaving every store unchanged.

## 1. Route the request

Select every applicable branch unless the request names one explicitly:

- **Documentation** — when work depends on tool or project behavior, read [Documentation](references/docs.md).
- **Domain** — when product-specific meaning or rules could affect the outcome, read [Domain](references/domains.md).
- **Takeaway** — when a current failure or implementation path may repeat a prior lesson, read [Takeaway](references/takeaways.md).

**Gate:** Every concern in the request that matches a branch is assigned to it.

## 2. Resolve the stores

Resolve `<project-root>` with `git rev-parse --show-toplevel`; outside Git, use the current working directory.

| Branch | Global | Local |
| --- | --- | --- |
| Documentation | `~/.knowledge/docs/` | `<project-root>/docs/agents/docs/` |
| Domain | `~/.knowledge/domains/` | `<project-root>/docs/agents/domains/` |
| Takeaway | `~/.knowledge/takeaways/` | `<project-root>/docs/agents/takeaways/` |

Search existing stores only. A missing store is an empty result. A matching local record is canonical for the current project when its scope applies; surface conflicts with global records rather than merging them.

**Gate:** Both global and local paths are resolved for every selected branch.

## 3. Search each branch

For every selected branch:

1. Derive branch-specific keywords from the request.
2. Search both stores recursively, excluding each bank `README.md`; try keyword variants and combinations rather than one broad term.
3. Read every matching record in full and apply its branch-specific scope rules.
4. If neither store has a match, report the branch's exact no-match message.

**Gate:** Every selected store was searched and every matching record was read, or its no-match message was reported.

## 4. Apply the records

Use applicable records to answer or carry out the request. State material local/global conflicts and respect every recorded limit.

**Completion:** Every selected branch is accounted for by applicable records, surfaced conflicts, or its exact no-match message; all stores remain unchanged.
