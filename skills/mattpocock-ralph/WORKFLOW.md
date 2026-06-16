# MattPocock-Ralph Workflow Reference

Self-contained workflow: durable project-management methods prepare behavior-focused work; Ralph executes one AFK-ready item through repeated autonomous iterations until completion or a durable blocker.

Core idea:

> Project-management flow produces durable, domain-aware work items. Ralph consumes one ready item at a time and stops only when no useful AFK work remains.

## 1. Principles

### Durable project management

Issues, PRDs, briefs, ADRs, context docs, and run logs must survive code movement.

Prefer:

- Behavior contracts.
- Interfaces, invariants, error modes, and observable outcomes.
- Acceptance criteria that can be checked.
- Domain terms from `CONTEXT.md`.

Avoid:

- File paths in issue contracts unless unavoidable.
- Line numbers.
- Procedural instructions like "edit this function".
- Implementation trivia likely to go stale.

### Domain language first

Before planning or implementation, read `docs/agents/domain.md`, then follow it to:

- Root `CONTEXT.md`, or `CONTEXT-MAP.md` plus relevant per-context `CONTEXT.md` files.
- Relevant ADRs under `docs/adr/` and context-specific `docs/adr/` directories.

Use glossary vocabulary in issue titles, PRDs, agent briefs, tests, hypotheses, refactor proposals, and Ralph run logs.

If language is fuzzy, interview the user and inspect code until terms are clear. When terms crystallize, update `CONTEXT.md`. When a hard-to-reverse surprising trade-off is chosen, create an ADR.

### Vertical slices, never horizontal batches

Each unit of work must be a tracer bullet:

- Thin, complete path through relevant integration layers.
- Demoable or objectively verifiable alone.
- Small enough for one AFK Ralph run when possible.

Implementation discipline:

- One behavior at a time.
- One failing test at a time.
- Minimal code to pass.
- Refactor only when green.

### Interface is test surface

Tests verify behavior through public interfaces and should survive internal refactors.

Prefer:

- Highest seam that exercises real behavior.
- Integration-style tests.
- Test DBs or boundary fakes when useful.
- Mocks only at system boundaries.

Avoid:

- Mocking internal modules.
- Testing private methods.
- Asserting internal call counts.
- Bypassing the public interface to verify behavior.

### Feedback loop before confidence

For bugs, performance regressions, and risky changes, first build a fast deterministic feedback loop. Reproduce before fixing. Do not debug from vibes.

### Ralph is for AFK execution, not unresolved design

Start Ralph only when work has:

- Clear desired behavior.
- Objective acceptance criteria.
- No unresolved human design decision.
- Known issue tracker location.
- Known test/verification path, or explicit acknowledgement that a path must be created.

If Ralph discovers the issue is not AFK-ready, stop speculative implementation and move the work back into project-management flow.

## 2. Required repo setup

Repo must define common ground under `docs/agents/`:

```txt
docs/agents/
├── issue-tracker.md
├── triage-labels.md
└── domain.md
```

Bootstrap helper, run from target repo root or pass `--root <repo>`:

```bash
node .agents/skills/mattpocock-ralph/scripts/bootstrap-repo.mjs --tracker local --domain single
```

### Agent skills block

Root `CLAUDE.md` or `AGENTS.md` should contain:

```md
## Agent skills

### Issue tracker

[one-line summary of where issues are tracked]. See `docs/agents/issue-tracker.md`.

### Triage labels

[one-line summary of the label vocabulary]. See `docs/agents/triage-labels.md`.

### Domain docs

[one-line summary of layout — "single-context" or "multi-context"]. See `docs/agents/domain.md`.
```

Selection rule: use `CLAUDE.md` if it exists; else `AGENTS.md` if it exists; else create `AGENTS.md` unless user requests otherwise.

### `docs/agents/issue-tracker.md`

Defines where issues, PRDs, comments, labels, and closing actions happen.

Supported shapes:

- GitHub Issues via `gh`.
- GitLab Issues via `glab`.
- Local markdown under `.scratch/issues/`.
- Other tracker described in prose.

Every action that says "publish", "fetch issue", "apply labels", or "close" must follow this file.

### `docs/agents/triage-labels.md`

Maps canonical roles to real tracker labels.

| Canonical role | Meaning |
| --- | --- |
| `bug` | Something is broken |
| `enhancement` | New feature or improvement |
| `needs-triage` | Maintainer needs to evaluate |
| `needs-info` | Waiting on reporter/user |
| `ready-for-agent` | Fully specified, AFK-ready |
| `ready-for-human` | Needs human implementation/judgment |
| `wontfix` | Will not be actioned |

### `docs/agents/domain.md`

Defines how agents consume `CONTEXT.md`, `CONTEXT-MAP.md`, `docs/adr/`, and context-scoped ADRs. Missing domain docs are not an error; create them lazily when real language or decisions crystallize.

## 3. Issue state machine

Every triaged issue should carry exactly one category role and one state role.

Category roles:

| Role | Use |
| --- | --- |
| `bug` | Something is broken |
| `enhancement` | New feature or improvement |

State roles:

| Role | Ralph action |
| --- | --- |
| `needs-triage` | Do not implement. Gather context and recommend next state. |
| `needs-info` | Do not implement. Ask specific questions. |
| `ready-for-agent` | Eligible for Ralph AFK implementation. |
| `ready-for-human` | Do not run Ralph except to research or hand off. |
| `wontfix` | Do not implement. Preserve decision if useful. |

Normal transitions:

```txt
unlabeled
  -> needs-triage
  -> needs-info -> needs-triage
  -> ready-for-agent
  -> ready-for-human
  -> wontfix
```

Maintainer may override. If labels conflict, stop and ask before modifying.

Every issue comment posted during triage must start with:

```md
> *This was generated by AI during triage.*
```

## 4. End-to-end route map

```txt
Intake: idea/bug/request
  -> read docs/agents setup
  -> read domain docs/ADRs
  -> triage
  -> needs-info: ask specific questions
  -> wontfix enhancement: update .out-of-scope/
  -> ready-for-human: record design/human need
  -> large enhancement: PRD -> vertical issues
  -> small ready item: agent brief
  -> ready-for-agent
  -> Ralph loop
  -> bug: diagnose
  -> enhancement: TDD
  -> verify acceptance
  -> issue/MR update
  -> no AFK work remains
```

## 5. Intake and triage

Goal: turn raw requests into correctly labeled durable work items.

Steps:

1. Read `docs/agents/issue-tracker.md`, `docs/agents/triage-labels.md`, and `docs/agents/domain.md`.
2. Fetch full issue body, comments, labels, reporter, and dates.
3. Read existing triage notes to avoid re-asking resolved questions.
4. Read relevant domain docs and ADRs.
5. Read `.out-of-scope/*.md` for similar rejected enhancements.
6. Recommend category: `bug` or `enhancement`.
7. Recommend state: `needs-info`, `ready-for-agent`, `ready-for-human`, or `wontfix`.
8. For bugs, attempt reproduction before grilling the user.
9. If details are missing, ask specific actionable questions.
10. Apply labels/comments only after confirming unusual or risky transitions.

`needs-info` questions must identify exact missing facts, artifacts, desired behavior, reproduction steps, or access.

## 6. PRD workflow

Use when current conversation/context contains enough information for a larger feature.

Steps:

1. Explore repo enough to understand current behavior.
2. Read domain docs and ADRs.
3. Sketch test seams:
   - prefer existing seams;
   - use the highest seam possible;
   - propose new seams only when needed.
4. Confirm seams with the user for risky or ambiguous designs.
5. Write PRD using `TEMPLATES.md`.
6. Publish PRD to issue tracker according to `docs/agents/issue-tracker.md`.
7. Apply `ready-for-agent` only if no further triage is needed.

PRDs describe user-facing problem/solution/stories, implementation decisions, testing decisions, out of scope, and notes. Avoid file paths and code snippets unless a prototype snippet encodes a real decision better than prose.

## 7. Break PRDs into Ralph-sized issues

Each slice must:

- Deliver one narrow complete path through relevant layers.
- Be demoable or verifiable alone.
- Include objective acceptance criteria.
- State dependencies.
- Be marked `AFK` or `HITL`.

Prefer `AFK`. Mark `HITL` when human design, access, policy, or judgment is required.

Before publishing, ask or decide from available context:

- Is granularity too coarse or too fine?
- Are dependencies correct?
- Should slices merge or split?
- Are AFK/HITL markings correct?

Publish blockers first so later issues can reference real identifiers.

## 8. Agent brief: Ralph's contract

An issue should not enter Ralph unless it has an agent brief or equivalent durable body.

Principles:

- Durable over precise.
- Behavioral, not procedural.
- Interfaces over file paths.
- Complete acceptance criteria.
- Explicit out-of-scope boundaries.

Agent brief must include category, summary, current behavior, desired behavior, key interfaces, acceptance criteria, and out of scope.

## 9. Ralph integration

Ralph repeatedly executes one AFK issue until no autonomous work remains.

Ralph must:

- Re-read source-of-truth docs each iteration.
- Work in the smallest next vertical step.
- Verify after each change.
- Persist progress outside chat.
- Stop only when completion promise is true.

### State files

Start Ralph by writing `.ralph/scratchpad.md`:

```md
---
iteration: 1
max_iterations: <N or 0>
completion_promise: "NO_AFK_WORK_REMAINS"
---

<task prompt>
```

Recommended defaults:

- `max_iterations: 12` for normal slices.
- `max_iterations: 20` for hard bugs.
- `completion_promise: "NO_AFK_WORK_REMAINS"`.

Create one run log per issue:

```txt
.ralph/runs/<tracker-id-or-slug>.md
```

Do not overload `scratchpad.md`; hook owns its frontmatter/prompt contract.

Helper, run from target repo root or pass `--root <repo>`:

```bash
node .agents/skills/mattpocock-ralph/scripts/start-ralph-run.mjs --issue <id-or-url> --max-iterations 12
```

### Meaning of `NO_AFK_WORK_REMAINS`

All autonomous work for the issue is either verified complete, or explicitly moved to a durable blocked/human state with no further useful AFK action available.

If using stricter `completion_promise: "COMPLETE"`, Ralph may only output the promise when implementation is fully complete and verified. A blocked issue is not complete.

## 10. Ralph iteration algorithm

Each iteration:

1. Rehydrate current state:
   - `.ralph/scratchpad.md`;
   - `.ralph/runs/<id>.md`;
   - issue body/comments/labels;
   - agent brief;
   - relevant domain docs and ADRs;
   - `git status`;
   - existing tests and recent failures.
2. Audit acceptance criteria.
3. Classify current mode.
4. Choose smallest next action.
5. Make surgical changes only.
6. Run targeted verification.
7. Update run log.
8. Update issue/MR with durable progress or blocker notes when useful.
9. Decide whether `NO_AFK_WORK_REMAINS` is true.

Mode classifier:

| Situation | Mode |
| --- | --- |
| Bug or regression | Diagnose |
| Enhancement with clear behavior | TDD |
| Vague domain/design decision | Grill/HITL; do not implement |
| UI/logic uncertainty | Prototype |
| No good test seam / shallow modules | Architecture follow-up |
| Lost in code | Zoom out |

Smallest useful next actions:

- Write one failing behavior test.
- Build or sharpen repro loop.
- Add one temporary instrumentation probe.
- Implement minimal code for current failing test.
- Remove debug/prototype code.
- Update domain docs/ADR if a decision crystallized.
- Post blocker question if AFK progress is impossible.

Verify with the narrowest useful command first, then broader checks before completion. Record command, result, failure text if failing, and what the result proves.

## 11. Methodology inside Ralph

### Enhancement path: TDD

1. Confirm target public interface from issue/brief.
2. List behavior tests, but do not write all up front.
3. Pick first behavior.
4. RED: write one failing test through public interface.
5. GREEN: implement minimum code.
6. Repeat for next behavior.
7. Refactor only after tests are green.
8. Run relevant suite before completion.

Per-cycle checklist:

- Test describes behavior, not implementation.
- Test uses public interface.
- Test would survive internal refactor.
- Code is minimal for this behavior.
- No future feature added early.

### Bug path: Diagnose

1. Build feedback loop.
2. Reproduce actual user symptom.
3. Generate 3-5 ranked falsifiable hypotheses.
4. Test one hypothesis at a time.
5. Instrument with tagged logs, e.g. `[DEBUG-a4f2]`.
6. Convert minimized repro into regression test at correct seam.
7. Fix.
8. Verify original repro and regression test.
9. Remove instrumentation.
10. Record correct hypothesis in issue/MR/commit notes.

Do not proceed past feedback-loop phase if no credible loop exists. Ask for artifacts, access, or instrumentation permission instead.

### Prototype path

Use when question is "what should this be?" rather than "can we implement?".

Logic prototype:

- Tiny interactive terminal app.
- In-memory state.
- Pure portable logic module behind throwaway UI.
- One command to run.
- Captures answer, then deletes or absorbs.

UI prototype:

- Several radically different variants.
- Prefer existing route with `?variant=`.
- Floating switcher.
- Hidden in production.
- Winner gets rewritten/folded in; losers deleted.

Prototype output is not production code. Keep only the decision.

### Architecture path

Use when Ralph discovers friction that blocks safe work:

- No correct test seam.
- Shallow modules.
- Interface as complex as implementation.
- Logic leaking across seams.
- Too many callers need same knowledge.

Vocabulary: module, interface, implementation, depth, deep, shallow, seam, adapter, leverage, locality.

Deletion test:

> If deleting the module removes complexity, it was pass-through. If complexity reappears across callers, it was earning its keep.

Do not perform broad architecture refactors inside a narrow issue unless the issue explicitly asks for it. Instead:

1. Document specific friction.
2. If it blocks the issue, move to `ready-for-human` or create follow-up.
3. Recommend architecture work with evidence.

### Zoom-out path

Use when lost in unfamiliar code.

1. Locate entry points, public APIs, data stores, tests, and runtime commands.
2. Draw a short map of modules and data flow.
3. Identify highest useful seam for the current behavior.
4. Return to TDD/Diagnose once orientation is enough.

## 12. Documentation side effects

### `CONTEXT.md`

Write/update when canonical domain language is resolved.

Rules:

- Glossary only.
- No implementation details.
- Tight definitions.
- Include `_Avoid_` synonyms.
- Add lazily, not preemptively.

Example:

```md
**Invoice**:
A request for payment sent to a customer after delivery.
_Avoid_: Bill, payment request
```

### ADRs

Create ADRs only when all are true:

1. Hard to reverse.
2. Surprising without context.
3. Real trade-off existed.

Location:

```txt
docs/adr/0001-short-slug.md
```

Minimal format:

```md
# Short title

One to three sentences: context, decision, and why.
```

### `.out-of-scope/`

For rejected enhancements only. One file per concept:

```txt
.out-of-scope/dark-mode.md
```

Include what is out of scope, why, and prior requests. Check this directory during triage to avoid relitigating rejected concepts.

### Handoff

Use handoff when context is too large, user must resume later, Ralph hits max iterations without completion, or work needs another agent. Save handoff outside temporary directories. Reference durable artifacts instead of duplicating them.

## 13. AFK readiness checklist

Before starting Ralph:

- [ ] Issue tracker config exists.
- [ ] Label mapping exists.
- [ ] Domain doc rules exist.
- [ ] Issue has exactly one category and one state role.
- [ ] State is `ready-for-agent` or user explicitly requested AFK work.
- [ ] Agent brief or equivalent contract exists.
- [ ] Acceptance criteria are objective.
- [ ] Out of scope is stated.
- [ ] Dependencies/blockers are clear.
- [ ] No unresolved HITL design decision remains.
- [ ] Tests/verification can run locally or missing access is acknowledged.
- [ ] Ralph has `max_iterations` safety net.
- [ ] Completion promise semantics are explicit.

If any fail, do not start autonomous implementation. Triage, interview, prototype, or ask.

## 14. Blocking rules inside Ralph

Stop autonomous implementation and update durable state when:

- Acceptance criteria contradict each other.
- Issue labels conflict.
- Required secrets/access/environment are missing.
- Reproduction is impossible and no artifact exists.
- Correct behavior depends on human product judgment.
- Change contradicts an ADR without explicit permission to revisit.
- Implementation requires broad architecture work outside issue scope.
- No correct test seam exists and fix would be unsafe.

Blocker update must include:

- What was attempted.
- What was learned.
- Exact question or decision needed.
- Suggested next state: `needs-info` or `ready-for-human`.
- Partial verification/prototype/repro artifacts.

If using `NO_AFK_WORK_REMAINS`, promise only after this blocker is durably recorded and truly no useful AFK next step remains.

## 15. Completion definition

A Ralph-run issue is complete when:

- Desired behavior is implemented.
- Acceptance criteria are checked.
- Tests prove behavior at correct seam.
- Original bug repro is fixed, if bug.
- No debug instrumentation remains.
- No throwaway prototype remains unmarked.
- Docs capture durable language/decisions.
- Issue/MR tells reviewer what changed and how verified.
- No known AFK work remains.

Promise audit before outputting `<promise>NO_AFK_WORK_REMAINS</promise>`:

- [ ] Every acceptance criterion checked.
- [ ] Relevant tests pass.
- [ ] Original bug/repro no longer fails, if bug.
- [ ] Regression test exists, or missing seam documented.
- [ ] Debug logs removed.
- [ ] Throwaway prototypes deleted, absorbed, or explicitly marked.
- [ ] Domain docs/ADRs updated for new durable language/decisions.
- [ ] Issue/MR status updated.
- [ ] No known AFK step remains.

## 16. Operating modes

### Small enhancement

1. Triage as `enhancement` + `ready-for-agent`.
2. Write agent brief.
3. Start Ralph.
4. Use TDD one behavior at a time.
5. Complete with tests and issue/MR note.

### Large enhancement

1. Create PRD from conversation/context.
2. Confirm test seams when risky.
3. Publish PRD.
4. Split into vertical issues.
5. Mark AFK/HITL and dependencies.
6. Run Ralph only on `ready-for-agent` slices.

### Bug

1. Triage as `bug`.
2. Attempt reproduction.
3. If repro exists and desired behavior clear, mark `ready-for-agent`.
4. Start Ralph.
5. Use Diagnose loop.
6. Add regression test.
7. Complete with root-cause/hypothesis note.

### Architecture improvement

1. Identify evidence-backed candidate.
2. User chooses candidate or issue explicitly scopes it.
3. Clarify design and update docs.
4. Convert refactor to vertical issues.
5. Ralph implements only narrow approved slices.

### Unclear design

1. Do not start Ralph implementation.
2. Interview user and inspect code for answerable questions.
3. Update `CONTEXT.md`/ADRs inline as decisions crystallize.
4. Prototype if still uncertain.
5. Convert resolved decision into PRD/issue/brief.

## 17. Minimal command discipline

Use repo configured tooling. For JavaScript/TypeScript repos, use `pnpm`, never `npm`.

- Prefer targeted scripts before broad suites.
- Record exact commands in run logs and completion notes.
- Issue tracker commands must come from `docs/agents/issue-tracker.md`:
  - GitHub: `gh issue ...`.
  - GitLab: `glab issue ...`.
  - Local markdown: edit `.scratch/issues/...`.
  - Other: follow documented workflow.

## 18. One-screen summary

```txt
bootstrap docs/agents
  -> triage category + state
  -> ready-for-agent gates Ralph
  -> PRD for large features
  -> vertical AFK/HITL issues
  -> agent brief as durable contract
  -> Ralph one issue only
  -> rehydrate each iteration
  -> diagnose bugs / TDD features
  -> log progress
  -> verify
  -> promise only when no AFK work remains
```
