#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  console.log(`Usage: node .agents/skills/mattpocock-ralph/scripts/start-ralph-run.mjs --issue <id-or-url> [options]

Options:
  --issue <id-or-url>       Issue identifier, URL, or local path. Required
  --title <title>           Human-readable title for run log
  --run-id <slug>           Override run-log slug
  --max-iterations <n>      Ralph max iterations. Default: 12
  --promise <text>          Completion promise. Default: NO_AFK_WORK_REMAINS
  --root <path>             Target repo root. Default: current directory
  --force                   Overwrite existing scratchpad/run log
  --help                    Show this help
`);
  process.exit(0);
}

const issue = args.issue;
if (!issue) fail('Missing required --issue <id-or-url>.');

const maxIterations = parsePositiveInteger(args['max-iterations'] || '12', '--max-iterations');
const completionPromise = args.promise || 'NO_AFK_WORK_REMAINS';
const title = args.title || issue;
const runId = args['run-id'] || slugFor(issue);
const force = Boolean(args.force);

const root = args.root ? path.resolve(args.root) : process.cwd();
const ralphDir = path.join(root, '.ralph');
const runsDir = path.join(ralphDir, 'runs');
const scratchpadPath = path.join(ralphDir, 'scratchpad.md');
const runLogPath = path.join(runsDir, `${runId}.md`);

await mkdir(runsDir, { recursive: true });

if (existsSync(scratchpadPath) && !force) {
  fail(`${path.relative(root, scratchpadPath)} already exists. Re-run with --force to replace active Ralph prompt.`);
}

if (existsSync(runLogPath) && !force) {
  fail(`${path.relative(root, runLogPath)} already exists. Re-run with --force to replace run log, or pass --run-id.`);
}

await writeFile(scratchpadPath, scratchpad(issue, runId, maxIterations, completionPromise), 'utf8');
await writeFile(runLogPath, runLog(title, issue), 'utf8');

console.log('Ralph run initialized.');
console.log(`- scratchpad: ${path.relative(root, scratchpadPath)}`);
console.log(`- run log: ${path.relative(root, runLogPath)}`);
console.log(`- completion promise: ${completionPromise}`);

function parseArgs(argv) {
  const parsed = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) fail(`Unexpected argument "${arg}".`);
    const key = arg.slice(2);
    if (key === 'force' || key === 'help') {
      parsed[key] = true;
      continue;
    }
    const value = argv[i + 1];
    if (!value || value.startsWith('--')) fail(`Missing value for --${key}.`);
    parsed[key] = value;
    i += 1;
  }
  return parsed;
}

function parsePositiveInteger(value, flag) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 0 || String(parsed) !== String(value)) {
    fail(`${flag} must be a non-negative integer.`);
  }
  return parsed;
}

function slugFor(value) {
  const issueUrlMatch = String(value).match(/\/(?:issues|issue)\/(\d+)(?:\b|$)/i);
  const mergeRequestMatch = String(value).match(/\/(?:merge_requests|pull)\/(\d+)(?:\b|$)/i);
  const candidate = issueUrlMatch?.[1] || mergeRequestMatch?.[1] || String(value);
  return candidate
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'issue';
}

function scratchpad(issueRef, runSlug, max, promise) {
  return `---
iteration: 1
max_iterations: ${max}
completion_promise: "${escapeYamlDoubleQuoted(promise)}"
---

Work issue ${issueRef} using the MattPocock-Ralph workflow.

Repo setup:
- Read \`docs/agents/issue-tracker.md\`.
- Read \`docs/agents/triage-labels.md\`.
- Read \`docs/agents/domain.md\`.
- Read root \`CONTEXT.md\` or \`CONTEXT-MAP.md\` and relevant context docs.
- Read relevant ADRs.

Issue contract:
- Fetch full issue body, comments, labels, and agent brief.
- Treat acceptance criteria as source of truth.
- Respect explicit out-of-scope items.
- Use project domain vocabulary.

Execution rules:
- Work only on this vertical slice.
- If this is a bug, follow Diagnose: feedback loop -> reproduce -> hypotheses -> instrument -> fix -> regression test -> cleanup.
- If this is an enhancement, follow TDD: one behavior test -> minimal implementation -> repeat -> refactor only when green.
- Test through public interfaces at the highest useful seam.
- Mock only system boundaries.
- Do not make speculative architecture changes.
- If design is unclear, first explore code. If still unclear, update issue to \`needs-info\` or \`ready-for-human\` with specific questions and stop autonomous implementation.
- If no correct test seam exists, document that finding and recommend architecture follow-up.

Per iteration:
1. Rehydrate current state from issue, docs, git status, tests, and \`.ralph/runs/${runSlug}.md\`.
2. Audit acceptance criteria.
3. Choose the smallest next action.
4. Make surgical changes only.
5. Run targeted verification.
6. Update \`.ralph/runs/${runSlug}.md\`.
7. If useful, update the issue/MR with durable progress or blocker notes.
8. Decide whether \`${promise}\` is true.

Completion:
You may output \`<promise>${promise}</promise>\` only when one of these is true:
- All acceptance criteria are implemented, verified, documented, and ready for review.
- Or the issue has been moved to a durable blocked/human state with specific questions or reasons, and no useful AFK step remains.
`;
}

function runLog(titleText, issueRef) {
  return `# Ralph Run: ${titleText}

## Source of truth

- Issue: ${issueRef}
- Agent brief: TODO
- PRD/parent: none
- Domain docs read: TODO
- ADRs read: TODO

## Acceptance criteria

- [ ] TODO

## Iterations

### Iteration 1

**Observed:**
- TODO

**Decision:**
- TODO

**Changed:**
- TODO

**Verified:**
- Command: \`TODO\`
- Result: TODO

**Next:**
- TODO

**Blockers:**
- None
`;
}

function escapeYamlDoubleQuoted(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
