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
  { canonicalToolId: 'food-truck-name-generator', label: 'Food Truck Name', slugBase: 'food-truck-name', kind: 'business' },
  { canonicalToolId: 'funny-name-generator', label: 'Funny Name', slugBase: 'funny-name', kind: 'name' },
  { canonicalToolId: 'gnome-name-generator', label: 'Gnome Name', slugBase: 'gnome-name', kind: 'gaming' },
  { canonicalToolId: 'hotel-name-generator', label: 'Hotel Name', slugBase: 'hotel-name', kind: 'business' },
  { canonicalToolId: 'html-code-generator', label: 'HTML Code', slugBase: 'html-code', kind: 'developer' },
  { canonicalToolId: 'invisible-text-generator', label: 'Invisible Text', slugBase: 'invisible-text', kind: 'text' },
  { canonicalToolId: 'letterhead-generator', label: 'Membretes', slugBase: 'membretes', kind: 'business' },
  { canonicalToolId: 'logo-generator', label: 'Logo', slugBase: 'logo', kind: 'business' },
  { canonicalToolId: 'mermaid-name-generator', label: 'Mermaid Name', slugBase: 'mermaid-name', kind: 'gaming' },
  { canonicalToolId: 'monster-name-generator', label: 'Monster Name', slugBase: 'monster-name', kind: 'gaming' },
  { canonicalToolId: 'mood-board-generator', label: 'Mood Board', slugBase: 'mood-board', kind: 'creative' },
  { canonicalToolId: 'pen-name-generator', label: 'Pen Name', slugBase: 'pen-name', kind: 'name' },
  { canonicalToolId: 'pet-name-generator', label: 'Pet Name', slugBase: 'pet-name', kind: 'name' },
  { canonicalToolId: 'pixel-text-generator', label: 'Pixel Text', slugBase: 'pixel-text', kind: 'text' },
  { canonicalToolId: 'playlist-name-generator', label: 'Playlist Name', slugBase: 'playlist-name', kind: 'creative' },
  { canonicalToolId: 'proposal-generator', label: 'Proposal', slugBase: 'proposal', kind: 'business' },
  { canonicalToolId: 'purchase-order-generator', label: 'Purchase Order', slugBase: 'purchase-order', kind: 'business' },
  { canonicalToolId: 'qr-code-generator', label: 'QR Code', slugBase: 'qr-code', kind: 'utility' },
  { canonicalToolId: 'quotation-generator', label: 'Quotation', slugBase: 'quotation', kind: 'business' },
  { canonicalToolId: 'retro-text-generator', label: 'Retro Text', slugBase: 'retro-text', kind: 'text' },
  { canonicalToolId: 'robot-name-generator', label: 'Robot Name', slugBase: 'robot-name', kind: 'gaming' },
  { canonicalToolId: 'salon-name-generator', label: 'Salon Name', slugBase: 'salon-name', kind: 'business' },
  { canonicalToolId: 'ship-name-generator', label: 'Ship Name', slugBase: 'ship-name', kind: 'creative' },
  { canonicalToolId: 'short-code-generator', label: 'Short Code', slugBase: 'short-code', kind: 'utility' },
  { canonicalToolId: 'sigil-generator', label: 'Sigil', slugBase: 'sigil', kind: 'creative' },
  { canonicalToolId: 'sitemap-generator', label: 'Sitemap', slugBase: 'sitemap', kind: 'seo' },
  { canonicalToolId: 'spaceship-name-generator', label: 'Spaceship Name', slugBase: 'spaceship-name', kind: 'creative' },
  { canonicalToolId: 'sports-team-name-generator', label: 'Sports Team Name', slugBase: 'sports-team-name', kind: 'name' },
  { canonicalToolId: 'tattoo-name-generator', label: 'Tattoo Name', slugBase: 'tattoo-name', kind: 'text' },
  { canonicalToolId: 'typewriter-text-generator', label: 'Typewriter Text', slugBase: 'typewriter-text', kind: 'text' },
  { canonicalToolId: 'ancient-greek-inspired-name-generator', label: 'Ancient Greek Inspired Name', slugBase: 'ancient-greek-inspired-name', kind: 'creative' },
  { canonicalToolId: 'roman-inspired-character-name-generator', label: 'Nombres Romanos', slugBase: 'nombres-romanos', kind: 'creative' },
  { canonicalToolId: 'ancient-egyptian-inspired-name-generator', label: 'Ancient Egyptian Inspired Name', slugBase: 'ancient-egyptian-inspired-name', kind: 'creative' },
  { canonicalToolId: 'iupac-name-generator', label: 'IUPAC Name', slugBase: 'iupac-name', kind: 'utility' },
  { canonicalToolId: 'victorian-name-generator', label: 'Victorian Name', slugBase: 'victorian-name', kind: 'name' },
  { canonicalToolId: 'racehorse-name-generator', label: 'Racehorse Name', slugBase: 'racehorse-name', kind: 'name' },
  { canonicalToolId: 'emo-name-generator', label: 'Emo Name', slugBase: 'emo-name', kind: 'creative' },
  { canonicalToolId: 'poster-generator', label: 'Pósteres', slugBase: 'posteres', kind: 'business' },
  { canonicalToolId: 'flyer-generator', label: 'Flyer', slugBase: 'flyer', kind: 'business' },
  { canonicalToolId: 'fantasy-map-generator', label: 'Fantasy Map', slugBase: 'fantasy-map', kind: 'gaming' },
  { canonicalToolId: 'papyrus-generator', label: 'Papyrus Text', slugBase: 'papyrus-text', kind: 'text' },
  { canonicalToolId: 'serif-generator', label: 'Serif Text', slugBase: 'serif-text', kind: 'text' },
];

export const rolloutB08ToolIds = tools.map((tool) => tool.canonicalToolId);

const b08SafetyAddendum: Record<RolloutLanguage, Record<'business' | 'utility' | 'name' | 'fictional' | 'text' | 'seo' | 'developer', string>> = {
  es: {
    business: 'Revisa marca, permisos, precios, datos y cumplimiento antes de usarlo en público.',
    utility: 'Usalo como ayuda practica y confirma el resultado antes de decisiones importantes.',
    name: 'Comprueba contexto, sensibilidad, derechos y disponibilidad antes del uso público.',
    fictional: 'Mantenlo como inspiracion creativa y evita copiar marcas, personas reales o universos protegidos.',
    text: 'Comprueba legibilidad, accesibilidad y compatibilidad antes de compartir texto estilizado.',
    seo: 'No garantiza trafico, rankings, indexacion ni resultados de buscadores.',
    developer: 'Prueba el codigo y revisa seguridad, accesibilidad y compatibilidad antes de produccion.',
  },
  fr: {
    business: 'Vérifiez marque, autorisations, prix, donnees et conformite avant usage public.',
    utility: 'Utilisez-le comme aide pratique et vérifiez le resultat avant toute decision importante.',
    name: 'Vérifiez contexte, sensibilite, droits et disponibilité avant usage public.',
    fictional: 'Gardez un usage creatif et evitez de copier marques, personnes reelles ou univers proteges.',
    text: 'Vérifiez lisibilite, accessibilite et compatibilite avant de partager un texte stylise.',
    seo: 'Ne garantit pas trafic, classement, indexation ni resultats de recherche.',
    developer: 'Testez le code et vérifiez securite, accessibilite et compatibilite avant production.',
  },
  de: {
    business: 'Pruefe Marke, Freigaben, Preise, Daten und Compliance vor oeffentlicher Nutzung.',
    utility: 'Nutze es als praktische Hilfe und pruefe das Ergebnis vor wichtigen Entscheidungen.',
    name: 'Pruefe Kontext, Sensibilitaet, Rechte und Verfuegbarkeit vor oeffentlicher Nutzung.',
    fictional: 'Nutze es als kreative Inspiration und kopiere keine Marken, realen Personen oder geschuetzten Welten.',
    text: 'Pruefe Lesbarkeit, Barrierefreiheit und Plattform-Kompatibilitaet vor dem Teilen gestalteter Texte.',
    seo: 'Garantiert keinen Traffic, keine Rankings, Indexierung oder Suchergebnisse.',
    developer: 'Teste Code und pruefe Sicherheit, Barrierefreiheit und Kompatibilitaet vor Produktion.',
  },
  pt: {
    business: 'Revise marca, permissoes, precos, dados e conformidade antes do uso público.',
    utility: 'Use como apoio pratico e confirme o resultado antes de decisoes importantes.',
    name: 'Verifique contexto, sensibilidade, direitos e disponibilidade antes do uso público.',
    fictional: 'Mantenha como inspiracao criativa e evite copiar marcas, pessoas reais ou universos protegidos.',
    text: 'Verifique legibilidade, acessibilidade e compatibilidade antes de compartilhar texto estilizado.',
    seo: 'Nao garante trafego, rankings, indexacao ou resultados de busca.',
    developer: 'Teste o codigo e revise seguranca, acessibilidade e compatibilidade antes da producao.',
  },
  it: {
    business: 'Controlla marchio, permessi, prezzi, dati e conformita prima delluso pubblico.',
    utility: 'Usalo come supporto pratico e verifica il risultato prima di decisioni importanti.',
    name: 'Controlla contesto, sensibilita, diritti e disponibilità prima delluso pubblico.',
    fictional: 'Usalo come ispirazione creativa ed evita di copiare marchi, persone reali o universi protetti.',
    text: 'Controlla leggibilita, accessibilita e compatibilita prima di condividere testo stilizzato.',
    seo: 'Non garantisce traffico, ranking, indicizzazione o risultati di ricerca.',
    developer: 'Testa il codice e controlla sicurezza, accessibilita e compatibilita prima della produzione.',
  },
  pl: {
    business: 'Sprawdz marke, zgody, ceny, dane i zgodnosc przed publicznym użyciem.',
    utility: 'Traktuj jako praktyczna pomoc i sprawdź wynik przed waznymi decyzjami.',
    name: 'Sprawdz kontekst, wrazliwosc, prawa i dostępność przed publicznym użyciem.',
    fictional: 'Uzywaj jako kreatywnej inspiracji i nie kopiuj marek, realnych osob ani chronionych swiatow.',
    text: 'Sprawdz czytelnosc, dostępność i zgodnosc z platforma przed udostepnieniem stylizowanego tekstu.',
    seo: 'Nie gwarantuje ruchu, pozycji, indeksowania ani wynikow wyszukiwania.',
    developer: 'Testuj kod i sprawdź bezpieczenstwo, dostępność oraz zgodnosc przed produkcja.',
  },
  ru: {
    business: 'Proverte brend, razresheniya, ceny, dannye i sootvetstvie pered publichnym ispolzovaniem.',
    utility: 'Ispolzuyte kak prakticheskuyu pomoshch i proveriaite rezultat pered vazhnymi resheniyami.',
    name: 'Proverte kontekst, delikatnost, prava i dostupnost pered publichnym ispolzovaniem.',
    fictional: 'Ispolzuyte kak tvorcheskoe vdohnovenie i ne kopiruite brendy, realnyh lyudei ili zashchishchennye miry.',
    text: 'Proverte chitaemost, dostupnost i sovmestimost platformy pered publikatsiei stilizovannogo teksta.',
    seo: 'Ne garantiruet trafik, pozitsii, indeksatsiyu ili poiskovye rezultaty.',
    developer: 'Testiruite kod i proveriaite bezopasnost, dostupnost i sovmestimost pered produktsiei.',
  },
  tr: {
    business: 'Halka acik kullanimdan once marka, izinler, fiyatlar, veriler ve uyumu kontrol edin.',
    utility: 'Pratik destek olarak kullanin ve onemli kararlardan once sonucu kontrol edin.',
    name: 'Halka acik kullanimdan once baglam, hassasiyet, haklar ve uygunluğu kontrol edin.',
    fictional: 'Yaratici ilham olarak kullanin; marka, gercek kisi veya korunan evrenleri kopyalamayin.',
    text: 'Sekilli metni paylasmadan once okunabilirlik, erisilebilirlik ve platform uyumlulugunu kontrol edin.',
    seo: 'Trafik, siralama, indeksleme veya arama sonucu garanti etmez.',
    developer: 'Uretimden once kodu test edin; guvenlik, erisilebilirlik ve uyumlulugu kontrol edin.',
  },
  id: {
    business: 'Periksa merek, izin, harga, data, dan kepatuhan sebelum dipakai publik.',
    utility: 'Gunakan sebagai bantuan praktis dan periksa hasil sebelum keputusan penting.',
    name: 'Periksa konteks, sensitivitas, hak, dan ketersediaan sebelum dipakai publik.',
    fictional: 'Gunakan sebagai inspirasi kreatif dan jangan menyalin merek, orang nyata, atau semesta terlindungi.',
    text: 'Periksa keterbacaan, aksesibilitas, dan kompatibilitas platform sebelum membagikan teks bergaya.',
    seo: 'Tidak menjamin trafik, peringkat, pengindeksan, atau hasil pencarian.',
    developer: 'Uji kode dan cek keamanan, aksesibilitas, serta kompatibilitas sebelum produksi.',
  },
  sv: {
    business: 'Kontrollera varumarke, tillstand, priser, data och regelefterlevnad fore offentlig anvandning.',
    utility: 'Anvand som praktiskt stod och kontrollera resultatet fore viktiga beslut.',
    name: 'Kontrollera sammanhang, kanslighet, rattigheter och tillganglighet fore offentlig anvandning.',
    fictional: 'Anvand som kreativ inspiration och kopiera inte varumarken, verkliga personer eller skyddade varldar.',
    text: 'Kontrollera lasbarhet, tillganglighet och plattformskompatibilitet innan du delar stylad text.',
    seo: 'Lovar inte trafik, rankning, indexering eller sokresultat.',
    developer: 'Testa kod och granska sakerhet, tillganglighet och kompatibilitet fore produktion.',
  },
  ms: {
    business: 'Semak jenama, kebenaran, harga, data dan pematuhan sebelum penggunaan awam.',
    utility: 'Guna sebagai bantuan praktikal dan semak hasil sebelum keputusan penting.',
    name: 'Semak konteks, sensitiviti, hak dan ketersediaan sebelum penggunaan awam.',
    fictional: 'Guna sebagai inspirasi kreatif dan jangan salin jenama, orang sebenar atau dunia terlindung.',
    text: 'Semak kebolehbacaan, aksesibiliti dan keserasian platform sebelum berkongsi teks bergaya.',
    seo: 'Tidak menjanjikan trafik, kedudukan, pengindeksan atau hasil carian.',
    developer: 'Uji kod dan semak keselamatan, aksesibiliti serta keserasian sebelum produksi.',
  },
  bg: {
    business: 'Proverete marka, razresheniya, ceni, danni i saotvetstvie predi publichna upotreba.',
    utility: 'Izpolzvaite kato prakticheska pomosht i proverete rezultata predi vazhni resheniya.',
    name: 'Proverete kontekst, chuvstvitelnost, prava i dostupnost predi publichna upotreba.',
    fictional: 'Izpolzvaite kato tvorchesko vdahnovenie i ne kopiraite marki, realni hora ili zashtiteni svetove.',
    text: 'Proverete chetimost, dostapnost i savmestimost s platformata predi spodelyane na stiliziran tekst.',
    seo: 'Ne obestava trafik, klasirane, indeksirane ili rezultati v tarsachki.',
    developer: 'Testvaite koda i proverete sigurnost, dostapnost i savmestimost predi produktsiya.',
  },
  hi: {
    business: 'Public use se pehle brand, permissions, prices, data aur compliance check karein.',
    utility: 'Practical help ke roop me use karein aur important decision se pehle result check karein.',
    name: 'Public use se pehle context, sensitivity, rights aur availability check karein.',
    fictional: 'Creative inspiration ke liye rakhein aur brands, real people ya protected worlds copy na karein.',
    text: 'Styled text share karne se pehle readability, accessibility aur platform compatibility check karein.',
    seo: 'Traffic, ranking, indexing ya search result ki guarantee nahi deta.',
    developer: 'Production se pehle code test karein aur security, accessibility, compatibility check karein.',
  },
  bn: {
    business: 'Public use er age brand, permissions, prices, data ebong compliance check korun.',
    utility: 'Practical help hishebe use korun ebong important decision er age result check korun.',
    name: 'Public use er age context, sensitivity, rights ebong availability check korun.',
    fictional: 'Creative inspiration hishebe rakhun ebong brands, real people ba protected worlds copy korben na.',
    text: 'Styled text share korar age readability, accessibility ebong platform compatibility check korun.',
    seo: 'Traffic, ranking, indexing ba search result er guarantee nei.',
    developer: 'Production er age code test ebong security, accessibility, compatibility check korun.',
  },
  ja: {
    business: 'Public use mae ni brand, permissions, prices, data, compliance wo kakunin shite kudasai.',
    utility: 'Jitsuyou support to shite tsukai, taisetsu na handan no mae ni kekka wo kakunin shite kudasai.',
    name: 'Public use mae ni context, sensitivity, rights, availability wo kakunin shite kudasai.',
    fictional: 'Creative inspiration ni todome, brands, real people, protected worlds wo copy shinaide kudasai.',
    text: 'Styled text wo share suru mae ni readability, accessibility, platform compatibility wo kakunin shite kudasai.',
    seo: 'Traffic, ranking, indexing, search result wa hoshou shimasen.',
    developer: 'Production mae ni code test, security, accessibility, compatibility wo kakunin shite kudasai.',
  },
  ko: {
    business: 'Public use jeone brand, permissions, prices, data, compliance reul hwaginhaseyo.',
    utility: 'Practical support ro sayonghago jungyohan gyeoljeong jeone gyeolgwareul hwaginhaseyo.',
    name: 'Public use jeone context, sensitivity, rights, availability reul hwaginhaseyo.',
    fictional: 'Creative inspiration yongdo ro sayonghago brands, real people, protected worlds reul copy haji maseyo.',
    text: 'Styled text gongyu jeone readability, accessibility, platform compatibility reul hwaginhaseyo.',
    seo: 'Traffic, ranking, indexing, search result neun bojanghaji anhseumnida.',
    developer: 'Production jeone code test, security, accessibility, compatibility reul hwaginhaseyo.',
  },
  ar: {
    business: 'Raji alalama waladhun walasear walbayanat waltawafuq qabla alistikhdam alam.',
    utility: 'Istakhdimha kamusaadah amaliyah waraji alnatijah qabla ay qarar muhim.',
    name: 'Raji alsiyaq walhusasiyah walhuquq waltawafur qabla alistikhdam alam.',
    fictional: 'Ijaliha ilhaman ibdaian wala tansakh alamat aw ashkhas haqiqiyin aw awalim mahmiyah.',
    text: 'Tahaqqaq min suhulat alqiraah waimkaniyat alwusul watawafuq almanassah qabla musharakat alnass almuzakhraf.',
    seo: 'La tadman alziyarat aw altartib aw alfahrasah aw nataij albahth.',
    developer: 'Ikhtabir alkod waraji alaman waimkaniyat alwusul waltawafuq qabla alintaj.',
  },
};

function b08SafetyFor(tool: RolloutToolSpec, language: RolloutLanguage): string {
  const baseSafety = safetyFor(tool, profiles[language]);
  if (tool.kind === 'business' || tool.kind === 'bio' || tool.kind === 'social') return `${baseSafety} ${b08SafetyAddendum[language].business}`;
  if (tool.kind === 'utility' || tool.kind === 'writing') return `${baseSafety} ${b08SafetyAddendum[language].utility}`;
  if (tool.kind === 'name') return `${baseSafety} ${b08SafetyAddendum[language].name}`;
  if (tool.kind === 'creative' || tool.kind === 'gaming') return `${baseSafety} ${b08SafetyAddendum[language].fictional}`;
  if (tool.kind === 'text') return `${baseSafety} ${b08SafetyAddendum[language].text}`;
  if (tool.kind === 'seo') return `${baseSafety} ${b08SafetyAddendum[language].seo}`;
  if (tool.kind === 'developer') return `${baseSafety} ${b08SafetyAddendum[language].developer}`;
  return baseSafety;
}

export const rolloutB08LocalizedToolData: LocalizedToolContent[] = tools.flatMap((tool) =>
  languages.map((language) => {
    const profile = profiles[language];
    const h1 = phrase(profile, tool);
    const primaryKeyword = h1.toLowerCase();
    const safety = b08SafetyFor(tool, language);
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
