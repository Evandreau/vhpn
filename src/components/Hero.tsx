import { motion } from "framer-motion";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-property.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury rental interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Watermark Brand */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="watermark-text text-[12vw] md:text-[15vw] leading-none tracking-wider text-center select-none"
          style={{ marginBottom: '-0.1em' }}
        >
          RENTALS
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-primary-foreground mb-6 leading-tight tracking-tight">
            Find Your Perfect
            <br />
            <span className="font-medium italic">Rental Home</span>
          </h1>

          <p className="font-body text-base md:text-lg text-primary-foreground/80 mb-10 max-w-lg mx-auto font-light">
            Discover curated rental properties in the most desirable locations.
            Premium apartments, houses, and studios awaiting you.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-card/95 backdrop-blur-md rounded-full p-1.5 shadow-2xl max-w-xl mx-auto"
          >
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter location or neighborhood"
                  className="pl-10 h-12 border-0 bg-transparent font-body text-sm focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full"
                />
              </div>
              <Button className="h-12 px-6 bg-accent hover:bg-accent/90 text-accent-foreground font-body font-medium text-sm rounded-full">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </motion.div>

          {/* CTA Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8"
          >
            <a 
              href="#properties" 
              className="inline-flex items-center gap-2 font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors group"
            >
              Browse all rentals
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 rounded-full border border-primary-foreground/30 flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-primary-foreground/60"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
