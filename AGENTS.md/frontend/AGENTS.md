# AGENTS.md

## Coding Guidelines

Listed in descending order of priority:

- **High cohesion, low coupling** — Decouple where appropriate through abstraction, while keeping closely related code together.
- **KISS (Keep It Simple, Stupid)** — Avoid unnecessary design patterns or over-encapsulation. Prefer simple, readable code over clever code.
- **Consistency matters** — For anything more complex than a short snippet, look for existing patterns first and follow them unless a major refactor is underway.

## Package Guidelines

- Prefer ESM-only packages throughout this codebase. Do not add CommonJS builds or `require`-first package patterns unless explicitly requested by the user.

## Behavioral Guidelines

- No implicit writes. Any code generation or modification that goes beyond the scope of the given task must be confirmed by the user before being carried out.

## Architecture Journey

- For major architectural shifts, update the decision log under `.agents/journey/`.
- Limit this to architecture-level changes, such as installer strategy changes, discovery model changes, queue or workspace model changes, or major reversals in operational workflow.
- Do not use the journey log as a changelog for routine fixes, minor refactors, or ordinary feature work.
- Keep `.agents/journey/index.md` up to date with a short description of each dated entry.
- Prefer adding a new dated file for each new architectural phase rather than rewriting older entries in place.
- Preserve older journey files as historical records unless a small cross-reference is needed.
- Follow the existing journey structure:
  - Context
  - Decision Journey
  - Superseded Decisions
  - Current Architecture
  - Open Questions, when relevant

## Styling Guidelines

- Always use `rem` as the length unit. `rem`-based sizing is more scalable and maintainable, which is why Tailwind CSS uses `rem` as its default unit. When given a value in `px`, convert it to `rem` using a 16:1 ratio.
- Unless otherwise requested, use Nuxt UI components.
