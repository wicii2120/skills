---
name: writing-commit-message
description: Conventional Commit message practices. Use whenever writing a commit message, whether directly requested or required by another workflow.
---

# Writing Commit Messages

Create one coherent commit. Treat contextual constraints as binding: they may select paths or hunks or set the message scope.

## Process

1. Inspect `git status --short`, the complete diff, staged file list, and staged diff. Use the existing staged set by default. When context defines a commit scope, stage only that scope and leave all other changes untouched. Account for every hunk in the final staged set.
2. Write a Conventional Commits 1.0.0 message in this form: `<type>[optional scope][!]: <subject>`.
   - Choose exactly one most-specific type: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. A bug fix remains `fix` when it also refactors.
   - Include a scope only when it narrows the message or context sets it.
   - Make the subject an observable, self-contained imperative with a lowercase opening, no trailing period, and at most 72 characters.
   - Add a body only when the subject cannot carry the what and why. Wrap it at 72 characters and include an issue or PR ID only when context supplies it.
   - Account for every committed file in the header or body without copying paths, diff text, or code.
   - For a breaking change, add `!` and a `BREAKING CHANGE:` footer naming the exact consumer migration. For a revert, use `revert` and name the reverted change.
3. Commit the final staged set with that message. Verify the committed content before reporting completion.
