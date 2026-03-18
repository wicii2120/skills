---
name: vue-router-v5-best-practices
description: Vue Router v5 guidance for routing, navigation guards, file-based routing, typed routes, data loaders, scroll behavior, and migration from Vue Router 4 or unplugin-vue-router. Use when working on route configuration, route params, route lifecycle, loader-driven navigation, or file-based routing in a Vue codebase.
---

# Vue Router v5 Best Practices

## Overview

Treat Vue Router v5 as the default routing stack for new work. Use classic route records when the app already depends on them, and use the new core file-based routing and data loader APIs when the codebase needs typed routes, route-scoped data, or migration from `unplugin-vue-router`.

## Workflow

1. Identify the routing style first.
   - Use `createRouter` with classic route records when the app already defines routes manually.
   - Use `vue-router/vite` when the app uses file-based routing in Vite.
   - Use `vue-router/unplugin` for Webpack, Rollup, or esbuild integration.
   - Use `vue-router/experimental` for data loaders.
   - Use `vue-router/volar/*` plugins when you need typed SFC route blocks and typed routes in Volar.

2. Apply file-based routing conventions deliberately.
   - Treat `src/pages` as the default route root.
   - Use `index.vue` for index routes, `[id].vue` for params, `[[id]].vue` for optional params, `[slugs]+.vue` for repeatable params, and `[...path].vue` for catch-all routes.
   - Use `(group)` folders to organize routes without changing URLs.
   - Use `@name` suffixes for named views.
   - Use `definePage({ name: ... })` when a route needs an explicit name.

3. Handle navigation with return-based guards.
   - Use `router.beforeEach`, `router.beforeResolve`, `beforeEnter`, `beforeRouteUpdate`, and `beforeRouteLeave` as needed.
   - Return `false` to cancel a navigation and return a route location to redirect.
   - Use `next()` only when working with legacy guard code that already depends on it.
   - Use `beforeRouteUpdate` or `onBeforeRouteUpdate` when the same component stays mounted and only params, query, or hash change.

4. Use data loaders for route-scoped async state.
   - Install `DataLoaderPlugin` before the router when using data loaders.
   - Define loaders with `defineBasicLoader`, `defineLoader`, or `defineColadaLoader` as the use case requires.
   - Treat the `to` argument as the source of truth for fetch inputs.
   - Avoid side effects in loader bodies.
   - Use `reroute()` to redirect or cancel from a loader.
   - Use `lazy` when data should load after navigation instead of blocking it.

5. Migrate safely from older setups.
   - If the app is on Vue Router 4 without `unplugin-vue-router`, upgrading to v5 should not require code changes.
   - If the app uses `unplugin-vue-router`, update the plugin and utility imports to the new `vue-router/*` entry points.
   - Move generated route types to `typed-router.d.ts` or another file that is included by TypeScript.

6. Watch lifecycle and UX edges.
   - Clean up listeners in component teardown when route components are reused.
   - Refetch or reset local state when route params change but the component instance is reused.
   - Define `scrollBehavior` when navigation should restore or override scroll position.

## References

- [Overview](./references/overview.md)
- [File-Based Routing](./references/file-based-routing.md)
- [Navigation](./references/navigation.md)
- [Data Loaders](./references/data-loaders.md)
- [Migration](./references/migration.md)
