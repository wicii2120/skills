# Browser Inspection Adapter

Load this when rendering, interaction inspection, screenshots, accessibility-tree evidence, or Playwright/an equivalent browser tool is available or requested. The tool is replaceable; the evidence contract is stable.

## 1. Choose the available path

Prefer the project’s existing test/browser tooling. Inspect scripts and tool help before inventing a harness. Reuse an already-running app when safe; otherwise start it through the project task runner and manage lifecycle cleanly.

For static HTML, inspect source before automation. For dynamic UI, perform reconnaissance after the app-specific readiness condition. `networkidle` is useful only when it represents readiness; streaming, persistent connections, and deferred UI may require a stable locator or explicit application signal.

**Gate:** URL/route, server lifecycle, readiness condition, viewport/device context, and evidence destinations are explicit.

## 2. Reconnaissance before action

1. Navigate and wait for the chosen readiness signal.
2. Capture initial screenshot, DOM/role tree, and console/runtime messages.
3. Discover elements by semantic role/name or stable project locator.
4. Exercise the real interaction path.
5. Capture post-state evidence and failures with stable labels.

Avoid guessing selectors or behavior from source alone when rendered evidence is available.

## 3. Run the render matrix

Cover representative wide/narrow and threshold boundaries; required modes/preferences; default/hover/focus/active/disabled/loading/empty/error/success states; long/localized content; keyboard and pointer paths; reduced motion; zoom/reflow; overflow/layout stability; semantics/accessibility tree; and console/network/runtime errors.

Capture screenshots or recordings named by artifact, viewport, state, and pass. For an explicit Reproduce target, add pixel/diff evidence with controlled fonts, viewport, content, and animation state. For Adapt/Redesign, critique against the Design Read and contract.

## 4. Refine and rerun

Turn screenshot/interaction observations into stable findings, fix the highest-impact mismatch, and rerun the affected matrix plus integrated checks. Keep browser artifacts outside source paths unless the project already has a committed snapshot convention.

## 5. Fallback

When no browser tool is available, inspect semantic structure/styles/code, run available build/test checks, and return a manual matrix with exact routes, viewports, states, actions, and expected evidence. Mark appearance, runtime interaction, accessibility tree, and console behavior unverified.

**Completion:** The evidence covers the artifact contract at representative boundaries/states; selectors/readiness are stable; console/runtime and accessibility observations are recorded; final screenshots reflect the final code; unavailable capabilities have an executable fallback matrix.
