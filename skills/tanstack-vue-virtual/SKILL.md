---
name: tanstack-vue-virtual
description: Guidance for building, explaining, debugging, and reviewing Vue 3 virtualization with @tanstack/vue-virtual and TanStack Virtual v3. Use when working on virtualized lists, columns, grids, tables, sticky rows, window scrollers, dynamic measurement, smooth scrolling, padding, or infinite loading in a Vue codebase.
---

# TanStack Vue Virtual

## Overview

Treat TanStack Virtual as a headless virtualization layer. Keep markup, layout, and styling in the app, and keep the virtualization logic focused on scroll state, measurement, and item range selection.

## Workflow

1. Classify the request before coding.
   - Use `useVirtualizer` for element-based scroll containers.
   - Use `useWindowVirtualizer` when the window is the scroll element.
   - Use fixed sizing when every item shares the same size.
   - Use variable sizing when each item has a known size at render time.
   - Use dynamic sizing when item size is only known after render and measurement.
   - Use the table, sticky, padding, smooth scroll, or infinite scroll patterns for those special cases.

2. Build the virtualizer with Vue reactivity in mind.
   - Store the scroll element in a `ref`.
   - Wrap option objects in `computed` when they depend on reactive state.
   - In script, access the returned instance through `.value` when following the Vue examples.
   - Prefer a stable `getItemKey` when item identity exists.

3. Render the list headlessly.
   - Render an outer scroll container.
   - Render an inner spacer using `getTotalSize()`.
   - Map `getVirtualItems()` to absolutely positioned rows or to a translated block.

4. Handle advanced behavior with the documented helpers.
   - Use `defaultRangeExtractor` when adding sticky indexes.
   - Use `scrollMargin`, `paddingStart`, `paddingEnd`, `scrollPaddingStart`, and `scrollPaddingEnd` for headers and offsets.
   - Use `measureElement` for dynamic sizing and `resizeItem` only when you know the final size ahead of time.
   - Use `scrollToFn` only when the built-in scrolling behavior is not enough.

## References

- [Overview](./references/overview.md)
- [API](./references/api.md)
- [Examples](./references/examples.md)
