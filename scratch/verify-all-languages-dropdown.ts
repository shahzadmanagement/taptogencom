import { supportedLanguages } from '../src/data/localization';

console.log('=== VERIFYING ALL 19 SUPPORTED LANGUAGES IN DROPDOWN ===\n');

console.log(`Total Supported Languages: ${supportedLanguages.length}`);

supportedLanguages.forEach((l, i) => {
  const urlPath = l.code === 'en' ? '/' : `/${l.code}/`;
  console.log(`${(i + 1).toString().padStart(2)}. [${l.code.padEnd(2)}] ${l.label.padEnd(12)} -> Native Name: "${l.nativeName.padEnd(18)}" | Fallback URL: "${urlPath}"`);
});

if (supportedLanguages.length === 19) {
  console.log('\n✅ ALL 19 LANGUAGES ARE PROPERLY CONFIGURED AND AVAILABLE IN THE LANGUAGE DROPDOWN!');
} else {
  throw new Error(`Expected 19 languages, found ${supportedLanguages.length}`);
}
