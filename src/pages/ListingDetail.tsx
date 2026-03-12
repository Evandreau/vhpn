import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bed, Bath, Square, Calendar, Euro, Clock, Check, MapPin, Play, Shield, PawPrint, GraduationCap, Users, Car, Trees } from "lucide-react";
import { format, parseISO } from "date-fns";
import { nl, enUS } from "date-fns/locale";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Listing } from "@/data/listings";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { useParariusListings } from "@/hooks/useParariusListings";
import { stripHouseNumber } from "@/lib/address";

const DAYS = [
  { value: 'ma', nl: 'Ma', en: 'Mon' },
  { value: 'di', nl: 'Di', en: 'Tue' },
  { value: 'wo', nl: 'Wo', en: 'Wed' },
  { value: 'do', nl: 'Do', en: 'Thu' },
  { value: 'vr', nl: 'Vr', en: 'Fri' },
];

const ListingDetail = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  const { data: liveListings, isLoading } = useParariusListings(language);
  const listing = liveListings?.find(l => l.id === id);
  const relatedListings = liveListings?.filter(l => l.id !== id).slice(0, 3) || [];
  
  const [activeTab, setActiveTab] = useState("interest");
  const [interestForm, setInterestForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [viewingForm, setViewingForm] = useState({
    name: '', email: '', phone: '',
    availableDays: [] as string[],
    timeSlot: '',
    rentalStartDate: '',
    rentalPeriod: '',
    grossMonthlyIncome: '',
    partnerGrossMonthlyIncome: '',
  });
  const [viewingErrors, setViewingErrors] = useState<Record<string, string>>({});

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-[73px]">
          <div className="container mx-auto px-6 py-12 space-y-6">
            <Skeleton className="w-full aspect-[16/9] rounded-lg" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-5 w-1/3" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-lg" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
    try {
      const parsed = parseISO(dateString);
      if (isNaN(parsed.getTime())) return dateString;
      return format(parsed, "d MMMM yyyy", { locale: language === 'nl' ? nl : enUS });
    } catch {
      return dateString;
    }
  };

  const getAvailabilityText = () => {
    if (listing.availableType === 'immediately' || !listing.availableFromDate || listing.availableFromDate === '0000-00-00') {
      return t('listings.availableNow');
    }
    return `${t('listings.availableFrom')} ${formatDate(listing.availableFromDate)}`;
  };

  // Privacy: strip house number from title for display
  const displayTitle = stripHouseNumber(listing.title);

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: t('form.success'), description: t('form.successMessage') });
    setInterestForm({ name: '', email: '', phone: '', message: '' });
  };

  const handleViewingDayToggle = (day: string) => {
    setViewingForm(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day],
    }));
    if (viewingErrors.availableDays) setViewingErrors(p => ({ ...p, availableDays: '' }));
  };

  const handleViewingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!viewingForm.name.trim()) newErrors.name = t('form.required');
    if (!viewingForm.email.trim()) newErrors.email = t('form.required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(viewingForm.email)) newErrors.email = t('form.invalidEmail');
    if (!viewingForm.phone.trim()) newErrors.phone = t('form.required');
    if (viewingForm.availableDays.length === 0) newErrors.availableDays = language === 'nl' ? 'Selecteer minimaal 1 dag' : 'Select at least 1 day';
    if (!viewingForm.timeSlot) newErrors.timeSlot = t('form.required');
    if (!viewingForm.grossMonthlyIncome) newErrors.grossMonthlyIncome = t('form.required');
    setViewingErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    toast({ title: t('form.success'), description: t('form.successMessage') });
    setViewingForm({
      name: '', email: '', phone: '',
      availableDays: [], timeSlot: '',
      rentalStartDate: '', rentalPeriod: '',
      grossMonthlyIncome: '', partnerGrossMonthlyIncome: '',
    });
    setViewingErrors({});
  };

  const quickSpecs = [
    { icon: PawPrint, label: language === 'nl' ? 'Huisdieren' : 'Pets', value: listing.petsAllowed },
    { icon: GraduationCap, label: language === 'nl' ? 'Studenten' : 'Students', value: listing.studentsAllowed },
    { icon: Users, label: language === 'nl' ? 'Delen' : 'Sharing', value: listing.homeSharingAllowed },
    { icon: Car, label: listing.parkingType ? ({
      permit: language === 'nl' ? 'Parkeervergunning' : 'Parking permit',
      garage: language === 'nl' ? 'Parkeergarage' : 'Parking garage',
      private: language === 'nl' ? 'Privé terrein' : 'Private parking',
      paid: language === 'nl' ? 'Betaald parkeren' : 'Paid parking',
      public: language === 'nl' ? 'Openbaar parkeren' : 'Public parking',
      enclosed: language === 'nl' ? 'Afgesloten terrein' : 'Enclosed lot',
      bicycle: language === 'nl' ? 'Fietsenstalling' : 'Bicycle storage',
    }[listing.parkingType] || (language === 'nl' ? 'Parkeren' : 'Parking')) : (language === 'nl' ? 'Parkeren' : 'Parking'), value: listing.parking },
    { icon: Trees, label: language === 'nl' ? 'Buiten' : 'Outdoor', value: listing.outdoorSpace },
  ].filter(spec => spec.value);

  const breadcrumbItems = [
    { name: language === 'nl' ? 'Home' : 'Home', url: 'https://vhpn.nl/' },
    { name: language === 'nl' ? 'Huurwoningen' : 'Rentals', url: 'https://vhpn.nl/listings' },
    { name: displayTitle, url: `https://vhpn.nl/listings/${listing.id}` },
  ];

  const seoTitle = language === 'nl' 
    ? `${displayTitle} | ${formatPrice(listing.priceMonthly)}/maand | VHPN`
    : `${displayTitle} | ${formatPrice(listing.priceMonthly)}/month | VHPN`;
  
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
            <Link to="/listings" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              {t('detail.backToListings')}
            </Link>
          </div>

          {/* Image Slider */}
          <div className="container mx-auto px-6 mb-10">
            <div className="relative">
              <ImageSlider images={listing.images} title={displayTitle} aspectRatio="wide" className="rounded-sm overflow-hidden" />
              {listing.videoTourUrl && (
                <a href={listing.videoTourUrl} target="_blank" rel="noopener noreferrer"
                  className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full font-body text-sm text-foreground hover:bg-background transition-colors">
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
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
                    {displayTitle}
                  </h1>

                  <div className="flex items-center gap-1.5 text-muted-foreground mb-6">
                    <MapPin className="h-4 w-4" />
                    <span className="font-body text-base">{listing.neighborhood}, {listing.city}</span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="font-display text-4xl font-medium text-foreground">{formatPrice(listing.priceMonthly)}</span>
                    <span className="font-body text-base text-muted-foreground">{t('listings.perMonth')}</span>
                  </div>

                  <KeyFactsBlock listing={listing} />
                </motion.div>

                {/* Availability */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center gap-3 p-4 bg-secondary rounded-sm">
                  <Calendar className="h-5 w-5 text-accent" />
                  <p className="font-body text-sm text-foreground">{getAvailabilityText()}</p>
                </motion.div>

                {/* Quick Specs Chips */}
                {quickSpecs.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
                    className="flex flex-wrap gap-2">
                    {quickSpecs.map((spec) => (
                      <span key={spec.label} className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 text-foreground rounded-full text-xs font-body">
                        <spec.icon className="h-3.5 w-3.5" />
                        {spec.label}
                      </span>
                    ))}
                  </motion.div>
                )}

                {/* Description */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
                  <h2 className="font-display text-2xl font-light text-foreground mb-4">{t('detail.description')}</h2>
                  <p className="font-body text-base text-muted-foreground leading-relaxed whitespace-pre-line">{listing.descriptionLong}</p>
                </motion.div>

                {/* Amenities */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <h2 className="font-display text-2xl font-light text-foreground mb-4">{t('detail.features')}</h2>
                  <div className="flex flex-wrap gap-2">
                    {listing.amenities.map((amenity) => (
                      <AmenityChip key={amenity} amenity={amenity} />
                    ))}
                  </div>
                </motion.div>

                {/* Map */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
                  <h2 className="font-display text-2xl font-light text-foreground mb-2">{t('detail.location')}</h2>
                  {listing.addressDisclosure === 'approx' && (
                    <p className="font-body text-xs text-muted-foreground mb-4">{t('detail.approximateLocation')}</p>
                  )}
                  <MapPlaceholder
                    city={listing.city}
                    neighborhood={listing.neighborhood}
                    latitude={listing.latitude}
                    longitude={listing.longitude}
                    addressDisclosure={listing.addressDisclosure}
                  />
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-card border border-border rounded-sm p-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="interest" className="text-xs">{t('form.expressInterest')}</TabsTrigger>
                        <TabsTrigger value="viewing" className="text-xs">{t('form.requestViewing')}</TabsTrigger>
                      </TabsList>

                      <TabsContent value="interest">
                        <form onSubmit={handleInterestSubmit} className="space-y-4">
                          <Input placeholder={t('form.name')} value={interestForm.name}
                            onChange={(e) => setInterestForm({ ...interestForm, name: e.target.value })} required className="rounded-sm" />
                          <Input type="email" placeholder={t('form.email')} value={interestForm.email}
                            onChange={(e) => setInterestForm({ ...interestForm, email: e.target.value })} required className="rounded-sm" />
                          <Input placeholder={t('form.phone')} value={interestForm.phone}
                            onChange={(e) => setInterestForm({ ...interestForm, phone: e.target.value })} className="rounded-sm" />
                          <Textarea placeholder={t('form.message')} value={interestForm.message}
                            onChange={(e) => setInterestForm({ ...interestForm, message: e.target.value })} rows={3} className="rounded-sm resize-none" />
                          <Button type="submit" className="w-full rounded-full">{t('form.submit')}</Button>
                          <p className="font-body text-xs text-muted-foreground text-center">
                            {t('form.privacy')} <a href="/privacy" className="underline">{t('form.privacyPolicy')}</a>
                          </p>
                        </form>
                      </TabsContent>

                      <TabsContent value="viewing">
                        <form onSubmit={handleViewingSubmit} className="space-y-3">
                          <div className="space-y-1">
                            <Input placeholder={t('form.name')} value={viewingForm.name}
                              onChange={(e) => { setViewingForm({ ...viewingForm, name: e.target.value }); if (viewingErrors.name) setViewingErrors(p => ({ ...p, name: '' })); }}
                              className="rounded-sm" />
                            {viewingErrors.name && <p className="font-body text-xs text-destructive">{viewingErrors.name}</p>}
                          </div>
                          <div className="space-y-1">
                            <Input type="email" placeholder={t('form.email')} value={viewingForm.email}
                              onChange={(e) => { setViewingForm({ ...viewingForm, email: e.target.value }); if (viewingErrors.email) setViewingErrors(p => ({ ...p, email: '' })); }}
                              className="rounded-sm" />
                            {viewingErrors.email && <p className="font-body text-xs text-destructive">{viewingErrors.email}</p>}
                          </div>
                          <div className="space-y-1">
                            <Input placeholder={t('form.phone')} value={viewingForm.phone}
                              onChange={(e) => { setViewingForm({ ...viewingForm, phone: e.target.value }); if (viewingErrors.phone) setViewingErrors(p => ({ ...p, phone: '' })); }}
                              className="rounded-sm" />
                            {viewingErrors.phone && <p className="font-body text-xs text-destructive">{viewingErrors.phone}</p>}
                          </div>

                          {/* Available days */}
                          <div className="space-y-1.5 pt-2 border-t border-border">
                            <p className="font-body text-xs text-muted-foreground pt-1">
                              {language === 'nl' ? 'Beschikbare dagen *' : 'Available days *'}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {DAYS.map(day => (
                                <label key={day.value} className="flex items-center gap-1 cursor-pointer">
                                  <Checkbox checked={viewingForm.availableDays.includes(day.value)} onCheckedChange={() => handleViewingDayToggle(day.value)} />
                                  <span className="font-body text-xs text-foreground">{language === 'nl' ? day.nl : day.en}</span>
                                </label>
                              ))}
                            </div>
                            {viewingErrors.availableDays && <p className="font-body text-xs text-destructive">{viewingErrors.availableDays}</p>}
                          </div>

                          {/* Time slot */}
                          <div className="space-y-1">
                            <Select value={viewingForm.timeSlot} onValueChange={(v) => { setViewingForm({ ...viewingForm, timeSlot: v }); if (viewingErrors.timeSlot) setViewingErrors(p => ({ ...p, timeSlot: '' })); }}>
                              <SelectTrigger className="h-9 font-body text-xs border-border bg-background rounded-sm">
                                <SelectValue placeholder={language === 'nl' ? 'Dagdeel *' : 'Time of day *'} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="morning">{language === 'nl' ? "'s Morgens" : 'Morning'}</SelectItem>
                                <SelectItem value="afternoon">{language === 'nl' ? "'s Middags" : 'Afternoon'}</SelectItem>
                              </SelectContent>
                            </Select>
                            {viewingErrors.timeSlot && <p className="font-body text-xs text-destructive">{viewingErrors.timeSlot}</p>}
                            <p className="font-body text-[10px] text-muted-foreground">
                              {language === 'nl' ? 'De makelaar probeert je voorkeur mee te nemen.' : 'The agent will try to accommodate your preference.'}
                            </p>
                          </div>

                          {/* Rental start + period */}
                          <div className="grid grid-cols-2 gap-2">
                            <Input type="date" value={viewingForm.rentalStartDate}
                              onChange={(e) => setViewingForm({ ...viewingForm, rentalStartDate: e.target.value })}
                              className="h-9 rounded-sm text-xs" title={language === 'nl' ? 'Huuringangsdatum' : 'Start date'} />
                            <Select value={viewingForm.rentalPeriod} onValueChange={(v) => setViewingForm({ ...viewingForm, rentalPeriod: v })}>
                              <SelectTrigger className="h-9 font-body text-xs border-border bg-background rounded-sm">
                                <SelectValue placeholder={language === 'nl' ? 'Periode' : 'Period'} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="6">{t('form.rentalPeriod6')}</SelectItem>
                                <SelectItem value="12">{t('form.rentalPeriod12')}</SelectItem>
                                <SelectItem value="24">{t('form.rentalPeriod24')}</SelectItem>
                                <SelectItem value="indefinite">{t('form.rentalPeriodIndefinite')}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Income */}
                          <div className="space-y-2 pt-2 border-t border-border">
                            <p className="font-body text-xs text-muted-foreground pt-1">
                              {language === 'nl' ? 'Inkomensgegevens' : 'Income details'}
                            </p>
                            <div className="space-y-1">
                              <Input type="number" min="0" placeholder={`${t('form.grossMonthlyIncome')} *`}
                                value={viewingForm.grossMonthlyIncome}
                                onChange={(e) => { setViewingForm({ ...viewingForm, grossMonthlyIncome: e.target.value }); if (viewingErrors.grossMonthlyIncome) setViewingErrors(p => ({ ...p, grossMonthlyIncome: '' })); }}
                                className="rounded-sm" />
                              {viewingErrors.grossMonthlyIncome && <p className="font-body text-xs text-destructive">{viewingErrors.grossMonthlyIncome}</p>}
                            </div>
                            <Input type="number" min="0" placeholder={t('form.partnerGrossMonthlyIncome')}
                              value={viewingForm.partnerGrossMonthlyIncome}
                              onChange={(e) => setViewingForm({ ...viewingForm, partnerGrossMonthlyIncome: e.target.value })}
                              className="rounded-sm" />
                          </div>

                          <Button type="submit" className="w-full rounded-full">{t('form.requestViewing')}</Button>
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
                    <ListingCard key={relatedListing.id} listing={relatedListing} index={index} />
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
