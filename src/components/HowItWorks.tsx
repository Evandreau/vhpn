import { motion } from "framer-motion";
import { Search, Calendar, Key } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse",
    description: "Explore our curated selection of furnished rentals across the Netherlands.",
  },
  {
    icon: Calendar,
    title: "Schedule",
    description: "Request a viewing at a time that suits you. We respond within 24 hours.",
  },
  {
    icon: Key,
    title: "Move in",
    description: "Sign your contract and collect your keys. Welcome home.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-body text-sm font-medium text-accent mb-3 tracking-wide uppercase">
            Simple Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-light text-foreground">
            How it works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-background border border-border mb-6">
                <step.icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
              </div>
              <div className="relative mb-4">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-display text-6xl font-light text-foreground/5">
                  {index + 1}
                </span>
                <h3 className="font-display text-xl font-medium text-foreground relative z-10">
                  {step.title}
                </h3>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
