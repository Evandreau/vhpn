import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Building, CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const Landlords = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [formType, setFormType] = useState<'contact' | 'property'>('contact');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: '',
    propertyType: '', city: '', bedrooms: '', expectedRent: '', availableDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: t('form.success'), description: t('form.successMessage') });
    setFormData({ name: '', email: '', phone: '', message: '', propertyType: '', city: '', bedrooms: '', expectedRent: '', availableDate: '' });
  };

  const benefits = language === 'nl' 
    ? ['Professionele fotografie', 'Breed bereik via alle platforms', 'Zorgvuldige huurderscreening', 'Juridische ondersteuning']
    : ['Professional photography', 'Wide reach across platforms', 'Careful tenant screening', 'Legal support'];

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t('landlords.title')} — Haven</title>
        <meta name="description" content={t('landlords.subtitle')} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-[73px]">
          <section className="py-24 bg-secondary">
            <div className="container mx-auto px-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
                <Building className="h-10 w-10 text-accent mb-6" />
                <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">{t('landlords.title')}</h1>
                <p className="font-body text-lg text-muted-foreground mb-8">{t('landlords.subtitle')}</p>
                <div className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent" />
                      <span className="font-body text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-6 max-w-xl">
              <div className="flex gap-4 mb-8">
                <Button variant={formType === 'contact' ? 'default' : 'outline'} onClick={() => setFormType('contact')} className="flex-1 rounded-full">
                  {t('landlords.contactUs')}
                </Button>
                <Button variant={formType === 'property' ? 'default' : 'outline'} onClick={() => setFormType('property')} className="flex-1 rounded-full">
                  {t('landlords.submitProperty')}
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder={t('form.name')} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="rounded-sm" />
                <Input type="email" placeholder={t('form.email')} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="rounded-sm" />
                <Input placeholder={t('form.phone')} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="rounded-sm" />
                
                {formType === 'property' && (
                  <>
                    <Select value={formData.propertyType} onValueChange={(v) => setFormData({ ...formData, propertyType: v })}>
                      <SelectTrigger className="rounded-sm"><SelectValue placeholder={t('landlords.propertyType')} /></SelectTrigger>
                      <SelectContent className="bg-background">
                        <SelectItem value="apartment">{t('landlords.apartment')}</SelectItem>
                        <SelectItem value="house">{t('landlords.house')}</SelectItem>
                        <SelectItem value="studio">{t('landlords.studio')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder={t('filters.city')} value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="rounded-sm" />
                    <Input placeholder={t('filters.bedrooms')} value={formData.bedrooms} onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })} className="rounded-sm" />
                    <Input placeholder={t('landlords.expectedRent')} value={formData.expectedRent} onChange={(e) => setFormData({ ...formData, expectedRent: e.target.value })} className="rounded-sm" />
                    <Input type="date" value={formData.availableDate} onChange={(e) => setFormData({ ...formData, availableDate: e.target.value })} className="rounded-sm" />
                  </>
                )}
                
                <Textarea placeholder={t('form.message')} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="rounded-sm resize-none" />
                <Button type="submit" className="w-full rounded-full">{t('form.submit')} <ArrowRight className="h-4 w-4 ml-2" /></Button>
                <p className="font-body text-xs text-muted-foreground text-center">{t('form.privacy')} <a href="/privacy" className="underline">{t('form.privacyPolicy')}</a></p>
              </form>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Landlords;
