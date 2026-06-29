# domains

Use with the text-bank protocol in `SKILL.md`.

Cross-project domain facts.

Store: `~/.knowledge/domains/`  
Source of truth: `~/.knowledge/domains/index.md`

## read profile

Keywords: domain nouns, acronyms, workflow names, product names, user
roles, API/resource names, file or package names carrying domain meaning,
and exact user phrases.

Search, following symlinks:

```bash
rg -L -i -n '<kw1>|<kw2>|<kw3>' ~/.knowledge/domains
```

Match/apply: matching facts, constraints, decisions, invariants, and
vocabulary.

No-match phrase: `no domain knowledge recorded for this`.

## write gate

Write only if the current user request explicitly asks for `domains write`,
or says to record/update knowledge in `domains`.

Record only stable, reusable cross-project domain knowledge with evidence:
user-provided facts, source docs, code behavior, tests, production
behavior, or decisions. Skip transient debugging notes, guesses, secrets,
credentials, and one-off session state.

Strip: secrets, tokens, private URLs, temp paths, MR/issue numbers unless
semantically meaningful, commit shas, personal data, chat-only context.
Keep reusable facts and constraints.

Append/edit format:

```markdown
## [<domain>] <short title>

tags: <space-separated terms a future run would search>

scope: <where this applies across projects>

source: <evidence: user statement, docs URL, test, command, observed system behavior>

facts:
- <stable domain fact>

constraints:
- <rule, invariant, boundary, or caveat>

open questions:
- <optional unknowns; omit when none>
```
