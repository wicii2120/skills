---
name: tanstack-vue-query
description: Guidance for building, explaining, debugging, and reviewing Vue applications that use @tanstack/vue-query and TanStack Query v5. Use when working on query keys, reactivity, caching, mutations, invalidation, infinite queries, hydration, SSR, prefetching, devtools, or QueryClient setup in a Vue codebase.
---

# TanStack Vue Query

## Overview

Treat TanStack Query as the data layer for async server state. Keep the skill focused on query lifecycle, cache behavior, invalidation, mutation side effects, and Vue reactivity rather than local UI state.

## Workflow

1. Identify the data-flow pattern first.
   - Use `useQuery` for one cached server resource.
   - Use `useQueries` for dynamic parallel queries.
   - Use `useInfiniteQuery` for paginated or infinite lists.
   - Use `useMutation` for create, update, delete, and other server side effects.
   - Use `useQueryClient` when you need cache reads, invalidation, prefetching, or manual updates.

2. Make Vue reactivity explicit.
   - Pass refs or reactive getters when query inputs should update reactively.
   - Use direct refs in query keys when possible, and use `computed` for derived values or `enabled` flags when that keeps the intent clearer.
   - Keep query keys serializable, stable, and specific to the fetched data.
   - Prefer `queryOptions` and `infiniteQueryOptions` when the same query config is reused in multiple places.

3. Shape the cache deliberately.
   - Use `staleTime` to control when cached data is considered fresh.
   - Use `enabled` to gate dependent queries.
   - Use `placeholderData` and `initialData` only when the UX needs a seed value.
   - Use `invalidateQueries`, `setQueryData`, `prefetchQuery`, and `fetchQuery` instead of manual cache copies.

4. Handle writes with cache updates in mind.
   - Invalidate related queries after successful mutations when fresh server state is the source of truth.
   - Use `onMutate`, `onError`, and `onSettled` for optimistic updates and rollback logic.
   - Use `mutateAsync` when the caller needs promise-based control flow.
   - Add mutation `scope` only when serial execution is required.

5. Add framework integration only when needed.
   - Use `VueQueryPlugin` once at app bootstrap with a shared `QueryClient`.
   - Use hydration helpers for SSR, Nuxt, and persisted caches.
   - Use devtools to inspect cache state when debugging query behavior.

## References

- [Overview](./references/overview.md)
- [Queries](./references/queries.md)
- [Mutations](./references/mutations.md)
- [Advanced](./references/advanced.md)
