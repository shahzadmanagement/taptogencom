import { siteConfig } from '@/config/site';
import { noindexToolSlugs } from '@/data/tool-page-data';
import { localizedPilotToolData } from '@/data/localization-pilot-data';
import type { Tool } from '@/data/tools';

export type SupportedLanguageCode = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'pl' | 'ru' | 'tr' | 'id' | 'sv' | 'ms' | 'bg' | 'hi' | 'bn' | 'ja' | 'ko' | 'ar';
export type LocalizedLanguageCode = Exclude<SupportedLanguageCode, 'en'>;

export interface SupportedLanguage {
  code: SupportedLanguageCode;
  label: string;
  nativeName: string;
  locale: string;
  dir: 'ltr' | 'rtl';
  slugStrategy: string;
  enabled: boolean;
  indexable: boolean;
  fallbackLang?: SupportedLanguageCode;
}

export interface LocalizedToolContent {
  canonicalToolId: string;
  language: LocalizedLanguageCode;
  primaryKeyword: string;
  localizedSlug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  faqTopics: string[];
  searchIntentNote: string;
  riskSafetyNote: string;
}

export interface LanguageAlternate {
  lang: SupportedLanguageCode | 'x-default';
  href: string;
}

export const supportedLanguages: SupportedLanguage[] = [
  {
    code: 'en',
    label: 'English',
    nativeName: 'English',
    locale: 'en',
    dir: 'ltr',
    slugStrategy: 'existing English slug',
    enabled: true,
    indexable: true,
  },
  {
    code: 'es',
    label: 'Spanish',
    nativeName: 'Español',
    locale: 'es',
    dir: 'ltr',
    slugStrategy: 'localized Latin keyword slug, ASCII-normalized',
    enabled: true,
    indexable: true,
    fallbackLang: 'en',
  },
  {
    code: 'fr',
    label: 'French',
    nativeName: 'Français',
    locale: 'fr',
    dir: 'ltr',
    slugStrategy: 'localized Latin keyword slug, ASCII-normalized',
    enabled: true,
    indexable: true,
    fallbackLang: 'en',
  },
  {
    code: 'de',
    label: 'German',
    nativeName: 'Deutsch',
    locale: 'de',
    dir: 'ltr',
    slugStrategy: 'localized Latin keyword slug, ASCII-normalized',
    enabled: true,
    indexable: true,
    fallbackLang: 'en',
  },
  {
    code: 'pt',
    label: 'Portuguese',
    nativeName: 'Português',
    locale: 'pt',
    dir: 'ltr',
    slugStrategy: 'localized Latin keyword slug, ASCII-normalized',
    enabled: true,
    indexable: true,
    fallbackLang: 'en',
  },
  {
    code: 'it',
    label: 'Italian',
    nativeName: 'Italiano',
    locale: 'it',
    dir: 'ltr',
    slugStrategy: 'localized Latin keyword slug, ASCII-normalized',
    enabled: true,
    indexable: true,
    fallbackLang: 'en',
  },
  {
    code: 'pl',
    label: 'Polish',
    nativeName: 'Polski',
    locale: 'pl',
    dir: 'ltr',
    slugStrategy: 'localized Latin keyword slug, ASCII-normalized',
    enabled: true,
    indexable: true,
    fallbackLang: 'en',
  },
  {
    code: 'ru',
    label: 'Russian',
    nativeName: 'Русский',
    locale: 'ru',
    dir: 'ltr',
    slugStrategy: 'transliterated localized keyword slug, ASCII-normalized',
    enabled: true,
    indexable: true,
    fallbackLang: 'en',
  },
  {
    code: 'tr',
    label: 'Turkish',
    nativeName: 'Türkçe',
    locale: 'tr',
    dir: 'ltr',
    slugStrategy: 'localized Latin keyword slug, ASCII-normalized',
    enabled: true,
    indexable: true,
    fallbackLang: 'en',
  },
  {
    code: 'id',
    label: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    locale: 'id',
    dir: 'ltr',
    slugStrategy: 'localized Latin keyword slug, ASCII-normalized',
    enabled: true,
    indexable: true,
    fallbackLang: 'en',
  },
  {
    code: 'sv',
    label: 'Swedish',
    nativeName: 'Svenska',
    locale: 'sv',
    dir: 'ltr',
    slugStrategy: 'localized Latin keyword slug, ASCII-normalized',
    enabled: true,
    indexable: true,
    fallbackLang: 'en',
  },
  {
    code: 'ms',
    label: 'Malay',
    nativeName: 'Bahasa Melayu',
    locale: 'ms',
    dir: 'ltr',
    slugStrategy: 'localized Latin keyword slug, ASCII-normalized',
    enabled: true,
    indexable: true,
    fallbackLang: 'en',
  },
  {
    code: 'bg',
    label: 'Bulgarian',
    nativeName: 'Български',
    locale: 'bg',
    dir: 'ltr',
    slugStrategy: 'transliterated localized keyword slug, ASCII-normalized',
    enabled: true,
    indexable: true,
    fallbackLang: 'en',
  },
  {
    code: 'hi',
    label: 'Hindi',
    nativeName: 'हिन्दी',
    locale: 'hi',
    dir: 'ltr',
    slugStrategy: 'transliterated localized keyword slug, ASCII-normalized',
    enabled: true,
    indexable: true,
    fallbackLang: 'en',
  },
  {
    code: 'bn',
    label: 'Bengali',
    nativeName: 'বাংলা',
    locale: 'bn',
    dir: 'ltr',
    slugStrategy: 'transliterated localized keyword slug, ASCII-normalized',
    enabled: true,
    indexable: true,
    fallbackLang: 'en',
  },
  {
    code: 'ja',
    label: 'Japanese',
    nativeName: '日本語',
    locale: 'ja',
    dir: 'ltr',
    slugStrategy: 'transliterated localized keyword slug, ASCII-normalized',
    enabled: true,
    indexable: true,
    fallbackLang: 'en',
  },
  {
    code: 'ko',
    label: 'Korean',
    nativeName: '한국어',
    locale: 'ko',
    dir: 'ltr',
    slugStrategy: 'transliterated localized keyword slug, ASCII-normalized',
    enabled: true,
    indexable: true,
    fallbackLang: 'en',
  },
  {
    code: 'ar',
    label: 'Arabic',
    nativeName: 'العربية',
    locale: 'ar',
    dir: 'rtl',
    slugStrategy: 'transliterated localized keyword slug, ASCII-normalized',
    enabled: true,
    indexable: true,
    fallbackLang: 'en',
  },
];

const legacySpanishPilotTools: LocalizedToolContent[] = [
  { canonicalToolId: 'name-generator', primaryKeyword: 'generador de nombres', localizedSlug: 'generador-de-nombres', h1: 'Generador de nombres', metaTitle: 'Generador de nombres gratis', metaDescription: 'Crea ideas de nombres claras para proyectos, personajes, marcas o listas personales con resultados faciles de revisar.', intro: 'Genera nombres en espanol con opciones amplias y revisa cada sugerencia antes de usarla en publico.', faqTopics: ['como elegir un nombre', 'nombres originales', 'revisar disponibilidad'], searchIntentNote: 'High same-intent utility query; Spanish users search directly for name ideas.', riskSafetyNote: 'Low risk; remind users to check trademarks and availability.', language: 'es' },
  { canonicalToolId: 'username-generator', primaryKeyword: 'generador de nombres de usuario', localizedSlug: 'generador-de-nombres-de-usuario', h1: 'Generador de nombres de usuario', metaTitle: 'Generador de nombres de usuario gratis', metaDescription: 'Encuentra ideas de usuario para perfiles, cuentas y proyectos sin prometer disponibilidad en plataformas.', intro: 'Crea nombres de usuario memorables y revisa si estan libres antes de registrarlos.', faqTopics: ['usuarios originales', 'usuario para redes', 'comprobar disponibilidad'], searchIntentNote: 'Local intent is account handle discovery, not identity claims.', riskSafetyNote: 'Avoid platform guarantees or impersonation angles.', language: 'es' },
  { canonicalToolId: 'business-name-generator', primaryKeyword: 'generador de nombres para empresas', localizedSlug: 'generador-de-nombres-para-empresas', h1: 'Generador de nombres para empresas', metaTitle: 'Generador de nombres para empresas gratis', metaDescription: 'Genera ideas de nombres comerciales para nuevos negocios, servicios y proyectos profesionales.', intro: 'Explora nombres de empresa y valida significado, dominio y registro antes de decidir.', faqTopics: ['nombre de empresa', 'ideas de negocio', 'comprobar marca'], searchIntentNote: 'Same-intent business naming query with commercial research intent.', riskSafetyNote: 'Legal/trademark review required before use.', language: 'es' },
  { canonicalToolId: 'fantasy-name-generator', primaryKeyword: 'generador de nombres de fantasia', localizedSlug: 'generador-de-nombres-de-fantasia', h1: 'Generador de nombres de fantasia', metaTitle: 'Generador de nombres de fantasia gratis', metaDescription: 'Crea nombres de fantasia para historias, juegos de rol y mundos imaginarios sin usar marcas existentes.', intro: 'Obten ideas originales para personajes, lugares o especies ficticias y ajustalas al tono de tu mundo.', faqTopics: ['nombres fantasticos', 'nombres para rol', 'nombres de mundos'], searchIntentNote: 'Strong creative-writing and RPG intent.', riskSafetyNote: 'Avoid protected franchise names and explicit IP references.', language: 'es' },
  { canonicalToolId: 'character-name-generator', primaryKeyword: 'generador de nombres para personajes', localizedSlug: 'generador-de-nombres-para-personajes', h1: 'Generador de nombres para personajes', metaTitle: 'Generador de nombres para personajes gratis', metaDescription: 'Encuentra nombres para personajes de historias, juegos, guiones y proyectos creativos.', intro: 'Genera ideas coherentes para personajes y adapta cada nombre al genero, epoca y tono.', faqTopics: ['nombres de personajes', 'personajes para historias', 'nombres para guion'], searchIntentNote: 'Intent is creative character naming rather than real identities.', riskSafetyNote: 'Avoid celebrity, impersonation, or protected character claims.', language: 'es' },
  { canonicalToolId: 'baby-name-generator', primaryKeyword: 'nombres de bebe', localizedSlug: 'nombres-de-bebe', h1: 'Generador de nombres de bebe', metaTitle: 'Nombres de bebe e ideas gratis', metaDescription: 'Explora ideas de nombres de bebe con un enfoque inspiracional, no medico ni legal.', intro: 'Encuentra nombres para considerar en familia y verifica significado, pronunciacion y registro local.', faqTopics: ['nombres de nina', 'nombres de nino', 'significado de nombres'], searchIntentNote: 'Searchers prefer names list intent over literal generator wording.', riskSafetyNote: 'Sensitive personal choice; avoid claims about legality or suitability.', language: 'es' },
  { canonicalToolId: 'last-name-generator', primaryKeyword: 'generador de apellidos', localizedSlug: 'generador-de-apellidos', h1: 'Generador de apellidos', metaTitle: 'Generador de apellidos gratis', metaDescription: 'Crea apellidos ficticios o de estilo general para personajes, historias y ejemplos.', intro: 'Genera apellidos para uso creativo y revisa sensibilidad cultural cuando corresponda.', faqTopics: ['apellidos para personajes', 'apellidos ficticios', 'apellidos originales'], searchIntentNote: 'Intent is creative surname generation.', riskSafetyNote: 'Avoid implying real genealogy or ethnicity accuracy.', language: 'es' },
  { canonicalToolId: 'middle-name-generator', primaryKeyword: 'generador de segundo nombre', localizedSlug: 'generador-de-segundo-nombre', h1: 'Generador de segundo nombre', metaTitle: 'Generador de segundo nombre gratis', metaDescription: 'Encuentra ideas de segundo nombre para combinaciones personales, personajes o listas creativas.', intro: 'Genera opciones que encajen con nombre y apellido, y revisa pronunciacion y contexto.', faqTopics: ['segundo nombre ideas', 'nombres compuestos', 'combinaciones de nombres'], searchIntentNote: 'Spanish intent is narrower but aligned with middle-name selection.', riskSafetyNote: 'Sensitive personal naming; no legal promises.', language: 'es' },
  { canonicalToolId: 'team-name-generator', primaryKeyword: 'generador de nombres de equipo', localizedSlug: 'generador-de-nombres-de-equipo', h1: 'Generador de nombres de equipo', metaTitle: 'Generador de nombres de equipo gratis', metaDescription: 'Crea nombres para equipos de trabajo, deportes recreativos, clases o grupos creativos.', intro: 'Obten ideas de equipo faciles de recordar y revisa tono, inclusion y originalidad.', faqTopics: ['nombres para equipos', 'nombres de grupos', 'nombres divertidos'], searchIntentNote: 'Clear local team/group naming intent.', riskSafetyNote: 'Avoid offensive, exclusive, or misleading group names.', language: 'es' },
  { canonicalToolId: 'domain-name-generator', primaryKeyword: 'generador de nombres de dominio', localizedSlug: 'generador-de-nombres-de-dominio', h1: 'Generador de nombres de dominio', metaTitle: 'Generador de nombres de dominio gratis', metaDescription: 'Genera ideas de dominios para sitios, productos y negocios, sin garantizar disponibilidad.', intro: 'Explora dominios posibles y comprueba disponibilidad, marca y extension antes de comprar.', faqTopics: ['ideas de dominio', 'dominio para web', 'comprobar dominio'], searchIntentNote: 'Commercial domain discovery intent.', riskSafetyNote: 'Do not promise domain availability or legal clearance.', language: 'es' },
  { canonicalToolId: 'product-name-generator', primaryKeyword: 'nombres para productos', localizedSlug: 'nombres-para-productos', h1: 'Generador de nombres para productos', metaTitle: 'Nombres para productos gratis', metaDescription: 'Crea ideas de nombres para productos, colecciones, funciones o lanzamientos.', intro: 'Genera opciones comerciales y revisa marca, claridad y encaje con el mercado.', faqTopics: ['nombre de producto', 'ideas de producto', 'naming producto'], searchIntentNote: 'Spanish users often search for product-name ideas, not only generator.', riskSafetyNote: 'Trademark and claim review needed.', language: 'es' },
  { canonicalToolId: 'project-name-generator', primaryKeyword: 'nombres para proyectos', localizedSlug: 'nombres-para-proyectos', h1: 'Generador de nombres para proyectos', metaTitle: 'Nombres para proyectos gratis', metaDescription: 'Encuentra nombres para proyectos internos, creativos, escolares o profesionales.', intro: 'Genera ideas memorables y ajustalas al tono, publico y alcance del proyecto.', faqTopics: ['nombre de proyecto', 'ideas para proyectos', 'proyectos creativos'], searchIntentNote: 'Local query favors ideas for project names.', riskSafetyNote: 'Low risk; avoid implying official project status.', language: 'es' },
  { canonicalToolId: 'brand-kit-generator', primaryKeyword: 'generador de kit de marca', localizedSlug: 'generador-de-kit-de-marca', h1: 'Generador de kit de marca', metaTitle: 'Generador de kit de marca gratis', metaDescription: 'Crea una base de marca con ideas para nombre, tono, colores y mensajes iniciales.', intro: 'Usa el kit como punto de partida y revisa coherencia, derechos y aplicacion real.', faqTopics: ['kit de marca', 'identidad de marca', 'branding basico'], searchIntentNote: 'Brand kit is a borrowed marketing concept; Spanish phrase is clear.', riskSafetyNote: 'Trademark and design review required.', language: 'es' },
  { canonicalToolId: 'slogan-generator', primaryKeyword: 'generador de slogans', localizedSlug: 'generador-de-slogans', h1: 'Generador de slogans', metaTitle: 'Generador de slogans gratis', metaDescription: 'Crea slogans para marcas, campanas, productos o proyectos con tono claro y editable.', intro: 'Genera frases breves y revisa originalidad, promesas y encaje antes de publicar.', faqTopics: ['slogans creativos', 'slogan para negocio', 'frases publicitarias'], searchIntentNote: 'Spanish uses slogan as common marketing loanword.', riskSafetyNote: 'Avoid false claims, regulated promises, and trademark conflicts.', language: 'es' },
  { canonicalToolId: 'tagline-generator', primaryKeyword: 'generador de frases para marca', localizedSlug: 'generador-de-frases-para-marca', h1: 'Generador de frases para marca', metaTitle: 'Generador de frases para marca gratis', metaDescription: 'Crea frases cortas de marca para comunicar propuesta, estilo o posicionamiento.', intro: 'Encuentra una linea de marca clara y evita promesas que no puedas respaldar.', faqTopics: ['frase de marca', 'lema de marca', 'propuesta de valor'], searchIntentNote: 'Spanish tagline intent is better captured by brand phrase/lema than literal tagline.', riskSafetyNote: 'Avoid deceptive advertising claims.', language: 'es' },
  { canonicalToolId: 'blog-name-generator', primaryKeyword: 'nombres para blog', localizedSlug: 'nombres-para-blog', h1: 'Generador de nombres para blog', metaTitle: 'Nombres para blog gratis', metaDescription: 'Encuentra ideas de nombres para blogs personales, nichos, newsletters o proyectos de contenido.', intro: 'Genera opciones memorables y revisa dominio, tono y tema antes de elegir.', faqTopics: ['nombre de blog', 'ideas para blog', 'blog personal'], searchIntentNote: 'Spanish list/query intent is stronger than literal generator.', riskSafetyNote: 'Check trademark and domain availability.', language: 'es' },
  { canonicalToolId: 'podcast-name-generator', primaryKeyword: 'nombres para podcast', localizedSlug: 'nombres-para-podcast', h1: 'Generador de nombres para podcast', metaTitle: 'Nombres para podcast gratis', metaDescription: 'Crea ideas de nombres para podcasts, episodios seriados o canales de audio.', intro: 'Genera opciones claras y revisa disponibilidad en directorios, dominio y marca.', faqTopics: ['nombre de podcast', 'ideas para podcast', 'podcast creativo'], searchIntentNote: 'Spanish query often searches ideas/names for podcast.', riskSafetyNote: 'Avoid platform availability guarantees.', language: 'es' },
  { canonicalToolId: 'youtube-tag-generator', primaryKeyword: 'generador de etiquetas para videos', localizedSlug: 'generador-de-etiquetas-para-videos', h1: 'Generador de etiquetas para videos', metaTitle: 'Generador de etiquetas para videos gratis', metaDescription: 'Crea ideas de etiquetas para organizar y describir videos sin prometer posicionamiento.', intro: 'Genera tags relacionados con el tema del video y revisa relevancia antes de publicar.', faqTopics: ['etiquetas para videos', 'tags de video', 'ideas de tags'], searchIntentNote: 'Avoids brand dependency while preserving video-tag intent.', riskSafetyNote: 'Do not promise rankings or use platform-brand claims.', language: 'es' },
  { canonicalToolId: 'hashtag-generator', primaryKeyword: 'generador de hashtags', localizedSlug: 'generador-de-hashtags', h1: 'Generador de hashtags', metaTitle: 'Generador de hashtags gratis', metaDescription: 'Crea hashtags relacionados con un tema, campana, publicacion o idea de contenido.', intro: 'Genera etiquetas sociales relevantes y revisa tono, significado y contexto actual.', faqTopics: ['hashtags para redes', 'hashtags populares', 'ideas de hashtags'], searchIntentNote: 'Direct social hashtag intent.', riskSafetyNote: 'Avoid promising virality or trending accuracy.', language: 'es' },
  { canonicalToolId: 'keyword-generator', primaryKeyword: 'generador de palabras clave', localizedSlug: 'generador-de-palabras-clave', h1: 'Generador de palabras clave', metaTitle: 'Generador de palabras clave gratis', metaDescription: 'Encuentra ideas de palabras clave para contenido, SEO, anuncios o investigacion inicial.', intro: 'Genera temas y terminos relacionados, luego valida volumen, competencia e intencion.', faqTopics: ['palabras clave SEO', 'ideas de keywords', 'investigacion keyword'], searchIntentNote: 'Direct SEO keyword ideation intent.', riskSafetyNote: 'No traffic, ranking, or ad-performance guarantees.', language: 'es' },
  { canonicalToolId: 'meta-tag-generator', primaryKeyword: 'generador de meta tags', localizedSlug: 'generador-de-meta-tags', h1: 'Generador de meta tags', metaTitle: 'Generador de meta tags gratis', metaDescription: 'Crea borradores de meta tags para paginas web, SEO tecnico y vistas previas sociales.', intro: 'Genera etiquetas base y revisa longitud, relevancia y compatibilidad antes de implementar.', faqTopics: ['meta tags SEO', 'etiquetas meta', 'meta title y description'], searchIntentNote: 'Spanish SEO users often use meta tags loan term.', riskSafetyNote: 'Technical output should be reviewed before production.', language: 'es' },
  { canonicalToolId: 'meta-description-generator', primaryKeyword: 'generador de meta descripciones', localizedSlug: 'generador-de-meta-descripciones', h1: 'Generador de meta descripciones', metaTitle: 'Generador de meta descripciones gratis', metaDescription: 'Crea meta descripciones para paginas, articulos y fichas con enfoque claro de clic.', intro: 'Genera borradores breves y ajusta longitud, precision y promesa antes de publicar.', faqTopics: ['meta descripcion SEO', 'description para Google', 'snippet SEO'], searchIntentNote: 'Direct SEO snippet-writing intent.', riskSafetyNote: 'No CTR or ranking guarantees.', language: 'es' },
  { canonicalToolId: 'seo-title-generator', primaryKeyword: 'generador de titulos SEO', localizedSlug: 'generador-de-titulos-seo', h1: 'Generador de titulos SEO', metaTitle: 'Generador de titulos SEO gratis', metaDescription: 'Crea ideas de titulos SEO para paginas, articulos, guias y fichas de producto.', intro: 'Genera opciones de titulo y revisa longitud, intencion y exactitud antes de usarlas.', faqTopics: ['titulo SEO', 'title tag', 'titulos para Google'], searchIntentNote: 'Direct SEO title intent.', riskSafetyNote: 'No ranking guarantees; avoid misleading clickbait.', language: 'es' },
  { canonicalToolId: 'faq-generator', primaryKeyword: 'generador de preguntas frecuentes', localizedSlug: 'generador-de-preguntas-frecuentes', h1: 'Generador de preguntas frecuentes', metaTitle: 'Generador de preguntas frecuentes gratis', metaDescription: 'Crea ideas de preguntas frecuentes para paginas, productos, servicios o articulos.', intro: 'Genera temas de FAQ utiles y revisa exactitud, politicas y respuesta final.', faqTopics: ['preguntas frecuentes', 'FAQ para web', 'preguntas y respuestas'], searchIntentNote: 'Spanish expands FAQ for broader local clarity.', riskSafetyNote: 'Review answers for factual and policy accuracy.', language: 'es' },
  { canonicalToolId: 'canonical-tag-generator', primaryKeyword: 'generador de etiqueta canonical', localizedSlug: 'generador-de-etiqueta-canonical', h1: 'Generador de etiqueta canonical', metaTitle: 'Generador de etiqueta canonical gratis', metaDescription: 'Crea borradores de etiquetas canonical para indicar la URL preferida de una pagina.', intro: 'Genera el formato base y revisa la URL final antes de implementarlo en tu sitio.', faqTopics: ['canonical SEO', 'etiqueta canonica', 'URL canonica'], searchIntentNote: 'SEO technical query; canonical often remains English.', riskSafetyNote: 'Technical SEO review required.', language: 'es' },
  { canonicalToolId: 'robots-txt-generator', primaryKeyword: 'generador de robots.txt', localizedSlug: 'generador-de-robots-txt', h1: 'Generador de robots.txt', metaTitle: 'Generador de robots.txt gratis', metaDescription: 'Crea borradores de archivos robots.txt para reglas basicas de rastreo.', intro: 'Genera reglas iniciales y revisa que no bloqueen paginas importantes por error.', faqTopics: ['robots.txt SEO', 'archivo robots', 'reglas de rastreo'], searchIntentNote: 'Technical query is language-neutral around robots.txt.', riskSafetyNote: 'High risk if misused; require manual SEO review.', language: 'es' },
  { canonicalToolId: 'open-graph-generator', primaryKeyword: 'generador de etiquetas Open Graph', localizedSlug: 'generador-de-etiquetas-open-graph', h1: 'Generador de etiquetas Open Graph', metaTitle: 'Generador de etiquetas Open Graph gratis', metaDescription: 'Crea borradores de etiquetas Open Graph para vistas previas al compartir enlaces.', intro: 'Genera titulo, descripcion e imagen sugerida y revisa cada campo antes de publicar.', faqTopics: ['Open Graph SEO', 'etiquetas sociales', 'vista previa enlace'], searchIntentNote: 'Protocol name is standard; intent is social preview metadata.', riskSafetyNote: 'Review image rights and avoid misleading previews.', language: 'es' },
  { canonicalToolId: 'fancy-text-generator', primaryKeyword: 'letras bonitas', localizedSlug: 'letras-bonitas', h1: 'Generador de letras bonitas', metaTitle: 'Letras bonitas para copiar', metaDescription: 'Convierte texto en estilos decorativos para perfiles, mensajes y publicaciones.', intro: 'Crea texto estilizado y comprueba legibilidad y compatibilidad antes de compartir.', faqTopics: ['letras para copiar', 'texto bonito', 'fuentes decorativas'], searchIntentNote: 'Spanish search intent strongly favors letras bonitas over literal fancy text.', riskSafetyNote: 'Avoid deceptive identity or accessibility issues.', language: 'es' },
  { canonicalToolId: 'bold-text-generator', primaryKeyword: 'texto en negrita', localizedSlug: 'texto-en-negrita', h1: 'Generador de texto en negrita', metaTitle: 'Texto en negrita para copiar', metaDescription: 'Convierte texto normal en estilos de negrita para copiar y pegar.', intro: 'Genera texto destacado y revisa que sea legible en la app o pagina donde lo uses.', faqTopics: ['negrita unicode', 'letras en negrita', 'copiar texto negrita'], searchIntentNote: 'Spanish users search copyable bold text, not only generator.', riskSafetyNote: 'Compatibility/accessibility warning.', language: 'es' },
  { canonicalToolId: 'cursive-text-generator', primaryKeyword: 'letras cursivas', localizedSlug: 'letras-cursivas', h1: 'Generador de letras cursivas', metaTitle: 'Letras cursivas para copiar', metaDescription: 'Convierte texto en estilos cursivos decorativos para copiar en perfiles y mensajes.', intro: 'Genera letras cursivas y verifica legibilidad, acentos y compatibilidad antes de publicar.', faqTopics: ['cursiva para copiar', 'texto cursivo', 'letras manuscritas'], searchIntentNote: 'Spanish users search letras cursivas para copiar.', riskSafetyNote: 'Compatibility/accessibility warning.', language: 'es' },
  { canonicalToolId: 'italic-text-generator', primaryKeyword: 'texto italica', localizedSlug: 'texto-italica', h1: 'Generador de texto italica', metaTitle: 'Texto italica para copiar', metaDescription: 'Convierte texto en estilo italica o inclinado para copiar y pegar.', intro: 'Crea texto inclinado y revisa si la plataforma lo muestra correctamente.', faqTopics: ['italica unicode', 'texto inclinado', 'cursiva para copiar'], searchIntentNote: 'Spanish often blends italica/cursiva; chosen slug avoids collision with cursive tool.', riskSafetyNote: 'Compatibility/accessibility warning.', language: 'es' },
  { canonicalToolId: 'small-text-generator', primaryKeyword: 'letras pequenas', localizedSlug: 'letras-pequenas', h1: 'Generador de letras pequenas', metaTitle: 'Letras pequenas para copiar', metaDescription: 'Convierte texto en caracteres pequenos decorativos para copiar y pegar.', intro: 'Genera texto pequeno y comprueba legibilidad, accesibilidad y compatibilidad.', faqTopics: ['texto pequeno', 'letras mini', 'small text copiar'], searchIntentNote: 'Spanish local copy intent is letras pequenas/texto pequeno.', riskSafetyNote: 'Accessibility and readability risk.', language: 'es' },
  { canonicalToolId: 'reverse-text-generator', primaryKeyword: 'invertir texto', localizedSlug: 'invertir-texto', h1: 'Invertir texto', metaTitle: 'Invertir texto online gratis', metaDescription: 'Invierte letras o texto completo para juegos, formatos creativos o pruebas rapidas.', intro: 'Pega tu texto, genera la version invertida y revisa que el resultado siga siendo correcto.', faqTopics: ['texto al reves', 'invertir palabras', 'escribir al reves'], searchIntentNote: 'Spanish task query is stronger than generator wording.', riskSafetyNote: 'Low risk; caution with sensitive text pasted into tools.', language: 'es' },
  { canonicalToolId: 'text-case-converter', primaryKeyword: 'convertidor de mayusculas y minusculas', localizedSlug: 'convertidor-de-mayusculas-y-minusculas', h1: 'Convertidor de mayusculas y minusculas', metaTitle: 'Convertidor de mayusculas y minusculas gratis', metaDescription: 'Cambia texto entre mayusculas, minusculas, titulo y otros formatos comunes.', intro: 'Pega texto y conviertelo al formato de capitalizacion que necesites.', faqTopics: ['pasar a mayusculas', 'convertir minusculas', 'capitalizar texto'], searchIntentNote: 'Direct utility intent in Spanish.', riskSafetyNote: 'Low risk; caution with sensitive text.', language: 'es' },
  { canonicalToolId: 'word-counter', primaryKeyword: 'contador de palabras', localizedSlug: 'contador-de-palabras', h1: 'Contador de palabras', metaTitle: 'Contador de palabras online gratis', metaDescription: 'Cuenta palabras, caracteres y longitud de texto para articulos, tareas o publicaciones.', intro: 'Pega tu texto y revisa conteos utiles sin cambiar el contenido original.', faqTopics: ['contar palabras', 'contador de caracteres', 'longitud de texto'], searchIntentNote: 'Direct high-volume utility intent.', riskSafetyNote: 'Low risk; avoid storing sensitive text.', language: 'es' },
  { canonicalToolId: 'paragraph-generator', primaryKeyword: 'generador de parrafos', localizedSlug: 'generador-de-parrafos', h1: 'Generador de parrafos', metaTitle: 'Generador de parrafos gratis', metaDescription: 'Crea borradores de parrafos para ideas, articulos, descripciones o ejercicios de escritura.', intro: 'Genera texto inicial y revisa hechos, tono y originalidad antes de publicarlo.', faqTopics: ['parrafos para textos', 'escribir parrafo', 'ideas de parrafos'], searchIntentNote: 'Direct writing-assist intent.', riskSafetyNote: 'Review factual claims and avoid submitting unedited work.', language: 'es' },
  { canonicalToolId: 'sentence-generator', primaryKeyword: 'generador de oraciones', localizedSlug: 'generador-de-oraciones', h1: 'Generador de oraciones', metaTitle: 'Generador de oraciones gratis', metaDescription: 'Crea oraciones de ejemplo para escritura, practica, contenido o lluvia de ideas.', intro: 'Genera frases base y ajusta gramatica, contexto y precision antes de usarlas.', faqTopics: ['oraciones de ejemplo', 'crear frases', 'frases para escribir'], searchIntentNote: 'Spanish oraciones is better for sentence tool than frases in some contexts.', riskSafetyNote: 'Review grammar and factual context.', language: 'es' },
  { canonicalToolId: 'writing-prompt-generator', primaryKeyword: 'ideas para escribir', localizedSlug: 'ideas-para-escribir', h1: 'Generador de ideas para escribir', metaTitle: 'Ideas para escribir gratis', metaDescription: 'Encuentra prompts e ideas para cuentos, escenas, diarios o ejercicios creativos.', intro: 'Genera disparadores de escritura y adaptalos a tu voz, genero y objetivo.', faqTopics: ['prompts de escritura', 'ideas para cuentos', 'ejercicios creativos'], searchIntentNote: 'Spanish local intent favors writing ideas over prompt literal.', riskSafetyNote: 'Avoid school dishonesty framing; creative support only.', language: 'es' },
  { canonicalToolId: 'blog-outline-generator', primaryKeyword: 'esquema para blog', localizedSlug: 'esquema-para-blog', h1: 'Generador de esquema para blog', metaTitle: 'Esquema para blog gratis', metaDescription: 'Crea estructuras de articulos con secciones, subtitulos e ideas principales.', intro: 'Genera un esquema inicial y ajustalo segun intencion de busqueda y experiencia real.', faqTopics: ['estructura de blog', 'outline de articulo', 'plan de contenido'], searchIntentNote: 'Spanish intent is outline/structure for blog posts.', riskSafetyNote: 'Avoid thin SEO content; require human expertise.', language: 'es' },
  { canonicalToolId: 'product-description-generator', primaryKeyword: 'generador de descripciones de productos', localizedSlug: 'generador-de-descripciones-de-productos', h1: 'Generador de descripciones de productos', metaTitle: 'Generador de descripciones de productos gratis', metaDescription: 'Crea borradores de descripciones para productos, tiendas y fichas comerciales.', intro: 'Genera texto de producto y revisa exactitud, beneficios, politicas y cumplimiento.', faqTopics: ['descripcion de producto', 'ficha de producto', 'copy ecommerce'], searchIntentNote: 'Direct ecommerce copy intent.', riskSafetyNote: 'Must verify factual claims, pricing, compliance, and policies.', language: 'es' },
];
void legacySpanishPilotTools;

export const localizedPilotTools = localizedPilotToolData;
export const localizedPilotLanguages: LocalizedLanguageCode[] = ['es', 'fr', 'de', 'pt', 'it', 'pl', 'ru', 'tr', 'id', 'sv', 'ms', 'bg', 'hi', 'bn', 'ja', 'ko', 'ar'];
export const spanishPilotTools = localizedPilotTools.filter((entry) => entry.language === 'es');
export const frenchPilotTools = localizedPilotTools.filter((entry) => entry.language === 'fr');
export const germanPilotTools = localizedPilotTools.filter((entry) => entry.language === 'de');
export const portuguesePilotTools = localizedPilotTools.filter((entry) => entry.language === 'pt');
export const italianPilotTools = localizedPilotTools.filter((entry) => entry.language === 'it');
export const polishPilotTools = localizedPilotTools.filter((entry) => entry.language === 'pl');
export const russianPilotTools = localizedPilotTools.filter((entry) => entry.language === 'ru');
export const turkishPilotTools = localizedPilotTools.filter((entry) => entry.language === 'tr');
export const indonesianPilotTools = localizedPilotTools.filter((entry) => entry.language === 'id');
export const swedishPilotTools = localizedPilotTools.filter((entry) => entry.language === 'sv');
export const malayPilotTools = localizedPilotTools.filter((entry) => entry.language === 'ms');
export const bulgarianPilotTools = localizedPilotTools.filter((entry) => entry.language === 'bg');
export const hindiPilotTools = localizedPilotTools.filter((entry) => entry.language === 'hi');
export const bengaliPilotTools = localizedPilotTools.filter((entry) => entry.language === 'bn');
export const japanesePilotTools = localizedPilotTools.filter((entry) => entry.language === 'ja');
export const koreanPilotTools = localizedPilotTools.filter((entry) => entry.language === 'ko');
export const arabicPilotTools = localizedPilotTools.filter((entry) => entry.language === 'ar');

const localizedPilotByLanguage = Object.fromEntries(
  localizedPilotLanguages.map((language) => [language, localizedPilotTools.filter((entry) => entry.language === language)]),
) as Record<LocalizedLanguageCode, LocalizedToolContent[]>;

const localizedPilotByCanonicalToolId = Object.fromEntries(
  localizedPilotLanguages.map((language) => [
    language,
    Object.fromEntries(localizedPilotByLanguage[language].map((entry) => [entry.canonicalToolId, entry])),
  ]),
) as Record<LocalizedLanguageCode, Record<string, LocalizedToolContent>>;

const localizedPilotBySlug = Object.fromEntries(
  localizedPilotLanguages.map((language) => [
    language,
    Object.fromEntries(localizedPilotByLanguage[language].map((entry) => [entry.localizedSlug, entry])),
  ]),
) as Record<LocalizedLanguageCode, Record<string, LocalizedToolContent>>;

export const spanishPilotByCanonicalToolId = Object.fromEntries(
  spanishPilotTools.map((entry) => [entry.canonicalToolId, entry]),
) as Record<string, LocalizedToolContent>;

export const spanishPilotBySlug = Object.fromEntries(
  spanishPilotTools.map((entry) => [entry.localizedSlug, entry]),
) as Record<string, LocalizedToolContent>;

export function isSpanishPilotTool(canonicalToolId: string): boolean {
  return canonicalToolId in spanishPilotByCanonicalToolId && !noindexToolSlugs.has(canonicalToolId);
}

export function getLocalizedPilotTools(language: LocalizedLanguageCode): LocalizedToolContent[] {
  return localizedPilotByLanguage[language];
}

export function getSupportedLanguage(language: SupportedLanguageCode): SupportedLanguage {
  return supportedLanguages.find((item) => item.code === language) || supportedLanguages[0];
}

export function isLocalizedLanguage(language: SupportedLanguageCode): language is LocalizedLanguageCode {
  return language !== 'en';
}

export function getLocalizedToolByCanonicalId(canonicalToolId: string, language: SupportedLanguageCode) {
  if (!isLocalizedLanguage(language) || noindexToolSlugs.has(canonicalToolId)) return undefined;
  return localizedPilotByCanonicalToolId[language][canonicalToolId];
}

export function getLocalizedToolBySlug(localizedSlug: string, language: SupportedLanguageCode) {
  if (!isLocalizedLanguage(language)) return undefined;
  const localized = localizedPilotBySlug[language][localizedSlug];
  if (!localized || noindexToolSlugs.has(localized.canonicalToolId)) return undefined;
  return localized;
}

export function getToolRoute(canonicalToolId: string, language: SupportedLanguageCode = 'en'): string {
  if (language === 'en') return `/tools/${canonicalToolId}/`;
  const localized = getLocalizedToolByCanonicalId(canonicalToolId, language);
  return localized ? `/${language}/tools/${localized.localizedSlug}/` : `/tools/${canonicalToolId}/`;
}

export function getLanguageSwitchRoute(canonicalToolId: string, targetLanguage: SupportedLanguageCode): string {
  return getToolRoute(canonicalToolId, targetLanguage);
}

export function getToolLanguageAlternates(canonicalToolId: string): LanguageAlternate[] {
  const englishRoute = getToolRoute(canonicalToolId, 'en');
  const alternates: LanguageAlternate[] = [
    { lang: 'en', href: `${siteConfig.url}${englishRoute}` },
  ];
  for (const language of localizedPilotLanguages) {
    const localizedRoute = getToolRoute(canonicalToolId, language);
    if (localizedRoute !== englishRoute) {
      alternates.push({ lang: language, href: `${siteConfig.url}${localizedRoute}` });
    }
  }
  alternates.push({ lang: 'x-default', href: `${siteConfig.url}${englishRoute}` });
  return alternates;
}

export function createSpanishFaqItems(localized: LocalizedToolContent) {
  const copy = getSpanishPageCopy(localized);
  const safetyNote = getSpanishSafetyNote(localized);
  return [
    {
      q: `¿Para qué sirve ${copy.h1}?`,
      a: `${copy.intro} Está pensado para empezar más rápido, comparar opciones y quedarte con una versión que puedas adaptar a tu caso real.`,
    },
    {
      q: '¿Qué debería escribir para obtener mejores resultados?',
      a: 'Incluye el uso que le darás, el público, el tono, palabras que quieras mantener y detalles que deban evitarse. Cuanto más claro sea el contexto, más fácil será revisar las sugerencias.',
    },
    {
      q: '¿Puedo usar el resultado directamente?',
      a: `No conviene. Revisa exactitud, originalidad, legibilidad y reglas de la plataforma o proyecto. ${safetyNote}`,
    },
  ];
}

export function createSpanishGuide(tool: Tool, localized: LocalizedToolContent) {
  const copy = getSpanishPageCopy(localized);
  const keywordList = copy.faqTopics.join(', ');
  const safetyNote = getSpanishSafetyNote(localized);
  return {
    howTo: [
      `Empieza con una palabra, texto o breve descripción relacionada con ${copy.primaryKeyword}.`,
      'Añade contexto práctico: uso previsto, público, tono, formato y cualquier palabra que quieras incluir o evitar.',
      'Genera varias opciones y compáralas por claridad, naturalidad y ajuste al objetivo de la página.',
      'Edita el resultado antes de publicarlo, sobre todo si se usará en una marca, perfil, web, contenido SEO o pieza comercial.',
    ],
    tips: [
      { title: 'Usa intención real', body: `Prueba consultas y variantes cercanas como ${keywordList}, siempre manteniendo el mismo objetivo de la herramienta.` },
      { title: 'Mantén la misma intención', body: `Usa ${copy.h1} para el mismo propósito que ${tool.name}; no lo fuerces hacia funciones que no ofrece.` },
      { title: 'Revisa antes de publicar', body: safetyNote },
    ],
  };
}

export function getSpanishPageCopy(localized: LocalizedToolContent): LocalizedToolContent {
  return getLocalizedPageCopy(localized);
}

export function getLocalizedPageCopy(localized: LocalizedToolContent): LocalizedToolContent {
  const polish = localized.language === 'es'
    ? polishSpanishText
    : localized.language === 'fr'
      ? polishFrenchText
      : localized.language === 'de'
        ? polishGermanText
        : localized.language === 'pt'
          ? polishPortugueseText
          : localized.language === 'it'
            ? polishItalianText
            : localized.language === 'pl'
              ? polishPolishText
              : (value: string) => value;
  return {
    ...localized,
    primaryKeyword: polish(localized.primaryKeyword),
    h1: polish(localized.h1),
    metaTitle: polish(localized.metaTitle),
    metaDescription: polish(localized.metaDescription),
    intro: polish(localized.intro),
    faqTopics: localized.faqTopics.map(polish),
  };
}

export function polishSpanishText(value: string): string {
  return value
    .replaceAll('espanol', 'español')
    .replaceAll('Espanol', 'Español')
    .replaceAll('faciles', 'fáciles')
    .replaceAll('publico', 'público')
    .replaceAll('genero', 'género')
    .replaceAll('epoca', 'época')
    .replaceAll('bebe', 'bebé')
    .replaceAll('fantasia', 'fantasía')
    .replaceAll('fantasticos', 'fantásticos')
    .replaceAll('ajustalas', 'ajústalas')
    .replaceAll('nina', 'niña')
    .replaceAll('nino', 'niño')
    .replaceAll('pronunciacion', 'pronunciación')
    .replaceAll('extension', 'extensión')
    .replaceAll('medico', 'médico')
    .replaceAll('aplicacion', 'aplicación')
    .replaceAll('basico', 'básico')
    .replaceAll('campanas', 'campañas')
    .replaceAll('campana', 'campaña')
    .replaceAll('publicacion', 'publicación')
    .replaceAll('guias', 'guías')
    .replaceAll('guia', 'guía')
    .replaceAll('Resena', 'Reseña')
    .replaceAll('resena', 'reseña')
    .replaceAll('linea', 'línea')
    .replaceAll('articulos', 'artículos')
    .replaceAll('terminos', 'términos')
    .replaceAll('intencion', 'intención')
    .replaceAll('busqueda', 'búsqueda')
    .replaceAll('paginas', 'páginas')
    .replaceAll('descripcion', 'descripción')
    .replaceAll('precision', 'precisión')
    .replaceAll('titulos', 'títulos')
    .replaceAll('utiles', 'útiles')
    .replaceAll('canonica', 'canónica')
    .replaceAll('titulo', 'título')
    .replaceAll('practica', 'práctica')
    .replaceAll('rapidas', 'rápidas')
    .replaceAll('reves', 'revés')
    .replaceAll('mayusculas', 'mayúsculas')
    .replaceAll('minusculas', 'minúsculas')
    .replaceAll('conviertelo', 'conviértelo')
    .replaceAll('parrafos', 'párrafos')
    .replaceAll('gramatica', 'gramática')
    .replaceAll('adaptalos', 'adáptalos')
    .replaceAll('ajustalo', 'ajústalo')
    .replaceAll('segun', 'según')
    .replaceAll('politicas', 'políticas')
    .replaceAll('Seccion', 'Sección')
    .replaceAll('seccion', 'sección')
    .replaceAll('secciónes', 'secciones')
    .replaceAll('descripciónes', 'descripciones')
    .replaceAll('brevés', 'breves')
    .replaceAll('articulo', 'artículo')
    .replaceAll('Unico', 'Único')
    .replaceAll('unico', 'único')
    .replaceAll('pequenas', 'pequeñas')
    .replaceAll('pequeno', 'pequeño')
    .replaceAll('italica', 'itálica')
    .replaceAll('Italica', 'Itálica')
    .replaceAll('Obten', 'Obtén')
    .replaceAll('Anade', 'Añade');
}

export function polishFrenchText(value: string): string {
  return value
    .replaceAll('generateur', 'générateur')
    .replaceAll('Generateur', 'Générateur')
    .replaceAll('idees', 'idées')
    .replaceAll('Idees', 'Idées')
    .replaceAll('Creez', 'Créez')
    .replaceAll('Generez', 'Générez')
    .replaceAll('verifiez', 'vérifiez')
    .replaceAll('disponibilite', 'disponibilité')
    .replaceAll('ecriture', 'écriture')
    .replaceAll('prenom', 'prénom')
    .replaceAll('Prenom', 'Prénom')
    .replaceAll('prenoms', 'prénoms')
    .replaceAll('deuxieme', 'deuxième')
    .replaceAll('equipe', 'équipe')
    .replaceAll('mots cles', 'mots clés')
    .replaceAll('balises meta', 'balises méta')
    .replaceAll('caracteres', 'caractères')
    .replaceAll('lisibilite', 'lisibilité')
    .replaceAll('compatibilite', 'compatibilité')
    .replaceAll('francais', 'français')
    .replaceAll('Francais', 'Français')
    .replaceAll('Redigez', 'Rédigez')
    .replaceAll('conformite', 'conformité')
    .replaceAll('precision', 'précision')
    .replaceAll('verifier', 'vérifier')
    .replaceAll('protege', 'protégé')
    .replaceAll('epoque', 'époque')
    .replaceAll('recit', 'récit')
    .replaceAll('creatif', 'créatif')
    .replaceAll('Creatif', 'Créatif')
    .replaceAll('emissions', 'émissions')
    .replaceAll('series', 'séries')
    .replaceAll('episodes', 'épisodes')
    .replaceAll('preferee', 'préférée')
    .replaceAll('actualite', 'actualité')
    .replaceAll('reseaux', 'réseaux')
    .replaceAll('adaptee', 'adaptée')
    .replaceAll('originalite', 'originalité')
    .replaceAll('coherence', 'cohérence')
    .replaceAll('stylise', 'stylisé')
    .replaceAll('controlez', 'contrôlez')
    .replaceAll('video', 'vidéo')
    .replaceAll('ideation', 'idéation')
    .replaceAll('penche', 'penché')
    .replaceAll('creer', 'créer')
    .replaceAll('ecrire', 'écrire')
    .replaceAll('scenes', 'scènes')
    .replaceAll('depart', 'départ')
    .replaceAll(' a ', ' à ');
}

export function polishGermanText(value: string): string {
  return value
    .replaceAll('fuer', 'für')
    .replaceAll('pruefe', 'prüfe')
    .replaceAll('Pruefe', 'Prüfe')
    .replaceAll('geprueft', 'geprüft')
    .replaceAll('Verfuegbarkeit', 'Verfügbarkeit')
    .replaceAll('persoenliche', 'persönliche')
    .replaceAll('Geschaeft', 'Geschäft')
    .replaceAll('Entwuerfe', 'Entwürfe')
    .replaceAll('Uebungen', 'Übungen')
    .replaceAll('Ueberschriften', 'Überschriften')
    .replaceAll('einpraegsame', 'einprägsame')
    .replaceAll('maedchennamen', 'Mädchennamen')
    .replaceAll('woerter', 'Wörter')
    .replaceAll('gross', 'groß')
    .replaceAll('Gross', 'Groß')
    .replaceAll('Textlaenge', 'Textlänge')
    .replaceAll('veraendern', 'verändern')
    .replaceAll('Fuege', 'Füge')
    .replaceAll('Saetze', 'Sätze')
    .replaceAll('Vorschlaege', 'Vorschläge')
    .replaceAll('vorschlaege', 'Vorschläge')
    .replaceAll('Voelker', 'Völker')
    .replaceAll('geschuetzte', 'geschützte')
    .replaceAll('waehle', 'wähle')
    .replaceAll('Waehle', 'Wähle')
    .replaceAll('zaehle', 'zähle')
    .replaceAll('Zaehle', 'Zähle')
    .replaceAll('Zaehlungen', 'Zählungen')
    .replaceAll('Beitraege', 'Beiträge')
    .replaceAll('Kompatibilitaet', 'Kompatibilität')
    .replaceAll('Aktualitaet', 'Aktualität')
    .replaceAll('veroeffentlichst', 'veröffentlichst')
    .replaceAll('rueckwaerts', 'rückwärts')
    .replaceAll('Laenge', 'Länge')
    .replaceAll('Schreibuebungen', 'Schreibübungen');
}

export function polishPortugueseText(value: string): string {
  return value
    .replaceAll('opcoes', 'opções')
    .replaceAll('portugues', 'português')
    .replaceAll('sugestoes', 'sugestões')
    .replaceAll('dominio', 'domínio')
    .replaceAll('dominios', 'domínios')
    .replaceAll('conteudo', 'conteúdo')
    .replaceAll('conteudos', 'conteúdos')
    .replaceAll('tecnico', 'técnico')
    .replaceAll('rapida', 'rápida')
    .replaceAll('rapido', 'rápido')
    .replaceAll('variacao', 'variação')
    .replaceAll('versao', 'versão')
    .replaceAll('Versao', 'Versão')
    .replaceAll('usuario', 'usuário')
    .replaceAll('Usuario', 'Usuário')
    .replaceAll('negocio', 'negócio')
    .replaceAll('negocios', 'negócios')
    .replaceAll('fantasticos', 'fantásticos')
    .replaceAll('bebe', 'bebê')
    .replaceAll('combinacoes', 'combinações')
    .replaceAll('basico', 'básico')
    .replaceAll('publicitarias', 'publicitárias')
    .replaceAll('descricoes', 'descrições')
    .replaceAll('descricao', 'descrição')
    .replaceAll('video', 'vídeo')
    .replaceAll('videos', 'vídeos')
    .replaceAll('titulos', 'títulos')
    .replaceAll('titulo', 'título')
    .replaceAll('canonica', 'canônica')
    .replaceAll('contrario', 'contrário')
    .replaceAll('italico', 'itálico')
    .replaceAll('maiusculas', 'maiúsculas')
    .replaceAll('minusculas', 'minúsculas')
    .replaceAll('paragrafos', 'parágrafos')
    .replaceAll('paragrafo', 'parágrafo')
    .replaceAll('exercicios', 'exercícios')
    .replaceAll('exatidao', 'exatidão')
    .replaceAll('publico', 'público')
    .replaceAll('pratico', 'prático')
    .replaceAll('varias', 'várias')
    .replaceAll('intencao', 'intenção')
    .replaceAll('funcoes', 'funções')
    .replaceAll('nao', 'não');
}

export function polishItalianText(value: string): string {
  return value
    .replaceAll('disponibilita', 'disponibilità')
    .replaceAll('dell uso', "dell'uso")
    .replaceAll('leggibilita', 'leggibilità')
    .replaceAll('compatibilita', 'compatibilità')
    .replaceAll('originalita', 'originalità')
    .replaceAll('identita', 'identità')
    .replaceAll('conformita', 'conformità')
    .replaceAll('piu', 'più')
    .replaceAll('ne costi', 'né costi')
    .replaceAll('Quantita', 'Quantità')
    .replaceAll('cos e', "cos'è")
    .replaceAll('Perche', 'Perché');
}

export function polishPolishText(value: string): string {
  return value
    .replaceAll('Tworz', 'Twórz')
    .replaceAll('tworz', 'twórz')
    .replaceAll('pomysly', 'pomysły')
    .replaceAll('Pomysly', 'Pomysły')
    .replaceAll('projektow', 'projektów')
    .replaceAll('uzytkownika', 'użytkownika')
    .replaceAll('dostepnosc', 'dostępność')
    .replaceAll('dostepnosci', 'dostępności')
    .replaceAll('uzyciem', 'użyciem')
    .replaceAll('uzycie', 'użycie')
    .replaceAll('uzyty', 'użyty')
    .replaceAll('uzyc', 'użyć')
    .replaceAll('uzywac', 'używać')
    .replaceAll('uzyj', 'użyj')
    .replaceAll('Uzyj', 'Użyj')
    .replaceAll('slow kluczowych', 'słów kluczowych')
    .replaceAll('slowo', 'słowo')
    .replaceAll('slowa', 'słowa')
    .replaceAll('slow', 'słów')
    .replaceAll('tresci', 'treści')
    .replaceAll('wymagajacych', 'wymagających')
    .replaceAll('szybka', 'szybką')
    .replaceAll('baze', 'bazę')
    .replaceAll('dlugosc', 'długość')
    .replaceAll('publikacja', 'publikacją')
    .replaceAll('wiadomosci', 'wiadomości')
    .replaceAll('Przeksztalcaj', 'Przekształcaj')
    .replaceAll('Przeksztalc', 'Przekształć')
    .replaceAll('czytelnosc', 'czytelność')
    .replaceAll('zgodnosc', 'zgodność')
    .replaceAll('platforma', 'platformą')
    .replaceAll('oryginalnosc', 'oryginalność')
    .replaceAll('dokladnosc', 'dokładność')
    .replaceAll('cwiczenia', 'ćwiczenia')
    .replaceAll('akapitow', 'akapitów')
    .replaceAll('opisow', 'opisów')
    .replaceAll('produktow', 'produktów')
    .replaceAll('tytulow', 'tytułów')
    .replaceAll('tagow', 'tagów')
    .replaceAll('hashtagow', 'hashtagów')
    .replaceAll('zespolow', 'zespołów')
    .replaceAll('sloganow', 'sloganów')
    .replaceAll('podcastow', 'podcastów')
    .replaceAll('wartosci', 'wartości')
    .replaceAll('chlopcow', 'chłopców')
    .replaceAll('polaczenia', 'połączenia')
    .replaceAll('wybor', 'wybór')
    .replaceAll('sprawdz', 'sprawdź')
    .replaceAll('Sprawdz', 'Sprawdź')
    .replaceAll('narzedzie', 'narzędzie')
    .replaceAll('narzedzia', 'narzędzia')
    .replaceAll('Czeste', 'Częste')
    .replaceAll('czeste', 'częste')
    .replaceAll('przykladowe', 'przykładowe')
    .replaceAll('zdan', 'zdań')
    .replaceAll('od tylu', 'od tyłu')
    .replaceAll('wielkosci', 'wielkości')
    .replaceAll('maly', 'mały')
    .replaceAll('male', 'małe')
    .replaceAll('ladnego', 'ładnego')
    .replaceAll('imie', 'imię');
}

export function createLocalizedFaqItems(localized: LocalizedToolContent) {
  const copy = getLocalizedPageCopy(localized);
  const safetyNote = getLocalizedSafetyNote(localized);
  const keywordList = copy.faqTopics.join(', ');
  if (localized.language === 'fr') {
    return [
      { q: 'À quoi sert cet outil ?', a: `${copy.intro} Il aide à partir plus vite, à comparer plusieurs pistes et à garder une version que vous pouvez adapter à votre contexte.` },
      { q: 'Que faut-il écrire pour obtenir de meilleurs résultats ?', a: 'Ajoutez l’usage prévu, le public, le ton, les mots à conserver et les éléments à éviter. Un contexte précis rend les suggestions plus faciles à relire.' },
      { q: 'Puis-je utiliser le résultat tel quel ?', a: `Mieux vaut le relire. Vérifiez exactitude, originalité, lisibilité et règles de la plateforme ou du projet. ${safetyNote}` },
    ];
  }
  if (localized.language === 'de') {
    return [
      { q: 'Wofür kann ich dieses Tool nutzen?', a: `${copy.intro} Das Tool hilft dir, schneller zu starten, Varianten zu vergleichen und einen Entwurf an deinen echten Einsatz anzupassen.` },
      { q: 'Was sollte ich eingeben, um bessere Ergebnisse zu bekommen?', a: 'Nenne Zweck, Zielgruppe, Ton, gewünschte Wörter und Dinge, die vermieden werden sollen. Je klarer der Kontext, desto leichter lassen sich die Vorschläge prüfen.' },
      { q: 'Kann ich das Ergebnis direkt verwenden?', a: `Nicht ungeprüft. Prüfe Genauigkeit, Originalität, Lesbarkeit und die Regeln deiner Plattform oder deines Projekts. ${safetyNote}` },
    ];
  }
  if (localized.language === 'pt') {
    return [
      { q: `Para que serve ${copy.h1}?`, a: `${copy.intro} Use para explorar ${copy.primaryKeyword} com contexto real, comparar variações e escolher uma opção que ainda possa ser revisada.` },
      { q: `Que detalhes melhoram os resultados de ${copy.primaryKeyword}?`, a: `Inclua público, tom, formato, palavras desejadas e limites do projeto. Termos próximos como ${keywordList} ajudam a manter a intenção correta.` },
      { q: 'Posso usar o resultado diretamente?', a: `Revise antes. Confira exatidão, originalidade, legibilidade e regras da plataforma ou do projeto. ${safetyNote}` },
    ];
  }
  if (localized.language === 'it') {
    return [
      { q: `A cosa serve ${copy.h1}?`, a: `${copy.intro} Serve per esplorare ${copy.primaryKeyword} con un contesto concreto, confrontare varianti e scegliere una bozza da rifinire.` },
      { q: `Quali dettagli migliorano ${copy.primaryKeyword}?`, a: `Aggiungi pubblico, tono, formato, parole da includere e limiti del progetto. Varianti come ${keywordList} aiutano a restare nello stesso intento.` },
      { q: 'Posso usare il risultato direttamente?', a: `Meglio rivederlo prima. Controlla accuratezza, originalità, leggibilità e regole della piattaforma o del progetto. ${safetyNote}` },
    ];
  }
  if (localized.language === 'pl') {
    return [
      { q: `Do czego służy ${copy.h1}?`, a: `${copy.intro} Pomaga przygotować ${copy.primaryKeyword}, porównać warianty i dopasować szkic do realnego zastosowania.` },
      { q: `Co wpisać, aby poprawić ${copy.primaryKeyword}?`, a: `Dodaj cel, odbiorców, ton, format, słowa do zachowania oraz ograniczenia projektu. Powiązane tematy, takie jak ${keywordList}, pomagają utrzymać właściwą intencję.` },
      { q: 'Czy mogę użyć wyniku od razu?', a: `Najpierw go sprawdź. Zweryfikuj dokładność, oryginalność, czytelność oraz zasady platformy lub projektu. ${safetyNote}` },
    ];
  }
  if (localized.language === 'ru') {
    return [
      { q: `Для чего нужен ${copy.h1}?`, a: `${copy.intro} Инструмент помогает подготовить ${copy.primaryKeyword}, сравнить варианты и адаптировать черновик под реальную задачу.` },
      { q: `Что ввести, чтобы улучшить ${copy.primaryKeyword}?`, a: `Добавьте цель, аудиторию, тон, формат, нужные слова и ограничения проекта. Близкие темы, например ${keywordList}, помогают сохранить правильный интент.` },
      { q: 'Можно ли использовать результат сразу?', a: `Сначала проверьте его. Оцените точность, оригинальность, читаемость и правила платформы или проекта. ${safetyNote}` },
    ];
  }
  if (localized.language === 'tr') {
    return [
      { q: `${copy.h1} ne işe yarar?`, a: `${copy.intro} ${copy.primaryKeyword} için bağlama uygun taslaklar hazırlamanıza, seçenekleri karşılaştırmanıza ve sonucu gerçek kullanıma uyarlamanıza yardım eder.` },
      { q: `${copy.primaryKeyword} için hangi bilgiler daha iyi sonuç verir?`, a: `Amaç, hedef kitle, ton, format, kullanılacak kelimeler ve kaçınılacak noktaları ekleyin. ${keywordList} gibi yakın konular doğru niyette kalmayı sağlar.` },
      { q: 'Sonucu doğrudan kullanabilir miyim?', a: `Önce gözden geçirin. Doğruluk, özgünlük, okunabilirlik ve platform ya da proje kurallarını kontrol edin. ${safetyNote}` },
    ];
  }
  if (localized.language === 'id') {
    return [
      { q: `Untuk apa ${copy.h1}?`, a: `${copy.intro} Alat ini membantu menyiapkan ${copy.primaryKeyword}, membandingkan beberapa opsi, lalu menyesuaikan draf untuk kebutuhan nyata.` },
      { q: `Detail apa yang membuat ${copy.primaryKeyword} lebih baik?`, a: `Tambahkan tujuan, audiens, nada, format, kata yang harus dipakai, dan batasan proyek. Topik terkait seperti ${keywordList} membantu menjaga maksud yang sama.` },
      { q: 'Bolehkah hasilnya langsung dipakai?', a: `Sebaiknya ditinjau dulu. Periksa akurasi, orisinalitas, keterbacaan, serta aturan platform atau proyek. ${safetyNote}` },
    ];
  }
  if (localized.language === 'sv') {
    return [
      { q: `Vad anvands ${copy.h1} till?`, a: `${copy.intro} Verktyget hjalper dig att forbereda ${copy.primaryKeyword}, jamfora flera alternativ och anpassa ett utkast till verklig anvandning.` },
      { q: `Vilka detaljer ger battre ${copy.primaryKeyword}?`, a: `Lagg till syfte, malgrupp, ton, format, ord som ska anvandas och begransningar. Naraliggande amnen som ${keywordList} hjalper till att halla samma sokavsikt.` },
      { q: 'Kan jag anvanda resultatet direkt?', a: `Granska det forst. Kontrollera noggrannhet, originalitet, lasbarhet och regler for plattformen eller projektet. ${safetyNote}` },
    ];
  }
  if (localized.language === 'ms') {
    return [
      { q: `Untuk apa ${copy.h1}?`, a: `${copy.intro} Alat ini membantu menyediakan ${copy.primaryKeyword}, membandingkan beberapa pilihan dan menyesuaikan draf untuk kegunaan sebenar.` },
      { q: `Butiran apa yang menambah baik ${copy.primaryKeyword}?`, a: `Tambah tujuan, audiens, nada, format, perkataan yang perlu digunakan dan had projek. Topik berkaitan seperti ${keywordList} membantu mengekalkan maksud yang sama.` },
      { q: 'Boleh guna hasil terus?', a: `Semak dahulu. Periksa ketepatan, keaslian, kebolehbacaan serta peraturan platform atau projek. ${safetyNote}` },
    ];
  }
  if (localized.language === 'bg') {
    return [
      { q: `За какво служи ${copy.h1}?`, a: `${copy.intro} Инструментът помага да подготвите ${copy.primaryKeyword}, да сравните варианти и да адаптирате чернова към реална употреба.` },
      { q: `Какви детайли подобряват ${copy.primaryKeyword}?`, a: `Добавете цел, аудитория, тон, формат, желани думи и ограничения на проекта. Близки теми като ${keywordList} помагат да се запази същият интент.` },
      { q: 'Мога ли да използвам резултата директно?', a: `Първо го прегледайте. Проверете точност, оригиналност, четимост и правилата на платформата или проекта. ${safetyNote}` },
    ];
  }
  if (localized.language === 'hi') {
    return [
      { q: `${copy.h1} किस काम आता है?`, a: `${copy.intro} यह ${copy.primaryKeyword} तैयार करने, विकल्पों की तुलना करने और मसौदे को वास्तविक उपयोग के लिए ढालने में मदद करता है.` },
      { q: `${copy.primaryKeyword} के लिए कौन सी जानकारी बेहतर है?`, a: `उद्देश्य, दर्शक, टोन, फॉर्मेट, जरूरी शब्द और सीमाएं जोड़ें. ${keywordList} जैसे जुड़े विषय सही इरादा बनाए रखते हैं.` },
      { q: 'क्या परिणाम सीधे इस्तेमाल कर सकता हूं?', a: `पहले समीक्षा करें. सटीकता, मौलिकता, पठनीयता और प्लेटफॉर्म या परियोजना नियम जांचें. ${safetyNote}` },
    ];
  }
  if (localized.language === 'bn') {
    return [
      { q: `${copy.h1} কী কাজে লাগে?`, a: `${copy.intro} এটি ${copy.primaryKeyword} প্রস্তুত করতে, বিকল্প তুলনা করতে এবং খসড়া বাস্তব ব্যবহারের জন্য মানাতে সাহায্য করে.` },
      { q: `${copy.primaryKeyword} ভালো করতে কী তথ্য দেব?`, a: `উদ্দেশ্য, অডিয়েন্স, টোন, ফরম্যাট, দরকারি শব্দ ও সীমা যোগ করুন. ${keywordList} ধরনের সম্পর্কিত বিষয় একই উদ্দেশ্য ধরে রাখে.` },
      { q: 'ফলাফল সরাসরি ব্যবহার করা যাবে?', a: `আগে রিভিউ করুন. নির্ভুলতা, মৌলিকতা, পাঠযোগ্যতা এবং প্ল্যাটফর্ম বা প্রকল্পের নিয়ম যাচাই করুন. ${safetyNote}` },
    ];
  }
  if (localized.language === 'ja') {
    return [
      { q: `${copy.h1}は何に使えますか?`, a: `${copy.intro} ${copy.primaryKeyword}の下書きを作り、複数案を比較し、実際の用途に合わせて調整できます.` },
      { q: `${copy.primaryKeyword}を良くするには何を入力しますか?`, a: `目的、読者、トーン、形式、入れたい語句、避けたい条件を加えてください. ${keywordList}のような近いテーマは意図を保つ助けになります.` },
      { q: '結果をそのまま使えますか?', a: `まず確認してください. 正確性、独自性、読みやすさ、プラットフォームやプロジェクトのルールを確認します. ${safetyNote}` },
    ];
  }
  if (localized.language === 'ko') {
    return [
      { q: `${copy.h1}는 어디에 쓰나요?`, a: `${copy.intro} ${copy.primaryKeyword} 초안을 만들고 여러 옵션을 비교한 뒤 실제 용도에 맞게 조정할 수 있습니다.` },
      { q: `${copy.primaryKeyword} 결과를 좋게 하려면 무엇을 입력하나요?`, a: `목적, 대상, 어조, 형식, 포함할 단어와 제한 사항을 넣으세요. ${keywordList} 같은 관련 주제는 같은 의도를 유지하는 데 도움이 됩니다.` },
      { q: '결과를 바로 사용해도 되나요?', a: `먼저 검토하세요. 정확성, 독창성, 가독성, 플랫폼 또는 프로젝트 규칙을 확인하세요. ${safetyNote}` },
    ];
  }
  if (localized.language === 'ar') {
    return [
      { q: `ما فائدة ${copy.h1}?`, a: `${copy.intro} يساعدك على إعداد ${copy.primaryKeyword} ومقارنة الخيارات وتعديل المسودة لاستخدام حقيقي.` },
      { q: `ما التفاصيل التي تحسن ${copy.primaryKeyword}?`, a: `أضف الهدف والجمهور والنبرة والصيغة والكلمات المطلوبة والقيود. موضوعات قريبة مثل ${keywordList} تساعد على حفظ نفس القصد.` },
      { q: 'هل يمكن استخدام النتيجة مباشرة?', a: `راجعها أولا. تحقق من الدقة والأصالة والوضوح وقواعد المنصة أو المشروع. ${safetyNote}` },
    ];
  }
  return createSpanishFaqItems(localized);
}

export function createLocalizedGuide(tool: Tool, localized: LocalizedToolContent) {
  const copy = getLocalizedPageCopy(localized);
  const keywordList = copy.faqTopics.join(', ');
  const safetyNote = getLocalizedSafetyNote(localized);
  if (localized.language === 'fr') {
    return {
      howTo: [
        `Commencez par un mot, un texte ou une courte description liée à ${copy.primaryKeyword}.`,
        'Ajoutez le contexte utile : usage prévu, public, ton, format et mots à inclure ou à éviter.',
        'Générez plusieurs options, puis comparez clarté, naturel et adéquation avec l’objectif de la page.',
        'Relisez avant publication, surtout pour une marque, un profil, un site, du SEO ou un contenu commercial.',
      ],
      tips: [
        { title: 'Gardez une intention réelle', body: `Essayez des variantes proches comme ${keywordList}, sans changer le but de l’outil.` },
        { title: 'Respectez le même usage', body: `Utilisez ${copy.h1} pour le même besoin que ${tool.name}; ne lui demandez pas des fonctions qu’il n’offre pas.` },
        { title: 'Relisez avant de publier', body: safetyNote },
      ],
    };
  }
  if (localized.language === 'de') {
    return {
      howTo: [
        `Starte mit einem Wort, Text oder kurzen Briefing zu ${copy.primaryKeyword}.`,
        'Ergänze praktischen Kontext: Verwendungszweck, Zielgruppe, Ton, Format und Wörter, die enthalten oder vermieden werden sollen.',
        'Generiere mehrere Varianten und vergleiche sie nach Klarheit, Natürlichkeit und Passung zum Ziel.',
        'Bearbeite den Entwurf vor der Veröffentlichung, besonders bei Marken, Profilen, Websites, SEO-Inhalten oder Verkaufstexten.',
      ],
      tips: [
        { title: 'Nutze echte Suchintention', body: `Teste nahe Varianten wie ${keywordList}, aber bleib beim gleichen Zweck des Tools.` },
        { title: 'Bleib beim Tool-Zweck', body: `Nutze ${copy.h1} für denselben Zweck wie ${tool.name}; erzwinge keine Funktionen, die das Tool nicht bietet.` },
        { title: 'Vor dem Veröffentlichen prüfen', body: safetyNote },
      ],
    };
  }
  if (localized.language === 'pt') {
    return {
      howTo: [
        `Comece com uma palavra, texto ou breve descrição ligada a ${copy.primaryKeyword}.`,
        `Adicione contexto prático para ${copy.h1}: uso previsto, público, tom, formato e palavras que devem entrar ou ficar de fora.`,
        'Gere várias opções e compare clareza, naturalidade e alinhamento com o objetivo.',
        'Edite o rascunho antes de publicar, especialmente em marcas, perfis, sites, SEO ou conteúdo comercial.',
      ],
      tips: [
        { title: 'Use intenção real', body: `Teste variantes próximas como ${keywordList}, sem mudar o objetivo da ferramenta.` },
        { title: 'Mantenha o mesmo uso', body: `Use ${copy.h1} para a mesma necessidade de ${tool.name}; não force funções que ela não oferece.` },
        { title: 'Revise antes de publicar', body: safetyNote },
      ],
    };
  }
  if (localized.language === 'it') {
    return {
      howTo: [
        `Inizia con una parola, un testo o una breve descrizione legata a ${copy.primaryKeyword}.`,
        'Aggiungi contesto pratico: uso previsto, pubblico, tono, formato e parole da includere o evitare.',
        "Genera più opzioni e confronta chiarezza, naturalezza e aderenza all'obiettivo.",
        'Modifica la bozza prima di pubblicare, soprattutto per brand, profili, siti, SEO o contenuti commerciali.',
      ],
      tips: [
        { title: 'Usa un intento reale', body: `Prova varianti vicine come ${keywordList}, senza cambiare lo scopo dello strumento.` },
        { title: 'Resta nello stesso uso', body: `Usa ${copy.h1} per la stessa esigenza di ${tool.name}; non forzare funzioni che non offre.` },
        { title: 'Rivedi prima di pubblicare', body: safetyNote },
      ],
    };
  }
  if (localized.language === 'pl') {
    return {
      howTo: [
        `Zacznij od słowa, tekstu lub krótkiego opisu związanego z ${copy.primaryKeyword}.`,
        'Dodaj praktyczny kontekst: cel, odbiorców, ton, format oraz słowa do uwzględnienia lub uniknięcia.',
        'Wygeneruj kilka opcji i porównaj jasność, naturalność oraz dopasowanie do celu.',
        'Edytuj szkic przed publikacją, zwłaszcza przy markach, profilach, stronach, SEO lub treściach komercyjnych.',
      ],
      tips: [
        { title: 'Użyj realnej intencji', body: `Testuj bliskie warianty, takie jak ${keywordList}, bez zmiany celu narzędzia.` },
        { title: 'Trzymaj się zastosowania', body: `Użyj ${copy.h1} do tej samej potrzeby co ${tool.name}; nie wymuszaj funkcji, których narzędzie nie oferuje.` },
        { title: 'Sprawdź przed publikacją', body: safetyNote },
      ],
    };
  }
  if (localized.language === 'ru') {
    return {
      howTo: [
        `Начните со слова, текста или короткого описания, связанного с ${copy.primaryKeyword}.`,
        `Добавьте практический контекст для ${copy.h1}: цель, аудиторию, тон, формат и слова, которые нужно включить или исключить.`,
        'Создайте несколько вариантов и сравните их по ясности, естественности и соответствию задаче.',
        'Отредактируйте черновик перед публикацией, особенно для брендов, профилей, сайтов, SEO или коммерческих текстов.',
      ],
      tips: [
        { title: 'Сохраняйте реальный интент', body: `Пробуйте близкие варианты вроде ${keywordList}, не меняя назначение инструмента.` },
        { title: 'Используйте по назначению', body: `Применяйте ${copy.h1} для той же задачи, что и ${tool.name}; не требуйте функций, которых инструмент не предлагает.` },
        { title: 'Проверяйте перед публикацией', body: safetyNote },
      ],
    };
  }
  if (localized.language === 'tr') {
    return {
      howTo: [
        `${copy.primaryKeyword} ile ilgili bir kelime, metin veya kısa açıklama ile başlayın.`,
        `${copy.h1} için amaç, hedef kitle, ton, format ve dahil edilecek ya da kaçınılacak kelimeleri ekleyin.`,
        'Birden fazla seçenek üretin; açıklık, doğallık ve hedefe uygunluk açısından karşılaştırın.',
        'Özellikle marka, profil, site, SEO veya ticari metinlerde yayımlamadan önce taslağı düzenleyin.',
      ],
      tips: [
        { title: 'Gerçek arama niyetini koruyun', body: `${keywordList} gibi yakın varyasyonları deneyin, ancak aracın amacını değiştirmeyin.` },
        { title: 'Aynı kullanımda kalın', body: `${copy.h1} aracını ${tool.name} ile aynı ihtiyaç için kullanın; sunmadığı işlevleri zorlamayın.` },
        { title: 'Yayımlamadan önce kontrol edin', body: safetyNote },
      ],
    };
  }
  if (localized.language === 'id') {
    return {
      howTo: [
        `Mulai dengan kata, teks, atau deskripsi singkat yang terkait dengan ${copy.primaryKeyword}.`,
        `Tambahkan konteks praktis untuk ${copy.h1}: tujuan, audiens, nada, format, dan kata yang perlu disertakan atau dihindari.`,
        'Buat beberapa opsi lalu bandingkan kejelasan, kewajaran bahasa, dan kecocokannya dengan tujuan.',
        'Edit draf sebelum dipublikasikan, terutama untuk merek, profil, situs, SEO, atau konten komersial.',
      ],
      tips: [
        { title: 'Jaga maksud pencarian', body: `Coba variasi dekat seperti ${keywordList}, tetapi tetap pada fungsi utama alat.` },
        { title: 'Gunakan sesuai tujuan', body: `Pakai ${copy.h1} untuk kebutuhan yang sama dengan ${tool.name}; jangan memaksakan fungsi yang tidak tersedia.` },
        { title: 'Tinjau sebelum publikasi', body: safetyNote },
      ],
    };
  }
  if (localized.language === 'sv') {
    return {
      howTo: [
        `Borja med ett ord, en text eller en kort beskrivning kopplad till ${copy.primaryKeyword}.`,
        `Lagg till praktiskt sammanhang for ${copy.h1}: syfte, malgrupp, ton, format och ord som ska tas med eller undvikas.`,
        'Skapa flera alternativ och jamfor tydlighet, naturlighet och hur val de passar malet.',
        'Redigera utkastet fore publicering, sarskilt for varumarken, profiler, webbplatser, SEO eller kommersiell text.',
      ],
      tips: [
        { title: 'Hall verklig sokavsikt', body: `Prova narliggande varianter som ${keywordList}, utan att andra verktygets syfte.` },
        { title: 'Anvand ratt verktyg', body: `Anvand ${copy.h1} for samma behov som ${tool.name}; tvinga inte fram funktioner som verktyget inte erbjuder.` },
        { title: 'Granska fore publicering', body: safetyNote },
      ],
    };
  }
  if (localized.language === 'ms') {
    return {
      howTo: [
        `Mulakan dengan perkataan, teks atau penerangan ringkas yang berkaitan dengan ${copy.primaryKeyword}.`,
        `Tambah konteks praktikal untuk ${copy.h1}: tujuan, audiens, nada, format dan perkataan yang perlu disertakan atau dielakkan.`,
        'Jana beberapa pilihan, kemudian bandingkan kejelasan, kelancaran bahasa dan kesesuaian dengan matlamat.',
        'Edit draf sebelum diterbitkan, terutama untuk jenama, profil, laman web, SEO atau kandungan komersial.',
      ],
      tips: [
        { title: 'Kekalkan maksud carian', body: `Cuba variasi berkaitan seperti ${keywordList}, tetapi jangan ubah tujuan alat.` },
        { title: 'Guna mengikut tujuan', body: `Gunakan ${copy.h1} untuk keperluan yang sama seperti ${tool.name}; jangan paksa fungsi yang tidak tersedia.` },
        { title: 'Semak sebelum terbit', body: safetyNote },
      ],
    };
  }
  if (localized.language === 'bg') {
    return {
      howTo: [
        `Започнете с дума, текст или кратко описание, свързано с ${copy.primaryKeyword}.`,
        `Добавете практически контекст за ${copy.h1}: цел, аудитория, тон, формат и думи, които да се включат или избегнат.`,
        'Генерирайте няколко варианта и ги сравнете по яснота, естественост и съответствие с целта.',
        'Редактирайте черновата преди публикуване, особено за марки, профили, сайтове, SEO или търговски текстове.',
      ],
      tips: [
        { title: 'Запазете реалния интент', body: `Пробвайте близки варианти като ${keywordList}, без да променяте целта на инструмента.` },
        { title: 'Използвайте по предназначение', body: `Използвайте ${copy.h1} за същата нужда като ${tool.name}; не изисквайте функции, които инструментът не предлага.` },
        { title: 'Проверете преди публикуване', body: safetyNote },
      ],
    };
  }
  if (localized.language === 'hi') {
    return {
      howTo: [`${copy.primaryKeyword} से जुड़ा शब्द, टेक्स्ट या छोटा विवरण लिखें.`, `${copy.h1} के लिए उद्देश्य, दर्शक, टोन, फॉर्मेट और शामिल या हटाने वाले शब्द जोड़ें.`, 'कई विकल्प बनाएं और स्पष्टता, स्वाभाविकता और लक्ष्य से मेल की तुलना करें.', 'प्रकाशन से पहले मसौदे को संपादित करें, खासकर ब्रांड, प्रोफाइल, साइट, SEO या व्यावसायिक टेक्स्ट में.'],
      tips: [{ title: 'सर्च इरादा बनाए रखें', body: `${keywordList} जैसे नजदीकी विकल्प आजमाएं, लेकिन टूल का उद्देश्य न बदलें.` }, { title: 'सही उपयोग में रखें', body: `${copy.h1} को ${tool.name} जैसी जरूरत के लिए ही उपयोग करें; उपलब्ध न होने वाले काम न मांगें.` }, { title: 'प्रकाशन से पहले जांचें', body: safetyNote }],
    };
  }
  if (localized.language === 'bn') {
    return {
      howTo: [`${copy.primaryKeyword} সম্পর্কিত একটি শব্দ, টেক্সট বা ছোট বর্ণনা দিয়ে শুরু করুন.`, `${copy.h1} এর জন্য উদ্দেশ্য, অডিয়েন্স, টোন, ফরম্যাট এবং রাখতে বা এড়াতে হবে এমন শব্দ যোগ করুন.`, 'কয়েকটি বিকল্প তৈরি করুন এবং স্পষ্টতা, স্বাভাবিকতা ও লক্ষ্যের সঙ্গে মিল তুলনা করুন.', 'প্রকাশের আগে খসড়া সম্পাদনা করুন, বিশেষ করে ব্র্যান্ড, প্রোফাইল, সাইট, SEO বা বাণিজ্যিক টেক্সটে.'],
      tips: [{ title: 'সার্চ উদ্দেশ্য ধরে রাখুন', body: `${keywordList} ধরনের কাছাকাছি ভ্যারিয়েশন চেষ্টা করুন, কিন্তু টুলের উদ্দেশ্য বদলাবেন না.` }, { title: 'সঠিক ব্যবহারে থাকুন', body: `${copy.h1} ${tool.name} এর একই প্রয়োজনের জন্য ব্যবহার করুন; টুলে নেই এমন কাজ চাপাবেন না.` }, { title: 'প্রকাশের আগে যাচাই করুন', body: safetyNote }],
    };
  }
  if (localized.language === 'ja') {
    return {
      howTo: [`${copy.primaryKeyword}に関係する語句、テキスト、短い説明から始めます.`, `${copy.h1}に目的、読者、トーン、形式、入れる語句や避ける条件を加えます.`, '複数案を生成し、明確さ、自然さ、目的との一致を比較します.', 'ブランド、プロフィール、サイト、SEO、商用文では公開前に下書きを編集してください.'],
      tips: [{ title: '検索意図を保つ', body: `${keywordList}のような近い表現を試しつつ、ツールの目的は変えないでください.` }, { title: '同じ用途で使う', body: `${copy.h1}は${tool.name}と同じ目的で使い、提供していない機能を求めないでください.` }, { title: '公開前に確認', body: safetyNote }],
    };
  }
  if (localized.language === 'ko') {
    return {
      howTo: [`${copy.primaryKeyword}와 관련된 단어, 텍스트 또는 짧은 설명으로 시작하세요.`, `${copy.h1}에 목적, 대상, 어조, 형식, 포함하거나 피할 단어를 추가하세요.`, '여러 옵션을 만들고 명확성, 자연스러움, 목표 적합성을 비교하세요.', '브랜드, 프로필, 사이트, SEO 또는 상업용 문구라면 게시 전 초안을 편집하세요.'],
      tips: [{ title: '검색 의도 유지', body: `${keywordList} 같은 가까운 변형을 시도하되 도구의 목적은 바꾸지 마세요.` }, { title: '같은 용도로 사용', body: `${copy.h1}는 ${tool.name}와 같은 필요에 사용하고 제공하지 않는 기능을 강요하지 마세요.` }, { title: '게시 전 검토', body: safetyNote }],
    };
  }
  if (localized.language === 'ar') {
    return {
      howTo: [`ابدأ بكلمة أو نص أو وصف قصير مرتبط بـ ${copy.primaryKeyword}.`, `أضف سياقا عمليا لـ ${copy.h1}: الهدف والجمهور والنبرة والصيغة والكلمات المطلوبة أو المستبعدة.`, 'أنشئ عدة خيارات وقارن الوضوح والطبيعية ومدى ملاءمة الهدف.', 'حرر المسودة قبل النشر، خاصة للعلامات والملفات والمواقع والسيو والنصوص التجارية.'],
      tips: [{ title: 'حافظ على قصد البحث', body: `جرب صيغ قريبة مثل ${keywordList} من دون تغيير هدف الأداة.` }, { title: 'استخدمه للغرض نفسه', body: `استخدم ${copy.h1} للحاجة نفسها مثل ${tool.name}; لا تطلب وظائف لا تقدمها الأداة.` }, { title: 'راجع قبل النشر', body: safetyNote }],
    };
  }
  return createSpanishGuide(tool, localized);
}

export function getLocalizedSafetyNote(localized: LocalizedToolContent): string {
  const note = localized.riskSafetyNote.toLowerCase();
  if (localized.language === 'fr') {
    if (note.includes('trademark') || note.includes('marca')) return 'Vérifiez disponibilité, droits de marque et usage commercial avant de publier ou d’enregistrer le résultat.';
    if (note.includes('platform') || note.includes('ranking') || note.includes('virality') || note.includes('followers')) return 'Aucune disponibilité, portée, positionnement ou performance de plateforme n’est garanti; vérifiez règles et pertinence avant usage.';
    if (note.includes('ip') || note.includes('franchise') || note.includes('protected') || note.includes('celebrity')) return 'Évitez de copier des noms protégés, personnages reconnaissables, marques, franchises ou identités réelles.';
    if (note.includes('legal') || note.includes('technical') || note.includes('robots') || note.includes('seo')) return 'Relisez avec un regard technique ou professionnel avant de l’implémenter sur un site réel.';
    if (note.includes('accessibility') || note.includes('compatibility') || note.includes('readability')) return 'Vérifiez lisibilité, accessibilité et compatibilité sur la plateforme où le texte sera collé.';
    if (note.includes('factual') || note.includes('compliance') || note.includes('policy') || note.includes('medical')) return 'Vérifiez les faits, politiques, conformité et contexte avant publication ou décision.';
    if (note.includes('sensitive')) return 'Évitez de saisir des informations sensibles et relisez le contexte avant utilisation.';
    if (note.includes('offensive') || note.includes('misleading') || note.includes('deceptive')) return 'Évitez les usages offensants, exclusifs, trompeurs ou les promesses impossibles à justifier.';
    return 'Utilisez le résultat comme brouillon et relisez exactitude, contexte, originalité et règles applicables avant publication.';
  }
  if (localized.language === 'de') {
    if (note.includes('trademark') || note.includes('marca')) return 'Prüfe Verfügbarkeit, Markenrechte und kommerzielle Nutzung, bevor du das Ergebnis veröffentlichst oder registrierst.';
    if (note.includes('platform') || note.includes('ranking') || note.includes('virality') || note.includes('followers')) return 'Es gibt keine Garantie für Verfügbarkeit, Reichweite, Rankings oder Plattform-Ergebnisse; prüfe Regeln und Relevanz vor der Nutzung.';
    if (note.includes('ip') || note.includes('franchise') || note.includes('protected') || note.includes('celebrity')) return 'Kopiere keine geschützten Namen, erkennbaren Figuren, Marken, Franchises oder realen Identitäten.';
    if (note.includes('legal') || note.includes('technical') || note.includes('robots') || note.includes('seo')) return 'Prüfe das Ergebnis fachlich oder technisch, bevor du es auf einer echten Website einsetzt.';
    if (note.includes('accessibility') || note.includes('compatibility') || note.includes('readability')) return 'Prüfe Lesbarkeit, Barrierefreiheit und Kompatibilität auf der Plattform, auf der du den Text einfügst.';
    if (note.includes('factual') || note.includes('compliance') || note.includes('policy') || note.includes('medical')) return 'Prüfe Fakten, Richtlinien, Compliance und Kontext, bevor du veröffentlichst oder Entscheidungen triffst.';
    if (note.includes('sensitive')) return 'Gib keine sensiblen Informationen ein und prüfe den Kontext vor der Nutzung.';
    if (note.includes('offensive') || note.includes('misleading') || note.includes('deceptive')) return 'Vermeide beleidigende, ausgrenzende, irreführende oder unbelegte Versprechen.';
    return 'Nutze das Ergebnis als Entwurf und prüfe Genauigkeit, Kontext, Originalität und geltende Regeln vor der Veröffentlichung.';
  }
  if (localized.language === 'pt') {
    if (note.includes('trademark') || note.includes('marca')) return 'Verifique disponibilidade, marca registrada e uso comercial antes de publicar ou registrar o resultado.';
    if (note.includes('platform') || note.includes('ranking') || note.includes('virality') || note.includes('followers')) return 'Não há garantia de disponibilidade, alcance, rankings ou resultados em plataformas; confira regras e relevância antes de usar.';
    if (note.includes('ip') || note.includes('franchise') || note.includes('protected') || note.includes('celebrity')) return 'Evite copiar nomes protegidos, personagens reconhecíveis, marcas, franquias ou identidades reais.';
    if (note.includes('legal') || note.includes('technical') || note.includes('robots') || note.includes('seo')) return 'Revise com critério técnico ou profissional antes de implementar em um site real.';
    if (note.includes('accessibility') || note.includes('compatibility') || note.includes('readability')) return 'Confira legibilidade, acessibilidade e compatibilidade na plataforma onde o texto será usado.';
    if (note.includes('factual') || note.includes('compliance') || note.includes('policy') || note.includes('medical')) return 'Verifique fatos, políticas, conformidade e contexto antes de publicar ou decidir.';
    return 'Use o resultado como rascunho e revise exatidão, contexto, originalidade e regras aplicáveis antes de publicar.';
  }
  if (localized.language === 'it') {
    if (note.includes('trademark') || note.includes('marca')) return 'Verifica disponibilità, diritti di marchio e uso commerciale prima di pubblicare o registrare il risultato.';
    if (note.includes('platform') || note.includes('ranking') || note.includes('virality') || note.includes('followers')) return "Non garantisce disponibilità, copertura, ranking o risultati di piattaforma; controlla regole e pertinenza prima dell'uso.";
    if (note.includes('ip') || note.includes('franchise') || note.includes('protected') || note.includes('celebrity')) return 'Evita di copiare nomi protetti, personaggi riconoscibili, marchi, franchise o identità reali.';
    if (note.includes('legal') || note.includes('technical') || note.includes('robots') || note.includes('seo')) return 'Rivedi con criterio tecnico o professionale prima di implementarlo su un sito reale.';
    if (note.includes('accessibility') || note.includes('compatibility') || note.includes('readability')) return 'Controlla leggibilità, accessibilità e compatibilità sulla piattaforma in cui userai il testo.';
    if (note.includes('factual') || note.includes('compliance') || note.includes('policy') || note.includes('medical')) return 'Verifica fatti, policy, conformità e contesto prima di pubblicare o prendere decisioni.';
    return 'Usa il risultato come bozza e rivedi accuratezza, contesto, originalità e regole applicabili prima di pubblicare.';
  }
  if (localized.language === 'pl') {
    if (note.includes('trademark') || note.includes('marca')) return 'Sprawdź dostępność, prawa do znaków towarowych i użycie komercyjne przed publikacją lub rejestracją wyniku.';
    if (note.includes('platform') || note.includes('ranking') || note.includes('virality') || note.includes('followers')) return 'Nie ma gwarancji dostępności, zasięgu, rankingów ani wyników na platformach; sprawdź zasady i trafność przed użyciem.';
    if (note.includes('ip') || note.includes('franchise') || note.includes('protected') || note.includes('celebrity')) return 'Unikaj kopiowania chronionych nazw, rozpoznawalnych postaci, marek, franczyz lub prawdziwych tożsamości.';
    if (note.includes('legal') || note.includes('technical') || note.includes('robots') || note.includes('seo')) return 'Sprawdź wynik technicznie lub profesjonalnie przed wdrożeniem na prawdziwej stronie.';
    if (note.includes('accessibility') || note.includes('compatibility') || note.includes('readability')) return 'Sprawdź czytelność, dostępność i zgodność z platformą, na której tekst będzie użyty.';
    if (note.includes('factual') || note.includes('compliance') || note.includes('policy') || note.includes('medical')) return 'Zweryfikuj fakty, zasady, zgodność i kontekst przed publikacją lub decyzją.';
    return 'Traktuj wynik jako szkic i sprawdź dokładność, kontekst, oryginalność oraz obowiązujące zasady przed publikacją.';
  }
  if (localized.language === 'ru') {
    if (note.includes('trademark') || note.includes('marca')) return 'Проверьте доступность, товарные знаки и коммерческое использование перед публикацией или регистрацией результата.';
    if (note.includes('platform') || note.includes('ranking') || note.includes('virality') || note.includes('followers')) return 'Доступность, охват, позиции и результаты на платформах не гарантируются; проверьте правила и релевантность перед использованием.';
    if (note.includes('ip') || note.includes('franchise') || note.includes('protected') || note.includes('celebrity')) return 'Не копируйте защищенные названия, узнаваемых персонажей, бренды, франшизы или реальные личности.';
    if (note.includes('legal') || note.includes('technical') || note.includes('robots') || note.includes('seo')) return 'Проверьте результат технически или профессионально перед внедрением на реальном сайте.';
    if (note.includes('accessibility') || note.includes('compatibility') || note.includes('readability')) return 'Проверьте читаемость, доступность и совместимость на платформе, где будет использоваться текст.';
    if (note.includes('factual') || note.includes('compliance') || note.includes('policy') || note.includes('medical')) return 'Проверьте факты, правила, соответствие требованиям и контекст перед публикацией или решением.';
    return 'Используйте результат как черновик и проверяйте точность, контекст, оригинальность и применимые правила перед публикацией.';
  }
  if (localized.language === 'tr') {
    if (note.includes('trademark') || note.includes('marca')) return 'Sonucu yayımlamadan veya kaydetmeden önce uygunluğu, marka haklarını ve ticari kullanımı kontrol edin.';
    if (note.includes('platform') || note.includes('ranking') || note.includes('virality') || note.includes('followers')) return 'Uygunluk, erişim, sıralama veya platform sonuçları garanti edilmez; kullanmadan önce kuralları ve alaka düzeyini kontrol edin.';
    if (note.includes('ip') || note.includes('franchise') || note.includes('protected') || note.includes('celebrity')) return 'Korunan adları, tanınabilir karakterleri, markaları, franchise öğelerini veya gerçek kimlikleri kopyalamayın.';
    if (note.includes('legal') || note.includes('technical') || note.includes('robots') || note.includes('seo')) return 'Gerçek bir sitede uygulamadan önce sonucu teknik veya profesyonel açıdan gözden geçirin.';
    if (note.includes('accessibility') || note.includes('compatibility') || note.includes('readability')) return 'Metnin kullanılacağı platformda okunabilirliği, erişilebilirliği ve uyumluluğu kontrol edin.';
    if (note.includes('factual') || note.includes('compliance') || note.includes('policy') || note.includes('medical')) return 'Yayımlamadan veya karar vermeden önce gerçekleri, politikaları, uyumluluğu ve bağlamı doğrulayın.';
    return 'Sonucu taslak olarak kullanın; yayımlamadan önce doğruluk, bağlam, özgünlük ve geçerli kuralları kontrol edin.';
  }
  if (localized.language === 'id') {
    if (note.includes('trademark') || note.includes('marca')) return 'Periksa ketersediaan, hak merek dagang, dan penggunaan komersial sebelum memublikasikan atau mendaftarkan hasil.';
    if (note.includes('platform') || note.includes('ranking') || note.includes('virality') || note.includes('followers')) return 'Ketersediaan, jangkauan, peringkat, atau hasil platform tidak dijamin; periksa aturan dan relevansi sebelum digunakan.';
    if (note.includes('ip') || note.includes('franchise') || note.includes('protected') || note.includes('celebrity')) return 'Hindari menyalin nama yang dilindungi, karakter yang mudah dikenali, merek, waralaba, atau identitas nyata.';
    if (note.includes('legal') || note.includes('technical') || note.includes('robots') || note.includes('seo')) return 'Tinjau secara teknis atau profesional sebelum menerapkannya di situs nyata.';
    if (note.includes('accessibility') || note.includes('compatibility') || note.includes('readability')) return 'Periksa keterbacaan, aksesibilitas, dan kompatibilitas di platform tempat teks akan digunakan.';
    if (note.includes('factual') || note.includes('compliance') || note.includes('policy') || note.includes('medical')) return 'Verifikasi fakta, kebijakan, kepatuhan, dan konteks sebelum publikasi atau pengambilan keputusan.';
    return 'Gunakan hasil sebagai draf dan tinjau akurasi, konteks, orisinalitas, serta aturan yang berlaku sebelum dipublikasikan.';
  }
  if (localized.language === 'sv') {
    if (note.includes('trademark') || note.includes('marca')) return 'Kontrollera tillganglighet, varumarkesrattigheter och kommersiell anvandning innan du publicerar eller registrerar resultatet.';
    if (note.includes('platform') || note.includes('ranking') || note.includes('virality') || note.includes('followers')) return 'Tillganglighet, rackvidd, ranking eller plattformsresultat garanteras inte; kontrollera regler och relevans fore anvandning.';
    if (note.includes('ip') || note.includes('franchise') || note.includes('protected') || note.includes('celebrity')) return 'Undvik att kopiera skyddade namn, igenkannbara figurer, varumarken, franchiser eller verkliga identiteter.';
    if (note.includes('legal') || note.includes('technical') || note.includes('robots') || note.includes('seo')) return 'Granska resultatet tekniskt eller professionellt innan det anvands pa en verklig webbplats.';
    if (note.includes('accessibility') || note.includes('compatibility') || note.includes('readability')) return 'Kontrollera lasbarhet, tillganglighet och kompatibilitet pa plattformen dar texten ska anvandas.';
    if (note.includes('factual') || note.includes('compliance') || note.includes('policy') || note.includes('medical')) return 'Kontrollera fakta, policyer, efterlevnad och sammanhang fore publicering eller beslut.';
    return 'Anvand resultatet som ett utkast och granska noggrannhet, sammanhang, originalitet och gallande regler fore publicering.';
  }
  if (localized.language === 'ms') {
    if (note.includes('trademark') || note.includes('marca')) return 'Semak ketersediaan, hak tanda dagangan dan penggunaan komersial sebelum menerbitkan atau mendaftarkan hasil.';
    if (note.includes('platform') || note.includes('ranking') || note.includes('virality') || note.includes('followers')) return 'Ketersediaan, capaian, ranking atau hasil platform tidak dijamin; semak peraturan dan kaitan sebelum digunakan.';
    if (note.includes('ip') || note.includes('franchise') || note.includes('protected') || note.includes('celebrity')) return 'Elakkan menyalin nama dilindungi, watak dikenali, jenama, francais atau identiti sebenar.';
    if (note.includes('legal') || note.includes('technical') || note.includes('robots') || note.includes('seo')) return 'Semak secara teknikal atau profesional sebelum digunakan pada laman sebenar.';
    if (note.includes('accessibility') || note.includes('compatibility') || note.includes('readability')) return 'Semak kebolehbacaan, aksesibiliti dan keserasian pada platform tempat teks akan digunakan.';
    if (note.includes('factual') || note.includes('compliance') || note.includes('policy') || note.includes('medical')) return 'Sahkan fakta, polisi, pematuhan dan konteks sebelum penerbitan atau keputusan.';
    return 'Gunakan hasil sebagai draf dan semak ketepatan, konteks, keaslian serta peraturan yang terpakai sebelum diterbitkan.';
  }
  if (localized.language === 'bg') {
    if (note.includes('trademark') || note.includes('marca')) return 'Проверете наличност, права върху търговски марки и търговска употреба преди публикуване или регистрация.';
    if (note.includes('platform') || note.includes('ranking') || note.includes('virality') || note.includes('followers')) return 'Наличност, обхват, класиране или резултати в платформи не са гарантирани; проверете правила и релевантност преди употреба.';
    if (note.includes('ip') || note.includes('franchise') || note.includes('protected') || note.includes('celebrity')) return 'Избягвайте копиране на защитени имена, разпознаваеми герои, марки, франчайзи или реални самоличности.';
    if (note.includes('legal') || note.includes('technical') || note.includes('robots') || note.includes('seo')) return 'Прегледайте резултата технически или професионално преди внедряване в реален сайт.';
    if (note.includes('accessibility') || note.includes('compatibility') || note.includes('readability')) return 'Проверете четимост, достъпност и съвместимост в платформата, където текстът ще се използва.';
    if (note.includes('factual') || note.includes('compliance') || note.includes('policy') || note.includes('medical')) return 'Проверете факти, политики, съответствие и контекст преди публикуване или решение.';
    return 'Използвайте резултата като чернова и проверете точност, контекст, оригиналност и приложими правила преди публикуване.';
  }
  if (localized.language === 'hi') {
    if (note.includes('trademark') || note.includes('marca')) return 'प्रकाशित या रजिस्टर करने से पहले उपलब्धता, ट्रेडमार्क अधिकार और व्यावसायिक उपयोग जांचें.';
    if (note.includes('platform') || note.includes('ranking') || note.includes('virality') || note.includes('followers')) return 'उपलब्धता, पहुंच, रैंकिंग या प्लेटफॉर्म परिणामों की गारंटी नहीं है; उपयोग से पहले नियम और प्रासंगिकता जांचें.';
    if (note.includes('ip') || note.includes('franchise') || note.includes('protected') || note.includes('celebrity')) return 'सुरक्षित नामों, पहचाने जाने वाले पात्रों, ब्रांडों, फ्रेंचाइज़ या वास्तविक पहचानों की कॉपी से बचें.';
    if (note.includes('legal') || note.includes('technical') || note.includes('robots') || note.includes('seo')) return 'वास्तविक साइट पर लागू करने से पहले तकनीकी या पेशेवर समीक्षा करें.';
    if (note.includes('accessibility') || note.includes('compatibility') || note.includes('readability')) return 'जहां टेक्स्ट उपयोग होगा वहां पठनीयता, पहुंच और संगतता जांचें.';
    return 'परिणाम को मसौदा मानें और प्रकाशित करने से पहले सटीकता, संदर्भ, मौलिकता और लागू नियम जांचें.';
  }
  if (localized.language === 'bn') {
    if (note.includes('trademark') || note.includes('marca')) return 'প্রকাশ বা রেজিস্টারের আগে প্রাপ্যতা, ট্রেডমার্ক অধিকার ও বাণিজ্যিক ব্যবহার যাচাই করুন.';
    if (note.includes('platform') || note.includes('ranking') || note.includes('virality') || note.includes('followers')) return 'প্রাপ্যতা, রিচ, র‍্যাঙ্কিং বা প্ল্যাটফর্ম ফলাফলের নিশ্চয়তা নেই; ব্যবহারের আগে নিয়ম ও প্রাসঙ্গিকতা যাচাই করুন.';
    if (note.includes('ip') || note.includes('franchise') || note.includes('protected') || note.includes('celebrity')) return 'সুরক্ষিত নাম, পরিচিত চরিত্র, ব্র্যান্ড, ফ্র্যাঞ্চাইজি বা বাস্তব পরিচয় কপি করা এড়ান.';
    if (note.includes('legal') || note.includes('technical') || note.includes('robots') || note.includes('seo')) return 'বাস্তব সাইটে প্রয়োগের আগে টেকনিক্যাল বা পেশাদারভাবে রিভিউ করুন.';
    if (note.includes('accessibility') || note.includes('compatibility') || note.includes('readability')) return 'যে প্ল্যাটফর্মে টেক্সট ব্যবহার হবে সেখানে পাঠযোগ্যতা, অ্যাক্সেসিবিলিটি ও সামঞ্জস্য যাচাই করুন.';
    return 'ফলাফলকে খসড়া হিসেবে ব্যবহার করুন এবং প্রকাশের আগে নির্ভুলতা, প্রসঙ্গ, মৌলিকতা ও প্রযোজ্য নিয়ম যাচাই করুন.';
  }
  if (localized.language === 'ja') {
    if (note.includes('trademark') || note.includes('marca')) return '公開または登録前に、利用可能性、商標権、商用利用を確認してください.';
    if (note.includes('platform') || note.includes('ranking') || note.includes('virality') || note.includes('followers')) return '利用可能性、リーチ、順位、プラットフォーム上の成果は保証されません。使用前に規則と関連性を確認してください.';
    if (note.includes('ip') || note.includes('franchise') || note.includes('protected') || note.includes('celebrity')) return '保護された名前、認識可能なキャラクター、ブランド、フランチャイズ、実在の人物の模倣は避けてください.';
    if (note.includes('legal') || note.includes('technical') || note.includes('robots') || note.includes('seo')) return '実際のサイトに実装する前に、技術的または専門的に確認してください.';
    if (note.includes('accessibility') || note.includes('compatibility') || note.includes('readability')) return '使用するプラットフォームで読みやすさ、アクセシビリティ、互換性を確認してください.';
    return '結果は下書きとして使い、公開前に正確性、文脈、独自性、適用ルールを確認してください.';
  }
  if (localized.language === 'ko') {
    if (note.includes('trademark') || note.includes('marca')) return '게시하거나 등록하기 전에 사용 가능성, 상표권, 상업적 사용을 확인하세요.';
    if (note.includes('platform') || note.includes('ranking') || note.includes('virality') || note.includes('followers')) return '사용 가능성, 도달, 순위 또는 플랫폼 결과는 보장되지 않습니다. 사용 전 규칙과 관련성을 확인하세요.';
    if (note.includes('ip') || note.includes('franchise') || note.includes('protected') || note.includes('celebrity')) return '보호된 이름, 알아볼 수 있는 캐릭터, 브랜드, 프랜차이즈 또는 실제 신원 복사를 피하세요.';
    if (note.includes('legal') || note.includes('technical') || note.includes('robots') || note.includes('seo')) return '실제 사이트에 적용하기 전에 기술적 또는 전문적으로 검토하세요.';
    if (note.includes('accessibility') || note.includes('compatibility') || note.includes('readability')) return '텍스트를 사용할 플랫폼에서 가독성, 접근성, 호환성을 확인하세요.';
    return '결과를 초안으로 사용하고 게시 전 정확성, 맥락, 독창성, 적용 규칙을 확인하세요.';
  }
  if (localized.language === 'ar') {
    if (note.includes('trademark') || note.includes('marca')) return 'تحقق من التوفر وحقوق العلامة والاستخدام التجاري قبل النشر أو التسجيل.';
    if (note.includes('platform') || note.includes('ranking') || note.includes('virality') || note.includes('followers')) return 'لا يوجد ضمان للتوفر أو الوصول أو الترتيب أو نتائج المنصة؛ راجع القواعد والملاءمة قبل الاستخدام.';
    if (note.includes('ip') || note.includes('franchise') || note.includes('protected') || note.includes('celebrity')) return 'تجنب نسخ الأسماء المحمية أو الشخصيات المعروفة أو العلامات أو الامتيازات أو الهويات الحقيقية.';
    if (note.includes('legal') || note.includes('technical') || note.includes('robots') || note.includes('seo')) return 'راجع النتيجة تقنيا أو مهنيا قبل تطبيقها على موقع حقيقي.';
    if (note.includes('accessibility') || note.includes('compatibility') || note.includes('readability')) return 'تحقق من الوضوح وإمكانية الوصول والتوافق في المنصة التي سيستخدم فيها النص.';
    return 'استخدم النتيجة كمسودة وراجع الدقة والسياق والأصالة والقواعد المطبقة قبل النشر.';
  }
  return getSpanishSafetyNote(localized);
}

export function getSpanishSafetyNote(localized: LocalizedToolContent): string {
  const note = localized.riskSafetyNote.toLowerCase();
  if (note.includes('trademark') || note.includes('marca')) {
    return 'Comprueba disponibilidad, derechos de marca y uso comercial antes de publicar o registrar el resultado.';
  }
  if (note.includes('platform') || note.includes('ranking') || note.includes('virality') || note.includes('followers')) {
    return 'No garantiza disponibilidad, alcance, posicionamiento ni resultados en plataformas; verifica reglas y relevancia antes de usarlo.';
  }
  if (note.includes('ip') || note.includes('franchise') || note.includes('protected') || note.includes('celebrity')) {
    return 'Evita copiar nombres protegidos, personajes reconocibles, marcas, franquicias o identidades reales.';
  }
  if (note.includes('legal') || note.includes('technical') || note.includes('robots') || note.includes('seo')) {
    return 'Revisa el resultado con criterio técnico o profesional antes de implementarlo en un sitio real.';
  }
  if (note.includes('accessibility') || note.includes('compatibility') || note.includes('readability')) {
    return 'Comprueba legibilidad, accesibilidad y compatibilidad en la plataforma donde vas a pegar el texto.';
  }
  if (note.includes('factual') || note.includes('compliance') || note.includes('policy') || note.includes('medical')) {
    return 'Verifica hechos, políticas, cumplimiento y contexto antes de publicar o tomar decisiones.';
  }
  if (note.includes('sensitive')) {
    return 'Evita introducir información sensible y revisa el contexto antes de usar el resultado.';
  }
  if (note.includes('offensive') || note.includes('misleading') || note.includes('deceptive')) {
    return 'Evita usos ofensivos, excluyentes, engañosos o promesas que no puedas respaldar.';
  }
  return 'Usa el resultado como borrador y revisa exactitud, contexto, originalidad y reglas aplicables antes de publicarlo.';
}

const spanishUiLabelMap: Record<string, string> = {
  'All Ideas': 'Todas las ideas',
  'All Names': 'Todos los nombres',
  'All Groups': 'Todos los grupos',
  'Balanced': 'Equilibrado',
  'Brand': 'Marca',
  'Buyers / Reviewers': 'Compradores / revisores',
  'Character': 'Personaje',
  'Clean': 'Claro',
  'Creative': 'Creativo',
  'Educational': 'Educativo',
  'Enabled': 'Activado',
  'Friendly': 'Cercano',
  'How-To': 'Cómo hacerlo',
  'Best': 'Mejores opciones',
  'Comparison': 'Comparación',
  'Include Year': 'Incluir año',
  'Intent Group': 'Grupo de intención',
  'Idea Type': 'Tipo de idea',
  'Name Group': 'Grupo de nombres',
  'Fantasy Character': 'Personaje de fantasía',
  'Kingdom': 'Reino',
  'Elf': 'Elfo',
  'Dragon': 'Dragón',
  'Tavern': 'Taberna',
  'Artifact': 'Artefacto',
  'Epic': 'Épico',
  'Mysterious': 'Misterioso',
  'Elegant': 'Elegante',
  'Search Intent': 'Intención de búsqueda',
  'Article Length': 'Longitud del artículo',
  'Informational': 'Informativo',
  'Commercial': 'Comercial',
  'Standard': 'Estándar',
  'Long': 'Largo',
  'Listicle': 'Lista',
  'Long-Tail': 'Cola larga',
  'Name Type': 'Tipo de nombre',
  'Name Generators': 'Generadores de nombres',
  'Text Generators': 'Generadores de texto',
  'Writing Generators': 'Generadores de escritura',
  'SEO Generators': 'Generadores SEO',
  'Business Generators': 'Generadores para negocios',
  'Creative Generators': 'Generadores creativos',
  'AI Text & Writing Generators': 'Generadores de escritura y texto',
  'Gaming & Fantasy Generators': 'Generadores de fantasia y juegos',
  'Safety Note': 'Nota de seguridad',
  'Standard Site': 'Sitio estándar',
  'Output Section': 'Seccion de salida',
  'Personal': 'Personal',
  'Polished': 'Pulido',
  'Professional': 'Profesional',
  'Result Count': 'Cantidad de resultados',
  'Review': 'Resena',
  'Short': 'Corto',
  'Social': 'Social',
  'Style': 'Estilo',
  'Tag Strategy': 'Estrategia de etiquetas',
  'Tone': 'Tono',
  'Tutorial': 'Tutorial',
  'Unique': 'Unico',
  'Video Format': 'Formato de video',
  'Vlog': 'Vlog',
  'converter': 'conversor',
  'random combo': 'combinación aleatoria',
  'template': 'plantilla',
  'text transform': 'transformación de texto',
  'utility': 'utilidad',
  'visual': 'visual',
};

export function getSpanishUiLabel(label: string): string {
  return polishSpanishText(spanishUiLabelMap[label] || label);
}

const frenchUiLabelMap: Record<string, string> = {
  'Result Count': 'Nombre de résultats',
  'Name Type': 'Type de nom',
  'Name Style': 'Style du nom',
  'Character Style': 'Style de personnage',
  'Show Format': 'Format de l’émission',
  'Video Format': 'Format vidéo',
  'Tag Strategy': 'Stratégie de tags',
  'Audience Fit': 'Public visé',
  'Metadata Match': 'Cohérence des métadonnées',
  'Tags Per Section': 'Tags par section',
  'Draft Group': 'Groupe de brouillons',
  'Italic Style': 'Style italique',
  'Reverse Mode': 'Mode d’inversion',
  'Preserve Lines': 'Conserver les lignes',
  Focus: 'Priorité',
  Mode: 'Mode',
  Sentences: 'Phrases',
  Length: 'Longueur',
  'Reading WPM': 'Mots lus par minute',
  'Speaking WPM': 'Mots parlés par minute',
  'Keyword Frequency': 'Fréquence du mot-clé',
  'Include Taglines': 'Inclure des baselines',
  Purpose: 'Objectif',
  Intro: 'Introduction',
  Explainer: 'Explication',
  Persuasive: 'Persuasif',
  Product: 'Produit',
  Academic: 'Académique',
  Audience: 'Public',
  General: 'Général',
  Students: 'Étudiants',
  Customers: 'Clients',
  Professionals: 'Professionnels',
  'Point of View': 'Point de vue',
  'Third Person': 'Troisième personne',
  'First Person': 'Première personne',
  'Second Person': 'Deuxième personne',
  Structure: 'Structure',
  'Topic / Support / Close': 'Sujet / appui / conclusion',
  'Problem / Solution': 'Problème / solution',
  'Claim / Evidence': 'Affirmation / preuve',
  'Compare / Contrast': 'Comparer / opposer',
  'Include Outline': 'Inclure un plan',
  'Prompt Group': 'Groupe de prompts',
  'Story Seed': 'Départ d’histoire',
  'Scene Starter': 'Départ de scène',
  'Revision Challenge': 'Défi de révision',
  Difficulty: 'Difficulté',
  Beginner: 'Débutant',
  Intermediate: 'Intermédiaire',
  Advanced: 'Avancé',
  Hopeful: 'Optimiste',
  Mysterious: 'Mystérieux',
  Tense: 'Tendu',
  Reflective: 'Réflexif',
  'Length Target': 'Longueur visée',
  Scene: 'Scène',
  Flash: 'Texte court',
  Chapter: 'Chapitre',
  Essay: 'Essai',
  'Include First Line': 'Inclure une première ligne',
  Tone: 'Ton',
  Balanced: 'Équilibré',
  Polished: 'Soigné',
  Creative: 'Créatif',
  Friendly: 'Accessible',
  Enabled: 'Activé',
  Brand: 'Marque',
  Character: 'Personnage',
  Clean: 'Clair',
  Educational: 'Éducatif',
  Professional: 'Professionnel',
  Personal: 'Personnel',
  Short: 'Court',
  Long: 'Long',
  Medium: 'Moyen',
  Social: 'Social',
  Style: 'Style',
  'All Styles': 'Tous les styles',
  'All Modes': 'Tous les modes',
  'All Groups': 'Tous les groupes',
  'All Ideas': 'Toutes les idées',
  'All Text': 'Tout le texte',
  Hero: 'Héros',
  Villain: 'Antagoniste',
  Modern: 'Moderne',
  Fantasy: 'Fantasy',
  Classic: 'Classique',
  Tutorial: 'Tutoriel',
  Review: 'Avis',
  Vlog: 'Vlog',
  Shorts: 'Formats courts',
  Niche: 'Niche',
  'Long-Tail': 'Longue traîne',
  'General Viewers': 'Public général',
  Beginners: 'Débutants',
  'Advanced Viewers': 'Public avancé',
  'Buyers / Reviewers': 'Acheteurs / critiques',
  Creators: 'Créateurs',
  'Title + Description': 'Titre + description',
  'Thumbnail Promise': 'Promesse de miniature',
  'Spoken Content': 'Contenu parlé',
  'Channel Series': 'Série de chaîne',
  'Core Tags': 'Tags principaux',
  'Niche Tags': 'Tags de niche',
  'Caption Support': 'Aide pour légende',
  'Review Checklist': 'Liste de vérification',
  'Safety Note': 'Note de sécurité',
  Interview: 'Entretien',
  'Solo Expert': 'Expert solo',
  Narrative: 'Narratif',
  'Niche News': 'Actualité de niche',
  Brandable: 'Mémorisable',
  'Simple Title Case': 'Casse de titre simple',
  'Developer Cases': 'Formats développeur',
  'Character Reverse': 'Inversion des caractères',
  'Word Reverse': 'Inversion des mots',
  'Upside Down': 'Tête en bas',
  'Mirror Note': 'Texte miroir',
  'Italic Serif': 'Italique avec empattement',
  'Bold Italic': 'Gras italique',
  Caption: 'Légende',
  Fallback: 'Solution de secours',
  Funny: 'Drôle',
  'Writing Prompt': 'Idée d’écriture',
  'Random Mix': 'Mélange aléatoire',
  Simple: 'Simple',
  utility: 'utilitaire',
  converter: 'convertisseur',
  template: 'modèle',
  'random combo': 'combinaison aléatoire',
  'text transform': 'transformation de texte',
};

const germanUiLabelMap: Record<string, string> = {
  'Result Count': 'Anzahl der Ergebnisse',
  'Name Type': 'Namenstyp',
  'Name Style': 'Namensstil',
  'Character Style': 'Figurenstil',
  'Show Format': 'Sendungsformat',
  'Video Format': 'Videoformat',
  'Tag Strategy': 'Tag-Strategie',
  'Audience Fit': 'Zielgruppe',
  'Metadata Match': 'Metadaten-Abgleich',
  'Tags Per Section': 'Tags pro Abschnitt',
  'Draft Group': 'Entwurfsgruppe',
  'Italic Style': 'Kursivstil',
  'Reverse Mode': 'Umkehrmodus',
  'Preserve Lines': 'Zeilen beibehalten',
  Focus: 'Fokus',
  Mode: 'Modus',
  Sentences: 'Sätze',
  Length: 'Länge',
  'Reading WPM': 'Lesewörter pro Minute',
  'Speaking WPM': 'Sprechwörter pro Minute',
  'Keyword Frequency': 'Keyword-Häufigkeit',
  'Include Taglines': 'Claims einschließen',
  Purpose: 'Zweck',
  Intro: 'Einleitung',
  Explainer: 'Erklärung',
  Persuasive: 'Überzeugend',
  Product: 'Produkt',
  Academic: 'Akademisch',
  Audience: 'Publikum',
  General: 'Allgemein',
  Students: 'Studierende',
  Customers: 'Kunden',
  Professionals: 'Fachleute',
  'Point of View': 'Erzählperspektive',
  'Third Person': 'Dritte Person',
  'First Person': 'Erste Person',
  'Second Person': 'Zweite Person',
  Structure: 'Struktur',
  'Topic / Support / Close': 'Thema / Beleg / Abschluss',
  'Problem / Solution': 'Problem / Lösung',
  'Claim / Evidence': 'These / Beleg',
  'Compare / Contrast': 'Vergleich / Gegensatz',
  'Include Outline': 'Gliederung einschließen',
  'Prompt Group': 'Prompt-Gruppe',
  'Story Seed': 'Story-Idee',
  'Scene Starter': 'Szenenanfang',
  'Revision Challenge': 'Überarbeitungsaufgabe',
  Difficulty: 'Schwierigkeit',
  Beginner: 'Einsteiger',
  Intermediate: 'Mittelstufe',
  Advanced: 'Fortgeschritten',
  Hopeful: 'Hoffnungsvoll',
  Mysterious: 'Geheimnisvoll',
  Tense: 'Spannungsvoll',
  Reflective: 'Reflektierend',
  'Length Target': 'Ziellänge',
  Scene: 'Szene',
  Flash: 'Kurztext',
  Chapter: 'Kapitel',
  Essay: 'Essay',
  'Include First Line': 'Erste Zeile einschließen',
  Tone: 'Ton',
  Balanced: 'Ausgewogen',
  Polished: 'Ausgearbeitet',
  Creative: 'Kreativ',
  Friendly: 'Freundlich',
  Enabled: 'Aktiviert',
  Brand: 'Marke',
  Character: 'Figur',
  Clean: 'Klar',
  Educational: 'Lehrreich',
  Professional: 'Professionell',
  Personal: 'Persönlich',
  Short: 'Kurz',
  Long: 'Lang',
  Medium: 'Mittel',
  Social: 'Social',
  Style: 'Stil',
  'All Styles': 'Alle Stile',
  'All Modes': 'Alle Modi',
  'All Groups': 'Alle Gruppen',
  'All Ideas': 'Alle Ideen',
  'All Text': 'Gesamter Text',
  Hero: 'Held',
  Villain: 'Gegenspieler',
  Modern: 'Modern',
  Fantasy: 'Fantasy',
  Classic: 'Klassisch',
  Tutorial: 'Tutorial',
  Review: 'Rezension',
  Vlog: 'Vlog',
  Shorts: 'Shorts',
  Niche: 'Nische',
  'Long-Tail': 'Longtail',
  'General Viewers': 'Allgemeines Publikum',
  Beginners: 'Einsteiger',
  'Advanced Viewers': 'Fortgeschrittene',
  'Buyers / Reviewers': 'Käufer / Reviewer',
  Creators: 'Creator',
  'Title + Description': 'Titel + Beschreibung',
  'Thumbnail Promise': 'Thumbnail-Versprechen',
  'Spoken Content': 'Gesprochener Inhalt',
  'Channel Series': 'Kanalserie',
  'Core Tags': 'Kern-Tags',
  'Niche Tags': 'Nischen-Tags',
  'Caption Support': 'Unterstützung für Captions',
  'Review Checklist': 'Prüfliste',
  'Safety Note': 'Sicherheitshinweis',
  Interview: 'Interview',
  'Solo Expert': 'Solo-Experte',
  Narrative: 'Erzählformat',
  'Niche News': 'Nischennachrichten',
  Brandable: 'Markenfähig',
  'Simple Title Case': 'Einfache Titelschreibung',
  'Developer Cases': 'Entwickler-Schreibweisen',
  'Character Reverse': 'Zeichen umkehren',
  'Word Reverse': 'Wörter umkehren',
  'Upside Down': 'Auf den Kopf gestellt',
  'Mirror Note': 'Spiegeltext',
  'Italic Serif': 'Kursive Serifenschrift',
  'Bold Italic': 'Fett kursiv',
  Caption: 'Caption',
  Fallback: 'Fallback',
  Funny: 'Lustig',
  'Writing Prompt': 'Schreibimpuls',
  'Random Mix': 'Zufallsmix',
  Simple: 'Einfach',
  utility: 'Dienstprogramm',
  converter: 'Konverter',
  template: 'Vorlage',
  'random combo': 'Zufallskombination',
  'text transform': 'Textumwandlung',
};

export function getLocalizedUiLabel(label: string, language: LocalizedLanguageCode): string {
  if (language === 'fr') return polishFrenchText(frenchUiLabelMap[label] || label);
  if (language === 'de') return polishGermanText(germanUiLabelMap[label] || label);
  if (language !== 'es') return label;
  return getSpanishUiLabel(label);
}

const spanishHubCopy: Record<string, { title: string; description: string }> = {
  'name-generators': {
    title: 'Generadores de nombres',
    description: 'Explora generadores para nombres de personas, personajes, marcas, equipos, proyectos y mundos creativos.',
  },
  'text-generators': {
    title: 'Generadores de texto',
    description: 'Convierte, estiliza y revisa texto para publicaciones, perfiles, borradores y contenido rápido.',
  },
  'writing-generators': {
    title: 'Generadores de escritura',
    description: 'Crea esquemas, frases, párrafos e ideas de escritura que puedas revisar y adaptar.',
  },
  'seo-generators': {
    title: 'Generadores SEO',
    description: 'Prepara borradores de títulos, metadatos, etiquetas y contenido SEO sin prometer rankings.',
  },
  'business-generators': {
    title: 'Generadores para negocios',
    description: 'Busca ideas para nombres, productos, dominios, marcas y textos comerciales con revisión previa.',
  },
  'creative-generators': {
    title: 'Generadores creativos',
    description: 'Encuentra ideas para historias, mundos, nombres, prompts y proyectos creativos originales.',
  },
};

export function getSpanishHubCopy(slug: string, fallbackTitle: string, fallbackDescription: string) {
  return spanishHubCopy[slug] || { title: fallbackTitle, description: fallbackDescription };
}

const frenchHubCopy: Record<string, { title: string; description: string }> = {
  'name-generators': { title: 'Générateurs de noms', description: 'Explorez des générateurs pour prénoms, personnages, marques, équipes, projets et univers créatifs.' },
  'text-generators': { title: 'Générateurs de texte', description: 'Transformez, stylisez et relisez du texte pour publications, profils, brouillons et contenus rapides.' },
  'writing-generators': { title: 'Générateurs d’écriture', description: 'Créez des plans, phrases, paragraphes et idées d’écriture à relire et adapter.' },
  'seo-generators': { title: 'Générateurs SEO', description: 'Préparez des brouillons de titres, métadonnées, balises et contenus SEO sans promesse de classement.' },
  'business-generators': { title: 'Générateurs pour entreprises', description: 'Trouvez des idées pour noms, produits, domaines, marques et textes commerciaux avec relecture.' },
  'creative-generators': { title: 'Générateurs créatifs', description: 'Trouvez des idées pour histoires, mondes, noms, prompts et projets créatifs originaux.' },
};

const germanHubCopy: Record<string, { title: string; description: string }> = {
  'name-generators': { title: 'Namensgeneratoren', description: 'Entdecke Generatoren für Namen, Figuren, Marken, Teams, Projekte und kreative Welten.' },
  'text-generators': { title: 'Textgeneratoren', description: 'Wandle, gestalte und prüfe Text für Beiträge, Profile, Entwürfe und schnelle Inhalte.' },
  'writing-generators': { title: 'Schreibgeneratoren', description: 'Erstelle Gliederungen, Sätze, Absätze und Schreibideen, die du prüfen und anpassen kannst.' },
  'seo-generators': { title: 'SEO-Generatoren', description: 'Bereite Entwürfe für Titel, Metadaten, Tags und SEO-Inhalte vor, ohne Rankings zu versprechen.' },
  'business-generators': { title: 'Business-Generatoren', description: 'Finde Ideen für Namen, Produkte, Domains, Marken und Verkaufstexte mit anschließender Prüfung.' },
  'creative-generators': { title: 'Kreative Generatoren', description: 'Entdecke Ideen für Geschichten, Welten, Namen, Prompts und originelle kreative Projekte.' },
};

const portugueseHubCopy: Record<string, { title: string; description: string }> = {
  'name-generators': { title: 'Geradores de nomes', description: 'Explore geradores para nomes, personagens, marcas, equipes, projetos e mundos criativos.' },
  'text-generators': { title: 'Geradores de texto', description: 'Transforme, estilize e revise texto para publicacoes, perfis, rascunhos e conteudos rapidos.' },
  'writing-generators': { title: 'Geradores de escrita', description: 'Crie estruturas, frases, paragrafos e ideias de escrita para revisar e adaptar.' },
  'seo-generators': { title: 'Geradores SEO', description: 'Prepare rascunhos de titulos, metadados, tags e conteudo SEO sem prometer rankings.' },
  'business-generators': { title: 'Geradores para negocios', description: 'Encontre ideias para nomes, produtos, dominios, marcas e textos comerciais com revisao.' },
  'creative-generators': { title: 'Geradores criativos', description: 'Encontre ideias para historias, mundos, nomes, prompts e projetos criativos originais.' },
};

const italianHubCopy: Record<string, { title: string; description: string }> = {
  'name-generators': { title: 'Generatori di nomi', description: 'Esplora generatori per nomi, personaggi, brand, squadre, progetti e mondi creativi.' },
  'text-generators': { title: 'Generatori di testo', description: 'Trasforma, stilizza e rivedi testo per post, profili, bozze e contenuti rapidi.' },
  'writing-generators': { title: 'Generatori di scrittura', description: 'Crea scalette, frasi, paragrafi e idee di scrittura da rivedere e adattare.' },
  'seo-generators': { title: 'Generatori SEO', description: 'Prepara bozze di titoli, metadati, tag e contenuti SEO senza promettere ranking.' },
  'business-generators': { title: 'Generatori business', description: 'Trova idee per nomi, prodotti, domini, brand e testi commerciali con revisione.' },
  'creative-generators': { title: 'Generatori creativi', description: 'Trova idee per storie, mondi, nomi, prompt e progetti creativi originali.' },
};

const polishHubCopy: Record<string, { title: string; description: string }> = {
  'name-generators': { title: 'Generatory nazw', description: 'Przegladaj generatory nazw, postaci, marek, zespolow, projektow i kreatywnych swiatow.' },
  'text-generators': { title: 'Generatory tekstu', description: 'Przeksztalcaj, stylizuj i sprawdzaj tekst do postow, profili, szkicow i szybkich tresci.' },
  'writing-generators': { title: 'Generatory pisania', description: 'Tworz konspekty, zdania, akapity i pomysly pisarskie do sprawdzenia i adaptacji.' },
  'seo-generators': { title: 'Generatory SEO', description: 'Przygotuj szkice tytulow, metadanych, tagow i tresci SEO bez obietnic rankingow.' },
  'business-generators': { title: 'Generatory biznesowe', description: 'Znajdz pomysly na nazwy, produkty, domeny, marki i teksty komercyjne z kontrola.' },
  'creative-generators': { title: 'Generatory kreatywne', description: 'Znajdz pomysly na historie, swiaty, nazwy, prompty i oryginalne projekty kreatywne.' },
};

export function getLocalizedHubCopy(slug: string, fallbackTitle: string, fallbackDescription: string, language: LocalizedLanguageCode) {
  if (language === 'fr') return frenchHubCopy[slug] || { title: fallbackTitle, description: fallbackDescription };
  if (language === 'de') return germanHubCopy[slug] || { title: fallbackTitle, description: fallbackDescription };
  if (language === 'pt') return portugueseHubCopy[slug] || { title: fallbackTitle, description: fallbackDescription };
  if (language === 'it') return italianHubCopy[slug] || { title: fallbackTitle, description: fallbackDescription };
  if (language === 'pl') return polishHubCopy[slug] || { title: fallbackTitle, description: fallbackDescription };
  if (language === 'sv' || language === 'ms' || language === 'bg' || language === 'hi' || language === 'bn' || language === 'ja' || language === 'ko' || language === 'ar') return { title: fallbackTitle, description: fallbackDescription };
  return getSpanishHubCopy(slug, fallbackTitle, fallbackDescription);
}
