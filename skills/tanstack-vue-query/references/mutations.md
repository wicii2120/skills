# Mutations

## `useMutation`

Use `useMutation` for server writes and side effects. Treat mutation results as an execution state machine with pending, success, and error states.

```ts
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()

const addTodo = useMutation({
  mutationFn: createTodo,
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})
```

## Cache Updates

Prefer targeted cache updates after mutations when the new server result is already available. Use `setQueryData` for precise updates and `invalidateQueries` when the server remains the source of truth.

## Optimistic Updates

Use `onMutate` to apply an optimistic change, return rollback data, and cancel in-flight queries that would overwrite the optimistic state.

## Advanced Mutation Controls

- Use `mutateAsync` when the caller needs `await` or `try/catch`.
- Use `scope` when same-key mutations must run serially.
- Use `retry` deliberately; mutations do not retry by default.
- Use `useMutationState` and `useIsMutating` for global mutation status or debugging.

## Invalidation

Invalidate related queries after successful writes. Match the invalidation key to the reads that depend on the changed data.

