import { cn } from "@/lib/utils";

interface AmenityChipProps {
  amenity: string;
  className?: string;
}

const AmenityChip = ({ amenity, className }: AmenityChipProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1.5 bg-secondary rounded-sm font-body text-sm text-foreground",
        className
      )}
    >
      {amenity}
    </span>
  );
};

export default AmenityChip;
