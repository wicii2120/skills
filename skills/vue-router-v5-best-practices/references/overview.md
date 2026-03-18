# Overview

Vue Router v5 is the current router stack for Vue applications. Use it for classic route records, file-based routing, navigation control, typed routes, and data loaders.

## Install

```sh
npm install vue-router
```

## Classic Router Setup

```ts
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./pages/Home.vue') },
  ],
})

createApp(App).use(router).mount('#app')
```

## File-Based Routing Setup

```ts
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'vue-router/vite'

export default defineConfig({
  plugins: [
    VueRouter(),
    Vue(),
  ],
})
```

After the first dev-server run, include the generated route types file in TypeScript, typically `typed-router.d.ts`, so typed routes and route names stay available in the editor.

```ts
import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

if (import.meta.hot) {
  handleHotUpdate(router)
}
```

## Core Rule

Keep route definitions and route-scoped data close to the URL shape. Use the router for navigation, matching, and loader lifecycle, and keep component logic focused on rendering.
