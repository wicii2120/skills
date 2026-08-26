# Deliverable Templates

Load this when Craft or Systemize must emit a concrete artifact. Choose the smallest template set that answers the request. Every artifact begins with scope, product/platform, audience/task, evidence, assumptions, constraints, owner, version, unresolved decisions, and acceptance checks.

## Artifact router

| Artifact | Minimum result | Completion evidence |
| --- | --- | --- |
| Token architecture or set | Layers, naming, typed data, aliases, modes, outputs, ownership, validation | No cycles; roles have purpose; required modes resolve; relationships pass |
| Component contract | Purpose, anatomy, slots, variants, states, behavior, content, responsive, tokens, accessibility | Every state/input/content case is testable |
| State matrix | Triggers, visuals, semantics, input, focus, announcements, motion, precedence | Legal/illegal combinations and recovery paths defined |
| Responsive/layout specification | Containers, ranges, tracks, order, overflow, content stress | Boundary, zoom, localization, and safe-area checks pass |
| Accessibility requirements matrix | Criterion, obligation, method, evidence, owner | Every normative “must” has an exact criterion and executable check |
| Implementation guidance | Semantic structure, token/state mapping, pseudocode, adapter seam, tests | Portable contract separated from stack adapter |
| Migration plan | Baseline, mapping, cohorts, compatibility, rollout/rollback, telemetry, removal | Every legacy use has a route and owner |
| Agent-ready brief / semantic `DESIGN.md` | Outcome, users, context, decisions, foundations, behavior, artifacts, checks | Another agent can execute without inventing scope/defaults |
| Visual-direction plan and token sketch | Design Read, intent dimensions, concept, palette/type/shape/layout/motion/content rationale | Grounding/Default/Removal tests recorded |
| Named theme | Name, context, semantic roles, type, shape/material, imagery, motion, density, modes | Theme works in stated contexts and required accessibility states |
| Prototype set | Three-to-five named-axis variants, picker, comparison, promotion contract | All variants work at the same quality floor |
| Web/mobile reference-image set | Per-screen/viewport compositions, fidelity, asset ledger, behavioral annotations | Set covers required hierarchy, states, safe areas, and replacement status |
| Brand/identity board | Concept, marks, type, semantic palette, imagery, materials, verbal register, applications | Each element has rationale, rights status, and application rule |
| Motion specification/review | Gate, purpose, state model, timing/spring, interruption, focus, reduced equivalent, Before/After/Why | Accepted/rejected opportunities and rendered feel-check evidence |
| Working page/component/flow | Complete implementation plus render/inspect/refine evidence | Ledger, states, responsive, accessibility, runtime, project checks pass |
| Parameterized/static visual support | Purpose, parameters/seed, export, relation to interface direction | Supports product-interface direction without becoming general art production |

## Portable token architecture

Deliver:

1. dependency diagram and alias direction;
2. grammar such as `<category>.<role>.<variant>.<state>` with only meaningful segments;
3. type, value/alias, description, owner, mode/set, and deprecation metadata;
4. transformation mapping per target platform;
5. validation rules and representative resolved values;
6. migration/version policy when Systemize owns architecture.

DTCG-compatible example:

```json
{
  "color": {
    "blue": {
      "600": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0.08, 0.32, 0.78],
          "alpha": 1
        }
      }
    },
    "text": {
      "link": {
        "$type": "color",
        "$value": "{color.blue.600}",
        "$description": "Interactive text on the default surface"
      }
    }
  }
}
```

Keep mode handling in documented sets/resolver configuration; do not imply a vendor-specific extension is part of DTCG. Validate pairwise relationships such as foreground/surface contrast.

## Component contract

```text
Name/version/owner:
Purpose and non-use cases:
Anatomy and semantic/platform role tree:
Slots and content constraints:
Variants and sizes:
Token dependencies and permitted overrides:
State matrix and illegal combinations:
Keyboard/pointer/touch/assistive behavior:
Focus and announcement behavior:
Responsive/container behavior:
Localization and content stress:
Motion and reduced-motion behavior:
Errors and recovery:
Portable interface/pseudocode:
Adapter notes:
Acceptance tests:
Open decisions and migration:
```

Use native semantics first. Name consumer properties by intent (`emphasis: strong | subtle`) rather than styling mechanism (`blue: true`).

## State matrix

| State | Entry trigger | Visual/token change | Semantics/name | Input behavior | Focus | Announcement | Motion/reduced | Exit/precedence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Default | Available |  |  |  |  |  |  |  |
| Hover | Capable pointer |  | Never sole cue |  |  |  |  | Below disabled |
| Focus-visible | Qualifying focus |  |  | Keyboard path | Visible |  |  | Coexists |
| Active/pressed | Activation |  | Persistent pressed state only if applicable |  | Stable |  |  |  |
| Disabled/read-only | Unavailable/non-editable |  | Reason where needed | Defined | Defined policy |  | None | Highest input precedence |
| Loading | Async pending |  | Busy state/name stable | Duplicate policy | Stable | Material status | Reduced equivalent | Success/error/cancel |
| Error | Validation/operation failure |  | Associated error | Recovery | Move only when justified | Error |  | Resolve/retry |

Add selected, expanded, dragged, empty, success, offline, permission, or partial-completion states when applicable.

## Responsive/layout specification

```text
Container: name, min/max/ideal inline size, outer margin, safe area
Grid: tracks, gutters, alignment, spans
Range: content-driven threshold and exact before/after behavior
Intrinsic behavior: wrap, min/max content, aspect ratio
Container response: local condition and anatomy change
Source/focus order: invariant or justified change
Overflow: wrap/clip/scroll and scroll owner
Stress: long labels, localization, text spacing, zoom, keyboard/IME
Evidence: boundary screenshots or automated assertions
```

Use behavior descriptions rather than device labels.

## Accessibility requirements matrix

| Requirement | Authority | Obligation | Test method | Evidence/owner |
| --- | --- | --- | --- | --- |
| Role, structure, name | WCAG/HTML/ARIA or product | Native semantics or justified role/name | DOM/role tree + AT spot check |  |
| Keyboard and focus | WCAG/product | Full operation, order, visible/unobscured focus, no trap | Keyboard walkthrough |  |
| Contrast and non-color cues | WCAG/product | Exact pair/state criteria | Rendered contrast + forced colors |  |
| Zoom, reflow, text spacing | WCAG | No loss/overlap under required transforms | Browser zoom and spacing override |  |
| Target and gesture | WCAG/product | Minimum target and alternative input | Geometry + pointer/touch/keyboard |  |
| Status/error | WCAG | Association, preservation, announcement, recovery | Accessibility API/AT |  |
| Motion | WCAG/product | Pause/stop and reduced equivalent | Preference emulation + interaction |  |

Cite exact success criteria. Label stronger internal thresholds **product requirement**.

## Implementation guidance

Separate:

- **Contract:** semantics, states, responsive/content/accessibility behavior consumers rely on.
- **Reference implementation:** one possible realization.
- **Adapter:** stack-specific mapping loaded only when detected.
- **Verification:** focused behavior, render evidence, and project checks.

Generated class names, framework props, package APIs, or utility conventions stay out of the portable contract.

## Migration plan

Include baseline/inventory, target architecture, old-to-new mapping, breakage classification, automated/manual paths, cohorts, compatibility layer, deprecation window, visual/behavioral/accessibility regressions, communication, rollout, rollback, telemetry, owner, exception expiry, and removal criteria.

## Agent-ready brief / semantic DESIGN.md

```text
Outcome and users/tasks:
Product/platform context:
Evidence and existing artifacts:
Design Read and fidelity target:
In scope / out of scope:
Canonical terms:
Brand, content, accessibility, performance, technical, tool constraints:
Existing system and settled decisions:
Decisions to make and tradeoffs to expose:
Foundations, components, patterns, states, responsive cases:
Content and asset evidence/provenance:
Requested artifacts and format:
Implementation/adapter boundary:
Acceptance criteria and evidence to return:
Assumptions, open questions, owners, dependencies:
```

## Visual-direction plan and token sketch

```text
Design Read:
Subject/audience/task evidence:
Design variance / motion intensity / visual density with rationale:
Concept and signature decision:
Opening composition:
Semantic palette roles (not decoration swatches):
Typography roles and licensing/fallback:
Grid, spacing rhythm, material/shape rules:
Imagery/icon/content direction:
Motion personality and restraint gate:
Required modes and forced-color behavior:
Anti-default findings and removal:
Token sketch and unresolved decisions:
Acceptance views/states:
```

## Named theme

Record theme name and concept, intended/unsuitable contexts, semantic color roles, typography, spacing/density, shape/material/elevation, imagery/iconography, verbal register, motion personality, mode behavior, accessibility relationships, implementation mapping, and anti-patterns. Theme values are examples until adopted as governed tokens.

## Prototype set

Record decision question, three-to-five named axes, shared floor, isolated location, picker controls, realistic content/context, responsive/state/accessibility evidence, comparison table, selection authority, promotion steps, and cleanup rule.

## Reference-image or identity-board set

For each image/board, record target platform/viewport, fidelity target, composition, hierarchy, content, interaction annotations, safe areas, required states, asset origin, rights/attribution, localization, alternative-text intent, production replacement, and what implementation may change. Images guide direction; they do not replace contracts.

## Parameterized/static visual support

Use this only when a parameterized or static visual materially supports product-interface direction, such as a background system, data-independent texture, identity motif, or reproducible reference composition.

```text
Purpose and interface placement:
Design Read and foundation roles served:
Parameters: name, type/range/options, semantic effect, safe/default value
Seed/reproducibility contract when applicable:
Static and responsive export targets:
Motion/reduced-motion behavior if animated:
Performance and rendering implications:
Asset provenance, rights, attribution, localization, alternative/equivalent:
Boundary: what remains product UI versus visual support:
Acceptance checks and replacement owner:
```

Parameter choices derive from the concept rather than a pattern menu. The same seed/input must reproduce the same output when determinism is promised. Keep controls and generated output subordinate to the interface task; this template does not expand the skill into general poster, presentation, or generative-art production.

## Motion specification or review

```text
State/task and exposure tier:
Accepted purpose or rejection:
Trigger/start/end:
Mechanism and stack evidence:
Properties; duration/easing or spring candidate:
Interruption, reversal, origin, velocity:
Focus, semantics, announcement:
Pointer/keyboard/touch behavior:
Reduced-motion equivalent:
Performance/project budget:
Normal/slow/real-device inspection:
Accepted and rejected opportunities:
Before / After / Why findings:
```

## Asset ledger

| Asset | Purpose | Origin: supplied/generated/licensed/provisional | Rights/attribution | Crop/safe area | Localization/representation | Alt/equivalent | Replacement/owner |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |

## Completion

The artifact is internally consistent, assumptions and authority classes are visible, every requirement maps to an acceptance check, no requested content/state/file is replaced by a placeholder, and **Now / Next / Later** identifies dependencies or owners.
