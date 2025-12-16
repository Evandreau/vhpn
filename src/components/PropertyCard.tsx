import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  image: string;
  price: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  sqft: string;
  type: "sale" | "rent";
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
  type,
  featured = false,
  index = 0,
}: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden card-elevated cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge
            variant="secondary"
            className={`font-body text-xs font-medium px-3 py-1 ${
              type === "sale"
                ? "bg-accent text-accent-foreground"
                : "bg-card text-card-foreground"
            }`}
          >
            For {type === "sale" ? "Sale" : "Rent"}
          </Badge>
          {featured && (
            <Badge
              variant="secondary"
              className="font-body text-xs font-medium px-3 py-1 bg-foreground text-background"
            >
              Featured
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-card hover:scale-110">
          <Heart className="h-5 w-5 text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-display text-2xl font-semibold text-foreground">
              {price}
            </p>
            {type === "rent" && (
              <span className="font-body text-sm text-muted-foreground">/month</span>
            )}
          </div>
        </div>

        <h3 className="font-display text-lg font-medium text-foreground mb-2 line-clamp-1">
          {title}
        </h3>

        <div className="flex items-center gap-1 text-muted-foreground mb-4">
          <MapPin className="h-4 w-4" />
          <span className="font-body text-sm line-clamp-1">{location}</span>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-muted-foreground" />
            <span className="font-body text-sm text-muted-foreground">
              {beds} Beds
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-muted-foreground" />
            <span className="font-body text-sm text-muted-foreground">
              {baths} Baths
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
