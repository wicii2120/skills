# Advanced

## Form Options

Use `formOptions` to share defaults, validators, and other options across multiple forms.

## Async Initial Values

Use TanStack Query to fetch initial form data, then pass the fetched values into `defaultValues`.

```vue
<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useForm } from '@tanstack/vue-form'
import { useQuery } from '@tanstack/vue-query'

const { data, isLoading } = useQuery({
  queryKey: ['profile'],
  queryFn: fetchProfile,
})

const form = useForm({
  defaultValues: reactive({
    firstName: computed(() => data.value?.firstName ?? ''),
    lastName: computed(() => data.value?.lastName ?? ''),
  }),
  onSubmit: async ({ value }) => {
    console.log(value)
  },
})
</script>
```

## Submission Flow

Use `onSubmit` for final submission work, and keep mutation or persistence concerns outside the field layer.

## Useful Rules

- Keep default values stable.
- Keep validation logic deterministic when possible.
- Prefer slot-driven `Field` rendering for most Vue forms.
- Use `useStore` for targeted reactive subscriptions instead of reading the whole form state.
- Use `form.Subscribe` or `useStore` for narrow debugging views instead of binding the whole form state into the template.
