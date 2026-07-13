---
name: subagent-orchestration
description: Subagent orchestration with real Pi processes. Use when the user requests delegated agent work, parallel agents, or tmux-managed agents.
---

# Subagent Orchestration

Parent is **control plane**: dependency graph, prompts, integration, validation, and remote state. Subagents are scoped workers running in separate Pi processes.

## 1. Plan the wave

1. Turn requested work into a dependency DAG.
2. Mark overlapping files and shared mutable resources.
3. Put only independent tasks in the same wave.
4. Choose launch mode:
   - **Direct batch:** autonomous work needing no human inspection, input, debugging, or takeover; run `pi -p` as a direct process.
   - **tmux interactive:** work that may need human inspection, steering, debugging, or takeover; run interactive Pi without `-p`.
   - Default uncertain work to tmux interactive.
5. For concurrent coding, create a dedicated integration worktree and one branch/worktree per worker. Initialize each worktree, then branch each wave from latest verified integration tip.

**Gate:** Every task has dependencies, overlap, worktree/base, validation, and deliverable recorded; every task in current wave is unblocked.

## 2. Prepare each worker

Write one prompt file per worker containing:

- concrete objective and acceptance criteria;
- dependency assumptions and discoveries from earlier waves;
- owned paths and boundaries;
- required validation and deliverable;
- parent-owned actions: goals, pushes, merge requests, and issue mutations.

Tell workers to return local evidence or a local commit. Keep parent goal isolated by excluding `get_goal,create_goal,update_goal` and any exposed namespaced equivalents. For non-interactive Pi, choose project trust explicitly; use `--approve` only for trusted repositories.

**Gate:** Worker can start without missing context, prompt has one checkable finish condition, and coding worktree HEAD equals intended integration tip.

## 3. Launch real workers

For direct batch:

- launch one `pi -p` process per worker with explicit trust and goal-tool exclusions;
- use parent tool parallelism or a foreground supervisor that waits for every process;
- retain each process output and capture its exit status immediately once;
- with `tee`, use `${PIPESTATUS[0]}`;
- use `--no-session` only when transcript and recovery are disposable.

For tmux interactive:

- group related workers in one named session with separate panes or windows;
- run interactive Pi with prompt-file content as initial message;
- keep a named resumable Pi session;
- use `tmux pipe-pane` when a durable terminal log helps;
- attach to inspect, steer, debug, or take over.

**Gate:** Every direct worker has a PID/process handle and output destination; every interactive worker has a tmux session/window and resumable Pi session.

## 4. Observe the wave

Wait for every direct process and record its real exit status. Treat silent print-mode output as running until process state proves otherwise.

For tmux workers, inspect pane PID and child process tree rather than executable name. Attached operator owns steering and exits Pi after work settles.

Feed findings from completed workers into prompts for later waves.

**Gate:** Every worker has terminal status and its claimed artifact, commit, or finding is identified.

## 5. Pass the integration gate

Control plane:

1. Inspect worker artifacts and diffs.
2. Rerun fresh uncached validation.
3. Merge one branch at a time.
4. Run orchestration commands fail-fast (`set -euo pipefail` or `&&`).
5. After conflict resolution, `git add`, verify both intended changes survived, validate, commit, and verify integration tip before spawning dependent work.
6. Perform requested pushes, merge requests, and issue updates only after integrated evidence is green.

**Completion:** Every explicit requirement maps to evidence on verified integration tip; requested remote state is updated; remaining sessions, branches, and worktrees are cleaned or deliberately retained.
