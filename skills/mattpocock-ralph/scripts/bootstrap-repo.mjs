#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  console.log(`Usage: node .agents/skills/mattpocock-ralph/scripts/bootstrap-repo.mjs [options]

Options:
  --tracker <local|github|gitlab|other>  Issue tracker shape. Default: local
  --domain <single|multi>                Domain-doc layout. Default: single
  --agent-file <CLAUDE.md|AGENTS.md>     Agent instructions file to update
  --root <path>                          Target repo root. Default: current directory
  --force                                Overwrite docs/agents files if present
  --help                                 Show this help
`);
  process.exit(0);
}

const tracker = args.tracker || 'local';
const domain = args.domain || 'single';
const force = Boolean(args.force);

if (!['local', 'github', 'gitlab', 'other'].includes(tracker)) {
  fail(`Invalid --tracker "${tracker}". Expected local, github, gitlab, or other.`);
}

if (!['single', 'multi'].includes(domain)) {
  fail(`Invalid --domain "${domain}". Expected single or multi.`);
}

const root = args.root ? path.resolve(args.root) : process.cwd();
const docsDir = path.join(root, 'docs', 'agents');
await mkdir(docsDir, { recursive: true });

const writes = [];
await writeIfMissing(path.join(docsDir, 'issue-tracker.md'), issueTrackerDoc(tracker), { force, writes });
await writeIfMissing(path.join(docsDir, 'triage-labels.md'), triageLabelsDoc(), { force, writes });
await writeIfMissing(path.join(docsDir, 'domain.md'), domainDoc(domain), { force, writes });

if (tracker === 'local') {
  await mkdir(path.join(root, '.scratch', 'issues'), { recursive: true });
  await mkdir(path.join(root, '.scratch', 'prds'), { recursive: true });
  await writeIfMissing(path.join(root, '.scratch', 'issues', 'README.md'), localIssuesReadme(), { force: false, writes });
}

const agentFile = chooseAgentFile(root, args['agent-file']);
await ensureAgentSkillsBlock(agentFile, tracker, domain, writes, force);

console.log('MattPocock-Ralph repo setup complete.');
for (const line of writes) console.log(`- ${line}`);

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

function chooseAgentFile(rootDir, explicit) {
  if (explicit) return path.resolve(rootDir, explicit);
  const claude = path.join(rootDir, 'CLAUDE.md');
  const agents = path.join(rootDir, 'AGENTS.md');
  if (existsSync(claude)) return claude;
  if (existsSync(agents)) return agents;
  return agents;
}

async function writeIfMissing(file, content, { force: shouldForce, writes: log }) {
  const existed = existsSync(file);
  if (existed && !shouldForce) {
    log.push(`kept existing ${path.relative(root, file)}`);
    return;
  }
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content, 'utf8');
  log.push(`${existed ? 'wrote' : 'created'} ${path.relative(root, file)}`);
}

async function ensureAgentSkillsBlock(file, trackerKind, domainKind, log, shouldForce) {
  const relative = path.relative(root, file);
  const block = agentSkillsBlock(trackerKind, domainKind);
  if (!existsSync(file)) {
    await writeFile(file, `# Agent Instructions\n\n${block}\n`, 'utf8');
    log.push(`created ${relative}`);
    return;
  }

  const current = await readFile(file, 'utf8');
  if (/^## Agent skills\b/m.test(current)) {
    if (!shouldForce) {
      log.push(`kept existing Agent skills block in ${relative}`);
      return;
    }
    const updated = current.replace(/^## Agent skills\b[\s\S]*?(?=^##\s|\s*$)/m, block);
    await writeFile(file, `${updated.trimEnd()}\n`, 'utf8');
    log.push(`updated Agent skills block in ${relative}`);
    return;
  }

  const separator = current.endsWith('\n') ? '\n' : '\n\n';
  await writeFile(file, `${current}${separator}${block}\n`, 'utf8');
  log.push(`appended Agent skills block to ${relative}`);
}

function agentSkillsBlock(trackerKind, domainKind) {
  return `## Agent skills

### Issue tracker

Issues, PRDs, comments, labels, and closing actions use the ${trackerKind} tracker workflow. See \`docs/agents/issue-tracker.md\`.

### Triage labels

Category/state labels use canonical role mappings. See \`docs/agents/triage-labels.md\`.

### Domain docs

Domain language uses the ${domainKind}-context layout. See \`docs/agents/domain.md\`.`;
}

function issueTrackerDoc(kind) {
  if (kind === 'github') return `# Issue Tracker

This repo uses GitHub Issues via \`gh\`.

## Fetch

- \`gh issue view <id> --comments --json title,body,comments,labels,author,createdAt,updatedAt,url\`

## Create/update

- \`gh issue create --title "..." --body-file <file> --label <label>\`
- \`gh issue comment <id> --body-file <file>\`
- \`gh issue edit <id> --add-label <label> --remove-label <label>\`

## Close

- \`gh issue close <id> --comment "..."\`
`;

  if (kind === 'gitlab') return `# Issue Tracker

This repo uses GitLab Issues via \`glab\`.

## Fetch

- \`glab issue view <id> --comments\`

## Create/update

- \`glab issue create --title "..." --description-file <file> --label <label>\`
- \`glab issue note <id> --message "..."\`
- \`glab issue update <id> --label <label>\`

## Close

- \`glab issue close <id>\`
`;

  if (kind === 'other') return `# Issue Tracker

This repo uses a custom issue tracker.

## Required workflow

Document exact commands or URLs for:

- Fetching full issue body, comments, labels, reporter, and dates.
- Creating PRDs/issues.
- Posting comments.
- Applying/removing labels.
- Closing issues.

Agents must not guess tracker behavior; update this file before publishing or mutating tracker state.
`;

  return `# Issue Tracker

This repo uses local markdown issues under \`.scratch/issues/\`.

## Issue files

- One issue per markdown file.
- File name format: \`<id-or-slug>.md\`.
- PRDs may live under \`.scratch/prds/\` or as issue files with \`type: prd\` frontmatter.

## Comments

Append dated comments under a \`## Comments\` heading in the issue file.

## Labels

Represent labels in issue frontmatter:

\`\`\`yaml
labels:
  - enhancement
  - ready-for-agent
\`\`\`

## Closing

Mark completion in frontmatter with \`state: closed\` and add completion notes.
`;
}

function triageLabelsDoc() {
  return `# Triage Labels

Every triaged issue should have exactly one category label and one state label.

## Category roles

| Canonical role | Tracker label | Meaning |
| --- | --- | --- |
| \`bug\` | \`bug\` | Something is broken |
| \`enhancement\` | \`enhancement\` | New feature or improvement |

## State roles

| Canonical role | Tracker label | Meaning |
| --- | --- | --- |
| \`needs-triage\` | \`needs-triage\` | Maintainer needs to evaluate |
| \`needs-info\` | \`needs-info\` | Waiting on reporter/user |
| \`ready-for-agent\` | \`ready-for-agent\` | Fully specified, AFK-ready |
| \`ready-for-human\` | \`ready-for-human\` | Needs human implementation/judgment |
| \`wontfix\` | \`wontfix\` | Will not be actioned |
`;
}

function domainDoc(kind) {
  if (kind === 'multi') return `# Domain Docs

This is a multi-context repo.

## Read order

1. Root \`CONTEXT-MAP.md\`.
2. Relevant per-context \`CONTEXT.md\` files named by \`CONTEXT-MAP.md\` or the issue/PRD.
3. Root ADRs under \`docs/adr/\`.
4. Context-specific ADRs under each context's \`docs/adr/\`.

## Missing docs

Missing context docs are not an error. Create/update them lazily only when canonical language or durable decisions crystallize.
`;

  return `# Domain Docs

This is a single-context repo.

## Read order

1. Root \`CONTEXT.md\` if present.
2. ADRs under \`docs/adr/\` if present.
3. Context-specific docs named by the issue/PRD if present.

## Missing docs

Missing \`CONTEXT.md\` or \`docs/adr/\` is not an error. Create/update them lazily only when canonical language or durable decisions crystallize.
`;
}

function localIssuesReadme() {
  return `# Local Issues

Markdown issue files used by the MattPocock-Ralph workflow.

Recommended frontmatter:

\`\`\`yaml
title: Short issue title
labels:
  - enhancement
  - ready-for-agent
state: open
\`\`\`
`;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
