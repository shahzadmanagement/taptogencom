import fs from 'fs';
import path from 'path';

const pilotFiles = [
  'src/pages/de/tools/[slug].astro',
  'src/pages/es/tools/[slug].astro',
  'src/pages/fr/tools/[slug].astro'
];

async function patchPilotTemplates() {
  for (const p of pilotFiles) {
    const fullPath = path.join(process.cwd(), p);
    if (!fs.existsSync(fullPath)) continue;

    let content = fs.readFileSync(fullPath, 'utf-8');

    // 1. Add imports if missing
    if (!content.includes('PresetExamplesSection')) {
      content = content.replace("import AuthorByline from '@/components/AuthorByline.astro';", `import AuthorByline from '@/components/AuthorByline.astro';
import PresetExamplesSection from '@/components/PresetExamplesSection.astro';
import ExpertInsightSection from '@/components/ExpertInsightSection.astro';
import ComparisonSection from '@/components/ComparisonSection.astro';
import {
  getUniqueFaqsForTool,
  getPresetsForTool,
  getExpertInsightsForTool,
  getComparisonBlockForTool
} from '@/lib/helpful-content-engine';`);
    }

    // 2. Add engine computations before return or render
    if (!content.includes('getPresetsForTool(tool)')) {
      content = content.replace("const { tool", `const presets = getPresetsForTool(tool);\nconst expertInsight = getExpertInsightsForTool(tool);\nconst comparisonBlock = getComparisonBlockForTool(tool);\n\nconst { tool`);
    }

    // 3. Render components before <AuthorByline />
    if (!content.includes('<PresetExamplesSection')) {
      content = content.replace('<AuthorByline />', `<PresetExamplesSection presets={presets} toolName={tool.name} />\n        <ExpertInsightSection insight={expertInsight} toolName={tool.name} />\n        <ComparisonSection comparison={comparisonBlock} />\n\n        <AuthorByline />`);
    }

    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`Patched 4 Helpful Content Engines in ${p}`);
  }
}

patchPilotTemplates().catch(console.error);
