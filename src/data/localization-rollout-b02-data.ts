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
  { canonicalToolId: 'story-name-generator', label: 'Story Title', slugBase: 'story-title', kind: 'creative' },
  { canonicalToolId: 'twitch-name-generator', label: 'Twitch Name', slugBase: 'twitch-name', kind: 'social' },
  { canonicalToolId: 'random-phrase-generator', label: 'Random Phrase', slugBase: 'random-phrase', kind: 'utility' },
  { canonicalToolId: 'special-character-generator', label: 'Special Character', slugBase: 'special-character', kind: 'text' },
  { canonicalToolId: 'ascii-text-generator', label: 'ASCII Text Art', slugBase: 'ascii-text-art', kind: 'text' },
  { canonicalToolId: 'creepy-text-generator', label: 'Creepy Text', slugBase: 'creepy-text', kind: 'text' },
  { canonicalToolId: 'gaming-name-generator', label: 'Gaming Name', slugBase: 'gaming-name', kind: 'gaming' },
  { canonicalToolId: 'guild-name-generator', label: 'Guild Name', slugBase: 'guild-name', kind: 'gaming' },
  { canonicalToolId: 'planet-name-generator', label: 'Planet Name', slugBase: 'planet-name', kind: 'gaming' },
  { canonicalToolId: 'island-name-generator', label: 'Island Name', slugBase: 'island-name', kind: 'gaming' },
  { canonicalToolId: 'shop-name-generator', label: 'Shop Name', slugBase: 'shop-name', kind: 'business' },
  { canonicalToolId: 'cafe-name-generator', label: 'Cafe Name', slugBase: 'cafe-name', kind: 'business' },
  { canonicalToolId: 'stage-name-generator', label: 'Stage Name', slugBase: 'stage-name', kind: 'creative' },
  { canonicalToolId: 'wrestling-name-generator', label: 'Wrestling Name', slugBase: 'wrestling-name', kind: 'creative' },
  { canonicalToolId: 'cool-text-generator', label: 'Cool Text', slugBase: 'cool-text', kind: 'text' },
  { canonicalToolId: 'old-english-text-generator', label: 'Old English Text', slugBase: 'old-english-text', kind: 'text' },
  { canonicalToolId: 'uwu-text-generator', label: 'UwU Text', slugBase: 'uwu-text', kind: 'text' },
  { canonicalToolId: 'leet-text-generator', label: 'Leet Speak', slugBase: 'leet-speak', kind: 'text' },
  { canonicalToolId: 'random-text-generator', label: 'Random Text', slugBase: 'random-text', kind: 'utility' },
  { canonicalToolId: 'discord-timestamp-generator', label: 'Discord Timestamp', slugBase: 'discord-timestamp', kind: 'developer' },
  { canonicalToolId: 'utm-generator', label: 'UTM Link', slugBase: 'utm-link', kind: 'seo' },
  { canonicalToolId: 'gibberish-generator', label: 'Gibberish', slugBase: 'gibberish', kind: 'utility' },
  { canonicalToolId: 'couple-name-generator', label: 'Couple Name', slugBase: 'couple-name', kind: 'name' },
  { canonicalToolId: 'dwarf-name-generator', label: 'Dwarven Name', slugBase: 'dwarven-name', kind: 'gaming' },
  { canonicalToolId: 'tiefling-name-generator', label: 'Tiefling Name', slugBase: 'tiefling-name', kind: 'gaming' },
  { canonicalToolId: 'school-name-generator', label: 'School Name', slugBase: 'school-name', kind: 'business' },
  { canonicalToolId: 'street-name-generator', label: 'Street Name', slugBase: 'street-name', kind: 'utility' },
  { canonicalToolId: 'book-club-name-generator', label: 'Book Club Name', slugBase: 'book-club-name', kind: 'creative' },
  { canonicalToolId: 'pinterest-tag-generator', label: 'Pinterest Tag', slugBase: 'pinterest-tag', kind: 'social' },
  { canonicalToolId: 'soundcloud-tag-generator', label: 'SoundCloud Tag', slugBase: 'soundcloud-tag', kind: 'social' },
  { canonicalToolId: 'error-message-generator', label: 'Error Message', slugBase: 'error-message', kind: 'developer' },
  { canonicalToolId: 'cipher-generator', label: 'Cipher', slugBase: 'cipher', kind: 'developer' },
  { canonicalToolId: 'repeat-text-generator', label: 'Repeat Text', slugBase: 'repeat-text', kind: 'utility' },
  { canonicalToolId: 'magic-name-generator', label: 'Magic Name', slugBase: 'magic-name', kind: 'gaming' },
  { canonicalToolId: 'angel-name-generator', label: 'Angel Name', slugBase: 'angel-name', kind: 'gaming' },
  { canonicalToolId: 'tavern-name-generator', label: 'Tavern Name', slugBase: 'tavern-name', kind: 'gaming' },
  { canonicalToolId: 'dungeon-name-generator', label: 'Dungeon Name', slugBase: 'dungeon-name', kind: 'gaming' },
  { canonicalToolId: 'cat-name-generator', label: 'Cat Name', slugBase: 'cat-name', kind: 'name' },
  { canonicalToolId: 'horse-name-generator', label: 'Horse Name', slugBase: 'horse-name', kind: 'name' },
  { canonicalToolId: 'snapchat-name-generator', label: 'Snapchat Name', slugBase: 'snapchat-name', kind: 'social' },
  { canonicalToolId: 'bio-generator', label: 'Bio', slugBase: 'bio', kind: 'bio' },
  { canonicalToolId: 'wifi-name-generator', label: 'WiFi Name', slugBase: 'wifi-name', kind: 'utility' },
  { canonicalToolId: 'color-name-generator', label: 'Color Name', slugBase: 'color-name', kind: 'creative' },
];

export const rolloutB02ToolIds = tools.map((tool) => tool.canonicalToolId);

const b02SafetyAddendum: Record<RolloutLanguage, Record<'utility' | 'social' | 'business' | 'bio', string>> = {
  es: {
    utility: 'Usalo como ayuda practica y confirma el resultado antes de decisiones importantes.',
    social: 'No promete alcance, seguidores, disponibilidad de nombres ni rendimiento en plataformas.',
    business: 'No reemplaza revision legal, financiera, de marca ni disponibilidad comercial.',
    bio: 'No lo uses para identidad falsa, suplantacion ni datos personales sensibles.',
  },
  fr: {
    utility: 'Utilisez-le comme aide pratique et verifiez le resultat avant toute decision importante.',
    social: 'Aucune portee, abonnes, disponibilité de noms ni performance de plateforme ne sont promis.',
    business: 'Ne remplace pas une revue juridique, financiere, de marque ou de disponibilité commerciale.',
    bio: 'Ne lutilisez pas pour une fausse identite, une usurpation ou des donnees personnelles sensibles.',
  },
  de: {
    utility: 'Nutze es als praktische Hilfe und pruefe das Ergebnis vor wichtigen Entscheidungen.',
    social: 'Reichweite, Follower, Namensverfuegbarkeit oder Plattformleistung werden nicht versprochen.',
    business: 'Ersetzt keine rechtliche, finanzielle, Marken- oder Verfuegbarkeitspruefung.',
    bio: 'Nicht fuer falsche Identitaeten, Nachahmung oder sensible personenbezogene Daten verwenden.',
  },
  pt: {
    utility: 'Use como apoio pratico e confirme o resultado antes de decisoes importantes.',
    social: 'Nao promete alcance, seguidores, disponibilidade de nomes ou desempenho em plataformas.',
    business: 'Nao substitui revisao juridica, financeira, de marca ou disponibilidade comercial.',
    bio: 'Nao use para identidade falsa, imitacao ou dados pessoais sensiveis.',
  },
  it: {
    utility: 'Usalo come supporto pratico e verifica il risultato prima di decisioni importanti.',
    social: 'Non promette copertura, follower, disponibilità di nomi o performance di piattaforma.',
    business: 'Non sostituisce revisioni legali, finanziarie, di marchio o disponibilità commerciale.',
    bio: 'Non usarlo per false identita, imitazione o dati personali sensibili.',
  },
  pl: {
    utility: 'Traktuj to jako praktyczna pomoc i sprawdź wynik przed waznymi decyzjami.',
    social: 'Nie obiecuje zasiegu, obserwujacych, dostępnośći nazw ani wynikow platformy.',
    business: 'Nie zastepuje kontroli prawnej, finansowej, markowej ani dostępnośći handlowej.',
    bio: 'Nie uzywaj do falszywej tozsamosci, podszywania sie ani wrazliwych danych osobowych.',
  },
  ru: {
    utility: 'Ispolzuyte kak prakticheskuyu pomoshch i proveriaite rezultat pered vazhnymi resheniyami.',
    social: 'Ne obeshchaet ohvat, podpischikov, dostupnost imen ili rezultaty platform.',
    business: 'Ne zamenyaet yuridicheskuyu, finansovuyu, brendovuyu proverku ili proverku dostupnosti.',
    bio: 'Ne ispolzuyte dlya lozhnoi lichnosti, imitacii ili chuvstvitelnyh lichnyh dannyh.',
  },
  tr: {
    utility: 'Pratik destek olarak kullanin ve onemli kararlardan once sonucu kontrol edin.',
    social: 'Erisim, takipci, ad uygunluğu veya platform performansi vadetmez.',
    business: 'Hukuki, finansal, marka veya ticari uygunluk incelemesinin yerine gecmez.',
    bio: 'Sahte kimlik, taklit veya hassas kisisel veriler icin kullanmayin.',
  },
  id: {
    utility: 'Gunakan sebagai bantuan praktis dan periksa hasil sebelum keputusan penting.',
    social: 'Tidak menjanjikan jangkauan, pengikut, ketersediaan nama, atau performa platform.',
    business: 'Tidak menggantikan tinjauan hukum, keuangan, merek, atau ketersediaan komersial.',
    bio: 'Jangan gunakan untuk identitas palsu, peniruan, atau data pribadi sensitif.',
  },
  sv: {
    utility: 'Anvand som praktiskt stod och kontrollera resultatet fore viktiga beslut.',
    social: 'Lovar inte rackvidd, foljare, namntillganglighet eller plattformsresultat.',
    business: 'Ersatter inte juridisk, finansiell, varumarkes- eller kommersiell kontroll.',
    bio: 'Anvand inte for falsk identitet, imitation eller kansliga personuppgifter.',
  },
  ms: {
    utility: 'Guna sebagai bantuan praktikal dan semak hasil sebelum keputusan penting.',
    social: 'Tidak menjanjikan capaian, pengikut, ketersediaan nama atau prestasi platform.',
    business: 'Tidak menggantikan semakan undang-undang, kewangan, jenama atau ketersediaan komersial.',
    bio: 'Jangan guna untuk identiti palsu, penyamaran atau data peribadi sensitif.',
  },
  bg: {
    utility: 'Izpolzvaite kato prakticheska pomosht i proverete rezultata predi vazhni resheniya.',
    social: 'Ne obestava obhvat, posledovateli, dostupnost na imena ili rezultati v platformi.',
    business: 'Ne zamenya pravna, finansova, brandova ili targovska proverka.',
    bio: 'Ne izpolzvaite za falshiva identichnost, imitaciya ili chuvstvitelni lichni danni.',
  },
  hi: {
    utility: 'Isse practical madad ke roop me use karein aur important decision se pehle result check karein.',
    social: 'Reach, followers, name availability ya platform performance ki guarantee nahi hai.',
    business: 'Legal, financial, brand ya commercial availability review ka replacement nahi hai.',
    bio: 'Fake identity, impersonation ya sensitive personal data ke liye use na karein.',
  },
  bn: {
    utility: 'Practical sahajyo hishebe use korun ebong important decision er age result check korun.',
    social: 'Reach, follower, name availability ba platform performance er guarantee nei.',
    business: 'Legal, financial, brand ba commercial availability review er bodol noy.',
    bio: 'Fake identity, impersonation ba sensitive personal data er jonno use korben na.',
  },
  ja: {
    utility: 'Jitsuyou no tasuke to shite tsukai, taisetsu na handan no mae ni kekka wo kakunin shite kudasai.',
    social: 'Reach, followers, name availability, platform performance wa hoshou shimasen.',
    business: 'Legal, financial, brand, commercial availability no kakunin no kawari dewa arimasen.',
    bio: 'Fake identity, impersonation, sensitive personal data ni tsukawanai de kudasai.',
  },
  ko: {
    utility: 'Practical help ro sayonghago jungyohan gyeoljeong jeone gyeolgwareul hwaginhaseyo.',
    social: 'Reach, followers, name availability, platform performance neun bojanghaji anhseumnida.',
    business: 'Legal, financial, brand, commercial availability geomto reul daesin haji anhseumnida.',
    bio: 'Fake identity, impersonation, sensitive personal data yongdo ro sayonghaji maseyo.',
  },
  ar: {
    utility: 'Istakhdimha kamusaadah amaliyah waraji alnatijah qabla ay qarar muhim.',
    social: 'La tadman alwusul aw almutabieen aw tawafur alasma aw ada almanassah.',
    business: 'La tastabdil murajaah qanuniyah aw maliyah aw tijariyah aw huquq alalama.',
    bio: 'La tastakhdimha lihawiyah zaifah aw intihal aw bayanat shakhsiya hassasah.',
  },
};

function b02SafetyFor(tool: RolloutToolSpec, language: RolloutLanguage): string {
  const baseSafety = safetyFor(tool, profiles[language]);
  if (tool.kind === 'utility') return `${baseSafety} ${b02SafetyAddendum[language].utility}`;
  if (tool.kind === 'social') return `${baseSafety} ${b02SafetyAddendum[language].social}`;
  if (tool.kind === 'business') return `${baseSafety} ${b02SafetyAddendum[language].business}`;
  if (tool.kind === 'bio') return `${baseSafety} ${b02SafetyAddendum[language].bio}`;
  return baseSafety;
}

export const rolloutB02LocalizedToolData: LocalizedToolContent[] = tools.flatMap((tool) =>
  languages.map((language) => {
    const profile = profiles[language];
    const h1 = phrase(profile, tool);
    const primaryKeyword = h1.toLowerCase();
    const safety = b02SafetyFor(tool, language);
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
