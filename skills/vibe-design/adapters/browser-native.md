# Browser-native Adapter

Load this only when browser-native HTML/CSS/JavaScript or WAAPI is supplied, detected, or intentionally selected. The portable contract remains authoritative.

## 1. Inspect support and conventions

Read existing markup, CSS architecture, browser matrix, progressive-enhancement policy, design tokens, custom elements, build tasks, and tests. Verify platform support from project evidence or current primary sources when implementation depends on newer features.

**Gate:** The browser matrix, existing convention, and enhancement/fallback boundary are explicit.

For non-trivial CSS architecture, reusable responsive components, support-gated platform features, or measured CSS performance work, read [Browser CSS Practices](../references/browser-css.md). A local one-rule visual correction does not trigger it.

## 2. Map the portable contract

- Use native elements and HTML relationships before custom roles/handlers.
- Express semantic tokens as project-compatible custom properties or generated CSS.
- Use normal flow, Grid/Flexbox, logical properties, intrinsic sizing, media/container queries, and semantic source order according to the layout contract.
- Keep state in native attributes/properties where possible; synchronize visual selectors with programmatic state.
- Use JavaScript for behavior the platform cannot express declaratively, not to recreate native controls.

## 3. Choose motion mechanism by need

- CSS transition for state changes controlled by selector/attribute.
- `@starting-style` or CSS animation for supported predetermined entry/timeline behavior.
- WAAPI for programmatic timing/control without a library.
- Pointer Events plus capture for direct manipulation.
- An existing motion engine only when the request exceeds native capability and its project compatibility is verified.

Specify exact properties, live-state interruption, cleanup/cancel behavior, focus/announcement independence, input-capability gating, and reduced-motion equivalent. Treat example timings/curves from Motion & Interaction as candidates to test, not browser defaults.

## 4. Verify

Test semantic tree, keyboard/focus, input modality, forced colors/user preferences, zoom/reflow, supported browser boundaries, console errors, and animation cancellation/interruption. Inspect compositor/layout behavior with available developer tools when performance matters.

**Completion:** The implementation uses native semantics and project-compatible CSS/JS, degrades within the declared browser matrix, preserves the portable contract, and passes behavioral/render checks without requiring an unnecessary framework or motion dependency.
