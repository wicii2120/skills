# API

## Vue Adapter Exports

- `useVueTable`
- `FlexRender`
- `createColumnHelper`
- `getCoreRowModel`
- `getSortedRowModel`
- `getFilteredRowModel`
- `getPaginationRowModel`

## Core Inputs

- `data`: the table's row data.
- `columns`: the column definitions.
- `getCoreRowModel`: required for the basic table pipeline.
- `state`: controlled state values when the table is externally managed.
- `initialState`: default state values when the table manages its own state.
- `onStateChange` and `on[State]Change`: update callbacks for controlled state.

## Row and Cell Surface

- `table.getHeaderGroups()`: render table headers.
- `table.getRowModel().rows`: render body rows.
- `row.getVisibleCells()`: render cells for a row.
- `table.getState()`: inspect the current table state.
- `table.setOptions()`: update options after instantiation.

## Column Def Rules

- Use `accessorKey` for direct property access.
- Use `accessorFn` for computed values.
- Use `id` when the column cannot be uniquely inferred from the accessor or header.
- Use `header`, `cell`, and `footer` as string or render functions.
- Use `meta` for application-specific column metadata.

## State Rules

- Keep data references stable.
- Replace array data immutably when the table uses reactive data.
- Control only the state slices that the app actually needs.
- Use `table.getState()` when debugging what the table currently thinks is selected, sorted, filtered, or paginated.
