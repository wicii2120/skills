---
name: mattpocock-ralph
description: Orchestration layer for Matt Pocock's engineering skills. Use when the user mentions MattPocock-Ralph, asks which Matt Pocock flow to run, wants setup/triage/PRD/issue-slicing routed, or wants a ready issue run through a Ralph loop.
---

# MattPocock-Ralph

This skill routes work. It does not contain implementation methodology.

## First Moves

1. Run or inspect `pnpx skills list -g` when unsure which Matt Pocock skills are installed.
2. If repo lacks `docs/agents/issue-tracker.md`, `docs/agents/triage-labels.md`, or `docs/agents/domain.md`, route to `setup-matt-pocock-skills` before project-management work.
3. Pick one route below. Load that skill and follow its instructions instead of duplicating them here.

## Route Table

| User intent | Route |
| --- | --- |
| "Which Matt skill should I use?" | `ask-matt` |
| First-time repo setup for engineering skills | `setup-matt-pocock-skills` |
| Raw bug report, feature request, stale issue, label/state decision | `triage` |
| Current conversation should become a PRD | `to-prd` |
| Approved PRD, plan, or spec should become vertical issues | `to-issues` |
| Ready-for-agent issue should be executed AFK until no autonomous work remains | `ralph-loop` with the MattPocock prompt below |
| Feature implementation in current thread, no tracker issue involved | `tdd` |
| Bug/performance investigation in current thread, no tracker issue involved | `diagnosing-bugs` |
| Domain language or ADR needs updating | `domain-modeling` |
| Design question needs runnable throwaway exploration | `prototype` |
| Module/interface/test seam design is the main question | `codebase-design` |
| Session must transfer context to another agent/thread | `handoff` |

## Ralph Loop Setup

Before routing to `ralph-loop`, confirm the issue has:

- issue tracker source of truth;
- category/state labels or equivalent;
- agent brief or durable issue body;
- clear acceptance criteria;
- no unresolved human decision.

If any are missing, route to `triage`, `to-prd`, or `to-issues` first. Do not start Ralph-loop on vague work.

When ready, invoke `ralph-loop` with:

- `max_iterations: 12` by default, or `20` for hard bugs.
- `completion_promise: "NO_AFK_WORK_REMAINS"`.
- task prompt:

```md
Work issue <ISSUE_ID_OR_URL> using the Matt Pocock engineering skills.

Repo setup:
- Read `docs/agents/issue-tracker.md`.
- Read `docs/agents/triage-labels.md`.
- Read `docs/agents/domain.md`.
- Read root `CONTEXT.md` or `CONTEXT-MAP.md` and relevant context docs.
- Read relevant ADRs.

Issue contract:
- Fetch full issue body, comments, labels, and agent brief.
- Treat acceptance criteria as source of truth.
- Respect explicit out-of-scope items.
- Use project domain vocabulary.

Execution:
- Work only on this vertical slice.
- For bugs, use `diagnosing-bugs`.
- For enhancements, use `tdd`.
- Use `domain-modeling`, `prototype`, `codebase-design`, or `handoff` when their conditions apply.
- Test through public interfaces at the highest useful seam.
- Mock only system boundaries.
- Do not make speculative architecture changes.

Per iteration:
1. Rehydrate current state from issue, docs, git status, tests, and prior loop output.
2. Audit acceptance criteria.
3. Choose the smallest next action.
4. Make surgical changes only.
5. Run targeted verification.
6. Record progress, verification, next step, and blockers in the issue/MR or `.agents/ralph/runs/<id>.md`.
7. Decide whether `NO_AFK_WORK_REMAINS` is true.

Completion:
Output `<promise>NO_AFK_WORK_REMAINS</promise>` only when all AFK work is verified complete, or the issue is durably blocked with exact next human action and no useful autonomous step remains.
```

## Completion

For routed work, completion belongs to the destination skill. In the MattPocock Ralph setup, the promise is `NO_AFK_WORK_REMAINS`.
