import { getCanonicalUrl } from './canonical';

export function buildWebApplicationSchema(name: string, description: string, slug: string) {
  const url = getCanonicalUrl(`/tools/${slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": url,
    "name": name,
    "url": url,
    "description": description,
    "applicationCategory": "Utility",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5."
  };
}
