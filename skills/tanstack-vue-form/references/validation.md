# Validation

## Validation Modes

Use field-level validators for field-local checks and form-level validators for cross-field rules.

## Sync And Async

Use synchronous validation for simple rules. Use async validation for server-backed checks, and debounce it when the validator would otherwise fire too often.

## Error Display

Read `field.state.meta.errors` for aggregated errors and `field.state.meta.errorMap` when you need a specific validation trigger such as `onChange` or `onBlur`.

## Schema Validation

Use Standard Schema-compatible libraries such as Zod, Valibot, ArkType, or Yup when you want concise and type-safe rules.

## Important Pattern

- Validate the same value at different times only when the UX needs it.
- Keep validation messages close to the field that owns the rule.
- Use form-level validation for dependencies that cross field boundaries.

