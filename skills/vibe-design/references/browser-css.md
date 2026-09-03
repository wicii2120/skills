# Browser CSS Practices

Load this only for non-trivial browser CSS architecture, reusable responsive components, support-gated platform features, or measured CSS performance work. The portable foundations decide the outcome; this reference selects browser mechanisms.

## 1. Establish the support and fallback boundary

Inspect the project’s browser matrix, CSS transforms/build pipeline, stylesheet ownership, layer order, token emission, shadow roots, third-party CSS, and performance budgets. Verify support-sensitive behavior from the current CSSWG/WHATWG specification and MDN compatibility data, then exercise the actual target browsers. Baseline is an interoperability signal, not the project contract; `@supports` proves syntax recognition, not freedom from partial implementations or browser defects.

Classify every selected feature:

- **Required path:** every supported browser implements it or the build transforms it without changing semantics.
- **Enhancement path:** a complete, usable base exists outside the feature gate.
- **Measured path:** evidence shows the feature solves a real rendering cost and verification covers its side effects.

At the 2026-09-02 provenance review, cascade layers, logical properties, size container queries, subgrid, `:has()`, OKLCH, and forced colors were broadly interoperable; `@property` and `content-visibility` remained newer for long-tail matrices. Re-check rather than carrying these labels forward.

**Gate:** Each selected mechanism has project/browser evidence, a safe base or build-time fallback, and named rendering, accessibility, and performance checks.

## 2. Control the cascade before increasing specificity

**Problem:** Unplanned reset, vendor, component, utility, and override order produces selector escalation and brittle `!important` patches.

- **Use:** Follow the project’s existing architecture. Introduce named cascade layers when multiple CSS sources need stable precedence; declare their order once. Use `:where()` for deliberately low-specificity defaults.
- **Prefer another technique:** A small single-owner stylesheet can use documented source order. Do not migrate established CSS into layers without comparing computed winners: unlayered normal rules outrank layered normal rules, while important declarations reverse layer precedence.
- **Support/fallback:** Cascade layers were broadly interoperable at provenance review. If the matrix includes an older engine, transform layers at build time or retain a legacy path; essential declarations inside an unsupported `@layer` block are not a safe enhancement.
- **Implications:** Layering has negligible runtime cost, keeps overrides maintainable, and reduces pressure for author-important rules that complicate user-origin and forced-color adjustments.

```css
@layer reset, base, components, utilities, overrides;

@layer base {
  :where(button, input, select, textarea) {
    font: inherit;
  }
}
```

**Check:** Inspect a deliberate cross-layer collision in computed styles, verify third-party CSS lands in the intended layer, and account for every remaining `!important` as a documented exception.

## 3. Make flow-relative, min-content-safe layout the base

**Problem:** Physical directions and automatic min-content floors break layouts under RTL/vertical writing, long identifiers, localization, and zoom.

- **Use:** Prefer logical size, inset, margin, padding, and border properties when the relationship follows content flow. Let flexible children shrink with an explicit `min-inline-size: 0` or a zero minimum track where the content is allowed to wrap; use `overflow-wrap: anywhere` for untrusted identifiers or URLs.
- **Prefer another technique:** Physical axes remain correct for screen-coordinate effects, maps, media composition, or deliberately physical motion. Preserve normal prose wrapping when arbitrary breaks would impair reading. Fix sizing rather than masking the defect with clipping.
- **Support/fallback:** Core logical properties and intrinsic sizing were broadly interoperable at provenance review. A physical fallback is warranted only when the declared matrix requires it; keep physical then logical declarations adjacent and test both.
- **Implications:** Flow-relative rules reduce mirrored CSS; explicit minima preserve reflow and text-spacing accessibility without measurable runtime cost.

```css
.card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--space-gap-related);
}

.card__body {
  min-inline-size: 0;
  overflow-wrap: anywhere;
}
```

**Check:** Test LTR, RTL, supported vertical writing, 400% zoom, text-spacing overrides, and a long unbroken token. No track may blow out, clip content, or reorder meaning.

## 4. Query the boundary that owns the behavior

**Problem:** Viewport breakpoints make embedded components depend on where a page happens to place them.

- **Use:** Keep a query-free usable base. Use size container queries for a reusable component whose behavior depends on its allocated box; name the nearest meaningful query container. Keep viewport, device, and user-preference concerns in media queries.
- **Prefer another technique:** Intrinsic wrapping is simpler when it already produces the right hierarchy. A page-level composition that only changes with the viewport does not need a container query.
- **Support/fallback:** Size container queries were broadly interoperable at provenance review, but newer style, scroll-state, and anchored query forms are separate support decisions. `container-type: inline-size` creates containment; place it on a wrapper whose inline size does not depend on the queried descendant.
- **Implications:** Component-owned thresholds remove duplicate viewport rules, while the containment boundary can affect sizing, overflow, and focus rendering and therefore needs accessibility and layout checks.

```css
.card-shell {
  container: card / inline-size;
}

.card {
  display: grid;
  gap: var(--space-gap-related);
}

@container card (inline-size >= 36rem) {
  .card {
    grid-template-columns: minmax(0, 2fr) minmax(12rem, 1fr);
  }
}
```

**Check:** Render the same component in a narrow sidebar, dialog, and wide region; disable container-query support to confirm the base; inspect containment, overflow, focus rings, and content-driven threshold edges.

## 5. Share grid tracks only when alignment is a contract

**Problem:** Repeating nested track arithmetic drifts, while coupling every nested grid to its parent makes components hard to reuse.

- **Use:** Use `subgrid` when descendants must align to parent tracks or rows as part of the composition contract.
- **Prefer another technique:** Use an independent nested grid when the child owns its internal alignment. Flexbox or normal flow is simpler for one-axis distribution without shared tracks.
- **Support/fallback:** Subgrid was broadly interoperable at provenance review. When an older target remains, put the independent usable layout first and enhance under `@supports`; duplicated fallback tracks are migration debt, not a second governed system.
- **Implications:** Shared tracks reduce duplicated arithmetic without adding meaningful runtime cost; source-order and reflow checks prevent visual alignment from overriding accessible reading order.

```css
.content-grid {
  display: grid;
  grid-template-columns: 1fr minmax(0, 65ch) 1fr;
}

.section {
  grid-column: 2;
}

@supports (grid-template-columns: subgrid) {
  .section {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
  }

  .section > * {
    grid-column: 2;
  }
}
```

**Check:** Verify the declared nested alignment, gaps, long content, implicit tracks, and fallback at narrow and wide boundaries; source order remains meaningful.

## 6. Select from semantic state, not DOM accidents

**Problem:** Wrapper classes and JavaScript duplicate state that native elements, attributes, and selectors already expose.

- **Use:** Style `:focus-visible`, `:focus-within`, native validity/disabled states, and authoritative ARIA/data attributes. Use a tightly anchored `:has()` only to adapt presentation to real descendant or sibling state.
- **Prefer another technique:** State that changes behavior, accessible name, focus, or announcements belongs in HTML/JavaScript first. A class or data attribute is clearer for application state not represented in the DOM. CSS-only checkbox or hover interaction is not a semantic control.
- **Support/fallback:** `:focus-visible` and `:has()` were broadly interoperable at provenance review. Keep direct state styling as the base and gate relational enhancement when the matrix requires it. `:has()` takes the specificity of its most specific argument; constrain the anchor and use direct/sibling combinators rather than broad `body`, `:root`, or universal anchors.
- **Implications:** Native state reduces JavaScript/class synchronization and preserves focus/error semantics; broad relational selectors can raise style-invalidation cost on dynamic trees.

```css
:focus {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

:focus-visible {
  outline-width: 3px;
}

[aria-invalid="true"] {
  border-color: var(--color-status-error);
}

@supports selector(.field:has(> [aria-invalid="true"])) {
  .field:has(> [aria-invalid="true"]) {
    box-shadow: 0 0 0 1px var(--color-status-error);
  }
}
```

**Check:** Keyboard and pointer focus remain visible when required; errors have programmatic text/state; selector changes follow DOM mutations; profile `:has()` on a realistic dynamic tree when its anchor spans many descendants.

## 7. Treat custom properties as a bounded token API

**Problem:** Global bags of raw variables leak implementation details, inherit unexpectedly, and can fail at computed-value time.

- **Use:** Emit semantic tokens through the project’s custom-property pipeline and scope component override seams near their owner. Supply `var()` fallbacks only when the fallback is semantically valid.
- **Prefer another technique:** Static generated declarations are simpler when no runtime mode, inheritance, or override seam exists. Register with `@property` only when type validation, controlled inheritance, or interpolation solves a real problem; blanket registration adds contracts without value.
- **Support/fallback:** Unregistered custom properties are established. `@property` was newer for long-tail matrices at provenance review; unsupported browsers ignore registration but retain ordinary custom-property behavior. Registration changes inheritance and invalid-value behavior, so test the unregistered path rather than assuming equivalence.
- **Implications:** A bounded variable API localizes theme changes and reduces coupling; registration can improve interpolation but motion still needs a reduced/static path and realistic performance inspection.

```css
:root {
  --color-text: #1f2937;
}

.component {
  color: var(--component-text, var(--color-text));
}

@property --progress {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}
```

**Check:** Remove and corrupt each override, nest theme scopes, and inspect computed inheritance. If registration drives animation, verify a usable static state without registration and interruption under reduced motion.

## 8. Add modern color as a coherent enhancement

**Problem:** Perceptual or wide-gamut authoring can improve ramps and derivation, but unsupported syntax, gamut mapping, alpha, and compositing can invalidate output or contrast assumptions.

- **Use:** Keep semantic color roles authoritative. Gate modern values as a group, retain an sRGB role fallback, and use `color-mix()` only when the derived state remains governed and independently contrast-tested.
- **Prefer another technique:** Ship explicit sRGB state tokens when brand review requires exact values or the matrix/toolchain cannot preserve modern color. Do not infer WCAG contrast from OKLCH lightness.
- **Support/fallback:** OKLCH and core modern color were broadly interoperable at provenance review, with partial-function and older-browser boundaries still matrix-dependent. A `var()` fallback does not rescue an existing custom-property token stream that makes the consuming declaration invalid at computed-value time; gate the token assignment itself.
- **Implications:** Semantic derivation reduces state-color drift with negligible runtime cost, but accessibility depends on rendered contrast after gamut mapping, alpha, imagery, and compositing.

```css
:root {
  --color-action: #075bb8;
}

@supports (color: oklch(0% 0 0)) {
  :root {
    --color-action: oklch(52% 0.17 255);
  }
}
```

**Check:** Inspect computed colors in every target and supported gamut/mode; test text, icon, border, focus, hover, selected, and disabled pairs after compositing; forced colors retains meaning without the authored palette.

## 9. Let user and input capabilities override presentation

**Problem:** A single authored presentation can contradict motion, contrast, color, transparency, or input-capability needs.

- **Use:** Implement the portable preference contract with the relevant media feature. Advertise `color-scheme` only for modes the complete artifact supports. In forced colors, let the user agent lead and make narrow repairs with system colors and durable borders. Gate hover-only polish with hover/pointer capability queries while keeping the action available to keyboard and touch.
- **Prefer another technique:** Preferences do not excuse an inaccessible base or replace product-controlled theme state. Use `forced-color-adjust: none` only for an essential visual whose meaning and contrast have a verified alternate path.
- **Support/fallback:** Reduced-motion and forced-color queries were broadly interoperable at provenance review; verify each newer preference feature separately. An unmatched or unsupported query must leave the complete base behavior intact.
- **Implications:** Centralized preference rules improve accessibility and maintainability with negligible evaluation cost; capability queries never become permission to hide required behavior.

```css
@media (forced-colors: active) {
  .button {
    border: 2px solid ButtonText;
  }
}

@media (hover: hover) and (pointer: fine) {
  .button:hover {
    text-decoration-thickness: 0.15em;
  }
}
```

**Check:** Exercise supported preference combinations and keyboard, touch, coarse pointer, and fine pointer paths. Focus, state, content, and task completion remain independent of color, hover, or motion.

## 10. Apply containment only from measured evidence

**Problem:** Long, expensive off-screen subtrees can spend rendering work before they are relevant.

- **Use:** After profiling, apply `content-visibility: auto` to long, independent regions and pair it with a representative intrinsic size to limit scroll jumps. Use narrower `contain` values only when their layout, paint, and sizing isolation matches the component contract.
- **Prefer another technique:** Virtualization, pagination, cheaper DOM, or asset optimization may solve large-data/network costs that CSS containment cannot. Avoid blanket containment on focus-heavy controls, overlays, sticky content, or boxes whose external size/overflow depends on descendants.
- **Support/fallback:** `content-visibility` was newer for long-tail matrices at provenance review. Omission is the fallback; verify current support before relying on intrinsic-size behavior.
- **Implications:** Containment can reduce rendering work but adds a maintenance boundary and changes layout/paint assumptions; find, anchor, focus, selection, accessibility-tree, sticky, and overflow behavior require target-browser checks.

```css
@supports (content-visibility: auto) {
  .feed-section {
    content-visibility: auto;
    contain-intrinsic-size: auto 40rem;
  }
}
```

**Check:** Record before/after rendering evidence; verify layout stability, scroll position, find-in-page, fragment navigation, selection, sequential focus, accessibility tree, sticky/overflow behavior, and all target browsers.

**Completion:** The CSS follows one cascade and token contract; layouts survive content, direction, zoom, and embed boundaries; semantic state and user preferences remain authoritative; every support-sensitive feature has a working base; measured containment improves the named budget without behavioral loss.
