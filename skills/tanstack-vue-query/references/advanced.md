# Advanced

## QueryClient

Use one shared `QueryClient` per app instance unless there is a concrete isolation requirement. Use `useQueryClient` when a component needs imperative cache access.

## Hydration

Use `dehydrate` and `hydrate` for SSR, Nuxt, or persisted caches. Only hydrate data that should survive a server-to-client handoff.

## Prefetching

Use `prefetchQuery` or `fetchQuery` for route transitions, hover preloads, and other render-as-you-fetch flows.

## Filtering and Background Work

Use query and mutation filters to target cache operations precisely. Use `useIsFetching` and `useIsMutating` for global loading indicators.

## Devtools

Add `@tanstack/vue-query-devtools` when debugging cache invalidation, query lifecycles, or hydration issues.

## Important Defaults

- Queries are stale by default.
- Vue query results are immutable.
- Retries on the server default to zero.
- Reactive getters are often enough for simple derived inputs; use `computed` when the value is reused or the derivation is more involved.
