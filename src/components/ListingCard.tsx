import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Square, Calendar, Play, ArrowRight } from "lucide-react";
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

  // Get preview text: use descriptionShort, fallback to first 160 chars of descriptionLong
  const getPreviewText = () => {
    if (listing.descriptionShort) {
      return listing.descriptionShort;
    }
    const longDesc = listing.descriptionLong || '';
    if (longDesc.length <= 160) return longDesc;
    // Cut at word boundary
    const truncated = longDesc.substring(0, 160);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 100 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  };

  // Show first 4 images in card slider
  const cardImages = listing.images.slice(0, 4);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn("group", className)}
      aria-label={`${listing.title} - ${formatPrice(listing.priceMonthly)} per month`}
    >
      <div className="block">
        {/* Image Slider - fixed aspect ratio for stable layout */}
        <Link 
          to={`/listings/${listing.id}`} 
          className="block"
          aria-label={`View ${listing.title}`}
        >
          <div className="relative rounded-sm mb-4 border border-transparent group-hover:border-border transition-all duration-300 aspect-video bg-secondary">
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
                  <Play className="h-3 w-3" aria-hidden="true" />
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
            <Link to={`/listings/${listing.id}`}>
              {listing.title}
            </Link>
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            <span className="font-body text-sm line-clamp-1">
              {listing.neighborhood}, {listing.city}
            </span>
          </div>

          {/* 2-line Preview Text */}
          <p className="font-body text-sm text-muted-foreground line-clamp-2 leading-relaxed min-h-[2.625rem]">
            {getPreviewText()}
          </p>

          {/* Read More Link */}
          <Link 
            to={`/listings/${listing.id}`}
            className="inline-flex items-center gap-1 font-body text-sm font-medium text-accent hover:text-accent/80 transition-colors group/link"
            aria-label={`${t('listings.readMore')} about ${listing.title}`}
          >
            {t('listings.readMore')}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" aria-hidden="true" />
          </Link>

          {/* Specs */}
          <div className="flex items-center gap-5 pt-3 border-t border-border">
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="font-body text-sm text-muted-foreground">
                {listing.beds === 0 ? t('listings.studio') : listing.beds}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="font-body text-sm text-muted-foreground">
                {listing.baths}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Square className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="font-body text-sm text-muted-foreground">
                {listing.sqm} {t('listings.sqm')}
              </span>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-1.5 text-muted-foreground pt-1">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-body text-xs">
              {getAvailabilityText()}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ListingCard;
