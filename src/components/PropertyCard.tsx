import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react";

interface PropertyCardProps {
  image: string;
  price: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  sqft: string;
  featured?: boolean;
  index?: number;
}

const PropertyCard = ({
  image,
  price,
  title,
  location,
  beds,
  baths,
  sqft,
  featured = false,
  index = 0,
}: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-xl overflow-hidden card-elevated cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4">
            <span className="font-body text-xs font-medium px-3 py-1.5 bg-foreground text-background rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Favorite Button */}
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-card">
          <Heart className="h-4 w-4 text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-baseline gap-1 mb-2">
          <p className="font-display text-2xl font-medium text-foreground">
            {price}
          </p>
          <span className="font-body text-sm text-muted-foreground">/month</span>
        </div>

        <h3 className="font-display text-lg font-medium text-foreground mb-2 line-clamp-1">
          {title}
        </h3>

        <div className="flex items-center gap-1 text-muted-foreground mb-4">
          <MapPin className="h-3.5 w-3.5" />
          <span className="font-body text-sm line-clamp-1">{location}</span>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-muted-foreground" />
            <span className="font-body text-sm text-muted-foreground">
              {beds}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-muted-foreground" />
            <span className="font-body text-sm text-muted-foreground">
              {baths}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="h-4 w-4 text-muted-foreground" />
            <span className="font-body text-sm text-muted-foreground">
              {sqft}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
