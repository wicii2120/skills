---
name: tanstack-vue-table
description: Guidance for building, explaining, debugging, and reviewing Vue 3 tables with @tanstack/vue-table and TanStack Table v8. Use when working on column definitions, row models, sorting, filtering, pagination, controlled table state, reactive data, table rendering, or virtualized rows in a Vue codebase.
---

# TanStack Vue Table

## Overview

Treat TanStack Table as a headless table engine. Keep markup and styling in the app, and let the table instance own row models, column state, and feature behavior.

## Workflow

1. Build the table around the data shape.
   - Use `useVueTable` to create the instance.
   - Keep data reactive when it changes over time.
   - Define columns with `accessorKey`, `accessorFn`, `header`, `cell`, and `meta` as needed.
   - Use `createColumnHelper` when it makes typed column defs easier to read.

2. Render with the Vue adapter primitives.
   - Use `table.getHeaderGroups()` for headers.
   - Use `table.getRowModel().rows` for body rows.
   - Use `row.getVisibleCells()` for cells.
   - Use `FlexRender` to render dynamic header and cell templates.

3. Control state only when the table needs to coordinate with the rest of the app.
   - Keep `state` and `on[State]Change` in sync when external state should drive sorting, pagination, filtering, or selection.
   - Use `initialState` for defaults that should stay internal.
   - Read `table.getState()` when you need to inspect the current internal state.

4. Use the feature row models deliberately.
   - Add `getCoreRowModel()` first.
   - Layer in `getSortedRowModel()`, `getFilteredRowModel()`, `getPaginationRowModel()`, or other feature row models only when the UI needs them.
   - Use `useVueTable` with reactive data and computed columns when the source data is derived.

5. Reach for virtualization when the table becomes large.
   - Combine `@tanstack/vue-table` with `@tanstack/vue-virtual` for large row sets.
   - Keep the virtualizer focused on rows, not on the table's column and cell logic.

## References

- [Overview](./references/overview.md)
- [API](./references/api.md)
- [Examples](./references/examples.md)
