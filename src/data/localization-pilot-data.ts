import { frenchOptimizedBatch1ToolData } from './localization-french-data';
import type { LocalizedToolContent } from './localization';
import { spanishLocalizedToolData } from './localization-spanish-data';
import { additionalLocalizedPilotToolData } from './localization-pilot-extra-data';
import { rolloutB01LocalizedToolData } from './localization-rollout-b01-data';
import { rolloutB02LocalizedToolData } from './localization-rollout-b02-data';
import { rolloutB03LocalizedToolData } from './localization-rollout-b03-data';
import { rolloutB04LocalizedToolData } from './localization-rollout-b04-data';
import { rolloutB05LocalizedToolData } from './localization-rollout-b05-data';
import { rolloutB06LocalizedToolData } from './localization-rollout-b06-data';
import { rolloutB07LocalizedToolData } from './localization-rollout-b07-data';
import { rolloutB08LocalizedToolData } from './localization-rollout-b08-data';
import { rolloutB09LocalizedToolData } from './localization-rollout-b09-data';

const rawPilotToolData: LocalizedToolContent[] = [
  {
    "canonicalToolId": "name-generator",
    "language": "es",
    "primaryKeyword": "generador de nombres",
    "localizedSlug": "generador-de-nombres",
    "h1": "Generador de nombres",
    "metaTitle": "Generador de nombres gratis",
    "metaDescription": "Crea ideas de nombres claras para proyectos, personajes, marcas o listas personales con resultados fáciles de revisar.",
    "intro": "Genera nombres en español con opciones amplias y revisa cada sugerencia antes de usarla en público.",
    "faqTopics": [
      "como elegir un nombre",
      "nombres originales",
      "revisar disponibilidad"
    ],
    "searchIntentNote": "High same-intent utility query; Spanish users search directly for name ideas.",
    "riskSafetyNote": "Low risk; remind users to check trademarks and availability."
  },
  {
    "canonicalToolId": "name-generator",
    "language": "fr",
    "primaryKeyword": "générateur de noms",
    "localizedSlug": "générateur-de-noms",
    "h1": "Générateur de noms",
    "metaTitle": "Générateur de noms gratuit",
    "metaDescription": "Trouvez des idées de noms naturelles pour projets, personnages, marques ou listes personnelles.",
    "intro": "Générez des noms en français puis vérifiez le sens, la disponibilité et le contexte avant usage.",
    "faqTopics": [
      "choisir un nom",
      "noms originaux",
      "verifier un nom"
    ],
    "searchIntentNote": "Strong direct French generator intent.",
    "riskSafetyNote": "Low risk; include availability and trademark review note."
  },
];

const nonSpanishPilotAndRolloutData = [
  ...rawPilotToolData,
  ...additionalLocalizedPilotToolData,
  ...rolloutB01LocalizedToolData,
  ...rolloutB02LocalizedToolData,
  ...rolloutB03LocalizedToolData,
  ...rolloutB04LocalizedToolData,
  ...rolloutB05LocalizedToolData,
  ...rolloutB06LocalizedToolData,
  ...rolloutB07LocalizedToolData,
  ...rolloutB08LocalizedToolData,
  ...rolloutB09LocalizedToolData,
  ...frenchOptimizedBatch1ToolData,
].filter((entry) => entry.language !== 'es');

const rawAllData: LocalizedToolContent[] = [
  ...spanishLocalizedToolData,
  ...nonSpanishPilotAndRolloutData,
];

// Deduplicate dataset by language + canonicalToolId, keeping the latest entry
const datasetMap = new Map<string, LocalizedToolContent>();
rawAllData.forEach((entry) => {
  datasetMap.set(`${entry.language}:${entry.canonicalToolId}`, entry);
});

export const localizedPilotToolData: LocalizedToolContent[] = Array.from(datasetMap.values());
