---
name: subagent-orchestration
description: Orchestrate work through real Pi subagents. Use for delegated agent work, concurrent agents, tmux-managed agents, or fan-out workers that should share the host agent's prompt cache (session affinity).
---

# Subagent Orchestration

The parent is the **control plane**: it owns the dependency graph, worker prompts, integration, validation, and remote state. Each subagent is a scoped worker in a separate Pi process.

## 1. Plan a wave

1. Build a dependency DAG for the requested work.
2. Create a **task record** for each node: dependencies; owned paths and shared resources; base/worktree; acceptance checks; deliverable.
3. Form the current wave from unblocked tasks with disjoint ownership.
4. For concurrent coding, create an integration branch/worktree and one worker branch/worktree per task from the latest verified integration tip, then initialize each worktree.
5. Classify each worker's launch mode by both task complexity and estimated completion time: foreground subprocess or named, resumable tmux. The foreground path is only for trivial, tightly bounded tasks expected to finish in a quick foreground run and requiring no steering or durable recovery. Use tmux for every non-trivial task, every task expected to take longer than a quick foreground run, and whenever either complexity or duration is uncertain.
6. Confirm the host session id is available as `$PI_SESSION_ID` in the bash-tool environment (pi injects it by default); worker launches reference it inline.

**Gate:** Every current-wave task record is complete and has a launch mode under this rule; tasks are unblocked with disjoint ownership, and coding tasks share the latest verified integration base; the host session id is confirmed available before the first launch.

## 2. Prepare each worker

**Worker briefs:** Load the `writing-for-agents` skill, then write one prompt file per worker with:

- a concrete objective and one checkable finish condition;
- assumptions and confirmed findings inherited from dependencies;
- owned paths, shared resources, and boundaries;
- required validation and return form: evidence, findings, or a local commit;
- parent-owned actions: pushes, merge requests, and issue mutations.

An unspecified model uses the current session's model. For subprocesses, pass `--approve` for a trusted repository and `--no-approve` otherwise.

**Gate:** Every brief has all five fields; every subprocess launch sets trust explicitly; every coding worktree HEAD matches its task record.

## 3. Run the wave

Choose one path per worker.

**Session affinity:** set `PI_SESSION_AFFINITY_PARENT="$PI_SESSION_ID"` in every worker launch's environment, both paths. The worker-side extension `~/.pi/agent/extensions/session-affinity.ts` maps it to parent-session affinity headers so each worker reuses the host's warm prompt-cache prefix; without the extension the variable is a strict no-op on any provider. A worker benefits exactly up to where its brief diverges from the host's context (byte-identical prefix) — shared plan up front, task specifics last.

### Foreground subprocess path

- Launch each foreground-classified worker with `PI_SESSION_AFFINITY_PARENT="$PI_SESSION_ID" pi -p` through a distinct parent bash call, or use a foreground supervisor with one process handle and output destination per worker, its environment carrying the same variable. Keep every call in the foreground until all subprocesses exit.
- Treat the completed bash call as the observation point: retain its output and capture the real exit status once. With `tee`, use `${PIPESTATUS[0]}`.
- Preserve the Pi session for recovery; use `--no-session` when its transcript and recovery path are disposable.

### Named, resumable tmux path

- Launch each tmux-classified worker in a named tmux session; related workers may share separate panes or windows in one session.
- Start interactive Pi with the brief's content as its initial message and keep a named, resumable Pi session, carrying `PI_SESSION_AFFINITY_PARENT="$PI_SESSION_ID"` in the launched Pi's environment (e.g. `tmux new-session -d -s w1 "PI_SESSION_AFFINITY_PARENT='$PI_SESSION_ID' pi …"`).
- Record the tmux session/window/pane and Pi session; add `tmux pipe-pane` when recovery requires a durable terminal log.
- Continue parent work after launch. The parent owns observation: identify the worker by pane PID and child process tree, steer it as needed, record its outcome, and exit Pi after work settles.

Record confirmed findings needed by later waves before writing their briefs.

**Gate:** Every subprocess has a completed call/process handle, output destination, and real exit status; every tmux worker has session identifiers and an observed terminal status; every claimed artifact, commit, or finding is identified; every worker launch carries `PI_SESSION_AFFINITY_PARENT="$PI_SESSION_ID"`.

## 4. Integrate and close

1. Inspect every worker artifact, finding, and diff.
2. Merge coding branches one at a time into the verified integration tip, running command chains fail-fast with `set -euo pipefail` or `&&`:
   - After a clean merge, rerun fresh, uncached acceptance validation before marking the new tip verified.
   - After a conflict, resolve and `git add`; verify both intended changes survived, validate, commit, and then mark the new tip verified.
3. Spawn dependent coding workers from the latest verified integration tip.
4. Perform requested pushes, merge requests, and issue updates after every explicit requirement has green integrated evidence.

**Completion:** Every explicit requirement maps to evidence on the verified integration tip; requested remote state is updated; remaining sessions, branches, and worktrees are removed or reported as deliberately retained.
