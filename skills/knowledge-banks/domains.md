# domains

Use with scope and text-bank protocols in `SKILL.md`.

Stable domain facts: terminology, workflows, constraints, decisions, and
invariants.

## Artifact paths

| target | store | write source |
| --- | --- | --- |
| global | `~/.knowledge/domains/` | `~/.knowledge/domains/index.md` |
| local | `<project-root>/docs/agents/domains/` | `<project-root>/docs/agents/domains/index.md` |

## Read profile

Keywords: domain nouns, acronyms, workflow and product names, user roles,
API/resource names, meaningful file or package names, local service and
environment names, and exact user phrases.

Search all existing stores, following symlinks:

```bash
rg -L -i -n '<kw1>|<kw2>|<kw3>' ~/.knowledge/domains
rg -L -i -n '<kw1>|<kw2>|<kw3>' <project-root>/docs/agents/domains
```

Match/apply: relevant facts, constraints, decisions, invariants, and
vocabulary. Local facts take precedence for the current project when scope
explains a conflict.

No-match phrase: `no domain knowledge recorded for this globally or locally`.

## Write eligibility

Record only stable, reusable knowledge backed by user-provided facts, source
docs, code behavior, tests, production behavior, or explicit decisions. Skip
transient debugging notes, guesses, secrets, credentials, and one-session
state.

Target-specific scope:

- `global`: knowledge useful across projects. Strip private URLs, temporary
  and project-specific paths, issue numbers unless meaningful, commit SHAs,
  org/team names, personal data, and chat-only context.
- `local`: knowledge expected to recur in this project. Keep project names,
  repo paths, modules, and issue numbers when useful to future work. Strip
  secrets, tokens, unnecessary private URLs, temporary paths, personal data,
  and chat-only context.

Write only after the explicit target gate in `SKILL.md` passes.

## Record format

```markdown
## [<domain>] <short title>

tags: <space-separated terms a future run would search>

scope: <where this applies>

source: <evidence: user statement, docs URL/path, test, command, observed behavior>

facts:
- <stable domain fact>

constraints:
- <rule, invariant, boundary, or caveat>

open questions:
- <optional unknowns; omit when none>
```
