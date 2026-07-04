import type { LocalizedToolContent } from './localization';
import { additionalLocalizedPilotToolData } from './localization-pilot-extra-data';
import { rolloutB01LocalizedToolData } from './localization-rollout-b01-data';
import { rolloutB02LocalizedToolData } from './localization-rollout-b02-data';
import { rolloutB03LocalizedToolData } from './localization-rollout-b03-data';
import { rolloutB04LocalizedToolData } from './localization-rollout-b04-data';
import { rolloutB05LocalizedToolData } from './localization-rollout-b05-data';
import { rolloutB06LocalizedToolData } from './localization-rollout-b06-data';
import { rolloutB07LocalizedToolData } from './localization-rollout-b07-data';
import { rolloutB08LocalizedToolData } from './localization-rollout-b08-data';

export const localizedPilotToolData: LocalizedToolContent[] = [
  {
    "canonicalToolId": "name-generator",
    "language": "es",
    "primaryKeyword": "generador de nombres",
    "localizedSlug": "generador-de-nombres",
    "h1": "Generador de nombres",
    "metaTitle": "Generador de nombres gratis",
    "metaDescription": "Crea ideas de nombres claras para proyectos, personajes, marcas o listas personales con resultados faciles de revisar.",
    "intro": "Genera nombres en espanol con opciones amplias y revisa cada sugerencia antes de usarla en publico.",
    "faqTopics": [
      "como elegir un nombre",
      "nombres originales",
      "revisar disponibilidad"
    ],
    "searchIntentNote": "High same-intent utility query; Spanish users search directly for name ideas.",
    "riskSafetyNote": "Low risk; remind users to check trademarks and availability."
  },
  {
    "canonicalToolId": "name-generator",
    "language": "fr",
    "primaryKeyword": "generateur de noms",
    "localizedSlug": "generateur-de-noms",
    "h1": "Generateur de noms",
    "metaTitle": "Generateur de noms gratuit",
    "metaDescription": "Trouvez des idees de noms naturelles pour projets, personnages, marques ou listes personnelles.",
    "intro": "Generez des noms en francais puis verifiez le sens, la disponibilite et le contexte avant usage.",
    "faqTopics": [
      "choisir un nom",
      "noms originaux",
      "verifier un nom"
    ],
    "searchIntentNote": "Strong direct French generator intent.",
    "riskSafetyNote": "Low risk; include availability and trademark review note."
  },
  {
    "canonicalToolId": "name-generator",
    "language": "de",
    "primaryKeyword": "namensgenerator",
    "localizedSlug": "namensgenerator",
    "h1": "Namensgenerator",
    "metaTitle": "Namensgenerator kostenlos",
    "metaDescription": "Erstelle passende Namensideen fuer Projekte, Figuren, Marken oder persoenliche Listen.",
    "intro": "Der Generator liefert deutsche und international nutzbare Namensideen, die vor der Nutzung geprueft werden sollten.",
    "faqTopics": [
      "namen finden",
      "originelle namen",
      "verfuegbarkeit pruefen"
    ],
    "searchIntentNote": "German compound is the natural local head term.",
    "riskSafetyNote": "Low risk; advise trademark and domain checks."
  },
  {
    "canonicalToolId": "username-generator",
    "language": "es",
    "primaryKeyword": "generador de nombres de usuario",
    "localizedSlug": "generador-de-nombres-de-usuario",
    "h1": "Generador de nombres de usuario",
    "metaTitle": "Generador de nombres de usuario gratis",
    "metaDescription": "Encuentra ideas de usuario para perfiles, cuentas y proyectos sin prometer disponibilidad en plataformas.",
    "intro": "Crea nombres de usuario memorables y revisa si estan libres antes de registrarlos.",
    "faqTopics": [
      "usuarios originales",
      "usuario para redes",
      "comprobar disponibilidad"
    ],
    "searchIntentNote": "Local intent is account handle discovery, not identity claims.",
    "riskSafetyNote": "Avoid platform guarantees or impersonation angles."
  },
  {
    "canonicalToolId": "username-generator",
    "language": "fr",
    "primaryKeyword": "generateur de pseudo",
    "localizedSlug": "generateur-de-pseudo",
    "h1": "Generateur de pseudo",
    "metaTitle": "Generateur de pseudo gratuit",
    "metaDescription": "Creez des idees de pseudos pour comptes, jeux et profils avec une formulation simple a verifier.",
    "intro": "Trouvez un pseudo naturel et controlez sa disponibilite sur le service ou vous voulez l'utiliser.",
    "faqTopics": [
      "pseudo original",
      "pseudo court",
      "disponibilite du pseudo"
    ],
    "searchIntentNote": "French users commonly search pseudo rather than literal nom d'utilisateur.",
    "riskSafetyNote": "Avoid impersonation, platform-specific promises, or availability guarantees."
  },
  {
    "canonicalToolId": "username-generator",
    "language": "de",
    "primaryKeyword": "benutzernamen generator",
    "localizedSlug": "benutzernamen-generator",
    "h1": "Benutzernamen Generator",
    "metaTitle": "Benutzernamen Generator kostenlos",
    "metaDescription": "Finde Ideen fuer Benutzernamen fuer Profile, Konten und kreative Projekte.",
    "intro": "Erstelle Vorschlaege fuer Nutzernamen und pruefe anschliessend, ob sie noch frei sind.",
    "faqTopics": [
      "benutzername ideen",
      "username finden",
      "verfuegbarkeit pruefen"
    ],
    "searchIntentNote": "German query often mixes native term and generator.",
    "riskSafetyNote": "Avoid implying account availability or identity misuse."
  },
  {
    "canonicalToolId": "business-name-generator",
    "language": "es",
    "primaryKeyword": "generador de nombres para empresas",
    "localizedSlug": "generador-de-nombres-para-empresas",
    "h1": "Generador de nombres para empresas",
    "metaTitle": "Generador de nombres para empresas gratis",
    "metaDescription": "Genera ideas de nombres comerciales para nuevos negocios, servicios y proyectos profesionales.",
    "intro": "Explora nombres de empresa y valida significado, dominio y registro antes de decidir.",
    "faqTopics": [
      "nombre de empresa",
      "ideas de negocio",
      "comprobar marca"
    ],
    "searchIntentNote": "Same-intent business naming query with commercial research intent.",
    "riskSafetyNote": "Legal/trademark review required before use."
  },
  {
    "canonicalToolId": "business-name-generator",
    "language": "fr",
    "primaryKeyword": "generateur de nom d'entreprise",
    "localizedSlug": "generateur-de-nom-dentreprise",
    "h1": "Generateur de nom d'entreprise",
    "metaTitle": "Generateur de nom d'entreprise gratuit",
    "metaDescription": "Trouvez des idees de noms pour une entreprise, une activite ou un service professionnel.",
    "intro": "Generez des pistes de noms puis verifiez marque, domaine et contexte sectoriel.",
    "faqTopics": [
      "nom d'entreprise",
      "idee de nom commercial",
      "verifier une marque"
    ],
    "searchIntentNote": "Direct French business-name intent.",
    "riskSafetyNote": "Legal/trademark review required before use."
  },
  {
    "canonicalToolId": "business-name-generator",
    "language": "de",
    "primaryKeyword": "firmennamen generator",
    "localizedSlug": "firmennamen-generator",
    "h1": "Firmennamen Generator",
    "metaTitle": "Firmennamen Generator kostenlos",
    "metaDescription": "Erstelle Namensideen fuer Unternehmen, Dienstleistungen und neue Geschaeftsprojekte.",
    "intro": "Nutze die Vorschlaege als Startpunkt und pruefe Marke, Domain und rechtliche Nutzung.",
    "faqTopics": [
      "firmenname finden",
      "geschaeftsname ideen",
      "marke pruefen"
    ],
    "searchIntentNote": "German compound fits business naming demand.",
    "riskSafetyNote": "Legal/trademark review required before launch."
  },
  {
    "canonicalToolId": "fantasy-name-generator",
    "language": "es",
    "primaryKeyword": "generador de nombres de fantasia",
    "localizedSlug": "generador-de-nombres-de-fantasia",
    "h1": "Generador de nombres de fantasia",
    "metaTitle": "Generador de nombres de fantasia gratis",
    "metaDescription": "Crea nombres de fantasia para historias, juegos de rol y mundos imaginarios sin usar marcas existentes.",
    "intro": "Obtén ideas originales para personajes, lugares o especies ficticias y ajustalas al tono de tu mundo.",
    "faqTopics": [
      "nombres fantasticos",
      "nombres para rol",
      "nombres de mundos"
    ],
    "searchIntentNote": "Strong creative-writing and RPG intent.",
    "riskSafetyNote": "Avoid protected franchise names and explicit IP references."
  },
  {
    "canonicalToolId": "fantasy-name-generator",
    "language": "fr",
    "primaryKeyword": "generateur de noms fantasy",
    "localizedSlug": "generateur-de-noms-fantasy",
    "h1": "Generateur de noms fantasy",
    "metaTitle": "Generateur de noms fantasy gratuit",
    "metaDescription": "Creez des noms fantasy pour romans, jeux de role et univers imaginaires.",
    "intro": "Generez des pistes originales pour personnages, lieux ou peuples fictifs sans copier d'univers protege.",
    "faqTopics": [
      "noms fantasy",
      "noms jeu de role",
      "noms de mondes"
    ],
    "searchIntentNote": "French SERPs often use the English loanword fantasy.",
    "riskSafetyNote": "Avoid franchise/IP targeting."
  },
  {
    "canonicalToolId": "fantasy-name-generator",
    "language": "de",
    "primaryKeyword": "fantasy namensgenerator",
    "localizedSlug": "fantasy-namensgenerator",
    "h1": "Fantasy Namensgenerator",
    "metaTitle": "Fantasy Namensgenerator kostenlos",
    "metaDescription": "Erstelle Fantasy-Namen fuer Geschichten, Rollenspiele und eigene Welten.",
    "intro": "Nutze die Vorschlaege fuer Figuren, Orte oder Voelker und vermeide geschuetzte Universen.",
    "faqTopics": [
      "fantasy namen",
      "rollenspiel namen",
      "weltennamen"
    ],
    "searchIntentNote": "Natural German query keeps Fantasy as loanword.",
    "riskSafetyNote": "Avoid protected franchise names."
  },
  {
    "canonicalToolId": "character-name-generator",
    "language": "es",
    "primaryKeyword": "generador de nombres para personajes",
    "localizedSlug": "generador-de-nombres-para-personajes",
    "h1": "Generador de nombres para personajes",
    "metaTitle": "Generador de nombres para personajes gratis",
    "metaDescription": "Encuentra nombres para personajes de historias, juegos, guiones y proyectos creativos.",
    "intro": "Genera ideas coherentes para personajes y adapta cada nombre al genero, epoca y tono.",
    "faqTopics": [
      "nombres de personajes",
      "personajes para historias",
      "nombres para guion"
    ],
    "searchIntentNote": "Intent is creative character naming rather than real identities.",
    "riskSafetyNote": "Avoid celebrity, impersonation, or protected character claims."
  },
  {
    "canonicalToolId": "character-name-generator",
    "language": "fr",
    "primaryKeyword": "generateur de noms de personnages",
    "localizedSlug": "generateur-de-noms-de-personnages",
    "h1": "Generateur de noms de personnages",
    "metaTitle": "Generateur de noms de personnages gratuit",
    "metaDescription": "Trouvez des noms pour personnages de romans, jeux, scenarios et projets creatifs.",
    "intro": "Creez des idees de noms puis ajustez-les au genre, a l'epoque et au ton du recit.",
    "faqTopics": [
      "noms de personnages",
      "personnages roman",
      "noms scenario"
    ],
    "searchIntentNote": "Direct French creative-writing intent.",
    "riskSafetyNote": "Avoid celebrity or protected-character targeting."
  },
  {
    "canonicalToolId": "character-name-generator",
    "language": "de",
    "primaryKeyword": "charakter namensgenerator",
    "localizedSlug": "charakter-namensgenerator",
    "h1": "Charakter Namensgenerator",
    "metaTitle": "Charakter Namensgenerator kostenlos",
    "metaDescription": "Finde Namen fuer Figuren in Geschichten, Spielen, Drehbuechern und kreativen Projekten.",
    "intro": "Erstelle Figuren-Namen und passe sie an Genre, Zeit und Ton deiner Geschichte an.",
    "faqTopics": [
      "charakter namen",
      "figuren namen",
      "namen fuer roman"
    ],
    "searchIntentNote": "German users use Charakter/Figur; chosen term matches tool naming searches.",
    "riskSafetyNote": "Avoid celebrity or IP imitation."
  },
  {
    "canonicalToolId": "baby-name-generator",
    "language": "es",
    "primaryKeyword": "nombres de bebe",
    "localizedSlug": "nombres-de-bebe",
    "h1": "Generador de nombres de bebe",
    "metaTitle": "Nombres de bebe e ideas gratis",
    "metaDescription": "Explora ideas de nombres de bebe con un enfoque inspiracional, no medico ni legal.",
    "intro": "Encuentra nombres para considerar en familia y verifica significado, pronunciacion y registro local.",
    "faqTopics": [
      "nombres de nina",
      "nombres de nino",
      "significado de nombres"
    ],
    "searchIntentNote": "Searchers prefer names list intent over literal generator wording.",
    "riskSafetyNote": "Sensitive personal choice; avoid claims about legality or suitability."
  },
  {
    "canonicalToolId": "baby-name-generator",
    "language": "fr",
    "primaryKeyword": "generateur de prenoms",
    "localizedSlug": "generateur-de-prenoms",
    "h1": "Generateur de prenoms",
    "metaTitle": "Generateur de prenoms gratuit",
    "metaDescription": "Explorez des idees de prenoms pour bebe avec des suggestions faciles a comparer.",
    "intro": "Generez des prenoms possibles et verifiez sens, prononciation et usage local.",
    "faqTopics": [
      "prenoms fille",
      "prenoms garcon",
      "signification prenom"
    ],
    "searchIntentNote": "French local intent is prenoms, not noms de bebe.",
    "riskSafetyNote": "Sensitive personal choice; no legal or medical claims."
  },
  {
    "canonicalToolId": "baby-name-generator",
    "language": "de",
    "primaryKeyword": "babynamen generator",
    "localizedSlug": "babynamen-generator",
    "h1": "Babynamen Generator",
    "metaTitle": "Babynamen Generator kostenlos",
    "metaDescription": "Entdecke Ideen fuer Babynamen und vergleiche Klang, Bedeutung und Schreibweise.",
    "intro": "Nutze die Vorschlaege als Inspiration und pruefe Bedeutung sowie lokale Namensregeln.",
    "faqTopics": [
      "maedchennamen",
      "jungennamen",
      "bedeutung von namen"
    ],
    "searchIntentNote": "Natural German query combines Babynamen and Generator.",
    "riskSafetyNote": "Sensitive personal choice; avoid legal certainty."
  },
  {
    "canonicalToolId": "last-name-generator",
    "language": "es",
    "primaryKeyword": "generador de apellidos",
    "localizedSlug": "generador-de-apellidos",
    "h1": "Generador de apellidos",
    "metaTitle": "Generador de apellidos gratis",
    "metaDescription": "Crea apellidos ficticios o de estilo general para personajes, historias y ejemplos.",
    "intro": "Genera apellidos para uso creativo y revisa sensibilidad cultural cuando corresponda.",
    "faqTopics": [
      "apellidos para personajes",
      "apellidos ficticios",
      "apellidos originales"
    ],
    "searchIntentNote": "Intent is creative surname generation.",
    "riskSafetyNote": "Avoid implying real genealogy or ethnicity accuracy."
  },
  {
    "canonicalToolId": "last-name-generator",
    "language": "fr",
    "primaryKeyword": "generateur de noms de famille",
    "localizedSlug": "generateur-de-noms-de-famille",
    "h1": "Generateur de noms de famille",
    "metaTitle": "Generateur de noms de famille gratuit",
    "metaDescription": "Creez des noms de famille fictifs pour personnages, histoires et exemples.",
    "intro": "Generez des idees de patronymes et relisez-les pour eviter les stereotypes ou confusions.",
    "faqTopics": [
      "noms de famille fictifs",
      "patronymes",
      "noms personnages"
    ],
    "searchIntentNote": "Direct surname intent in French.",
    "riskSafetyNote": "Avoid genealogy, ancestry, or ethnic accuracy claims."
  },
  {
    "canonicalToolId": "last-name-generator",
    "language": "de",
    "primaryKeyword": "nachnamen generator",
    "localizedSlug": "nachnamen-generator",
    "h1": "Nachnamen Generator",
    "metaTitle": "Nachnamen Generator kostenlos",
    "metaDescription": "Erstelle Nachnamen fuer Figuren, Geschichten und Beispielprofile.",
    "intro": "Nutze die Vorschlaege kreativ und pruefe kulturelle Wirkung sowie Lesbarkeit.",
    "faqTopics": [
      "nachnamen fuer figuren",
      "fiktive nachnamen",
      "familiennamen ideen"
    ],
    "searchIntentNote": "German compound has same creative surname intent.",
    "riskSafetyNote": "Avoid ancestry or demographic claims."
  },
  {
    "canonicalToolId": "middle-name-generator",
    "language": "es",
    "primaryKeyword": "generador de segundo nombre",
    "localizedSlug": "generador-de-segundo-nombre",
    "h1": "Generador de segundo nombre",
    "metaTitle": "Generador de segundo nombre gratis",
    "metaDescription": "Encuentra ideas de segundo nombre para combinaciones personales, personajes o listas creativas.",
    "intro": "Genera opciones que encajen con nombre y apellido, y revisa pronunciacion y contexto.",
    "faqTopics": [
      "segundo nombre ideas",
      "nombres compuestos",
      "combinaciones de nombres"
    ],
    "searchIntentNote": "Spanish intent is narrower but aligned with middle-name selection.",
    "riskSafetyNote": "Sensitive personal naming; no legal promises."
  },
  {
    "canonicalToolId": "middle-name-generator",
    "language": "fr",
    "primaryKeyword": "generateur de deuxieme prenom",
    "localizedSlug": "generateur-de-deuxieme-prenom",
    "h1": "Generateur de deuxieme prenom",
    "metaTitle": "Generateur de deuxieme prenom gratuit",
    "metaDescription": "Trouvez des idees de deuxieme prenom pour combinaisons personnelles ou personnages.",
    "intro": "Comparez le rythme, le sens et la prononciation avant de retenir une option.",
    "faqTopics": [
      "deuxieme prenom",
      "prenoms composes",
      "idee prenom"
    ],
    "searchIntentNote": "French concept maps better to deuxieme prenom than middle name.",
    "riskSafetyNote": "Sensitive personal naming; no official advice."
  },
  {
    "canonicalToolId": "middle-name-generator",
    "language": "de",
    "primaryKeyword": "zweiter vorname generator",
    "localizedSlug": "zweiter-vorname-generator",
    "h1": "Zweiter Vorname Generator",
    "metaTitle": "Zweiter Vorname Generator kostenlos",
    "metaDescription": "Finde Ideen fuer einen zweiten Vornamen fuer Namenkombinationen und Figuren.",
    "intro": "Vergleiche Klang, Bedeutung und Schreibweise, bevor du eine Option verwendest.",
    "faqTopics": [
      "zweiter vorname",
      "doppelnamen",
      "vornamen kombinieren"
    ],
    "searchIntentNote": "German intent maps to second given name.",
    "riskSafetyNote": "Sensitive personal naming; no legal certainty."
  },
  {
    "canonicalToolId": "team-name-generator",
    "language": "es",
    "primaryKeyword": "generador de nombres de equipo",
    "localizedSlug": "generador-de-nombres-de-equipo",
    "h1": "Generador de nombres de equipo",
    "metaTitle": "Generador de nombres de equipo gratis",
    "metaDescription": "Crea nombres para equipos de trabajo, deportes recreativos, clases o grupos creativos.",
    "intro": "Obtén ideas de equipo faciles de recordar y revisa tono, inclusion y originalidad.",
    "faqTopics": [
      "nombres para equipos",
      "nombres de grupos",
      "nombres divertidos"
    ],
    "searchIntentNote": "Clear local team/group naming intent.",
    "riskSafetyNote": "Avoid offensive, exclusive, or misleading group names."
  },
  {
    "canonicalToolId": "team-name-generator",
    "language": "fr",
    "primaryKeyword": "generateur de noms d'equipe",
    "localizedSlug": "generateur-de-noms-dequipe",
    "h1": "Generateur de noms d'equipe",
    "metaTitle": "Generateur de noms d'equipe gratuit",
    "metaDescription": "Creez des noms d'equipe pour projets, loisirs, classes ou groupes creatifs.",
    "intro": "Trouvez une idee de nom d'equipe puis verifiez qu'elle reste claire et inclusive.",
    "faqTopics": [
      "noms d'equipe",
      "noms de groupe",
      "equipe originale"
    ],
    "searchIntentNote": "Direct French team name query.",
    "riskSafetyNote": "Avoid offensive or exclusionary wording."
  },
  {
    "canonicalToolId": "team-name-generator",
    "language": "de",
    "primaryKeyword": "teamnamen generator",
    "localizedSlug": "teamnamen-generator",
    "h1": "Teamnamen Generator",
    "metaTitle": "Teamnamen Generator kostenlos",
    "metaDescription": "Erstelle Namen fuer Teams, Gruppen, Freizeitprojekte oder Klassen.",
    "intro": "Finde kurze Teamnamen und pruefe Ton, Lesbarkeit und Inklusivitaet.",
    "faqTopics": [
      "teamnamen ideen",
      "gruppennamen",
      "lustige teamnamen"
    ],
    "searchIntentNote": "Natural German compound with broad team intent.",
    "riskSafetyNote": "Avoid offensive or exclusionary wording."
  },
  {
    "canonicalToolId": "domain-name-generator",
    "language": "es",
    "primaryKeyword": "generador de nombres de dominio",
    "localizedSlug": "generador-de-nombres-de-dominio",
    "h1": "Generador de nombres de dominio",
    "metaTitle": "Generador de nombres de dominio gratis",
    "metaDescription": "Genera ideas de dominios para sitios, productos y negocios, sin garantizar disponibilidad.",
    "intro": "Explora dominios posibles y comprueba disponibilidad, marca y extension antes de comprar.",
    "faqTopics": [
      "ideas de dominio",
      "dominio para web",
      "comprobar dominio"
    ],
    "searchIntentNote": "Commercial domain discovery intent.",
    "riskSafetyNote": "Do not promise domain availability or legal clearance."
  },
  {
    "canonicalToolId": "domain-name-generator",
    "language": "fr",
    "primaryKeyword": "generateur de nom de domaine",
    "localizedSlug": "generateur-de-nom-de-domaine",
    "h1": "Generateur de nom de domaine",
    "metaTitle": "Generateur de nom de domaine gratuit",
    "metaDescription": "Trouvez des idees de noms de domaine pour sites, produits et entreprises.",
    "intro": "Generez des pistes puis verifiez disponibilite, extension et marque avant achat.",
    "faqTopics": [
      "idee nom de domaine",
      "domaine site web",
      "verifier domaine"
    ],
    "searchIntentNote": "Direct French domain ideation query.",
    "riskSafetyNote": "No availability or legal guarantees."
  },
  {
    "canonicalToolId": "domain-name-generator",
    "language": "de",
    "primaryKeyword": "domainnamen generator",
    "localizedSlug": "domainnamen-generator",
    "h1": "Domainnamen Generator",
    "metaTitle": "Domainnamen Generator kostenlos",
    "metaDescription": "Finde Ideen fuer Domainnamen fuer Websites, Produkte und Unternehmen.",
    "intro": "Nutze die Vorschlaege als Recherchehilfe und pruefe Verfuegbarkeit sowie Markenrechte.",
    "faqTopics": [
      "domain ideen",
      "domain finden",
      "domain verfuegbarkeit"
    ],
    "searchIntentNote": "German local term often keeps Domain.",
    "riskSafetyNote": "No availability or legal guarantees."
  },
  {
    "canonicalToolId": "product-name-generator",
    "language": "es",
    "primaryKeyword": "nombres para productos",
    "localizedSlug": "nombres-para-productos",
    "h1": "Generador de nombres para productos",
    "metaTitle": "Nombres para productos gratis",
    "metaDescription": "Crea ideas de nombres para productos, colecciones, funciones o lanzamientos.",
    "intro": "Genera opciones comerciales y revisa marca, claridad y encaje con el mercado.",
    "faqTopics": [
      "nombre de producto",
      "ideas de producto",
      "naming producto"
    ],
    "searchIntentNote": "Spanish users often search for product-name ideas, not only generator.",
    "riskSafetyNote": "Trademark and claim review needed."
  },
  {
    "canonicalToolId": "product-name-generator",
    "language": "fr",
    "primaryKeyword": "generateur de nom de produit",
    "localizedSlug": "generateur-de-nom-de-produit",
    "h1": "Generateur de nom de produit",
    "metaTitle": "Generateur de nom de produit gratuit",
    "metaDescription": "Trouvez des idees de noms pour produits, collections, fonctionnalites ou lancements.",
    "intro": "Generez des pistes de naming produit et verifiez clarte, marque et positionnement.",
    "faqTopics": [
      "nom de produit",
      "naming produit",
      "idee produit"
    ],
    "searchIntentNote": "Direct product naming intent.",
    "riskSafetyNote": "Trademark and claim review needed."
  },
  {
    "canonicalToolId": "product-name-generator",
    "language": "de",
    "primaryKeyword": "produktnamen generator",
    "localizedSlug": "produktnamen-generator",
    "h1": "Produktnamen Generator",
    "metaTitle": "Produktnamen Generator kostenlos",
    "metaDescription": "Erstelle Namensideen fuer Produkte, Kollektionen, Features oder Launches.",
    "intro": "Pruefe jeden Produktnamen auf Klarheit, Markenrechte und Marktpassung.",
    "faqTopics": [
      "produktname finden",
      "produktnamen ideen",
      "naming produkt"
    ],
    "searchIntentNote": "German compound matches product naming searches.",
    "riskSafetyNote": "Trademark and claim review needed."
  },
  {
    "canonicalToolId": "project-name-generator",
    "language": "es",
    "primaryKeyword": "nombres para proyectos",
    "localizedSlug": "nombres-para-proyectos",
    "h1": "Generador de nombres para proyectos",
    "metaTitle": "Nombres para proyectos gratis",
    "metaDescription": "Encuentra nombres para proyectos internos, creativos, escolares o profesionales.",
    "intro": "Genera ideas memorables y ajustalas al tono, publico y alcance del proyecto.",
    "faqTopics": [
      "nombre de proyecto",
      "ideas para proyectos",
      "proyectos creativos"
    ],
    "searchIntentNote": "Local query favors ideas for project names.",
    "riskSafetyNote": "Low risk; avoid implying official project status."
  },
  {
    "canonicalToolId": "project-name-generator",
    "language": "fr",
    "primaryKeyword": "generateur de nom de projet",
    "localizedSlug": "generateur-de-nom-de-projet",
    "h1": "Generateur de nom de projet",
    "metaTitle": "Generateur de nom de projet gratuit",
    "metaDescription": "Creez des idees de noms pour projets internes, creatifs, scolaires ou professionnels.",
    "intro": "Trouvez un nom de projet clair puis adaptez-le au public et au contexte.",
    "faqTopics": [
      "nom de projet",
      "idee projet",
      "projet creatif"
    ],
    "searchIntentNote": "Direct French project naming intent.",
    "riskSafetyNote": "Low risk; review clarity and ownership."
  },
  {
    "canonicalToolId": "project-name-generator",
    "language": "de",
    "primaryKeyword": "projektnamen generator",
    "localizedSlug": "projektnamen-generator",
    "h1": "Projektnamen Generator",
    "metaTitle": "Projektnamen Generator kostenlos",
    "metaDescription": "Finde Namen fuer interne, kreative, schulische oder berufliche Projekte.",
    "intro": "Erstelle einpraegsame Projektnamen und passe sie an Zielgruppe und Kontext an.",
    "faqTopics": [
      "projektname finden",
      "projektnamen ideen",
      "kreative projektnamen"
    ],
    "searchIntentNote": "Natural German compound for project names.",
    "riskSafetyNote": "Low risk; review clarity and ownership."
  },
  {
    "canonicalToolId": "brand-kit-generator",
    "language": "es",
    "primaryKeyword": "generador de kit de marca",
    "localizedSlug": "generador-de-kit-de-marca",
    "h1": "Generador de kit de marca",
    "metaTitle": "Generador de kit de marca gratis",
    "metaDescription": "Crea una base de marca con ideas para nombre, tono, colores y mensajes iniciales.",
    "intro": "Usa el kit como punto de partida y revisa coherencia, derechos y aplicacion real.",
    "faqTopics": [
      "kit de marca",
      "identidad de marca",
      "branding basico"
    ],
    "searchIntentNote": "Brand kit is a borrowed marketing concept; Spanish phrase is clear.",
    "riskSafetyNote": "Trademark and design review required."
  },
  {
    "canonicalToolId": "brand-kit-generator",
    "language": "fr",
    "primaryKeyword": "generateur de kit de marque",
    "localizedSlug": "generateur-de-kit-de-marque",
    "h1": "Generateur de kit de marque",
    "metaTitle": "Generateur de kit de marque gratuit",
    "metaDescription": "Creez une base de marque avec idees de ton, messages, couleurs et elements initiaux.",
    "intro": "Utilisez le kit comme brouillon et verifiez coherence, droits et usage reel.",
    "faqTopics": [
      "kit de marque",
      "identite de marque",
      "branding"
    ],
    "searchIntentNote": "French marketing searches understand kit de marque.",
    "riskSafetyNote": "Trademark and design review required."
  },
  {
    "canonicalToolId": "brand-kit-generator",
    "language": "de",
    "primaryKeyword": "markenkit generator",
    "localizedSlug": "markenkit-generator",
    "h1": "Markenkit Generator",
    "metaTitle": "Markenkit Generator kostenlos",
    "metaDescription": "Erstelle eine erste Markenbasis mit Ton, Botschaften, Farben und Naming-Ideen.",
    "intro": "Nutze das Markenkit als Entwurf und pruefe Rechte, Konsistenz und Praxistauglichkeit.",
    "faqTopics": [
      "markenkit",
      "markenidentitaet",
      "branding ideen"
    ],
    "searchIntentNote": "German marketing query can use Markenkit/Brand Kit; native compound is clearer.",
    "riskSafetyNote": "Trademark and design review required."
  },
  {
    "canonicalToolId": "slogan-generator",
    "language": "es",
    "primaryKeyword": "generador de slogans",
    "localizedSlug": "generador-de-slogans",
    "h1": "Generador de slogans",
    "metaTitle": "Generador de slogans gratis",
    "metaDescription": "Crea slogans para marcas, campanas, productos o proyectos con tono claro y editable.",
    "intro": "Genera frases breves y revisa originalidad, promesas y encaje antes de publicar.",
    "faqTopics": [
      "slogans creativos",
      "slogan para negocio",
      "frases publicitarias"
    ],
    "searchIntentNote": "Spanish uses slogan as common marketing loanword.",
    "riskSafetyNote": "Avoid false claims, regulated promises, and trademark conflicts."
  },
  {
    "canonicalToolId": "slogan-generator",
    "language": "fr",
    "primaryKeyword": "generateur de slogan",
    "localizedSlug": "generateur-de-slogan",
    "h1": "Generateur de slogan",
    "metaTitle": "Generateur de slogan gratuit",
    "metaDescription": "Trouvez des slogans courts pour marques, campagnes, produits ou projets.",
    "intro": "Creez des accroches puis verifiez originalite, promesses et adequation au public.",
    "faqTopics": [
      "slogan publicitaire",
      "slogan marque",
      "accroche commerciale"
    ],
    "searchIntentNote": "Direct French marketing intent.",
    "riskSafetyNote": "Avoid false claims and trademark conflicts."
  },
  {
    "canonicalToolId": "slogan-generator",
    "language": "de",
    "primaryKeyword": "slogan generator",
    "localizedSlug": "slogan-generator",
    "h1": "Slogan Generator",
    "metaTitle": "Slogan Generator kostenlos",
    "metaDescription": "Erstelle kurze Slogans fuer Marken, Kampagnen, Produkte oder Projekte.",
    "intro": "Nutze die Vorschlaege als Entwurf und pruefe Originalitaet, Aussage und rechtliche Nutzung.",
    "faqTopics": [
      "slogan ideen",
      "werbeslogan",
      "claim ideen"
    ],
    "searchIntentNote": "German SERPs commonly use Slogan Generator.",
    "riskSafetyNote": "Avoid false claims and trademark conflicts."
  },
  {
    "canonicalToolId": "tagline-generator",
    "language": "es",
    "primaryKeyword": "generador de frases para marca",
    "localizedSlug": "generador-de-frases-para-marca",
    "h1": "Generador de frases para marca",
    "metaTitle": "Generador de frases para marca gratis",
    "metaDescription": "Crea frases cortas de marca para comunicar propuesta, estilo o posicionamiento.",
    "intro": "Encuentra una linea de marca clara y evita promesas que no puedas respaldar.",
    "faqTopics": [
      "frase de marca",
      "lema de marca",
      "propuesta de valor"
    ],
    "searchIntentNote": "Spanish tagline intent is better captured by brand phrase/lema than literal tagline.",
    "riskSafetyNote": "Avoid deceptive advertising claims."
  },
  {
    "canonicalToolId": "tagline-generator",
    "language": "fr",
    "primaryKeyword": "generateur de baseline",
    "localizedSlug": "generateur-de-baseline",
    "h1": "Generateur de baseline",
    "metaTitle": "Generateur de baseline gratuit",
    "metaDescription": "Creez une baseline courte pour clarifier le positionnement d'une marque ou d'un produit.",
    "intro": "Generez des pistes de signature puis controlez sens, originalite et promesses.",
    "faqTopics": [
      "baseline marque",
      "signature de marque",
      "accroche courte"
    ],
    "searchIntentNote": "French marketing uses baseline/signature; baseline has strong local intent.",
    "riskSafetyNote": "Avoid deceptive or unsupported claims."
  },
  {
    "canonicalToolId": "tagline-generator",
    "language": "de",
    "primaryKeyword": "claim generator",
    "localizedSlug": "claim-generator",
    "h1": "Claim Generator",
    "metaTitle": "Claim Generator kostenlos",
    "metaDescription": "Erstelle kurze Claims fuer Marken, Produkte und Kampagnen.",
    "intro": "Finde eine klare Markenlinie und pruefe, ob Aussage und Versprechen belegbar sind.",
    "faqTopics": [
      "claim ideen",
      "markenclaim",
      "kurzer slogan"
    ],
    "searchIntentNote": "German marketing uses Claim for tagline intent.",
    "riskSafetyNote": "Avoid deceptive or unsupported claims."
  },
  {
    "canonicalToolId": "blog-name-generator",
    "language": "es",
    "primaryKeyword": "nombres para blog",
    "localizedSlug": "nombres-para-blog",
    "h1": "Generador de nombres para blog",
    "metaTitle": "Nombres para blog gratis",
    "metaDescription": "Encuentra ideas de nombres para blogs personales, nichos, newsletters o proyectos de contenido.",
    "intro": "Genera opciones memorables y revisa dominio, tono y tema antes de elegir.",
    "faqTopics": [
      "nombre de blog",
      "ideas para blog",
      "blog personal"
    ],
    "searchIntentNote": "Spanish list/query intent is stronger than literal generator.",
    "riskSafetyNote": "Check trademark and domain availability."
  },
  {
    "canonicalToolId": "blog-name-generator",
    "language": "fr",
    "primaryKeyword": "generateur de nom de blog",
    "localizedSlug": "generateur-de-nom-de-blog",
    "h1": "Generateur de nom de blog",
    "metaTitle": "Generateur de nom de blog gratuit",
    "metaDescription": "Trouvez des idees de noms pour blogs, newsletters et projets editoriaux.",
    "intro": "Creez des pistes de nom et verifiez domaine, ton et coherence avec la niche.",
    "faqTopics": [
      "nom de blog",
      "idee blog",
      "blog personnel"
    ],
    "searchIntentNote": "Direct French blog naming intent.",
    "riskSafetyNote": "Check trademark and domain availability."
  },
  {
    "canonicalToolId": "blog-name-generator",
    "language": "de",
    "primaryKeyword": "blognamen generator",
    "localizedSlug": "blognamen-generator",
    "h1": "Blognamen Generator",
    "metaTitle": "Blognamen Generator kostenlos",
    "metaDescription": "Finde Ideen fuer Blognamen, Newsletter und Content-Projekte.",
    "intro": "Erstelle passende Blognamen und pruefe Domain, Thema und Markenrisiko.",
    "faqTopics": [
      "blogname finden",
      "blognamen ideen",
      "blog starten"
    ],
    "searchIntentNote": "Natural German compound.",
    "riskSafetyNote": "Check trademark and domain availability."
  },
  {
    "canonicalToolId": "podcast-name-generator",
    "language": "es",
    "primaryKeyword": "nombres para podcast",
    "localizedSlug": "nombres-para-podcast",
    "h1": "Generador de nombres para podcast",
    "metaTitle": "Nombres para podcast gratis",
    "metaDescription": "Crea ideas de nombres para podcasts, episodios seriados o canales de audio.",
    "intro": "Genera opciones claras y revisa disponibilidad en directorios, dominio y marca.",
    "faqTopics": [
      "nombre de podcast",
      "ideas para podcast",
      "podcast creativo"
    ],
    "searchIntentNote": "Spanish query often searches ideas/names for podcast.",
    "riskSafetyNote": "Avoid platform availability guarantees."
  },
  {
    "canonicalToolId": "podcast-name-generator",
    "language": "fr",
    "primaryKeyword": "generateur de nom de podcast",
    "localizedSlug": "generateur-de-nom-de-podcast",
    "h1": "Generateur de nom de podcast",
    "metaTitle": "Generateur de nom de podcast gratuit",
    "metaDescription": "Trouvez des idees de noms pour podcasts, emissions audio et series d'episodes.",
    "intro": "Generez des pistes puis verifiez annuaires, domaine et marque avant lancement.",
    "faqTopics": [
      "nom de podcast",
      "idee podcast",
      "titre podcast"
    ],
    "searchIntentNote": "Direct French podcast naming intent.",
    "riskSafetyNote": "Avoid platform availability guarantees."
  },
  {
    "canonicalToolId": "podcast-name-generator",
    "language": "de",
    "primaryKeyword": "podcastnamen generator",
    "localizedSlug": "podcastnamen-generator",
    "h1": "Podcastnamen Generator",
    "metaTitle": "Podcastnamen Generator kostenlos",
    "metaDescription": "Erstelle Namensideen fuer Podcasts, Audioformate und Episodenserien.",
    "intro": "Pruefe die Vorschlaege in Verzeichnissen, Domains und Markenrecherche.",
    "faqTopics": [
      "podcast name finden",
      "podcast ideen",
      "podcast titel"
    ],
    "searchIntentNote": "Natural German compound.",
    "riskSafetyNote": "Avoid platform availability guarantees."
  },
  {
    "canonicalToolId": "youtube-tag-generator",
    "language": "es",
    "primaryKeyword": "generador de etiquetas para videos",
    "localizedSlug": "generador-de-etiquetas-para-videos",
    "h1": "Generador de etiquetas para videos",
    "metaTitle": "Generador de etiquetas para videos gratis",
    "metaDescription": "Crea ideas de etiquetas para organizar y describir videos sin prometer posicionamiento.",
    "intro": "Genera tags relacionados con el tema del video y revisa relevancia antes de publicar.",
    "faqTopics": [
      "etiquetas para videos",
      "tags de video",
      "ideas de tags"
    ],
    "searchIntentNote": "Avoids brand dependency while preserving video-tag intent.",
    "riskSafetyNote": "Do not promise rankings or use platform-brand claims."
  },
  {
    "canonicalToolId": "youtube-tag-generator",
    "language": "fr",
    "primaryKeyword": "generateur de tags video",
    "localizedSlug": "generateur-de-tags-video",
    "h1": "Generateur de tags video",
    "metaTitle": "Generateur de tags video gratuit",
    "metaDescription": "Creez des idees de tags pour decrire et organiser des videos en ligne.",
    "intro": "Choisissez des tags pertinents pour le sujet sans garantie de classement ou de vues.",
    "faqTopics": [
      "tags video",
      "mots cles video",
      "idees de tags"
    ],
    "searchIntentNote": "French users use tags video; brand-neutral and same intent.",
    "riskSafetyNote": "Do not promise rankings or use platform-brand claims."
  },
  {
    "canonicalToolId": "youtube-tag-generator",
    "language": "de",
    "primaryKeyword": "video tags generator",
    "localizedSlug": "video-tags-generator",
    "h1": "Video Tags Generator",
    "metaTitle": "Video Tags Generator kostenlos",
    "metaDescription": "Erstelle Tag-Ideen fuer Online-Videos, Beschreibungen und Themencluster.",
    "intro": "Waehle relevante Tags passend zum Inhalt ohne Ranking- oder Reichweitenversprechen.",
    "faqTopics": [
      "video tags",
      "tags fuer videos",
      "keyword ideen video"
    ],
    "searchIntentNote": "German SERP intent often mixes English for video tags.",
    "riskSafetyNote": "No ranking guarantees or platform-brand claims."
  },
  {
    "canonicalToolId": "hashtag-generator",
    "language": "es",
    "primaryKeyword": "generador de hashtags",
    "localizedSlug": "generador-de-hashtags",
    "h1": "Generador de hashtags",
    "metaTitle": "Generador de hashtags gratis",
    "metaDescription": "Crea hashtags relacionados con un tema, campana, publicacion o idea de contenido.",
    "intro": "Genera etiquetas sociales relevantes y revisa tono, significado y contexto actual.",
    "faqTopics": [
      "hashtags para redes",
      "hashtags populares",
      "ideas de hashtags"
    ],
    "searchIntentNote": "Direct social hashtag intent.",
    "riskSafetyNote": "Avoid promising virality or trending accuracy."
  },
  {
    "canonicalToolId": "hashtag-generator",
    "language": "fr",
    "primaryKeyword": "generateur de hashtags",
    "localizedSlug": "generateur-de-hashtags",
    "h1": "Generateur de hashtags",
    "metaTitle": "Generateur de hashtags gratuit",
    "metaDescription": "Creez des hashtags pertinents pour publications, campagnes et idees de contenu.",
    "intro": "Generez des suggestions puis verifiez contexte, ton et actualite avant publication.",
    "faqTopics": [
      "hashtags reseaux sociaux",
      "hashtags populaires",
      "idees hashtags"
    ],
    "searchIntentNote": "Direct French social intent.",
    "riskSafetyNote": "Avoid promising virality or trend accuracy."
  },
  {
    "canonicalToolId": "hashtag-generator",
    "language": "de",
    "primaryKeyword": "hashtag generator",
    "localizedSlug": "hashtag-generator",
    "h1": "Hashtag Generator",
    "metaTitle": "Hashtag Generator kostenlos",
    "metaDescription": "Erstelle Hashtag-Ideen fuer Beitraege, Kampagnen und Content-Themen.",
    "intro": "Pruefe Bedeutung, Ton und Aktualitaet, bevor du Hashtags veroeffentlichst.",
    "faqTopics": [
      "hashtags finden",
      "social media hashtags",
      "hashtag ideen"
    ],
    "searchIntentNote": "German commonly uses English loanword.",
    "riskSafetyNote": "Avoid promising virality or trend accuracy."
  },
  {
    "canonicalToolId": "keyword-generator",
    "language": "es",
    "primaryKeyword": "generador de palabras clave",
    "localizedSlug": "generador-de-palabras-clave",
    "h1": "Generador de palabras clave",
    "metaTitle": "Generador de palabras clave gratis",
    "metaDescription": "Encuentra ideas de palabras clave para contenido, SEO, anuncios o investigacion inicial.",
    "intro": "Genera temas y terminos relacionados, luego valida volumen, competencia e intencion.",
    "faqTopics": [
      "palabras clave SEO",
      "ideas de keywords",
      "investigacion keyword"
    ],
    "searchIntentNote": "Direct SEO keyword ideation intent.",
    "riskSafetyNote": "No traffic, ranking, or ad-performance guarantees."
  },
  {
    "canonicalToolId": "keyword-generator",
    "language": "fr",
    "primaryKeyword": "generateur de mots cles",
    "localizedSlug": "generateur-de-mots-cles",
    "h1": "Generateur de mots cles",
    "metaTitle": "Generateur de mots cles gratuit",
    "metaDescription": "Trouvez des idees de mots cles pour contenu, SEO, annonces ou recherche initiale.",
    "intro": "Generez des pistes puis validez volume, concurrence et intention de recherche.",
    "faqTopics": [
      "mots cles SEO",
      "idees keywords",
      "recherche de mots cles"
    ],
    "searchIntentNote": "Direct French SEO intent.",
    "riskSafetyNote": "No ranking or ad-performance guarantees."
  },
  {
    "canonicalToolId": "keyword-generator",
    "language": "de",
    "primaryKeyword": "keyword generator",
    "localizedSlug": "keyword-generator",
    "h1": "Keyword Generator",
    "metaTitle": "Keyword Generator kostenlos",
    "metaDescription": "Finde Keyword-Ideen fuer Content, SEO, Anzeigen und erste Themenrecherche.",
    "intro": "Nutze die Vorschlaege als Startpunkt und pruefe Suchvolumen, Wettbewerb und Intent.",
    "faqTopics": [
      "seo keywords",
      "keyword ideen",
      "keyword recherche"
    ],
    "searchIntentNote": "German SEO searches commonly use Keyword Generator.",
    "riskSafetyNote": "No ranking or ad-performance guarantees."
  },
  {
    "canonicalToolId": "meta-tag-generator",
    "language": "es",
    "primaryKeyword": "generador de meta tags",
    "localizedSlug": "generador-de-meta-tags",
    "h1": "Generador de meta tags",
    "metaTitle": "Generador de meta tags gratis",
    "metaDescription": "Crea borradores de meta tags para paginas web, SEO tecnico y vistas previas sociales.",
    "intro": "Genera etiquetas base y revisa longitud, relevancia y compatibilidad antes de implementar.",
    "faqTopics": [
      "meta tags SEO",
      "etiquetas meta",
      "meta title y description"
    ],
    "searchIntentNote": "Spanish SEO users often use meta tags loan term.",
    "riskSafetyNote": "Technical output should be reviewed before production."
  },
  {
    "canonicalToolId": "meta-tag-generator",
    "language": "fr",
    "primaryKeyword": "generateur de balises meta",
    "localizedSlug": "generateur-de-balises-meta",
    "h1": "Generateur de balises meta",
    "metaTitle": "Generateur de balises meta gratuit",
    "metaDescription": "Creez des brouillons de balises meta pour pages web, SEO et apercus sociaux.",
    "intro": "Generez une base puis controlez longueur, pertinence et integration technique.",
    "faqTopics": [
      "balises meta SEO",
      "meta title",
      "meta description"
    ],
    "searchIntentNote": "French native balises meta is high-intent.",
    "riskSafetyNote": "Technical output should be reviewed before production."
  },
  {
    "canonicalToolId": "meta-tag-generator",
    "language": "de",
    "primaryKeyword": "meta tag generator",
    "localizedSlug": "meta-tag-generator",
    "h1": "Meta Tag Generator",
    "metaTitle": "Meta Tag Generator kostenlos",
    "metaDescription": "Erstelle Meta-Tag-Entwuerfe fuer Webseiten, SEO und Social Previews.",
    "intro": "Pruefe Laenge, Relevanz und technische Einbindung, bevor du Tags einsetzt.",
    "faqTopics": [
      "meta tags seo",
      "meta title",
      "meta description"
    ],
    "searchIntentNote": "German SEO searches commonly keep Meta Tag.",
    "riskSafetyNote": "Technical output should be reviewed before production."
  },
  {
    "canonicalToolId": "meta-description-generator",
    "language": "es",
    "primaryKeyword": "generador de meta descripciones",
    "localizedSlug": "generador-de-meta-descripciones",
    "h1": "Generador de meta descripciones",
    "metaTitle": "Generador de meta descripciones gratis",
    "metaDescription": "Crea meta descripciones para paginas, articulos y fichas con enfoque claro de clic.",
    "intro": "Genera borradores breves y ajusta longitud, precision y promesa antes de publicar.",
    "faqTopics": [
      "meta descripcion SEO",
      "description para Google",
      "snippet SEO"
    ],
    "searchIntentNote": "Direct SEO snippet-writing intent.",
    "riskSafetyNote": "No CTR or ranking guarantees."
  },
  {
    "canonicalToolId": "meta-description-generator",
    "language": "fr",
    "primaryKeyword": "generateur de meta description",
    "localizedSlug": "generateur-de-meta-description",
    "h1": "Generateur de meta description",
    "metaTitle": "Generateur de meta description gratuit",
    "metaDescription": "Redigez des brouillons de meta descriptions pour pages, articles et fiches produit.",
    "intro": "Generez un texte court puis ajustez longueur, precision et promesse de clic.",
    "faqTopics": [
      "meta description SEO",
      "snippet Google",
      "description page"
    ],
    "searchIntentNote": "French SEO commonly uses singular meta description.",
    "riskSafetyNote": "No CTR or ranking guarantees."
  },
  {
    "canonicalToolId": "meta-description-generator",
    "language": "de",
    "primaryKeyword": "meta beschreibung generator",
    "localizedSlug": "meta-beschreibung-generator",
    "h1": "Meta Beschreibung Generator",
    "metaTitle": "Meta Beschreibung Generator kostenlos",
    "metaDescription": "Erstelle Meta-Beschreibungen fuer Seiten, Artikel und Produkttexte.",
    "intro": "Optimiere Laenge, Relevanz und Klickversprechen ohne Ranking-Garantie.",
    "faqTopics": [
      "meta description",
      "seo beschreibung",
      "snippet text"
    ],
    "searchIntentNote": "German hybrid/native term is clear.",
    "riskSafetyNote": "No CTR or ranking guarantees."
  },
  {
    "canonicalToolId": "seo-title-generator",
    "language": "es",
    "primaryKeyword": "generador de titulos SEO",
    "localizedSlug": "generador-de-titulos-seo",
    "h1": "Generador de titulos SEO",
    "metaTitle": "Generador de titulos SEO gratis",
    "metaDescription": "Crea ideas de titulos SEO para paginas, articulos, guias y fichas de producto.",
    "intro": "Genera opciones de titulo y revisa longitud, intencion y exactitud antes de usarlas.",
    "faqTopics": [
      "titulo SEO",
      "title tag",
      "titulos para Google"
    ],
    "searchIntentNote": "Direct SEO title intent.",
    "riskSafetyNote": "No ranking guarantees; avoid misleading clickbait."
  },
  {
    "canonicalToolId": "seo-title-generator",
    "language": "fr",
    "primaryKeyword": "generateur de titre SEO",
    "localizedSlug": "generateur-de-titre-seo",
    "h1": "Generateur de titre SEO",
    "metaTitle": "Generateur de titre SEO gratuit",
    "metaDescription": "Creez des idees de titres SEO pour pages, articles, guides et fiches produit.",
    "intro": "Generez plusieurs titres puis verifiez longueur, intention et exactitude.",
    "faqTopics": [
      "titre SEO",
      "balise title",
      "titre Google"
    ],
    "searchIntentNote": "Direct French SEO title intent.",
    "riskSafetyNote": "No ranking guarantees; avoid misleading clickbait."
  },
  {
    "canonicalToolId": "seo-title-generator",
    "language": "de",
    "primaryKeyword": "seo titel generator",
    "localizedSlug": "seo-titel-generator",
    "h1": "SEO Titel Generator",
    "metaTitle": "SEO Titel Generator kostenlos",
    "metaDescription": "Erstelle SEO-Titel fuer Seiten, Artikel, Ratgeber und Produkttexte.",
    "intro": "Pruefe Laenge, Suchintention und Genauigkeit, bevor du den Title verwendest.",
    "faqTopics": [
      "seo title",
      "title tag",
      "google titel"
    ],
    "searchIntentNote": "Natural German SEO hybrid.",
    "riskSafetyNote": "No ranking guarantees; avoid misleading clickbait."
  },
  {
    "canonicalToolId": "faq-generator",
    "language": "es",
    "primaryKeyword": "generador de preguntas frecuentes",
    "localizedSlug": "generador-de-preguntas-frecuentes",
    "h1": "Generador de preguntas frecuentes",
    "metaTitle": "Generador de preguntas frecuentes gratis",
    "metaDescription": "Crea ideas de preguntas frecuentes para paginas, productos, servicios o articulos.",
    "intro": "Genera temas de FAQ utiles y revisa exactitud, politicas y respuesta final.",
    "faqTopics": [
      "preguntas frecuentes",
      "FAQ para web",
      "preguntas y respuestas"
    ],
    "searchIntentNote": "Spanish expands FAQ for broader local clarity.",
    "riskSafetyNote": "Review answers for factual and policy accuracy."
  },
  {
    "canonicalToolId": "faq-generator",
    "language": "fr",
    "primaryKeyword": "generateur de FAQ",
    "localizedSlug": "generateur-de-faq",
    "h1": "Generateur de FAQ",
    "metaTitle": "Generateur de FAQ gratuit",
    "metaDescription": "Creez des idees de questions frequentes pour pages, produits, services ou articles.",
    "intro": "Generez une structure de FAQ puis verifiez les reponses et les limites du sujet.",
    "faqTopics": [
      "questions frequentes",
      "FAQ site web",
      "questions reponses"
    ],
    "searchIntentNote": "French commonly uses FAQ in digital content.",
    "riskSafetyNote": "Review answers for factual and policy accuracy."
  },
  {
    "canonicalToolId": "faq-generator",
    "language": "de",
    "primaryKeyword": "faq generator",
    "localizedSlug": "faq-generator",
    "h1": "FAQ Generator",
    "metaTitle": "FAQ Generator kostenlos",
    "metaDescription": "Erstelle FAQ-Ideen fuer Webseiten, Produkte, Services und Artikel.",
    "intro": "Nutze die Fragen als Entwurf und pruefe Antworten, Fakten und rechtliche Aussagen.",
    "faqTopics": [
      "haeufige fragen",
      "faq erstellen",
      "fragen und antworten"
    ],
    "searchIntentNote": "German SERP uses FAQ Generator strongly.",
    "riskSafetyNote": "Review answers for factual and policy accuracy."
  },
  {
    "canonicalToolId": "canonical-tag-generator",
    "language": "es",
    "primaryKeyword": "generador de etiqueta canonical",
    "localizedSlug": "generador-de-etiqueta-canonical",
    "h1": "Generador de etiqueta canonical",
    "metaTitle": "Generador de etiqueta canonical gratis",
    "metaDescription": "Crea borradores de etiquetas canonical para indicar la URL preferida de una pagina.",
    "intro": "Genera el formato base y revisa la URL final antes de implementarlo en tu sitio.",
    "faqTopics": [
      "canonical SEO",
      "etiqueta canonica",
      "URL canonica"
    ],
    "searchIntentNote": "SEO technical query; canonical often remains English.",
    "riskSafetyNote": "Technical SEO review required."
  },
  {
    "canonicalToolId": "canonical-tag-generator",
    "language": "fr",
    "primaryKeyword": "generateur de balise canonique",
    "localizedSlug": "generateur-de-balise-canonique",
    "h1": "Generateur de balise canonique",
    "metaTitle": "Generateur de balise canonique gratuit",
    "metaDescription": "Creez une balise canonique pour signaler l'URL preferee d'une page.",
    "intro": "Generez un brouillon puis verifiez l'URL, le protocole et l'integration HTML.",
    "faqTopics": [
      "balise canonical",
      "URL canonique",
      "SEO technique"
    ],
    "searchIntentNote": "French uses balise canonique/canonical; native phrase is clear.",
    "riskSafetyNote": "Technical SEO review required."
  },
  {
    "canonicalToolId": "canonical-tag-generator",
    "language": "de",
    "primaryKeyword": "canonical tag generator",
    "localizedSlug": "canonical-tag-generator",
    "h1": "Canonical Tag Generator",
    "metaTitle": "Canonical Tag Generator kostenlos",
    "metaDescription": "Erstelle Canonical-Tag-Entwuerfe fuer die bevorzugte URL einer Seite.",
    "intro": "Pruefe URL, Protokoll und HTML-Einbindung vor dem Einsatz.",
    "faqTopics": [
      "canonical tag",
      "kanonische URL",
      "technisches SEO"
    ],
    "searchIntentNote": "German SEO often uses Canonical Tag in English.",
    "riskSafetyNote": "Technical SEO review required."
  },
  {
    "canonicalToolId": "robots-txt-generator",
    "language": "es",
    "primaryKeyword": "generador de robots.txt",
    "localizedSlug": "generador-de-robots-txt",
    "h1": "Generador de robots.txt",
    "metaTitle": "Generador de robots.txt gratis",
    "metaDescription": "Crea borradores de archivos robots.txt para reglas basicas de rastreo.",
    "intro": "Genera reglas iniciales y revisa que no bloqueen paginas importantes por error.",
    "faqTopics": [
      "robots.txt SEO",
      "archivo robots",
      "reglas de rastreo"
    ],
    "searchIntentNote": "Technical query is language-neutral around robots.txt.",
    "riskSafetyNote": "High risk if misused; require manual SEO review."
  },
  {
    "canonicalToolId": "robots-txt-generator",
    "language": "fr",
    "primaryKeyword": "generateur robots.txt",
    "localizedSlug": "generateur-robots-txt",
    "h1": "Generateur robots.txt",
    "metaTitle": "Generateur robots.txt gratuit",
    "metaDescription": "Creez un brouillon de fichier robots.txt pour des regles de crawl simples.",
    "intro": "Controlez chaque directive afin de ne pas bloquer des pages importantes.",
    "faqTopics": [
      "robots.txt SEO",
      "fichier robots",
      "directives crawl"
    ],
    "searchIntentNote": "French users search with robots.txt unchanged.",
    "riskSafetyNote": "High risk if misused; require manual SEO review."
  },
  {
    "canonicalToolId": "robots-txt-generator",
    "language": "de",
    "primaryKeyword": "robots.txt generator",
    "localizedSlug": "robots-txt-generator",
    "h1": "robots.txt Generator",
    "metaTitle": "robots.txt Generator kostenlos",
    "metaDescription": "Erstelle robots.txt-Entwuerfe fuer einfache Crawling-Regeln.",
    "intro": "Pruefe jede Direktive sorgfaeltig, damit wichtige Seiten nicht blockiert werden.",
    "faqTopics": [
      "robots.txt seo",
      "crawling regeln",
      "robots datei"
    ],
    "searchIntentNote": "German query keeps robots.txt term.",
    "riskSafetyNote": "High risk if misused; require manual SEO review."
  },
  {
    "canonicalToolId": "open-graph-generator",
    "language": "es",
    "primaryKeyword": "generador de etiquetas Open Graph",
    "localizedSlug": "generador-de-etiquetas-open-graph",
    "h1": "Generador de etiquetas Open Graph",
    "metaTitle": "Generador de etiquetas Open Graph gratis",
    "metaDescription": "Crea borradores de etiquetas Open Graph para vistas previas al compartir enlaces.",
    "intro": "Genera titulo, descripcion e imagen sugerida y revisa cada campo antes de publicar.",
    "faqTopics": [
      "Open Graph SEO",
      "etiquetas sociales",
      "vista previa enlace"
    ],
    "searchIntentNote": "Protocol name is standard; intent is social preview metadata.",
    "riskSafetyNote": "Review image rights and avoid misleading previews."
  },
  {
    "canonicalToolId": "open-graph-generator",
    "language": "fr",
    "primaryKeyword": "generateur Open Graph",
    "localizedSlug": "generateur-open-graph",
    "h1": "Generateur Open Graph",
    "metaTitle": "Generateur Open Graph gratuit",
    "metaDescription": "Creez des balises Open Graph pour ameliorer les apercus de liens partages.",
    "intro": "Generez les champs principaux puis verifiez titre, description, image et URL.",
    "faqTopics": [
      "Open Graph",
      "balises sociales",
      "apercu lien"
    ],
    "searchIntentNote": "French technical searches keep Open Graph.",
    "riskSafetyNote": "Review image rights and avoid misleading previews."
  },
  {
    "canonicalToolId": "open-graph-generator",
    "language": "de",
    "primaryKeyword": "open graph generator",
    "localizedSlug": "open-graph-generator",
    "h1": "Open Graph Generator",
    "metaTitle": "Open Graph Generator kostenlos",
    "metaDescription": "Erstelle Open-Graph-Tags fuer Link-Vorschauen in sozialen und Messaging-Kontexten.",
    "intro": "Pruefe Titel, Beschreibung, Bildrechte und URL, bevor du die Tags einsetzt.",
    "faqTopics": [
      "open graph tags",
      "social preview",
      "og tags"
    ],
    "searchIntentNote": "German technical query keeps Open Graph.",
    "riskSafetyNote": "Review image rights and avoid misleading previews."
  },
  {
    "canonicalToolId": "fancy-text-generator",
    "language": "es",
    "primaryKeyword": "letras bonitas",
    "localizedSlug": "letras-bonitas",
    "h1": "Generador de letras bonitas",
    "metaTitle": "Letras bonitas para copiar",
    "metaDescription": "Convierte texto en estilos decorativos para perfiles, mensajes y publicaciones.",
    "intro": "Crea texto estilizado y comprueba legibilidad y compatibilidad antes de compartir.",
    "faqTopics": [
      "letras para copiar",
      "texto bonito",
      "fuentes decorativas"
    ],
    "searchIntentNote": "Spanish search intent strongly favors letras bonitas over literal fancy text.",
    "riskSafetyNote": "Avoid deceptive identity or accessibility issues."
  },
  {
    "canonicalToolId": "fancy-text-generator",
    "language": "fr",
    "primaryKeyword": "generateur de texte stylise",
    "localizedSlug": "generateur-de-texte-stylise",
    "h1": "Generateur de texte stylise",
    "metaTitle": "Generateur de texte stylise gratuit",
    "metaDescription": "Transformez du texte en styles decoratifs a copier pour profils et messages.",
    "intro": "Generez du texte stylise puis verifiez lisibilite et compatibilite selon la plateforme.",
    "faqTopics": [
      "texte stylise",
      "police a copier",
      "lettres decoratives"
    ],
    "searchIntentNote": "French prefers texte stylise/police a copier.",
    "riskSafetyNote": "Accessibility and compatibility caveat needed."
  },
  {
    "canonicalToolId": "fancy-text-generator",
    "language": "de",
    "primaryKeyword": "schriftgenerator",
    "localizedSlug": "schriftgenerator",
    "h1": "Schriftgenerator",
    "metaTitle": "Schriftgenerator kostenlos",
    "metaDescription": "Wandle Text in dekorative Schriftstile zum Kopieren fuer Profile und Nachrichten um.",
    "intro": "Erstelle stylischen Text und pruefe Lesbarkeit sowie Plattform-Kompatibilitaet.",
    "faqTopics": [
      "schrift zum kopieren",
      "schoene schrift",
      "fancy text"
    ],
    "searchIntentNote": "German head term is Schriftgenerator.",
    "riskSafetyNote": "Accessibility and compatibility caveat needed."
  },
  {
    "canonicalToolId": "bold-text-generator",
    "language": "es",
    "primaryKeyword": "texto en negrita",
    "localizedSlug": "texto-en-negrita",
    "h1": "Generador de texto en negrita",
    "metaTitle": "Texto en negrita para copiar",
    "metaDescription": "Convierte texto normal en estilos de negrita para copiar y pegar.",
    "intro": "Genera texto destacado y revisa que sea legible en la app o pagina donde lo uses.",
    "faqTopics": [
      "negrita unicode",
      "letras en negrita",
      "copiar texto negrita"
    ],
    "searchIntentNote": "Spanish users search copyable bold text, not only generator.",
    "riskSafetyNote": "Compatibility/accessibility warning."
  },
  {
    "canonicalToolId": "bold-text-generator",
    "language": "fr",
    "primaryKeyword": "texte gras",
    "localizedSlug": "texte-gras",
    "h1": "Generateur de texte gras",
    "metaTitle": "Texte gras a copier",
    "metaDescription": "Transformez du texte en style gras a copier pour profils, messages et titres.",
    "intro": "Creez du texte en gras puis verifiez lisibilite et compatibilite d'affichage.",
    "faqTopics": [
      "texte en gras",
      "lettres grasses",
      "gras unicode"
    ],
    "searchIntentNote": "French intent is copyable bold text.",
    "riskSafetyNote": "Compatibility/accessibility warning."
  },
  {
    "canonicalToolId": "bold-text-generator",
    "language": "de",
    "primaryKeyword": "fettschrift generator",
    "localizedSlug": "fettschrift-generator",
    "h1": "Fettschrift Generator",
    "metaTitle": "Fettschrift Generator kostenlos",
    "metaDescription": "Wandle Text in fette Unicode-Schrift zum Kopieren und Einfuegen um.",
    "intro": "Pruefe vor der Nutzung, ob der Text lesbar und kompatibel bleibt.",
    "faqTopics": [
      "fetter text",
      "bold text kopieren",
      "unicode fettschrift"
    ],
    "searchIntentNote": "German native term Fettschrift is strong.",
    "riskSafetyNote": "Compatibility/accessibility warning."
  },
  {
    "canonicalToolId": "cursive-text-generator",
    "language": "es",
    "primaryKeyword": "letras cursivas",
    "localizedSlug": "letras-cursivas",
    "h1": "Generador de letras cursivas",
    "metaTitle": "Letras cursivas para copiar",
    "metaDescription": "Convierte texto en estilos cursivos decorativos para copiar en perfiles y mensajes.",
    "intro": "Genera letras cursivas y verifica legibilidad, acentos y compatibilidad antes de publicar.",
    "faqTopics": [
      "cursiva para copiar",
      "texto cursivo",
      "letras manuscritas"
    ],
    "searchIntentNote": "Spanish users search letras cursivas para copiar.",
    "riskSafetyNote": "Compatibility/accessibility warning."
  },
  {
    "canonicalToolId": "cursive-text-generator",
    "language": "fr",
    "primaryKeyword": "texte cursif",
    "localizedSlug": "texte-cursif",
    "h1": "Generateur de texte cursif",
    "metaTitle": "Texte cursif a copier",
    "metaDescription": "Transformez du texte en style cursif decoratif pour profils, messages et bios.",
    "intro": "Generez une version cursive puis controlez lisibilite et compatibilite.",
    "faqTopics": [
      "ecriture cursive",
      "cursif a copier",
      "lettres manuscrites"
    ],
    "searchIntentNote": "French copyable cursive text intent.",
    "riskSafetyNote": "Compatibility/accessibility warning."
  },
  {
    "canonicalToolId": "cursive-text-generator",
    "language": "de",
    "primaryKeyword": "kursivschrift generator",
    "localizedSlug": "kursivschrift-generator",
    "h1": "Kursivschrift Generator",
    "metaTitle": "Kursivschrift Generator kostenlos",
    "metaDescription": "Erstelle dekorative Kursivschrift zum Kopieren fuer Profile und Nachrichten.",
    "intro": "Pruefe Lesbarkeit und Kompatibilitaet, besonders bei Umlauten und Sonderzeichen.",
    "faqTopics": [
      "kursivschrift kopieren",
      "cursive text",
      "schrift kursiv"
    ],
    "searchIntentNote": "German term Kursivschrift fits cursive-style query.",
    "riskSafetyNote": "Compatibility/accessibility warning."
  },
  {
    "canonicalToolId": "italic-text-generator",
    "language": "es",
    "primaryKeyword": "texto italica",
    "localizedSlug": "texto-italica",
    "h1": "Generador de texto italica",
    "metaTitle": "Texto italica para copiar",
    "metaDescription": "Convierte texto en estilo italica o inclinado para copiar y pegar.",
    "intro": "Crea texto inclinado y revisa si la plataforma lo muestra correctamente.",
    "faqTopics": [
      "italica unicode",
      "texto inclinado",
      "cursiva para copiar"
    ],
    "searchIntentNote": "Spanish often blends italica/cursiva; chosen slug avoids collision with cursive tool.",
    "riskSafetyNote": "Compatibility/accessibility warning."
  },
  {
    "canonicalToolId": "italic-text-generator",
    "language": "fr",
    "primaryKeyword": "texte italique",
    "localizedSlug": "texte-italique",
    "h1": "Generateur de texte italique",
    "metaTitle": "Texte italique a copier",
    "metaDescription": "Transformez du texte en italique a copier pour messages, profils et titres courts.",
    "intro": "Generez une version italique puis verifiez affichage et lisibilite.",
    "faqTopics": [
      "italique unicode",
      "texte penche",
      "italique a copier"
    ],
    "searchIntentNote": "French distinguishes italique from cursif.",
    "riskSafetyNote": "Compatibility/accessibility warning."
  },
  {
    "canonicalToolId": "italic-text-generator",
    "language": "de",
    "primaryKeyword": "kursiver text generator",
    "localizedSlug": "kursiver-text-generator",
    "h1": "Kursiver Text Generator",
    "metaTitle": "Kursiver Text Generator kostenlos",
    "metaDescription": "Wandle normalen Text in kursiven Unicode-Text zum Kopieren um.",
    "intro": "Teste die Darstellung vor der Nutzung, da nicht jede Plattform alle Zeichen unterstuetzt.",
    "faqTopics": [
      "kursiver text kopieren",
      "italic text",
      "text schraeg"
    ],
    "searchIntentNote": "Distinct from Kursivschrift slug to avoid collision with cursive tool.",
    "riskSafetyNote": "Compatibility/accessibility warning."
  },
  {
    "canonicalToolId": "small-text-generator",
    "language": "es",
    "primaryKeyword": "letras pequenas",
    "localizedSlug": "letras-pequenas",
    "h1": "Generador de letras pequenas",
    "metaTitle": "Letras pequenas para copiar",
    "metaDescription": "Convierte texto en caracteres pequenos decorativos para copiar y pegar.",
    "intro": "Genera texto pequeno y comprueba legibilidad, accesibilidad y compatibilidad.",
    "faqTopics": [
      "texto pequeno",
      "letras mini",
      "small text copiar"
    ],
    "searchIntentNote": "Spanish local copy intent is letras pequenas/texto pequeno.",
    "riskSafetyNote": "Accessibility and readability risk."
  },
  {
    "canonicalToolId": "small-text-generator",
    "language": "fr",
    "primaryKeyword": "petit texte",
    "localizedSlug": "petit-texte",
    "h1": "Generateur de petit texte",
    "metaTitle": "Petit texte a copier",
    "metaDescription": "Transformez du texte en petits caracteres decoratifs a copier.",
    "intro": "Utilisez le petit texte avec moderation et verifiez lisibilite sur mobile.",
    "faqTopics": [
      "petites lettres",
      "small text",
      "texte miniature"
    ],
    "searchIntentNote": "French query favors petit texte/petites lettres.",
    "riskSafetyNote": "Accessibility and readability risk."
  },
  {
    "canonicalToolId": "small-text-generator",
    "language": "de",
    "primaryKeyword": "kleiner text generator",
    "localizedSlug": "kleiner-text-generator",
    "h1": "Kleiner Text Generator",
    "metaTitle": "Kleiner Text Generator kostenlos",
    "metaDescription": "Erstelle kleinen Unicode-Text zum Kopieren fuer Profile und Nachrichten.",
    "intro": "Pruefe Lesbarkeit, Barrierefreiheit und Plattform-Kompatibilitaet.",
    "faqTopics": [
      "kleine schrift",
      "small text",
      "mini text kopieren"
    ],
    "searchIntentNote": "German native phrase is clear.",
    "riskSafetyNote": "Accessibility and readability risk."
  },
  {
    "canonicalToolId": "reverse-text-generator",
    "language": "es",
    "primaryKeyword": "invertir texto",
    "localizedSlug": "invertir-texto",
    "h1": "Invertir texto",
    "metaTitle": "Invertir texto online gratis",
    "metaDescription": "Invierte letras o texto completo para juegos, formatos creativos o pruebas rapidas.",
    "intro": "Pega tu texto, genera la version invertida y revisa que el resultado siga siendo correcto.",
    "faqTopics": [
      "texto al reves",
      "invertir palabras",
      "escribir al reves"
    ],
    "searchIntentNote": "Spanish task query is stronger than generator wording.",
    "riskSafetyNote": "Low risk; caution with sensitive text pasted into tools."
  },
  {
    "canonicalToolId": "reverse-text-generator",
    "language": "fr",
    "primaryKeyword": "inverser texte",
    "localizedSlug": "inverser-texte",
    "h1": "Inverser un texte",
    "metaTitle": "Inverser un texte en ligne",
    "metaDescription": "Inversez un texte ou des caracteres pour tests, jeux de mots ou effets creatifs.",
    "intro": "Collez votre texte, obtenez la version inversee et relisez le resultat avant usage.",
    "faqTopics": [
      "texte a l'envers",
      "inverser mots",
      "ecrire a l'envers"
    ],
    "searchIntentNote": "French task verb better captures intent.",
    "riskSafetyNote": "Low risk; caution with sensitive text."
  },
  {
    "canonicalToolId": "reverse-text-generator",
    "language": "de",
    "primaryKeyword": "text umdrehen",
    "localizedSlug": "text-umdrehen",
    "h1": "Text umdrehen",
    "metaTitle": "Text umdrehen online",
    "metaDescription": "Drehe Text oder Zeichenfolgen fuer Tests, Spiele und kreative Effekte um.",
    "intro": "Fuege Text ein, erzeuge die umgekehrte Version und pruefe das Ergebnis.",
    "faqTopics": [
      "text rueckwaerts",
      "woerter umdrehen",
      "spiegeltext"
    ],
    "searchIntentNote": "German users search task phrase Text umdrehen.",
    "riskSafetyNote": "Low risk; caution with sensitive text."
  },
  {
    "canonicalToolId": "text-case-converter",
    "language": "es",
    "primaryKeyword": "convertidor de mayusculas y minusculas",
    "localizedSlug": "convertidor-de-mayusculas-y-minusculas",
    "h1": "Convertidor de mayusculas y minusculas",
    "metaTitle": "Convertidor de mayusculas y minusculas gratis",
    "metaDescription": "Cambia texto entre mayusculas, minusculas, titulo y otros formatos comunes.",
    "intro": "Pega texto y conviertelo al formato de capitalizacion que necesites.",
    "faqTopics": [
      "pasar a mayusculas",
      "convertir minusculas",
      "capitalizar texto"
    ],
    "searchIntentNote": "Direct utility intent in Spanish.",
    "riskSafetyNote": "Low risk; caution with sensitive text."
  },
  {
    "canonicalToolId": "text-case-converter",
    "language": "fr",
    "primaryKeyword": "convertisseur majuscules minuscules",
    "localizedSlug": "convertisseur-majuscules-minuscules",
    "h1": "Convertisseur majuscules minuscules",
    "metaTitle": "Convertisseur majuscules minuscules gratuit",
    "metaDescription": "Convertissez du texte en majuscules, minuscules, casse titre ou formats similaires.",
    "intro": "Collez le texte et choisissez la casse adaptee a votre document ou contenu.",
    "faqTopics": [
      "mettre en majuscules",
      "minuscules",
      "changer la casse"
    ],
    "searchIntentNote": "French local task query uses majuscules/minuscules.",
    "riskSafetyNote": "Low risk; caution with sensitive text."
  },
  {
    "canonicalToolId": "text-case-converter",
    "language": "de",
    "primaryKeyword": "gross kleinschreibung umwandeln",
    "localizedSlug": "gross-kleinschreibung-umwandeln",
    "h1": "Gross Kleinschreibung umwandeln",
    "metaTitle": "Gross Kleinschreibung online umwandeln",
    "metaDescription": "Wandle Text in Grossbuchstaben, Kleinbuchstaben, Titelschreibweise und weitere Formate um.",
    "intro": "Fuege Text ein und waehle die passende Schreibweise fuer deinen Inhalt.",
    "faqTopics": [
      "text in grossbuchstaben",
      "kleinbuchstaben",
      "text formatieren"
    ],
    "searchIntentNote": "German task phrase is more natural than converter loanword.",
    "riskSafetyNote": "Low risk; caution with sensitive text."
  },
  {
    "canonicalToolId": "word-counter",
    "language": "es",
    "primaryKeyword": "contador de palabras",
    "localizedSlug": "contador-de-palabras",
    "h1": "Contador de palabras",
    "metaTitle": "Contador de palabras online gratis",
    "metaDescription": "Cuenta palabras, caracteres y longitud de texto para articulos, tareas o publicaciones.",
    "intro": "Pega tu texto y revisa conteos utiles sin cambiar el contenido original.",
    "faqTopics": [
      "contar palabras",
      "contador de caracteres",
      "longitud de texto"
    ],
    "searchIntentNote": "Direct high-volume utility intent.",
    "riskSafetyNote": "Low risk; avoid storing sensitive text."
  },
  {
    "canonicalToolId": "word-counter",
    "language": "fr",
    "primaryKeyword": "compteur de mots",
    "localizedSlug": "compteur-de-mots",
    "h1": "Compteur de mots",
    "metaTitle": "Compteur de mots en ligne gratuit",
    "metaDescription": "Comptez les mots, caracteres et longueurs de texte pour articles, devoirs ou posts.",
    "intro": "Collez votre texte et obtenez des compteurs utiles sans modifier le contenu.",
    "faqTopics": [
      "compter les mots",
      "compteur caracteres",
      "longueur texte"
    ],
    "searchIntentNote": "Direct French utility intent.",
    "riskSafetyNote": "Low risk; avoid storing sensitive text."
  },
  {
    "canonicalToolId": "word-counter",
    "language": "de",
    "primaryKeyword": "wortzaehler",
    "localizedSlug": "wortzaehler",
    "h1": "Wortzaehler",
    "metaTitle": "Wortzaehler online kostenlos",
    "metaDescription": "Zaehle Woerter, Zeichen und Textlaenge fuer Artikel, Aufgaben oder Beitraege.",
    "intro": "Fuege Text ein und erhalte schnelle Zaehlungen, ohne den Inhalt zu veraendern.",
    "faqTopics": [
      "woerter zaehlen",
      "zeichenzahler",
      "textlaenge"
    ],
    "searchIntentNote": "German head term is Wortzaehler; slug ASCII-normalized.",
    "riskSafetyNote": "Low risk; avoid storing sensitive text."
  },
  {
    "canonicalToolId": "paragraph-generator",
    "language": "es",
    "primaryKeyword": "generador de parrafos",
    "localizedSlug": "generador-de-parrafos",
    "h1": "Generador de parrafos",
    "metaTitle": "Generador de parrafos gratis",
    "metaDescription": "Crea borradores de parrafos para ideas, articulos, descripciones o ejercicios de escritura.",
    "intro": "Genera texto inicial y revisa hechos, tono y originalidad antes de publicarlo.",
    "faqTopics": [
      "parrafos para textos",
      "escribir parrafo",
      "ideas de parrafos"
    ],
    "searchIntentNote": "Direct writing-assist intent.",
    "riskSafetyNote": "Review factual claims and avoid submitting unedited work."
  },
  {
    "canonicalToolId": "paragraph-generator",
    "language": "fr",
    "primaryKeyword": "generateur de paragraphes",
    "localizedSlug": "generateur-de-paragraphes",
    "h1": "Generateur de paragraphes",
    "metaTitle": "Generateur de paragraphes gratuit",
    "metaDescription": "Creez des brouillons de paragraphes pour idees, articles, descriptions ou exercices.",
    "intro": "Generez une base de texte puis relisez faits, ton et originalite.",
    "faqTopics": [
      "ecrire un paragraphe",
      "paragraphe exemple",
      "idees paragraphes"
    ],
    "searchIntentNote": "Direct French writing generator intent.",
    "riskSafetyNote": "Review factual claims and avoid submitting unedited work."
  },
  {
    "canonicalToolId": "paragraph-generator",
    "language": "de",
    "primaryKeyword": "absatz generator",
    "localizedSlug": "absatz-generator",
    "h1": "Absatz Generator",
    "metaTitle": "Absatz Generator kostenlos",
    "metaDescription": "Erstelle Absatz-Entwuerfe fuer Ideen, Artikel, Beschreibungen und Schreibuebungen.",
    "intro": "Nutze den Text als Grundlage und pruefe Fakten, Ton und Originalitaet.",
    "faqTopics": [
      "absatz schreiben",
      "textabschnitt",
      "absatz beispiel"
    ],
    "searchIntentNote": "German writing query uses Absatz Generator.",
    "riskSafetyNote": "Review factual claims and avoid submitting unedited work."
  },
  {
    "canonicalToolId": "sentence-generator",
    "language": "es",
    "primaryKeyword": "generador de oraciones",
    "localizedSlug": "generador-de-oraciones",
    "h1": "Generador de oraciones",
    "metaTitle": "Generador de oraciones gratis",
    "metaDescription": "Crea oraciones de ejemplo para escritura, practica, contenido o lluvia de ideas.",
    "intro": "Genera frases base y ajusta gramatica, contexto y precision antes de usarlas.",
    "faqTopics": [
      "oraciones de ejemplo",
      "crear frases",
      "frases para escribir"
    ],
    "searchIntentNote": "Spanish oraciones is better for sentence tool than frases in some contexts.",
    "riskSafetyNote": "Review grammar and factual context."
  },
  {
    "canonicalToolId": "sentence-generator",
    "language": "fr",
    "primaryKeyword": "generateur de phrases",
    "localizedSlug": "generateur-de-phrases",
    "h1": "Generateur de phrases",
    "metaTitle": "Generateur de phrases gratuit",
    "metaDescription": "Creez des phrases d'exemple pour ecriture, apprentissage, contenu ou ideation.",
    "intro": "Generez des phrases puis adaptez grammaire, contexte et precision.",
    "faqTopics": [
      "phrases exemple",
      "creer une phrase",
      "idees de phrases"
    ],
    "searchIntentNote": "Direct French sentence generation intent.",
    "riskSafetyNote": "Review grammar and factual context."
  },
  {
    "canonicalToolId": "sentence-generator",
    "language": "de",
    "primaryKeyword": "satz generator",
    "localizedSlug": "satz-generator",
    "h1": "Satz Generator",
    "metaTitle": "Satz Generator kostenlos",
    "metaDescription": "Erstelle Beispielsatze fuer Schreiben, Lernen, Content und Ideenfindung.",
    "intro": "Passe Grammatik, Kontext und Genauigkeit an, bevor du Saetze verwendest.",
    "faqTopics": [
      "beispielsaetze",
      "satz schreiben",
      "saetze generieren"
    ],
    "searchIntentNote": "German direct term Satz Generator.",
    "riskSafetyNote": "Review grammar and factual context."
  },
  {
    "canonicalToolId": "writing-prompt-generator",
    "language": "es",
    "primaryKeyword": "ideas para escribir",
    "localizedSlug": "ideas-para-escribir",
    "h1": "Generador de ideas para escribir",
    "metaTitle": "Ideas para escribir gratis",
    "metaDescription": "Encuentra prompts e ideas para cuentos, escenas, diarios o ejercicios creativos.",
    "intro": "Genera disparadores de escritura y adaptalos a tu voz, genero y objetivo.",
    "faqTopics": [
      "prompts de escritura",
      "ideas para cuentos",
      "ejercicios creativos"
    ],
    "searchIntentNote": "Spanish local intent favors writing ideas over prompt literal.",
    "riskSafetyNote": "Avoid school dishonesty framing; creative support only."
  },
  {
    "canonicalToolId": "writing-prompt-generator",
    "language": "fr",
    "primaryKeyword": "generateur d'idees d'ecriture",
    "localizedSlug": "generateur-didees-decriture",
    "h1": "Generateur d'idees d'ecriture",
    "metaTitle": "Idees d'ecriture gratuites",
    "metaDescription": "Trouvez des idees et prompts pour histoires, scenes, journaux ou exercices creatifs.",
    "intro": "Generez un point de depart puis adaptez-le a votre voix et a votre genre.",
    "faqTopics": [
      "prompts ecriture",
      "idees histoire",
      "exercice ecriture"
    ],
    "searchIntentNote": "French phrase captures prompt intent naturally.",
    "riskSafetyNote": "Avoid academic dishonesty framing."
  },
  {
    "canonicalToolId": "writing-prompt-generator",
    "language": "de",
    "primaryKeyword": "schreibimpulse generator",
    "localizedSlug": "schreibimpulse-generator",
    "h1": "Schreibimpulse Generator",
    "metaTitle": "Schreibimpulse Generator kostenlos",
    "metaDescription": "Finde Schreibimpulse fuer Geschichten, Szenen, Journale und kreative Uebungen.",
    "intro": "Nutze die Ideen als Startpunkt und entwickle sie mit eigener Stimme weiter.",
    "faqTopics": [
      "schreibideen",
      "writing prompts",
      "geschichten ideen"
    ],
    "searchIntentNote": "German native term Schreibimpulse matches creative prompt intent.",
    "riskSafetyNote": "Avoid academic dishonesty framing."
  },
  {
    "canonicalToolId": "blog-outline-generator",
    "language": "es",
    "primaryKeyword": "esquema para blog",
    "localizedSlug": "esquema-para-blog",
    "h1": "Generador de esquema para blog",
    "metaTitle": "Esquema para blog gratis",
    "metaDescription": "Crea estructuras de articulos con secciones, subtitulos e ideas principales.",
    "intro": "Genera un esquema inicial y ajustalo segun intencion de busqueda y experiencia real.",
    "faqTopics": [
      "estructura de blog",
      "outline de articulo",
      "plan de contenido"
    ],
    "searchIntentNote": "Spanish intent is outline/structure for blog posts.",
    "riskSafetyNote": "Avoid thin SEO content; require human expertise."
  },
  {
    "canonicalToolId": "blog-outline-generator",
    "language": "fr",
    "primaryKeyword": "generateur de plan d'article",
    "localizedSlug": "generateur-de-plan-darticle",
    "h1": "Generateur de plan d'article",
    "metaTitle": "Generateur de plan d'article gratuit",
    "metaDescription": "Creez un plan d'article avec sections, sous-titres et idees principales.",
    "intro": "Generez une structure puis adaptez-la a l'intention de recherche et a votre expertise.",
    "faqTopics": [
      "plan article blog",
      "structure article",
      "outline blog"
    ],
    "searchIntentNote": "French users search plan d'article more than blog outline.",
    "riskSafetyNote": "Avoid thin SEO content; require human expertise."
  },
  {
    "canonicalToolId": "blog-outline-generator",
    "language": "de",
    "primaryKeyword": "blog gliederung generator",
    "localizedSlug": "blog-gliederung-generator",
    "h1": "Blog Gliederung Generator",
    "metaTitle": "Blog Gliederung Generator kostenlos",
    "metaDescription": "Erstelle Gliederungen fuer Blogartikel mit Abschnitten, Ueberschriften und Kernideen.",
    "intro": "Passe die Struktur an Suchintention, Erfahrung und echte Inhalte an.",
    "faqTopics": [
      "blog outline",
      "artikel gliederung",
      "content plan"
    ],
    "searchIntentNote": "German Gliederung is better local intent than literal outline alone.",
    "riskSafetyNote": "Avoid thin SEO content; require human expertise."
  },
  {
    "canonicalToolId": "product-description-generator",
    "language": "es",
    "primaryKeyword": "generador de descripciones de productos",
    "localizedSlug": "generador-de-descripciones-de-productos",
    "h1": "Generador de descripciones de productos",
    "metaTitle": "Generador de descripciones de productos gratis",
    "metaDescription": "Crea borradores de descripciones para productos, tiendas y fichas comerciales.",
    "intro": "Genera texto de producto y revisa exactitud, beneficios, politicas y cumplimiento.",
    "faqTopics": [
      "descripcion de producto",
      "ficha de producto",
      "copy ecommerce"
    ],
    "searchIntentNote": "Direct ecommerce copy intent.",
    "riskSafetyNote": "Must verify factual claims, pricing, compliance, and policies."
  },
  {
    "canonicalToolId": "product-description-generator",
    "language": "fr",
    "primaryKeyword": "generateur de description produit",
    "localizedSlug": "generateur-de-description-produit",
    "h1": "Generateur de description produit",
    "metaTitle": "Generateur de description produit gratuit",
    "metaDescription": "Redigez des brouillons de descriptions pour produits, boutiques et fiches e-commerce.",
    "intro": "Generez une base puis verifiez faits, avantages, politiques et conformite.",
    "faqTopics": [
      "description produit",
      "fiche produit",
      "texte ecommerce"
    ],
    "searchIntentNote": "Direct French ecommerce copy intent.",
    "riskSafetyNote": "Must verify factual claims, pricing, compliance, and policies."
  },
  {
    "canonicalToolId": "product-description-generator",
    "language": "de",
    "primaryKeyword": "produktbeschreibung generator",
    "localizedSlug": "produktbeschreibung-generator",
    "h1": "Produktbeschreibung Generator",
    "metaTitle": "Produktbeschreibung Generator kostenlos",
    "metaDescription": "Erstelle Entwuerfe fuer Produktbeschreibungen, Shops und Verkaufsseiten.",
    "intro": "Pruefe Fakten, Vorteile, Richtlinien und rechtliche Aussagen vor Veroeffentlichung.",
    "faqTopics": [
      "produktbeschreibung schreiben",
      "shop text",
      "ecommerce copy"
    ],
    "searchIntentNote": "Natural German compound for ecommerce copy.",
    "riskSafetyNote": "Must verify factual claims, pricing, compliance, and policies."
  },
  ...additionalLocalizedPilotToolData,
  ...rolloutB01LocalizedToolData,
  ...rolloutB02LocalizedToolData,
  ...rolloutB03LocalizedToolData,
  ...rolloutB04LocalizedToolData,
  ...rolloutB05LocalizedToolData,
  ...rolloutB06LocalizedToolData,
  ...rolloutB07LocalizedToolData,
  ...rolloutB08LocalizedToolData,
];
