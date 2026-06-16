---
name: mattpocock-ralph
description: Orchestrates durable issue triage, PRDs, vertical slicing, domain-doc decisions, and Ralph-loop AFK execution with TDD or diagnosis. Use when the user mentions MattPocock-Ralph, wants work prepared for Ralph, asks to triage or slice work into ready-for-agent issues, or wants an autonomous Ralph run on a tracker issue.
---

# MattPocock-Ralph

## First moves

1. Read [WORKFLOW.md](WORKFLOW.md) and [TEMPLATES.md](TEMPLATES.md) before substantial action.
2. Do not assume any external Matt Pocock skill exists. This skill contains the required workflows.
3. Pick current mode:
   - **Bootstrap**: repo lacks `docs/agents/*` setup.
   - **Triage**: raw request or issue needs state/category decision.
   - **PRD**: larger feature needs product shape before slicing.
   - **Slice**: PRD/plan needs Ralph-sized issues.
   - **Prepare Ralph**: issue needs agent brief/readiness check.
   - **Run Ralph**: ready AFK issue should be implemented autonomously.
   - **Block/Handoff**: design, access, labels, or acceptance criteria prevent AFK work.

## Repo bootstrap

If repo setup is missing, use built-in setup workflow from `WORKFLOW.md`. Optional helper, run from target repo root or pass `--root <repo>`:

```bash
node .agents/skills/mattpocock-ralph/scripts/bootstrap-repo.mjs --tracker local --domain single
```

This creates `docs/agents/issue-tracker.md`, `docs/agents/triage-labels.md`, `docs/agents/domain.md`, and an `Agent skills` block in `CLAUDE.md` or `AGENTS.md` without overwriting existing files unless `--force` is passed.

## Ralph run setup

Only start Ralph when AFK readiness passes, or user explicitly asks to run despite acknowledged gaps. Optional helper, run from target repo root or pass `--root <repo>`:

```bash
node .agents/skills/mattpocock-ralph/scripts/start-ralph-run.mjs --issue <id-or-url> --max-iterations 12
```

This writes `.ralph/scratchpad.md` and `.ralph/runs/<issue>.md` using `NO_AFK_WORK_REMAINS` semantics.

## Execution rules

- Durable artifacts first: issue bodies, PRDs, agent briefs, ADRs, `CONTEXT.md`, Ralph run logs.
- Use behavior contracts, domain language, objective acceptance criteria, and public-interface tests.
- Slice vertically. One behavior at a time. Minimal code to pass. Refactor only when green.
- Bugs require diagnosis: reproduce before fixing, then regression test.
- Enhancements require TDD: one failing behavior test, minimal implementation, repeat.
- Ralph must rehydrate each iteration from issue, docs, git status, tests, and run log.
- If design is unclear or labels/criteria conflict, stop implementation and durably record `needs-info` or `ready-for-human` blocker.
- Promise `<promise>NO_AFK_WORK_REMAINS</promise>` only after all AFK work is verified complete or durably blocked with no useful autonomous next step.

## Verification

Before finishing any workflow, audit against `WORKFLOW.md` completion checklist and record exact verification commands/results in the issue, MR, or Ralph run log.
