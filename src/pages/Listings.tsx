import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import ListingFilters, { FilterState } from "@/components/ListingFilters";
import SEO, { generateBreadcrumbSchema } from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAvailableListings, Listing } from "@/data/listings";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 9;

const Listings = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    city: "",
    district: "",
    interiorType: "",
    minSqm: "",
    minPrice: "",
    maxPrice: "",
    beds: "",
    furnished: null,
    parking: false,
    petFriendly: false,
    outdoorSpace: false,
    studentsAllowed: false,
    homeSharingAllowed: false,
    sort: "newest",
  });
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    moveInDate: '',
    preferredArea: '',
  });

  const listings = getAvailableListings();

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

    // District filter
    if (filters.district && filters.district !== "all") {
      result = result.filter((l) => l.district === filters.district);
    }

    // Interior type filter
    if (filters.interiorType && filters.interiorType !== "all") {
      result = result.filter((l) => l.interiorType === filters.interiorType);
    }

    // Min living area filter
    if (filters.minSqm && filters.minSqm !== "all") {
      const minSqm = parseInt(filters.minSqm);
      result = result.filter((l) => l.sqm >= minSqm);
    }

    // Furnished filter
    if (filters.furnished !== null) {
      result = result.filter((l) => l.furnished === filters.furnished);
    }

    // Boolean filters
    if (filters.parking) {
      result = result.filter((l) => l.parking);
    }
    if (filters.petFriendly) {
      result = result.filter((l) => l.petsAllowed);
    }
    if (filters.outdoorSpace) {
      result = result.filter((l) => l.outdoorSpace);
    }
    if (filters.studentsAllowed) {
      result = result.filter((l) => l.studentsAllowed);
    }
    if (filters.homeSharingAllowed) {
      result = result.filter((l) => l.homeSharingAllowed);
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
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [filters, listings]);

  const visibleListings = filteredListings.slice(0, visibleCount);
  const hasMore = visibleCount < filteredListings.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('form.success'),
      description: t('form.successMessage'),
    });
    setShowLeadForm(false);
    setLeadForm({ name: '', email: '', phone: '', budget: '', moveInDate: '', preferredArea: '' });
  };

  const seoTitle = language === 'nl' 
    ? 'Huurwoningen in Nederland | Gemeubileerde Appartementen & Huizen | VHPN'
    : 'Rentals in the Netherlands | Furnished Apartments & Houses | VHPN';
  
  const seoDescription = language === 'nl'
    ? 'Bekijk gemeubileerde appartementen en huizen te huur in Amsterdam, Rotterdam, Den Haag, Utrecht en andere Nederlandse steden. Direct beschikbaar.'
    : 'Browse furnished apartments and houses for rent in Amsterdam, Rotterdam, The Hague, Utrecht, and other Dutch cities. Available now.';

  const breadcrumbItems = [
    { name: 'Home', url: 'https://vhpn.nl/' },
    { name: language === 'nl' ? 'Huurwoningen' : 'Rentals', url: 'https://vhpn.nl/listings' },
  ];

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        url="/listings"
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema(breadcrumbItems))}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-[73px]">
          {/* Page Header */}
          <div className="bg-secondary py-16">
            <div className="container mx-auto px-6">
              <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-3">
                {t('listings.title')}
              </h1>
              <p className="font-body text-base text-muted-foreground max-w-lg">
                {t('listings.subtitle')}
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
                  {t('listings.noResults')}
                </p>
                <p className="font-body text-muted-foreground mb-6">
                  {t('listings.noResultsDesc')}
                </p>
                <Button onClick={() => setShowLeadForm(true)} className="rounded-full">
                  {t('cta.leaveDetails')}
                </Button>
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
                      {t('listings.loadMore')}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Can't Find Section */}
          <section className="py-16 bg-secondary">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto text-center"
              >
                <MessageSquare className="h-10 w-10 text-accent mx-auto mb-4" />
                <h2 className="font-display text-2xl md:text-3xl font-light text-foreground mb-3">
                  {t('cta.cantFind')}
                </h2>
                <p className="font-body text-muted-foreground mb-6">
                  {t('cta.cantFindDesc')}
                </p>
                
                {!showLeadForm ? (
                  <Button onClick={() => setShowLeadForm(true)} className="rounded-full">
                    {t('cta.leaveDetails')}
                  </Button>
                ) : (
                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleLeadSubmit}
                    className="bg-background p-6 rounded-lg shadow-sm text-left space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder={t('form.name')}
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        required
                        className="rounded-sm"
                      />
                      <Input
                        type="email"
                        placeholder={t('form.email')}
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        required
                        className="rounded-sm"
                      />
                      <Input
                        placeholder={t('form.phone')}
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        className="rounded-sm"
                      />
                      <Input
                        placeholder={t('form.budget')}
                        value={leadForm.budget}
                        onChange={(e) => setLeadForm({ ...leadForm, budget: e.target.value })}
                        className="rounded-sm"
                      />
                      <Input
                        type="date"
                        placeholder={t('form.moveInDate')}
                        value={leadForm.moveInDate}
                        onChange={(e) => setLeadForm({ ...leadForm, moveInDate: e.target.value })}
                        className="rounded-sm"
                      />
                      <Input
                        placeholder={t('form.preferredArea')}
                        value={leadForm.preferredArea}
                        onChange={(e) => setLeadForm({ ...leadForm, preferredArea: e.target.value })}
                        className="rounded-sm"
                      />
                    </div>
                    <div className="flex gap-3 justify-end">
                      <Button type="button" variant="ghost" onClick={() => setShowLeadForm(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="rounded-full">
                        {t('form.submit')}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Listings;
