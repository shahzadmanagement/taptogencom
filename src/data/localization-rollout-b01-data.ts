import type { LocalizedLanguageCode, LocalizedToolContent } from './localization';

export type RolloutLanguage = LocalizedLanguageCode;
export type ToolKind = 'text' | 'name' | 'seo' | 'utility' | 'developer' | 'creative' | 'gaming' | 'business' | 'social' | 'bio' | 'writing' | 'random';

export interface RolloutToolSpec {
  canonicalToolId: string;
  label: string;
  slugBase: string;
  kind: ToolKind;
}

export interface LanguageProfile {
  generator: string;
  converter: string;
  formatter: string;
  free: string;
  slugPrefix: string;
  joiner: string;
  intro: string;
  intent: string;
  review: string;
  faqTopics: string[];
}

export const languages: RolloutLanguage[] = ['es', 'fr', 'de', 'pt', 'it', 'pl', 'ru', 'tr', 'id', 'sv', 'ms', 'bg', 'hi', 'bn', 'ja', 'ko', 'ar'];

export const profiles: Record<RolloutLanguage, LanguageProfile> = {
  es: { generator: 'Generador de', converter: 'Convertidor de', formatter: 'Formateador de', free: 'gratis', slugPrefix: 'generador', joiner: 'de', intro: 'Crea borradores claros en español y revisa cada resultado antes de usarlo.', intent: 'Consulta local de utilidad con la misma intencion que la herramienta en ingles.', review: 'Revisa exactitud, originalidad, compatibilidad y reglas del proyecto antes de publicar.', faqTopics: ['ideas utiles', 'copiar resultado', 'revisar antes de usar'] },
  fr: { generator: 'Generateur de', converter: 'Convertisseur de', formatter: 'Formateur de', free: 'gratuit', slugPrefix: 'générateur', joiner: 'de', intro: 'Creez des brouillons clairs en français et verifiez chaque resultat avant usage.', intent: 'Intention locale alignee avec la page anglaise.', review: 'Verifiez exactitude, originalite, compatibilite et regles du projet avant publication.', faqTopics: ['idées utiles', 'copier le resultat', 'verifier avant usage'] },
  de: { generator: 'Generator fuer', converter: 'Konverter fuer', formatter: 'Formatter fuer', free: 'kostenlos', slugPrefix: 'generator', joiner: 'fuer', intro: 'Erstelle klare Entwuerfe auf Deutsch und pruefe jedes Ergebnis vor der Nutzung.', intent: 'Lokale Suchabsicht entspricht der englischen Werkzeugseite.', review: 'Pruefe Genauigkeit, Originalitaet, Kompatibilitaet und Projektregeln vor der Veroeffentlichung.', faqTopics: ['nuetzliche ideen', 'ergebnis kopieren', 'vor nutzung pruefen'] },
  pt: { generator: 'Gerador de', converter: 'Conversor de', formatter: 'Formatador de', free: 'gratis', slugPrefix: 'gerador', joiner: 'de', intro: 'Crie rascunhos claros em português e revise cada resultado antes de usar.', intent: 'Intencao local alinhada com a ferramenta em ingles.', review: 'Revise precisao, originalidade, compatibilidade e regras do projeto antes de publicar.', faqTopics: ['ideias uteis', 'copiar resultado', 'revisar antes de usar'] },
  it: { generator: 'Generatore di', converter: 'Convertitore di', formatter: 'Formattatore di', free: 'gratis', slugPrefix: 'generatore', joiner: 'di', intro: 'Crea bozze chiare in italiano e controlla ogni risultato prima di usarlo.', intent: 'Intento locale coerente con la pagina inglese.', review: 'Controlla accuratezza, originalita, compatibilita e regole del progetto prima della pubblicazione.', faqTopics: ['idee utili', 'copiare risultato', 'controllare prima dell uso'] },
  pl: { generator: 'Generator', converter: 'Konwerter', formatter: 'Formater', free: 'za darmo', slugPrefix: 'generator', joiner: '', intro: 'Tworz jasne wersje robocze po polsku i sprawdzaj wynik przed uzyciem.', intent: 'Lokalna intencja zgodna z narzedziem angielskim.', review: 'Sprawdz dokladnosc, oryginalnosc, zgodnosc i zasady projektu przed publikacja.', faqTopics: ['przydatne pomysly', 'kopiowanie wyniku', 'sprawdzenie przed uzyciem'] },
  ru: { generator: 'Generator', converter: 'Konverter', formatter: 'Formatter', free: 'besplatno', slugPrefix: 'generator', joiner: '', intro: 'Sozdavaite ponyatnye chernoviki na russkom i proveriaite rezultat pered ispolzovaniem.', intent: 'Lokalnyi zapros sootvetstvuet anglijskoj stranitse instrumenta.', review: 'Proverte tochnost, originalnost, sovmestimost i pravila proekta pered publikatsiei.', faqTopics: ['poleznye idei', 'skopirovat rezultat', 'proverit pered ispolzovaniem'] },
  tr: { generator: 'Olusturucu', converter: 'Donusturucu', formatter: 'Bicimlendirici', free: 'ucretsiz', slugPrefix: 'olusturucu', joiner: '', intro: 'Turkce net taslaklar olusturun ve kullanmadan once sonucu kontrol edin.', intent: 'Yerel arama niyeti Ingilizce aracla ayni amaca hizmet eder.', review: 'Yayinlamadan once dogruluk, ozgunluk, uyumluluk ve proje kurallarini kontrol edin.', faqTopics: ['yararli fikirler', 'sonucu kopyalama', 'kullanmadan once kontrol'] },
  id: { generator: 'Generator', converter: 'Konverter', formatter: 'Formatter', free: 'gratis', slugPrefix: 'generator', joiner: '', intro: 'Buat draf yang jelas dalam bahasa Indonesia dan tinjau hasil sebelum digunakan.', intent: 'Niat lokal selaras dengan halaman alat berbahasa Inggris.', review: 'Periksa akurasi, orisinalitas, kompatibilitas, dan aturan proyek sebelum menerbitkan.', faqTopics: ['ide berguna', 'salin hasil', 'tinjau sebelum dipakai'] },
  sv: { generator: 'Generator for', converter: 'Konverter for', formatter: 'Formatterare for', free: 'gratis', slugPrefix: 'generator', joiner: 'for', intro: 'Skapa tydliga utkast pa svenska och granska resultatet innan du anvander det.', intent: 'Lokal sokintention matchar det engelska verktygets syfte.', review: 'Kontrollera noggrannhet, originalitet, kompatibilitet och projektregler fore publicering.', faqTopics: ['anvandbara ideer', 'kopiera resultat', 'granska fore anvandning'] },
  ms: { generator: 'Penjana', converter: 'Penukar', formatter: 'Pemformat', free: 'percuma', slugPrefix: 'penjana', joiner: '', intro: 'Cipta draf jelas dalam Bahasa Melayu dan semak hasil sebelum digunakan.', intent: 'Niat tempatan selari dengan halaman alat bahasa Inggeris.', review: 'Semak ketepatan, keaslian, keserasian dan peraturan projek sebelum diterbitkan.', faqTopics: ['idea berguna', 'salin hasil', 'semak sebelum guna'] },
  bg: { generator: 'Generator za', converter: 'Konvertor za', formatter: 'Formatter za', free: 'bezplatno', slugPrefix: 'generator', joiner: 'za', intro: 'Sazdavaite yasni cherнови na balgarski i proveriavaite rezultata predi upotreba.', intent: 'Lokalnoto tarsene savpada s namerenieto na angliiskiya instrument.', review: 'Proverete tochnost, originalnost, savmestimost i pravilata na proekta predi publikuvane.', faqTopics: ['polezni idei', 'kopirane na rezultat', 'proverka predi upotreba'] },
  hi: { generator: 'जनरेटर', converter: 'कन्वर्टर', formatter: 'फॉर्मैटर', free: 'मुफ्त', slugPrefix: 'generator', joiner: '', intro: 'हिंदी में साफ ड्राफ्ट बनाएं और उपयोग से पहले हर परिणाम की समीक्षा करें.', intent: 'स्थानीय खोज इरादा अंग्रेजी टूल के उद्देश्य से मेल खाता है.', review: 'प्रकाशन से पहले सटीकता, मौलिकता, संगतता और प्रोजेक्ट नियम जांचें.', faqTopics: ['उपयोगी आइडिया', 'परिणाम कॉपी', 'उपयोग से पहले समीक्षा'] },
  bn: { generator: 'জেনারেটর', converter: 'কনভার্টার', formatter: 'ফরম্যাটার', free: 'ফ্রি', slugPrefix: 'generator', joiner: '', intro: 'বাংলায় পরিষ্কার খসড়া তৈরি করুন এবং ব্যবহারের আগে ফলাফল পর্যালোচনা করুন.', intent: 'স্থানীয় সার্চ ইন্টেন্ট ইংরেজি টুলের উদ্দেশ্যের সঙ্গে মেলে.', review: 'প্রকাশের আগে নির্ভুলতা, মৌলিকতা, সামঞ্জস্য এবং প্রকল্পের নিয়ম যাচাই করুন.', faqTopics: ['উপকারী আইডিয়া', 'ফলাফল কপি', 'ব্যবহারের আগে যাচাই'] },
  ja: { generator: 'ジェネレーター', converter: 'コンバーター', formatter: 'フォーマッター', free: '無料', slugPrefix: 'generator', joiner: '', intro: '日本語でわかりやすい下書きを作り、使う前に結果を確認します.', intent: '英語版ツールと同じ目的のローカル検索意図です.', review: '公開前に正確性、独自性、互換性、プロジェクト規則を確認してください.', faqTopics: ['便利なアイデア', '結果をコピー', '使用前に確認'] },
  ko: { generator: '생성기', converter: '변환기', formatter: '포매터', free: '무료', slugPrefix: 'generator', joiner: '', intro: '한국어로 명확한 초안을 만들고 사용 전에 결과를 검토하세요.', intent: '영어 도구와 같은 목적의 현지 검색 의도입니다.', review: '게시 전에 정확성, 독창성, 호환성, 프로젝트 규칙을 확인하세요.', faqTopics: ['유용한 아이디어', '결과 복사', '사용 전 검토'] },
  ar: { generator: 'مولد', converter: 'محول', formatter: 'منسق', free: 'مجانا', slugPrefix: 'muwallid', joiner: '', intro: 'أنشئ مسودات عربية واضحة وراجع كل نتيجة قبل استخدامها.', intent: 'نية البحث المحلية تطابق غرض الأداة الإنجليزية.', review: 'راجع الدقة والأصالة والتوافق وقواعد المشروع قبل النشر.', faqTopics: ['أفكار مفيدة', 'نسخ النتيجة', 'مراجعة قبل الاستخدام'] },
};

const tools: RolloutToolSpec[] = [
  { canonicalToolId: 'glitch-text-generator', label: 'Glitch Text', slugBase: 'glitch-text', kind: 'text' },
  { canonicalToolId: 'lorem-ipsum-generator', label: 'Lorem Ipsum', slugBase: 'lorem-ipsum', kind: 'utility' },
  { canonicalToolId: 'uuid-generator', label: 'UUID', slugBase: 'uuid', kind: 'developer' },
  { canonicalToolId: 'random-number-generator', label: 'Random Number', slugBase: 'random-number', kind: 'utility' },
  { canonicalToolId: 'strikethrough-text-generator', label: 'Strikethrough Text', slugBase: 'strikethrough-text', kind: 'text' },
  { canonicalToolId: 'underline-text-generator', label: 'Underline Text', slugBase: 'underline-text', kind: 'text' },
  { canonicalToolId: 'vaporwave-text-generator', label: 'Vaporwave Text', slugBase: 'vaporwave-text', kind: 'text' },
  { canonicalToolId: 'unicode-text-generator', label: 'Unicode Text', slugBase: 'unicode-text', kind: 'text' },
  { canonicalToolId: 'discord-name-generator', label: 'Discord Name', slugBase: 'discord-name', kind: 'name' },
  { canonicalToolId: 'clan-name-generator', label: 'Clan Name', slugBase: 'clan-name', kind: 'gaming' },
  { canonicalToolId: 'band-name-generator', label: 'Band Name', slugBase: 'band-name', kind: 'creative' },
  { canonicalToolId: 'superhero-name-generator', label: 'Superhero Name', slugBase: 'superhero-name', kind: 'creative' },
  { canonicalToolId: 'rap-name-generator', label: 'Rap Name', slugBase: 'rap-name', kind: 'creative' },
  { canonicalToolId: 'song-name-generator', label: 'Song Name', slugBase: 'song-name', kind: 'creative' },
  { canonicalToolId: 'pirate-name-generator', label: 'Pirate Name', slugBase: 'pirate-name', kind: 'gaming' },
  { canonicalToolId: 'medieval-name-generator', label: 'Medieval Name', slugBase: 'medieval-name', kind: 'gaming' },
  { canonicalToolId: 'hreflang-tag-generator', label: 'Hreflang Tag', slugBase: 'hreflang-tag', kind: 'seo' },
  { canonicalToolId: 'schema-tag-generator', label: 'Schema Markup', slugBase: 'schema-markup', kind: 'seo' },
  { canonicalToolId: 'slug-generator', label: 'URL Slug', slugBase: 'url-slug', kind: 'developer' },
  { canonicalToolId: 'hash-generator', label: 'Hash', slugBase: 'hash', kind: 'developer' },
  { canonicalToolId: 'json-formatter', label: 'JSON', slugBase: 'json', kind: 'developer' },
  { canonicalToolId: 'coin-flip', label: 'Coin Flip', slugBase: 'coin-flip', kind: 'utility' },
  { canonicalToolId: 'dice-roller', label: 'Dice Roller', slugBase: 'dice-roller', kind: 'utility' },
  { canonicalToolId: 'color-palette-generator', label: 'Color Palette', slugBase: 'color-palette', kind: 'developer' },
  { canonicalToolId: 'town-name-generator', label: 'Town Name', slugBase: 'town-name', kind: 'gaming' },
  { canonicalToolId: 'kingdom-name-generator', label: 'Kingdom Name', slugBase: 'kingdom-name', kind: 'gaming' },
  { canonicalToolId: 'dragon-name-generator', label: 'Dragon Name', slugBase: 'dragon-name', kind: 'gaming' },
  { canonicalToolId: 'wolf-name-generator', label: 'Wolf Name', slugBase: 'wolf-name', kind: 'gaming' },
  { canonicalToolId: 'demon-name-generator', label: 'Demon Name', slugBase: 'demon-name', kind: 'gaming' },
  { canonicalToolId: 'elf-name-generator', label: 'Elf Name', slugBase: 'elf-name', kind: 'gaming' },
  { canonicalToolId: 'nickname-generator', label: 'Nickname', slugBase: 'nickname', kind: 'name' },
  { canonicalToolId: 'etsy-tag-generator', label: 'Marketplace Tag', slugBase: 'marketplace-tag', kind: 'seo' },
  { canonicalToolId: 'text-to-binary-generator', label: 'Text to Binary', slugBase: 'text-to-binary', kind: 'developer' },
  { canonicalToolId: 'morse-code-generator', label: 'Morse Code', slugBase: 'morse-code', kind: 'developer' },
  { canonicalToolId: 'anime-name-generator', label: 'Anime Style Name', slugBase: 'anime-style-name', kind: 'creative' },
  { canonicalToolId: 'qr-code-text-generator', label: 'QR Code Text', slugBase: 'qr-code-text', kind: 'utility' },
  { canonicalToolId: 'dnd-name-generator', label: 'Tabletop RPG Name', slugBase: 'tabletop-rpg-name', kind: 'gaming' },
  { canonicalToolId: 'orc-name-generator', label: 'Orc Name', slugBase: 'orc-name', kind: 'gaming' },
  { canonicalToolId: 'witch-name-generator', label: 'Witch Name', slugBase: 'witch-name', kind: 'gaming' },
  { canonicalToolId: 'alien-name-generator', label: 'Alien Name', slugBase: 'alien-name', kind: 'gaming' },
  { canonicalToolId: 'vampire-name-generator', label: 'Vampire Name', slugBase: 'vampire-name', kind: 'gaming' },
  { canonicalToolId: 'fairy-name-generator', label: 'Fairy Name', slugBase: 'fairy-name', kind: 'gaming' },
  { canonicalToolId: 'goblin-name-generator', label: 'Goblin Name', slugBase: 'goblin-name', kind: 'gaming' },
];

export function phrase(profile: LanguageProfile, tool: RolloutToolSpec): string {
  const lead = tool.canonicalToolId === 'json-formatter'
    ? profile.formatter
    : tool.canonicalToolId === 'text-to-binary-generator' || tool.canonicalToolId === 'morse-code-generator'
      ? profile.converter
      : profile.generator;
  if (profile.joiner) return `${lead} ${tool.label}`;
  return ['hi', 'bn', 'ja', 'ko'].some((code) => profiles[code as RolloutLanguage] === profile)
    ? `${tool.label} ${lead}`
    : `${lead} ${tool.label}`;
}

export function slugFor(language: RolloutLanguage, tool: RolloutToolSpec): string {
  return `${profiles[language].slugPrefix}-${tool.slugBase}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function safetyFor(tool: RolloutToolSpec, profile: LanguageProfile): string {
  const language = Object.entries(profiles).find(([, candidate]) => candidate === profile)?.[0] as RolloutLanguage;
  const localizedSafety: Record<RolloutLanguage, Record<'seo' | 'developer' | 'name' | 'text', string>> = {
    es: {
      seo: 'No garantiza trafico, rankings, indexacion ni resultados de plataforma.',
      developer: 'No uses salidas tecnicas como credenciales, secretos de seguridad ni cambios de produccion sin revision manual.',
      name: 'Comprueba originalidad, sensibilidad, derechos y disponibilidad antes de usarlo en publico.',
      text: 'Comprueba legibilidad, accesibilidad y compatibilidad de plataforma antes de compartir texto estilizado.',
    },
    fr: {
      seo: 'Aucun trafic, classement, indexation ni resultat de plateforme nest garanti.',
      developer: 'Nutilisez pas les sorties techniques comme identifiants, secrets de securite ou changements de production sans revue manuelle.',
      name: 'Verifiez originalite, sensibilite, droits et disponibilité avant un usage public.',
      text: 'Verifiez lisibilite, accessibilite et compatibilite de plateforme avant de partager un texte stylise.',
    },
    de: {
      seo: 'Traffic, Rankings, Indexierung oder Plattform-Ergebnisse werden nicht garantiert.',
      developer: 'Nutze technische Ausgaben nicht als Zugangsdaten, Sicherheitsgeheimnisse oder Produktionsaenderungen ohne manuelle Pruefung.',
      name: 'Pruefe Originalitaet, Sensibilitaet, Rechte und Verfuegbarkeit vor oeffentlicher Nutzung.',
      text: 'Pruefe Lesbarkeit, Barrierefreiheit und Plattform-Kompatibilitaet vor dem Teilen gestalteter Texte.',
    },
    pt: {
      seo: 'Nao ha garantia de trafego, rankings, indexacao ou resultados em plataformas.',
      developer: 'Nao use saidas tecnicas como credenciais, segredos de seguranca ou mudancas de producao sem revisao manual.',
      name: 'Verifique originalidade, sensibilidade, direitos e disponibilidade antes do uso publico.',
      text: 'Verifique legibilidade, acessibilidade e compatibilidade de plataforma antes de compartilhar texto estilizado.',
    },
    it: {
      seo: 'Non garantisce traffico, ranking, indicizzazione o risultati di piattaforma.',
      developer: 'Non usare output tecnici come credenziali, segreti di sicurezza o modifiche di produzione senza revisione manuale.',
      name: 'Controlla originalita, sensibilita, diritti e disponibilita prima delluso pubblico.',
      text: 'Controlla leggibilita, accessibilita e compatibilita della piattaforma prima di condividere testo stilizzato.',
    },
    pl: {
      seo: 'Nie gwarantuje ruchu, pozycji, indeksowania ani wynikow platformy.',
      developer: 'Nie uzywaj wynikow technicznych jako danych dostepowych, sekretow bezpieczenstwa ani zmian produkcyjnych bez recznego sprawdzenia.',
      name: 'Sprawdz oryginalnosc, wrazliwosc, prawa i dostepnosc przed publicznym uzyciem.',
      text: 'Sprawdz czytelnosc, dostepnosc i zgodnosc z platforma przed udostepnieniem stylizowanego tekstu.',
    },
    ru: {
      seo: 'Trafik, pozitsii, indeksatsiya i rezultaty platform ne garantiruyutsya.',
      developer: 'Ne ispolzuyte tekhnicheskie rezultaty kak uchetnye dannye, sekrety bezopasnosti ili produktsionnye izmeneniya bez ruchnoi proverki.',
      name: 'Proverte originalnost, delikatnost, prava i dostupnost pered publichnym ispolzovaniem.',
      text: 'Proverte chitaemost, dostupnost i sovmestimost platformy pered publikatsiei stilizovannogo teksta.',
    },
    tr: {
      seo: 'Trafik, siralama, indeksleme veya platform sonucu garanti edilmez.',
      developer: 'Teknik ciktilari kimlik bilgisi, guvenlik sirri veya uretim degisikligi olarak manuel kontrol olmadan kullanmayin.',
      name: 'Halka acik kullanimdan once ozgunluk, hassasiyet, haklar ve uygunlugu kontrol edin.',
      text: 'Sekilli metni paylasmadan once okunabilirlik, erisilebilirlik ve platform uyumlulugunu kontrol edin.',
    },
    id: {
      seo: 'Tidak menjamin trafik, peringkat, pengindeksan, atau hasil platform.',
      developer: 'Jangan gunakan output teknis sebagai kredensial, rahasia keamanan, atau perubahan produksi tanpa tinjauan manual.',
      name: 'Periksa orisinalitas, sensitivitas, hak, dan ketersediaan sebelum dipakai publik.',
      text: 'Periksa keterbacaan, aksesibilitas, dan kompatibilitas platform sebelum membagikan teks bergaya.',
    },
    sv: {
      seo: 'Trafik, rankning, indexering eller plattformsresultat garanteras inte.',
      developer: 'Anvand inte tekniska resultat som inloggningsuppgifter, sakerhetshemligheter eller produktionsandringar utan manuell granskning.',
      name: 'Kontrollera originalitet, kanslighet, rattigheter och tillganglighet fore offentlig anvandning.',
      text: 'Kontrollera lasbarhet, tillganglighet och plattformskompatibilitet innan du delar stylad text.',
    },
    ms: {
      seo: 'Tiada jaminan trafik, kedudukan, pengindeksan atau hasil platform.',
      developer: 'Jangan guna output teknikal sebagai kelayakan, rahsia keselamatan atau perubahan produksi tanpa semakan manual.',
      name: 'Semak keaslian, sensitiviti, hak dan ketersediaan sebelum penggunaan awam.',
      text: 'Semak kebolehbacaan, aksesibiliti dan keserasian platform sebelum berkongsi teks bergaya.',
    },
    bg: {
      seo: 'Trafik, klasirane, indeksirane ili rezultati v platformi ne se garantirat.',
      developer: 'Ne izpolzvaite tehnicheski rezultati kato dostap, sekreti za sigurnost ili produktsionni promeni bez rachna proverka.',
      name: 'Proverete originalnost, chuvstvitelnost, prava i dostupnost predi publichna upotreba.',
      text: 'Proverete chetimost, dostapnost i savmestimost s platformata predi spodelyane na stiliziran tekst.',
    },
    hi: {
      seo: 'Traffic, ranking, indexing ya platform result ki guarantee nahi hai.',
      developer: 'Technical output ko credentials, security secrets ya production changes ke liye manual review ke bina use na karein.',
      name: 'Public use se pehle originality, sensitivity, rights aur availability check karein.',
      text: 'Styled text share karne se pehle readability, accessibility aur platform compatibility check karein.',
    },
    bn: {
      seo: 'Traffic, ranking, indexing ba platform result er guarantee nei.',
      developer: 'Manual review chara technical output ke credential, security secret ba production change hishebe use korben na.',
      name: 'Public use er age originality, sensitivity, rights ebong availability check korun.',
      text: 'Styled text share korar age readability, accessibility ebong platform compatibility check korun.',
    },
    ja: {
      seo: 'Traffic, ranking, indexing, platform result wa hoshou shimasen.',
      developer: 'Technical output wa manual review nashi de credential, security secret, production change ni tsukawanai de kudasai.',
      name: 'Koukai riyou mae ni originality, hairyo, rights, availability wo kakunin shite kudasai.',
      text: 'Styled text wo share suru mae ni yomiyasusa, accessibility, platform compatibility wo kakunin shite kudasai.',
    },
    ko: {
      seo: 'Traffic, ranking, indexing, platform result neun bojanghaji 않습니다.',
      developer: 'Technical output eun manual review eopsi credential, security secret, production change ro sayonghaji maseyo.',
      name: 'Public use jeone originality, sensitivity, rights, availability reul hwaginhaseyo.',
      text: 'Styled text gongyu jeone readability, accessibility, platform compatibility reul hwaginhaseyo.',
    },
    ar: {
      seo: 'La yadmane alziyarat aw altartib aw alfahrasah aw nataij almanassat.',
      developer: 'La tastakhdim almukhrijat altaqniyah ka-bayanat itimad aw asrar aman aw taghyirat intaj duna murajaah yadawiyah.',
      name: 'Tahaqqaq min alasalah walhusasiyah walhuquq waltawafur qabla alistikhdam alam.',
      text: 'Tahaqqaq min suhulat alqiraah waimkaniyat alwusul watawafuq almanassah qabla musharakat alnass almuzakhraf.',
    },
  };
  if (tool.kind === 'seo') return `${profile.review} ${localizedSafety[language].seo}`;
  if (tool.kind === 'developer') return `${profile.review} ${localizedSafety[language].developer}`;
  if (tool.kind === 'name' || tool.kind === 'creative' || tool.kind === 'gaming' || tool.kind === 'business' || tool.kind === 'social' || tool.kind === 'bio' || tool.kind === 'writing') return `${profile.review} ${localizedSafety[language].name}`;
  if (tool.kind === 'text') return `${profile.review} ${localizedSafety[language].text}`;
  return profile.review;
}

export const rolloutB01LocalizedToolData: LocalizedToolContent[] = tools.flatMap((tool) =>
  languages.map((language) => {
    const profile = profiles[language];
    const h1 = phrase(profile, tool);
    const primaryKeyword = h1.toLowerCase();
    return {
      canonicalToolId: tool.canonicalToolId,
      language,
      primaryKeyword,
      localizedSlug: slugFor(language, tool),
      h1,
      metaTitle: `${h1} ${profile.free}`,
      metaDescription: `${profile.intro} ${safetyFor(tool, profile)}`.slice(0, 220),
      intro: profile.intro,
      faqTopics: profile.faqTopics,
      searchIntentNote: profile.intent,
      riskSafetyNote: safetyFor(tool, profile),
    };
  }),
);
