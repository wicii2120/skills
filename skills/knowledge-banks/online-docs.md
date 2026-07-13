# online-docs

Minimal Markdown mappings from a project, library, or aliases to where its
documentation can be found.

## Artifact paths

| target | mapping file |
| --- | --- |
| global | `~/.knowledge/online-docs/REFERENCE.md` |
| local | `<project-root>/docs/agents/online-docs/REFERENCE.md` |

## Mapping format

Keep one free-form mapping per line:

```markdown
<project/lib/aliases> -- <where>
```

Examples:

```markdown
react / react-dom / React -- https://react.dev/
uv / astral-sh/uv -- `gh api repos/astral-sh/uv/contents/docs`
internal API / project SDK -- docs/api/
```

Left side may contain any useful project/library identities and aliases.
`where` may be anything useful: URL, file or directory, command, package,
search hint, or prose instruction. Interpret both sides freely; no URL or
alias syntax is required beyond the ` -- ` separator. Write mappings in the
one-line format.

## Read

1. Read global and local mapping files when they exist.
2. Match source identity against project/library names and aliases on the left.
3. Interpret matching `where` text with available tools and judgment. Local
   mappings take precedence over global mappings.
4. Ask when matches conflict or remain ambiguous. Never invent a mapping.

No-match phrase: `no online-docs mapping recorded for this globally or locally`.

## Write eligibility

Use the explicit target gate in `SKILL.md`. Record only a reusable docs
pointer approved or supplied by the user.

Deduplicate matching identities and aliases in selected target, then add or
update one minimal mapping line. Preserve unrelated Markdown. Do not require
`where` to resolve, fetch, or succeed before recording it.

**Done when** all available mappings were considered and any requested write
changed only the explicitly selected mapping file.
