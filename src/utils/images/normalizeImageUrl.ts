const IMGUR_PAGE_REGEX = /^https?:\/\/imgur\.com\/([a-zA-Z0-9]+)$/;
const IMGUR_DIRECT_REGEX = /^https?:\/\/i\.imgur\.com\//;

export function normalizeImageUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';

  // Already a direct imgur link
  if (IMGUR_DIRECT_REGEX.test(trimmed)) return trimmed;

  // Convert imgur page URL to direct image URL
  const imgurMatch = trimmed.match(IMGUR_PAGE_REGEX);
  if (imgurMatch) {
    return `https://i.imgur.com/${imgurMatch[1]}.png`;
  }

  return trimmed;
}
