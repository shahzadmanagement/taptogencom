export function getCanonicalUrl(path: string): string {
  const base = 'https://taptogen.com';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const trailingPath = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
  return `${base}${trailingPath}`;
}
