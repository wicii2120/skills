# React-stack Adapter

Load this only when React, Next, Tailwind, Motion, or GSAP is supplied or detected. None is a default. Verify installed versions and APIs from the project or current primary sources before implementation.

## 1. Recon

Inspect package and lock files, framework/router version, server/client boundary, styling version, component/design-system packages, motion engines, token/theme conventions, tests, and build scripts. Prefer an established official/internal component package when compatible.

**Gate:** Every library used is already present or has a material, verified reason to be added; overlapping systems are avoided.

## 2. Preserve the contract

- Keep semantic structure, state machine, content, responsive behavior, and accessibility independent of component syntax.
- Treat props as intent (`emphasis`, `tone`, `state`) rather than raw styling switches.
- Keep framework component boundaries aligned with behavior/state ownership; avoid a global client boundary for local interaction.
- Emit token values through the project’s existing theme/custom-property pipeline. Utility classes and generated names are adapter details.

## 3. Apply only detected sub-adapters

### React / Next

Use existing routing, rendering, data, and client-component conventions. Isolate browser-only state and effects to the smallest interactive boundary. Keep stable keys, cleanup effects/listeners, preserve hydration consistency, and test pending/error/empty states from the actual data path.

### Tailwind

Confirm the installed major version and project configuration. Reuse configured tokens, variants, and class-composition conventions. Avoid arbitrary utilities that fork semantic roles. Keep long class strings out of the portable contract.

### Motion

Use a detected Motion/Framer Motion library for springs, layout/exit, or gesture-driven values that native CSS cannot express cleanly. Verify import paths and API shapes from the installed version. Preserve interruption, reduced motion, focus, semantics, and state independently of animation completion.

### GSAP

Use GSAP only when supplied/detected or when a justified scroll/timeline requirement and dependency review selects it. Scope selectors, register plugins according to the installed version, clean up contexts/triggers, recompute responsive geometry, and provide a reduced/static path. A library’s availability is not a reason for scroll hijacking or perpetual motion.

## 4. Verify

Run project type/lint/test/build tasks; render meaningful states and boundaries; inspect hydration/console errors, keyboard/focus, accessibility tree, reduced motion, effect cleanup, and layout stability. Profile animation under realistic load when a JavaScript motion engine is involved.

**Completion:** Only matching installed sub-adapters were used; the project’s structural system remains the base; dependencies and APIs are verified; adapter syntax preserves the portable design/accessibility contract and passes integrated project/render checks.
