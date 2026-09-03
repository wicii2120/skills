---
name: comment-discipline
description: "MANDATORY: Always read this skill before writing, editing, or removing any code comment, then apply its Echo Test. Also use it when a changed region contains comments."
---

# Comment Discipline

Apply the **Echo Test** to every comment in a changed region: does it state why the code exists rather than what the code already shows?

An echo restates the code. Delete the whole line rather than trimming it. Keep a comment only when it captures intent, a constraint, or a gotcha a future reader could break.

When uncertain, remove the comment. When a comment is necessary but its reason cannot be stated clearly, ask the human instead of burying the uncertainty.

**Completion:** Every kept comment states a why the code itself does not show.
