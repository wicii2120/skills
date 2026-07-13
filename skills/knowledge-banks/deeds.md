# deeds

Use with scope and text-bank protocols in `SKILL.md`.

Successful patterns that took real time to work out. Use `gotchas` instead
when reusable value is mainly symptom/cause/fix.

## Artifact paths

| target | store | write source |
| --- | --- | --- |
| global | `~/.knowledge/deeds/` | `~/.knowledge/deeds/index.md` |
| local | `<project-root>/docs/agents/deeds/` | `<project-root>/docs/agents/deeds/index.md` |

## Read profile

Keywords: domain and stack names, package and internal module names, pattern
words (`migration`, `router`, `cache`, `screenshot diff`), commands, scripts,
and artifacts (`SKILL.md`, `Dockerfile`, `workflow`).

Search all existing stores:

```bash
rg -i -n '<kw1>|<kw2>|<kw3>' ~/.knowledge/deeds
rg -i -n '<kw1>|<kw2>|<kw3>' <project-root>/docs/agents/deeds
```

If keywords are unclear, skim existing `index.md` headers for area indexes
and example searches.

Match/apply: when `problem shape:` matches, apply or adapt `move:`, `recipe:`,
and `checks:` while respecting `constraints:` and `transfer notes:`.

No-match phrase: `no deed recorded for this globally or locally`.

## Write eligibility

Record only when all hold:

- Work took real time to solve or collapsed repeated reasoning into a reusable
  move.
- It can recur in selected target's scope: another project for `global`, or
  this project for `local`.
- Outcome has concrete evidence such as tests, command output, merged code,
  screenshot comparison, or user acceptance.
- It is not mainly a footgun; use `gotchas` for symptom/cause/fix.

Target-specific sanitization:

- `global`: strip project paths and names, org/team names, issue numbers,
  commit SHAs, private URLs, temporary paths, secrets, and personal data.
- `local`: keep project paths, package names, scripts, and module names when
  they make the pattern replayable. Strip secrets, credentials, personal
  data, unnecessary private URLs, temporary paths, and chat-only context.

Write only after the explicit target gate in `SKILL.md` passes.

## Record format

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
