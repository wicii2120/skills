# Overview

TanStack Vue Form is a headless form state library for Vue 3. Use it for typed forms, validation, field state, array fields, linked fields, and async initial values.

## Install

```sh
npm install @tanstack/vue-form
```

## Quick Start

```vue
<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'

const form = useForm({
  defaultValues: {
    fullName: '',
  },
  onSubmit: async ({ value }) => {
    console.log(value)
  },
})
</script>

<template>
  <form @submit.prevent.stop="form.handleSubmit">
    <form.Field name="fullName">
      <template #default="{ field }">
        <input
          :name="field.name"
          :value="field.state.value"
          @blur="field.handleBlur"
          @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
        />
      </template>
    </form.Field>
    <button type="submit">Submit</button>
  </form>
</template>
```

## Vue Pattern

Use `form.Subscribe` or `form.useStore` when you need reactive submission or validation state without wiring every field into the template.

## Core Rule

Keep TanStack Form for form state and validation. Use TanStack Query separately for data fetching, especially when initial values come from an API.
