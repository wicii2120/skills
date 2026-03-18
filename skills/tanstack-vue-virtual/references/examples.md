# Examples

## Fixed

Use fixed sizing when every item has the same size. Keep `estimateSize` constant and render rows, columns, or grids with the same layout math everywhere.

## Variable

Use variable sizing when each item has a known size at render time. Pass the known dimensions into `estimateSize`, then render by row, column, grid, or masonry pattern as needed.

## Dynamic

Use dynamic sizing when exact dimensions are unknown until after render.

- Estimate the largest realistic size you can tolerate.
- Attach `measureElement` to the rendered item.
- Expect positions to settle after the first measurement pass.

```vue
<div
  v-for="virtualRow in virtualRows"
  :key="virtualRow.key"
  :ref="rowVirtualizer.value.measureElement"
  :data-index="virtualRow.index"
/>
```

Keep `data-index` on each measured element so the virtualizer can match the DOM node to the item index.

## Window Scroller

Use `useWindowVirtualizer` for page-level virtualization. Add `scrollMargin` when the list begins below a header or other fixed content.

## Padding

Use `paddingStart` and `paddingEnd` when the scrollable range needs extra space at the start or end. Use these when the list should breathe without changing the item model.

## Scroll Padding

Use `scrollPaddingStart` and `scrollPaddingEnd` when `scrollToIndex()` or `scrollToOffset()` should respect a header, toolbar, or sticky chrome. This keeps programmatic scrolling aligned with the visible area.

## Sticky

Use `rangeExtractor` plus `defaultRangeExtractor` to keep sticky group rows mounted even when they fall outside the visible range.

```ts
import { ref } from 'vue'
import { defaultRangeExtractor, useVirtualizer } from '@tanstack/vue-virtual'

const activeStickyIndexRef = ref(0)

const rowVirtualizer = useVirtualizer({
  count: rows.length,
  estimateSize: () => 50,
  getScrollElement: () => parentRef.value,
  rangeExtractor: (range) => {
    const next = new Set([
      activeStickyIndexRef.value,
      ...defaultRangeExtractor(range),
    ])

    return [...next].sort((a, b) => a - b)
  },
})
```

Update `activeStickyIndexRef` from the current visible group or section before rendering the list.

## Smooth Scroll

Use a custom `scrollToFn` when the default behavior is not enough. Prefer block translation instead of per-item absolute positioning when the list uses dynamic measurement, because smooth scrolling is more stable that way.

## Infinite Scroll

Use a loader row at the end of the list and fetch the next page when the virtual range reaches the tail. Keep the loader inside the virtualized count so the list can expose the fetch trigger without changing the scrolling model.

## Table

Use the table pattern when rows live inside `<table>` markup. Translate each row relative to its own initial position, not just `virtualRow.start`.

```vue
<tr
  v-for="(virtualRow, index) in virtualRows"
  :key="virtualRow.key"
  :style="{
    transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
  }"
>
```
