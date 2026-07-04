# Sitewide Premium Tool Engine Plan

## Goal

Upgrade the shared TapToGen tool experience so all 449 tool pages benefit automatically from a better layout, controls, and output renderer before any deeper tool-specific work begins.

This pass should improve the reusable tool page system, not rebuild individual tools one by one.

## Files To Change

- `src/pages/tools/[slug].astro`
  - Main shared tool page layout.
  - Universal input/options/output UI.
  - Client-side generator engine and renderer.
  - Copy/reset/regenerate/example controls.

- `theme/styles/global.css`
  - Shared premium styling for the tool workspace, result cards, grouped outputs, section panels, mobile layout, chips, and controls.
  - Keep styling generic and reusable across every tool.

Potential later-only files:

- `src/data/tools.ts`
  - Avoid broad edits in the sitewide engine pass.
  - Only use later for targeted `toolOptions`, FAQ, or custom metadata improvements.

## Reusable UI Sections

Every tool page should use the same shared structure:

1. Premium Tool Header
   - Category badge.
   - Clear H1.
   - Short tagline.
   - Helper line: `Free, instant, no signup`.
   - Optional disclaimer if present.

2. Tool Workspace
   - Input panel.
   - Preset/example chips.
   - Existing `toolOptions` rendered in a cleaner responsive options grid.
   - Universal controls:
     - Generate
     - Use Example
     - Clear
     - Regenerate
     - Copy All

3. Premium Output Panel
   - Replaces the single plain textarea-like output surface.
   - Uses renderer types based on `generatorType`, `outputFormat`, and result shape.
   - Includes per-result copy buttons where useful.
   - Includes raw fallback for tools that return plain text.

4. Supporting Content
   - How to use section.
   - Tips section.
   - FAQ section.
   - Related tools section.

## Output Renderer Types

Add a universal client-side result renderer with these output modes:

1. `list`
   - For name ideas, tag lists, random outputs, and short suggestions.
   - Renders 10-20 cards when possible.
   - Each card has result text, optional label, and copy button.

2. `cards`
   - For business, branding, bio, caption, and structured creative outputs.
   - Each card can include title, subtitle/tagline, note, and copy button.

3. `groups`
   - For tag/hashtag tools and grouped recommendations.
   - Group heading, chips/list items, copy group button, copy all button.

4. `sections`
   - For writing tools, outlines, briefs, emails, policy drafts, study plans, and templates.
   - Renders named sections with readable spacing and copy buttons.

5. `visual`
   - For SVG/image/UI output tools.
   - Preview area first.
   - Copy/export controls if supported.
   - Structured text fallback below preview.

6. `raw`
   - Safe fallback for tools whose output is still plain text.
   - Render in a polished code/text panel with copy button.
   - This prevents breakage while the engine evolves.

## GeneratorType Rendering Strategy

### `text-transform`

Default renderer: `cards` or `list`.

Global improvements:

- Split multi-style output into cards when separated by headings or blank lines.
- Style name displayed in each card.
- Per-card copy.
- Copy all.

Examples:

- Fancy text.
- Bold text.
- Cursive text.
- Unicode text.
- Case converter.

Custom later:

- Richer previews for `fancy-text-generator` and `cursive-text-generator`.

### `random-combo`

Default renderer: `list`.

Global improvements:

- Render each line as a result card.
- Add simple labels from tool context when obvious:
  - `Name idea`
  - `Brandable`
  - `Short`
  - `Creative`
  - `Fantasy`
- Per-result copy.
- Output count selector where safe.

Examples:

- Name generators.
- Business name generator.
- Domain name generator.
- Random idea tools.

Custom later:

- Better scoring/availability-style hints for `business-name-generator` and `domain-name-generator`.

### `template`

Default renderer: `sections`.

Global improvements:

- Split generated text by headings, dividers, or blank-line blocks.
- Render named sections.
- Copy each section and copy all.
- Preserve raw text fallback.

Examples:

- Blog outline.
- Cold email.
- Cover letter.
- Policy generators.
- Brief generators.

Custom later:

- Stronger structure for `blog-outline-generator`, `bio-generator`, and selected writing/business tools.

### `utility`

Default renderer: `raw`, with optional `sections`.

Global improvements:

- Clear input/output layout.
- Copy output.
- Download button only where low-risk and useful.
- Preserve exact formatting for code, JSON, CSS, regex, cron, and config outputs.

Examples:

- Cron expression.
- CSS tools.
- JSON formatter.
- Robots.txt generator.

Custom later:

- Interactive preview for `css-button-generator`.

### `converter`

Default renderer: `sections` or `raw`.

Global improvements:

- Input/output comparison layout.
- Copy converted result.
- Clear/reset.

Examples:

- Text case converter.
- Binary/text converters.

### `visual`

Default renderer: `visual`.

Global improvements:

- Preview panel.
- Copy SVG/raw output if present.
- Export affordance where feasible.
- Text fallback rendered as sections/cards.

Examples:

- Fantasy map generator.
- Blob generator.
- Color palette generator.
- Wave/pattern tools.

Custom later:

- Richer preview/export controls for `fantasy-map-generator`, `color-palette-generator`, and visual CSS/design tools.

## Generic Renderer Improvements

Implementation should add small parsing helpers inside the shared tool page script:

- `parseResult(raw, toolSlug, generatorType, outputFormat)`
- `renderResults(parsedResult)`
- `copyText(text)`
- `splitBlocks(raw)`
- `detectGroups(raw)`
- `detectSections(raw)`
- `lineItems(raw)`

Parsed result shape:

```ts
type ParsedResult =
  | { kind: 'list'; items: ResultItem[]; raw: string }
  | { kind: 'cards'; cards: ResultCard[]; raw: string }
  | { kind: 'groups'; groups: ResultGroup[]; raw: string }
  | { kind: 'sections'; sections: ResultSection[]; raw: string }
  | { kind: 'visual'; html: string; fallback?: ParsedResult; raw: string }
  | { kind: 'raw'; raw: string };
```

Keep this local to `[slug].astro` for the first pass to avoid premature abstraction. Extract to separate modules only after the shape stabilizes.

## What Improves Globally

- Every tool gets a more premium page header.
- Every tool gets a cleaner workspace.
- All tool options become easier to scan on desktop and mobile.
- Preset/example chips make tools feel active before typing.
- Outputs become cards, sections, groups, previews, or polished raw blocks.
- Copy behavior improves across all tools.
- Related tools, how-to, tips, and FAQs remain visible and more consistent.
- The single plain output panel becomes a fallback, not the default experience.

## What Requires Custom Logic Later

Do not attempt these during the sitewide pass:

- Deep algorithm rewrites for every tool.
- Unique UI components for individual tools.
- Availability checks, trademark checks, or external lookups.
- Heavy canvas/SVG export features beyond simple existing visual output support.
- Full custom previews for every CSS/design tool.

Preferred later custom batch of 10:

1. `cursive-text-generator`
2. `fancy-text-generator`
3. `business-name-generator`
4. `domain-name-generator`
5. `bio-generator`
6. `blog-outline-generator`
7. `hashtag-generator`
8. `color-palette-generator`
9. `css-button-generator`
10. `fantasy-map-generator`

## Risks

- The current generator script is large; broad edits can accidentally break individual cases.
- Some outputs are intentionally code-like and must not be over-parsed.
- Visual outputs may include HTML/SVG that must be handled safely.
- Generic parsing may misclassify some tools, so every renderer needs a raw fallback.
- Too much per-tool branching would recreate the one-tool-at-a-time problem.

Risk controls:

- Keep the first implementation pass mostly structural and renderer-based.
- Preserve existing generator logic.
- Keep existing `toolOptions` intact.
- Use raw fallback whenever output parsing is uncertain.
- Validate high-priority examples across several generator types.

## Validation Plan

Run:

```powershell
npx.cmd tsc --noEmit
npx.cmd astro check
npm.cmd run build
```

Manual/local checks:

- `/tools/gaming-name-generator/`
- `/tools/fancy-text-generator/`
- `/tools/business-name-generator/`
- `/tools/blog-outline-generator/`
- `/tools/hashtag-generator/`
- `/tools/color-palette-generator/`
- `/tools/css-button-generator/`
- `/tools/fantasy-map-generator/`

Acceptance checks:

- Tool route still renders correct tool content.
- No homepage fallback on tool routes.
- Existing `toolOptions` still appear.
- Generate/reset/example/regenerate still work.
- Output appears in premium renderer, not only one plain block.
- Per-result copy and copy all work.
- Mobile layout remains usable.
- No new tools, slug changes, or FAQ pass 2 work.

## Implementation Order After Approval

1. Upgrade shared HTML structure in `[slug].astro`.
2. Add generic result parser and renderer.
3. Wire universal controls.
4. Add CSS for premium shared components.
5. Smoke test representative tools.
6. Run validation.
7. Stop and report before any deeper custom tool batch.
