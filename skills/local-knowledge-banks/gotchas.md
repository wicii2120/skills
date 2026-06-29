# gotchas

Use with the text-bank protocol in `SKILL.md`.

Project-local log of footguns that cost real time in this repo.

Store: `.agents/knowledge/gotchas/`  
Append source: `.agents/knowledge/gotchas/index.md`

## read profile

Keywords: error strings verbatim (`SSL_ERROR_SYSCALL`, `Exit status 143`),
symptom words (`shimmer`, `empty render`, `page scrolls`), library/tool
names, internal module names, commands, scripts, and local environment
names.

Search from repo root:

```bash
rg -i -n '<kw1>|<kw2>|<kw3>' .agents/knowledge/gotchas/
```

If unsure which keywords, skim `.agents/knowledge/gotchas/index.md`'s
header when it exists.

Match/apply: if `symptom:` matches, apply `fix:` / `debug pattern:`. Try
keyword combinations if one alone is thin.

No-match phrase: `no local gotcha recorded for this`.

## write gate

Record only if all hold:

- It cost real debug time in this repo, or rested on a wrong assumption.
- It could recur in this repo, not only this one session.

Strip: secrets, credentials, tokens, personal data, private URLs unless
user-approved and semantically required, temp paths, and chat-only context.
Keep project file paths, package names, scripts, module names, and local
environment names when they explain the reusable mechanism.

Append/edit format:

```markdown
## [<area>] <short title> — <optional tagline>

tags: <space-separated keywords a future debugger in this repo would type>

area: <where this footgun bites in the repo>

symptom: <observable behavior — the thing that makes you notice>

cause: <why it happens — the non-obvious root>

fix: <what to do>

debug pattern: <optional — how to confirm the cause>
```
