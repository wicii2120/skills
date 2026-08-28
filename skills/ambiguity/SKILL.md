---
name: ambiguity
description: Ambiguity — missing task context that could materially affect behavior, API design, data handling, security, or scope; resolves whether to ask one focused question or proceed on a reversible assumption.
---

# Ambiguity

Resolve missing context by inspecting the relevant code, tests, configuration, and conventions.

Ask **one focused question** only when both conditions hold:

- The ambiguity cannot be resolved from context and materially changes behavior, API design, data handling, security, or scope.
- Proceeding without the answer would likely produce the wrong result.

Otherwise proceed on a **reversible assumption** and report it. Size the assumption to its consumers:

- **No true external consumers** — prefer the correct foundation over compatibility shims; a more aggressive assumption is fine.
- **True external consumers** — conservative: preserve compatibility.
- **Unsure whether external consumers exist** — ask the user before going conservative; never default to conservative on a guess.

**Completion:** The ambiguity is resolved from context or one answer, or the reversible assumption is recorded.
