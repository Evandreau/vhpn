export type District = 'Centrum' | 'Noord' | 'Zuid' | 'West' | 'Oost' | 'Overig';
export type InteriorType = 'kaal' | 'gestoffeerd' | 'gemeubileerd';

export interface Listing {
  id: string;
  slug: string;
  title: string;
  city: string;
  neighborhood: string;
  district?: District;
  interiorType: InteriorType;
  descriptionShort: string;
  descriptionLong: string;
  availableType: 'immediately' | 'fromDate';
  availableFromDate?: string;
  beds: number;
  baths: number;
  sqm: number;
  furnished: boolean;
  priceMonthly: number;
  deposit?: number;
  minRentalPeriodMonths?: number;
  homeSharingAllowed?: boolean;
  studentsAllowed?: boolean;
  petsAllowed?: boolean;
  outdoorSpace?: boolean;
  outdoorSpaceType?: 'balcony' | 'terrace' | 'garden' | 'rooftop';
  outdoorSpaceSqm?: number;
  parking?: boolean;
  parkingType?: 'permit' | 'garage' | 'private';
  energyLabel?: 'A++' | 'A+' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  serviceCostsMonthly?: number;
  images: string[];
  videoTourUrl?: string;
  latitude: number;
  longitude: number;
  addressDisclosure: 'exact' | 'approx';
  status: 'available' | 'reserved' | 'rented';
  amenities: string[];
  featured: boolean;
  verified: boolean;
  createdAt: string;
}

export const listings: Listing[] = [
  {
    id: "1",
    slug: "canal-view-apartment-jordaan-amsterdam",
    title: "Canal-View Apartment in Jordaan",
    city: "Amsterdam",
    neighborhood: "Jordaan",
    district: "Centrum",
    interiorType: "gemeubileerd",
    priceMonthly: 2850,
    beds: 2,
    baths: 1,
    sqm: 85,
    furnished: true,
    deposit: 5700,
    minRentalPeriodMonths: 12,
    availableType: "fromDate",
    availableFromDate: "2025-02-01",
    descriptionShort: "A beautifully restored apartment overlooking one of Amsterdam's most picturesque canals in the heart of Jordaan.",
    descriptionLong: "A beautifully restored apartment overlooking one of Amsterdam's most picturesque canals. Original wooden beams and floors meet contemporary comfort. The living space flows naturally into a modern kitchen with high-end appliances. Two generous bedrooms, both with canal views. The location is unbeatable—steps from boutiques, galleries, and the city's best cafés.\n\nThe apartment features a spacious living room with large windows that flood the space with natural light. The kitchen is fully equipped with premium appliances including a dishwasher, induction cooktop, and combination oven. Both bedrooms offer ample closet space and the bathroom has been recently renovated with high-quality fixtures.",
    amenities: ["Canal View", "Washing Machine", "Dishwasher", "Balcony", "Bicycle Storage", "Central Heating", "Wood Floors"],
    images: [
      "/src/assets/listing-1-jordaan.jpg"
    ],
    featured: true,
    verified: true,
    latitude: 52.3738,
    longitude: 4.8810,
    addressDisclosure: "exact",
    status: "available",
    petsAllowed: false,
    studentsAllowed: false,
    homeSharingAllowed: false,
    outdoorSpace: true,
    outdoorSpaceType: 'balcony',
    outdoorSpaceSqm: 8,
    parking: false,
    energyLabel: 'B',
    serviceCostsMonthly: 150,
    createdAt: "2025-01-10"
  },
  {
    id: "2",
    slug: "modern-loft-rotterdam-centre",
    title: "Modern Loft in Rotterdam Centre",
    city: "Rotterdam",
    neighborhood: "Centrum",
    district: "Centrum",
    interiorType: "gemeubileerd",
    priceMonthly: 2200,
    beds: 1,
    baths: 1,
    sqm: 72,
    furnished: true,
    deposit: 4400,
    minRentalPeriodMonths: 6,
    availableType: "immediately",
    descriptionShort: "Industrial-chic loft in the heart of Rotterdam's vibrant city centre with high ceilings and exposed brick.",
    descriptionLong: "Industrial-chic loft in the heart of Rotterdam's vibrant city centre. High ceilings, exposed brick, and floor-to-ceiling windows flood the space with natural light. The open-plan layout maximizes every square metre, with a mezzanine bedroom and a designer kitchen below. Walking distance to Markthal and Central Station.\n\nThis unique property combines historical industrial architecture with modern luxury. The building offers shared amenities including a rooftop terrace with city views and a fitness center. Perfect for young professionals who appreciate design and urban living.",
    amenities: ["High Ceilings", "Exposed Brick", "Air Conditioning", "Gym Access", "Concierge", "Rooftop Terrace"],
    images: [
      "/src/assets/listing-2-rotterdam-loft.jpg"
    ],
    featured: true,
    verified: true,
    latitude: 51.9244,
    longitude: 4.4777,
    addressDisclosure: "exact",
    status: "available",
    petsAllowed: true,
    studentsAllowed: true,
    homeSharingAllowed: false,
    outdoorSpace: true,
    outdoorSpaceType: 'rooftop',
    outdoorSpaceSqm: 25,
    parking: false,
    parkingType: 'permit',
    energyLabel: 'A',
    serviceCostsMonthly: 200,
    createdAt: "2025-01-08"
  },
  {
    id: "3",
    slug: "modern-apartment-vlaardingen-centrum",
    title: "Modern Apartment in Vlaardingen Centrum",
    city: "Vlaardingen",
    neighborhood: "Centrum",
    district: "Centrum",
    interiorType: "gestoffeerd",
    priceMonthly: 1650,
    beds: 2,
    baths: 1,
    sqm: 75,
    furnished: false,
    deposit: 3300,
    minRentalPeriodMonths: 12,
    availableType: "fromDate",
    availableFromDate: "2025-03-01",
    descriptionShort: "Licht en modern appartement in het hart van Vlaardingen met uitzicht over de stad.",
    descriptionLong: "Dit recent gerenoveerde appartement ligt in het centrum van Vlaardingen, op loopafstand van winkels, restaurants en het station. De ruime woonkamer baadt in het natuurlijke licht dankzij de grote ramen. De moderne keuken is voorzien van alle gemakken. Twee slaapkamers bieden voldoende ruimte voor een gezin of thuiswerkers.\n\nVlaardingen biedt een uitstekende prijs-kwaliteitverhouding en is via metro snel verbonden met Rotterdam. Ideaal voor starters of jonge gezinnen die ruimte zoeken zonder de stad te verlaten.",
    amenities: ["City View", "Modern Kitchen", "Wood Floors", "Near Station", "Elevator", "Storage"],
    images: [
      "/src/assets/listing-3-vlaardingen.jpg"
    ],
    featured: false,
    verified: true,
    latitude: 51.9125,
    longitude: 4.3419,
    addressDisclosure: "exact",
    status: "available",
    petsAllowed: true,
    studentsAllowed: true,
    homeSharingAllowed: false,
    outdoorSpace: false,
    parking: false,
    parkingType: 'permit',
    energyLabel: 'A',
    serviceCostsMonthly: 125,
    createdAt: "2025-01-05"
  },
  {
    id: "4",
    slug: "design-studio-vondelpark-amsterdam",
    title: "Design Studio near Vondelpark",
    city: "Amsterdam",
    neighborhood: "Oud-Zuid",
    district: "Zuid",
    interiorType: "gemeubileerd",
    priceMonthly: 1650,
    beds: 0,
    baths: 1,
    sqm: 45,
    furnished: true,
    deposit: 3300,
    minRentalPeriodMonths: 6,
    availableType: "immediately",
    descriptionShort: "Compact yet perfectly formed studio in Amsterdam's leafy Oud-Zuid with a private terrace.",
    descriptionLong: "Compact yet perfectly formed studio in Amsterdam's leafy Oud-Zuid. Recently renovated with quality finishes throughout. Clever built-in storage, a Murphy bed, and a small private terrace. Vondelpark is at your doorstep for morning runs, and the museums are a short stroll away.\n\nThis studio is ideal for singles or couples who appreciate quality over quantity. The space has been thoughtfully designed to maximize functionality while maintaining an airy, open feel. The kitchen area includes high-end appliances and there is a separate bathroom with walk-in shower.",
    amenities: ["Terrace", "Built-in Storage", "Washing Machine", "Near Vondelpark", "Quiet Street"],
    images: [
      "/src/assets/listing-4-vondelpark-studio.jpg"
    ],
    featured: false,
    verified: true,
    latitude: 52.3579,
    longitude: 4.8686,
    addressDisclosure: "exact",
    status: "available",
    petsAllowed: false,
    studentsAllowed: true,
    homeSharingAllowed: false,
    outdoorSpace: true,
    outdoorSpaceType: 'terrace',
    outdoorSpaceSqm: 12,
    parking: false,
    parkingType: 'permit',
    energyLabel: 'A+',
    createdAt: "2025-01-12"
  },
  {
    id: "5",
    slug: "penthouse-city-views-scheveningen",
    title: "Penthouse with City Views",
    city: "The Hague",
    neighborhood: "Scheveningen",
    district: "Overig",
    interiorType: "gemeubileerd",
    priceMonthly: 3800,
    beds: 3,
    baths: 2,
    sqm: 140,
    furnished: true,
    deposit: 7600,
    minRentalPeriodMonths: 12,
    availableType: "fromDate",
    availableFromDate: "2025-04-01",
    descriptionShort: "Stunning top-floor penthouse with panoramic views over The Hague and the North Sea.",
    descriptionLong: "Stunning top-floor penthouse with panoramic views over The Hague and the North Sea. Floor-to-ceiling windows wrap around the living space, blurring the line between indoors and out. Three bedrooms, two bathrooms, and a wraparound terrace ideal for entertaining. Beach life and city conveniences combined.\n\nThis exceptional penthouse offers the best of both worlds: beachside living with all the amenities of city life. The open-plan living area is perfect for entertaining, while the private terrace offers sunset views over the sea. Building amenities include parking, sauna, and 24-hour security.",
    amenities: ["Sea View", "Terrace", "Elevator", "Parking Space", "Air Conditioning", "Sauna", "Storage"],
    images: [
      "/src/assets/listing-5-scheveningen-penthouse.jpg"
    ],
    featured: true,
    verified: true,
    latitude: 52.1093,
    longitude: 4.2755,
    addressDisclosure: "approx",
    status: "available",
    petsAllowed: true,
    studentsAllowed: false,
    homeSharingAllowed: false,
    outdoorSpace: true,
    outdoorSpaceType: 'terrace',
    outdoorSpaceSqm: 45,
    parking: true,
    parkingType: 'garage',
    energyLabel: 'A',
    serviceCostsMonthly: 350,
    createdAt: "2025-01-03"
  },
  {
    id: "6",
    slug: "cozy-apartment-de-pijp-amsterdam",
    title: "Cozy Apartment in De Pijp",
    city: "Amsterdam",
    neighborhood: "De Pijp",
    district: "Zuid",
    interiorType: "gemeubileerd",
    priceMonthly: 1950,
    beds: 1,
    baths: 1,
    sqm: 55,
    furnished: true,
    deposit: 3900,
    minRentalPeriodMonths: 12,
    availableType: "fromDate",
    availableFromDate: "2025-02-15",
    descriptionShort: "Charming one-bedroom in the heart of De Pijp, Amsterdam's most vibrant neighbourhood.",
    descriptionLong: "Charming one-bedroom in the heart of De Pijp, Amsterdam's most vibrant neighbourhood. Just steps from Albert Cuyp Market. The apartment has been thoughtfully updated while retaining period details. A bright living room, separate bedroom, and galley kitchen with everything you need.\n\nDe Pijp offers an unmatched lifestyle with its mix of trendy restaurants, cozy cafes, and the famous Albert Cuyp Market right on your doorstep. This apartment is perfect for those who want to experience authentic Amsterdam living.",
    amenities: ["Near Market", "Washing Machine", "Wood Floors", "Central Location", "Bicycle Storage"],
    images: [
      "/src/assets/listing-6-de-pijp.jpg"
    ],
    featured: false,
    verified: true,
    latitude: 52.3547,
    longitude: 4.8952,
    addressDisclosure: "exact",
    status: "available",
    petsAllowed: false,
    studentsAllowed: true,
    homeSharingAllowed: true,
    outdoorSpace: false,
    parking: false,
    parkingType: 'permit',
    energyLabel: 'C',
    serviceCostsMonthly: 75,
    createdAt: "2025-01-09"
  },
  {
    id: "7",
    slug: "historic-canal-house-utrecht",
    title: "Historic Canal House Apartment",
    city: "Utrecht",
    neighborhood: "Binnenstad",
    district: "Centrum",
    interiorType: "kaal",
    priceMonthly: 2100,
    beds: 2,
    baths: 1,
    sqm: 90,
    furnished: false,
    deposit: 4200,
    minRentalPeriodMonths: 12,
    availableType: "fromDate",
    availableFromDate: "2025-03-15",
    descriptionShort: "Live in a piece of Dutch history in this 17th-century canal house in Utrecht's medieval centre.",
    descriptionLong: "Live in a piece of Dutch history. This apartment occupies the upper floors of a 17th-century canal house in Utrecht's medieval centre. High ceilings, large windows overlooking the unique wharf-level canals, and abundant natural light. Unfurnished, allowing you to make it your own.\n\nUtrecht's unique wharf cellars create a charming streetscape unlike any other Dutch city. This apartment offers the opportunity to live in the heart of this historic city while enjoying modern conveniences. Near Utrecht University and excellent public transport.",
    amenities: ["Canal View", "Historic Building", "High Ceilings", "City Centre", "Near University"],
    images: [
      "/src/assets/listing-7-utrecht-canalhouse.jpg"
    ],
    featured: false,
    verified: true,
    latitude: 52.0907,
    longitude: 5.1214,
    addressDisclosure: "exact",
    status: "available",
    petsAllowed: false,
    studentsAllowed: true,
    homeSharingAllowed: false,
    outdoorSpace: false,
    parking: false,
    parkingType: 'permit',
    energyLabel: 'D',
    createdAt: "2025-01-07"
  },
  {
    id: "8",
    slug: "harbour-apartment-kop-van-zuid-rotterdam",
    title: "Harbour Apartment Kop van Zuid",
    city: "Rotterdam",
    neighborhood: "Kop van Zuid",
    district: "Zuid",
    interiorType: "gemeubileerd",
    priceMonthly: 2650,
    beds: 2,
    baths: 1,
    sqm: 95,
    furnished: true,
    deposit: 5300,
    minRentalPeriodMonths: 6,
    availableType: "immediately",
    descriptionShort: "Contemporary apartment in Rotterdam's iconic Kop van Zuid district with views of the Erasmus Bridge.",
    descriptionLong: "Contemporary apartment in Rotterdam's iconic Kop van Zuid district, surrounded by striking architecture. Views of the Erasmus Bridge from the living room. Open-plan living with a sleek kitchen, two bedrooms, and a bathroom with both tub and walk-in shower. Building amenities include a gym and underground parking.\n\nKop van Zuid represents the best of modern Rotterdam living. This apartment offers stunning views of the city's most famous landmark and easy access to both the city centre and waterfront. Building amenities include a fitness center, concierge service, and secure underground parking.",
    amenities: ["Harbour View", "Gym", "Parking", "Concierge", "Elevator", "Near Metro"],
    images: [
      "/src/assets/listing-8-kop-van-zuid.jpg"
    ],
    featured: true,
    verified: true,
    latitude: 51.9066,
    longitude: 4.4883,
    addressDisclosure: "exact",
    status: "available",
    petsAllowed: true,
    studentsAllowed: false,
    homeSharingAllowed: false,
    outdoorSpace: false,
    parking: true,
    parkingType: 'garage',
    energyLabel: 'A+',
    serviceCostsMonthly: 275,
    createdAt: "2025-01-11"
  },
  {
    id: "9",
    slug: "industrial-loft-schiedam",
    title: "Industrial Loft in Schiedam",
    city: "Schiedam",
    neighborhood: "Centrum",
    district: "Centrum",
    interiorType: "gemeubileerd",
    priceMonthly: 1850,
    beds: 2,
    baths: 1,
    sqm: 95,
    furnished: true,
    deposit: 3700,
    minRentalPeriodMonths: 12,
    availableType: "fromDate",
    availableFromDate: "2025-04-01",
    descriptionShort: "Karakteristieke loft in een voormalige jeneverbrouwerij in het historische centrum van Schiedam.",
    descriptionLong: "Deze unieke loft is gevestigd in een getransformeerde jeneverbrouwerij in het hart van Schiedam. Hoge plafonds, originele bakstenen muren en grote industriële ramen creëren een sfeervolle woonruimte. De open keuken met kookeiland is volledig uitgerust. Twee ruime slaapkamers en een moderne badkamer completeren deze bijzondere woning.\n\nSchiedam staat bekend om zijn historische molens en jenevertraditie. Dit appartement combineert industrieel erfgoed met modern wooncomfort. Uitstekende verbindingen naar Rotterdam Centraal maken dit ideaal voor stadswerkers.",
    amenities: ["High Ceilings", "Exposed Brick", "Modern Kitchen", "Historic Building", "Near Station", "Bicycle Storage"],
    images: [
      "/src/assets/listing-9-schiedam.jpg"
    ],
    featured: true,
    verified: true,
    latitude: 51.9193,
    longitude: 4.3989,
    addressDisclosure: "exact",
    status: "available",
    petsAllowed: true,
    studentsAllowed: true,
    homeSharingAllowed: false,
    outdoorSpace: false,
    parking: false,
    parkingType: 'permit',
    energyLabel: 'B',
    serviceCostsMonthly: 150,
    createdAt: "2025-01-04"
  },
  {
    id: "10",
    slug: "executive-suite-zuidas-amsterdam",
    title: "Executive Suite Zuidas",
    city: "Amsterdam",
    neighborhood: "Zuidas",
    district: "Zuid",
    interiorType: "gemeubileerd",
    priceMonthly: 3200,
    beds: 2,
    baths: 2,
    sqm: 110,
    furnished: true,
    deposit: 6400,
    minRentalPeriodMonths: 6,
    availableType: "immediately",
    videoTourUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    descriptionShort: "Sleek executive apartment in Amsterdam's business district with premium building amenities.",
    descriptionLong: "Sleek executive apartment in Amsterdam's business district. Ideal for professionals seeking proximity to corporate headquarters and excellent transport links. Two ensuite bedrooms, a spacious living area, and a fully equipped kitchen. Building features 24/7 security, fitness centre, and meeting rooms.\n\nZuidas is the premier business district in the Netherlands, home to major international companies and excellent connections to Schiphol Airport. This apartment offers the ultimate in executive living with premium finishes throughout and world-class building amenities.",
    amenities: ["24/7 Security", "Fitness Centre", "Meeting Rooms", "Parking", "Near Train Station", "Concierge"],
    images: [
      "/src/assets/listing-10-zuidas.jpg"
    ],
    featured: true,
    verified: true,
    latitude: 52.3388,
    longitude: 4.8742,
    addressDisclosure: "exact",
    status: "available",
    petsAllowed: false,
    studentsAllowed: false,
    homeSharingAllowed: false,
    outdoorSpace: false,
    parking: true,
    parkingType: 'garage',
    energyLabel: 'A++',
    serviceCostsMonthly: 450,
    createdAt: "2025-01-06"
  }
];

// Helper functions
export const getListingById = (id: string): Listing | undefined => {
  return listings.find((listing) => listing.id === id);
};

export const getListingBySlug = (slug: string): Listing | undefined => {
  return listings.find((listing) => listing.slug === slug);
};

export const getFeaturedListings = (): Listing[] => {
  return listings.filter((listing) => listing.featured && listing.status === 'available');
};

export const getRelatedListings = (currentId: string, limit: number = 3): Listing[] => {
  const current = getListingById(currentId);
  if (!current) return [];
  
  return listings
    .filter((listing) => 
      listing.id !== currentId && 
      listing.status === 'available' &&
      (listing.city === current.city || 
       Math.abs(listing.priceMonthly - current.priceMonthly) < 500)
    )
    .slice(0, limit);
};

export const getAvailableCities = (): string[] => {
  const cities = [...new Set(listings.map((listing) => listing.city))];
  return cities.sort();
};

export const getAvailableListings = (): Listing[] => {
  return listings.filter((listing) => listing.status === 'available');
};
