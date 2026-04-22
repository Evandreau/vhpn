import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageSliderProps {
  images: string[];
  title: string;
  className?: string;
  showDots?: boolean;
  showArrows?: boolean;
  aspectRatio?: "video" | "square" | "wide";
  /** Optional URL navigated to when the center area of the image is clicked. */
  linkTo?: string;
}

const ImageSlider = ({
  images,
  title,
  className,
  showDots = true,
  showArrows = true,
  aspectRatio = "video",
  linkTo,
}: ImageSliderProps) => {
  const navigate = useNavigate();
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const dragStartX = useRef<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      return newIndex;
    });
  }, [images.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const aspectRatioClass = {
    video: "aspect-video",
    square: "aspect-square",
    wide: "aspect-[16/10]",
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageWrapperRef.current) return;
    const rect = imageWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = x / rect.width;
    // Left 25%: previous image. Right 25%: next image. Middle 50%: open listing.
    if (ratio < 0.25) {
      paginate(-1);
    } else if (ratio > 0.75) {
      paginate(1);
    } else if (linkTo) {
      navigate(linkTo);
    }
  };

  return (
    <div className={cn("relative overflow-hidden group", className)}>
      <div
        ref={imageWrapperRef}
        className={cn("relative w-full", aspectRatioClass[aspectRatio], linkTo && "cursor-pointer")}
        onClick={handleImageClick}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragStart={(_, info) => {
              dragStartX.current = info.point.x;
            }}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
              // Suppress click that follows a drag
              if (Math.abs(offset.x) > 5) {
                const suppress = (ev: MouseEvent) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                };
                window.addEventListener("click", suppress, { capture: true, once: true });
              }
            }}
            className="absolute inset-0 w-full h-full object-cover select-none cursor-grab active:cursor-grabbing"
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showArrows && images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => paginate(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => paginate(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-background w-6"
                  : "bg-background/50 hover:bg-background/70"
              )}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="absolute top-4 right-4 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full">
        <span className="font-body text-xs text-foreground">
          {currentIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  );
};

export default ImageSlider;
