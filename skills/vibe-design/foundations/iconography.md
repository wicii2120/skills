# Iconography

**Source class:** terminology synthesized from the `Henry_He` series; family/craft guidance is supplemental; accessible-name, contrast, and target criteria are normative. See [Provenance](../references/provenance.md).

## Canonical terms and adjacent boundaries

| Term | Boundary |
| --- | --- |
| **Icon / symbol / pictogram** | Interface graphic / learned or shared sign / simplified depiction of an idea. |
| **Object / action / status icon** | Represents a thing / invokes an operation / communicates a condition. |
| **Metaphor / convention / ambiguity** | Resemblance used for meaning / learned standard / competing interpretations. |
| **Outline / filled / two-tone** | Construction styles; a style change is not sufficient state communication alone. |
| **Stroke / fill / corner language** | Structural attributes that shape a family. |
| **Visual weight / optical balance** | Perceived emphasis / visual centering despite unequal geometry. |
| **Keyline / bounding box / pixel grid** | Construction guides / nominal canvas / raster alignment target. |
| **Icon button / leading / trailing icon** | Standalone icon control / icon before / after a visible label. |
| **Visible size / hit area** | Drawn bounds / interactive target around the glyph. |
| **Accessible name / tooltip** | Programmatic control label / supplementary transient explanation. A tooltip is not the only name. |
| **Badge** | Supplemental status/count associated with an object. |

## Concise definition

**Iconography** is the semantic and visual system for compact graphical signs used to identify objects, actions, statuses, and navigation.

## Why it matters

An icon saves space only when people can recognize it. A governed family improves meaning, visual rhythm, implementation, naming, and state consistency while reducing near-duplicate metaphors.

## Visual model

```text
Meaning → audience convention → family construction → interface context
                                             ├─ visible label/tooltip
                                             ├─ accessible name
                                             └─ target + states
```

## Decisions and tradeoffs

- Start from action/object meaning, then test convention, audience, locale, and ambiguity. Use visible labels for unfamiliar, destructive, or high-consequence actions.
- Define family canvas, keylines, optical sizes, stroke/fill, joins/caps, corner language, detail, and visual-weight tests. Geometric equality is not optical balance.
- Use outline/filled differences only with a redundant cue and programmatic state.
- Prefer a real, coherent asset family already compatible with the project. A second family needs an explicit seam and visual/semantic rationale.
- SVG is portable for scalable interface icons. Inline SVG offers control; sprites improve reuse; icon fonts add loading, fallback, semantic, and multicolor costs.
- Standardize visible sizes separately from targets. Small glyphs can live in larger interactive areas.
- Define badge overflow, zero, unknown count, urgency, update frequency, and announcement behavior.
- Motion belongs only when it clarifies feedback/state and has a reduced/static equivalent.

## Framework-neutral implementation guidance

```html
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">…</svg>
</button>
```

A portable icon contract records canonical name/meaning/category, aliases, source view box, optical size, style variants, mirroring, color slots, target policy, visible-label rule, accessible-name owner, and deprecation replacement. Decorative icons inherit current text color and remain hidden from the accessibility tree.

## Accessibility implications

- Icon-only controls need a stable accessible name describing action/destination; a hover tooltip is insufficient.
- WCAG 2.2 SC 1.4.11 generally requires 3:1 for meaningful non-text graphics and visual information needed to identify controls/states.
- SC 2.5.8 sets a 24-by-24 CSS-pixel minimum target with exceptions; larger touch targets are product policy.
- Meaning cannot depend only on hue, outline/fill, animation, or position.
- Test keyboard focus, forced colors, zoom, bidirectional mirroring, dynamic name changes, and duplicate exposure. Avoid nested focusable SVGs inside controls.

## Common failure modes

- Ambiguous icon lacks a label → users guess.
- Teams redraw the same concept → metaphor and weight drift.
- SVG and parent both expose names → duplicate/conflicting announcements.
- Glyph bounds equal target bounds → controls are hard to activate.
- State is only outline versus fill → meaning disappears under perception or forced styles.
- Stroke scales unexpectedly → family weight changes by size.
- Placeholder or hand-built substitute icon ships → semantics and family coherence are unverified.

## Agent-ready wording and acceptance checks

> Define Iconography for **[context]** across object, action, and status meanings; family construction, optical sizes, visible size versus target, labels/name ownership, mirroring, badges, states, forced colors, and optional motion. Use a verified coherent asset family or document the seam. Test recognition, keyboard focus, accessible names, contrast, targets, RTL, zoom, and reduced motion.

**Accept when:** every icon has one intended meaning and name owner; ambiguity is labeled; family geometry/weight is coherent; targets and contrast pass; state remains redundant; no placeholder asset substitutes for a required control.
