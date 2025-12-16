import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About — Haven</title>
        <meta
          name="description"
          content="Haven curates furnished rentals across the Netherlands. Learn about our mission to make finding your next home simple and enjoyable."
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
                  Our Story
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6 leading-[1.1]">
                  Making home
                  <br />
                  <span className="italic">feel effortless</span>
                </h1>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  Haven was founded with a simple belief: finding a furnished rental 
                  shouldn't feel like a second job.
                </p>
              </motion.div>
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
                      The Challenge
                    </h2>
                    <p className="font-body text-base text-muted-foreground leading-relaxed">
                      The Dutch rental market is notoriously competitive. International 
                      professionals, expats, and students often find themselves navigating 
                      a fragmented landscape of listings, outdated photos, and unresponsive 
                      landlords. We've been there ourselves.
                    </p>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl font-light text-foreground mb-4">
                      Our Approach
                    </h2>
                    <p className="font-body text-base text-muted-foreground leading-relaxed">
                      Every property on Haven is personally vetted. We photograph each 
                      space, meet the landlords, and ensure the listing matches reality. 
                      No bait-and-switch. No outdated information. Just honest, curated 
                      rentals ready for you to call home.
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
                    alt="Modern Dutch interior"
                    className="w-full h-full object-cover"
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
                  What we believe
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    title: "Transparency",
                    description: "What you see is what you get. No hidden fees, no surprise conditions. Every listing shows the full picture.",
                  },
                  {
                    title: "Quality",
                    description: "We'd rather list fewer properties than compromise on standards. Every home meets our criteria for comfort and style.",
                  },
                  {
                    title: "Service",
                    description: "Questions answered within 24 hours. Viewings scheduled at your convenience. Support throughout your tenancy.",
                  },
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
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
                  Ready to find your next home?
                </h2>
                <p className="font-body text-base text-muted-foreground mb-8 max-w-md mx-auto">
                  Browse our collection of furnished rentals across the Netherlands.
                </p>
                <a
                  href="/listings"
                  className="inline-flex items-center justify-center h-12 px-8 bg-foreground text-background font-body text-sm rounded-full hover:bg-foreground/90 transition-colors"
                >
                  View rentals
                </a>
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
