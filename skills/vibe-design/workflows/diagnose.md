# Diagnose

Use **Diagnose** for an existing artifact or behavior: audit, assess, review, critique, inspect, or identify consistency, usability, accessibility, system, craft, content, motion, or implementation problems.

## 1. Define evidence and sample

Record business-critical flows, audiences, platforms, locales, artifact/version, viewport or container ranges, modes, input methods, meaningful states, analytics/support evidence, known system assets, exclusions, and evidence gaps. Prefer representative flows and repeated interface families over a random screen count.

Static evidence supports visual and content observations only. Mark interaction, focus, reflow, runtime performance, accessibility-tree, and assistive-technology behavior **untestable from supplied evidence** until runtime or code evidence exists.

**Gate:** The sample, stable locators, coverage, exclusions, and evidence limits are explicit.

## 2. Inventory before judging

Inventory representative screens, regions, components, patterns, state cycles, responsive boundaries, real content, foundation values, and code conventions when available. Group near-duplicates by intended role and behavior, not appearance alone. Use stable evidence locators: route and region, screenshot ID, component/story, state, viewport, or file and line.

Evaluate these lenses:

| Lens | Evidence sought |
| --- | --- |
| **Consistency** | Duplicate roles with divergent foundations, anatomy, naming, states, or behavior |
| **Usability and task clarity** | Weak hierarchy, affordance, wayfinding, feedback, error recovery, or cognitive load |
| **Accessibility** | Semantics, names, keyboard/focus, order, contrast, non-color cues, targets, zoom/reflow, announcements, gesture alternatives, reduced motion |
| **System gaps** | Missing token/role/state/pattern, undocumented exception, duplication, ownership or migration gap |
| **Visual craft and grounding** | Choices unsupported by subject, audience, content, brand, platform, composition, materiality, rhythm, or responsive hierarchy |
| **Content & UX Writing** | Object/action naming, labels, helper text, real content, state and recovery language, claims, localization, accessible names |
| **Motion and interaction** | Purpose, frequency, state continuity, interruption, reversal, focus, announcements, reduced-motion equivalent, performance |
| **Implementation** | Hard-coded values, semantic-structure loss, duplicate libraries, fragile layout, missing states, console/runtime issues, dead or fake controls |

Apply the Grounding, Default, and Removal tests from Visual Direction & Taste to every craft review.

**Gate:** Each applicable lens has evidence or a named gap; every meaningful state and responsive boundary in the sample is accounted for.

## 3. Classify findings

- **Normative failure** — violates an applicable accessibility, platform, legal, or license requirement.
- **Functional/usability failure** — blocks, misleads, delays, or makes recovery materially harder.
- **System inconsistency** — repeated divergence from a governed role, contract, or architecture.
- **Craft weakness** — contextual visual, verbal, or interaction quality unsupported by the brief or repeated symptoms.
- **Exploration opportunity** — a plausible alternative whose value is not yet proven.

Only the first three automatically behave as defects. A craft finding needs evidence from the brief, product context, implementation, or repeated user-facing symptom.

## 4. Write root-cause findings

```text
ID and title:
Class:
Stable evidence: [locator + observation + affected count/examples]
User/system impact:
Priority: [P0–P3] and rationale
Correction: [smallest coherent correction]
Token/rule/component implication: [create/change/deprecate/none]
Quick win:
Structural change:
Acceptance check:
Confidence:
Evidence gap:
```

Prioritize by impact, reach/frequency, recurrence, reversibility, and confidence rather than aesthetic preference: **P0** blocks a critical task or creates severe exposure; **P1** materially harms an important/common task or recurs broadly; **P2** causes bounded friction; **P3** is low-impact polish or exploration.

## 5. Run the restraint-first motion sub-pass

For every existing or proposed animation, use the Motion & Interaction gate. Record both accepted and rejected opportunities. Where change is justified, show concise evidence:

| Before | After | Why |
| --- | --- | --- |
| Current observed behavior | Proposed state/motion contract | Purpose, frequency, user impact, and reduced-motion consequence |

A short rejected list proves restraint. A static result can be the correct finding.

## 6. Find leverage and report

Cluster findings by local correction, system prevention, migration, and measurement. Consolidate components only when anatomy and behavior are equivalent. Return:

1. evidence/sample summary and limitations;
2. prioritized findings register;
3. cross-cutting foundation, content, motion, and system gaps;
4. quick wins versus structural changes;
5. accepted and rejected motion opportunities when applicable;
6. re-diagnosis checklist and measurable baseline;
7. **Now / Next / Later**.

**Completion:** Every finding is evidence-linked, correctly classified, impact-prioritized, paired with a correction and acceptance check, and separated from unproven craft preference. Untestable behavior remains explicit.
