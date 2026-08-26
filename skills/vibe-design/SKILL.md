---
name: vibe-design
description: Professional interface-design and design-system workflows. Use to clarify design terminology or intent; diagnose existing UI quality, consistency, usability, accessibility, content, or motion; systemize reusable foundations, tokens, components, governance, migration, or adoption; or craft concrete specifications, prototypes, visual directions, and production frontend implementations.
---

# Vibe Design

Turn interface intent into grounded design decisions, portable contracts, and verified artifacts. Route by the object being changed:

```text
Knowledge or intent            → Clarify
Existing artifact or behavior  → Diagnose
Reusable system capability     → Systemize
Bounded concrete artifact      → Craft
```

Use mode labels only when they clarify routing, sequencing, assumptions, or scope.

## 1. Frame

1. Inspect supplied artifacts and the project before asking about them.
2. Select one mode or an explicit chain. Default “improve” and “redesign” of existing UI to **Diagnose → Craft** unless the user supplies a trusted diagnosis or asks to skip assessment. Valid chains include **Clarify → Craft**, **Diagnose → Craft**, **Diagnose → Systemize → Craft**, and **Systemize → Craft**.
3. Record outcome, product/platform context, audience, evidence, existing system/assets/content, and material brand, accessibility, performance, browser/device, technical, dependency, and tool constraints.
4. Ask only when an answer would change scope, visual direction, architecture, priority, fidelity, or acceptance criteria. Otherwise state an assumption and proceed. Routine implementation needs no ceremonial approval.
5. Route token architectures and component contracts to **Systemize** when ownership, governance, migration, adoption, or cross-product architecture is unsettled; route a bounded artifact from settled decisions to **Craft**; chain both when needed.

**Gate:** Each phase has an object, outcome, evidence boundary, constraints, assumptions, and a checkable completion condition.

## 2. Select references

Load exactly the current phase’s workflow. Add only references triggered by in-scope decisions. In Craft, every foundation explicitly named by the artifact fields is required even when its decisions are settled; settled means apply rather than reopen.

| Mode trigger | Read |
| --- | --- |
| Explain, define, compare, name, or translate intent into canonical terms | [Clarify](workflows/clarify.md) |
| Audit, assess, inspect, critique, or identify problems in existing evidence | [Diagnose](workflows/diagnose.md) |
| Create or evolve reusable foundations, tokens, components, governance, migration, or adoption | [Systemize](workflows/systemize.md) |
| Design, prototype, specify, implement, redesign, polish, or emit a bounded artifact | [Craft](workflows/craft.md) |

| Cross-cutting trigger | Read |
| --- | --- |
| Concrete visual direction, composition, aesthetic judgment, craft critique, Design Read, or anti-default review | [Visual Direction & Taste](references/visual-direction.md) |
| Direction is unresolved, alternatives reduce decision risk, or the user requests variants | [Prototyping & Variant Exploration](references/prototyping.md) |
| Runnable UI, code change, rendering, screenshot inspection, or output-completeness obligation | [Implementation & Visual Iteration](references/implementation-iteration.md) |
| A token file, contract, state matrix, specification, brief, theme, reference-image plan, motion review, or migration artifact is requested | [Deliverable Templates](references/deliverables.md) |

| Foundation trigger | Read |
| --- | --- |
| Typeface, text style, hierarchy, measure, type loading, or type personality | [Typography](foundations/typography.md) |
| Palette, color role, contrast, mode, gamut, surface, or color token | [Color System](foundations/color-system.md) |
| Composition, container, grid, responsive hierarchy, reflow, positioning, or overflow | [Grid & Layout](foundations/grid-layout.md) |
| Gap, inset, rhythm, density, control size, or target separation | [Spacing](foundations/spacing.md) |
| Photography, illustration, diagram, crop, generated asset, responsive source, or alternative text | [Imagery](foundations/imagery.md) |
| Icon meaning, family, SVG, label, badge, optical size, or hit area | [Iconography](foundations/iconography.md) |
| Interaction state, feedback, animation, gesture, spring, interruption, or reduced motion | [Motion & Interaction](foundations/motion-interaction.md) |
| Object naming, labels, helper text, interface voice, state messages, claims, or localization | [Content & UX Writing](foundations/content-writing.md) |

| Adapter trigger | Read |
| --- | --- |
| Browser-native HTML/CSS/JavaScript or WAAPI is supplied or detected | [Browser-native Adapter](adapters/browser-native.md) |
| React, Next, Tailwind, Motion, or GSAP is supplied or detected | [React-stack Adapter](adapters/react-stack.md) |
| Native mobile, Expo, Reanimated, Gesture Handler, or haptics is supplied or detected | [Native-mobile Adapter](adapters/native-mobile.md) |
| Browser rendering, interaction inspection, screenshots, accessibility tree, or Playwright/equivalent is available or requested | [Browser Inspection Adapter](adapters/browser-inspection.md) |
| Image generation or semantic visual-artifact tooling is available and useful | [Visual Tools Adapter](adapters/visual-tools.md) |

For citations, source conflicts, or licensing, read [Provenance](references/provenance.md). A pinned-source refresh or exhaustive source-disposition request is a maintenance branch rather than a runtime design mode: read only Provenance and [Upstream Coverage](references/upstream-coverage.md).

**Gate:** Every loaded file has a direct trigger in the current phase; intentionally unselected workflows and adapters remain unloaded.

## 3. Execute

Apply the selected workflow contract to its completion gate. In a chain, finish and verify one phase before passing its evidence and decisions to the next. Keep a local Craft request local; introduce Systemize only when reusable capability is part of the stated outcome.

**Gate:** The phase returns its required decision, finding register, system plan, or bounded artifact with acceptance evidence.

## 4. Apply invariants

- Use canonical English terms as semantic anchors.
- Resolve conflicts in this order: **license and normative standards → explicit user/product/brand/technical constraints → mode contract → multi-source principles → source-specific craft heuristics → examples and preferences**.
- Keep the core portable: semantic HTML/CSS concepts, platform role trees, typed token data, state models, contracts, pseudocode, and behavioral checks. Adapt only to a supplied or detected stack.
- Ground visual choices in audience, task, content, brand, and platform. Treat familiar patterns as evidence questions, not automatic defects; novelty without purpose has no value.
- Treat normative accessibility as acceptance criteria and stricter thresholds as product requirements. Dark mode, a visual style, a design system, and a motion engine require explicit product evidence rather than default adoption.
- Keep evidence, assumptions, normative requirements, product constraints, governed rules, contextual heuristics, and exploration options distinguishable.
- Preserve complete vertical slices and an output ledger; requested work is implemented rather than represented by placeholders or silent omissions.

## 5. Verify and close

1. Check every requested output and acceptance criterion against rendered or inspectable evidence where available.
2. For runnable UI, complete the render/inspect/refine loop in [Implementation & Visual Iteration](references/implementation-iteration.md).
3. Report concrete blockers and the strongest available fallback for unavailable tools or untestable behavior.
4. Return the checkable artifact or result, then prioritized **Now / Next / Later** actions with owners or dependencies when known.

**Completion:** The result is grounded, portable at its contract boundary, accessible, complete, traceable to evidence or explicit assumptions, and verified at the level the available artifacts and tools permit.
