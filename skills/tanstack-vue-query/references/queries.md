# Queries

## `useQuery`

Use `useQuery` for a single cached resource. Make the `queryKey` describe the data precisely, and make the `queryFn` depend on the same inputs.

```ts
import { computed, ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'

const todoId = ref('42')

const todoQuery = useQuery({
  queryKey: computed(() => ['todo', todoId.value]),
  queryFn: () => fetchTodo(todoId.value),
})
```

## `useQueries`

Use `useQueries` when the number of parallel queries changes at runtime. Keep the generated query options stable enough that the array only changes when the source list changes.

## `useInfiniteQuery`

Use `useInfiniteQuery` for append-only collections. Always define `initialPageParam` and `getNextPageParam`, and treat `data.pages` as the source of truth for rendering merged pages.

## Query Options Helpers

Use `queryOptions` and `infiniteQueryOptions` to co-locate query keys and query functions, then reuse the same definition in `useQuery`, `useSuspenseQuery`, `prefetchQuery`, or cache writes.

## Dependent Queries

Use `enabled` for serial or dependent queries. Gate the child query on a computed boolean instead of manually branching in the template.

## Suspense

Use suspense only when the component boundary and UX already expect loading to block rendering. Keep it off the default path for most applications because the API is still sensitive to framework behavior.

