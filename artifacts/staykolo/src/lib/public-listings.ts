export const verifiedPg = {
  id: 'aparna-ladies-pg-attiguppe',
  slug: 'aparna-ladies-pg-attiguppe',
  name: 'Aparna Ladies PG',
  area: 'Attiguppe',
  address: '26/1, opposite Time for Team, Attiguppe, Bengaluru, Karnataka',
  googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Aparna Ladies PG, 26/1 opposite Time for Team, Attiguppe, Bengaluru')}`,
  amenities: ['Wi-Fi', 'Water', 'Fan'],
} as const;

export const standardAmenities = ['Wi-Fi', 'Water', 'Fan'] as const;

export function isStaykoloVerified(id: string) {
  return id === verifiedPg.id;
}
