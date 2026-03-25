# AGENTS.md

## Coding Guideline

Priority from high to low:

- High Cohesion, Low Coupling - Decouple wherever possible (by abstraction), but also keep related code in the same file/directory (colocation of coupled concerns).
- KISS (Keep It Simple and Stupid) - No convoluted design pattern/encapsulation unless it is absolutely necessary. Stupid and readable code is better than pretty and elegant one.
- Consistence is gold - For anything more complex than a simple and short code snippet, search for existing patterns first and follow it (unless a major refactoring is undergoing). Consistent patterns are more readable and maintainable.

## Package Guideline

- Prefer ESM-only packages across this codebase. Do not add CommonJS outputs or `require`-first package patterns unless explicitly required by the user.

## Behavioral Gudieline

- No implicit writes. - Any code generation or modification that goes beyond the scope of the given task should be double checked by the user before you can carry it out.

## Architecture Journey

- For major architecture shifts, update the decision log under `.agents/journey/`.
- Scope this to architecture-level changes only, such as installer strategy changes, discovery model changes, queue/workspace model changes, or major operational workflow reversals.
- Do not use the journey log as a changelog for routine fixes, small refactors, or ordinary feature edits.
- Keep `.agents/journey/index.md` updated with a short description for each dated entry.
- Prefer adding a new dated file for a new architectural phase instead of rewriting older entries in place.
- Keep older journey files as historical records unless a small cross-reference is needed.
- Follow the existing journey structure:
  - Context
  - Decision Journey
  - Superseded Decisions
  - Current Architecture
  - Open Questions when relevant

## Styling Guideline

- Always use `rem` as length unit - `rem` based sizing is more scalable and manageable, that's why `tailwindcss` uses `rem` as its default unit. When given a `px` unit, convert it to `rem` in a 16:1 ratio.
- Unless asked otherwise, always use nuxt ui components.

