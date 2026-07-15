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
  { canonicalToolId: 'villain-name-generator', label: 'Villain Name', slugBase: 'villain-name', kind: 'gaming' },
  { canonicalToolId: 'werewolf-name-generator', label: 'Werewolf Name', slugBase: 'werewolf-name', kind: 'gaming' },
  { canonicalToolId: 'japanese-name-generator', label: 'Japanese Style Name', slugBase: 'japanese-style-name', kind: 'name' },
  { canonicalToolId: 'korean-name-generator', label: 'Korean Style Name', slugBase: 'korean-style-name', kind: 'name' },
  { canonicalToolId: 'city-name-generator', label: 'City Name', slugBase: 'city-name', kind: 'gaming' },
  { canonicalToolId: 'restaurant-name-generator', label: 'Restaurant Name', slugBase: 'restaurant-name', kind: 'business' },
  { canonicalToolId: 'coffee-shop-name-generator', label: 'Coffee Shop Name', slugBase: 'coffee-shop-name', kind: 'business' },
  { canonicalToolId: 'album-name-generator', label: 'Album Name', slugBase: 'album-name', kind: 'creative' },
  { canonicalToolId: 'book-name-generator', label: 'Book Name', slugBase: 'book-name', kind: 'creative' },
  { canonicalToolId: 'movie-name-generator', label: 'Movie Name', slugBase: 'movie-name', kind: 'creative' },
  { canonicalToolId: 'newsletter-name-generator', label: 'Newsletter Name', slugBase: 'newsletter-name', kind: 'business' },
  { canonicalToolId: 'price-tag-generator', label: 'Price Tag', slugBase: 'price-tag', kind: 'utility' },
  { canonicalToolId: 'product-tag-generator', label: 'Product Tag', slugBase: 'product-tag', kind: 'utility' },
  { canonicalToolId: 'clothing-tag-generator', label: 'Clothing Tag', slugBase: 'clothing-tag', kind: 'utility' },
  { canonicalToolId: 'minutes-of-meeting-generator', label: 'Minutes Of Meeting', slugBase: 'minutes-of-meeting', kind: 'business' },
  { canonicalToolId: 'event-name-generator', label: 'Event Name', slugBase: 'event-name', kind: 'business' },
  { canonicalToolId: 'college-name-generator', label: 'College Name', slugBase: 'college-name', kind: 'creative' },
  { canonicalToolId: 'diner-name-generator', label: 'Diner Name', slugBase: 'diner-name', kind: 'business' },
  { canonicalToolId: 'flower-name-generator', label: 'Flower Name', slugBase: 'flower-name', kind: 'creative' },
  { canonicalToolId: 'newspaper-name-generator', label: 'Newspaper Name', slugBase: 'newspaper-name', kind: 'creative' },
  { canonicalToolId: 'plant-name-generator', label: 'Plant Name', slugBase: 'plant-name', kind: 'creative' },
  { canonicalToolId: 'sibling-name-generator', label: 'Sibling Name', slugBase: 'sibling-name', kind: 'name' },
  { canonicalToolId: 'pick-a-name-generator', label: 'Pick A Name', slugBase: 'pick-a-name', kind: 'utility' },
  { canonicalToolId: 'name-generator-wheel', label: 'Name Wheel', slugBase: 'name-wheel', kind: 'utility' },
  { canonicalToolId: 'cake-company-names-generator', label: 'Cake Company Name', slugBase: 'cake-company-name', kind: 'business' },
  { canonicalToolId: 'car-name-generator', label: 'Car Name', slugBase: 'car-name', kind: 'creative' },
  { canonicalToolId: 'title-name-generator', label: 'Title Name', slugBase: 'title-name', kind: 'creative' },
  { canonicalToolId: 'geo-tag-generator', label: 'Geo Tag', slugBase: 'geo-tag', kind: 'utility' },
  { canonicalToolId: 'pet-tag-generator', label: 'Pet Tag', slugBase: 'pet-tag', kind: 'utility' },
  { canonicalToolId: 'dj-tag-generator', label: 'DJ Tag', slugBase: 'dj-tag', kind: 'utility' },
  { canonicalToolId: 'clan-tag-generator', label: 'Clan Tag', slugBase: 'clan-tag', kind: 'utility' },
  { canonicalToolId: 'hang-tag-generator', label: 'Hang Tag', slugBase: 'hang-tag', kind: 'utility' },
  { canonicalToolId: 'art-tag-generator', label: 'Art Tag', slugBase: 'art-tag', kind: 'utility' },
  { canonicalToolId: 'email-tag-generator', label: 'Email Tag', slugBase: 'email-tag', kind: 'utility' },
  { canonicalToolId: 'tag-team-name-generator', label: 'Tag Team Name', slugBase: 'tag-team-name', kind: 'creative' },
  { canonicalToolId: 'warrior-name-generator', label: 'Warrior Name', slugBase: 'warrior-name', kind: 'creative' },
  { canonicalToolId: 'secret-santa-name-generator', label: 'Secret Santa Name', slugBase: 'secret-santa-name', kind: 'utility' },
  { canonicalToolId: 'anagram-of-name-generator', label: 'Name Anagram', slugBase: 'name-anagram', kind: 'utility' },
  { canonicalToolId: 'cyberpunk-name-generator', label: 'Cyberpunk Name', slugBase: 'cyberpunk-name', kind: 'creative' },
  { canonicalToolId: 'goth-name-generator', label: 'Goth Name', slugBase: 'goth-name', kind: 'creative' },
  { canonicalToolId: 'project-name-generator-keywords', label: 'Project Name From Keywords', slugBase: 'project-name-from-keywords', kind: 'business' },
  { canonicalToolId: 'scifi-name-generator', label: 'Sci-Fi Name', slugBase: 'sci-fi-name', kind: 'creative' },
];

export const rolloutB06ToolIds = tools.map((tool) => tool.canonicalToolId);

const b06SafetyAddendum: Record<RolloutLanguage, Record<'business' | 'utility' | 'name' | 'fictional', string>> = {
  es: {
    business: 'Revisa marca, dominio, permisos, precios, datos reales y cumplimiento antes del uso público.',
    utility: 'Usalo como ayuda practica; confirma etiquetas, listas o sorteos con tus propias reglas.',
    name: 'Comprueba cultura, contexto, pronunciación, derechos y disponibilidad antes de usarlo en público.',
    fictional: 'Mantenlo como inspiracion creativa y evita copiar marcas, personas reales o universos protegidos.',
  },
  fr: {
    business: 'Vérifiez marque, domaine, autorisations, prix, donnees reelles et conformite avant usage public.',
    utility: 'Utilisez-le comme aide pratique; confirmez etiquettes, listes ou tirages avec vos propres regles.',
    name: 'Vérifiez culture, contexte, prononciation, droits et disponibilité avant usage public.',
    fictional: 'Gardez un usage creatif et evitez de copier marques, personnes reelles ou univers proteges.',
  },
  de: {
    business: 'Pruefe Marke, Domain, Freigaben, Preise, echte Daten und Compliance vor oeffentlicher Nutzung.',
    utility: 'Nutze es als praktische Hilfe; bestaetige Etiketten, Listen oder Ziehungen mit eigenen Regeln.',
    name: 'Pruefe Kultur, Kontext, Aussprache, Rechte und Verfuegbarkeit vor oeffentlicher Nutzung.',
    fictional: 'Nutze es als kreative Inspiration und kopiere keine Marken, realen Personen oder geschuetzten Welten.',
  },
  pt: {
    business: 'Revise marca, dominio, permissoes, precos, dados reais e conformidade antes do uso público.',
    utility: 'Use como apoio pratico; confirme etiquetas, listas ou sorteios com suas proprias regras.',
    name: 'Verifique cultura, contexto, pronuncia, direitos e disponibilidade antes do uso público.',
    fictional: 'Mantenha como inspiracao criativa e evite copiar marcas, pessoas reais ou universos protegidos.',
  },
  it: {
    business: 'Controlla marchio, dominio, permessi, prezzi, dati reali e conformita prima delluso pubblico.',
    utility: 'Usalo come supporto pratico; conferma etichette, liste o estrazioni con le tue regole.',
    name: 'Controlla cultura, contesto, pronuncia, diritti e disponibilità prima delluso pubblico.',
    fictional: 'Usalo come ispirazione creativa ed evita di copiare marchi, persone reali o universi protetti.',
  },
  pl: {
    business: 'Sprawdz marke, domene, zgody, ceny, prawdziwe dane i zgodnosc przed publicznym użyciem.',
    utility: 'Traktuj jako praktyczna pomoc; potwierdz etykiety, listy lub losowania wedlug wlasnych zasad.',
    name: 'Sprawdz kulture, kontekst, wymowe, prawa i dostępność przed publicznym użyciem.',
    fictional: 'Uzywaj jako kreatywnej inspiracji i nie kopiuj marek, realnych osob ani chronionych swiatow.',
  },
  ru: {
    business: 'Proverte brend, domen, razresheniya, ceny, realnye dannye i sootvetstvie pered publichnym ispolzovaniem.',
    utility: 'Ispolzuyte kak prakticheskuyu pomoshch; proveriaite etiketki, spiski ili zhrebii po svoim pravilam.',
    name: 'Proverte kulturu, kontekst, proiznoshenie, prava i dostupnost pered publichnym ispolzovaniem.',
    fictional: 'Ispolzuyte kak tvorcheskoe vdohnovenie i ne kopiruite brendy, realnyh lyudei ili zashchishchennye miry.',
  },
  tr: {
    business: 'Halka acik kullanimdan once marka, alan adi, izinler, fiyatlar, gercek veriler ve uyumu kontrol edin.',
    utility: 'Pratik destek olarak kullanin; etiketleri, listeleri veya cekilisleri kendi kurallarinizla dogrulayin.',
    name: 'Halka acik kullanimdan once kultur, baglam, telaffuz, haklar ve uygunluğu kontrol edin.',
    fictional: 'Yaratici ilham olarak kullanin; marka, gercek kisi veya korunan evrenleri kopyalamayin.',
  },
  id: {
    business: 'Periksa merek, domain, izin, harga, data nyata, dan kepatuhan sebelum dipakai publik.',
    utility: 'Gunakan sebagai bantuan praktis; konfirmasi label, daftar, atau undian dengan aturan sendiri.',
    name: 'Periksa budaya, konteks, pengucapan, hak, dan ketersediaan sebelum dipakai publik.',
    fictional: 'Gunakan sebagai inspirasi kreatif dan jangan menyalin merek, orang nyata, atau semesta terlindungi.',
  },
  sv: {
    business: 'Kontrollera varumarke, doman, tillstand, priser, riktiga data och regelefterlevnad fore offentlig anvandning.',
    utility: 'Anvand som praktiskt stod; bekrafta etiketter, listor eller dragningar med egna regler.',
    name: 'Kontrollera kultur, sammanhang, uttal, rattigheter och tillganglighet fore offentlig anvandning.',
    fictional: 'Anvand som kreativ inspiration och kopiera inte varumarken, verkliga personer eller skyddade varldar.',
  },
  ms: {
    business: 'Semak jenama, domain, kebenaran, harga, data sebenar dan pematuhan sebelum penggunaan awam.',
    utility: 'Guna sebagai bantuan praktikal; sahkan label, senarai atau cabutan dengan peraturan sendiri.',
    name: 'Semak budaya, konteks, sebutan, hak dan ketersediaan sebelum penggunaan awam.',
    fictional: 'Guna sebagai inspirasi kreatif dan jangan salin jenama, orang sebenar atau dunia terlindung.',
  },
  bg: {
    business: 'Proverete marka, domen, razresheniya, ceni, realni danni i saotvetstvie predi publichna upotreba.',
    utility: 'Izpolzvaite kato prakticheska pomosht; potvardete etiketi, spisatsi ili tegleniya s vashi pravila.',
    name: 'Proverete kultura, kontekst, proiznoshenie, prava i dostupnost predi publichna upotreba.',
    fictional: 'Izpolzvaite kato tvorchesko vdahnovenie i ne kopiraite marki, realni hora ili zashtiteni svetove.',
  },
  hi: {
    business: 'Public use se pehle brand, domain, permissions, prices, real data aur compliance check karein.',
    utility: 'Practical help ke roop me use karein; labels, lists ya draws ko apne rules se confirm karein.',
    name: 'Public use se pehle culture, context, pronunciation, rights aur availability check karein.',
    fictional: 'Creative inspiration ke liye rakhein aur brands, real people ya protected worlds copy na karein.',
  },
  bn: {
    business: 'Public use er age brand, domain, permissions, prices, real data ebong compliance check korun.',
    utility: 'Practical help hishebe use korun; labels, lists ba draws nijer rules diye confirm korun.',
    name: 'Public use er age culture, context, pronunciation, rights ebong availability check korun.',
    fictional: 'Creative inspiration hishebe rakhun ebong brands, real people ba protected worlds copy korben na.',
  },
  ja: {
    business: 'Public use mae ni brand, domain, permissions, prices, real data, compliance wo kakunin shite kudasai.',
    utility: 'Jitsuyou support to shite tsukai, labels, lists, draws wa jibun no rules de kakunin shite kudasai.',
    name: 'Public use mae ni culture, context, pronunciation, rights, availability wo kakunin shite kudasai.',
    fictional: 'Creative inspiration ni todome, brands, real people, protected worlds wo copy shinaide kudasai.',
  },
  ko: {
    business: 'Public use jeone brand, domain, permissions, prices, real data, compliance reul hwaginhaseyo.',
    utility: 'Practical support ro sayonghago labels, lists, draws neun jasinui rules ro hwaginhaseyo.',
    name: 'Public use jeone culture, context, pronunciation, rights, availability reul hwaginhaseyo.',
    fictional: 'Creative inspiration yongdo ro sayonghago brands, real people, protected worlds reul copy haji maseyo.',
  },
  ar: {
    business: 'Raji alalama walnitaq waladhun walasear walbayanat alhaqiqiyah waltawafuq qabla alistikhdam alam.',
    utility: 'Istakhdimha kamusaadah amaliyah waraji alwusum aw alqawaem aw alsahb biqawaeidik.',
    name: 'Raji althaqafah walsiyaq walnutq walhuquq waltawafur qabla alistikhdam alam.',
    fictional: 'Ijaliha ilhaman ibdaian wala tansakh alamat aw ashkhas haqiqiyin aw awalim mahmiyah.',
  },
};

function b06SafetyFor(tool: RolloutToolSpec, language: RolloutLanguage): string {
  const baseSafety = safetyFor(tool, profiles[language]);
  if (tool.kind === 'business') return `${baseSafety} ${b06SafetyAddendum[language].business}`;
  if (tool.kind === 'utility') return `${baseSafety} ${b06SafetyAddendum[language].utility}`;
  if (tool.kind === 'name') return `${baseSafety} ${b06SafetyAddendum[language].name}`;
  if (tool.kind === 'creative' || tool.kind === 'gaming') return `${baseSafety} ${b06SafetyAddendum[language].fictional}`;
  return baseSafety;
}

export const rolloutB06LocalizedToolData: LocalizedToolContent[] = tools.flatMap((tool) =>
  languages.map((language) => {
    const profile = profiles[language];
    const h1 = phrase(profile, tool);
    const primaryKeyword = h1.toLowerCase();
    const safety = b06SafetyFor(tool, language);
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
