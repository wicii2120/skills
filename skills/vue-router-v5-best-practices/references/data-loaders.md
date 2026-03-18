# Data Loaders

## Loader Basics

Install `DataLoaderPlugin` before the router, then use `defineLoader` helpers from `vue-router/experimental` when route-scoped data should be collected by the router and made available before rendering.

```ts
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { DataLoaderPlugin, defineBasicLoader } from 'vue-router/experimental'
import App from './App.vue'
import { getUserById } from './api'

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

createApp(App).use(DataLoaderPlugin, { router }).use(router)

export const useUserData = defineBasicLoader('/users/[id]', async (to, { signal }) => {
  return getUserById(to.params.id, { signal })
})
```

```ts
const { data: user, isLoading, error, reload } = useUserData()
```

## Loader Results

Treat the returned composable as the source of truth for the loader state. Read `data`, `isLoading`, `error`, and `reload` from the loader composable.

## Navigation-Aware Loaders

- Use `reroute()` to redirect or cancel from a loader.
- Let thrown errors abort navigation when the page should not render.
- Use `lazy` when the loader should not block navigation.
- Keep the `to` route object as the fetch input so the URL and data stay aligned.

## Loader Rules

- Avoid side effects in loader bodies.
- Call `inject()` before the first `await` if the loader needs app-provided dependencies.
- Use one loader per route concern instead of duplicating fetch logic in components.
- Treat `reload()` as a navigation-unaware refetch path.
