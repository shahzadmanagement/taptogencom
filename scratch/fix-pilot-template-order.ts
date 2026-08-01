import fs from 'fs';
import path from 'path';

const pilotFiles = [
  'src/pages/de/tools/[slug].astro',
  'src/pages/es/tools/[slug].astro',
  'src/pages/fr/tools/[slug].astro'
];

async function fixPilotOrder() {
  for (const p of pilotFiles) {
    const fullPath = path.join(process.cwd(), p);
    if (!fs.existsSync(fullPath)) continue;

    let content = fs.readFileSync(fullPath, 'utf-8');

    // Swap the position of Astro.props destructuring and engine computation
    const wrongOrderStr = `const presets = getPresetsForTool(tool);\nconst expertInsight = getExpertInsightsForTool(tool);\nconst comparisonBlock = getComparisonBlockForTool(tool);\n\nconst { tool, localized } = Astro.props;`;
    const correctOrderStr = `const { tool, localized } = Astro.props;\nconst presets = getPresetsForTool(tool);\nconst expertInsight = getExpertInsightsForTool(tool);\nconst comparisonBlock = getComparisonBlockForTool(tool);`;

    if (content.includes(wrongOrderStr)) {
      content = content.replace(wrongOrderStr, correctOrderStr);
      fs.writeFileSync(fullPath, content, 'utf-8');
      console.log(`Fixed variable initialization order in ${p}`);
    }
  }
}

fixPilotOrder().catch(console.error);
