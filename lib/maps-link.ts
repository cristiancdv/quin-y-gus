/**
 * Builds a Google Maps search/directions URL for a venue query string.
 * Static, non-sensitive — safe to compute anywhere.
 */
export function buildGoogleMapsUrl(query: string): string {
  const params = new URLSearchParams({ api: "1", query });
  return `https://www.google.com/maps/search/?${params.toString()}`;
}
