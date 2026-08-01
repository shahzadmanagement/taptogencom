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
  { canonicalToolId: 'character-backstory-generator', label: 'Trasfondo de Personajes', slugBase: 'trasfondo-de-personajes', kind: 'creative' },
  { canonicalToolId: 'worldbuilding-generator', label: 'Worldbuilding', slugBase: 'worldbuilding', kind: 'creative' },
  { canonicalToolId: 'quiz-generator', label: 'Preguntas de Cuestionarios', slugBase: 'preguntas-de-cuestionarios', kind: 'writing' },
  { canonicalToolId: 'thesis-statement-generator', label: 'Thesis Statement', slugBase: 'thesis-statement', kind: 'writing' },
  { canonicalToolId: 'landing-page-copy-generator', label: 'Textos para Páginas de Aterrizaje', slugBase: 'textos-para-paginas-de-aterrizaje', kind: 'business' },
  { canonicalToolId: 'json-schema-generator', label: 'JSON Schema', slugBase: 'json-schema', kind: 'developer' },
  { canonicalToolId: 'typescript-type-generator', label: 'TypeScript Type', slugBase: 'typescript-type', kind: 'developer' },
  { canonicalToolId: 'sql-query-generator', label: 'SQL Query', slugBase: 'sql-query', kind: 'developer' },
  { canonicalToolId: 'htaccess-generator', label: 'Htaccess', slugBase: 'htaccess', kind: 'developer' },
  { canonicalToolId: 'pwa-manifest-generator', label: 'PWA Manifest', slugBase: 'pwa-manifest', kind: 'developer' },
  { canonicalToolId: 'form-generator', label: 'HTML Form', slugBase: 'html-form', kind: 'developer' },
  { canonicalToolId: 'random-id-generator', label: 'Identificadores Aleatorios', slugBase: 'identificadores-aleatorios', kind: 'developer' },
  { canonicalToolId: 'flashcard-generator', label: 'Flashcard', slugBase: 'flashcard', kind: 'writing' },
  { canonicalToolId: 'study-plan-generator', label: 'Study Plan', slugBase: 'study-plan', kind: 'writing' },
  { canonicalToolId: 'lesson-plan-generator', label: 'Lesson Plan', slugBase: 'lesson-plan', kind: 'writing' },
  { canonicalToolId: 'research-question-generator', label: 'Preguntas de Investigación', slugBase: 'preguntas-de-investigacion', kind: 'writing' },
  { canonicalToolId: 'bibliography-generator', label: 'Bibliography', slugBase: 'bibliography', kind: 'writing' },
  { canonicalToolId: 'essay-topic-generator', label: 'Essay Topic', slugBase: 'essay-topic', kind: 'writing' },
  { canonicalToolId: 'multiple-choice-generator', label: 'Preguntas de Opción Múltiple', slugBase: 'opcion-multiple', kind: 'writing' },
  { canonicalToolId: 'product-bullet-points-generator', label: 'Puntos Clave del Producto', slugBase: 'puntos-clave-del-producto', kind: 'business' },
  { canonicalToolId: 'customer-persona-generator', label: 'Perfil de Cliente Ideal', slugBase: 'perfil-de-cliente-ideal', kind: 'business' },
  { canonicalToolId: 'sales-email-generator', label: 'Correos de Ventas', slugBase: 'correos-de-ventas', kind: 'business' },
  { canonicalToolId: 'follow-up-email-generator', label: 'Correos de Seguimiento', slugBase: 'correos-de-seguimiento', kind: 'business' },
  { canonicalToolId: 'image-alt-text-generator', label: 'Image Alt Text', slugBase: 'image-alt-text', kind: 'seo' },
  { canonicalToolId: 'video-prompt-generator', label: 'Prompts de Video', slugBase: 'prompts-de-video', kind: 'creative' },
  { canonicalToolId: 'productivity-prompt-generator', label: 'Prompts de Productividad', slugBase: 'prompts-de-productividad', kind: 'writing' },
  { canonicalToolId: 'random-list-generator', label: 'Listas Aleatorias', slugBase: 'listas-aleatorias', kind: 'random' },
  { canonicalToolId: 'random-color-generator', label: 'Colores Aleatorios', slugBase: 'colores-aleatorios', kind: 'random' },
  { canonicalToolId: 'dnd-character-generator', label: 'Personajes RPG de Mesa', slugBase: 'personajes-rpg-de-mesa', kind: 'gaming' },
  { canonicalToolId: 'dungeon-generator', label: 'Dungeon Map Idea', slugBase: 'dungeon-map-idea', kind: 'gaming' },
  { canonicalToolId: 'worksheet-generator', label: 'Worksheet', slugBase: 'worksheet', kind: 'writing' },
  { canonicalToolId: 'rubric-generator', label: 'Rubric', slugBase: 'rubric', kind: 'writing' },
  { canonicalToolId: 'assignment-generator', label: 'Assignment', slugBase: 'assignment', kind: 'writing' },
  { canonicalToolId: 'graphql-query-generator', label: 'GraphQL Query', slugBase: 'graphql-query', kind: 'developer' },
  { canonicalToolId: 'mock-api-generator', label: 'Mock API', slugBase: 'mock-api', kind: 'developer' },
  { canonicalToolId: 'wheel-spinner-generator', label: 'Wheel Spinner', slugBase: 'wheel-spinner', kind: 'random' },
  { canonicalToolId: 'product-benefits-generator', label: 'Beneficios del Producto', slugBase: 'beneficios-del-producto', kind: 'business' },
  { canonicalToolId: 'pattern-generator', label: 'CSS Pattern', slugBase: 'css-pattern', kind: 'developer' },
  { canonicalToolId: 'blob-generator', label: 'CSS Blob', slugBase: 'css-blob', kind: 'developer' },
  { canonicalToolId: 'wave-generator', label: 'CSS Wave', slugBase: 'css-wave', kind: 'developer' },
  { canonicalToolId: 'viking-name-generator', label: 'Viking Style Name', slugBase: 'viking-style-name', kind: 'gaming' },
  { canonicalToolId: 'wizard-name-generator', label: 'Wizard Name', slugBase: 'wizard-name', kind: 'gaming' },
];

export const rolloutB05ToolIds = tools.map((tool) => tool.canonicalToolId);

const b05SafetyAddendum: Record<RolloutLanguage, Record<'business' | 'writing' | 'random' | 'developer' | 'seo' | 'fictional', string>> = {
  es: {
    business: 'Confirma datos, permisos, precios, claims y tono de marca antes de publicarlo.',
    writing: 'Usalo como apoyo de redaccion; revisa fuentes, originalidad y reglas academicas o editoriales.',
    random: 'Tratalo como inspiracion o seleccion ligera, no como identidad, documento ni decision oficial.',
    developer: 'Prueba el codigo, valida entradas y revisa seguridad, accesibilidad y compatibilidad antes de produccion.',
    seo: 'No promete trafico, rankings, accesibilidad perfecta ni resultados en buscadores.',
    fictional: 'Mantenlo para ficcion, juegos o mundos propios y evita copiar universos protegidos.',
  },
  fr: {
    business: 'Vérifiez donnees, autorisations, prix, promesses et ton de marque avant publication.',
    writing: 'Utilisez-le comme aide de redaction; vérifiez sources, originalite et regles academiques ou editoriales.',
    random: 'Gardez-le comme inspiration ou choix leger, pas comme identite, document ni decision officielle.',
    developer: 'Testez le code, validez les entrees et vérifiez securite, accessibilite et compatibilite avant production.',
    seo: 'Ne promet pas trafic, classement, accessibilite parfaite ni resultats de recherche.',
    fictional: 'Reserve a la fiction, aux jeux ou mondes personnels, sans copier dunivers proteges.',
  },
  de: {
    business: 'Pruefe Daten, Freigaben, Preise, Aussagen und Markenton vor der Veroeffentlichung.',
    writing: 'Nutze es als Schreibhilfe; pruefe Quellen, Originalitaet und akademische oder redaktionelle Regeln.',
    random: 'Behandle es als Inspiration oder leichte Auswahl, nicht als Identitaet, Dokument oder offizielle Entscheidung.',
    developer: 'Teste Code, validiere Eingaben und pruefe Sicherheit, Barrierefreiheit und Kompatibilitaet vor Produktion.',
    seo: 'Verspricht keinen Traffic, keine Rankings, perfekte Barrierefreiheit oder Suchergebnisse.',
    fictional: 'Nur fuer Fiktion, Spiele oder eigene Welten nutzen und geschuetzte Universen nicht kopieren.',
  },
  pt: {
    business: 'Confirme dados, permissoes, precos, alegacoes e tom da marca antes de publicar.',
    writing: 'Use como apoio de escrita; revise fontes, originalidade e regras academicas ou editoriais.',
    random: 'Trate como inspiracao ou escolha leve, nao como identidade, documento ou decisao oficial.',
    developer: 'Teste o codigo, valide entradas e revise seguranca, acessibilidade e compatibilidade antes da producao.',
    seo: 'Nao promete trafego, rankings, acessibilidade perfeita ou resultados de busca.',
    fictional: 'Mantenha para ficcao, jogos ou mundos proprios e evite copiar universos protegidos.',
  },
  it: {
    business: 'Verifica dati, permessi, prezzi, affermazioni e tono del brand prima di pubblicare.',
    writing: 'Usalo come supporto alla scrittura; controlla fonti, originalita e regole accademiche o editoriali.',
    random: 'Consideralo ispirazione o scelta leggera, non identita, documento o decisione ufficiale.',
    developer: 'Testa il codice, valida gli input e controlla sicurezza, accessibilita e compatibilita prima della produzione.',
    seo: 'Non promette traffico, ranking, accessibilita perfetta o risultati di ricerca.',
    fictional: 'Usalo per fiction, giochi o mondi propri senza copiare universi protetti.',
  },
  pl: {
    business: 'Sprawdz dane, zgody, ceny, obietnice i ton marki przed publikacja.',
    writing: 'Uzywaj jako wsparcia pisania; sprawdź zrodla, oryginalnosc oraz zasady akademickie lub redakcyjne.',
    random: 'Traktuj jako inspiracje lub lekki wybór, nie jako tozsamosc, dokument ani oficjalna decyzje.',
    developer: 'Testuj kod, waliduj dane wejsciowe i sprawdź bezpieczenstwo, dostępność oraz zgodnosc przed produkcja.',
    seo: 'Nie obiecuje ruchu, pozycji, idealnej dostępnośći ani wynikow wyszukiwania.',
    fictional: 'Uzywaj do fikcji, gier lub wlasnych swiatow i nie kopiuj chronionych uniwersow.',
  },
  ru: {
    business: 'Proverte dannye, razresheniya, ceny, zayavleniya i ton brenda pered publikatsiei.',
    writing: 'Ispolzuyte kak pomoshch v tekste; proveriaite istochniki, originalnost i uchebnye ili redaktsionnye pravila.',
    random: 'Schitaite eto vdohnoveniem ili legkim vyborom, a ne lichnostyu, dokumentom ili ofitsialnym resheniem.',
    developer: 'Testiruite kod, proveriaite vvody, bezopasnost, dostupnost i sovmestimost pered produktsiei.',
    seo: 'Ne obeshchaet trafik, pozitsii, idealnuyu dostupnost ili poiskovye rezultaty.',
    fictional: 'Ispolzuyte dlya fiktsii, igr ili sobstvennyh mirov i ne kopiruite zashchishchennye vselennye.',
  },
  tr: {
    business: 'Yayinlamadan once verileri, izinleri, fiyatlari, iddialari ve marka tonunu kontrol edin.',
    writing: 'Yazim destegi olarak kullanin; kaynaklari, ozgunlugu ve akademik ya da editoryal kurallari inceleyin.',
    random: 'Bunu ilham veya hafif secim olarak gorun, kimlik, belge ya da resmi karar olarak kullanmayin.',
    developer: 'Kodu test edin, girdileri dogrulayin ve uretimden once guvenlik, erisilebilirlik ve uyumlulugu kontrol edin.',
    seo: 'Trafik, siralama, kusursuz erisilebilirlik veya arama sonucu vadetmez.',
    fictional: 'Kurgu, oyun veya kendi dunyalariniz icin kullanin; korunan evrenleri kopyalamayin.',
  },
  id: {
    business: 'Periksa data, izin, harga, klaim, dan nada merek sebelum diterbitkan.',
    writing: 'Gunakan sebagai bantuan menulis; tinjau sumber, orisinalitas, dan aturan akademik atau editorial.',
    random: 'Anggap sebagai inspirasi atau pilihan ringan, bukan identitas, dokumen, atau keputusan resmi.',
    developer: 'Uji kode, validasi input, dan cek keamanan, aksesibilitas, serta kompatibilitas sebelum produksi.',
    seo: 'Tidak menjanjikan trafik, peringkat, aksesibilitas sempurna, atau hasil pencarian.',
    fictional: 'Gunakan untuk fiksi, game, atau dunia sendiri dan jangan menyalin semesta terlindungi.',
  },
  sv: {
    business: 'Kontrollera data, tillstand, priser, pastaenden och varumarkeston fore publicering.',
    writing: 'Anvand som skrivstod; kontrollera kallor, originalitet och akademiska eller redaktionella regler.',
    random: 'Se det som inspiration eller enkelt val, inte identitet, dokument eller officiellt beslut.',
    developer: 'Testa kod, validera indata och granska sakerhet, tillganglighet och kompatibilitet fore produktion.',
    seo: 'Lovar inte trafik, rankning, perfekt tillganglighet eller sokresultat.',
    fictional: 'Anvand for fiktion, spel eller egna varldar och kopiera inte skyddade universum.',
  },
  ms: {
    business: 'Semak data, kebenaran, harga, dakwaan dan nada jenama sebelum diterbitkan.',
    writing: 'Guna sebagai bantuan penulisan; semak sumber, keaslian dan peraturan akademik atau editorial.',
    random: 'Anggap sebagai inspirasi atau pilihan ringan, bukan identiti, dokumen atau keputusan rasmi.',
    developer: 'Uji kod, sahkan input dan semak keselamatan, aksesibiliti serta keserasian sebelum produksi.',
    seo: 'Tidak menjanjikan trafik, kedudukan, aksesibiliti sempurna atau hasil carian.',
    fictional: 'Guna untuk fiksyen, permainan atau dunia sendiri dan jangan salin alam terlindung.',
  },
  bg: {
    business: 'Proverete danni, razresheniya, ceni, tvardenia i ton na markata predi publikuvane.',
    writing: 'Izpolzvaite kato pisatelna pomosht; proverete iztochnitsi, originalnost i akademichni ili redaktsionni pravila.',
    random: 'Priemete go kato vdahnoveniye ili lek izbor, ne kato identichnost, dokument ili ofitsialno reshenie.',
    developer: 'Testvaite koda, validiraite vhodovete i proverete sigurnost, dostapnost i savmestimost predi produktsiya.',
    seo: 'Ne obestava trafik, klasirane, perfektna dostapnost ili rezultati v tarsachki.',
    fictional: 'Izpolzvaite za fiktsiya, igri ili sobstveni svetove i ne kopiraite zashtiteni vseleni.',
  },
  hi: {
    business: 'Publish karne se pehle data, permissions, prices, claims aur brand tone check karein.',
    writing: 'Writing support ke roop me use karein; sources, originality aur academic ya editorial rules check karein.',
    random: 'Ise inspiration ya light choice samjhein, identity, document ya official decision nahi.',
    developer: 'Production se pehle code test karein, inputs validate karein aur security, accessibility, compatibility check karein.',
    seo: 'Traffic, ranking, perfect accessibility ya search result ki guarantee nahi deta.',
    fictional: 'Fiction, games ya apni worlds ke liye rakhein aur protected universes copy na karein.',
  },
  bn: {
    business: 'Publish korar age data, permissions, prices, claims ebong brand tone check korun.',
    writing: 'Writing support hishebe use korun; sources, originality ebong academic ba editorial rules check korun.',
    random: 'Eta inspiration ba light choice, identity, document ba official decision noy.',
    developer: 'Production er age code test, input validate, security, accessibility ebong compatibility check korun.',
    seo: 'Traffic, ranking, perfect accessibility ba search result er guarantee nei.',
    fictional: 'Fiction, games ba nijer worlds er jonno rakhun ebong protected universes copy korben na.',
  },
  ja: {
    business: 'Publish mae ni data, permissions, prices, claims, brand tone wo kakunin shite kudasai.',
    writing: 'Writing support to shite tsukai, sources, originality, academic ya editorial rules wo kakunin shite kudasai.',
    random: 'Inspiration ya light choice to shite atsukai, identity, document, official decision ni shinai de kudasai.',
    developer: 'Production mae ni code test, input validation, security, accessibility, compatibility wo kakunin shite kudasai.',
    seo: 'Traffic, ranking, perfect accessibility, search result wa hoshou shimasen.',
    fictional: 'Fiction, games, jibun no worlds ni tsukai, protected universes wo copy shinaide kudasai.',
  },
  ko: {
    business: 'Publish jeone data, permissions, prices, claims, brand tone reul hwaginhaseyo.',
    writing: 'Writing support ro sayonghago sources, originality, academic na editorial rules reul hwaginhaseyo.',
    random: 'Inspiration na light choice ro bogoseo identity, document, official decision e sayonghaji maseyo.',
    developer: 'Production jeone code test, input validation, security, accessibility, compatibility reul hwaginhaseyo.',
    seo: 'Traffic, ranking, perfect accessibility, search result neun bojanghaji anhseumnida.',
    fictional: 'Fiction, games, jasinui worlds yongdo ro sayonghago protected universes reul copy haji maseyo.',
  },
  ar: {
    business: 'Raji albayanat waladhun walasear walidieaat wanaghamat alalama qabla alnashr.',
    writing: 'Istakhdimha kamusaadah lilkitabah waraji almasadir walasalah waqawaeid aldirasah aw altahrir.',
    random: 'Itabirha ilhaman aw ikhtiyaran khafifan la hawiyah aw wathiqah aw qararan rasmiyan.',
    developer: 'Ikhtabir alkod wathabbit almudkhalat waraji alaman waimkaniyat alwusul waltawafuq qabla alintaj.',
    seo: 'La tadman alziyarat aw altartib aw wusulan mithaliyan aw nataij albahth.',
    fictional: 'Ijaliha lilkhayal aw alalab aw awalimak alkhasah wala tansakh awalim mahmiyah.',
  },
};

function b05SafetyFor(tool: RolloutToolSpec, language: RolloutLanguage): string {
  const baseSafety = safetyFor(tool, profiles[language]);
  if (tool.kind === 'business' || tool.kind === 'social' || tool.kind === 'bio') return `${baseSafety} ${b05SafetyAddendum[language].business}`;
  if (tool.kind === 'writing') return `${baseSafety} ${b05SafetyAddendum[language].writing}`;
  if (tool.kind === 'random' || tool.kind === 'utility') return `${baseSafety} ${b05SafetyAddendum[language].random}`;
  if (tool.kind === 'developer' || tool.kind === 'text') return `${baseSafety} ${b05SafetyAddendum[language].developer}`;
  if (tool.kind === 'seo') return `${baseSafety} ${b05SafetyAddendum[language].seo}`;
  if (tool.kind === 'creative' || tool.kind === 'gaming' || tool.kind === 'name') return `${baseSafety} ${b05SafetyAddendum[language].fictional}`;
  return baseSafety;
}

export const rolloutB05LocalizedToolData: LocalizedToolContent[] = tools.flatMap((tool) =>
  languages.map((language) => {
    const profile = profiles[language];
    const h1 = phrase(profile, tool);
    const primaryKeyword = h1.toLowerCase();
    const safety = b05SafetyFor(tool, language);
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
