import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bed, Bath, Square, Calendar, Euro, Clock, Check, MapPin, Play, Shield, PawPrint, GraduationCap, Users, Car, Trees } from "lucide-react";
import { format, parseISO } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageSlider from "@/components/ImageSlider";
import AmenityChip from "@/components/AmenityChip";
import MapPlaceholder from "@/components/MapPlaceholder";
import ListingCard from "@/components/ListingCard";
import KeyFactsBlock from "@/components/KeyFactsBlock";
import SEO, { generateBreadcrumbSchema, generateListingSchema } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getListingById, getRelatedListings } from "@/data/listings";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

const ListingDetail = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const listing = getListingById(id || "");
  const relatedListings = getRelatedListings(id || "", 3);
  
  const [activeTab, setActiveTab] = useState("interest");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredDate: '',
  });

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-[73px]">
          <div className="container mx-auto px-6 py-24 text-center">
            <h1 className="font-display text-3xl text-foreground mb-4">
              {language === 'nl' ? 'Woning niet gevonden' : 'Property not found'}
            </h1>
            <p className="font-body text-muted-foreground mb-8">
              {language === 'nl' 
                ? 'De woning die u zoekt bestaat niet of is verwijderd.'
                : "The listing you're looking for doesn't exist or has been removed."
              }
            </p>
            <Link to="/listings">
              <Button variant="outline" className="rounded-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('detail.backToListings')}
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

  const getAvailabilityText = () => {
    if (listing.availableType === 'immediately') {
      return t('listings.availableNow');
    }
    return `${t('listings.availableFrom')} ${formatDate(listing.availableFromDate || '')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('form.success'),
      description: t('form.successMessage'),
    });
    setFormData({ name: '', email: '', phone: '', message: '', preferredDate: '' });
  };

  const quickSpecs = [
    { icon: PawPrint, label: language === 'nl' ? 'Huisdieren' : 'Pets', value: listing.petsAllowed },
    { icon: GraduationCap, label: language === 'nl' ? 'Studenten' : 'Students', value: listing.studentsAllowed },
    { icon: Users, label: language === 'nl' ? 'Delen' : 'Sharing', value: listing.homeSharingAllowed },
    { icon: Car, label: language === 'nl' ? 'Parkeren' : 'Parking', value: listing.parking },
    { icon: Trees, label: language === 'nl' ? 'Buiten' : 'Outdoor', value: listing.outdoorSpace },
  ].filter(spec => spec.value);

  // Breadcrumb schema for structured data
  const breadcrumbItems = [
    { name: language === 'nl' ? 'Home' : 'Home', url: 'https://haven-rentals.nl/' },
    { name: language === 'nl' ? 'Huurwoningen' : 'Rentals', url: 'https://haven-rentals.nl/listings' },
    { name: listing.title, url: `https://haven-rentals.nl/listings/${listing.id}` },
  ];

  const seoTitle = language === 'nl' 
    ? `${listing.title} | ${formatPrice(listing.priceMonthly)}/maand | Haven Rentals`
    : `${listing.title} | ${formatPrice(listing.priceMonthly)}/month | Haven Rentals`;
  
  const seoDescription = listing.descriptionShort;

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        url={`/listings/${listing.id}`}
        image={listing.images[0]}
        type="product"
        listing={listing}
      />
      
      {/* Breadcrumb Schema */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema(breadcrumbItems))}
        </script>
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
              {t('detail.backToListings')}
            </Link>
          </div>

          {/* Image Slider */}
          <div className="container mx-auto px-6 mb-10">
            <div className="relative">
              <ImageSlider
                images={listing.images}
                title={listing.title}
                aspectRatio="wide"
                className="rounded-sm overflow-hidden"
              />
              {listing.videoTourUrl && (
                <a
                  href={listing.videoTourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full font-body text-sm text-foreground hover:bg-background transition-colors"
                >
                  <Play className="h-4 w-4" />
                  {language === 'nl' ? 'Bekijk video tour' : 'Watch video tour'}
                </a>
              )}
            </div>
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
                    {listing.verified && (
                      <span className="font-body text-xs font-medium px-3 py-1.5 bg-accent/10 text-accent rounded-sm flex items-center gap-1.5">
                        <Shield className="h-3.5 w-3.5" />
                        {t('trust.verifiedListings')}
                      </span>
                    )}
                    {listing.featured && (
                      <span className="font-body text-xs font-medium px-3 py-1.5 bg-foreground text-background rounded-sm">
                        {t('listings.featured')}
                      </span>
                    )}
                    <span className="font-body text-xs px-3 py-1.5 bg-secondary text-foreground rounded-sm">
                      {listing.furnished ? t('listings.furnished') : t('listings.unfurnished')}
                    </span>
                  </div>

                  <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-3">
                    {listing.title}
                  </h1>

                  <div className="flex items-center gap-1.5 text-muted-foreground mb-6">
                    <MapPin className="h-4 w-4" />
                    <span className="font-body text-base">
                      {listing.neighborhood}, {listing.city}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="font-display text-4xl font-medium text-foreground">
                      {formatPrice(listing.priceMonthly)}
                    </span>
                    <span className="font-body text-base text-muted-foreground">{t('listings.perMonth')}</span>
                  </div>

                  {/* Key Facts Block - Consistent machine-readable summary */}
                  <KeyFactsBlock listing={listing} />
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
                    {getAvailabilityText()}
                  </p>
                </motion.div>

                {/* Quick Specs Chips */}
                {quickSpecs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.12 }}
                    className="flex flex-wrap gap-2"
                  >
                    {quickSpecs.map((spec) => (
                      <span key={spec.label} className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 text-foreground rounded-full text-xs font-body">
                        <spec.icon className="h-3.5 w-3.5" />
                        {spec.label}
                      </span>
                    ))}
                  </motion.div>
                )}

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <h2 className="font-display text-2xl font-light text-foreground mb-4">
                    {t('detail.description')}
                  </h2>
                  <p className="font-body text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                    {listing.descriptionLong}
                  </p>
                </motion.div>

                {/* Amenities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="font-display text-2xl font-light text-foreground mb-4">
                    {t('detail.features')}
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
                  <h2 className="font-display text-2xl font-light text-foreground mb-2">
                    {t('detail.location')}
                  </h2>
                  {listing.addressDisclosure === 'approx' && (
                    <p className="font-body text-xs text-muted-foreground mb-4">
                      {t('detail.approximateLocation')}
                    </p>
                  )}
                  <MapPlaceholder city={listing.city} neighborhood={listing.neighborhood} />
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-card border border-border rounded-sm p-6"
                  >
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="interest" className="text-xs">
                          {t('form.expressInterest')}
                        </TabsTrigger>
                        <TabsTrigger value="viewing" className="text-xs">
                          {t('form.requestViewing')}
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="interest">
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <Input
                            placeholder={t('form.name')}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="rounded-sm"
                          />
                          <Input
                            type="email"
                            placeholder={t('form.email')}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="rounded-sm"
                          />
                          <Input
                            placeholder={t('form.phone')}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="rounded-sm"
                          />
                          <Textarea
                            placeholder={t('form.message')}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={3}
                            className="rounded-sm resize-none"
                          />
                          <Button type="submit" className="w-full rounded-full">
                            {t('form.submit')}
                          </Button>
                          <p className="font-body text-xs text-muted-foreground text-center">
                            {t('form.privacy')} <a href="/privacy" className="underline">{t('form.privacyPolicy')}</a>
                          </p>
                        </form>
                      </TabsContent>

                      <TabsContent value="viewing">
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <Input
                            placeholder={t('form.name')}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="rounded-sm"
                          />
                          <Input
                            type="email"
                            placeholder={t('form.email')}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="rounded-sm"
                          />
                          <Input
                            placeholder={t('form.phone')}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                            className="rounded-sm"
                          />
                          <Input
                            type="date"
                            placeholder={t('form.preferredDate')}
                            value={formData.preferredDate}
                            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                            className="rounded-sm"
                          />
                          <Button type="submit" className="w-full rounded-full">
                            {t('form.requestViewing')}
                          </Button>
                          <p className="font-body text-xs text-muted-foreground text-center">
                            {t('form.privacy')} <a href="/privacy" className="underline">{t('form.privacyPolicy')}</a>
                          </p>
                        </form>
                      </TabsContent>
                    </Tabs>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Listings */}
          {relatedListings.length > 0 && (
            <section className="py-20 mt-16 bg-secondary">
              <div className="container mx-auto px-6">
                <h2 className="font-display text-2xl md:text-3xl font-light text-foreground mb-10">
                  {t('detail.similarProperties')}
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
