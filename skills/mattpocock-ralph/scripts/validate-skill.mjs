#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(scriptDir, '..');
const errors = [];

const requiredFiles = [
  'SKILL.md',
  'WORKFLOW.md',
  'TEMPLATES.md',
  'scripts/bootstrap-repo.mjs',
  'scripts/start-ralph-run.mjs',
  'scripts/validate-skill.mjs',
];

for (const file of requiredFiles) {
  if (!existsSync(path.join(skillRoot, file))) errors.push(`Missing ${file}`);
}

const skill = await readText('SKILL.md');
const workflow = await readText('WORKFLOW.md');
const templates = await readText('TEMPLATES.md');

const frontmatter = skill.match(/^---\n([\s\S]*?)\n---\n/);
if (!frontmatter) {
  errors.push('SKILL.md missing YAML frontmatter.');
} else {
  const yaml = frontmatter[1];
  const name = yaml.match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = yaml.match(/^description:\s*(.+)$/m)?.[1]?.trim();
  if (name !== 'mattpocock-ralph') errors.push(`Expected name: mattpocock-ralph, got ${name || '(missing)'}.`);
  if (!description) errors.push('Missing description.');
  if (description && description.length > 1024) errors.push(`Description too long: ${description.length} chars.`);
  if (description && !/Use when\b/.test(description)) errors.push('Description must include "Use when" trigger sentence.');
}

const skillLines = skill.trimEnd().split('\n').length;
if (skillLines > 100) errors.push(`SKILL.md should stay under 100 lines; got ${skillLines}.`);

const workflowNeedles = [
  'Issue state machine',
  'PRD workflow',
  'Agent brief',
  'Ralph iteration algorithm',
  'Enhancement path: TDD',
  'Bug path: Diagnose',
  'AFK readiness checklist',
  'NO_AFK_WORK_REMAINS',
  'Completion definition',
];
for (const needle of workflowNeedles) {
  if (!workflow.includes(needle)) errors.push(`WORKFLOW.md missing "${needle}".`);
}

const templateNeedles = [
  'Agent skills block',
  'Triage `needs-info` comment',
  'PRD',
  'Ralph-sized issue',
  'Agent brief',
  'Ralph scratchpad',
  'Ralph run log',
  'Ralph completion note',
];
for (const needle of templateNeedles) {
  if (!templates.includes(needle)) errors.push(`TEMPLATES.md missing "${needle}".`);
}

const persistentFiles = [
  ['SKILL.md', skill],
  ['WORKFLOW.md', workflow],
  ['TEMPLATES.md', templates],
  ['scripts/start-ralph-run.mjs', await readText('scripts/start-ralph-run.mjs')],
];
const deprecatedRalphDir = ['.cursor', 'ralph'].join('/');
for (const [file, text] of persistentFiles) {
  if (text.includes(deprecatedRalphDir)) errors.push(`${file} still references ${deprecatedRalphDir}; use .ralph.`);
}

if (errors.length) {
  console.error('MattPocock-Ralph skill validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('MattPocock-Ralph skill validation passed.');
console.log(`- root: ${skillRoot}`);
console.log(`- SKILL.md lines: ${skillLines}`);
console.log(`- required files: ${requiredFiles.length}`);

async function readText(relativePath) {
  const fullPath = path.join(skillRoot, relativePath);
  if (!existsSync(fullPath)) return '';
  return readFile(fullPath, 'utf8');
}
