# Implementation & Visual Iteration

Load this when Craft includes runnable UI, code changes, rendering, screenshots, or production integration. Implementation is an envelope around Craft, not a fifth mode.

```text
frame → Design Read → plan → implement → render → inspect → refine → verify
```

## 1. Frame and ledger

Inspect the project’s stack, routes, component/system conventions, dependencies, scripts, assets, tests, and existing behavior. Record the Design Read for visual work, fidelity target, assumptions, consequential decisions, and every requested output in a completeness ledger.

```text
Output ledger
[ ] requested files/artifacts
[ ] required content and real/sample evidence status
[ ] meaningful states and input methods
[ ] wide/narrow responsive cases
[ ] accessibility criteria
[ ] render/inspection evidence
[ ] integrated checks
```

Proceed unless an unresolved choice would materially change the artifact. Preserve coherent vertical slices; when continuation is unavoidable, record exact completed and remaining work rather than truncating silently.

**Gate:** The plan maps every ledger item to an implementation and verification path.

## 2. Plan the vertical slice

Map semantic structure, content, assets, token roles, component/state contracts, responsive behavior, motion, error/recovery, stack adapter, and tests before coding. For redesign/reproduction, map the existing artifact and fidelity target so refinement does not become an unrequested rewrite.

Use one structural system as the base. Existing official packages and conventions win when compatible. A second system or dependency needs an explicit seam, material outcome benefit, project/primary-source compatibility evidence, and ownership.

## 3. Implement through the existing stack

Prefer existing dependencies, primitives, tasks, naming, and styling. Add a dependency only when it materially improves the requested outcome, overlaps no established library, and compatibility is verified. Keep dependency choices outside the portable design contract.

Implement real semantics, complete states, content, responsive behavior, and accessibility while building the visual direction. Remove debug code, dead/fake controls, accidental hard-coded decisions, and silent placeholders.

**Gate:** The complete slice runs before visual polish begins.

## 4. Render representative evidence

Use the strongest available rendering path. Complete at least one full cycle covering:

- representative wide and narrow boundaries, plus behavior-change edges;
- default and meaningful hover/focus/active/disabled/loading/empty/error/success states;
- realistic, long, and localization-stress content;
- keyboard operation, focus visibility, target behavior, and reduced motion;
- responsive hierarchy, alignment, density, overflow, layout stability, and asset crops;
- semantic structure and accessibility tree;
- console, network, hydration, and runtime errors applicable to the stack;
- screenshot-level critique against the Design Read, fidelity target, and artifact contract.

Use pixel-level comparison only for an explicit **Reproduce** target. For Adapt/Redesign, compare structure, language, hierarchy, and contract instead of chasing pixels.

## 5. Inspect and refine

Inspect the rendered artifact, not only code. Apply:

- contract checks from loaded foundations and deliverable template;
- Grounding, Default, and Removal tests;
- motion at normal and slowed speed when applicable;
- content and claim audit;
- code/project convention review;
- performance evidence against project budgets.

Refine the highest-impact mismatch, rerender, and reinspect. Continue until acceptance checks pass or a concrete blocker is documented; iteration count is determined by evidence, not a fixed number.

## 6. Fallback when tools are unavailable

- **No browser/renderer:** inspect static structure and styles, run available build/type/lint/tests, produce a precise manual render matrix, and mark visual/interaction/accessibility-tree claims unverified.
- **No image tool:** provide an asset brief and composition specification; use supplied/licensed assets or clearly provisional slots without fabricating product evidence.
- **No assistive-technology path:** verify semantics/keyboard/accessibility tree where possible and provide named manual checks.
- **No performance budget/network:** use project evidence first; otherwise propose contextual product acceptance criteria and label them unverified rather than universal.

## 7. Integrated verification

Run focused behavior checks, relevant tests/build/type/lint/format commands, and fresh render evidence after the final change. Reconcile every ledger item and report remaining exact limitations. A `TODO`, ellipsis, fake implementation, or omitted requested section does not count as completion.

**Completion:** Every ledger item is complete or precisely blocked; at least one render/inspect/refine cycle has current evidence when rendering is available; semantics, states, boundaries, content, accessibility, console/runtime, and project checks pass at the strongest available level.
