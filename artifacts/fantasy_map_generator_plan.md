# Fantasy Map Generator Mini Technical Plan

## Final Tool Identity

- Final tool name: Fantasy Map Generator
- Final slug: fantasy-map-generator
- Category: Gaming & Fantasy Generators
- categorySlug: gaming-generators
- generatorType: random-combo
- SEO/index recommendation: index after MVP review, because the tool is generic, fictional, safe, and not tied to any protected franchise or platform.

## Required Tool Options

- `mapScope`
  - Type: select
  - Options: Region, Kingdom, Island Chain, Frontier Coast, Desert Realm
  - Default: Region

- `terrainBias`
  - Type: select
  - Options: Balanced, Mountainous, Forested, Riverlands, Desert, Coastal, Islands
  - Default: Balanced

- `settlementDensity`
  - Type: select
  - Options: Sparse, Moderate, Dense
  - Default: Moderate

- `tone`
  - Type: select
  - Options: Classic Fantasy, Dark Frontier, Mythic, Cozy Adventure, Ancient Ruins
  - Default: Classic Fantasy

- `includeLegend`
  - Type: checkbox
  - Default: true

- `detailLevel`
  - Type: select
  - Options: Quick Concept, Campaign-Ready, Writer Notes
  - Default: Campaign-Ready

## Output Format

- Primary output format: `ui`
- Preferred visual output: SVG-based simple map preview
- Copy/export output: structured text blueprint and raw SVG copy
- PNG export: optional stretch goal if the existing page can safely serialize the SVG to canvas without adding brittle browser code.

## Implementation Approach

Implement this as a fictional/worldbuilding generator for writers, game masters, RPG creators, and map makers. The generator should create original region concepts only, with no branded settings, protected names, or franchise references.

The MVP should produce a deterministic map object from local random tables:

- Region or kingdom name
- Terrain zones
- Settlement names
- Rivers, coasts, islands, forests, mountains, desert areas, and landmarks
- Legend entries
- Short map notes for conflicts, travel hooks, resources, and boundaries

For the visual version, render a simple inline SVG preview inside the existing tool page flow. Use generated coordinates and basic vector shapes:

- Mountains: triangle clusters
- Forests: small grouped circles or tree-like marks
- Rivers: curved paths
- Desert: dotted or sparse texture marks
- Coast/islands: irregular shoreline paths or ellipses
- Settlements: small circles/squares with text labels
- Legend: color/key list near the preview or in the generated output panel

Use simple original styling only. Do not imitate copyrighted fantasy map styles or claim professional cartography.

## SVG, Canvas, Or Text-Only Decision

- Preferred: SVG
- Reason: SVG is lightweight, copyable, can be displayed inline, and fits a simple generated map preview without requiring a canvas drawing/export pipeline.
- Fallback: text-only structured map blueprint if SVG rendering proves too complex for the current generic tool page.

## MVP Feature Scope

- Generate fantasy region or kingdom map concepts.
- Include original region names.
- Include terrain types: mountains, forests, rivers, desert, coast, and islands.
- Include settlement names.
- Include a map legend.
- Include copyable output.
- Include SVG export/copy if visual rendering is approved.
- Include regenerate behavior through the existing generator flow.
- Keep claims modest: creative map concept, planning aid, and worldbuilding prompt.

Out of scope for MVP:

- Professional cartography.
- GIS accuracy.
- Hex-grid editing.
- Drag-and-drop map editing.
- Asset uploads.
- Franchise presets.
- Copyrighted map style imitation.

## Complexity Level

- Overall complexity: high
- Reason: text generation is straightforward, but a useful SVG preview requires coordinate generation, label placement, terrain distribution, responsive rendering, and export/copy behavior.

## Related Slugs

- worldbuilding-generator
- kingdom-name-generator
- town-name-generator
- island-name-generator
- dungeon-generator
- fantasy-name-generator

## Risks And Limitations

- Label overlap can make the SVG preview messy on small screens.
- Random terrain placement may produce awkward maps without careful spacing rules.
- PNG export may be fragile if browser serialization or canvas conversion is added too quickly.
- The generic tool renderer may need additional support for visual/SVG outputs.
- The tool must avoid protected franchise terms, branded presets, and copyrighted map-style imitation.
- The output should be positioned as a creative blueprint, not professional cartography.

## Fallback Plan

If visual map generation is too complex for the first implementation pass, ship a structured text blueprint first:

- Region name
- Short overview
- Terrain list with named areas
- Settlement list with roles and locations
- Rivers/coasts/islands/deserts/forests/mountains
- Map legend as copyable text
- Travel routes and story hooks

Then mark SVG preview as the next upgrade pass. The text-only fallback still satisfies the minimum useful MVP because writers, game masters, RPG creators, and map makers can copy the blueprint into notes or a separate drawing tool.
