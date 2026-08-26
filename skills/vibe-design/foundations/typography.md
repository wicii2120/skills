# Typography

**Source class:** terminology synthesized from the `Henry_He` series; system/craft guidance is supplemental; accessibility criteria are normative. See [Provenance](../references/provenance.md).

## Canonical terms and adjacent boundaries

| Term | Boundary |
| --- | --- |
| **Typeface / font / font family** | Typeface is the design; font is a usable resource or instance; family groups related styles. |
| **Serif / sans-serif** | Classifications based on terminal strokes; neither guarantees tone, quality, or legibility. |
| **Proportional / monospace / tabular figures** | Variable glyph advances / shared advances / aligned numeric advances within a proportional face. |
| **Font stack / fallback** | Ordered families used when a resource or glyph is unavailable. |
| **Type scale / text style** | Available size progression / semantic combination of family, size, weight, line height, and tracking. |
| **Font size / x-height / cap height** | Em-box size / lowercase proportion / capital proportion; equal numeric sizes need not look equal. |
| **Leading / line height** | Typographic line spacing / layout mechanism that controls it. |
| **Tracking / kerning** | Spacing across a run / adjustment for a specific glyph pair. |
| **Measure** | Inline line length, often discussed in characters per line. |
| **Baseline / ascender / descender** | Alignment line / glyph portions extending above or below core letterforms. |
| **`px` / `rem` / `em` / `ch`** | Reference pixel / root-relative em / local font-relative em / approximate zero-glyph advance. |
| **Anti-aliasing / hinting / ligature** | Edge smoothing / raster alignment instructions / one glyph representing a sequence. |
| **FOIT / FOUT** | Flash of invisible text / flash of fallback or unstyled text during font loading. |

## Concise definition

**Typography** is the system for selecting and arranging type to create readable content, hierarchy, voice, personality, and resilient layout behavior.

## Why it matters

Type carries most interface meaning. Role-based typography improves scanning and brand expression while limiting arbitrary styles, unreadable measures, layout shift, missing glyphs, and localization failures.

## Visual model

```text
Content role
└─ semantic text style: body.default
   ├─ family + fallback + language coverage
   ├─ size + weight + line height + tracking
   └─ primitive values + licensed font resources
```

## Decisions and tradeoffs

- Define roles such as body, label, heading, code, and data before assigning scale values. Role names survive visual change.
- Select typefaces for subject and brand personality as well as legibility, script/symbol coverage, variable axes, optical sizes, licensing, loading cost, and fallback compatibility. A familiar or neutral face is valid when the context supports it.
- Pair display, body, and utility roles only when each earns a distinct job. Too many families fragment hierarchy and increase loading cost.
- Use a deliberate scale without forcing every role onto a ratio. Dense tools, editorial reading, and expressive marketing need different distributions.
- Treat body measures around 45–75 characters and body line height around 1.4–1.6 as starting heuristics, then test the actual face, script, density, and content.
- Tune tracking and leading by size and typeface. Large display text often tolerates tighter values; small text and scripts with tall forms need more room.
- Choose FOIT/FOUT and subsetting deliberately. Metric-compatible fallbacks reduce shift but add setup complexity.
- Use typography as an identity-bearing decision when appropriate, but keep content legible and hierarchy predictable.

## Framework-neutral implementation guidance

Store text styles as semantic typed data: role, family alias, fallback, size, weight, line height, letter spacing, supported scripts, loading behavior, and intended contexts. Generated platform styles are outputs.

```css
:root {
  --font-family-body: system-ui, sans-serif;
  --font-size-body: 1rem;
  --line-height-body: 1.5;
  --measure-reading: 68ch;
}

.prose {
  font: 400 var(--font-size-body) / var(--line-height-body) var(--font-family-body);
  max-inline-size: var(--measure-reading);
}
```

Use real headings and text semantics independently of visual size. Treat font availability and licenses as build inputs, not assumptions.

## Accessibility implications

- Test every text/surface pair against WCAG 2.2 SC 1.4.3; typography does not repair low contrast.
- Support text resizing and reflow under SC 1.4.4 and 1.4.10 without clipping or loss.
- Support user overrides under SC 1.4.12: line height at least 1.5 times font size, paragraph spacing at least 2 times, letter spacing at least 0.12 times, and word spacing at least 0.16 times without loss. These are resilience checks, not mandatory default values.
- Preserve semantic heading order, real text, meaningful link/control names, and supported-locale glyph coverage.

## Common failure modes

- Many near-identical styles → roles and governance are missing.
- Styles named only by size → hierarchy changes cause misuse and mass renaming.
- A trendy face is chosen before checking content, glyphs, or licenses → brand expression breaks in production.
- Fixed-height text boxes → zoom, translation, or user spacing clips content.
- Fallback metrics diverge → loading causes layout shift.
- One tracking value is applied everywhere → display or small text loses optical quality.
- Weight or italics alone convey state → semantics and redundant cues are absent.

## Agent-ready wording and acceptance checks

> Define role-based typography for **[context]**. Specify personality rationale, family/fallback and licensing, script coverage, size, weight, line height, tracking, measure, and loading behavior for each role. Map styles through semantic tokens and preserve heading semantics. Verify long translated content, missing-font fallback, loading shift, 200%/400% zoom, WCAG text-spacing overrides, and text/surface contrast.

**Accept when:** every role has a purpose; type choices derive from subject/brand/content; no required glyph or state is lost; fallback and loading are stable; zoom, reflow, spacing overrides, and contrast pass.
