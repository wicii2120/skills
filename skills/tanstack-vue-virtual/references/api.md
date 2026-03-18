# API

## Vue Adapter Entry Points

- `useVirtualizer`
- `useWindowVirtualizer`
- `VirtualItem`

## Required Options

- `count`: total number of items to virtualize.
- `getScrollElement`: returns the scrollable element for element-based virtualization.
- `estimateSize`: returns the expected item size before measurement.

## High-Value Options

- `overscan`: render extra items just outside the visible range.
- `horizontal`: switch from vertical to horizontal virtualization.
- `initialRect`: seed the initial scroll-element size for SSR or delayed layout.
- `initialOffset`: seed the initial scroll position.
- `getItemKey`: provide a stable item key instead of relying on the index.
- `rangeExtractor`: customize which indexes render, which is how sticky items are injected.
- `scrollToFn`: customize programmatic scrolling.
- `measureElement`: measure dynamic item size after render.
- `scrollMargin`: offset the origin when other content sits above the virtual list.
- `paddingStart` and `paddingEnd`: add padding inside the virtualized range.
- `scrollPaddingStart` and `scrollPaddingEnd`: offset scroll-to-index behavior for headers and chrome.
- `gap`: set item spacing in pixels.
- `lanes`: split the list into lanes for column, row, or masonry-style layouts.

## Instance Surface

- `getVirtualItems()`: return the current virtual items.
- `getVirtualIndexes()`: return the current virtual indexes.
- `getTotalSize()`: return the full virtualized size.
- `scrollToIndex()`: scroll to a specific item.
- `scrollToOffset()`: scroll to a specific pixel offset.
- `measure()`: force a re-measure of the virtualizer.
- `measureElement()`: attach dynamic measurement to an item element.
- `resizeItem()`: manually override an item size.
- `isScrolling`: read whether scrolling is currently active.
- `scrollDirection`: read the latest scroll direction.
- `scrollOffset`: read the current scroll offset.
- `scrollRect`: read the current scroll container rect.

## Core Rules

- Estimate the largest likely size when using dynamic measurement.
- Avoid mixing `measureElement` and `resizeItem` on the same item index.
- Use `defaultRangeExtractor` when sticky rows must stay rendered outside the visible range.
- Subtract `scrollMargin` in transforms when you position items absolutely.
- Prefer block translation for smooth scrolling when dynamic measurement is involved.
