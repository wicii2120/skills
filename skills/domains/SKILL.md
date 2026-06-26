---
name: domains
description: "Cross-project domain knowledge KB. Use when needing reusable product/business context, terminology, workflows, constraints, or decisions. Read/search by default; write only when user explicitly says `domains write`."
---

# Domains

A cross-project knowledge base for domain facts: terminology, workflows,
constraints, decisions, and invariants. Search it before answering from
vibes.

Store: `~/.knowledge/domains/`

Two modes, picked by argument: **read** (default) and **write**. Never enter
write mode unless the user explicitly asks for `domains write` or says to
record/update domain knowledge in `domains`.

## read

Search cross-project domain knowledge before guessing.

1. Derive keywords from the current work: domain nouns, acronyms,
   workflow names, product names, user roles, API/resource names, file or
   package names that carry domain meaning, and exact phrases from the user.
   The blocks' `tags:` lines are the vocabulary future runs type — mirror
   them.
2. Search the global store. Follow symlinks because domains may point at
   existing knowledge folders.
   ```bash
   rg -L -i -n '<kw1>|<kw2>|<kw3>' ~/.knowledge/domains
   ```
3. For each hit, read the whole relevant block or file. Blocks run from a
   `## [domain] title` heading to the next blank `---` separator.
4. Apply matching facts, constraints, and vocabulary. If nothing matches,
   say "no domain knowledge recorded for this" — do not invent domain
   facts.

**Done when** every plausible keyword has been tried and either matching
domain knowledge is applied or "no domain knowledge recorded" is stated.

## write

Record domain knowledge only on explicit user request. Arg: `write`.

1. **Explicit gate** — proceed only if the current user request explicitly
   asks for `domains write`, or says to record/update knowledge in
   `domains`. Otherwise do not write; ask for explicit confirmation if
   needed.
2. **Gate** — record only stable, reusable cross-project domain knowledge
   with evidence:
   user-provided facts, source docs, code behavior, tests, production
   behavior, or decisions. Skip transient debugging notes, guesses, secrets,
   credentials, and one-off session state.
3. **Dedup** — `rg -L -i` `~/.knowledge/domains` for the same terms. If a
   block already covers it, edit that block in place; do not append a
   duplicate.
4. **Strip unsafe/session specifics**: secrets, tokens, private URLs, temp
   paths, MR/issue numbers unless semantically meaningful, commit shas,
   personal data, and chat-only context. Keep reusable facts and constraints.
5. **Append** a block to `~/.knowledge/domains/index.md`, separated from
   the previous block by a blank `---` line, in this format:

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

   Keep each block self-contained: a future `rg` hit must land on enough
   context to use the knowledge without reading neighbours.

**Done when** the block is present in `~/.knowledge/domains/index.md`,
deduplicated, evidence-backed, free of unsafe/session specifics, and follows
the format above.
