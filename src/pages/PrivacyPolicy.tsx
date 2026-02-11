import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO, { generateBreadcrumbSchema } from "@/components/SEO";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  const content = {
    nl: {
      title: "Privacyverklaring",
      lastUpdated: "Laatst bijgewerkt: januari 2025",
      intro: "VHPN hecht groot belang aan de bescherming van uw persoonsgegevens. Deze privacyverklaring legt uit hoe wij uw gegevens verzamelen, gebruiken en beschermen in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG/GDPR) en de Nederlandse privacywetgeving.",
      sections: [
        { title: "1. Wie zijn wij?", content: "VHPN is een verhuurmakelaar gevestigd in Nederland. Wij bemiddelen bij de verhuur van woningen in Rotterdam, Amsterdam, Den Haag, Schiedam en Vlaardingen. Voor vragen over uw privacy kunt u contact opnemen via info@vhpn.nl." },
        { title: "2. Welke gegevens verzamelen wij?", content: "Wij verzamelen de volgende persoonsgegevens:\n\n• Contactgegevens: naam, e-mailadres, telefoonnummer, adres\n• Identificatiegegevens: kopie ID (bij huurderscreening)\n• Financiële gegevens: inkomensbewijs, werkgeversverklaring (bij huurderscreening)\n• Woningvoorkeuren: gewenste locatie, budget, gewenste ingangsdatum\n• Communicatie: berichten via ons contactformulier" },
        { title: "3. Waarom verzamelen wij deze gegevens?", content: "Wij verwerken uw persoonsgegevens voor:\n\n• Het matchen van huurders aan beschikbare woningen\n• Het uitvoeren van huurdersscreenings\n• Het opstellen en beheren van huurovereenkomsten\n• Communicatie over bezichtigingen en beschikbare woningen\n• Het nakomen van wettelijke verplichtingen" },
        { title: "4. Rechtsgrond voor verwerking", content: "Wij verwerken uw gegevens op basis van:\n\n• Uw toestemming (artikel 6 lid 1 sub a AVG)\n• Uitvoering van een overeenkomst (artikel 6 lid 1 sub b AVG)\n• Wettelijke verplichting (artikel 6 lid 1 sub c AVG)\n• Gerechtvaardigd belang (artikel 6 lid 1 sub f AVG)" },
        { title: "5. Bewaartermijn", content: "Wij bewaren uw gegevens niet langer dan noodzakelijk:\n\n• Contactgegevens van potentiële huurders: maximaal 1 jaar na laatste contact\n• Huurdersdossiers: gedurende de huurovereenkomst plus 7 jaar (wettelijke verplichting)\n• Sollicitatiegegevens die niet tot een huurovereenkomst leiden: 4 weken na afwijzing" },
        { title: "6. Uw rechten", content: "Onder de AVG heeft u de volgende rechten:\n\n• Recht op inzage in uw persoonsgegevens\n• Recht op rectificatie van onjuiste gegevens\n• Recht op verwijdering ('recht om vergeten te worden')\n• Recht op beperking van de verwerking\n• Recht op dataportabiliteit\n• Recht om bezwaar te maken tegen verwerking\n• Recht om toestemming in te trekken\n\nU kunt uw rechten uitoefenen door contact op te nemen via info@vhpn.nl." },
        { title: "7. Beveiliging", content: "Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen verlies, ongeautoriseerde toegang, publicatie en onrechtmatige verwerking. Onze website maakt gebruik van SSL-versleuteling." },
        { title: "8. Delen met derden", content: "Wij delen uw gegevens alleen met:\n\n• Verhuurders (alleen relevante informatie voor de huurdersscreening)\n• IT-dienstverleners voor het beheren van onze systemen\n• Overheidsinstanties indien wettelijk verplicht\n\nWij verkopen uw gegevens nooit aan derden." },
        { title: "9. Cookies", content: "Onze website maakt gebruik van functionele cookies voor het goed functioneren van de website en om uw taalvoorkeuren te onthouden. Wij gebruiken geen tracking cookies voor marketingdoeleinden zonder uw uitdrukkelijke toestemming." },
        { title: "10. Klachten", content: "Heeft u een klacht over de verwerking van uw persoonsgegevens? Neem dan contact met ons op via info@vhpn.nl. U heeft ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens (www.autoriteitpersoonsgegevens.nl)." }
      ]
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: January 2025",
      intro: "VHPN attaches great importance to the protection of your personal data. This privacy policy explains how we collect, use and protect your data in accordance with the General Data Protection Regulation (GDPR) and Dutch privacy legislation.",
      sections: [
        { title: "1. Who are we?", content: "VHPN is a rental agency based in the Netherlands. We mediate in the rental of properties in Rotterdam, Amsterdam, The Hague, Schiedam and Vlaardingen. For questions about your privacy, you can contact us at info@vhpn.nl." },
        { title: "2. What data do we collect?", content: "We collect the following personal data:\n\n• Contact details: name, email address, telephone number, address\n• Identification data: copy of ID (during tenant screening)\n• Financial data: proof of income, employer's statement (during tenant screening)\n• Housing preferences: desired location, budget, desired start date\n• Communication: messages via our contact form" },
        { title: "3. Why do we collect this data?", content: "We process your personal data for:\n\n• Matching tenants to available properties\n• Conducting tenant screenings\n• Drawing up and managing rental agreements\n• Communication about viewings and available properties\n• Complying with legal obligations" },
        { title: "4. Legal basis for processing", content: "We process your data based on:\n\n• Your consent (Article 6(1)(a) GDPR)\n• Performance of a contract (Article 6(1)(b) GDPR)\n• Legal obligation (Article 6(1)(c) GDPR)\n• Legitimate interest (Article 6(1)(f) GDPR)" },
        { title: "5. Retention period", content: "We do not retain your data longer than necessary:\n\n• Contact details of potential tenants: maximum 1 year after last contact\n• Tenant files: during the rental agreement plus 7 years (legal obligation)\n• Application data that does not lead to a rental agreement: 4 weeks after rejection" },
        { title: "6. Your rights", content: "Under the GDPR you have the following rights:\n\n• Right to access your personal data\n• Right to rectification of incorrect data\n• Right to erasure ('right to be forgotten')\n• Right to restriction of processing\n• Right to data portability\n• Right to object to processing\n• Right to withdraw consent\n\nYou can exercise your rights by contacting us at info@vhpn.nl." },
        { title: "7. Security", content: "We take appropriate technical and organizational measures to protect your personal data against loss, unauthorized access, disclosure and unlawful processing. Our website uses SSL encryption." },
        { title: "8. Sharing with third parties", content: "We only share your data with:\n\n• Landlords (only relevant information for tenant screening)\n• IT service providers for managing our systems\n• Government authorities if legally required\n\nWe never sell your data to third parties." },
        { title: "9. Cookies", content: "Our website uses functional cookies for the proper functioning of the website and to remember your language preferences. We do not use tracking cookies for marketing purposes without your explicit consent." },
        { title: "10. Complaints", content: "Do you have a complaint about the processing of your personal data? Please contact us at info@vhpn.nl. You also have the right to file a complaint with the Dutch Data Protection Authority (www.autoriteitpersoonsgegevens.nl)." }
      ]
    }
  };

  const t = content[language];

  const seoTitle = language === 'nl' ? 'Privacyverklaring — VHPN' : 'Privacy Policy — VHPN';
  const seoDescription = language === 'nl'
    ? 'Lees hoe VHPN uw persoonsgegevens beschermt volgens de AVG. Transparantie over gegevensverzameling, bewaartermijnen en uw rechten.'
    : 'Read how VHPN protects your personal data according to GDPR. Transparency about data collection, retention and your rights.';

  const breadcrumbItems = [
    { name: 'Home', url: 'https://vhpn.nl/' },
    { name: t.title, url: 'https://vhpn.nl/privacy' },
  ];

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url="/privacy" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema(breadcrumbItems))}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-[73px]">
          <section className="py-24 bg-secondary">
            <div className="container mx-auto px-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
                <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">{t.title}</h1>
                <p className="font-body text-sm text-muted-foreground">{t.lastUpdated}</p>
              </motion.div>
            </div>
          </section>
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl">
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-body text-base text-muted-foreground mb-12 leading-relaxed">{t.intro}</motion.p>
                <div className="space-y-10">
                  {t.sections.map((section, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                      <h2 className="font-display text-xl font-medium text-foreground mb-4">{section.title}</h2>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
