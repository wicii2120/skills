# Examples

## Basic Table

Use `useVueTable` with `getCoreRowModel()` and render header groups plus visible cells with `FlexRender`.

## Reactive Data

Pass a Vue `ref` or `computed` into `data` when the table should update as the source list changes. Replace arrays immutably so the reactive update is observable.

## Controlled Sorting And Pagination

Hoist only the state slices that need to drive external behavior, such as sort order, filters, or page index.

```ts
const sorting = ref([])
const pagination = ref({ pageIndex: 0, pageSize: 20 })

const table = useVueTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  state: {
    get sorting() {
      return sorting.value
    },
    get pagination() {
      return pagination.value
    },
  },
  onSortingChange: updater => {
    sorting.value = updater instanceof Function ? updater(sorting.value) : updater
  },
  onPaginationChange: updater => {
    pagination.value =
      updater instanceof Function ? updater(pagination.value) : updater
  },
})
```

When you update table data, replace `data.value` with a new array instead of mutating the existing array in place.

## Virtualized Rows

Use table rows with `@tanstack/vue-virtual` when the data set is large. Keep the table responsible for row contents and let the virtualizer handle scroll range and positioning.

## Server-Driven Tables

Use controlled filters, sorting, and pagination when they drive fetches. Treat the table state as the query input, not as duplicated local state.
