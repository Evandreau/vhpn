import { cn } from "@/lib/utils";

interface VHPNLogoProps {
  variant?: "wordmark" | "compact" | "stacked";
  weight?: "semibold" | "bold";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  inverted?: boolean;
  className?: string;
}

/**
 * VHPN Wordmark Logo
 *
 * A premium geometric sans wordmark inspired by DSTRCT-style modern grotesk.
 * Hand-crafted SVG with optically balanced letter spacing.
 *
 * Lockups:
 * - wordmark: Primary horizontal wordmark (default, for navbar/footer/hero)
 * - compact: Tight version for small spaces (badges, favicons area)
 * - stacked: Wordmark with tagline below (for about page / footer brand block)
 *
 * Weights:
 * - semibold: Default, elegant, editorial
 * - bold: Confident, impactful (hero / large display)
 *
 * Usage rules:
 * - Minimum clear space: 1× cap-height on all sides
 * - Minimum width: 64px (compact), 80px (wordmark)
 * - Always use on solid backgrounds (no photo overlays without contrast scrim)
 * - No gradients, shadows, outlines, or decorative elements
 * - Inverted (white on dark) for dark backgrounds only
 */
const VHPNLogo = ({
  variant = "wordmark",
  weight = "semibold",
  size = "md",
  inverted = false,
  className,
}: VHPNLogoProps) => {
  const sizeMap = {
    xs: { width: 64, height: 16 },
    sm: { width: 80, height: 20 },
    md: { width: 100, height: 25 },
    lg: { width: 130, height: 32 },
    xl: { width: 170, height: 42 },
    "2xl": { width: 220, height: 55 },
  };

  const { width, height } = sizeMap[size];

  // Stroke width controls weight: semibold vs bold
  const sw = weight === "bold" ? 5.5 : 4.2;

  // The wordmark is drawn on a 200×50 viewBox for precision.
  // Letters V, H, P, N are optically spaced with custom kerning.
  // V–H pair has tighter spacing to compensate for V's diagonal white space.
  const WordmarkSVG = () => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
      role="img"
      aria-label="VHPN"
    >
      {/* V — two diagonals meeting at baseline center */}
      <path
        d={`M4 8 L20 42`}
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d={`M36 8 L20 42`}
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* H — two verticals + crossbar at optical center (slightly above midpoint) */}
      <path
        d={`M52 8 L52 42`}
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="square"
      />
      <path
        d={`M72 8 L72 42`}
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="square"
      />
      <path
        d={`M52 24 L72 24`}
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="square"
      />

      {/* P — vertical + geometric bowl (flat junction, square terminal) */}
      <path
        d={`M90 8 L90 42`}
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="square"
      />
      <path
        d={`M90 8 L104 8 Q112 8 112 16.5 Q112 25 104 25 L90 25`}
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />

      {/* N — two verticals + diagonal */}
      <path
        d={`M130 42 L130 8`}
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="square"
      />
      <path
        d={`M130 8 L152 42`}
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d={`M152 42 L152 8`}
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="square"
      />
    </svg>
  );

  // Compact: tighter spacing for small applications
  const CompactSVG = () => (
    <svg
      width={Math.round(width * 0.7)}
      height={height}
      viewBox="0 0 160 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
      role="img"
      aria-label="VHPN"
    >
      <path d={`M4 8 L17 42`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" />
      <path d={`M30 8 L17 42`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" />

      <path d={`M42 8 L42 42`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" />
      <path d={`M58 8 L58 42`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" />
      <path d={`M42 24 L58 24`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" />

      <path d={`M72 8 L72 42`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" />
      <path d={`M72 8 L83 8 Q90 8 90 16.5 Q90 25 83 25 L72 25`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" fill="none" />

      <path d={`M104 42 L104 8`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" />
      <path d={`M104 8 L122 42`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" />
      <path d={`M122 42 L122 8`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" />
    </svg>
  );

  // Stacked: wordmark + tagline
  const StackedSVG = () => (
    <svg
      width={width}
      height={Math.round(height * 1.6)}
      viewBox="0 0 200 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
      role="img"
      aria-label="VHPN — Premium Rentals"
    >
      {/* Main wordmark */}
      <path d={`M30 8 L46 38`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" />
      <path d={`M62 8 L46 38`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" />
      <path d={`M76 8 L76 38`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" />
      <path d={`M94 8 L94 38`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" />
      <path d={`M76 22 L94 22`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" />
      <path d={`M110 8 L110 38`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" />
      <path d={`M110 8 L122 8 Q130 8 130 15 Q130 22 122 22 L110 22`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" fill="none" />
      <path d={`M146 38 L146 8`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" />
      <path d={`M146 8 L166 38`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" />
      <path d={`M166 38 L166 8`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square" />

      {/* Tagline: thin rule + text rendered as paths for consistency */}
      <line x1="30" y1="48" x2="166" y2="48" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <text
        x="98"
        y="64"
        textAnchor="middle"
        fill="currentColor"
        fontSize="7"
        fontFamily="Outfit, sans-serif"
        fontWeight="400"
        letterSpacing="3"
        opacity="0.55"
      >
        PREMIUM RENTALS
      </text>
    </svg>
  );

  const colorClass = inverted ? "text-primary-foreground" : "text-foreground";

  if (variant === "compact") {
    return (
      <div className={cn(colorClass, className)}>
        <CompactSVG />
      </div>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={cn(colorClass, className)}>
        <StackedSVG />
      </div>
    );
  }

  return (
    <div className={cn(colorClass, className)}>
      <WordmarkSVG />
    </div>
  );
};

export default VHPNLogo;
