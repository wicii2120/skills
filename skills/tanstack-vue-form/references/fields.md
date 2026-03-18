# Fields

## `Field`

Use `Field` or `<form.Field>` for the common Vue template pattern. The slot provides `field` and `state`, which expose the current value, handlers, and meta state.

```vue
<form.Field name="email">
  <template #default="{ field, state }">
    <input
      :name="field.name"
      :value="field.state.value"
      @blur="field.handleBlur"
      @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
    />
    <p v-if="!state.meta.isValid">{{ state.meta.errors.join(', ') }}</p>
  </template>
</form.Field>
```

## `useField`

Use `useField` when a field needs to be managed in script rather than through the template component. Keep it for cases where direct imperative access is simpler than slot-driven rendering.

## `useStore`

Use `useStore` for reactive subscriptions to selected form or field state slices. Prefer it over broad reactive reads when you only need a small subset of state.

## Array Fields

Use `mode="array"` for repeatable groups and use the helper methods on the array field to add, remove, swap, or move items.

## Linked Fields

Use listeners such as `onChangeListenTo` when one field must revalidate or react to another field's value.
