import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Terms = () => {
  const { language } = useLanguage();

  const content = {
    nl: {
      title: "Algemene Voorwaarden",
      lastUpdated: "Laatst bijgewerkt: januari 2025",
      intro: "Deze algemene voorwaarden zijn van toepassing op alle diensten van Haven, verhuurmakelaar gevestigd te Nederland. Door gebruik te maken van onze diensten gaat u akkoord met deze voorwaarden.",
      sections: [
        {
          title: "1. Definities",
          content: "• Haven: de verhuurmakelaar die bemiddelt bij de verhuur van woningen\n• Opdrachtgever: de verhuurder die Haven opdracht geeft tot bemiddeling\n• Kandidaat-huurder: de partij die via Haven een woning zoekt\n• Woning: het gehuurde object\n• Bemiddelingsovereenkomst: de overeenkomst tussen Haven en de opdrachtgever"
        },
        {
          title: "2. Dienstverlening",
          content: "Haven biedt de volgende diensten aan:\n\n• Bemiddeling bij verhuur van woningen\n• Huurderscreening en selectie\n• Professionele vastgoedfotografie\n• Marketing en promotie van huurwoningen\n• Opstellen van huurovereenkomsten\n• Begeleiding bij oplevering\n\nOnze diensten zijn gericht op de regio's Rotterdam, Amsterdam, Den Haag, Schiedam en Vlaardingen."
        },
        {
          title: "3. Bemiddelingskosten",
          content: "Haven brengt bemiddelingskosten uitsluitend in rekening bij de verhuurder, conform de Wet doorberekening huurdersbemiddelingskosten. Aan kandidaat-huurders worden geen bemiddelingskosten in rekening gebracht.\n\nDe exacte tarieven worden vooraf in de bemiddelingsovereenkomst vastgelegd."
        },
        {
          title: "4. Huurderscreening",
          content: "Haven voert een zorgvuldige screening uit van kandidaat-huurders. Deze screening kan omvatten:\n\n• Verificatie van identiteit\n• Controle van inkomen en arbeidsverhouding\n• Referenties van vorige verhuurders\n• Controle bij het Bureau Krediet Registratie (BKR)\n\nKandidaat-huurders stemmen in met deze screening door het indienen van hun gegevens."
        },
        {
          title: "5. Geen garantie",
          content: "Haven spant zich in om geschikte huurders te vinden, maar garandeert niet:\n\n• Dat een woning binnen een bepaalde termijn wordt verhuurd\n• Dat een huurder gedurende de gehele huurperiode aan alle verplichtingen voldoet\n• De juistheid van door kandidaat-huurders verstrekte informatie\n\nHaven is niet aansprakelijk voor schade door wanbetaling of wangedrag van huurders."
        },
        {
          title: "6. Aansprakelijkheid",
          content: "Haven is slechts aansprakelijk voor directe schade die het gevolg is van opzet of grove nalatigheid. De aansprakelijkheid is beperkt tot het bedrag van de bemiddelingsvergoeding.\n\nHaven is niet aansprakelijk voor:\n• Indirecte schade, gevolgschade of gederfde winst\n• Schade door handelen of nalaten van derden\n• Schade door onjuiste of onvolledige informatieverstrekking door partijen"
        },
        {
          title: "7. Verplichtingen verhuurder",
          content: "De verhuurder verplicht zich om:\n\n• Correcte en volledige informatie over de woning te verstrekken\n• De woning in goede staat op te leveren\n• Haven direct te informeren over wijzigingen in beschikbaarheid\n• Zich te houden aan geldende wet- en regelgeving (waaronder het Besluit Huurprijzen Woonruimte indien van toepassing)"
        },
        {
          title: "8. Verplichtingen kandidaat-huurder",
          content: "De kandidaat-huurder verplicht zich om:\n\n• Correcte en volledige informatie te verstrekken\n• Tijdig de gevraagde documenten aan te leveren\n• Bezichtigingsafspraken na te komen of tijdig af te zeggen"
        },
        {
          title: "9. Intellectueel eigendom",
          content: "Alle door Haven gemaakte foto's, teksten en overige content blijven eigendom van Haven. Gebruik is slechts toegestaan met uitdrukkelijke schriftelijke toestemming."
        },
        {
          title: "10. Klachten",
          content: "Klachten over onze dienstverlening kunt u indienen via info@haven.nl. Wij behandelen uw klacht binnen 14 werkdagen. Indien u niet tevreden bent met de afhandeling, kunt u zich wenden tot de Huurcommissie of de bevoegde rechtbank."
        },
        {
          title: "11. Toepasselijk recht",
          content: "Op deze algemene voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechtbank te Rotterdam."
        },
        {
          title: "12. Wijzigingen",
          content: "Haven behoudt zich het recht voor deze algemene voorwaarden te wijzigen. Wijzigingen treden in werking 30 dagen na publicatie op de website."
        }
      ]
    },
    en: {
      title: "Terms of Service",
      lastUpdated: "Last updated: January 2025",
      intro: "These general terms and conditions apply to all services of Haven, a rental agency based in the Netherlands. By using our services, you agree to these terms.",
      sections: [
        {
          title: "1. Definitions",
          content: "• Haven: the rental agency that mediates in the rental of properties\n• Client: the landlord who commissions Haven to mediate\n• Prospective tenant: the party looking for a property through Haven\n• Property: the rented object\n• Mediation agreement: the agreement between Haven and the client"
        },
        {
          title: "2. Services",
          content: "Haven offers the following services:\n\n• Mediation in property rentals\n• Tenant screening and selection\n• Professional real estate photography\n• Marketing and promotion of rental properties\n• Drafting of rental agreements\n• Assistance with handover\n\nOur services are focused on the regions of Rotterdam, Amsterdam, The Hague, Schiedam and Vlaardingen."
        },
        {
          title: "3. Mediation fees",
          content: "Haven charges mediation fees exclusively to the landlord, in accordance with Dutch law on tenant mediation fees. No mediation fees are charged to prospective tenants.\n\nThe exact rates are agreed upon in advance in the mediation agreement."
        },
        {
          title: "4. Tenant screening",
          content: "Haven conducts careful screening of prospective tenants. This screening may include:\n\n• Identity verification\n• Income and employment verification\n• References from previous landlords\n• Credit check\n\nProspective tenants consent to this screening by submitting their data."
        },
        {
          title: "5. No guarantee",
          content: "Haven endeavors to find suitable tenants, but does not guarantee:\n\n• That a property will be rented within a certain period\n• That a tenant will meet all obligations throughout the rental period\n• The accuracy of information provided by prospective tenants\n\nHaven is not liable for damage caused by non-payment or misconduct by tenants."
        },
        {
          title: "6. Liability",
          content: "Haven is only liable for direct damage resulting from intent or gross negligence. Liability is limited to the amount of the mediation fee.\n\nHaven is not liable for:\n• Indirect damage, consequential damage or lost profits\n• Damage caused by acts or omissions of third parties\n• Damage caused by incorrect or incomplete information provided by parties"
        },
        {
          title: "7. Landlord obligations",
          content: "The landlord undertakes to:\n\n• Provide correct and complete information about the property\n• Deliver the property in good condition\n• Inform Haven immediately about changes in availability\n• Comply with applicable laws and regulations"
        },
        {
          title: "8. Prospective tenant obligations",
          content: "The prospective tenant undertakes to:\n\n• Provide correct and complete information\n• Submit requested documents in a timely manner\n• Keep viewing appointments or cancel in a timely manner"
        },
        {
          title: "9. Intellectual property",
          content: "All photos, texts and other content created by Haven remain the property of Haven. Use is only permitted with explicit written permission."
        },
        {
          title: "10. Complaints",
          content: "Complaints about our services can be submitted via info@haven.nl. We will handle your complaint within 14 working days. If you are not satisfied with the handling, you can contact the Rent Tribunal or the competent court."
        },
        {
          title: "11. Applicable law",
          content: "Dutch law applies to these general terms and conditions. Disputes are submitted to the competent court in Rotterdam."
        },
        {
          title: "12. Changes",
          content: "Haven reserves the right to change these general terms and conditions. Changes take effect 30 days after publication on the website."
        }
      ]
    }
  };

  const t = content[language];

  return (
    <>
      <Helmet>
        <title>{t.title} — Haven</title>
        <meta name="description" content={language === 'nl' 
          ? 'Algemene voorwaarden van Haven verhuurmakelaar.' 
          : 'Terms of service of Haven rental agency.'
        } />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-[73px]">
          <section className="py-24 bg-secondary">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
                  {t.title}
                </h1>
                <p className="font-body text-sm text-muted-foreground">
                  {t.lastUpdated}
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-body text-base text-muted-foreground mb-12 leading-relaxed"
                >
                  {t.intro}
                </motion.p>

                <div className="space-y-10">
                  {t.sections.map((section, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <h2 className="font-display text-xl font-medium text-foreground mb-4">
                        {section.title}
                      </h2>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
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

export default Terms;