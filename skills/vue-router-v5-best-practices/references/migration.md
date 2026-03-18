# Migration

## From Vue Router 4

If the app does not use `unplugin-vue-router`, upgrade to v5 and keep the existing router code.

## From unplugin-vue-router

- Change Vite plugin imports from `unplugin-vue-router/vite` to `vue-router/vite`.
- Change utility imports from `unplugin-vue-router` to `vue-router/unplugin`.
- Change loader imports from `unplugin-vue-router/data-loaders/*` to `vue-router/experimental`.
- Change Volar plugins from `unplugin-vue-router/volar/*` to `vue-router/volar/*`.
- Remove the `unplugin-vue-router/client` type reference.
- Move the generated types file to `typed-router.d.ts` or another path that is included by TypeScript.

## Checkpoints

- Verify `routesFolder` paths after the move.
- Restart the TypeScript server if route names or params do not appear.
- Confirm the file-based routing plugin is still generating the expected route map.
