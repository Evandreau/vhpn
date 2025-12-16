import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Bed, Bath, Square, Calendar, Euro, Clock, Check } from "lucide-react";
import { format, parseISO } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageSlider from "@/components/ImageSlider";
import AmenityChip from "@/components/AmenityChip";
import MapPlaceholder from "@/components/MapPlaceholder";
import ViewingRequestForm from "@/components/ViewingRequestForm";
import ListingCard from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { getListingById, getRelatedListings } from "@/data/listings";

const ListingDetail = () => {
  const { id } = useParams();
  const listing = getListingById(id || "");
  const relatedListings = getRelatedListings(id || "", 3);

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-[73px]">
          <div className="container mx-auto px-6 py-24 text-center">
            <h1 className="font-display text-3xl text-foreground mb-4">
              Property not found
            </h1>
            <p className="font-body text-muted-foreground mb-8">
              The listing you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/listings">
              <Button variant="outline" className="rounded-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to listings
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "d MMMM yyyy");
  };

  return (
    <>
      <Helmet>
        <title>{listing.title} — Haven</title>
        <meta
          name="description"
          content={`${listing.title} in ${listing.neighborhood}, ${listing.city}. ${listing.beds === 0 ? "Studio" : `${listing.beds} bedroom`} furnished rental for ${formatPrice(listing.priceMonthly)}/month.`}
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-[73px]">
          {/* Back Link */}
          <div className="container mx-auto px-6 py-6">
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to listings
            </Link>
          </div>

          {/* Image Slider */}
          <div className="container mx-auto px-6 mb-10">
            <ImageSlider
              images={listing.images}
              title={listing.title}
              aspectRatio="wide"
              className="rounded-sm overflow-hidden"
            />
          </div>

          {/* Content */}
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {listing.featured && (
                      <span className="font-body text-xs font-medium px-3 py-1.5 bg-foreground text-background rounded-sm">
                        Featured
                      </span>
                    )}
                    {listing.furnished && (
                      <span className="font-body text-xs px-3 py-1.5 bg-secondary text-foreground rounded-sm">
                        Furnished
                      </span>
                    )}
                  </div>

                  <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-3">
                    {listing.title}
                  </h1>

                  <p className="font-body text-base text-muted-foreground mb-6">
                    {listing.neighborhood}, {listing.city}
                  </p>

                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="font-display text-4xl font-medium text-foreground">
                      {formatPrice(listing.priceMonthly)}
                    </span>
                    <span className="font-body text-base text-muted-foreground">/month</span>
                  </div>

                  {/* Specs Row */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-6 border-y border-border">
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-body text-sm text-muted-foreground">Beds</p>
                        <p className="font-body text-base font-medium text-foreground">
                          {listing.beds === 0 ? "Studio" : listing.beds}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-body text-sm text-muted-foreground">Baths</p>
                        <p className="font-body text-base font-medium text-foreground">
                          {listing.baths}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Square className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-body text-sm text-muted-foreground">Size</p>
                        <p className="font-body text-base font-medium text-foreground">
                          {listing.sqm} m²
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-body text-sm text-muted-foreground">Furnished</p>
                        <p className="font-body text-base font-medium text-foreground">
                          {listing.furnished ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Euro className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-body text-sm text-muted-foreground">Deposit</p>
                        <p className="font-body text-base font-medium text-foreground">
                          {formatPrice(listing.deposit)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-body text-sm text-muted-foreground">Min stay</p>
                        <p className="font-body text-base font-medium text-foreground">
                          {listing.minStayMonths} months
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Availability */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center gap-3 p-4 bg-secondary rounded-sm"
                >
                  <Calendar className="h-5 w-5 text-accent" />
                  <p className="font-body text-sm text-foreground">
                    Available from <span className="font-medium">{formatDate(listing.availableFrom)}</span>
                  </p>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <h2 className="font-display text-2xl font-light text-foreground mb-4">
                    About this property
                  </h2>
                  <p className="font-body text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                    {listing.description}
                  </p>
                </motion.div>

                {/* Amenities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="font-display text-2xl font-light text-foreground mb-4">
                    Amenities
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {listing.amenities.map((amenity) => (
                      <AmenityChip key={amenity} amenity={amenity} />
                    ))}
                  </div>
                </motion.div>

                {/* Map */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  <h2 className="font-display text-2xl font-light text-foreground mb-4">
                    Location
                  </h2>
                  <MapPlaceholder city={listing.city} neighborhood={listing.neighborhood} />
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <ViewingRequestForm listingTitle={listing.title} />
                </div>
              </div>
            </div>
          </div>

          {/* Related Listings */}
          {relatedListings.length > 0 && (
            <section className="py-20 mt-16 bg-secondary">
              <div className="container mx-auto px-6">
                <h2 className="font-display text-2xl md:text-3xl font-light text-foreground mb-10">
                  Similar properties
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                  {relatedListings.map((relatedListing, index) => (
                    <ListingCard
                      key={relatedListing.id}
                      listing={relatedListing}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ListingDetail;
