import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const footerLinks = {
    company: [
      { label: "About Us", href: "#" },
      { label: "Our Team", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
    properties: [
      { label: "Houses for Sale", href: "#" },
      { label: "Apartments for Rent", href: "#" },
      { label: "Luxury Estates", href: "#" },
      { label: "Commercial", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

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
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              Stay Updated with New Listings
            </h3>
            <p className="font-body text-background/70 mb-6">
              Subscribe to our newsletter and never miss a perfect property.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 bg-background/10 border-background/20 text-background placeholder:text-background/50 font-body"
              />
              <Button className="h-12 px-6 bg-accent hover:bg-accent/90 text-accent-foreground font-body font-medium">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-block mb-6">
              <span className="font-display text-3xl font-semibold">
                Estate<span className="text-accent">.</span>
              </span>
            </a>
            <p className="font-body text-background/70 mb-6 max-w-sm">
              Your trusted partner in finding exceptional properties. We connect
              dreams with addresses since 2010.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="font-body text-sm">
                  123 Estate Avenue, New York, NY 10001
                </span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Phone className="h-5 w-5 text-accent" />
                <span className="font-body text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Mail className="h-5 w-5 text-accent" />
                <span className="font-body text-sm">hello@estate.com</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-background/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Properties</h4>
            <ul className="space-y-3">
              {footerLinks.properties.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-background/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-background/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 mt-12 border-t border-background/10">
          <p className="font-body text-sm text-background/60 mb-4 md:mb-0">
            © 2024 Estate. All rights reserved.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
