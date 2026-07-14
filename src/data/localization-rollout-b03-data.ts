import type { LocalizedToolContent } from './localization';
import {
  languages,
  phrase,
  profiles,
  safetyFor,
  slugFor,
  type RolloutLanguage,
  type RolloutToolSpec,
} from './localization-rollout-b01-data';

const tools: RolloutToolSpec[] = [
  { canonicalToolId: 'hex-color-generator', label: 'Hex Color', slugBase: 'hex-color', kind: 'developer' },
  { canonicalToolId: 'rgb-generator', label: 'RGB Color', slugBase: 'rgb-color', kind: 'developer' },
  { canonicalToolId: 'ai-prompt-generator', label: 'AI Prompt', slugBase: 'ai-prompt', kind: 'writing' },
  { canonicalToolId: 'midjourney-prompt-generator', label: 'Midjourney Prompt', slugBase: 'midjourney-prompt', kind: 'writing' },
  { canonicalToolId: 'passphrase-generator', label: 'Passphrase', slugBase: 'passphrase', kind: 'developer' },
  { canonicalToolId: 'css-button-generator', label: 'CSS Button', slugBase: 'css-button', kind: 'developer' },
  { canonicalToolId: 'box-shadow-generator', label: 'CSS Box Shadow', slugBase: 'css-box-shadow', kind: 'developer' },
  { canonicalToolId: 'border-radius-generator', label: 'CSS Border Radius', slugBase: 'css-border-radius', kind: 'developer' },
  { canonicalToolId: 'regex-generator', label: 'Regex', slugBase: 'regex', kind: 'developer' },
  { canonicalToolId: 'cron-expression-generator', label: 'Cron Expression', slugBase: 'cron-expression', kind: 'developer' },
  { canonicalToolId: 'random-letter-generator', label: 'Random Letter', slugBase: 'random-letter', kind: 'random' },
  { canonicalToolId: 'random-question-generator', label: 'Random Question', slugBase: 'random-question', kind: 'random' },
  { canonicalToolId: 'truth-or-dare-generator', label: 'Truth or Dare', slugBase: 'truth-or-dare', kind: 'random' },
  { canonicalToolId: 'would-you-rather-generator', label: 'Would You Rather', slugBase: 'would-you-rather', kind: 'random' },
  { canonicalToolId: 'joke-generator', label: 'Joke', slugBase: 'joke', kind: 'random' },
  { canonicalToolId: 'compliment-generator', label: 'Compliment', slugBase: 'compliment', kind: 'random' },
  { canonicalToolId: 'email-signature-generator', label: 'Email Signature', slugBase: 'email-signature', kind: 'business' },
  { canonicalToolId: 'gradient-generator', label: 'CSS Gradient', slugBase: 'css-gradient', kind: 'developer' },
  { canonicalToolId: 'font-pairing-generator', label: 'Font Pairing', slugBase: 'font-pairing', kind: 'developer' },
  { canonicalToolId: 'cold-email-generator', label: 'Cold Email', slugBase: 'cold-email', kind: 'business' },
  { canonicalToolId: 'cover-letter-generator', label: 'Cover Letter', slugBase: 'cover-letter', kind: 'writing' },
  { canonicalToolId: 'resume-summary-generator', label: 'Resume Summary', slugBase: 'resume-summary', kind: 'writing' },
  { canonicalToolId: 'ad-copy-generator', label: 'Ad Copy', slugBase: 'ad-copy', kind: 'business' },
  { canonicalToolId: 'call-to-action-generator', label: 'Call to Action', slugBase: 'call-to-action', kind: 'business' },
  { canonicalToolId: 'random-emoji-generator', label: 'Random Emoji', slugBase: 'random-emoji', kind: 'random' },
  { canonicalToolId: 'random-country-generator', label: 'Random Country', slugBase: 'random-country', kind: 'random' },
  { canonicalToolId: 'random-date-generator', label: 'Random Date', slugBase: 'random-date', kind: 'random' },
  { canonicalToolId: 'random-choice-generator', label: 'Random Choice', slugBase: 'random-choice', kind: 'utility' },
  { canonicalToolId: 'game-idea-generator', label: 'Game Idea', slugBase: 'game-idea', kind: 'gaming' },
  { canonicalToolId: 'rpg-character-generator', label: 'RPG Character', slugBase: 'rpg-character', kind: 'gaming' },
  { canonicalToolId: 'npc-generator', label: 'NPC', slugBase: 'npc', kind: 'gaming' },
  { canonicalToolId: 'quest-generator', label: 'Quest', slugBase: 'quest', kind: 'gaming' },
  { canonicalToolId: 'story-plot-generator', label: 'Story Plot', slugBase: 'story-plot', kind: 'creative' },
  { canonicalToolId: 'riddle-generator', label: 'Riddle', slugBase: 'riddle', kind: 'random' },
  { canonicalToolId: 'icebreaker-generator', label: 'Icebreaker', slugBase: 'icebreaker', kind: 'random' },
  { canonicalToolId: 'product-title-generator', label: 'Product Title', slugBase: 'product-title', kind: 'business' },
  { canonicalToolId: 'sku-generator', label: 'SKU', slugBase: 'sku', kind: 'business' },
  { canonicalToolId: 'testimonial-generator', label: 'Testimonial', slugBase: 'testimonial', kind: 'business' },
  { canonicalToolId: 'coupon-code-generator', label: 'Coupon Code', slugBase: 'coupon-code', kind: 'business' },
  { canonicalToolId: 'barcode-generator', label: 'Barcode Text', slugBase: 'barcode-text', kind: 'developer' },
  { canonicalToolId: 'meeting-agenda-generator', label: 'Meeting Agenda', slugBase: 'meeting-agenda', kind: 'business' },
  { canonicalToolId: 'citation-generator', label: 'Citation', slugBase: 'citation', kind: 'writing' },
  { canonicalToolId: 'headline-generator', label: 'Headline', slugBase: 'headline', kind: 'writing' },
];

export const rolloutB03ToolIds = tools.map((tool) => tool.canonicalToolId);

const b03SafetyAddendum: Record<RolloutLanguage, Record<'utility' | 'business' | 'writing' | 'random' | 'developer', string>> = {
  es: {
    utility: 'Usalo como ayuda practica y confirma el resultado antes de decisiones importantes.',
    business: 'Revisa hechos, permisos, marca, privacidad y cumplimiento antes de usarlo en publico.',
    writing: 'Edita el borrador con criterio humano y no lo presentes como resultado garantizado u oficial.',
    random: 'Mantenlo como juego o lluvia de ideas; evita identidad, documentos, acoso o presion social.',
    developer: 'Revisa compatibilidad, accesibilidad y seguridad antes de usar el resultado en produccion.',
  },
  fr: {
    utility: 'Utilisez-le comme aide pratique et verifiez le resultat avant toute decision importante.',
    business: 'Verifiez faits, autorisations, marque, confidentialite et conformite avant usage public.',
    writing: 'Revisez le brouillon humainement et ne le presentez pas comme resultat garanti ou officiel.',
    random: 'Gardez un usage ludique ou ideation; evitez identite, documents, harcelement ou pression sociale.',
    developer: 'Verifiez compatibilite, accessibilite et securite avant tout usage en production.',
  },
  de: {
    utility: 'Nutze es als praktische Hilfe und pruefe das Ergebnis vor wichtigen Entscheidungen.',
    business: 'Pruefe Fakten, Erlaubnisse, Marke, Datenschutz und Compliance vor oeffentlicher Nutzung.',
    writing: 'Bearbeite den Entwurf menschlich und stelle ihn nicht als garantiertes oder offizielles Ergebnis dar.',
    random: 'Nutze es spielerisch oder zur Ideenfindung; vermeide Identitaet, Dokumente, Belaestigung oder sozialen Druck.',
    developer: 'Pruefe Kompatibilitaet, Barrierefreiheit und Sicherheit vor produktiver Nutzung.',
  },
  pt: {
    utility: 'Use como apoio pratico e confirme o resultado antes de decisoes importantes.',
    business: 'Revise fatos, permissoes, marca, privacidade e conformidade antes do uso publico.',
    writing: 'Edite o rascunho com criterio humano e nao apresente como resultado garantido ou oficial.',
    random: 'Mantenha como brincadeira ou ideacao; evite identidade, documentos, assedio ou pressao social.',
    developer: 'Revise compatibilidade, acessibilidade e seguranca antes de usar em producao.',
  },
  it: {
    utility: 'Usalo come supporto pratico e verifica il risultato prima di decisioni importanti.',
    business: 'Controlla fatti, permessi, marchio, privacy e conformita prima delluso pubblico.',
    writing: 'Rivedi la bozza con giudizio umano e non presentarla come risultato garantito o ufficiale.',
    random: 'Usalo per gioco o brainstorming; evita identita, documenti, molestie o pressione sociale.',
    developer: 'Controlla compatibilita, accessibilita e sicurezza prima delluso in produzione.',
  },
  pl: {
    utility: 'Traktuj to jako praktyczna pomoc i sprawdź wynik przed waznymi decyzjami.',
    business: 'Sprawdz fakty, zgody, marke, prywatnosc i zgodnosc przed publicznym użyciem.',
    writing: 'Edytuj szkic z ludzka ocena i nie pokazuj go jako wyniku gwarantowanego lub oficjalnego.',
    random: 'Uzywaj do zabawy lub pomyslow; unikaj tozsamosci, dokumentow, nekania lub presji spolecznej.',
    developer: 'Sprawdz zgodnosc, dostępność i bezpieczenstwo przed użyciem produkcyjnym.',
  },
  ru: {
    utility: 'Ispolzuyte kak prakticheskuyu pomoshch i proveriaite rezultat pered vazhnymi resheniyami.',
    business: 'Proverte fakty, razresheniya, brend, privatnost i sootvetstvie pered publichnym ispolzovaniem.',
    writing: 'Otraktiruite chernovik vruchnuyu i ne vydavaite ego za garantirovannyi ili ofitsialnyi rezultat.',
    random: 'Ispolzuyte dlya igry ili idei; izbegajte lichnosti, dokumentov, travli ili sotsialnogo davleniya.',
    developer: 'Proverte sovmestimost, dostupnost i bezopasnost pered produktsionnym ispolzovaniem.',
  },
  tr: {
    utility: 'Pratik destek olarak kullanin ve onemli kararlardan once sonucu kontrol edin.',
    business: 'Halka acik kullanimdan once gercekleri, izinleri, markayi, gizliligi ve uyumu kontrol edin.',
    writing: 'Taslagi insan degerlendirmesiyle duzenleyin ve garanti ya da resmi sonuc gibi sunmayin.',
    random: 'Oyun veya fikir uretimi icin kullanin; kimlik, belge, taciz veya sosyal baskidan kacinin.',
    developer: 'Uretimde kullanmadan once uyumluluk, erisilebilirlik ve guvenligi kontrol edin.',
  },
  id: {
    utility: 'Gunakan sebagai bantuan praktis dan periksa hasil sebelum keputusan penting.',
    business: 'Periksa fakta, izin, merek, privasi, dan kepatuhan sebelum digunakan publik.',
    writing: 'Edit draf dengan penilaian manusia dan jangan tampilkan sebagai hasil pasti atau resmi.',
    random: 'Gunakan untuk bermain atau ide awal; hindari identitas, dokumen, pelecehan, atau tekanan sosial.',
    developer: 'Periksa kompatibilitas, aksesibilitas, dan keamanan sebelum dipakai produksi.',
  },
  sv: {
    utility: 'Anvand som praktiskt stod och kontrollera resultatet fore viktiga beslut.',
    business: 'Kontrollera fakta, tillstand, varumarke, integritet och regelefterlevnad fore offentlig anvandning.',
    writing: 'Redigera utkastet med manskligt omdome och presentera det inte som garanterat eller officiellt.',
    random: 'Anvand for lek eller ideer; undvik identitet, dokument, trakasserier eller social press.',
    developer: 'Kontrollera kompatibilitet, tillganglighet och sakerhet fore produktionsbruk.',
  },
  ms: {
    utility: 'Guna sebagai bantuan praktikal dan semak hasil sebelum keputusan penting.',
    business: 'Semak fakta, kebenaran, jenama, privasi dan pematuhan sebelum penggunaan awam.',
    writing: 'Edit draf dengan pertimbangan manusia dan jangan jadikan sebagai hasil terjamin atau rasmi.',
    random: 'Guna untuk bermain atau idea; elakkan identiti, dokumen, gangguan atau tekanan sosial.',
    developer: 'Semak keserasian, aksesibiliti dan keselamatan sebelum guna dalam produksi.',
  },
  bg: {
    utility: 'Izpolzvaite kato prakticheska pomosht i proverete rezultata predi vazhni resheniya.',
    business: 'Proverete fakti, razresheniya, marka, poveritelnost i saotvetstvie predi publichna upotreba.',
    writing: 'Redaktiraite chernovata s choveshka otsenka i ne ya predstavyaite kato garantiran ili ofitsialen rezultat.',
    random: 'Izpolzvaite za igra ili idei; izbqgvaite identichnost, dokumenti, tormoz ili sotsialen natisk.',
    developer: 'Proverete savmestimost, dostapnost i sigurnost predi produktsionna upotreba.',
  },
  hi: {
    utility: 'Isse practical madad ke roop me use karein aur important decision se pehle result check karein.',
    business: 'Public use se pehle facts, permissions, brand, privacy aur compliance check karein.',
    writing: 'Draft ko human judgement se edit karein aur guaranteed ya official result ki tarah na dikhayein.',
    random: 'Ise play ya brainstorming ke liye rakhein; identity, documents, harassment ya social pressure se bachein.',
    developer: 'Production use se pehle compatibility, accessibility aur security check karein.',
  },
  bn: {
    utility: 'Practical sahajyo hishebe use korun ebong important decision er age result check korun.',
    business: 'Public use er age facts, permissions, brand, privacy ebong compliance check korun.',
    writing: 'Draft ke human judgement diye edit korun ebong guaranteed ba official result hishebe dekhaben na.',
    random: 'Play ba brainstorming er jonno use korun; identity, documents, harassment ba social pressure eriye cholun.',
    developer: 'Production use er age compatibility, accessibility ebong security check korun.',
  },
  ja: {
    utility: 'Jitsuyou no tasuke to shite tsukai, taisetsu na handan no mae ni kekka wo kakunin shite kudasai.',
    business: 'Public use no mae ni facts, permissions, brand, privacy, compliance wo kakunin shite kudasai.',
    writing: 'Draft wa ningen no handan de henshu shi, guaranteed ya official result to shite misenaide kudasai.',
    random: 'Play ya brainstorming ni todome, identity, documents, harassment, social pressure wo sakete kudasai.',
    developer: 'Production de tsukau mae ni compatibility, accessibility, security wo kakunin shite kudasai.',
  },
  ko: {
    utility: 'Practical help ro sayonghago jungyohan gyeoljeong jeone gyeolgwareul hwaginhaseyo.',
    business: 'Public use jeone facts, permissions, brand, privacy, compliance reul hwaginhaseyo.',
    writing: 'Draft neun human judgement ro pyeonjiphago guaranteed na official result cheoreom boiji maseyo.',
    random: 'Play na brainstorming yongdo ro sayonghago identity, documents, harassment, social pressure reul pihaseyo.',
    developer: 'Production sayong jeone compatibility, accessibility, security reul hwaginhaseyo.',
  },
  ar: {
    utility: 'Istakhdimha kamusaadah amaliyah waraji alnatijah qabla ay qarar muhim.',
    business: 'Raji alhaqaiq waladhun walalama walkhususiyah waltawafuq qabla alistikhdam alam.',
    writing: 'Harrir almusawadah bihukm bashari wala tuqaddimha kanatijah madmunah aw rasmiyah.',
    random: 'Istakhdimha liltarfih aw alafkar watajanab alhawiyah walwathaiq waliza aw aldaght alijtimaei.',
    developer: 'Raji altawafuq waimkaniyat alwusul walaman qabla istikhdam alnatijah fi alintaj.',
  },
};

function b03SafetyFor(tool: RolloutToolSpec, language: RolloutLanguage): string {
  const baseSafety = safetyFor(tool, profiles[language]);
  if (tool.kind === 'utility') return `${baseSafety} ${b03SafetyAddendum[language].utility}`;
  if (tool.kind === 'business') return `${baseSafety} ${b03SafetyAddendum[language].business}`;
  if (tool.kind === 'writing') return `${baseSafety} ${b03SafetyAddendum[language].writing}`;
  if (tool.kind === 'random') return `${baseSafety} ${b03SafetyAddendum[language].random}`;
  if (tool.kind === 'developer') return `${baseSafety} ${b03SafetyAddendum[language].developer}`;
  return baseSafety;
}

export const rolloutB03LocalizedToolData: LocalizedToolContent[] = tools.flatMap((tool) =>
  languages.map((language) => {
    const profile = profiles[language];
    const h1 = phrase(profile, tool);
    const primaryKeyword = h1.toLowerCase();
    const safety = b03SafetyFor(tool, language);
    return {
      canonicalToolId: tool.canonicalToolId,
      language,
      primaryKeyword,
      localizedSlug: slugFor(language, tool),
      h1,
      metaTitle: `${h1} ${profile.free}`,
      metaDescription: `${profile.intro} ${safety}`.slice(0, 220),
      intro: profile.intro,
      faqTopics: profile.faqTopics,
      searchIntentNote: profile.intent,
      riskSafetyNote: safety,
    };
  }),
);
