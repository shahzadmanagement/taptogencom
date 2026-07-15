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
  { canonicalToolId: 'meme-text-generator', label: 'Meme Text', slugBase: 'meme-text', kind: 'creative' },
  { canonicalToolId: 'startup-name-generator', label: 'Startup Name', slugBase: 'startup-name', kind: 'business' },
  { canonicalToolId: 'photography-name-generator', label: 'Photography Business Name', slugBase: 'photography-business-name', kind: 'business' },
  { canonicalToolId: 'art-name-generator', label: 'Art Name', slugBase: 'art-name', kind: 'creative' },
  { canonicalToolId: 'avatar-name-generator', label: 'Avatar Name', slugBase: 'avatar-name', kind: 'gaming' },
  { canonicalToolId: 'video-game-name-generator', label: 'Video Game Name', slugBase: 'video-game-name', kind: 'gaming' },
  { canonicalToolId: 'text-summary-generator', label: 'Text Summary', slugBase: 'text-summary', kind: 'writing' },
  { canonicalToolId: 'typography-generator', label: 'Typography', slugBase: 'typography', kind: 'text' },
  { canonicalToolId: 'wordart-generator', label: 'Word Art', slugBase: 'word-art', kind: 'text' },
  { canonicalToolId: 'social-media-post-generator', label: 'Social Media Post', slugBase: 'social-media-post', kind: 'social' },
  { canonicalToolId: 'email-subject-generator', label: 'Email Subject Line', slugBase: 'email-subject-line', kind: 'business' },
  { canonicalToolId: 'drag-name-generator', label: 'Drag Queen Name', slugBase: 'drag-queen-name', kind: 'creative' },
  { canonicalToolId: 'gamertag-generator', label: 'Gamertag', slugBase: 'gamertag', kind: 'gaming' },
  { canonicalToolId: 'dragonborn-name-generator', label: 'Dragonborn Name', slugBase: 'dragonborn-name', kind: 'gaming' },
  { canonicalToolId: 'email-name-generator', label: 'Email Address Name', slugBase: 'email-address-name', kind: 'business' },
  { canonicalToolId: 'synonym-generator', label: 'Synonym', slugBase: 'synonym', kind: 'writing' },
  { canonicalToolId: 'footnote-generator', label: 'Footnote', slugBase: 'footnote', kind: 'writing' },
  { canonicalToolId: 'all-caps-generator', label: 'ALL CAPS', slugBase: 'all-caps', kind: 'text' },
  { canonicalToolId: 'lowercase-generator', label: 'Lowercase', slugBase: 'lowercase', kind: 'text' },
  { canonicalToolId: 'corporate-speak-generator', label: 'Corporate Speak', slugBase: 'corporate-speak', kind: 'random' },
  { canonicalToolId: 'random-word-generator', label: 'Random Word', slugBase: 'random-word', kind: 'random' },
  { canonicalToolId: 'dialogue-tag-generator', label: 'Dialogue Tag', slugBase: 'dialogue-tag', kind: 'writing' },
  { canonicalToolId: 'name-tag-generator', label: 'Name Tag', slugBase: 'name-tag', kind: 'utility' },
  { canonicalToolId: 'graffiti-text-generator', label: 'Graffiti Text', slugBase: 'graffiti-text', kind: 'text' },
  { canonicalToolId: 'tag-cloud-generator', label: 'Tag Cloud', slugBase: 'tag-cloud', kind: 'seo' },
  { canonicalToolId: 'blog-tag-generator', label: 'Blog Tag', slugBase: 'blog-tag', kind: 'seo' },
  { canonicalToolId: 'random-height-generator', label: 'Random Height', slugBase: 'random-height', kind: 'random' },
  { canonicalToolId: 'essay-title-generator', label: 'Essay Title', slugBase: 'essay-title', kind: 'writing' },
  { canonicalToolId: 'stable-diffusion-prompt-generator', label: 'Stable Diffusion Prompt', slugBase: 'stable-diffusion-prompt', kind: 'writing' },
  { canonicalToolId: 'character-prompt-generator', label: 'Character Prompt', slugBase: 'character-prompt', kind: 'creative' },
  { canonicalToolId: 'content-brief-generator', label: 'Content Brief', slugBase: 'content-brief', kind: 'writing' },
  { canonicalToolId: 'press-release-generator', label: 'Press Release', slugBase: 'press-release', kind: 'business' },
  { canonicalToolId: 'author-bio-generator', label: 'Author Bio', slugBase: 'author-bio', kind: 'bio' },
  { canonicalToolId: 'viral-hook-generator', label: 'Viral Hook', slugBase: 'viral-hook', kind: 'social' },
  { canonicalToolId: 'content-calendar-generator', label: 'Content Calendar', slugBase: 'content-calendar', kind: 'seo' },
  { canonicalToolId: 'text-shadow-generator', label: 'CSS Text Shadow', slugBase: 'css-text-shadow', kind: 'developer' },
  { canonicalToolId: 'css-grid-generator', label: 'CSS Grid', slugBase: 'css-grid', kind: 'developer' },
  { canonicalToolId: 'flexbox-generator', label: 'CSS Flexbox', slugBase: 'css-flexbox', kind: 'developer' },
  { canonicalToolId: 'html-table-generator', label: 'HTML Table', slugBase: 'html-table', kind: 'developer' },
  { canonicalToolId: 'dummy-data-generator', label: 'Dummy Data', slugBase: 'dummy-data', kind: 'developer' },
  { canonicalToolId: 'raffle-generator', label: 'Raffle', slugBase: 'raffle', kind: 'random' },
  { canonicalToolId: 'giveaway-generator', label: 'Giveaway Winner', slugBase: 'giveaway-winner', kind: 'random' },
];

export const rolloutB04ToolIds = tools.map((tool) => tool.canonicalToolId);

const b04SafetyAddendum: Record<RolloutLanguage, Record<'utility' | 'business' | 'writing' | 'random' | 'developer' | 'social' | 'bio', string>> = {
  es: {
    utility: 'Usalo como ayuda practica y confirma el resultado antes de decisiones importantes.',
    business: 'Revisa hechos, permisos, marca, privacidad y cumplimiento antes de usarlo en público.',
    writing: 'Edita el borrador con criterio humano y no lo presentes como resultado garantizado u oficial.',
    random: 'Mantenlo como juego o lluvia de ideas; evita identidad, documentos, acoso o presion social.',
    developer: 'Revisa compatibilidad, accesibilidad y seguridad antes de usar el resultado en produccion.',
    social: 'No promete alcance, seguidores, ventas, viralidad ni rendimiento en plataformas.',
    bio: 'No lo uses para identidad falsa, suplantacion ni datos personales sensibles.',
  },
  fr: {
    utility: 'Utilisez-le comme aide pratique et verifiez le resultat avant toute decision importante.',
    business: 'Verifiez faits, autorisations, marque, confidentialite et conformite avant usage public.',
    writing: 'Revisez le brouillon humainement et ne le presentez pas comme resultat garanti ou officiel.',
    random: 'Gardez un usage ludique ou ideation; evitez identite, documents, harcelement ou pression sociale.',
    developer: 'Verifiez compatibilite, accessibilite et securite avant tout usage en production.',
    social: 'Aucune portee, abonnes, ventes, viralite ni performance de plateforme ne sont promis.',
    bio: 'Ne lutilisez pas pour une fausse identite, une usurpation ou des donnees personnelles sensibles.',
  },
  de: {
    utility: 'Nutze es als praktische Hilfe und pruefe das Ergebnis vor wichtigen Entscheidungen.',
    business: 'Pruefe Fakten, Erlaubnisse, Marke, Datenschutz und Compliance vor oeffentlicher Nutzung.',
    writing: 'Bearbeite den Entwurf menschlich und stelle ihn nicht als garantiertes oder offizielles Ergebnis dar.',
    random: 'Nutze es spielerisch oder zur Ideenfindung; vermeide Identitaet, Dokumente, Belaestigung oder sozialen Druck.',
    developer: 'Pruefe Kompatibilitaet, Barrierefreiheit und Sicherheit vor produktiver Nutzung.',
    social: 'Reichweite, Follower, Verkaeufe, Viralitaet oder Plattformleistung werden nicht versprochen.',
    bio: 'Nicht fuer falsche Identitaeten, Nachahmung oder sensible personenbezogene Daten verwenden.',
  },
  pt: {
    utility: 'Use como apoio pratico e confirme o resultado antes de decisoes importantes.',
    business: 'Revise fatos, permissoes, marca, privacidade e conformidade antes do uso público.',
    writing: 'Edite o rascunho com criterio humano e nao apresente como resultado garantido ou oficial.',
    random: 'Mantenha como brincadeira ou ideacao; evite identidade, documentos, assedio ou pressao social.',
    developer: 'Revise compatibilidade, acessibilidade e seguranca antes de usar em producao.',
    social: 'Nao promete alcance, seguidores, vendas, viralidade ou desempenho em plataformas.',
    bio: 'Nao use para identidade falsa, imitacao ou dados pessoais sensiveis.',
  },
  it: {
    utility: 'Usalo come supporto pratico e verifica il risultato prima di decisioni importanti.',
    business: 'Controlla fatti, permessi, marchio, privacy e conformita prima delluso pubblico.',
    writing: 'Rivedi la bozza con giudizio umano e non presentarla come risultato garantito o ufficiale.',
    random: 'Usalo per gioco o brainstorming; evita identita, documenti, molestie o pressione sociale.',
    developer: 'Controlla compatibilita, accessibilita e sicurezza prima delluso in produzione.',
    social: 'Non promette copertura, follower, vendite, viralita o performance di piattaforma.',
    bio: 'Non usarlo per false identita, imitazione o dati personali sensibili.',
  },
  pl: {
    utility: 'Traktuj to jako praktyczna pomoc i sprawdź wynik przed waznymi decyzjami.',
    business: 'Sprawdz fakty, zgody, marke, prywatnosc i zgodnosc przed publicznym użyciem.',
    writing: 'Edytuj szkic z ludzka ocena i nie pokazuj go jako wyniku gwarantowanego lub oficjalnego.',
    random: 'Uzywaj do zabawy lub pomyslow; unikaj tozsamosci, dokumentow, nekania lub presji spolecznej.',
    developer: 'Sprawdz zgodnosc, dostępność i bezpieczenstwo przed użyciem produkcyjnym.',
    social: 'Nie obiecuje zasiegu, obserwujacych, sprzedazy, viralowosci ani wynikow platformy.',
    bio: 'Nie uzywaj do falszywej tozsamosci, podszywania sie ani wrazliwych danych osobowych.',
  },
  ru: {
    utility: 'Ispolzuyte kak prakticheskuyu pomoshch i proveriaite rezultat pered vazhnymi resheniyami.',
    business: 'Proverte fakty, razresheniya, brend, privatnost i sootvetstvie pered publichnym ispolzovaniem.',
    writing: 'Otraktiruite chernovik vruchnuyu i ne vydavaite ego za garantirovannyi ili ofitsialnyi rezultat.',
    random: 'Ispolzuyte dlya igry ili idei; izbegajte lichnosti, dokumentov, travli ili sotsialnogo davleniya.',
    developer: 'Proverte sovmestimost, dostupnost i bezopasnost pered produktsionnym ispolzovaniem.',
    social: 'Ohvat, podpischiki, prodazhi, viralnost i rezultaty platform ne garantiruyutsya.',
    bio: 'Ne ispolzuyte dlya lozhnoi lichnosti, imitacii ili chuvstvitelnyh lichnyh dannyh.',
  },
  tr: {
    utility: 'Pratik destek olarak kullanin ve onemli kararlardan once sonucu kontrol edin.',
    business: 'Halka acik kullanimdan once gercekleri, izinleri, markayi, gizliligi ve uyumu kontrol edin.',
    writing: 'Taslagi insan degerlendirmesiyle duzenleyin ve garanti ya da resmi sonuc gibi sunmayin.',
    random: 'Oyun veya fikir uretimi icin kullanin; kimlik, belge, taciz veya sosyal baskidan kacinin.',
    developer: 'Uretimde kullanmadan once uyumluluk, erisilebilirlik ve guvenligi kontrol edin.',
    social: 'Erisim, takipci, satis, viral olma veya platform performansi vadetmez.',
    bio: 'Sahte kimlik, taklit veya hassas kisisel veriler icin kullanmayin.',
  },
  id: {
    utility: 'Gunakan sebagai bantuan praktis dan periksa hasil sebelum keputusan penting.',
    business: 'Periksa fakta, izin, merek, privasi, dan kepatuhan sebelum digunakan publik.',
    writing: 'Edit draf dengan penilaian manusia dan jangan tampilkan sebagai hasil pasti atau resmi.',
    random: 'Gunakan untuk bermain atau ide awal; hindari identitas, dokumen, pelecehan, atau tekanan sosial.',
    developer: 'Periksa kompatibilitas, aksesibilitas, dan keamanan sebelum dipakai produksi.',
    social: 'Tidak menjanjikan jangkauan, pengikut, penjualan, viralitas, atau performa platform.',
    bio: 'Jangan gunakan untuk identitas palsu, peniruan, atau data pribadi sensitif.',
  },
  sv: {
    utility: 'Anvand som praktiskt stod och kontrollera resultatet fore viktiga beslut.',
    business: 'Kontrollera fakta, tillstand, varumarke, integritet och regelefterlevnad fore offentlig anvandning.',
    writing: 'Redigera utkastet med manskligt omdome och presentera det inte som garanterat eller officiellt.',
    random: 'Anvand for lek eller ideer; undvik identitet, dokument, trakasserier eller social press.',
    developer: 'Kontrollera kompatibilitet, tillganglighet och sakerhet fore produktionsbruk.',
    social: 'Lovar inte rackvidd, foljare, forsaljning, viralitet eller plattformsresultat.',
    bio: 'Anvand inte for falsk identitet, imitation eller kansliga personuppgifter.',
  },
  ms: {
    utility: 'Guna sebagai bantuan praktikal dan semak hasil sebelum keputusan penting.',
    business: 'Semak fakta, kebenaran, jenama, privasi dan pematuhan sebelum penggunaan awam.',
    writing: 'Edit draf dengan pertimbangan manusia dan jangan jadikan sebagai hasil terjamin atau rasmi.',
    random: 'Guna untuk bermain atau idea; elakkan identiti, dokumen, gangguan atau tekanan sosial.',
    developer: 'Semak keserasian, aksesibiliti dan keselamatan sebelum guna dalam produksi.',
    social: 'Tidak menjanjikan capaian, pengikut, jualan, viraliti atau prestasi platform.',
    bio: 'Jangan guna untuk identiti palsu, penyamaran atau data peribadi sensitif.',
  },
  bg: {
    utility: 'Izpolzvaite kato prakticheska pomosht i proverete rezultata predi vazhni resheniya.',
    business: 'Proverete fakti, razresheniya, marka, poveritelnost i saotvetstvie predi publichna upotreba.',
    writing: 'Redaktiraite chernovata s choveshka otsenka i ne ya predstavyaite kato garantiran ili ofitsialen rezultat.',
    random: 'Izpolzvaite za igra ili idei; izbqgvaite identichnost, dokumenti, tormoz ili sotsialen natisk.',
    developer: 'Proverete savmestimost, dostapnost i sigurnost predi produktsionna upotreba.',
    social: 'Ne obestava obhvat, posledovateli, prodazhbi, viralnost ili rezultati v platformi.',
    bio: 'Ne izpolzvaite za falshiva identichnost, imitaciya ili chuvstvitelni lichni danni.',
  },
  hi: {
    utility: 'Isse practical madad ke roop me use karein aur important decision se pehle result check karein.',
    business: 'Public use se pehle facts, permissions, brand, privacy aur compliance check karein.',
    writing: 'Draft ko human judgement se edit karein aur guaranteed ya official result ki tarah na dikhayein.',
    random: 'Ise play ya brainstorming ke liye rakhein; identity, documents, harassment ya social pressure se bachein.',
    developer: 'Production use se pehle compatibility, accessibility aur security check karein.',
    social: 'Reach, followers, sales, viral performance ya platform result ki guarantee nahi hai.',
    bio: 'Fake identity, impersonation ya sensitive personal data ke liye use na karein.',
  },
  bn: {
    utility: 'Practical sahajyo hishebe use korun ebong important decision er age result check korun.',
    business: 'Public use er age facts, permissions, brand, privacy ebong compliance check korun.',
    writing: 'Draft ke human judgement diye edit korun ebong guaranteed ba official result hishebe dekhaben na.',
    random: 'Play ba brainstorming er jonno use korun; identity, documents, harassment ba social pressure eriye cholun.',
    developer: 'Production use er age compatibility, accessibility ebong security check korun.',
    social: 'Reach, followers, sales, viral performance ba platform result er guarantee nei.',
    bio: 'Fake identity, impersonation ba sensitive personal data er jonno use korben na.',
  },
  ja: {
    utility: 'Jitsuyou no tasuke to shite tsukai, taisetsu na handan no mae ni kekka wo kakunin shite kudasai.',
    business: 'Public use no mae ni facts, permissions, brand, privacy, compliance wo kakunin shite kudasai.',
    writing: 'Draft wa ningen no handan de henshu shi, guaranteed ya official result to shite misenaide kudasai.',
    random: 'Play ya brainstorming ni todome, identity, documents, harassment, social pressure wo sakete kudasai.',
    developer: 'Production de tsukau mae ni compatibility, accessibility, security wo kakunin shite kudasai.',
    social: 'Reach, followers, sales, viral performance, platform result wa hoshou shimasen.',
    bio: 'Fake identity, impersonation, sensitive personal data ni tsukawanai de kudasai.',
  },
  ko: {
    utility: 'Practical help ro sayonghago jungyohan gyeoljeong jeone gyeolgwareul hwaginhaseyo.',
    business: 'Public use jeone facts, permissions, brand, privacy, compliance reul hwaginhaseyo.',
    writing: 'Draft neun human judgement ro pyeonjiphago guaranteed na official result cheoreom boiji maseyo.',
    random: 'Play na brainstorming yongdo ro sayonghago identity, documents, harassment, social pressure reul pihaseyo.',
    developer: 'Production sayong jeone compatibility, accessibility, security reul hwaginhaseyo.',
    social: 'Reach, followers, sales, viral performance, platform result neun bojanghaji anhseumnida.',
    bio: 'Fake identity, impersonation, sensitive personal data yongdo ro sayonghaji maseyo.',
  },
  ar: {
    utility: 'Istakhdimha kamusaadah amaliyah waraji alnatijah qabla ay qarar muhim.',
    business: 'Raji alhaqaiq waladhun walalama walkhususiyah waltawafuq qabla alistikhdam alam.',
    writing: 'Harrir almusawadah bihukm bashari wala tuqaddimha kanatijah madmunah aw rasmiyah.',
    random: 'Istakhdimha liltarfih aw alafkar watajanab alhawiyah walwathaiq waliza aw aldaght alijtimaei.',
    developer: 'Raji altawafuq waimkaniyat alwusul walaman qabla istikhdam alnatijah fi alintaj.',
    social: 'La tadman alwusul aw almutabieen aw almabiat aw alintishar aw ada almanassah.',
    bio: 'La tastakhdimha lihawiyah zaifah aw intihal aw bayanat shakhsiya hassasah.',
  },
};

function b04SafetyFor(tool: RolloutToolSpec, language: RolloutLanguage): string {
  const baseSafety = safetyFor(tool, profiles[language]);
  if (tool.kind === 'utility') return `${baseSafety} ${b04SafetyAddendum[language].utility}`;
  if (tool.kind === 'business') return `${baseSafety} ${b04SafetyAddendum[language].business}`;
  if (tool.kind === 'writing') return `${baseSafety} ${b04SafetyAddendum[language].writing}`;
  if (tool.kind === 'random') return `${baseSafety} ${b04SafetyAddendum[language].random}`;
  if (tool.kind === 'developer') return `${baseSafety} ${b04SafetyAddendum[language].developer}`;
  if (tool.kind === 'social') return `${baseSafety} ${b04SafetyAddendum[language].social}`;
  if (tool.kind === 'bio') return `${baseSafety} ${b04SafetyAddendum[language].bio}`;
  return baseSafety;
}

export const rolloutB04LocalizedToolData: LocalizedToolContent[] = tools.flatMap((tool) =>
  languages.map((language) => {
    const profile = profiles[language];
    const h1 = phrase(profile, tool);
    const primaryKeyword = h1.toLowerCase();
    const safety = b04SafetyFor(tool, language);
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
