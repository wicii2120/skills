# gotchas

Use with the text-bank protocol in `SKILL.md`.

Cross-project log of footguns that cost real time because docs did not warn
you.

Store: `~/.knowledge/gotchas/`  
Append source: `~/.knowledge/gotchas/index.md`

## read profile

Keywords: error strings verbatim (`SSL_ERROR_SYSCALL`, `Exit status 143`),
symptom words (`shimmer`, `empty render`, `page scrolls`), and library/tool
names (`comark`, `turbo`, `glab`).

Search:

```bash
rg -i -n '<kw1>|<kw2>|<kw3>' ~/.knowledge/gotchas/
```

If unsure which keywords, skim `~/.knowledge/gotchas/index.md`'s header for
example searches and area index.

Match/apply: if `symptom:` matches, apply `fix:` / `debug pattern:`. Try
keyword combinations if one alone is thin.

No-match phrase: `no gotcha recorded for this`.

## write gate

Record only if all hold:

- It cost real debug time, or rested on a wrong assumption; not obvious to
  anyone who had read the docs.
- It could recur in a different project/session, not tied to one codebase.

Strip: MR/issue numbers, commit shas, package names, project file paths,
team/org names, temp paths. Keep reusable mechanism: library/tool, symptom
class, cause, and fix.

Append/edit format:

```markdown
## [<area>] <short title> — <optional tagline>

tags: <space-separated keywords a future debugger would type>

area: <where this footgun bites>

symptom: <observable behavior — the thing that makes you notice>

cause: <why it happens — the non-obvious root>

fix: <what to do>

debug pattern: <optional — how to confirm the cause>
```
