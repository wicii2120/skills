# Clarify

Use **Clarify** for knowledge or intent: explain, teach, define, compare, name, or translate a design idea into canonical English. Load only the relevant foundations; load Visual Direction & Taste when the user is expressing aesthetic intent rather than asking only for terminology.

## 1. Bound the question

Identify the concept, adjacent terms likely to be confused, the audience’s expertise, the decision the explanation should enable, and any platform or product context. Preserve the user’s wording as an alias, not the system vocabulary.

**Gate:** The explanation has one named concept and one practical decision target.

## 2. Use canonical system vocabulary

| Term | Boundary |
| --- | --- |
| **Design language** | Visual, verbal, and interaction principles that create recognizable expression; broader than a component library. |
| **Design system** | Governed foundations, tokens, components, patterns, guidance, contribution, and lifecycle processes. |
| **Foundation** | A cross-cutting visual, verbal, or behavioral decision such as type, color, spacing, content, or motion. |
| **Design token** | A named, typed, portable design decision stored as data; a CSS variable or platform resource is one generated representation. |
| **Primitive token** | Context-free source value or scale. |
| **Semantic token** | Purpose-based alias resolved by role, mode, or context. |
| **Component token** | Component-scoped decision justified only when shared semantics cannot express it safely. |
| **Component / pattern** | Reusable interface unit / repeatable arrangement that solves a user or workflow problem. |
| **Anatomy / slot** | Named structural part / documented insertion point within that structure. |
| **Variant / state** | Intentional alternative / condition over time or interaction. |
| **Mode / theme** | Coordinated token context / named visual concept that may combine a mode with type, shape, imagery, and motion decisions. |
| **Accessibility contract** | Semantics, name, keyboard, focus, contrast, target, announcement, motion, and test obligations. |
| **Deprecation** | Governed replacement with compatibility period, migration path, owner, and removal criteria. |

Introduce `canonical term (user wording)` once, then use the canonical term consistently. Explain neighboring terms by what each includes, excludes, and changes in implementation.

## 3. Teach through a repeatable structure

1. **Canonical term** and aliases.
2. **Concise definition** with a boundary.
3. **Why it matters** to users, systems, or implementation.
4. **Visual model** in Mermaid or ASCII when relationships are easier to see.
5. **Decisions and tradeoffs**, including selection criteria and costs.
6. **Framework-neutral implementation** through token paths, semantics, state, or pseudocode.
7. **Accessibility implications**, separating normative criteria from product policy.
8. **Common failure modes** with symptom and likely cause.
9. **Agent-ready wording and acceptance checks** the user can reuse.

## 4. Translate intent when needed

Convert subjective phrases into observable dimensions and constraints. Example:

```text
“Make it feel calm”
→ restrained hierarchy, low visual density, limited simultaneous motion,
  stable layout, plain recovery language, and one quiet identity-bearing decision.
```

State what remains contextual rather than inventing a universal value. If the intent changes a concrete artifact, hand the clarified terms and assumptions to Craft.

**Completion:** The user can name the concept, distinguish it from adjacent terms, make the relevant decision, and reuse a testable prompt or specification.
