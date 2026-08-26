# Prototyping & Variant Exploration

Load this only when direction is unresolved, the user asks for alternatives, or divergent structures materially reduce decision risk. Otherwise execute one strong direction.

## 1. Name the question

A prototype answers one decision: composition, hierarchy, density, personality, interaction model, motion behavior, component anatomy, or another named axis. Narrow broad requests to the highest-leverage uncertain decision without shrinking the final requested scope.

**Gate:** One decision question and promotion criterion are explicit.

## 2. Recon the constraints

Inspect stack, tokens, foundations, surrounding context, real content, states, responsive boundaries, accessibility, and product personality. Isolate exploration from production while reusing compatible project primitives. A prototype is evidence, not a parallel production architecture.

## 3. Choose divergent directions

Normally build **three** variants; use up to **five** when requested or the decision space is genuinely wide. Name each by its idea and axis, not A/B/C.

A valid set differs in composition or interaction model, such as:

- linear task flow versus overview-first workspace;
- quiet disclosure versus dense direct manipulation;
- typographic opening versus image-led opening;
- fixed navigation versus contextual command surface.

Color, radius, shadow, or copy-only changes do not create a new direction. Every variant must satisfy the same functional, content, responsive, and accessibility floor so the comparison isolates the intended axis.

**Gate:** Every variant has a defensible named axis; no two are cosmetic twins.

## 4. Build a picker contract

Render one full-size variant at a time in realistic surrounding context. Provide neutral harness chrome that is visibly outside the product design:

- named variant controls with one active selection and an accessible label;
- number keys and previous/next controls where the environment supports them;
- selection persisted by URL/state when practical;
- instant variant switching because comparison is high-frequency;
- replay only for motion that needs reinspection;
- no harness styling borrowed from a candidate direction;
- no production import from the prototype surface.

A static context may use one self-contained HTML file; an existing app may use an isolated route. Follow project routing/build conventions rather than introducing a new stack.

## 5. Verify the set

Run every variant at representative wide/narrow boundaries with realistic and long content, keyboard and focus, meaningful states, reduced motion, and console/runtime checks. Capture comparable screenshots or recordings when tools are available.

Return an honest comparison:

| Variant | Named axis | When it wins | Cost/risk | Acceptance evidence |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

Stop for user choice only when the choice materially changes scope or direction. If a trusted decision criterion makes one variant clearly dominant and the user delegated selection, recommend it with evidence.

## 6. Promote or continue

On selection, integrate the winner through the normal Craft implementation loop, preserve the portable contract, and remove the prototype surface unless retention was requested. If uncertainty remains, run a narrower second round around the selected direction rather than widening again.

**Completion:** Three-to-five truly divergent variants answer one decision, each works at the same quality floor, the picker makes comparison accessible and immediate, tradeoffs are explicit, and promotion/cleanup is defined.
