import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Square, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Listing } from "@/data/listings";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

interface ListingCardProps {
  listing: Listing;
  index?: number;
  className?: string;
}

const ListingCard = ({ listing, index = 0, className }: ListingCardProps) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn("group", className)}
    >
      <Link to={`/listings/${listing.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4 border border-transparent group-hover:border-border transition-all duration-300">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          
          {/* Featured Badge */}
          {listing.featured && (
            <div className="absolute top-4 left-4">
              <span className="font-body text-xs font-medium px-3 py-1.5 bg-foreground text-background rounded-sm tracking-wide">
                Featured
              </span>
            </div>
          )}

          {/* Furnished Badge */}
          {listing.furnished && (
            <div className="absolute top-4 right-4">
              <span className="font-body text-xs px-2.5 py-1 bg-background/90 backdrop-blur-sm text-foreground rounded-sm">
                Furnished
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          {/* Price */}
          <div className="flex items-baseline gap-1">
            <p className="font-display text-2xl font-medium text-foreground tracking-tight">
              {formatPrice(listing.priceMonthly)}
            </p>
            <span className="font-body text-sm text-muted-foreground">/month</span>
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
                {listing.beds === 0 ? "Studio" : listing.beds}
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
                {listing.sqm} m²
              </span>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-1.5 text-muted-foreground pt-1">
            <Calendar className="h-3.5 w-3.5" />
            <span className="font-body text-xs">
              Available {formatDate(listing.availableFrom)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ListingCard;
