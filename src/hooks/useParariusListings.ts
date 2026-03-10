import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Listing, InteriorType, District } from "@/data/listings";

interface ParariusPhoto {
  small: string;
  big: string;
  middle: string;
  huge: string;
  category: string;
}

interface ParariusProperty {
  id: string;
  house_id: string;
  client_id: number;
  division: string;
  title: string | null;
  street: string;
  number: string;
  addition: string;
  zipcode: string;
  district: string;
  city: string;
  country: string;
  lat: string;
  lng: string;
  forrent: string;
  price: string;
  price_on_request: string;
  deposit: string;
  available_at: string;
  available_till: string;
  interior: string;
  surface_living: string;
  surface: string;
  bedrooms: string;
  bathrooms: string;
  rooms: string;
  photos: ParariusPhoto[];
  description: string;
  energy_label: string;
  property_type_1: string;
  property_type_2: string;
  property_type_3: string;
  gardens: string[];
  balconies: string;
  roofterrace: string;
  parkings: string[];
  parking_facilities: string[];
  facilities: string[];
  forrent_front_status: string;
  forrent_type: string;
  aanvaarding: string;
  pararius_delen: string;
  utility_costs: string;
  forrent_inclusive_service: string;
  location: string;
  buildyear: string;
  heating: string[];
  living_style: string[];
  url_360_presentation: string;
  registration_date: string;
  online_date: string;
  attachments: { file: string; name: string }[];
  [key: string]: unknown;
}

function mapInterior(interior: string): InteriorType {
  const lower = (interior || '').toLowerCase();
  if (lower.includes('gemeubileerd') || lower.includes('furnished')) return 'gemeubileerd';
  if (lower.includes('gestoffeerd') || lower.includes('upholstered')) return 'gestoffeerd';
  return 'kaal';
}

function mapFurnished(interior: string): boolean {
  const lower = (interior || '').toLowerCase();
  return lower.includes('gemeubileerd') || lower.includes('furnished');
}

function mapDistrict(district: string): District | undefined {
  const mapping: Record<string, District> = {
    'centrum': 'Centrum',
    'noord': 'Noord',
    'zuid': 'Zuid',
    'west': 'West',
    'oost': 'Oost',
  };
  const lower = (district || '').toLowerCase();
  return mapping[lower] || 'Overig';
}

function mapAvailability(aanvaarding: string, availableAt: string): { type: 'immediately' | 'fromDate'; date?: string } {
  const lower = (aanvaarding || '').toLowerCase();
  if (lower.includes('direct') || lower.includes('immediate')) {
    return { type: 'immediately' };
  }
  if (availableAt) {
    return { type: 'fromDate', date: availableAt };
  }
  return { type: 'immediately' };
}

function hasOutdoorSpace(prop: ParariusProperty): { has: boolean; type?: 'balcony' | 'terrace' | 'garden' | 'rooftop'; sqm?: number } {
  const gardens = prop.gardens || [];
  const balconies = parseInt(prop.balconies || '0');
  const roofterrace = (prop.roofterrace || '').toLowerCase();

  if (roofterrace === 'ja' || roofterrace === 'yes') return { has: true, type: 'rooftop' };
  if (gardens.length > 0) return { has: true, type: 'garden' };
  if (balconies > 0) return { has: true, type: 'balcony' };
  return { has: false };
}

function hasParking(prop: ParariusProperty): { has: boolean; type?: 'permit' | 'garage' | 'private' } {
  const parkings = prop.parkings || [];
  const facilities = prop.parking_facilities || [];
  
  if (parkings.length === 0 && facilities.length === 0) return { has: false };
  
  const allParking = [...parkings, ...facilities].join(' ').toLowerCase();
  if (allParking.includes('garage') || allParking.includes('parkeerkelder') || allParking.includes('underground')) {
    return { has: true, type: 'garage' };
  }
  if (allParking.includes('vergunning') || allParking.includes('permit')) {
    return { has: true, type: 'permit' };
  }
  return { has: true, type: 'private' };
}

function extractServiceCostsFromDescription(description: string): number | undefined {
  if (!description) return undefined;
  // Match patterns like "€ 48,00 servicekosten" or "€48 service costs"
  const match = description.match(/€\s*(\d+[.,]?\d*)\s*(?:servicekosten|service\s*costs?)/i);
  if (match) {
    return parseFloat(match[1].replace(',', '.'));
  }
  return undefined;
}

function extractAmenities(prop: ParariusProperty): string[] {
  const amenities: string[] = [];
  const facilities = prop.facilities || [];
  
  // Map common facilities to user-friendly amenity names
  const facilityMap: Record<string, string> = {
    'lift': 'Elevator',
    'elevator': 'Elevator',
    'airconditioning': 'Air Conditioning',
    'zwembad': 'Pool',
    'pool': 'Pool',
    'sauna': 'Sauna',
    'jacuzzi': 'Jacuzzi',
    'glasvezel kabel': 'Fiber Internet',
    'fiber optic cable': 'Fiber Internet',
    'zonnepanelen': 'Solar Panels',
    'solar panels': 'Solar Panels',
    'warmtepomp': 'Heat Pump',
    'heat pump': 'Heat Pump',
    'vloerverwarming geheel': 'Floor Heating',
    'entire floor heating': 'Floor Heating',
    'schuifpui': 'Sliding Door',
    'sliding door': 'Sliding Door',
    'frans balkon': 'French Balcony',
    'french balcony': 'French Balcony',
    'mechanische ventilatie': 'Mechanical Ventilation',
    'mechanical ventilation': 'Mechanical Ventilation',
  };
  
  for (const f of facilities) {
    const lower = (typeof f === 'string' ? f : '').toLowerCase();
    for (const [key, value] of Object.entries(facilityMap)) {
      if (lower.includes(key) && !amenities.includes(value)) {
        amenities.push(value);
      }
    }
  }
  
  // Add location-based amenities
  const location = (prop.location || '').toLowerCase();
  if (location.includes('water') || location.includes('vaarwater')) amenities.push('Near Water');
  if (location.includes('park')) amenities.push('Near Park');
  if (location.includes('centrum') || location.includes('downtown')) amenities.push('Central Location');
  
  // Garden/outdoor
  const gardens = prop.gardens || [];
  if (gardens.length > 0) amenities.push('Garden');
  
  const balconies = parseInt(prop.balconies || '0');
  if (balconies > 0) amenities.push('Balcony');
  
  const roofterrace = (prop.roofterrace || '').toLowerCase();
  if (roofterrace === 'ja' || roofterrace === 'yes') amenities.push('Rooftop Terrace');
  
  // Parking
  const parkingFacilities = prop.parking_facilities || [];
  for (const pf of parkingFacilities) {
    const lower = (typeof pf === 'string' ? pf : '').toLowerCase();
    if (lower.includes('fietsenstalling') || lower.includes('bicycle')) amenities.push('Bicycle Storage');
  }
  
  return amenities;
}

function mapStatus(frontStatus: string): 'available' | 'reserved' | 'rented' {
  const status = String(frontStatus || '');
  if (status === '436' || status === '444') return 'rented'; // Verhuurd / Verhuurd (onder voorbehoud)
  if (status === '443') return 'reserved'; // Verkocht (onder voorbehoud)
  return 'available';
}

function generateSlug(prop: ParariusProperty): string {
  const parts = [
    prop.street,
    prop.number,
    prop.city,
  ].filter(Boolean).join(' ');
  return parts.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function generateTitle(prop: ParariusProperty): string {
  if (prop.title) return prop.title;
  const type = prop.property_type_2 || prop.property_type_1 || 'Property';
  return `${type} ${prop.street} ${prop.number}${prop.addition ? ` ${prop.addition}` : ''}, ${prop.city}`;
}

function mapEnergyLabel(label: string): Listing['energyLabel'] {
  const valid = ['A++', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G'] as const;
  // Normalize: A+++++ → A++
  const normalized = label?.replace(/A\+{3,}/, 'A++');
  if (valid.includes(normalized as any)) return normalized as Listing['energyLabel'];
  return undefined;
}

function transformProperty(prop: ParariusProperty): Listing {
  const availability = mapAvailability(prop.aanvaarding, prop.available_at);
  const outdoor = hasOutdoorSpace(prop);
  const parking = hasParking(prop);
  const photos = (prop.photos || []).filter(p => p.category === 'photo' || !p.category);
  const images = photos.map(p => p.huge || p.big || p.middle || p.small).filter(Boolean);
  const sharing = (prop.pararius_delen || '').toLowerCase();
  const homeSharingAllowed = sharing.includes('meerdere personen') || sharing.includes('multiple tenants');
  
  const serviceCosts = parseFloat(prop.utility_costs || '0') || extractServiceCostsFromDescription(prop.description);

  return {
    id: prop.house_id || prop.id,
    slug: generateSlug(prop),
    title: generateTitle(prop),
    city: prop.city || '',
    neighborhood: prop.district || '',
    district: mapDistrict(prop.district),
    interiorType: mapInterior(prop.interior),
    descriptionShort: (prop.description || '').substring(0, 200).replace(/\s+/g, ' ').trim(),
    descriptionLong: prop.description || '',
    availableType: availability.type,
    availableFromDate: availability.date,
    beds: parseInt(String(prop.bedrooms || '0')) || 0,
    baths: parseInt(String(prop.bathrooms || '0')) || 0,
    sqm: parseInt(prop.surface || prop.surface_living || '0') || 0,
    furnished: mapFurnished(prop.interior),
    priceMonthly: parseFloat(String(prop.price || '0')) || 0,
    deposit: parseFloat(String(prop.deposit || '0')) > 0 ? parseFloat(String(prop.deposit)) : undefined,
    images: images.length > 0 ? images : ['/placeholder.svg'],
    latitude: parseFloat(prop.lat || '0') || 52.37,
    longitude: parseFloat(prop.lng || '0') || 4.89,
    addressDisclosure: 'exact' as const,
    status: mapStatus(prop.forrent_front_status),
    amenities: extractAmenities(prop),
    featured: false,
    verified: true,
    createdAt: prop.registration_date || prop.online_date || new Date().toISOString().split('T')[0],
    petsAllowed: undefined,
    studentsAllowed: undefined,
    homeSharingAllowed,
    outdoorSpace: outdoor.has,
    outdoorSpaceType: outdoor.type,
    parking: parking.has,
    parkingType: parking.type,
    energyLabel: mapEnergyLabel(prop.energy_label),
    serviceCostsMonthly: serviceCosts || undefined,
    videoTourUrl: prop.url_360_presentation || undefined,
  };
}

async function fetchParariusProperties(lang: string): Promise<Listing[]> {
  const { data, error } = await supabase.functions.invoke('pararius-properties', {
    body: { action: 'getproperties', lang: lang === 'nl' ? 'nl' : 'en' },
  });

  if (error) {
    console.error('Error fetching Pararius properties:', error);
    throw error;
  }

  if (!data?.success || !data?.rawResponse) {
    throw new Error('Invalid API response');
  }

  // Parse the raw JSON response
  let parsed: { result: { properties?: Record<string, ParariusProperty> } };
  try {
    parsed = typeof data.rawResponse === 'string' ? JSON.parse(data.rawResponse) : data.rawResponse;
  } catch {
    throw new Error('Failed to parse Pararius response');
  }

  const propsMap = parsed?.result?.properties;
  if (!propsMap) {
    return [];
  }

  const properties = Object.values(propsMap);
  return properties
    .map(transformProperty)
    .filter(l => l.priceMonthly > 0 && l.status !== 'rented');
}

export function useParariusListings(lang: string = 'en') {
  return useQuery({
    queryKey: ['pararius-listings', lang],
    queryFn: () => fetchParariusProperties(lang),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

export function useParariusListing(id: string, lang: string = 'en') {
  const { data: listings, ...rest } = useParariusListings(lang);
  const listing = listings?.find(l => l.id === id);
  return { data: listing, ...rest };
}
