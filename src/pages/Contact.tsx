import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredArea: "",
    budget: "",
    moveInDate: "",
    rentalPeriod: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: t('form.success'),
      description: t('form.successMessage'),
    });

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const cities = [
    "Amsterdam", "Rotterdam", "Den Haag", "Utrecht", "Eindhoven",
    "Groningen", "Tilburg", "Almere", "Breda", "Nijmegen"
  ];

  return (
    <>
      <Helmet>
        <title>{language === 'nl' ? 'Contact — Haven' : 'Contact — Haven'}</title>
        <meta
          name="description"
          content={language === 'nl'
            ? 'Neem contact op met Haven. Vragen over onze huurwoningen? Wij helpen u graag.'
            : 'Get in touch with Haven. Questions about our rentals? We are here to help.'
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
                className="max-w-2xl"
              >
                <span className="inline-block font-body text-sm font-medium text-accent mb-4 tracking-wide uppercase">
                  {t('contact.title')}
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-6">
                  {language === 'nl' ? (
                    <>
                      Wij horen graag
                      <br />
                      <span className="italic">van u</span>
                    </>
                  ) : (
                    <>
                      We'd love to
                      <br />
                      <span className="italic">hear from you</span>
                    </>
                  )}
                </h1>
                <p className="font-body text-base text-muted-foreground">
                  {t('contact.subtitle')}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Contact Content */}
          <section className="py-24">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-10"
                >
                  <div>
                    <h2 className="font-display text-2xl font-light text-foreground mb-6">
                      {language === 'nl' ? 'Contactgegevens' : 'Contact details'}
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          <Mail className="h-4 w-4 text-foreground" />
                        </div>
                        <div>
                          <p className="font-body text-sm text-muted-foreground mb-1">
                            {t('form.email')}
                          </p>
                          <a
                            href="mailto:info@haven.nl"
                            className="font-body text-base text-foreground hover:text-accent transition-colors"
                          >
                            info@haven.nl
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          <Phone className="h-4 w-4 text-foreground" />
                        </div>
                        <div>
                          <p className="font-body text-sm text-muted-foreground mb-1">
                            {t('form.phone')}
                          </p>
                          <a
                            href="tel:+31201234567"
                            className="font-body text-base text-foreground hover:text-accent transition-colors"
                          >
                            +31 20 123 4567
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-4 w-4 text-foreground" />
                        </div>
                        <div>
                          <p className="font-body text-sm text-muted-foreground mb-1">
                            {language === 'nl' ? 'Kantoor' : 'Office'}
                          </p>
                          <p className="font-body text-base text-foreground">
                            Herengracht 182<br />
                            1016 BR Amsterdam<br />
                            {language === 'nl' ? 'Nederland' : 'Netherlands'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl font-light text-foreground mb-4">
                      {t('contact.officeHours')}
                    </h2>
                    <div className="space-y-2">
                      <div className="flex justify-between font-body text-sm">
                        <span className="text-muted-foreground">{t('contact.mondayFriday')}</span>
                        <span className="text-foreground">9:00 – 18:00</span>
                      </div>
                      <div className="flex justify-between font-body text-sm">
                        <span className="text-muted-foreground">{t('contact.saturday')}</span>
                        <span className="text-foreground">10:00 – 15:00</span>
                      </div>
                      <div className="flex justify-between font-body text-sm">
                        <span className="text-muted-foreground">{t('contact.sunday')}</span>
                        <span className="text-foreground">{t('contact.closed')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Response time */}
                  <div className="flex items-start gap-4 p-4 bg-secondary rounded-lg">
                    <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-body text-sm font-medium text-foreground mb-1">
                        {language === 'nl' ? 'Snelle reactie' : 'Quick response'}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        {language === 'nl' 
                          ? 'Wij reageren binnen 24 uur op werkdagen.'
                          : 'We respond within 24 hours on business days.'
                        }
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-secondary rounded-lg p-8"
                >
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="font-display text-2xl font-light text-foreground mb-3">
                        {t('form.success')}
                      </h3>
                      <p className="font-body text-base text-muted-foreground mb-6">
                        {t('form.successMessage')}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        {language === 'nl' 
                          ? 'In de tussentijd kunt u ons aanbod bekijken.'
                          : 'In the meantime, feel free to browse our listings.'
                        }
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-display text-2xl font-light text-foreground mb-6">
                        {language === 'nl' ? 'Stuur een bericht' : 'Send a message'}
                      </h2>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="font-body text-sm">
                              {t('form.name')} *
                            </Label>
                            <Input
                              id="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="h-11 font-body text-sm border-border bg-background rounded-sm"
                              placeholder={language === 'nl' ? 'Uw naam' : 'Your name'}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="font-body text-sm">
                              {t('form.email')} *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="h-11 font-body text-sm border-border bg-background rounded-sm"
                              placeholder="email@example.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="font-body text-sm">
                              {t('form.phone')}
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="h-11 font-body text-sm border-border bg-background rounded-sm"
                              placeholder="+31 6 12345678"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="preferredArea" className="font-body text-sm">
                              {t('form.preferredArea')}
                            </Label>
                            <Select
                              value={formData.preferredArea}
                              onValueChange={(value) => setFormData({ ...formData, preferredArea: value })}
                            >
                              <SelectTrigger className="h-11 font-body text-sm border-border bg-background rounded-sm">
                                <SelectValue placeholder={t('filters.allCities')} />
                              </SelectTrigger>
                              <SelectContent>
                                {cities.map((city) => (
                                  <SelectItem key={city} value={city}>
                                    {city}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="budget" className="font-body text-sm">
                              {t('form.budget')}
                            </Label>
                            <Select
                              value={formData.budget}
                              onValueChange={(value) => setFormData({ ...formData, budget: value })}
                            >
                              <SelectTrigger className="h-11 font-body text-sm border-border bg-background rounded-sm">
                                <SelectValue placeholder={language === 'nl' ? 'Selecteer budget' : 'Select budget'} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0-1500">€0 - €1.500</SelectItem>
                                <SelectItem value="1500-2000">€1.500 - €2.000</SelectItem>
                                <SelectItem value="2000-2500">€2.000 - €2.500</SelectItem>
                                <SelectItem value="2500-3000">€2.500 - €3.000</SelectItem>
                                <SelectItem value="3000+">€3.000+</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="moveInDate" className="font-body text-sm">
                              {t('form.moveInDate')}
                            </Label>
                            <Input
                              id="moveInDate"
                              type="date"
                              value={formData.moveInDate}
                              onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                              className="h-11 font-body text-sm border-border bg-background rounded-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="rentalPeriod" className="font-body text-sm">
                            {t('form.rentalPeriod')}
                          </Label>
                          <Select
                            value={formData.rentalPeriod}
                            onValueChange={(value) => setFormData({ ...formData, rentalPeriod: value })}
                          >
                            <SelectTrigger className="h-11 font-body text-sm border-border bg-background rounded-sm">
                              <SelectValue placeholder={language === 'nl' ? 'Selecteer periode' : 'Select period'} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3-6">{language === 'nl' ? '3-6 maanden' : '3-6 months'}</SelectItem>
                              <SelectItem value="6-12">{language === 'nl' ? '6-12 maanden' : '6-12 months'}</SelectItem>
                              <SelectItem value="12+">{language === 'nl' ? '12+ maanden' : '12+ months'}</SelectItem>
                              <SelectItem value="indefinite">{language === 'nl' ? 'Onbepaalde tijd' : 'Indefinite'}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message" className="font-body text-sm">
                            {t('form.message')} *
                          </Label>
                          <Textarea
                            id="message"
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="min-h-[120px] font-body text-sm border-border bg-background rounded-sm resize-none"
                            placeholder={language === 'nl' ? 'Vertel ons over uw wensen...' : 'Tell us about your requirements...'}
                          />
                        </div>

                        {/* Privacy note */}
                        <p className="font-body text-xs text-muted-foreground">
                          {t('form.privacy')}{' '}
                          <a href="/privacy" className="underline hover:text-foreground transition-colors">
                            {t('form.privacyPolicy')}
                          </a>.
                        </p>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-11 bg-foreground hover:bg-foreground/90 text-background font-body text-sm rounded-sm"
                        >
                          {isSubmitting ? (
                            t('form.sending')
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              {t('form.submit')}
                            </>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;