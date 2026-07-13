# gotchas

Use with scope and text-bank protocols in `SKILL.md`.

Footguns that cost real debugging time because docs or common assumptions did
not expose them.

## Artifact paths

| target | store | write source |
| --- | --- | --- |
| global | `~/.knowledge/gotchas/` | `~/.knowledge/gotchas/index.md` |
| local | `<project-root>/docs/agents/gotchas/` | `<project-root>/docs/agents/gotchas/index.md` |

## Read profile

Keywords: exact error strings (`SSL_ERROR_SYSCALL`, `Exit status 143`),
symptoms (`empty render`, `page scrolls`), library and tool names, internal
modules, commands, scripts, and local environment names.

Search all existing stores:

```bash
rg -i -n '<kw1>|<kw2>|<kw3>' ~/.knowledge/gotchas
rg -i -n '<kw1>|<kw2>|<kw3>' <project-root>/docs/agents/gotchas
```

If keywords are unclear, skim existing `index.md` headers for area indexes
and example searches.

Match/apply: when `symptom:` matches, apply `fix:` and `debug pattern:`. Try
keyword combinations when one term is too broad.

No-match phrase: `no gotcha recorded for this globally or locally`.

## Write eligibility

Record only when both hold:

- It cost real debugging time or exposed a non-obvious wrong assumption.
- It can recur in selected target's scope: another project for `global`, or
  this project for `local`.

Target-specific sanitization:

- `global`: strip project paths and names, internal package names, org/team
  names, issue numbers, commit SHAs, private URLs, temporary paths, secrets,
  and personal data. Keep reusable mechanism, tool/library, symptom, cause,
  and fix.
- `local`: keep project paths, packages, scripts, modules, and environment
  names when they explain the mechanism. Strip secrets, credentials, personal
  data, unnecessary private URLs, temporary paths, and chat-only context.

Write only after the explicit target gate in `SKILL.md` passes.

## Record format

```markdown
## [<area>] <short title> — <optional tagline>

tags: <space-separated keywords a future debugger would type>

area: <where this footgun bites>

symptom: <observable behavior>

cause: <non-obvious root>

fix: <what to do>

debug pattern: <optional way to confirm cause>
```
