import { MapPin } from "lucide-react";

interface MapPlaceholderProps {
  city: string;
  neighborhood: string;
}

const MapPlaceholder = ({ city, neighborhood }: MapPlaceholderProps) => {
  return (
    <div className="relative aspect-video bg-secondary rounded-sm overflow-hidden">
      {/* Placeholder pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Location marker */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground text-background mb-3">
            <MapPin className="h-5 w-5" />
          </div>
          <p className="font-display text-lg font-medium text-foreground">
            {neighborhood}
          </p>
          <p className="font-body text-sm text-muted-foreground">
            {city}, Netherlands
          </p>
        </div>
      </div>

      {/* Note */}
      <div className="absolute bottom-4 left-4 right-4">
        <p className="font-body text-xs text-muted-foreground text-center">
          Exact location provided after viewing is confirmed
        </p>
      </div>
    </div>
  );
};

export default MapPlaceholder;
