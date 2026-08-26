# Content & UX Writing

**Source class:** supplemental professional guidance plus contextual synthesis from upstream interface-craft sources; semantics and accessible-name behavior are normative. See [Provenance](../references/provenance.md).

## Canonical terms and adjacent boundaries

| Term | Boundary |
| --- | --- |
| **Object-oriented naming** | Names user-recognized domain objects and actions, not implementation details or database structure. |
| **Label / helper text / placeholder** | Names a control / explains constraints or consequence / supplies transient example or format hint. A placeholder is not a label. |
| **Accessible name / visible label** | Programmatic identifier / text people see. Prefer alignment; explain unavoidable differences. |
| **Voice / tone / register** | Stable product character / contextual emotional adjustment / vocabulary and formality level. |
| **Action label / state message** | Verb phrase predicting an action / text describing loading, empty, error, success, or status. |
| **Error / recovery language** | What failed and why / what the user can do next. |
| **Localization / internationalization** | Adaptation for a locale / technical/content design that enables adaptation. |
| **Real / sample / fabricated content** | Supplied or verified truth / restrained replaceable example / unsupported claim presented as fact. |
| **Content hierarchy** | Order and emphasis that makes the primary task and supporting context scannable. |

## Concise definition

**Content & UX Writing** is the system for naming objects and actions, structuring interface information, and writing labels, guidance, and state messages that help people understand, act, and recover.

## Why it matters

Words define the product model as users experience it. Consistent names reduce cognitive load; real content exposes layout and state problems; clear recovery language turns failure into a solvable next step.

## Visual model

```text
User object → available action → system state → next action
     │              │                │             │
 anatomy label   control label   status/error   recovery
```

Content and component anatomy are one contract: a field’s label, helper, value, validation, and error occupy different semantic slots and jobs.

## Decisions and tradeoffs

- Name objects by what users recognize and control. “Notifications” is clearer than an internal delivery subsystem name.
- Use active voice and specific verbs. Keep one action name through trigger, progress, confirmation, history, and recovery.
- Match voice to brand/audience while keeping task language direct. Cleverness that obscures outcome is a defect.
- Design with real supplied content first. When absent, create restrained sample content marked for replacement.
- Keep each slot to one job: label names, helper explains, placeholder exemplifies, error identifies and recovers, success confirms.
- Define empty, loading, error, success, offline, permission, destructive, and partial-completion language with the component state model.
- Explain failure without blame or vague apology: what happened, impact, preserved work, and next safe action.
- Preserve hierarchy through short, scannable labels and progressive detail. Do not shrink essential content to satisfy a composition.
- Internationalize sentence construction, numbers, dates, pluralization, text expansion, writing direction, and culturally dependent metaphors.
- Claims, endorsements, customers, metrics, prices, legal assurances, and precision statistics require supplied evidence. Sample data stays recognizable as sample.

## Framework-neutral implementation guidance

A content contract records object vocabulary, action labels, slot purpose, length/format constraints, state copy, substitutions, localization notes, accessible-name source, announcement behavior, and evidence status.

```text
Field anatomy:
label (persistent name)
helper (constraint or consequence)
control/value
error (what failed + recovery)
status (loading/saved/offline when material)
```

Use semantic HTML or platform roles to associate labels, descriptions, errors, and status messages. Keep content in localizable resources where the platform supports them; avoid string concatenation that breaks grammar.

## Accessibility implications

- Controls need stable accessible names from native labels or a justified naming mechanism; visible and accessible labels should match or begin consistently under WCAG 2.2 SC 2.5.3.
- Instructions and errors must not depend only on position, color, shape, or sensory language (SC 1.3.3, 1.4.1).
- Identify input purpose, errors, and correction suggestions under SC 1.3.5, 3.3.1, and 3.3.3 where applicable.
- Announce material status changes without moving focus under SC 4.1.3. Preserve user input and explain destructive consequences.
- Plain, consistent naming supports cognitive accessibility; product policy may set additional reading-level or terminology rules.

## Common failure modes

- Internal architecture names appear in UI → users cannot predict objects/actions.
- “Submit,” “Continue,” or “OK” hides consequence → action labels are not task-specific.
- Placeholder replaces label → the name disappears after entry.
- Empty/loading/error/success states are missing → components only support ideal data.
- Error says only “Something went wrong” → no diagnosis or recovery.
- Marketing register appears inside task UI → trust and comprehension drop.
- Generated copy fabricates customers, metrics, or precision → prototype looks evidentiary when it is not.
- English-length layout clips translations → content and anatomy were designed separately.
- Visible label and accessible name diverge → voice/control users cannot match what they see.

## Agent-ready wording and acceptance checks

> Define Content & UX Writing for **[flow/component]** around user-recognized objects and consistent action names. Specify labels, helper text, examples, empty/loading/error/success/offline states, recovery, accessible-name sources, announcements, localization, and evidence status for claims/sample data. Use active voice and real supplied content; preserve component anatomy and long-text resilience.

**Accept when:** object/action names stay consistent through the flow; every state has useful and non-fabricated content; labels and accessible names align; errors enable recovery; sample claims are clearly provisional; localization/expansion and announcements pass; each anatomy slot does one job.
