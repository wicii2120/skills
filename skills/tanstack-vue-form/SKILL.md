---
name: tanstack-vue-form
description: Guidance for building, explaining, debugging, and reviewing Vue 3 forms with @tanstack/vue-form and TanStack Form v1. Use when working on form state, field components, validation, arrays, linked fields, async initial values, reactive subscriptions, form options, or submission flow in a Vue codebase.
---

# TanStack Vue Form

## Overview

Treat TanStack Form as a headless form state engine. Keep layout and styling in the app, and let the form instance own field state, validation, and submission flow.

## Workflow

1. Pick the right abstraction.
   - Use `useForm` for the form instance.
   - Use `Field` or `form.Field` for template-driven field rendering.
   - Use `useField` when field state needs direct programmatic access.
   - Use `useStore` when you need a reactive slice of form state without rerendering everything.
   - Use `formOptions` when the same defaults or validators are reused.

2. Build the form around Vue slots and reactive state.
   - Keep `defaultValues` stable.
   - Use `form.handleSubmit` on the `<form>` element.
   - Read field state from the slot-provided `field` and `state` objects.
   - Use `field.handleChange` and `field.handleBlur` instead of custom event plumbing.

3. Validate deliberately.
   - Use field validators for field-local rules.
   - Use form validators for cross-field rules.
   - Use sync and async validators only where the UX needs them.
   - Read `field.state.meta.errors` and `field.state.meta.errorMap` for display.

4. Manage advanced form behaviors with the documented patterns.
   - Use array fields for repeatable groups.
   - Use linked-field listeners when one field must revalidate another.
   - Use async initial values with TanStack Query when the form starts from fetched data.
   - Use devtools when you need to inspect field state or validation timing.

## References

- [Overview](./references/overview.md)
- [Fields](./references/fields.md)
- [Validation](./references/validation.md)
- [Advanced](./references/advanced.md)
