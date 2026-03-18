# Navigation

## Global Guards

Use `router.beforeEach` for global access checks and redirect logic. Return `false` to cancel the navigation or return a route location to redirect.

## Route Guards

Use `beforeEnter` for route-specific checks that should run only when entering the route from somewhere else. Use arrays of guards when a route needs reusable guard steps.

## In-Component Guards

- Use `beforeRouteUpdate` or `onBeforeRouteUpdate` when the route changes but the same component instance stays mounted.
- Use `beforeRouteLeave` or `onBeforeRouteLeave` to prevent accidental navigation away from unsaved work.
- Use `beforeRouteEnter` only when you need entry-time logic that happens before the component instance exists.

## Guard Rules

- Prefer return values over `next()` in new code.
- Avoid double-calling `next()` in legacy guards.
- Use `beforeResolve` for checks that should run after async route components and other guards are ready.

## Scroll And Lazy Loading

- Use `scrollBehavior` for scroll restoration and custom scroll positions.
- Use dynamic imports for lazy-loaded route components.

## Route-Reuse Cases

When navigating between the same route with different params, query, or hash, the component may be reused. Refetch data, reset local state, and remove listeners in response to that reuse instead of assuming a fresh mount.

