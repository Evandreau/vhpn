import { useState } from "react";
import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";

const properties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    price: "$1,250,000",
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    beds: 5,
    baths: 4,
    sqft: "4,200 sqft",
    type: "sale" as const,
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
    type: "rent" as const,
    featured: false,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    price: "$875,000",
    title: "Contemporary Beach House",
    location: "Malibu, CA",
    beds: 4,
    baths: 3,
    sqft: "3,500 sqft",
    type: "sale" as const,
    featured: true,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    price: "$4,200",
    title: "Urban Loft Apartment",
    location: "Brooklyn, NY",
    beds: 2,
    baths: 1,
    sqft: "1,200 sqft",
    type: "rent" as const,
    featured: false,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    price: "$2,100,000",
    title: "Estate with Mountain Views",
    location: "Aspen, CO",
    beds: 6,
    baths: 5,
    sqft: "5,800 sqft",
    type: "sale" as const,
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
    type: "rent" as const,
    featured: false,
  },
];

const FeaturedProperties = () => {
  const [filter, setFilter] = useState<"all" | "sale" | "rent">("all");

  const filteredProperties = properties.filter((property) =>
    filter === "all" ? true : property.type === filter
  );

  return (
    <section id="properties" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-body font-medium text-accent bg-accent/10 rounded-full">
            Featured Listings
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-4">
            Discover Our Best Properties
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Hand-picked selection of premium properties that match your lifestyle
            and investment goals.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center gap-2 mb-12"
        >
          {[
            { value: "all", label: "All Properties" },
            { value: "sale", label: "For Sale" },
            { value: "rent", label: "For Rent" },
          ].map((tab) => (
            <Button
              key={tab.value}
              variant={filter === tab.value ? "default" : "ghost"}
              onClick={() => setFilter(tab.value as "all" | "sale" | "rent")}
              className={`font-body text-sm px-6 ${
                filter === tab.value
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property, index) => (
            <PropertyCard key={property.id} {...property} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="font-body text-base px-8 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300"
          >
            View All Properties
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
