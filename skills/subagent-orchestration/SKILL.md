---
name: subagent-orchestration
description: Orchestrate work through real Pi subagents. Use for delegated agent work, concurrent agents, or tmux-managed agents.
---

# Subagent Orchestration

The parent is the **control plane**: it owns the dependency graph, worker prompts, integration, validation, and remote state. Each subagent is a scoped worker in a separate Pi process.

## 1. Plan a wave

1. Build a dependency DAG for the requested work.
2. Create a **task record** for each node: dependencies; owned paths and shared resources; base/worktree; acceptance checks; deliverable.
3. Form the current wave from unblocked tasks with disjoint ownership.
4. For concurrent coding, create an integration branch/worktree and one worker branch/worktree per task from the latest verified integration tip, then initialize each worktree.
5. Classify each worker as autonomous or operator-managed. Use operator-managed when inspection, input, steering, debugging, or takeover may be needed or is uncertain.

**Gate:** Every current-wave task record is complete; tasks are unblocked with disjoint ownership, and coding tasks share the latest verified integration base.

## 2. Prepare each worker

**Worker briefs:** Load the `writing-for-agents` skill, then write one prompt file per worker with:

- a concrete objective and one checkable finish condition;
- assumptions and confirmed findings inherited from dependencies;
- owned paths, shared resources, and boundaries;
- required validation and return form: evidence, findings, or a local commit;
- parent-owned actions: goals, pushes, merge requests, and issue mutations.

An unspecified model uses the current session's model. Isolate the parent goal by passing `--exclude-tools get_goal,create_goal,update_goal` plus exposed namespaced equivalents to every worker. For subprocesses, pass `--approve` for a trusted repository and `--no-approve` otherwise.

**Gate:** Every brief has all five fields; every worker launch excludes goal tools; every subprocess launch sets trust explicitly; every coding worktree HEAD matches its task record.

## 3. Run the wave

Choose one path per worker.

### Foreground subprocess — autonomous

- Launch each worker with `pi -p` through a distinct parent bash call, or use a foreground supervisor with one process handle and output destination per worker. Keep every call in the foreground until all subprocesses exit.
- Treat the completed bash call as the observation point: retain its output and capture the real exit status once. With `tee`, use `${PIPESTATUS[0]}`.
- Preserve the Pi session for recovery; use `--no-session` when its transcript and recovery path are disposable.

### Background tmux — operator-managed

- Group related workers in one named tmux session with separate panes or windows.
- Start interactive Pi with the brief's content as its initial message and keep a named, resumable Pi session.
- Record the tmux session/window/pane and Pi session; add `tmux pipe-pane` when recovery requires a durable terminal log.
- Continue parent work after launch. The attached operator owns observation: identify the worker by pane PID and child process tree, steer it as needed, report its outcome, and exit Pi after work settles.

Record confirmed findings needed by later waves before writing their briefs.

**Gate:** Every subprocess has a completed call/process handle, output destination, and real exit status; every tmux worker has session identifiers and an operator-reported terminal status; every claimed artifact, commit, or finding is identified.

## 4. Integrate and close

1. Inspect every worker artifact, finding, and diff.
2. Merge coding branches one at a time into the verified integration tip, running command chains fail-fast with `set -euo pipefail` or `&&`:
   - After a clean merge, rerun fresh, uncached acceptance validation before marking the new tip verified.
   - After a conflict, resolve and `git add`; verify both intended changes survived, validate, commit, and then mark the new tip verified.
3. Spawn dependent coding workers from the latest verified integration tip.
4. Perform requested pushes, merge requests, and issue updates after every explicit requirement has green integrated evidence.

**Completion:** Every explicit requirement maps to evidence on the verified integration tip; requested remote state is updated; remaining sessions, branches, and worktrees are removed or reported as deliberately retained.
