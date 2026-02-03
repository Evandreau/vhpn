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

  // Monogram: All four letters V-H-P-N visible in geometric arrangement
  // Designed on 8×8 grid (64px viewbox), architectural precision
  const Monogram = () => (
    <svg
      width={monogramSize}
      height={monogramSize}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
      aria-hidden="true"
    >
      {/* V - left diagonal strokes */}
      <path
        d="M4 8L14 40"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
      <path
        d="M24 8L14 40"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
      
      {/* H - two verticals with crossbar */}
      <path
        d="M20 8V40"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
      <path
        d="M32 8V40"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
      <path
        d="M20 24H32"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
      
      {/* P - vertical with bowl */}
      <path
        d="M38 8V40"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
      <path
        d="M38 8H46C50 8 52 12 52 16C52 20 50 24 46 24H38"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* N - two verticals with diagonal */}
      <path
        d="M4 48V56"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
      <path
        d="M4 48L16 56"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
      <path
        d="M16 48V56"
        stroke="currentColor"
        strokeWidth="4"
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
