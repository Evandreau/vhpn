import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Search, Home, FileCheck, Key, Building, Camera, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { getFeaturedListings } from "@/data/listings";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-property.jpg";

const Index = () => {
  const { t, language } = useLanguage();
  const featuredListings = getFeaturedListings().slice(0, 6);

  const tenantSteps = [
    { icon: Search, title: t('howItWorks.tenant.step1.title'), desc: t('howItWorks.tenant.step1.desc') },
    { icon: Home, title: t('howItWorks.tenant.step2.title'), desc: t('howItWorks.tenant.step2.desc') },
    { icon: FileCheck, title: t('howItWorks.tenant.step3.title'), desc: t('howItWorks.tenant.step3.desc') },
    { icon: Key, title: t('howItWorks.tenant.step4.title'), desc: t('howItWorks.tenant.step4.desc') },
  ];

  const landlordSteps = [
    { icon: Building, title: t('howItWorks.landlord.step1.title'), desc: t('howItWorks.landlord.step1.desc') },
    { icon: Camera, title: t('howItWorks.landlord.step2.title'), desc: t('howItWorks.landlord.step2.desc') },
    { icon: Search, title: t('howItWorks.landlord.step3.title'), desc: t('howItWorks.landlord.step3.desc') },
    { icon: Users, title: t('howItWorks.landlord.step4.title'), desc: t('howItWorks.landlord.step4.desc') },
  ];

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{language === 'nl' ? 'Haven — Gemeubileerde Huurwoningen in Nederland' : 'Haven — Furnished Rentals in the Netherlands'}</title>
        <meta name="description" content={t('hero.subtitle')} />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          {/* Hero */}
          <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <img src={heroImage} alt="Luxury furnished apartment" className="w-full h-full object-cover" loading="eager" />
              <div className="absolute inset-0 hero-overlay" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
                className="watermark-text text-[12vw] md:text-[15vw] leading-none tracking-wider text-center select-none" style={{ marginBottom: '-0.1em' }}>
                RENTALS
              </motion.div>
            </div>

            <div className="relative z-10 container mx-auto px-6 pt-24 text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-2xl mx-auto">
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-primary-foreground mb-6 leading-[1.1] tracking-tight">
                  {t('hero.title')}<br /><span className="font-medium italic">{t('hero.titleAccent')}</span>
                </h1>
                <p className="font-body text-base md:text-lg text-primary-foreground/80 mb-10 max-w-md mx-auto font-light leading-relaxed">
                  {t('hero.subtitle')}
                </p>
                <Link to="/listings">
                  <Button size="lg" className="bg-background text-foreground hover:bg-background/90 font-body text-sm px-8 rounded-full h-12">
                    {t('hero.cta')} <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Featured Listings */}
          <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
                <div>
                  <span className="inline-block font-body text-sm font-medium text-accent mb-3 tracking-wide uppercase">
                    {language === 'nl' ? 'Nu beschikbaar' : 'Available Now'}
                  </span>
                  <h2 className="font-display text-3xl md:text-5xl font-light text-foreground">
                    {t('listings.featured')}
                  </h2>
                </div>
                <Link to="/listings" className="mt-6 md:mt-0 inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.viewRentals')} <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {featuredListings.map((listing, index) => (
                  <ListingCard key={listing.id} listing={listing} index={index} />
                ))}
              </div>
            </div>
          </section>

          {/* How it Works */}
          <section className="py-24 bg-secondary">
            <div className="container mx-auto px-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-5xl font-light text-foreground">{t('howItWorks.title')}</h2>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <h3 className="font-display text-xl text-foreground mb-8">{t('howItWorks.forTenants')}</h3>
                  <div className="space-y-6">
                    {tenantSteps.map((step, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                        className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                          <step.icon className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-body font-medium text-foreground mb-1">{step.title}</h4>
                          <p className="font-body text-sm text-muted-foreground">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-8">{t('howItWorks.forLandlords')}</h3>
                  <div className="space-y-6">
                    {landlordSteps.map((step, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                        className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                          <step.icon className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-body font-medium text-foreground mb-1">{step.title}</h4>
                          <p className="font-body text-sm text-muted-foreground">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust */}
          <section className="py-24 bg-background">
            <div className="container mx-auto px-6 text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <CheckCircle className="h-12 w-12 text-accent mx-auto mb-6" />
                <h2 className="font-display text-2xl md:text-3xl font-light text-foreground mb-3">{t('trust.verifiedListings')}</h2>
                <p className="font-body text-muted-foreground max-w-md mx-auto mb-8">{t('trust.verifiedDesc')}</p>
                <Link to="/listings">
                  <Button className="rounded-full">{t('hero.cta')} <ArrowRight className="h-4 w-4 ml-2" /></Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
