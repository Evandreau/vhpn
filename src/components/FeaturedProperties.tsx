import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const properties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    price: "$3,200",
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    beds: 5,
    baths: 4,
    sqft: "4,200 sqft",
    featured: true,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    price: "$8,500",
    title: "Luxury Penthouse Downtown",
    location: "Manhattan, NY",
    beds: 3,
    baths: 2,
    sqft: "2,100 sqft",
    featured: false,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    price: "$4,800",
    title: "Contemporary Beach House",
    location: "Malibu, CA",
    beds: 4,
    baths: 3,
    sqft: "3,500 sqft",
    featured: true,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    price: "$2,400",
    title: "Urban Loft Apartment",
    location: "Brooklyn, NY",
    beds: 2,
    baths: 1,
    sqft: "1,200 sqft",
    featured: false,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    price: "$5,900",
    title: "Mountain View Estate",
    location: "Aspen, CO",
    beds: 6,
    baths: 5,
    sqft: "5,800 sqft",
    featured: true,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
    price: "$6,800",
    title: "Waterfront Condo",
    location: "Miami Beach, FL",
    beds: 3,
    baths: 2,
    sqft: "1,850 sqft",
    featured: false,
  },
];

const FeaturedProperties = () => {
  return (
    <section id="properties" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="inline-block font-body text-sm font-medium text-accent mb-3 tracking-wide uppercase">
              Available Now
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground">
              Featured Rentals
            </h2>
          </div>
          <p className="font-body text-base text-muted-foreground max-w-md mt-4 md:mt-0">
            Hand-picked selection of premium rental properties that match your lifestyle.
          </p>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <PropertyCard key={property.id} {...property} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-14"
        >
          <Button
            variant="outline"
            size="lg"
            className="font-body text-sm px-8 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 rounded-full group"
          >
            View All Rentals
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
