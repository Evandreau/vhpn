import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import ListingFilters, { FilterState } from "@/components/ListingFilters";
import { Button } from "@/components/ui/button";
import { listings, Listing } from "@/data/listings";

const ITEMS_PER_PAGE = 9;

const Listings = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    city: "",
    minPrice: "",
    maxPrice: "",
    beds: "",
    furnished: false,
    availableFrom: "",
    sort: "newest",
  });
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredListings = useMemo(() => {
    let result = [...listings];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (l) =>
          l.neighborhood.toLowerCase().includes(searchLower) ||
          l.title.toLowerCase().includes(searchLower) ||
          l.city.toLowerCase().includes(searchLower)
      );
    }

    // City filter
    if (filters.city && filters.city !== "all") {
      result = result.filter((l) => l.city === filters.city);
    }

    // Price filters
    if (filters.minPrice) {
      result = result.filter((l) => l.priceMonthly >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((l) => l.priceMonthly <= parseInt(filters.maxPrice));
    }

    // Beds filter
    if (filters.beds && filters.beds !== "any") {
      const bedsNum = parseInt(filters.beds);
      result = result.filter((l) => l.beds >= bedsNum);
    }

    // Furnished filter
    if (filters.furnished) {
      result = result.filter((l) => l.furnished);
    }

    // Availability filter
    if (filters.availableFrom) {
      const filterDate = new Date(filters.availableFrom);
      result = result.filter((l) => new Date(l.availableFrom) <= filterDate);
    }

    // Sort
    switch (filters.sort) {
      case "price-low":
        result.sort((a, b) => a.priceMonthly - b.priceMonthly);
        break;
      case "price-high":
        result.sort((a, b) => b.priceMonthly - a.priceMonthly);
        break;
      case "sqm":
        result.sort((a, b) => b.sqm - a.sqm);
        break;
      case "newest":
      default:
        result.sort((a, b) => new Date(a.availableFrom).getTime() - new Date(b.availableFrom).getTime());
        break;
    }

    return result;
  }, [filters]);

  const visibleListings = filteredListings.slice(0, visibleCount);
  const hasMore = visibleCount < filteredListings.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <>
      <Helmet>
        <title>Browse Rentals — Haven</title>
        <meta
          name="description"
          content="Browse furnished apartments and houses for rent in Amsterdam, Rotterdam, The Hague, Utrecht, and other Dutch cities. Filter by price, size, and location."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-[73px]">
          {/* Page Header */}
          <div className="bg-secondary py-16">
            <div className="container mx-auto px-6">
              <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-3">
                Available rentals
              </h1>
              <p className="font-body text-base text-muted-foreground max-w-lg">
                Furnished apartments and houses across the Netherlands. Find your next home.
              </p>
            </div>
          </div>

          {/* Filters */}
          <ListingFilters
            filters={filters}
            onFilterChange={setFilters}
            resultsCount={filteredListings.length}
          />

          {/* Listings Grid */}
          <div className="container mx-auto px-6 py-12">
            {filteredListings.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-display text-2xl text-foreground mb-2">
                  No properties found
                </p>
                <p className="font-body text-muted-foreground">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                  {visibleListings.map((listing, index) => (
                    <ListingCard key={listing.id} listing={listing} index={index} />
                  ))}
                </div>

                {hasMore && (
                  <div className="text-center mt-14">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={loadMore}
                      className="font-body text-sm px-8 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 rounded-full"
                    >
                      Load more
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Listings;
