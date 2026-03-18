# Overview

TanStack Vue Query manages server state in Vue apps. Use it for cached data fetching, invalidation, optimistic updates, background refetching, and SSR hydration.

## Install

```sh
npm install @tanstack/vue-query
```

## Initialize

```ts
import { createApp } from 'vue'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

const app = createApp(App)
const queryClient = new QueryClient()

app.use(VueQueryPlugin, { queryClient })
app.mount('#app')
```

## Vue Reactivity

Pass refs or reactive getters into query options when the query should react to Vue state changes. Use direct refs in query keys when that is clearer, and use `computed` only when the derived value needs extra logic or reuse. Query keys must stay serializable and should include every reactive input that affects the fetched data.

```ts
import { computed, ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'

const userId = ref('1')

const query = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId.value),
  enabled: computed(() => !!userId.value),
})
```

## Core Rule

Keep TanStack Query for remote data and cache orchestration. Do not use it as a replacement for local component state.
