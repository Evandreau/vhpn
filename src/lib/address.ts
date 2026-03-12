/**
 * Central address formatting utility.
 * Strips house numbers and additions for privacy.
 * House numbers/additions are NEVER rendered in UI, URLs, or SEO metadata.
 */

/**
 * Builds a display-safe address from structured Pararius fields.
 * Only uses street + city (+ optionally neighborhood).
 * House number and addition are deliberately excluded.
 */
export function displayAddress(
  street: string,
  city: string,
  neighborhood?: string
): string {
  if (neighborhood) {
    return `${street}, ${neighborhood}, ${city}`;
  }
  return `${street}, ${city}`;
}

/**
 * Builds a display title for a listing without house number.
 * Format: "Straatnaam, Stad"
 */
export function displayTitle(street: string, city: string): string {
  return `${street}, ${city}`;
}

/**
 * Generates a URL-safe slug from street + city only (no house number).
 */
export function generateSafeSlug(street: string, city: string): string {
  const parts = [street, city].filter(Boolean).join(' ');
  return parts
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Strips house number from an existing title string.
 * Fallback for cases where we only have a combined title string.
 * Handles patterns like "Straat 12, Stad", "Straat 12A, Stad", "Straat 12-3, Stad", "Straat 12 bis, Stad"
 * Preserves street names that start with numbers (e.g., "2e Middellandstraat").
 */
export function stripHouseNumber(title: string): string {
  // Match: space + house number (+ optional addition) before comma
  // House number pattern: one or more digits, optionally followed by letter, dash+digits, space+bis, etc.
  return title.replace(
    /\s+\d+(?:\s*[a-zA-Z])?(?:\s*-\s*\d+)?(?:\s+bis)?\s*,/i,
    ','
  );
}
