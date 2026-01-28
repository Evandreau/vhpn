import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [addressOpen, setAddressOpen] = useState(false);

  const footerSections = [
    {
      title: t('footer.properties'),
      links: [
        { label: t('nav.rentals'), href: "/listings" },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { label: t('footer.aboutUs'), href: "/about" },
        { label: t('footer.contact'), href: "/contact" },
        { label: t('footer.landlords'), href: "/landlords" },
      ],
    },
    {
      title: t('footer.support'),
      links: [
        { label: t('footer.helpCenter'), href: "/contact" },
        { label: t('footer.privacyPolicy'), href: "/privacy" },
        { label: t('footer.terms'), href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link 
              to="/" 
              className="font-display text-3xl font-medium text-foreground tracking-tight"
            >
              VHPN
            </Link>
            <p className="mt-4 font-body text-sm text-muted-foreground max-w-sm leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-body text-sm font-medium text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Office Address - Collapsible */}
        <div className="mt-12 pt-8 border-t border-border">
          <Collapsible open={addressOpen} onOpenChange={setAddressOpen}>
            <CollapsibleTrigger className="flex items-center gap-2 font-body text-xs text-muted-foreground hover:text-foreground transition-colors group">
              <span>{t('footer.officeAddress')}</span>
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${addressOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="font-body text-xs text-muted-foreground/80 space-y-2">
                <p className="font-medium text-muted-foreground">{t('footer.correspondenceAddress')}</p>
                <p>Saftlevenstraat 8B</p>
                <p>3015 BM Rotterdam</p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-muted-foreground">
              © {currentYear} VHPN. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
