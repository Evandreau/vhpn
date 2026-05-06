import { Bed, Bath, Square, Calendar, Euro, Clock, Home, MapPin, Zap, Car, Trees, Building } from "lucide-react";
import { Listing } from "@/data/listings";
import { useLanguage } from "@/contexts/LanguageContext";
import { format, parseISO } from "date-fns";

interface KeyFactsBlockProps {
  listing: Listing;
}

const KeyFactsBlock = ({ listing }: KeyFactsBlockProps) => {
  const { t, language } = useLanguage();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDateCompact = (dateString: string) => {
    try {
      const parsed = parseISO(dateString);
      if (isNaN(parsed.getTime())) return dateString;
      return format(parsed, "dd/MM/yyyy");
    } catch {
      return dateString;
    }
  };

  const getOutdoorSpaceLabel = (type?: string) => {
    if (!type) return language === 'nl' ? 'Buitenruimte' : 'Outdoor space';
    const labels: Record<string, { nl: string; en: string }> = {
      balcony: { nl: 'Balkon', en: 'Balcony' },
      terrace: { nl: 'Terras', en: 'Terrace' },
      garden: { nl: 'Tuin', en: 'Garden' },
      rooftop: { nl: 'Dakterras', en: 'Rooftop' },
    };
    return labels[type]?.[language] || type;
  };

  const getParkingLabel = (type?: string) => {
    if (!type) return language === 'nl' ? 'Parkeren' : 'Parking';
    const labels: Record<string, { nl: string; en: string }> = {
      permit: { nl: 'Parkeervergunning', en: 'Parking permit' },
      garage: { nl: 'Parkeergarage', en: 'Parking garage' },
      private: { nl: 'Privé terrein', en: 'Private parking' },
      paid: { nl: 'Betaald parkeren', en: 'Paid parking' },
      public: { nl: 'Openbaar parkeren', en: 'Public parking' },
      enclosed: { nl: 'Afgesloten terrein', en: 'Enclosed lot' },
      bicycle: { nl: 'Fietsenstalling', en: 'Bicycle storage' },
    };
    return labels[type]?.[language] || type;
  };

  const facts: { icon: typeof MapPin; label: string; value: string; ariaLabel: string }[] = [];

  // Property type
  if (listing.propertyType) {
    facts.push({
      icon: Building,
      label: 'Type',
      value: listing.propertyType,
      ariaLabel: `Type: ${listing.propertyType}`
    });
  }

  facts.push(
    {
      icon: MapPin,
      label: language === 'nl' ? 'Locatie' : 'Location',
      value: `${listing.neighborhood}, ${listing.city}`,
      ariaLabel: `${language === 'nl' ? 'Locatie' : 'Location'}: ${listing.neighborhood}, ${listing.city}`
    },
    {
      icon: Euro,
      label: language === 'nl' ? 'Huurprijs' : 'Rental Price',
      value: formatPrice(listing.priceMonthly),
      ariaLabel: `${language === 'nl' ? 'Huurprijs' : 'Rental Price'}: ${formatPrice(listing.priceMonthly)}`
    },
    {
      icon: Bed,
      label: language === 'nl' ? 'Slaapkamers' : 'Bedrooms',
      value: listing.beds === 0 ? t('listings.studio') : `${listing.beds}`,
      ariaLabel: `${language === 'nl' ? 'Slaapkamers' : 'Bedrooms'}: ${listing.beds === 0 ? 'Studio' : listing.beds}`
    },
    {
      icon: Bath,
      label: language === 'nl' ? 'Badkamers' : 'Bathrooms',
      value: `${listing.baths}`,
      ariaLabel: `${language === 'nl' ? 'Badkamers' : 'Bathrooms'}: ${listing.baths}`
    },
    {
      icon: Square,
      label: language === 'nl' ? 'Oppervlakte' : 'Size',
      value: `${listing.sqm} m²`,
      ariaLabel: `${language === 'nl' ? 'Oppervlakte' : 'Size'}: ${listing.sqm} square meters`
    },
    {
      icon: Home,
      label: language === 'nl' ? 'Interieur' : 'Furnished',
      value: listing.furnished 
        ? (language === 'nl' ? 'Gemeubileerd' : 'Furnished')
        : (language === 'nl' ? 'Ongemeubileerd' : 'Unfurnished'),
      ariaLabel: `${language === 'nl' ? 'Interieur' : 'Interior'}: ${listing.furnished ? 'Furnished' : 'Unfurnished'}`
    },
    {
      icon: Calendar,
      label: language === 'nl' ? 'Beschikbaarheid' : 'Availability',
      value: listing.availableType === 'immediately'
        ? (language === 'nl' ? 'Per direct' : 'Immediately')
        : (listing.availableType === 'inConsultation' || !listing.availableFromDate || listing.availableFromDate === '0000-00-00')
          ? (language === 'nl' ? 'In overleg' : 'In consultation')
          : formatDateCompact(listing.availableFromDate || ''),
      ariaLabel: `${language === 'nl' ? 'Beschikbaarheid' : 'Availability'}: ${
        listing.availableType === 'immediately'
          ? 'Immediately'
          : (listing.availableType === 'inConsultation' || !listing.availableFromDate || listing.availableFromDate === '0000-00-00')
            ? 'In consultation'
            : formatDateCompact(listing.availableFromDate || '')
      }`
    },
  );

  // Service costs - only show when known and > 0
  if (listing.serviceCostsMonthly && listing.serviceCostsMonthly > 0) {
    facts.push({
      icon: Euro,
      label: language === 'nl' ? 'Servicekosten' : 'Service Costs',
      value: formatPrice(listing.serviceCostsMonthly),
      ariaLabel: `${language === 'nl' ? 'Servicekosten' : 'Service Costs'}: ${formatPrice(listing.serviceCostsMonthly)}`
    });
  }

  // Energy label
  if (listing.energyLabel) {
    facts.push({
      icon: Zap,
      label: language === 'nl' ? 'Energielabel' : 'Energy Label',
      value: listing.energyLabel,
      ariaLabel: `${language === 'nl' ? 'Energielabel' : 'Energy Label'}: ${listing.energyLabel}`
    });
  }

  // Outdoor space
  if (listing.outdoorSpace && listing.outdoorSpaceType) {
    facts.push({
      icon: Trees,
      label: getOutdoorSpaceLabel(listing.outdoorSpaceType),
      value: listing.outdoorSpaceSqm ? `${listing.outdoorSpaceSqm} m²` : (language === 'nl' ? 'Ja' : 'Yes'),
      ariaLabel: `${getOutdoorSpaceLabel(listing.outdoorSpaceType)}: ${listing.outdoorSpaceSqm ? `${listing.outdoorSpaceSqm} m²` : 'Yes'}`
    });
  }

  // Parking
  if (listing.parking) {
    facts.push({
      icon: Car,
      label: getParkingLabel(listing.parkingType),
      value: language === 'nl' ? 'Ja' : 'Yes',
      ariaLabel: `${getParkingLabel(listing.parkingType)}: Yes`
    });
  }

  // Min rental period
  if (listing.minRentalPeriodMonths) {
    facts.push({
      icon: Clock,
      label: language === 'nl' ? 'Minimale huurperiode' : 'Minimum Rental Period',
      value: `${listing.minRentalPeriodMonths} ${t('detail.months')}`,
      ariaLabel: `${language === 'nl' ? 'Minimale huurperiode' : 'Minimum rental period'}: ${listing.minRentalPeriodMonths} months`
    });
  }

  // Deposit
  if (listing.deposit) {
    facts.push({
      icon: Euro,
      label: t('detail.deposit'),
      value: formatPrice(listing.deposit),
      ariaLabel: `${t('detail.deposit')}: ${formatPrice(listing.deposit)}`
    });
  }

  return (
    <section 
      aria-label={language === 'nl' ? 'Belangrijke gegevens' : 'Key Facts'}
      className="bg-secondary/50 rounded-sm p-6"
    >
      <h2 className="font-display text-xl font-medium text-foreground mb-5 sr-only">
        {language === 'nl' ? 'Belangrijke gegevens' : 'Key Facts'}
      </h2>
      
      <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {facts.map((fact) => (
          <div 
            key={fact.label} 
            className="flex items-start gap-3"
            aria-label={fact.ariaLabel}
          >
            <div className="w-9 h-9 rounded-full bg-background flex items-center justify-center flex-shrink-0">
              <fact.icon className="h-4 w-4 text-accent" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <dt className="font-body text-xs text-muted-foreground mb-0.5">
                {fact.label}
              </dt>
              <dd className="font-body text-sm font-medium text-foreground truncate">
                {fact.value}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default KeyFactsBlock;
