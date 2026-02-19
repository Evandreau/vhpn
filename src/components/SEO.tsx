import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { Listing } from "@/data/listings";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  listing?: Listing;
}

// Organization schema for the agency
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "VHPN",
  "url": "https://vhpn.nl",
  "logo": "https://vhpn.nl/logo.png",
  "description": "Premium rental properties across the Netherlands. Furnished apartments, houses and studios for expats and professionals.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Saftlevenstraat 8B",
    "postalCode": "3015 BM",
    "addressLocality": "Rotterdam",
    "addressCountry": "NL"
  },
  "areaServed": [
    { "@type": "City", "name": "Rotterdam" },
    { "@type": "City", "name": "Amsterdam" },
    { "@type": "City", "name": "The Hague" },
    { "@type": "City", "name": "Schiedam" },
    { "@type": "City", "name": "Vlaardingen" }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/vhpn",
    "https://www.instagram.com/vhpn"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+31-10-7600-761",
    "email": "info@vhpn.nl",
    "contactType": "customer service",
    "availableLanguage": ["Dutch", "English"]
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "17:00"
  }
};

// WebSite schema with SearchAction
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "VHPN",
  "url": "https://vhpn.nl",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://vhpn.nl/listings?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// Generate listing schema
export const generateListingSchema = (listing: Listing, language: 'nl' | 'en') => {
  const availability = listing.availableType === 'immediately' 
    ? 'https://schema.org/InStock' 
    : 'https://schema.org/PreOrder';
  
  return {
    "@context": "https://schema.org",
    "@type": "Apartment",
    "name": listing.title,
    "description": listing.descriptionShort,
    "url": `https://vhpn.nl/listings/${listing.id}`,
    "image": listing.images,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": listing.city,
      "addressRegion": listing.neighborhood,
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": listing.latitude,
      "longitude": listing.longitude
    },
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": listing.sqm,
      "unitCode": "MTK"
    },
    "numberOfRooms": listing.beds + 1,
    "numberOfBedrooms": listing.beds,
    "numberOfBathroomsTotal": listing.baths,
    "petsAllowed": listing.petsAllowed,
    "amenityFeature": listing.amenities.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity,
      "value": true
    })),
    "offers": {
      "@type": "Offer",
      "price": listing.priceMonthly,
      "priceCurrency": "EUR",
      "availability": availability,
      "availabilityStarts": listing.availableType === 'fromDate' ? listing.availableFromDate : undefined
    }
  };
};

// Generate breadcrumb schema
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

const SEO = ({ title, description, image, url, type = "website", listing }: SEOProps) => {
  const { language } = useLanguage();
  const baseUrl = "https://vhpn.nl";
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const ogImage = image || `${baseUrl}/og-image.jpg`;
  
  const alternateNl = url ? `${baseUrl}/nl${url}` : `${baseUrl}/nl`;
  const alternateEn = url ? `${baseUrl}/en${url}` : `${baseUrl}/en`;

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Hreflang tags */}
      <link rel="alternate" hrefLang="nl" href={alternateNl} />
      <link rel="alternate" hrefLang="en" href={alternateEn} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={language === 'nl' ? 'nl_NL' : 'en_US'} />
      <meta property="og:site_name" content="VHPN" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* WebSite Schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      {/* Listing Schema (if provided) */}
      {listing && (
        <script type="application/ld+json">
          {JSON.stringify(generateListingSchema(listing, language))}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
