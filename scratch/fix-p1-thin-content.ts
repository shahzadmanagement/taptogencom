import fs from 'fs';
import path from 'path';

const langNames: Record<string, string> = {
  es: 'spanish', fr: 'french', de: 'german', pt: 'portuguese', it: 'italian', pl: 'polish',
  ru: 'russian', tr: 'turkish', id: 'indonesian', sv: 'swedish', ms: 'malay', bg: 'bulgarian',
  hi: 'hindi', bn: 'bengali', nl: 'dutch', ja: 'japanese', ko: 'korean', ar: 'arabic'
};

const introEnrichments: Record<string, (h1: string, kw: string) => string> = {
  es: (h1, kw) => `Genera opciones claras e inspiradoras para ${kw}. Esta herramienta gratuita en línea le permite explorar borrador tras borrador con facilidad y seguridad antes de publicarlos en su proyecto.`,
  fr: (h1, kw) => `Générez des idées claires et inspirantes pour ${kw}. Cet outil gratuit en ligne vous permet d’explorer et d’adapter rapidement vos résultats avant de les publier.`,
  de: (h1, kw) => `Erstellen Sie präzise und ansprechende Entwürfe für ${kw}. Unser kostenloses Online-Werkzeug liefert sofort einsatzbereite Ideen für Ihr Projekt.`,
  pt: (h1, kw) => `Gere opções claras e criativas para ${kw}. Esta ferramenta gratuita online permite explorar e personalizar rascunhos com facilidade antes da publicação.`,
  it: (h1, kw) => `Genera opzioni chiare e creative per ${kw}. Questo strumento gratuito online ti consente di esplorare e personalizzare rapidamente ogni risultato.`,
  pl: (h1, kw) => `Twórz precyzyjne i kreatywne pomysły dla ${kw}. Nasze darmowe narzędzie online pozwala szybko generować i dopasowywać wyniki do Twojego projektu.`,
  ru: (h1, kw) => `Сгенерируйте точные и вдохновляющие варианты для ${kw}. Наш бесплатный онлайн инструмент помогает легко создавать и редактировать тексты для ваших проектов.`,
  tr: (h1, kw) => `${kw} için net ve yaratıcı fikirler oluşturun. Bu ücretsiz çevrimiçi araç, projeniz için en uygun seçenekleri anında incelemenizi ve uyarlamanızı sağlar.`,
  id: (h1, kw) => `Hasilkan pilihan yang jelas dan kreatif untuk ${kw}. Alat online gratis ini membantu Anda menjelajahi dan menyesuaikan draf dengan cepat sebelum digunakan.`,
  sv: (h1, kw) => `Skapa tydliga och kreativa idéer för ${kw}. Detta gratis onlineverktyg gör det enkelt att generera och anpassa utkast för dina projekt.`,
  ms: (h1, kw) => `Hasilkan idea yang jelas dan kreatif untuk ${kw}. Alat dalam talian percuma ini membolehkan anda meneroka dan menyesuaikan draf dengan mudah.`,
  bg: (h1, kw) => `Създайте ясни и вдъхновяващи идеи за ${kw}. Този безплатен онлайн инструмент ви позволява бързо да преглеждате и адаптирате вашите резултати.`,
  hi: (h1, kw) => `${kw} के लिए स्पष्ट और रचनात्मक विचार उत्पन्न करें। यह मुफ्त ऑनलाइन टूल आपको अपने प्रोजेक्ट के लिए तुरंत नए प्रारूप तैयार करने में मदद करता है।`,
  bn: (h1, kw) => `${kw} এর জন্য সঠিক এবং চমৎকার আইডিয়া তৈরি করুন। এই বিনামূল্যে অনলাইন টুল আপনাকে দ্রুত আপনার প্রজেক্টের জন্য উপযুক্ত কনটেন্ট রিভিউ করতে সাহায্য করবে।`,
  nl: (h1, kw) => `Genereer heldere en creatieve opties voor ${kw}. Deze gratis online tool helpt u snel concepten te maken en aan te passen voor uw project.`,
  ja: (h1, kw) => `${kw}のための明確でクリエイティブな案を生成します。この無料オンラインツールを使用すると、プロジェクトに合わせたドラフトを簡単に作成・確認できます。`,
  ko: (h1, kw) => `${kw}을(를) 위한 명확하고 창의적인 아이디어를 생성하세요. 이 무료 온라인 툴을 사용하면 프로젝트에 필요한 초안을 빠르게 검토하고 활용할 수 있습니다.`,
  ar: (h1, kw) => `أنشئ خيارات واضحة ومبتكرة لـ ${kw}. تتيح لك هذه الأداة المجانية عبر الإنترنت صياغة وتعديل مسوداتك بسهولة قبل اعتمادها في مشروعك.`
};

async function fixThinIntros() {
  let totalFixed = 0;

  for (const [code, langName] of Object.entries(langNames)) {
    const fileName = `localization-${langName}-data.ts`;
    const filePath = path.join(process.cwd(), 'src/data', fileName);
    if (!fs.existsSync(filePath)) continue;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const match = fileContent.match(/export const \w+: LocalizedToolContent\[\] = (\[[\s\S]*\]);/);
    if (!match) continue;

    const items: any[] = eval(match[1]);
    const enricher = introEnrichments[code];
    let fileFixed = 0;

    for (const item of items) {
      if (!item.intro || item.intro.length < 60) {
        const h1 = item.h1 || item.canonicalToolId;
        const kw = item.primaryKeyword || h1;
        item.intro = enricher(h1, kw);
        fileFixed++;
        totalFixed++;
      }
    }

    if (fileFixed > 0) {
      const exportVarName = `${langName}MasterToolData`;
      let aliases = '';
      if (code === 'fr') aliases = `\nexport const frenchOptimizedBatch1ToolData = frenchMasterToolData;\n`;
      if (code === 'es') aliases = `\nexport const spanishLocalizedToolData = spanishMasterToolData;\n`;

      const newContent = `import type { LocalizedToolContent } from './localization';\n\nexport const ${exportVarName}: LocalizedToolContent[] = ${JSON.stringify(items, null, 2)};\n${aliases}`;
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`Enriched ${fileFixed} thin intros in ${fileName}`);
    }
  }

  console.log(`TOTAL_THIN_INTROS_FIXED: ${totalFixed}`);
}

fixThinIntros().catch(console.error);
