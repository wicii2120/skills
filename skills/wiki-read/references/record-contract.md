# Wiki record contract

This is the single source of truth for records used by `wiki-read` and `wiki-write`.

## Stores and layout

The global store is `~/wiki/`. A project-local store is `<project-root>/docs/agents/wiki/`.

Each store uses shallow semantic topics:

```text
<store>/
├── <topic>/
│   └── <descriptive-record>.md
└── _quarantine/
    └── <topic>/
        └── <descriptive-record>.md
```

Topic and record names are descriptive kebab-case. Topics reflect subject matter, not a record type. Reuse a fitting topic and create one only for a distinct subject. Keep one cohesive subject per record; preserve separate records when combining them would blur scope or lose information.

`README.md` is an interface, not a knowledge record. The wiki has no `raw/`, `index.md`, `log.md`, embedding store, vector search, or ingest/archive subsystem.

## Active records

An active record is freeform Markdown whose final section is `## Provenance`. It has at least one entry in this form:

```markdown
## Provenance

- Source: <source identity>
  - Locator: <durable URL, repo-relative path with section or symbol, reproducible command or test, or explicit current user decision>
  - Verified: <YYYY-MM-DD>
  - Supports: <what this source establishes>
```

`Supports` may be omitted only when the source supports the whole record. Migration provenance also records every original path under `Migrated from`.

Before an active record is written or updated, every locator must resolve. Every load-bearing date, number, and quotation must appear in the cited source or reproducible output. Multiple sources are required when no single source supports the whole record. Never invent a source, result, or verification date. Preserve material scope, limits, evidence, and uncertainty in the body.

An explicit user decision in the current `wiki-write` invocation is valid provenance when identified as a user decision and dated. It does not validate an unattributed legacy record retroactively.

An active record with missing, malformed, unreachable, or materially insufficient provenance is ungrounded. It must be repaired or moved to quarantine before normal use.

## Quarantine

Quarantine preserves useful but unverified material without presenting it as grounded knowledge. Preserve the original content and end it with:

```markdown
## Provenance

- Status: Unverified
- Migrated from: <original path>
- Reason: <missing, unreachable, or non-reproducible provenance>
```

Normal reads exclude `_quarantine/**`. Search quarantine only when the user explicitly asks to inspect or rehabilitate it.
