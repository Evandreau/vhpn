import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Square, Calendar, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Listing } from "@/data/listings";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import ImageSlider from "./ImageSlider";

interface ListingCardProps {
  listing: Listing;
  index?: number;
  className?: string;
}

const ListingCard = ({ listing, index = 0, className }: ListingCardProps) => {
  const { t } = useLanguage();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "d MMM yyyy");
  };

  const getAvailabilityText = () => {
    if (listing.availableType === 'immediately') {
      return t('listings.availableNow');
    }
    return `${t('listings.availableFrom')} ${formatDate(listing.availableFromDate || '')}`;
  };

  // Show first 4 images in card slider
  const cardImages = listing.images.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn("group", className)}
    >
      <div className="block">
        {/* Image Slider */}
        <Link to={`/listings/${listing.id}`} className="block">
          <div className="relative rounded-sm mb-4 border border-transparent group-hover:border-border transition-all duration-300">
            <ImageSlider
              images={cardImages}
              title={listing.title}
              aspectRatio="video"
              showArrows={true}
              showDots={true}
            />
            
            {/* Featured Badge */}
            {listing.featured && (
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="font-body text-xs font-medium px-3 py-1.5 bg-foreground text-background rounded-sm tracking-wide">
                  {t('listings.featured')}
                </span>
              </div>
            )}

            {/* Video Tour Badge */}
            {listing.videoTourUrl && (
              <div className="absolute top-4 left-4 z-10 pointer-events-none" style={{ left: listing.featured ? '100px' : '16px' }}>
                <span className="font-body text-xs px-2.5 py-1.5 bg-accent text-accent-foreground rounded-sm flex items-center gap-1">
                  <Play className="h-3 w-3" />
                  Video
                </span>
              </div>
            )}

            {/* Furnished/Unfurnished Badge */}
            <div className="absolute top-4 right-16 z-10 pointer-events-none">
              <span className="font-body text-xs px-2.5 py-1 bg-background/90 backdrop-blur-sm text-foreground rounded-sm">
                {listing.furnished ? t('listings.furnished') : t('listings.unfurnished')}
              </span>
            </div>
          </div>
        </Link>

        {/* Content */}
        <Link to={`/listings/${listing.id}`} className="block">
          <div className="space-y-2">
            {/* Price */}
            <div className="flex items-baseline gap-1">
              <p className="font-display text-2xl font-medium text-foreground tracking-tight">
                {formatPrice(listing.priceMonthly)}
              </p>
              <span className="font-body text-sm text-muted-foreground">{t('listings.perMonth')}</span>
            </div>

            {/* Title */}
            <h3 className="font-display text-lg font-medium text-foreground line-clamp-1 group-hover:text-accent transition-colors">
              {listing.title}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="font-body text-sm line-clamp-1">
                {listing.neighborhood}, {listing.city}
              </span>
            </div>

            {/* Specs */}
            <div className="flex items-center gap-5 pt-3 border-t border-border">
              <div className="flex items-center gap-1.5">
                <Bed className="h-4 w-4 text-muted-foreground" />
                <span className="font-body text-sm text-muted-foreground">
                  {listing.beds === 0 ? t('listings.studio') : listing.beds}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="h-4 w-4 text-muted-foreground" />
                <span className="font-body text-sm text-muted-foreground">
                  {listing.baths}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Square className="h-4 w-4 text-muted-foreground" />
                <span className="font-body text-sm text-muted-foreground">
                  {listing.sqm} {t('listings.sqm')}
                </span>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-1.5 text-muted-foreground pt-1">
              <Calendar className="h-3.5 w-3.5" />
              <span className="font-body text-xs">
                {getAvailabilityText()}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ListingCard;
