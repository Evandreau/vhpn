import { useLanguage } from "@/contexts/LanguageContext";

interface MapPlaceholderProps {
  city: string;
  neighborhood: string;
  latitude?: number;
  longitude?: number;
  addressDisclosure?: 'exact' | 'approx';
}

const MapPlaceholder = ({ city, neighborhood, latitude, longitude, addressDisclosure = 'approx' }: MapPlaceholderProps) => {
  const { language } = useLanguage();
  
  // Use provided coordinates or fallback to city-level
  const lat = latitude || 52.37;
  const lng = longitude || 4.89;
  // Lower zoom for approximate, higher for exact
  const zoom = addressDisclosure === 'exact' ? 15 : 13;

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.02},${lat - 0.01},${lng + 0.02},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className="relative aspect-video bg-secondary rounded-sm overflow-hidden">
      <iframe
        title={`${language === 'nl' ? 'Kaart van' : 'Map of'} ${neighborhood}, ${city}`}
        src={mapSrc}
        className="w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer"
        allowFullScreen={false}
      />
      
      {/* Privacy note for approximate locations */}
      {addressDisclosure === 'approx' && (
        <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm px-4 py-2">
          <p className="font-body text-xs text-muted-foreground text-center">
            {language === 'nl'
              ? 'Geschatte locatie — exact adres na bevestiging bezichtiging'
              : 'Approximate location — exact address provided after viewing is confirmed'}
          </p>
        </div>
      )}
    </div>
  );
};

export default MapPlaceholder;
