# Overview

TanStack Vue Table is a headless adapter around TanStack Table core. Use it for Vue 3 tables and datagrids that need typed columns, row models, state control, and flexible rendering.

## Install

```sh
npm install @tanstack/vue-table
```

## Minimal Table

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table'

type Person = {
  firstName: string
  lastName: string
  age: number
}

const data = ref<Person[]>([
  { firstName: 'Ada', lastName: 'Lovelace', age: 36 },
])

const columns = [
  {
    accessorKey: 'firstName',
    header: 'First name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
]

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <table>
    <thead>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <th v-for="header in headerGroup.headers" :key="header.id">
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in table.getRowModel().rows" :key="row.id">
        <td v-for="cell in row.getVisibleCells()" :key="cell.id">
          <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
```

## Vue Patterns

Use Vue refs or computed values when the table should react to changing data. Keep the rendered markup separate from the table logic and let the instance supply headers, rows, and cells.

TanStack Table treats reactive data as shallow, so replace the array value instead of mutating it in place.

## When To Reach For State Control

Control sorting, filtering, pagination, and selection when those values need to drive route params, server fetches, or shared UI. Otherwise, let the table manage them internally with `initialState`.
