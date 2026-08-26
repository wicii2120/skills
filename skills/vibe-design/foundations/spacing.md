# Spacing

**Source class:** supplemental professional guidance; accessibility behavior is normative. The supplied linux.do series has no Spacing topic. See [Provenance](../references/provenance.md).

## Canonical terms and adjacent boundaries

| Term | Boundary |
| --- | --- |
| **Spacing scale** | Bounded reusable distance primitives; may be linear, geometric, or hybrid. |
| **Gap** | Parent-owned space between siblings. |
| **Inset** | Space inside a container boundary, commonly padding. |
| **Stack / inline cluster** | Repeated block-axis / inline-axis relationships. |
| **Section spacing** | Separation between major regions, distinct from component gaps. |
| **Density** | Coordinated information, control, type, and spacing compactness; not padding alone. |
| **Visual rhythm** | Perceived pattern of spacing, scale, repetition, and interruption across an artifact. |
| **Optical spacing** | Deliberate correction when equal measured distances look unequal. |
| **Whitespace** | Unoccupied compositional space; not every instance should become a token. |

## Concise definition

**Spacing** is the system of intentional distances that expresses grouping, hierarchy, rhythm, density, and target separation.

## Why it matters

Spacing is a primary cue for relatedness. Semantic roles reduce arbitrary values while allowing density, responsiveness, and component composition to change without losing meaning.

## Visual model

```text
primitive: space.0, space.50, space.100 ...
     ↓
semantic: space.inset.control, space.gap.related, space.layout.section
     ↓ only when justified
component: dialog.content.inset
```

## Decisions and tradeoffs

- Choose a base/progression that fits typography, density, platform, and input method. Four- or eight-unit progressions are common heuristics, not rules.
- Name semantic spacing by relationship and context rather than numeric value.
- Prefer parent-owned gap and container-owned inset to child margins and positional repair.
- Separate density from viewport size. A narrow viewport does not automatically require smaller controls.
- Use fluid spacing selectively for compositional distances; stepped values are often more predictable inside controls.
- Use logical block/inline directions.
- Build rhythm through meaningful variation. Uniform section slabs can feel mechanical; arbitrary variation feels unstable.
- Allow optical exceptions with a named reason, owner, and review path.
- Isolate negative spacing/overlap behind a pattern contract because it changes flow, focus rings, and hit testing.

## Framework-neutral implementation guidance

```css
:root {
  --space-gap-related: 0.5rem;
  --space-inset-control-inline: 0.75rem;
  --space-layout-section: clamp(2rem, 4vi, 4rem);
}

.field-group { display: grid; gap: var(--space-gap-related); }
.control { padding-block: var(--space-inset-control-block); padding-inline: var(--space-inset-control-inline); }
```

Record each semantic role, axis where material, density behavior, permitted consumers, and composition intent. Avoid exposing every primitive as the encouraged product API.

## Accessibility implications

- Target size is an interaction contract, not a side effect of spacing. WCAG 2.2 SC 2.5.8 defines a 24-by-24 CSS-pixel minimum with exceptions; a larger touch target is a product requirement when adopted.
- Preserve separation between adjacent targets and visible focus indicators under zoom/reflow.
- Support SC 1.4.12 text-spacing overrides without clipping or overlap; fixed box heights cannot substitute for flexible layout.
- Whitespace cannot establish programmatic relationships between labels, controls, groups, or headings.

## Common failure modes

- One-off values proliferate → semantic roles or governance are missing.
- Child margins define composition → optional/reordered children leave broken space.
- Responsive rules halve everything → hierarchy and target size collapse.
- Density changes padding only → type, information load, and targets become incoherent.
- Optical exceptions enter the public scale → a hidden second scale forms.
- Negative margins repair a missing layout contract → overflow and focus become fragile.
- Every section has identical padding → rhythm is a template rather than an information decision.

## Agent-ready wording and acceptance checks

> Define semantic Spacing for **[context]** using primitive values, related-content gaps, container insets, section rhythm, density, and documented optical exceptions. Use logical axes and parent-owned relationships. Distinguish WCAG target criteria from product policy. Verify localization, zoom/reflow, user text spacing, focus rings, adjacent targets, optional children, and boundary widths.

**Accept when:** each semantic role explains a relationship; density remains coherent; targets and focus are usable; composition has deliberate rhythm; no local spacing hack masks a layout problem.
