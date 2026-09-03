# Grid & Layout

**Source class:** terminology synthesized from the `Henry_He` series; responsive/craft guidance is supplemental; reflow and order criteria are normative. See [Provenance](../references/provenance.md).

## Canonical terms and adjacent boundaries

| Term | Boundary |
| --- | --- |
| **Composition / visual hierarchy / reading flow** | Overall arrangement / signaled importance / expected comprehension sequence. |
| **Alignment / proximity / grouping / whitespace** | Relational principles that show structure and belonging. |
| **Container / column / row / gutter / outer margin** | Bounded area / tracks / spaces between tracks / outside breathing room. |
| **Baseline grid / modular grid** | Alignment by text baselines / repeated horizontal and vertical modules. |
| **Normal flow / box model** | Default document layout / content, padding, border, and margin areas. |
| **Flexbox / Grid** | One-dimensional distribution / explicit two-dimensional tracks. |
| **Viewport / breakpoint / container query** | Viewing area / behavior threshold / query based on containing context. |
| **Responsive / adaptive / intrinsic** | Continuous response / selected arrangements / content- and sizing-driven behavior. |
| **Stacking context / z-index** | Isolated paint-order context / order interpreted inside that context. |
| **Overflow / scroll container** | Content beyond a box / element that owns scrolling. |

## Concise definition

**Layout** arranges regions and content to express hierarchy, relationships, reading order, and behavior across available space. A **grid** is one alignment tool within that system.

## Why it matters

Layout makes information structure visible and determines whether content survives narrow containers, zoom, localization, dynamic data, safe areas, and embedded contexts.

## Visual model

```text
Viewport
└─ page container (bounds + outer margin)
   └─ structural grid (tracks + gutters)
      ├─ region (span + alignment + source order)
      └─ component container
         └─ intrinsic layout / container response
```

## Decisions and tradeoffs

- Start in normal flow. Use Flexbox for one-axis distribution and Grid for two-dimensional track relationships; position out of flow only when overlap or viewport attachment is intrinsic.
- Derive behavior thresholds from content failure, not device names. Record the before/after behavior and boundary cases.
- Prefer intrinsic sizing and wrapping where content can determine a safe result. Record when flexible children may shrink below their automatic min-content size; fixed tracks and clipping fail earlier under translation and zoom.
- Define a query-free usable base. Use container queries for reusable embedded components and media queries for viewport, device, and user-preference concerns; each threshold enhances at an observed content failure.
- Decide whether nested regions own independent tracks or inherit parent alignment. Shared tracks are a composition contract, not a default.
- Treat composition as information: asymmetry, overlap, dividers, numbering, and cards need a structural reason.
- Separate structural gutters from semantic spacing relationships.
- Diagnose stacking contexts before increasing z-index and define semantic layers for recurring overlays.
- Assign one intended scroll owner per axis. Nested scrolling raises interaction and accessibility cost.
- Build responsive hierarchy, not merely responsive dimensions: preserve the most important task/content as space changes.

## Framework-neutral implementation guidance

A portable layout specification records container min/max/ideal sizes, tracks, gutters, spans, alignment, source/focus order, intrinsic behavior, threshold changes, overflow ownership, safe areas, and content stress cases.

```css
.layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
  gap: var(--space-layout-grid-gap);
  inline-size: min(100% - 2 * var(--space-layout-page-edge), var(--size-content-max));
  margin-inline: auto;
}
```

Use logical properties and keep source order meaningful when tracks rearrange visually.

## Accessibility implications

- Reading and focus order follow meaning; CSS visual reordering must not create a conflicting sequence.
- WCAG 2.2 SC 1.4.10 requires reflow at equivalent narrow widths/high zoom without two-dimensional scrolling except for content that genuinely requires it.
- Sticky/fixed regions must not hide focus, anchors, errors, or zoomed content under SC 2.4.11/2.4.12 where applicable.
- Preserve target access near safe areas, onscreen keyboards, and scroll boundaries.
- Scroll regions need discoverability, keyboard reachability, and an exit path.

## Common failure modes

- Device-named breakpoints → behavior lacks a content rationale.
- Absolute positioning controls ordinary flow → dynamic text overlaps.
- Increasing z-index patches a stacking-context bug → layer debt grows.
- Visual grid order dictates DOM order → focus and reading sequence diverge.
- Fixed heights plus hidden overflow → zoomed or translated content disappears.
- Viewport queries inside every component → embeds fail in sidebars/dialogs.
- Repeated card rows or centered sections arise from habit → composition carries no subject-specific information.

## Agent-ready wording and acceptance checks

> Specify Grid & Layout for **[artifact]** with container bounds, tracks, gutters, spans, source/focus order, intrinsic and min-content behavior, content-driven thresholds, nested alignment ownership, container responses, overflow ownership, and safe-area behavior. Explain how composition expresses the task and hierarchy. Verify boundary widths, supported writing directions, long/localized content, 200%/400% zoom, text spacing, sticky focus visibility, and scroll ownership.

**Accept when:** hierarchy and task survive every boundary; source and focus order remain meaningful; no content clips; structural devices encode real relationships; scroll/layer ownership is explicit; reflow checks pass.
