import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Users, Home, Shield, Award, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { language, t } = useLanguage();

  const values = language === 'nl' ? [
    {
      icon: Shield,
      title: "Transparantie",
      description: "Wat u ziet, is wat u krijgt. Geen verborgen kosten, geen verrassingen. Elke woning toont het volledige plaatje.",
    },
    {
      icon: Award,
      title: "Kwaliteit",
      description: "Wij geven de voorkeur aan minder woningen dan concessies te doen op kwaliteit. Elke woning voldoet aan onze criteria.",
    },
    {
      icon: Users,
      title: "Service",
      description: "Vragen beantwoord binnen 24 uur. Bezichtigingen op uw gemak. Ondersteuning gedurende uw gehele huurperiode.",
    },
  ] : [
    {
      icon: Shield,
      title: "Transparency",
      description: "What you see is what you get. No hidden fees, no surprises. Every listing shows the full picture.",
    },
    {
      icon: Award,
      title: "Quality",
      description: "We'd rather list fewer properties than compromise on standards. Every home meets our criteria for comfort and style.",
    },
    {
      icon: Users,
      title: "Service",
      description: "Questions answered within 24 hours. Viewings scheduled at your convenience. Support throughout your tenancy.",
    },
  ];

  const serviceAreas = [
    "Rotterdam", "Amsterdam", "Den Haag", "Schiedam", "Vlaardingen"
  ];

  const stats = language === 'nl' ? [
    { value: "500+", label: "Woningen verhuurd" },
    { value: "98%", label: "Tevreden huurders" },
    { value: "24u", label: "Gemiddelde reactietijd" },
    { value: "5", label: "Steden in Nederland" },
  ] : [
    { value: "500+", label: "Properties rented" },
    { value: "98%", label: "Satisfied tenants" },
    { value: "24h", label: "Average response time" },
    { value: "5", label: "Cities in Netherlands" },
  ];

  return (
    <>
      <Helmet>
        <title>{language === 'nl' ? 'Over ons — VHPN' : 'About — VHPN'}</title>
        <meta
          name="description"
          content={language === 'nl' 
            ? 'VHPN selecteert premium huurwoningen door heel Nederland. Ontdek ons verhaal en onze aanpak.'
            : 'VHPN curates premium rentals across the Netherlands. Learn about our mission and approach.'
          }
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-[73px]">
          {/* Hero */}
          <section className="py-24 bg-secondary">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <span className="inline-block font-body text-sm font-medium text-accent mb-4 tracking-wide uppercase">
                  {t('about.story')}
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6 leading-[1.1]">
                  {language === 'nl' ? (
                    <>
                      Snelheid, duidelijkheid
                      <br />
                      <span className="italic">en regie</span>
                    </>
                  ) : (
                    <>
                      Speed, clarity
                      <br />
                      <span className="italic">and control</span>
                    </>
                  )}
                </h1>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  {language === 'nl' 
                    ? 'Ons bureau is actief in de Randstad, voor klanten die snelheid, duidelijkheid en regie verwachten. Met een urban signatuur, uitgesproken waar het mag en luxe waar het telt. Klantgericht, omdat we niet anders kunnen.'
                    : 'Our agency operates in the Randstad, for clients who expect speed, clarity and control. With an urban signature, bold where appropriate and luxurious where it counts. Client-focused, because we know no other way.'
                  }
                </p>
              </motion.div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 border-b border-border">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="font-display text-4xl md:text-5xl font-light text-foreground mb-2">
                      {stat.value}
                    </div>
                    <p className="font-body text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Content Blocks */}
          <section className="py-24">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                {/* Left Column */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="font-display text-2xl font-light text-foreground mb-4">
                      {language === 'nl' ? 'Lokale scherpte' : 'Local expertise'}
                    </h2>
                    <p className="font-body text-base text-muted-foreground leading-relaxed">
                      {language === 'nl' 
                        ? 'We kennen het ritme van de straten, het DNA van de wijken en het prijsniveau van de steden, van Rotterdam en Schiedam tot Den Haag, Amsterdam en alles daartussen. Die lokale scherpte maakt het verschil: betere matches, minder frictie en strakkere afspraken.'
                        : 'We know the rhythm of the streets, the DNA of the neighborhoods and the price levels of the cities, from Rotterdam and Schiedam to The Hague, Amsterdam and everything in between. This local sharpness makes the difference: better matches, less friction and tighter agreements.'
                      }
                    </p>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl font-light text-foreground mb-4">
                      {language === 'nl' ? 'Voor huurders' : 'For tenants'}
                    </h2>
                    <p className="font-body text-base text-muted-foreground leading-relaxed">
                      {language === 'nl' 
                        ? 'Heldere communicatie, realistische verwachtingen, snelle terugkoppeling en begeleiding tot en met sleuteloverdracht. Discreet, professioneel en zonder ruis. Soms vragen we extra voorbereiding en documentatie, juist om snelheid en kwaliteit te garanderen.'
                        : 'Clear communication, realistic expectations, quick feedback and guidance up to and including key handover. Discreet, professional and without noise. Sometimes we ask for extra preparation and documentation, precisely to guarantee speed and quality.'
                      }
                    </p>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl font-light text-foreground mb-4">
                      {language === 'nl' ? 'Voor verhuurders' : 'For landlords'}
                    </h2>
                    <p className="font-body text-base text-muted-foreground leading-relaxed">
                      {language === 'nl' 
                        ? 'Verhuurders ontzorgen we in het gehele verhuurproces. Dat betekent regie, rust en overzicht. We sturen op kwaliteit in selectie, communicatie en oplevering — discreet waar het moet en direct waar het kan.'
                        : 'We take care of landlords throughout the entire rental process. That means control, peace of mind and overview. We focus on quality in selection, communication and delivery — discreet where needed and direct where possible.'
                      }
                    </p>
                  </div>
                </motion.div>

                {/* Right Column - Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="aspect-[4/5] rounded-sm overflow-hidden"
                >
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                    alt={language === 'nl' ? 'Modern Nederlands interieur' : 'Modern Dutch interior'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-24 bg-secondary">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="font-display text-3xl md:text-4xl font-light text-foreground">
                  {language === 'nl' ? 'Waar wij in geloven' : 'What we believe'}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-medium text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="py-24">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-4">
                  {t('about.serviceAreas')}
                </h2>
                <p className="font-body text-base text-muted-foreground max-w-xl mx-auto">
                  {language === 'nl' 
                    ? 'Wij zijn actief in de belangrijkste steden van Nederland.'
                    : 'We are active in the major cities of the Netherlands.'
                  }
                </p>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-3">
                {serviceAreas.map((city, index) => (
                  <motion.div
                    key={city}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      to={`/listings?city=${encodeURIComponent(city)}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full font-body text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      {city}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="py-24 bg-secondary">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-4">
                  {language === 'nl' ? 'Ons proces' : 'Our process'}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {(language === 'nl' ? [
                  { step: "01", title: "Selectie", desc: "Wij selecteren alleen woningen die aan onze kwaliteitseisen voldoen." },
                  { step: "02", title: "Verificatie", desc: "Elk pand wordt persoonlijk geïnspecteerd en gefotografeerd." },
                  { step: "03", title: "Matching", desc: "Wij koppelen u aan woningen die bij uw wensen passen." },
                  { step: "04", title: "Ondersteuning", desc: "Van bezichtiging tot sleuteloverdracht, wij begeleiden u." },
                ] : [
                  { step: "01", title: "Selection", desc: "We only select properties that meet our quality standards." },
                  { step: "02", title: "Verification", desc: "Each property is personally inspected and photographed." },
                  { step: "03", title: "Matching", desc: "We match you with properties that fit your requirements." },
                  { step: "04", title: "Support", desc: "From viewing to key handover, we guide you through." },
                ]).map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="font-display text-4xl font-light text-accent mb-3">
                      {item.step}
                    </div>
                    <h3 className="font-display text-lg font-medium text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-24">
            <div className="container mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-4">
                  {language === 'nl' ? 'Klaar om uw nieuwe thuis te vinden?' : 'Ready to find your next home?'}
                </h2>
                <p className="font-body text-base text-muted-foreground mb-8 max-w-md mx-auto">
                  {language === 'nl' 
                    ? 'Bekijk ons aanbod van huurwoningen door heel Nederland.'
                    : 'Browse our collection of rentals across the Netherlands.'
                  }
                </p>
                <Link
                  to="/listings"
                  className="inline-flex items-center justify-center h-12 px-8 bg-foreground text-background font-body text-sm rounded-full hover:bg-foreground/90 transition-colors"
                >
                  {t('nav.viewRentals')}
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

export default About;