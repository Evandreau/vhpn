export interface Listing {
  id: string;
  title: string;
  city: string;
  neighborhood: string;
  priceMonthly: number;
  beds: number;
  baths: number;
  sqm: number;
  furnished: boolean;
  deposit: number;
  minStayMonths: number;
  availableFrom: string;
  description: string;
  amenities: string[];
  images: string[];
  featured: boolean;
  latitude: number;
  longitude: number;
}

export const listings: Listing[] = [
  {
    id: "1",
    title: "Canal-View Apartment in Jordaan",
    city: "Amsterdam",
    neighborhood: "Jordaan",
    priceMonthly: 2850,
    beds: 2,
    baths: 1,
    sqm: 85,
    furnished: true,
    deposit: 5700,
    minStayMonths: 12,
    availableFrom: "2025-02-01",
    description: "A beautifully restored apartment overlooking one of Amsterdam's most picturesque canals. Original wooden beams and floors meet contemporary comfort. The living space flows naturally into a modern kitchen with high-end appliances. Two generous bedrooms, both with canal views. The location is unbeatable—steps from boutiques, galleries, and the city's best cafés.",
    amenities: ["Canal View", "Washing Machine", "Dishwasher", "Balcony", "Bicycle Storage", "Central Heating", "Wood Floors"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80"
    ],
    featured: true,
    latitude: 52.3738,
    longitude: 4.8810
  },
  {
    id: "2",
    title: "Modern Loft in Rotterdam Centre",
    city: "Rotterdam",
    neighborhood: "Centrum",
    priceMonthly: 2200,
    beds: 1,
    baths: 1,
    sqm: 72,
    furnished: true,
    deposit: 4400,
    minStayMonths: 6,
    availableFrom: "2025-01-15",
    description: "Industrial-chic loft in the heart of Rotterdam's vibrant city centre. High ceilings, exposed brick, and floor-to-ceiling windows flood the space with natural light. The open-plan layout maximizes every square metre, with a mezzanine bedroom and a designer kitchen below. Walking distance to Markthal and Central Station.",
    amenities: ["High Ceilings", "Exposed Brick", "Air Conditioning", "Gym Access", "Concierge", "Rooftop Terrace"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80"
    ],
    featured: true,
    latitude: 51.9244,
    longitude: 4.4777
  },
  {
    id: "3",
    title: "Spacious Family Home in Wassenaar",
    city: "Wassenaar",
    neighborhood: "Wassenaar Village",
    priceMonthly: 4500,
    beds: 4,
    baths: 2,
    sqm: 180,
    furnished: true,
    deposit: 9000,
    minStayMonths: 12,
    availableFrom: "2025-03-01",
    description: "Elegant detached villa in one of the Netherlands' most prestigious residential areas. Surrounded by mature gardens, this family home offers tranquility minutes from The Hague. Spacious living areas with garden access, a modern eat-in kitchen, and four well-proportioned bedrooms. Excellent international schools nearby.",
    amenities: ["Garden", "Parking", "Study Room", "Guest Toilet", "Storage", "Pet Friendly", "Near International Schools"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80"
    ],
    featured: true,
    latitude: 52.1452,
    longitude: 4.4013
  },
  {
    id: "4",
    title: "Design Studio near Vondelpark",
    city: "Amsterdam",
    neighborhood: "Oud-Zuid",
    priceMonthly: 1650,
    beds: 0,
    baths: 1,
    sqm: 45,
    furnished: true,
    deposit: 3300,
    minStayMonths: 6,
    availableFrom: "2025-01-01",
    description: "Compact yet perfectly formed studio in Amsterdam's leafy Oud-Zuid. Recently renovated with quality finishes throughout. Clever built-in storage, a Murphy bed, and a small private terrace. Vondelpark is at your doorstep for morning runs, and the museums are a short stroll away.",
    amenities: ["Terrace", "Built-in Storage", "Washing Machine", "Near Vondelpark", "Quiet Street"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80"
    ],
    featured: false,
    latitude: 52.3579,
    longitude: 4.8686
  },
  {
    id: "5",
    title: "Penthouse with City Views",
    city: "The Hague",
    neighborhood: "Scheveningen",
    priceMonthly: 3800,
    beds: 3,
    baths: 2,
    sqm: 140,
    furnished: true,
    deposit: 7600,
    minStayMonths: 12,
    availableFrom: "2025-04-01",
    description: "Stunning top-floor penthouse with panoramic views over The Hague and the North Sea. Floor-to-ceiling windows wrap around the living space, blurring the line between indoors and out. Three bedrooms, two bathrooms, and a wraparound terrace ideal for entertaining. Beach life and city conveniences combined.",
    amenities: ["Sea View", "Terrace", "Elevator", "Parking Space", "Air Conditioning", "Sauna", "Storage"],
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80"
    ],
    featured: true,
    latitude: 52.1093,
    longitude: 4.2755
  },
  {
    id: "6",
    title: "Cozy Apartment in De Pijp",
    city: "Amsterdam",
    neighborhood: "De Pijp",
    priceMonthly: 1950,
    beds: 1,
    baths: 1,
    sqm: 55,
    furnished: true,
    deposit: 3900,
    minStayMonths: 12,
    availableFrom: "2025-02-15",
    description: "Charming one-bedroom in the heart of De Pijp, Amsterdam's most vibrant neighbourhood. Just steps from Albert Cuyp Market. The apartment has been thoughtfully updated while retaining period details. A bright living room, separate bedroom, and galley kitchen with everything you need.",
    amenities: ["Near Market", "Washing Machine", "Wood Floors", "Central Location", "Bicycle Storage"],
    images: [
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80"
    ],
    featured: false,
    latitude: 52.3547,
    longitude: 4.8952
  },
  {
    id: "7",
    title: "Historic Canal House Apartment",
    city: "Utrecht",
    neighborhood: "Binnenstad",
    priceMonthly: 2100,
    beds: 2,
    baths: 1,
    sqm: 90,
    furnished: false,
    deposit: 4200,
    minStayMonths: 12,
    availableFrom: "2025-03-15",
    description: "Live in a piece of Dutch history. This apartment occupies the upper floors of a 17th-century canal house in Utrecht's medieval centre. High ceilings, large windows overlooking the unique wharf-level canals, and abundant natural light. Unfurnished, allowing you to make it your own.",
    amenities: ["Canal View", "Historic Building", "High Ceilings", "City Centre", "Near University"],
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80"
    ],
    featured: false,
    latitude: 52.0907,
    longitude: 5.1214
  },
  {
    id: "8",
    title: "Harbour Apartment Kop van Zuid",
    city: "Rotterdam",
    neighborhood: "Kop van Zuid",
    priceMonthly: 2650,
    beds: 2,
    baths: 1,
    sqm: 95,
    furnished: true,
    deposit: 5300,
    minStayMonths: 6,
    availableFrom: "2025-01-20",
    description: "Contemporary apartment in Rotterdam's iconic Kop van Zuid district, surrounded by striking architecture. Views of the Erasmus Bridge from the living room. Open-plan living with a sleek kitchen, two bedrooms, and a bathroom with both tub and walk-in shower. Building amenities include a gym and underground parking.",
    amenities: ["Harbour View", "Gym", "Parking", "Concierge", "Elevator", "Near Metro"],
    images: [
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80"
    ],
    featured: true,
    latitude: 51.9066,
    longitude: 4.4883
  },
  {
    id: "9",
    title: "Garden Maisonette in Haarlem",
    city: "Haarlem",
    neighborhood: "Centrum",
    priceMonthly: 2400,
    beds: 2,
    baths: 1,
    sqm: 100,
    furnished: true,
    deposit: 4800,
    minStayMonths: 12,
    availableFrom: "2025-05-01",
    description: "A rare find: a maisonette with its own private garden in central Haarlem. Spread over two floors with a living area that opens directly onto a sunny south-facing garden. Two bedrooms upstairs, both with built-in wardrobes. Haarlem's charming shops and cafés are at your doorstep.",
    amenities: ["Private Garden", "Two Floors", "Quiet Location", "Near Shops", "Storage", "Pet Friendly"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80"
    ],
    featured: false,
    latitude: 52.3874,
    longitude: 4.6462
  },
  {
    id: "10",
    title: "Executive Suite Zuidas",
    city: "Amsterdam",
    neighborhood: "Zuidas",
    priceMonthly: 3200,
    beds: 2,
    baths: 2,
    sqm: 110,
    furnished: true,
    deposit: 6400,
    minStayMonths: 6,
    availableFrom: "2025-02-01",
    description: "Sleek executive apartment in Amsterdam's business district. Ideal for professionals seeking proximity to corporate headquarters and excellent transport links. Two ensuite bedrooms, a spacious living area, and a fully equipped kitchen. Building features 24/7 security, fitness centre, and meeting rooms.",
    amenities: ["24/7 Security", "Fitness Centre", "Meeting Rooms", "Parking", "Near Train Station", "Concierge"],
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80"
    ],
    featured: true,
    latitude: 52.3388,
    longitude: 4.8742
  },
  {
    id: "11",
    title: "Renovated Townhouse Delft",
    city: "Delft",
    neighborhood: "Binnenstad",
    priceMonthly: 2750,
    beds: 3,
    baths: 1,
    sqm: 120,
    furnished: false,
    deposit: 5500,
    minStayMonths: 12,
    availableFrom: "2025-04-15",
    description: "Completely renovated townhouse in Delft's historic centre, combining original character with modern living. Three floors of living space, a contemporary kitchen, and a courtyard garden. Walk to TU Delft or stroll the iconic canals lined with blue-and-white pottery shops.",
    amenities: ["Courtyard Garden", "Three Floors", "Historic Centre", "Near University", "Storage"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80"
    ],
    featured: false,
    latitude: 52.0116,
    longitude: 4.3571
  },
  {
    id: "12",
    title: "Bright Corner Apartment Eindhoven",
    city: "Eindhoven",
    neighborhood: "Strijp-S",
    priceMonthly: 1850,
    beds: 2,
    baths: 1,
    sqm: 80,
    furnished: true,
    deposit: 3700,
    minStayMonths: 6,
    availableFrom: "2025-01-10",
    description: "Light-filled corner apartment in Eindhoven's creative Strijp-S district, a former Philips factory complex reborn as a hub for design and innovation. Industrial heritage meets contemporary comfort. Two bedrooms, an open living space, and views of the urban park. Near cafés, galleries, and the Design Academy.",
    amenities: ["Corner Unit", "Urban Park View", "Creative District", "Near Cafés", "Bicycle Storage"],
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80"
    ],
    featured: false,
    latitude: 51.4499,
    longitude: 5.4547
  },
  {
    id: "13",
    title: "Luxury Apartment Archipelbuurt",
    city: "The Hague",
    neighborhood: "Archipelbuurt",
    priceMonthly: 3400,
    beds: 3,
    baths: 2,
    sqm: 135,
    furnished: true,
    deposit: 6800,
    minStayMonths: 12,
    availableFrom: "2025-03-01",
    description: "Elegant apartment in The Hague's prestigious Archipelbuurt, known for its grand 19th-century architecture. High ceilings with ornate plasterwork, marble fireplaces, and herringbone floors. Three bedrooms, two bathrooms, and a study. Near embassies, parks, and excellent international schools.",
    amenities: ["Historic Architecture", "High Ceilings", "Marble Fireplaces", "Near Embassies", "Study Room", "Wine Cellar"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80"
    ],
    featured: false,
    latitude: 52.0929,
    longitude: 4.3108
  },
  {
    id: "14",
    title: "Waterfront Studio Amsterdam Noord",
    city: "Amsterdam",
    neighborhood: "Noord",
    priceMonthly: 1450,
    beds: 0,
    baths: 1,
    sqm: 42,
    furnished: true,
    deposit: 2900,
    minStayMonths: 6,
    availableFrom: "2025-01-05",
    description: "Modern studio with IJ waterfront views in up-and-coming Amsterdam Noord. Free ferry to Central Station takes just 5 minutes. Open-plan design, quality fixtures, and a balcony overlooking the water. The neighbourhood buzzes with creative energy—think rooftop bars, food halls, and film festivals.",
    amenities: ["Waterfront View", "Balcony", "Near Ferry", "Creative Area", "Washing Machine"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80"
    ],
    featured: false,
    latitude: 52.3906,
    longitude: 4.9234
  }
];

export const cities = [...new Set(listings.map(l => l.city))];

export const getListingById = (id: string): Listing | undefined => {
  return listings.find(l => l.id === id);
};

export const getFeaturedListings = (): Listing[] => {
  return listings.filter(l => l.featured);
};

export const getRelatedListings = (currentId: string, limit: number = 3): Listing[] => {
  const current = getListingById(currentId);
  if (!current) return listings.slice(0, limit);
  
  return listings
    .filter(l => l.id !== currentId && l.city === current.city)
    .slice(0, limit)
    .concat(listings.filter(l => l.id !== currentId && l.city !== current.city))
    .slice(0, limit);
};
