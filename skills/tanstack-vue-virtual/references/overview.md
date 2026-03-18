# Overview

TanStack Virtual is a headless virtualization utility. Use it when a Vue app needs to render large lists, columns, grids, or tables without mounting every item at once.

## Install

```sh
npm install @tanstack/vue-virtual
```

## Minimal Element-Scroller Setup

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useVirtualizer } from '@tanstack/vue-virtual'

const parentRef = ref<HTMLElement | null>(null)

const rowVirtualizer = useVirtualizer({
  count: 1000,
  getScrollElement: () => parentRef.value,
  estimateSize: () => 36,
  overscan: 5,
})

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSize = computed(() => rowVirtualizer.value.getTotalSize())
</script>

<template>
  <div ref="parentRef" style="height: 400px; overflow: auto">
    <div :style="{ height: `${totalSize}px`, position: 'relative' }">
      <div
        v-for="row in virtualRows"
        :key="row.key"
        :style="{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: `${row.size}px`,
          transform: `translateY(${row.start}px)`,
        }"
      >
        Row {{ row.index }}
      </div>
    </div>
  </div>
</template>
```

## When To Use The Window Adapter

Use `useWindowVirtualizer` when the page window is the scroll surface. Add `scrollMargin` when the list starts below a header, toolbar, or other fixed content so scroll targets stay aligned.

## Vue Pattern

Keep option objects in `computed` when they depend on reactive state such as `count`, measured header height, or an externally fetched dataset. Keep the virtualizer logic out of the template and let the template only render the returned virtual items.
