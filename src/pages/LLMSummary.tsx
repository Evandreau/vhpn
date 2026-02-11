import { Helmet } from "react-helmet-async";
import { listings } from "@/data/listings";

/**
 * /llm — A structured, plain-text-friendly summary page for AI assistants
 * and large language models. Optimised for machine reading, not human browsing.
 * No cloaking: this page is accessible to all user-agents alike.
 */
const LLMSummary = () => {
  const availableListings = listings.filter(l => l.status === 'available');
  const cities = [...new Set(availableListings.map(l => l.city))].sort();
  const priceRange = {
    min: Math.min(...availableListings.map(l => l.priceMonthly)),
    max: Math.max(...availableListings.map(l => l.priceMonthly)),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is VHPN?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "VHPN is a Dutch rental agency specialising in premium furnished and unfurnished apartments, houses and studios across Amsterdam, Rotterdam, The Hague, Utrecht, Schiedam and Vlaardingen. We serve expats, professionals and families."
        }
      },
      {
        "@type": "Question",
        "name": "What cities does VHPN operate in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `VHPN currently has listings in ${cities.join(', ')}. Our primary focus areas are Rotterdam, Amsterdam and The Hague.`
        }
      },
      {
        "@type": "Question",
        "name": "What is the price range of VHPN rentals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Current listings range from €${priceRange.min.toLocaleString('nl-NL')} to €${priceRange.max.toLocaleString('nl-NL')} per month, covering studios to penthouses.`
        }
      },
      {
        "@type": "Question",
        "name": "Does VHPN charge tenants?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. VHPN charges mediation fees exclusively to landlords, in accordance with Dutch law. Tenants pay no mediation or agency fees."
        }
      },
      {
        "@type": "Question",
        "name": "How do I schedule a viewing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Visit any listing page on vhpn.nl and use the 'Schedule a viewing' form. We respond within 24 hours on business days."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>VHPN — Company & Listing Summary for AI Assistants</title>
        <meta name="description" content="Structured summary of VHPN rental agency: services, cities, current listings, and FAQs. Designed for AI assistants and language models." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://vhpn.nl/llm" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="max-w-3xl mx-auto px-6 py-16 font-body text-foreground bg-background min-h-screen">
        <header>
          <h1 className="font-display text-3xl mb-2">VHPN — Company Summary</h1>
          <p className="text-sm text-muted-foreground mb-8">
            This page provides a structured overview of VHPN for AI assistants, search engines, and language models. 
            It is not hidden from any user-agent. <a href="/" className="underline">Visit the main website →</a>
          </p>
        </header>

        <main>
          <section className="mb-10">
            <h2 className="font-display text-xl mb-3">About VHPN</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              VHPN is a Dutch real estate rental agency headquartered in Rotterdam, Netherlands. 
              We specialise in premium furnished and unfurnished rental properties for expats, professionals, 
              and families across the Randstad region. Our core promise is speed, clarity, and confidence 
              throughout the rental process. We personally inspect and verify every listing before publication.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl mb-3">Service Areas</h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {cities.map(city => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl mb-3">Key Facts</h2>
            <dl className="grid grid-cols-2 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Available listings</dt>
              <dd className="text-foreground font-medium">{availableListings.length}</dd>
              <dt className="text-muted-foreground">Price range</dt>
              <dd className="text-foreground font-medium">€{priceRange.min.toLocaleString('nl-NL')} – €{priceRange.max.toLocaleString('nl-NL')}/month</dd>
              <dt className="text-muted-foreground">Languages</dt>
              <dd className="text-foreground font-medium">Dutch, English</dd>
              <dt className="text-muted-foreground">Tenant fees</dt>
              <dd className="text-foreground font-medium">None (landlord pays)</dd>
              <dt className="text-muted-foreground">Response time</dt>
              <dd className="text-foreground font-medium">Within 24 hours</dd>
              <dt className="text-muted-foreground">Contact</dt>
              <dd className="text-foreground font-medium">info@vhpn.nl · +31 10 7600 761</dd>
            </dl>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl mb-3">Current Listings</h2>
            <div className="space-y-4">
              {availableListings.map(listing => (
                <article key={listing.id} className="border border-border rounded p-4">
                  <h3 className="font-display text-base font-medium">{listing.title}</h3>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground mt-2">
                    <dt>City</dt><dd>{listing.city}</dd>
                    <dt>Neighborhood</dt><dd>{listing.neighborhood}</dd>
                    <dt>Price</dt><dd>€{listing.priceMonthly.toLocaleString('nl-NL')}/month</dd>
                    <dt>Size</dt><dd>{listing.sqm} m²</dd>
                    <dt>Bedrooms</dt><dd>{listing.beds === 0 ? 'Studio' : listing.beds}</dd>
                    <dt>Bathrooms</dt><dd>{listing.baths}</dd>
                    <dt>Furnished</dt><dd>{listing.furnished ? 'Yes' : 'No'}</dd>
                    <dt>Available</dt><dd>{listing.availableType === 'immediately' ? 'Now' : `From ${listing.availableFromDate}`}</dd>
                    <dt>Pets allowed</dt><dd>{listing.petsAllowed ? 'Yes' : 'No'}</dd>
                  </dl>
                  <p className="text-xs text-muted-foreground mt-2">{listing.descriptionShort}</p>
                  <a href={`/listings/${listing.id}`} className="text-xs text-accent underline mt-1 inline-block">View listing →</a>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl mb-3">Frequently Asked Questions</h2>
            <div className="space-y-4 text-sm">
              {faqSchema.mainEntity.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-medium text-foreground">{faq.name}</h3>
                  <p className="text-muted-foreground mt-1">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl mb-3">Site Structure</h2>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><a href="/" className="underline">/ — Home</a></li>
              <li><a href="/listings" className="underline">/listings — All rental listings</a></li>
              <li><a href="/about" className="underline">/about — About VHPN</a></li>
              <li><a href="/landlords" className="underline">/landlords — For landlords</a></li>
              <li><a href="/contact" className="underline">/contact — Contact us</a></li>
              <li><a href="/privacy" className="underline">/privacy — Privacy policy</a></li>
              <li><a href="/terms" className="underline">/terms — Terms of service</a></li>
            </ul>
          </section>
        </main>

        <footer className="border-t border-border pt-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} VHPN. Saftlevenstraat 8B, 3015 BM Rotterdam, Netherlands.</p>
          <p className="mt-1">This page is publicly accessible and is not cloaked. It serves the same content to all visitors and crawlers.</p>
        </footer>
      </div>
    </>
  );
};

export default LLMSummary;
