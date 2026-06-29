# deeds

Use with the text-bank protocol in `SKILL.md`.

Project-local pattern bank for successful patterns that took real time to
work out in this repo. Use `gotchas` instead when reusable value is
symptom/cause/fix.

Store: `.agents/knowledge/deeds/`  
Append source: `.agents/knowledge/deeds/index.md`

## read profile

Keywords: repo domain words, stack names, package names, internal module
names, pattern words (`migration`, `router`, `cache`, `screenshot diff`),
commands, scripts, and artifacts (`SKILL.md`, `Dockerfile`, `workflow`).

Search from repo root:

```bash
rg -i -n '<kw1>|<kw2>|<kw3>' .agents/knowledge/deeds/
```

If unsure which keywords, skim `.agents/knowledge/deeds/index.md`'s header
when it exists.

Match/apply: if `problem shape:` matches, apply or adapt `move:`,
`recipe:`, and `checks:`. Respect `constraints:` and `transfer notes:`.

No-match phrase: `no local deed recorded for this`.

## write gate

Record only if all hold:

- It took real time to work out in this repo, or collapsed repeated repo
  reasoning into a reusable move.
- It could recur in this repo, not only this one session.
- Outcome has evidence: tests, command output, merged code, screenshot
  comparison, user acceptance, or another concrete check.
- It is not mainly a footgun; write `gotchas` when the reusable value is
  symptom/cause/fix.

Strip: secrets, credentials, tokens, personal data, private URLs unless
user-approved and semantically required, temp paths, and chat-only context.
Keep project file paths, package names, scripts, and module names when they
make the pattern replayable in this repo.

Append/edit format:

```markdown
## [<area>] <short title> — <pattern tagline>

tags: <space-separated keywords a future builder in this repo would type>

area: <where this pattern applies in the repo>

problem shape: <when this deed applies>

constraints: <assumptions and boundary conditions>

move: <core insight or strategy>

recipe:
- <step worth repeating>

checks:
- <evidence that the pattern worked>

transfer notes: <how to adapt it inside this repo, and when not to use it>
```
