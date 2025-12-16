import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const footerLinks = {
    rentals: [
      { label: "Apartments", href: "#" },
      { label: "Houses", href: "#" },
      { label: "Studios", href: "#" },
      { label: "Luxury Rentals", href: "#" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Press", href: "#" },
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h3 className="font-display text-2xl md:text-3xl font-light mb-4">
              Stay in the loop
            </h3>
            <p className="font-body text-background/60 mb-6 text-sm">
              Subscribe to get notified about new rental listings in your area.
            </p>
            <div className="flex gap-2 max-w-sm">
              <Input
                type="email"
                placeholder="Your email"
                className="h-11 bg-background/10 border-background/20 text-background placeholder:text-background/40 font-body text-sm rounded-full"
              />
              <Button className="h-11 px-5 bg-accent hover:bg-accent/90 text-accent-foreground font-body font-medium rounded-full">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-medium">
                Haven
              </span>
            </a>
            <p className="font-body text-background/60 text-sm max-w-xs">
              Your trusted partner in finding the perfect rental home.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-body text-sm font-medium mb-4 text-background/80">Rentals</h4>
            <ul className="space-y-2">
              {footerLinks.rentals.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-background/50 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-sm font-medium mb-4 text-background/80">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-background/50 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-sm font-medium mb-4 text-background/80">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-background/50 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 mt-10 border-t border-background/10">
          <p className="font-body text-xs text-background/40">
            © 2024 Haven. All rights reserved.
          </p>
          <div className="flex items-center gap-1 mt-4 md:mt-0">
            <Mail className="h-4 w-4 text-background/40" />
            <span className="font-body text-xs text-background/40">hello@haven.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
