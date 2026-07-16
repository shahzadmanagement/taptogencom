import fs from 'fs';
import path from 'path';

const workspacePath = path.join(process.cwd(), 'src/scripts/tool-workspace.ts');
const datasetsPath = path.join(process.cwd(), 'src/scripts/data/generator-datasets.ts');

const content = fs.readFileSync(workspacePath, 'utf-8');
const lines = content.split('\n');

// 1. Locate name banks block (firstNames to randomFrom)
const nameBanksStart = lines.findIndex(line => line.includes('const firstNames ='));
const nameBanksEnd = lines.findIndex(line => line.includes('function randomFrom'));

// 2. Locate examples block (examples to font maps)
const examplesStart = lines.findIndex(line => line.includes('const examples: Record<string, string> = {'));
const examplesEnd = lines.findIndex(line => line.includes('// Unicode font maps'));

// 3. Locate pass19NameConfigs block (pass19NameConfigs to generateFantasyMap)
const configsStart = lines.findIndex(line => line.includes('const pass19NameConfigs: Record<string, Pass19NameConfig> = {'));
const configsEnd = lines.findIndex(line => line.includes('function generateFantasyMap'));

console.log('Name Banks:', nameBanksStart, 'to', nameBanksEnd);
console.log('Examples:', examplesStart, 'to', examplesEnd);
console.log('Configs:', configsStart, 'to', configsEnd);

if (nameBanksStart === -1 || nameBanksEnd === -1 || examplesStart === -1 || examplesEnd === -1 || configsStart === -1 || configsEnd === -1) {
  console.error('Failed to locate extraction boundaries.');
  process.exit(1);
}

// Slice the text content blocks
const nameBanksBlock = lines.slice(nameBanksStart, nameBanksEnd).join('\n');
const examplesBlock = lines.slice(examplesStart, examplesEnd).join('\n');
const configsBlock = lines.slice(configsStart, configsEnd).join('\n');

// Create the datasets file contents
const datasetsContent = `export type Pass19NameGroup = {
  title: string;
  note: string;
  words: string[];
  nouns: string[];
  use: string;
};

export type Pass19NameConfig = {
  title: string;
  kind: 'person' | 'place' | 'group' | 'creature' | 'stage';
  groups: Pass19NameGroup[];
  footer: string;
};

// ==================== User Examples ====================
export ${examplesBlock.replace('const examples', 'const examples')}

// ==================== Name Banks ====================
${nameBanksBlock.split('\n').map(line => line.trim().startsWith('const ') ? 'export ' + line : line).join('\n')}

// ==================== Name Configs ====================
export ${configsBlock.replace('const pass19NameConfigs', 'const pass19NameConfigs')}
`;

fs.mkdirSync(path.dirname(datasetsPath), { recursive: true });
fs.writeFileSync(datasetsPath, datasetsContent, 'utf-8');
console.log('Created precise generator-datasets.ts!');

// Rebuild tool-workspace.ts by replacing the sliced blocks
// We replace the sliced sections with placeholders or remove them
const linesCopy = [...lines];

// Nullify the blocks in the copy to keep indexing or just slice them out.
// Slicing them out from bottom to top prevents index shift problems:
// Order: Configs (highest lines), then Name Banks (middle), then Examples (lowest)

// 1. Configs
linesCopy.splice(configsStart, configsEnd - configsStart);
// 2. Name Banks
linesCopy.splice(nameBanksStart, nameBanksEnd - nameBanksStart);
// 3. Examples
linesCopy.splice(examplesStart, examplesEnd - examplesStart);

// Inject dynamic import inside generate()
const newContent = linesCopy.join('\n');
const newLines = newContent.split('\n');

const generateStartIndex = newLines.findIndex(line => line.includes('async function generate()'));
console.log('Generate start index in new file:', generateStartIndex);

const destructuringBlock = `
  const datasets = await import('./data/generator-datasets');
  const {
    firstNames, lastNames, fantasyPrefixes, fantasySuffixes, teamAdjectives, teamNouns,
    babyBoyNames, babyGirlNames, middleNames, discordAdj, discordNouns, clanPrefixes, clanSuffixes,
    heroPrefixes, heroSuffixes, pirateFirst, pirateLast, pirateTitles, medievalFirst, medievalTitles,
    medievalPlaces, townPrefixes, townSuffixes, kingdomPrefixes, kingdomSuffixes, dragonPrefixes,
    dragonSuffixes, wolfNames, demonPrefixes, demonSuffixes, elfPrefixes, elfSuffixes, swFirst,
    swLast, animeFirst, animeLast, orcPrefixes, orcSuffixes, witchFirst, witchLast, alienPrefixes,
    alienSuffixes, vampireFirst, vampireLast, fairyFirst, fairyLast, goblinFirst, goblinLast,
    randomPhrases, guildAdj, guildNouns, planetPrefixes, planetSuffixes, islandPrefixes, islandSuffixes,
    wrestleAdj, wrestleNouns, leetMap, dwarfFirst, dwarfLast, dwarfClan, tiefFirst, hpFirst, hpLast,
    pokePrefixes, pokeSuffixes, schoolNames, schoolTypes, streetNames, streetTypes, pass19NameConfigs,
    morseMap
  } = datasets;
`;

newLines.splice(generateStartIndex + 1, 0, destructuringBlock);

// Replace exampleBtn and example-chip click listeners at the end of the file
const rebuiltContent = newLines.join('\n');
const finalContent = rebuiltContent
  .replace(/exampleBtn\?\.addEventListener\('click', \(\) => \{([\s\S]*?)input\.value = examples\[toolSlug\]([\s\S]*?)generate\(\);([\s\S]*?)\}\);/, `exampleBtn?.addEventListener('click', async () => {
  const { examples } = await import('./data/generator-datasets');
  input.value = examples[toolSlug] || 'Example text';
  generate();
});`)
  .replace(/document\.querySelectorAll\('\.example-chip'\)\.forEach\(chip => \{([\s\S]*?)const value = \(([\s\S]*?)examples\[toolSlug\]([\s\S]*?)generate\(\);([\s\S]*?)\}\);/, `document.querySelectorAll('.example-chip').forEach(chip => {
  chip.addEventListener('click', async () => {
    const { examples } = await import('./data/generator-datasets');
    const value = (chip as HTMLElement).dataset.example || examples[toolSlug] || 'Example text';
    input.value = value;
    generate();
  });
});`);

fs.writeFileSync(workspacePath, finalContent, 'utf-8');
console.log('Successfully updated tool-workspace.ts!');
