---
name: verification
description: Verification workflow for bug fixes, behavior changes, refactors, and build/configuration changes. Use before implementation to establish evidence and before completion to validate the result.
---

# Verification

## Before implementation

Choose the narrowest check that exercises the affected path:

- **Bug fix:** Reproduce the failure with a focused test or check.
- **Behavior change:** Identify the focused behavior check; add or update a test when practical.
- **Refactor:** Run the focused behavior check and establish a passing baseline.
- **Build/configuration change:** Identify the narrowest check that exercises the affected path.

**Gate:** The focused check is named; a bug fix is reproduced, and a refactor has a passing baseline.

## After implementation

1. Run the focused check.
2. Run applicable targeted tests and type, lint, or build checks.
3. Use a minimal smoke test when automated coverage is insufficient.
4. Review the final diff for unrelated or accidental changes.

Start narrow and broaden only when relevant and affordable. If validation cannot run, state why and name the best substitute. Distinguish pre-existing failures from failures caused by the change.

**Completion:** The success criteria have passing evidence, or a concrete blocker and the best available substitute are reported.
