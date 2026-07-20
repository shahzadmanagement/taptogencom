import type { LocalizedToolContent } from './localization';
import {
  languages,
  phrase,
  profiles,
  safetyFor,
  slugFor,
  type RolloutToolSpec,
} from './localization-rollout-b01-data';

const tools: RolloutToolSpec[] = [
  {
    "canonicalToolId": "instagram-bio-generator",
    "label": "Biografía para Instagram",
    "slugBase": "biografia-para-instagram",
    "kind": "writing"
  },
  {
    "canonicalToolId": "password-generator",
    "label": "Contraseñas",
    "slugBase": "contrasenas",
    "kind": "developer"
  },
  {
    "canonicalToolId": "twitter-bio-generator",
    "label": "Biografía para Twitter",
    "slugBase": "biografia-para-twitter",
    "kind": "writing"
  },
  {
    "canonicalToolId": "tiktok-bio-generator",
    "label": "Biografía para TikTok",
    "slugBase": "biografia-para-tiktok",
    "kind": "writing"
  },
  {
    "canonicalToolId": "linkedin-bio-generator",
    "label": "Biografía para LinkedIn",
    "slugBase": "biografia-para-linkedin",
    "kind": "writing"
  },
  {
    "canonicalToolId": "youtube-name-generator",
    "label": "Nombres para YouTube",
    "slugBase": "nombres-para-youtube",
    "kind": "name"
  },
  {
    "canonicalToolId": "instagram-caption-generator",
    "label": "Pies de Foto para Instagram",
    "slugBase": "pies-de-foto-para-instagram",
    "kind": "writing"
  },
  {
    "canonicalToolId": "fake-name-generator",
    "label": "Nombres Falsos",
    "slugBase": "nombres-falsos",
    "kind": "name"
  },
  {
    "canonicalToolId": "shakespeare-insult-generator",
    "label": "Insultos de Shakespeare",
    "slugBase": "insultos-de-shakespeare",
    "kind": "random"
  },
  {
    "canonicalToolId": "tiktok-name-generator",
    "label": "Nombres para TikTok",
    "slugBase": "nombres-para-tiktok",
    "kind": "name"
  },
  {
    "canonicalToolId": "instagram-name-generator",
    "label": "Nombres para Instagram",
    "slugBase": "nombres-para-instagram",
    "kind": "name"
  },
  {
    "canonicalToolId": "comeback-generator",
    "label": "Respuestas Ingeniosas",
    "slugBase": "respuestas-ingeniosas",
    "kind": "random"
  },
  {
    "canonicalToolId": "twitter-name-generator",
    "label": "Nombres para Twitter",
    "slugBase": "nombres-para-twitter",
    "kind": "name"
  },
  {
    "canonicalToolId": "linkedin-headline-generator",
    "label": "Titulares para LinkedIn",
    "slugBase": "titulares-para-linkedin",
    "kind": "writing"
  },
  {
    "canonicalToolId": "pin-generator",
    "label": "Código PIN",
    "slugBase": "codigo-pin",
    "kind": "developer"
  },
  {
    "canonicalToolId": "api-key-generator",
    "label": "Claves API",
    "slugBase": "claves-api",
    "kind": "developer"
  },
  {
    "canonicalToolId": "privacy-policy-generator",
    "label": "Política de Privacidad",
    "slugBase": "politica-de-privacidad",
    "kind": "business"
  },
  {
    "canonicalToolId": "terms-generator",
    "label": "Términos y Condiciones",
    "slugBase": "terminos-y-condiciones",
    "kind": "business"
  },
  {
    "canonicalToolId": "cookie-policy-generator",
    "label": "Política de Cookies",
    "slugBase": "politica-de-cookies",
    "kind": "business"
  },
  {
    "canonicalToolId": "disclaimer-generator",
    "label": "Descargo de Responsabilidad",
    "slugBase": "descargo-de-responsabilidad",
    "kind": "business"
  },
  {
    "canonicalToolId": "twitter-card-generator",
    "label": "Tarjetas de Twitter",
    "slugBase": "tarjetas-de-twitter",
    "kind": "seo"
  },
  {
    "canonicalToolId": "youtube-description-generator",
    "label": "Descripciones para YouTube",
    "slugBase": "descripciones-para-youtube",
    "kind": "writing"
  },
  {
    "canonicalToolId": "tiktok-caption-generator",
    "label": "Subtítulos para TikTok",
    "slugBase": "subtitulos-para-tiktok",
    "kind": "writing"
  },
  {
    "canonicalToolId": "license-key-generator",
    "label": "Claves de Licencia",
    "slugBase": "claves-de-licencia",
    "kind": "developer"
  },
  {
    "canonicalToolId": "recovery-code-generator",
    "label": "Códigos de Recuperación",
    "slugBase": "codigos-de-recuperacion",
    "kind": "developer"
  },
  {
    "canonicalToolId": "refund-policy-generator",
    "label": "Política de Reembolso",
    "slugBase": "politica-de-reembolso",
    "kind": "business"
  },
  {
    "canonicalToolId": "shipping-policy-generator",
    "label": "Política de Envío",
    "slugBase": "politica-de-envio",
    "kind": "business"
  },
  {
    "canonicalToolId": "affiliate-disclosure-generator",
    "label": "Divulgación de Afiliados",
    "slugBase": "divulgacion-de-afiliados",
    "kind": "business"
  },
  {
    "canonicalToolId": "invoice-generator",
    "label": "Facturas",
    "slugBase": "facturas",
    "kind": "business"
  },
  {
    "canonicalToolId": "linkedin-post-generator",
    "label": "Publicaciones para LinkedIn",
    "slugBase": "publicaciones-para-linkedin",
    "kind": "writing"
  },
  {
    "canonicalToolId": "facebook-post-generator",
    "label": "Publicaciones para Facebook",
    "slugBase": "publicaciones-para-facebook",
    "kind": "writing"
  },
  {
    "canonicalToolId": "ao3-tag-generator",
    "label": "Etiquetas AO3",
    "slugBase": "etiquetas-ao3",
    "kind": "creative"
  },
  {
    "canonicalToolId": "x-post-generator",
    "label": "Publicaciones para X",
    "slugBase": "publicaciones-para-x",
    "kind": "writing"
  },
  {
    "canonicalToolId": "random-address-generator",
    "label": "Direcciones Aleatorias",
    "slugBase": "direcciones-aleatorias",
    "kind": "utility"
  },
  {
    "canonicalToolId": "roast-generator",
    "label": "Insultos Humorísticos",
    "slugBase": "insultos-humoristicos",
    "kind": "random"
  },
  {
    "canonicalToolId": "jwt-generator",
    "label": "Tokens JWT",
    "slugBase": "tokens-jwt",
    "kind": "developer"
  },
  {
    "canonicalToolId": "amazon-listing-generator",
    "label": "Fichas para Amazon",
    "slugBase": "fichas-para-amazon",
    "kind": "business"
  },
  {
    "canonicalToolId": "etsy-listing-generator",
    "label": "Fichas para Etsy",
    "slugBase": "fichas-para-etsy",
    "kind": "business"
  },
  {
    "canonicalToolId": "youtube-hook-generator",
    "label": "Ganchos para YouTube",
    "slugBase": "ganchos-para-youtube",
    "kind": "writing"
  },
  {
    "canonicalToolId": "linkedin-summary-generator",
    "label": "Resumen para LinkedIn",
    "slugBase": "resumen-para-linkedin",
    "kind": "writing"
  },
  {
    "canonicalToolId": "receipt-generator",
    "label": "Recibos",
    "slugBase": "recibos",
    "kind": "business"
  },
  {
    "canonicalToolId": "nda-generator",
    "label": "Acuerdos de Confidencialidad",
    "slugBase": "acuerdos-de-confidencialidad",
    "kind": "business"
  },
  {
    "canonicalToolId": "acceptable-use-policy-generator",
    "label": "Política de Uso Aceptable",
    "slugBase": "politica-de-uso-aceptable",
    "kind": "business"
  },
  {
    "canonicalToolId": "chatgpt-prompt-generator",
    "label": "Prompts para ChatGPT",
    "slugBase": "prompts-para-chatgpt",
    "kind": "writing"
  },
  {
    "canonicalToolId": "contract-generator",
    "label": "Contratos",
    "slugBase": "contratos",
    "kind": "business"
  },
  {
    "canonicalToolId": "dmca-policy-generator",
    "label": "Política DMCA",
    "slugBase": "politica-dmca",
    "kind": "business"
  },
  {
    "canonicalToolId": "ransom-note-text-generator",
    "label": "Texto Estilo Rescate",
    "slugBase": "texto-estilo-rescate",
    "kind": "text"
  },
  {
    "canonicalToolId": "return-policy-generator",
    "label": "Política de Devolución",
    "slugBase": "politica-de-devolucion",
    "kind": "business"
  },
  {
    "canonicalToolId": "service-agreement-generator",
    "label": "Acuerdos de Servicio",
    "slugBase": "acuerdos-de-servicio",
    "kind": "business"
  },
  {
    "canonicalToolId": "shopify-product-description-generator",
    "label": "Descripciones para Shopify",
    "slugBase": "descripciones-para-shopify",
    "kind": "business"
  },
  {
    "canonicalToolId": "token-generator",
    "label": "Tokens",
    "slugBase": "tokens",
    "kind": "developer"
  }
];

export const rolloutB09ToolIds = tools.map((tool) => tool.canonicalToolId);

export const rolloutB09LocalizedToolData: LocalizedToolContent[] = tools.flatMap((tool) =>
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
