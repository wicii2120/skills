---
name: comment-discipline
description: Comment discipline — the Echo Test for code comments. Use when a changed region contains comments or comments are being written; resolves whether each stays or goes.
---

# Comment Discipline

Apply the **Echo Test** to every comment in a changed region: does it state why the code exists rather than what the code already shows?

An echo restates the code. Delete the whole line rather than trimming it. Keep a comment only when it captures intent, a constraint, or a gotcha a future reader could break.

When uncertain, remove the comment. When a comment is necessary but its reason cannot be stated clearly, ask the human instead of burying the uncertainty.

**Completion:** Every kept comment states a why the code itself does not show.
