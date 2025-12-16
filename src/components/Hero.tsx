import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
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
          alt="Luxury modern home"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-block px-4 py-2 mb-6 text-sm font-body font-medium text-primary-foreground/90 bg-primary-foreground/10 backdrop-blur-sm rounded-full border border-primary-foreground/20"
          >
            Find Your Dream Home
          </motion.span>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground mb-6 leading-tight">
            Discover Exceptional
            <br />
            <span className="text-gradient-gold">Properties</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-xl mx-auto">
            Explore curated listings of premium homes, apartments, and estates
            in the most desirable locations.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-card/95 backdrop-blur-md rounded-2xl p-2 shadow-2xl max-w-2xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter location, city, or ZIP code"
                  className="pl-12 h-14 border-0 bg-transparent font-body text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button className="h-14 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-body font-medium text-base rounded-xl">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12"
          >
            {[
              { value: "2,500+", label: "Properties Listed" },
              { value: "1,800+", label: "Happy Clients" },
              { value: "150+", label: "Expert Agents" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-semibold text-primary-foreground">
                  {stat.value}
                </div>
                <div className="font-body text-sm text-primary-foreground/70 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
