import { cn } from "@/lib/utils";

interface VHPNLogoProps {
  variant?: "full" | "wordmark" | "monogram";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * VHPN Logo Component
 * 
 * Lockups:
 * - full: Monogram + Wordmark (primary horizontal lockup)
 * - wordmark: Only "VHPN" text
 * - monogram: Only the geometric mark (for favicon/app/social)
 * 
 * Design System:
 * - Built on 8×8 grid for architectural precision
 * - Stroke weight: 1-2 units for optical balance
 * - Sharp corners with minimal functional curves
 * - Works in monochrome (essential for documents)
 */
const VHPNLogo = ({ variant = "full", size = "md", className }: VHPNLogoProps) => {
  const sizes = {
    sm: { monogram: 24, wordmark: "text-lg", gap: "gap-2" },
    md: { monogram: 32, wordmark: "text-2xl", gap: "gap-2.5" },
    lg: { monogram: 40, wordmark: "text-3xl", gap: "gap-3" },
    xl: { monogram: 56, wordmark: "text-4xl", gap: "gap-4" },
  };

  const { monogram: monogramSize, wordmark: wordmarkClass, gap } = sizes[size];

  // Monogram: Abstract geometric "V" shape that suggests both V and architecture
  // Designed on 8×8 grid (32px base), strokes are 4px (1 unit = 4px at base size)
  const Monogram = () => (
    <svg
      width={monogramSize}
      height={monogramSize}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
      aria-hidden="true"
    >
      {/* Geometric V-shape with architectural precision */}
      {/* Left stroke of V */}
      <path
        d="M4 4L16 28"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Right stroke of V */}
      <path
        d="M28 4L16 28"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Horizontal bar at top - suggests "H" and architectural lintel */}
      <path
        d="M6 8H26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
    </svg>
  );

  // Wordmark uses the display font with tight tracking
  const Wordmark = () => (
    <span
      className={cn(
        "font-display font-semibold tracking-[0.08em] text-foreground",
        wordmarkClass
      )}
      style={{ fontFeatureSettings: "'ss01' on, 'liga' on" }}
    >
      VHPN
    </span>
  );

  if (variant === "monogram") {
    return (
      <div className={cn("text-foreground", className)}>
        <Monogram />
      </div>
    );
  }

  if (variant === "wordmark") {
    return (
      <div className={className}>
        <Wordmark />
      </div>
    );
  }

  // Full lockup: monogram + wordmark, vertically centered on cap-height
  return (
    <div className={cn("flex items-center", gap, className)}>
      <Monogram />
      <Wordmark />
    </div>
  );
};

export default VHPNLogo;
