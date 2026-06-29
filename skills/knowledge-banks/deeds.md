# deeds

Use with the text-bank protocol in `SKILL.md`.

Cross-project pattern bank for successful patterns that took real time to
work out. Use `gotchas` instead when reusable value is symptom/cause/fix.
Start with one `index.md`; split by area only when sprawl makes scanning
slow.

Store: `~/.knowledge/deeds/`  
Append source: `~/.knowledge/deeds/index.md`

## read profile

Keywords: domain words (`skills`, `Docker`, `chat UI`), stack names
(`Nuxt`, `pnpm`, `GitLab`), pattern words (`migration`, `router`, `cache`,
`screenshot diff`), and artifacts (`SKILL.md`, `Dockerfile`, `workflow`).

Search:

```bash
rg -i -n '<kw1>|<kw2>|<kw3>' ~/.knowledge/deeds/
```

If unsure which keywords, skim `~/.knowledge/deeds/index.md`'s header for
example searches and area index.

Match/apply: if `problem shape:` matches, apply or adapt `move:`,
`recipe:`, and `checks:`. Respect `constraints:` and `transfer notes:`.

No-match phrase: `no deed recorded for this`.

## write gate

Record only if all hold:

- It took real time to work out, or collapsed repeated reasoning into a
  reusable move.
- It could recur in a different project/session, not tied to one codebase.
- Outcome has evidence: tests, command output, merged code, screenshot
  comparison, user acceptance, or another concrete check.
- It is not mainly a footgun; write `gotchas` when the reusable value is
  symptom/cause/fix.

Strip: MR/issue numbers, commit shas, project file paths, org/team names,
private URLs, temp paths, secrets. Keep reusable problem shape,
constraints, move, recipe, checks, and evidence type.

Append/edit format:

```markdown
## [<area>] <short title> — <pattern tagline>

tags: <space-separated keywords a future builder would type>

area: <where this pattern applies>

problem shape: <when this deed applies>

constraints: <assumptions and boundary conditions>

move: <core insight or strategy>

recipe:
- <step worth repeating>

checks:
- <evidence that the pattern worked>

transfer notes: <how to adapt it, and when not to use it>
```
