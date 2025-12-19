import { Bed, Bath, Square, Calendar, Euro, Clock, Home, MapPin } from "lucide-react";
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

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "d MMMM yyyy");
  };

  const getAvailabilityText = () => {
    if (listing.availableType === 'immediately') {
      return t('listings.availableNow');
    }
    return formatDate(listing.availableFromDate || '');
  };

  const facts = [
    {
      icon: MapPin,
      label: language === 'nl' ? 'Locatie' : 'Location',
      value: `${listing.neighborhood}, ${listing.city}`,
      ariaLabel: `${language === 'nl' ? 'Locatie' : 'Location'}: ${listing.neighborhood}, ${listing.city}`
    },
    {
      icon: Euro,
      label: language === 'nl' ? 'Huurprijs' : 'Rental Price',
      value: `${formatPrice(listing.priceMonthly)}${t('listings.perMonth')}`,
      ariaLabel: `${language === 'nl' ? 'Huurprijs' : 'Rental Price'}: ${formatPrice(listing.priceMonthly)} per month`
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
        ? (language === 'nl' ? 'Direct' : 'Immediately')
        : getAvailabilityText(),
      ariaLabel: `${language === 'nl' ? 'Beschikbaarheid' : 'Availability'}: ${getAvailabilityText()}`
    },
  ];

  // Add optional facts
  if (listing.minRentalPeriodMonths) {
    facts.push({
      icon: Clock,
      label: language === 'nl' ? 'Minimale huurperiode' : 'Minimum Rental Period',
      value: `${listing.minRentalPeriodMonths} ${t('detail.months')}`,
      ariaLabel: `${language === 'nl' ? 'Minimale huurperiode' : 'Minimum rental period'}: ${listing.minRentalPeriodMonths} months`
    });
  }

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
