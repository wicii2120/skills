# domains

Use with the text-bank protocol in `SKILL.md`.

Project-local domain facts for the current repo.

Store: `.agents/knowledge/domains/`  
Source of truth: `.agents/knowledge/domains/index.md`

## read profile

Keywords: project domain nouns, acronyms, workflow names, product names,
user roles, API/resource names, module/file/package names carrying domain
meaning, local service names, environment labels, and exact user phrases.

Search, from repo root, following symlinks:

```bash
rg -L -i -n '<kw1>|<kw2>|<kw3>' .agents/knowledge/domains
```

Match/apply: matching local facts, constraints, decisions, invariants, and
vocabulary.

No-match phrase: `no local domain knowledge recorded for this`.

## write gate

Write only if the current user request explicitly asks for local/project
`domains write`, or says to record/update project domain knowledge in
`.agents/knowledge` or local `domains`.

Record only stable, reusable current-repo domain knowledge with evidence:
user-provided facts, source docs, code behavior, tests, production
behavior, or decisions. Skip transient debugging notes, guesses, secrets,
credentials, and one-off session state.

Strip: secrets, tokens, private URLs unless user-approved and semantically
required, temp paths, personal data, and chat-only context. Keep project
names, repo paths, modules, and issue numbers only when they are meaningful
to future work in this repo.

Append/edit format:

```markdown
## [<domain>] <short title>

tags: <space-separated terms a future run in this repo would search>

scope: <where this applies inside the repo/project>

source: <evidence: user statement, docs URL/path, test, command, observed system behavior>

facts:
- <stable project fact>

constraints:
- <rule, invariant, boundary, or caveat>

open questions:
- <optional unknowns; omit when none>
```
