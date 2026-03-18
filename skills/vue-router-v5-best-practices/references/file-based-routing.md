# File-Based Routing

## Folder Conventions

- `index.vue` becomes the index route for its folder.
- `[id].vue` becomes a dynamic param route.
- `[[id]].vue` becomes an optional param route.
- `[slugs]+.vue` becomes a repeatable param route.
- `[...path].vue` becomes a catch-all route.

## Organization Conventions

- Use nested folders for nested URLs.
- Use `(group)` folders to group routes without changing the URL.
- Use `@name` suffixes to define named views.
- Use custom file extensions when the project needs non-`.vue` pages.

## Named Routes

Generated routes that have a `component` get a name. Use that generated name unless the codebase needs a custom one, then set it explicitly with `definePage({ name: ... })`.

## Typed Routes

File-based routing in v5 generates typed routes and route maps. Keep `typed-router.d.ts` in the TypeScript include path, and restart the TypeScript server if IntelliSense does not pick up the new route map.

Import generated routes from `vue-router/auto-routes`, and use `handleHotUpdate(router)` in Vite when you want file changes to update routes without a full reload.

## Route-Folder Rules

- Use `src/pages` as the default route root.
- Keep route folders separate; do not nest one configured route folder inside another.
- Use `routesFolder` to add more roots or to map a folder to a URL prefix.
- Build the router from the generated `routes` export rather than hand-copying the route map.
