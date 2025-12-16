import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import HowItWorks from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { getFeaturedListings } from "@/data/listings";
import heroImage from "@/assets/hero-property.jpg";

const Index = () => {
  const featuredListings = getFeaturedListings().slice(0, 6);

  return (
    <>
      <Helmet>
        <title>Haven — Furnished Rentals in the Netherlands</title>
        <meta
          name="description"
          content="Discover curated furnished apartments and houses for rent across the Netherlands. Premium rentals in Amsterdam, Rotterdam, The Hague, and beyond."
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={heroImage}
                alt="Luxury furnished apartment interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 hero-overlay" />
            </div>

            {/* Watermark */}
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
            <div className="relative z-10 container mx-auto px-6 pt-24 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl mx-auto"
              >
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-primary-foreground mb-6 leading-[1.1] tracking-tight">
                  Furnished homes,
                  <br />
                  <span className="font-medium italic">thoughtfully curated</span>
                </h1>

                <p className="font-body text-base md:text-lg text-primary-foreground/80 mb-10 max-w-md mx-auto font-light leading-relaxed">
                  Premium rentals across the Netherlands. Move in ready, stay as long as you need.
                </p>

                <Link to="/listings">
                  <Button
                    size="lg"
                    className="bg-background text-foreground hover:bg-background/90 font-body text-sm px-8 rounded-full h-12"
                  >
                    View rentals
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
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

          {/* Featured Listings */}
          <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row md:items-end md:justify-between mb-14"
              >
                <div>
                  <span className="inline-block font-body text-sm font-medium text-accent mb-3 tracking-wide uppercase">
                    Available Now
                  </span>
                  <h2 className="font-display text-3xl md:text-5xl font-light text-foreground">
                    Featured rentals
                  </h2>
                </div>
                <p className="font-body text-base text-muted-foreground max-w-md mt-4 md:mt-0">
                  Hand-picked properties that define comfortable living.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {featuredListings.map((listing, index) => (
                  <ListingCard key={listing.id} listing={listing} index={index} />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-center mt-16"
              >
                <Link to="/listings">
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-body text-sm px-8 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 rounded-full group"
                  >
                    View all rentals
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* How It Works */}
          <HowItWorks />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
