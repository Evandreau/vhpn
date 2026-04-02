import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface ViewingRequestFormProps {
  listingTitle: string;
  listingId?: string;
}

const DAYS = [
  { value: 'ma', nl: 'Ma', en: 'Mon' },
  { value: 'di', nl: 'Di', en: 'Tue' },
  { value: 'wo', nl: 'Wo', en: 'Wed' },
  { value: 'do', nl: 'Do', en: 'Thu' },
  { value: 'vr', nl: 'Vr', en: 'Fri' },
];

const ViewingRequestForm = ({ listingTitle, listingId }: ViewingRequestFormProps) => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    availableDays: [] as string[],
    timeSlot: "",
    rentalStartDate: "",
    rentalPeriod: "",
    grossMonthlyIncome: "",
    partnerGrossMonthlyIncome: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('form.required');
    if (!formData.email.trim()) newErrors.email = t('form.required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('form.invalidEmail');
    if (!formData.phone.trim()) newErrors.phone = t('form.required');
    if (formData.availableDays.length === 0) newErrors.availableDays = language === 'nl' ? 'Selecteer minimaal 1 dag' : 'Select at least 1 day';
    if (!formData.timeSlot) newErrors.timeSlot = t('form.required');
    if (!formData.grossMonthlyIncome) newErrors.grossMonthlyIncome = t('form.required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day],
    }));
    if (errors.availableDays) setErrors(prev => ({ ...prev, availableDays: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate form submission (will be replaced with actual email/API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: t('form.success'),
      description: t('form.successMessage'),
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      availableDays: [],
      timeSlot: "",
      rentalStartDate: "",
      rentalPeriod: "",
      grossMonthlyIncome: "",
      partnerGrossMonthlyIncome: "",
      message: "",
    });
    setErrors({});
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-secondary rounded-sm p-6 md:p-8"
    >
      <h3 className="font-display text-xl font-medium text-foreground mb-2">
        {t('form.requestViewing')}
      </h3>
      <p className="font-body text-sm text-muted-foreground mb-6">
        {language === 'nl' 
          ? `Interesse in ${listingTitle}? Vul onderstaand formulier in.`
          : `Interested in ${listingTitle}? Fill out the form below.`
        }
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="vr-name" className="font-body text-sm">{t('form.name')} *</Label>
          <Input
            id="vr-name"
            type="text"
            value={formData.name}
            onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors(p => ({ ...p, name: '' })); }}
            className="h-11 font-body text-sm border-border bg-background rounded-sm"
            placeholder={language === 'nl' ? 'Uw volledige naam' : 'Your full name'}
          />
          {errors.name && <p className="font-body text-xs text-destructive">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="vr-email" className="font-body text-sm">{t('form.email')} *</Label>
          <Input
            id="vr-email"
            type="email"
            value={formData.email}
            onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors(p => ({ ...p, email: '' })); }}
            className="h-11 font-body text-sm border-border bg-background rounded-sm"
            placeholder="your@email.com"
          />
          {errors.email && <p className="font-body text-xs text-destructive">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label htmlFor="vr-phone" className="font-body text-sm">{t('form.phone')} *</Label>
          <Input
            id="vr-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); if (errors.phone) setErrors(p => ({ ...p, phone: '' })); }}
            className="h-11 font-body text-sm border-border bg-background rounded-sm"
            placeholder="+31 6 1234 5678"
          />
          {errors.phone && <p className="font-body text-xs text-destructive">{errors.phone}</p>}
        </div>

        {/* Available days */}
        <div className="space-y-2 pt-2 border-t border-border">
          <Label className="font-body text-sm pt-1 block">
            {language === 'nl' ? 'Welke dagen ben je beschikbaar?' : 'Which days are you available?'} *
          </Label>
          <div className="flex flex-wrap gap-3">
            {DAYS.map(day => (
              <label key={day.value} className="flex items-center gap-1.5 cursor-pointer">
                <Checkbox
                  checked={formData.availableDays.includes(day.value)}
                  onCheckedChange={() => handleDayToggle(day.value)}
                />
                <span className="font-body text-sm text-foreground">{language === 'nl' ? day.nl : day.en}</span>
              </label>
            ))}
          </div>
          {errors.availableDays && <p className="font-body text-xs text-destructive">{errors.availableDays}</p>}
        </div>

        {/* Time slot */}
        <div className="space-y-1.5">
          <Label className="font-body text-sm">
            {language === 'nl' ? 'Welk dagdeel?' : 'What time of day?'} *
          </Label>
          <Select value={formData.timeSlot} onValueChange={(v) => { setFormData({ ...formData, timeSlot: v }); if (errors.timeSlot) setErrors(p => ({ ...p, timeSlot: '' })); }}>
            <SelectTrigger className="h-11 font-body text-sm border-border bg-background rounded-sm">
              <SelectValue placeholder={language === 'nl' ? 'Selecteer dagdeel' : 'Select time'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">{language === 'nl' ? "'s Morgens (9:00-12:00)" : 'Morning (9:00-12:00)'}</SelectItem>
              <SelectItem value="afternoon">{language === 'nl' ? "'s Middags (12:00-17:00)" : 'Afternoon (12:00-17:00)'}</SelectItem>
            </SelectContent>
          </Select>
          {errors.timeSlot && <p className="font-body text-xs text-destructive">{errors.timeSlot}</p>}
          <p className="font-body text-xs text-muted-foreground">
            {language === 'nl' ? 'De makelaar probeert je voorkeur mee te nemen.' : 'The agent will try to accommodate your preference.'}
          </p>
        </div>

        {/* Rental start date */}
        <div className="space-y-1.5">
          <Label htmlFor="vr-start" className="font-body text-sm">
            {language === 'nl' ? 'Huuringangsdatum' : 'Rental start date'}
          </Label>
          <Input
            id="vr-start"
            type="date"
            value={formData.rentalStartDate}
            onChange={(e) => setFormData({ ...formData, rentalStartDate: e.target.value })}
            className="h-11 font-body text-sm border-border bg-background rounded-sm"
          />
        </div>

        {/* Rental period */}
        <div className="space-y-1.5">
          <Label className="font-body text-sm">{t('form.rentalPeriod')}</Label>
          <Select value={formData.rentalPeriod} onValueChange={(v) => setFormData({ ...formData, rentalPeriod: v })}>
            <SelectTrigger className="h-11 font-body text-sm border-border bg-background rounded-sm">
              <SelectValue placeholder={language === 'nl' ? 'Selecteer periode' : 'Select period'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">{t('form.rentalPeriod6')}</SelectItem>
              <SelectItem value="12">{t('form.rentalPeriod12')}</SelectItem>
              <SelectItem value="24">{t('form.rentalPeriod24')}</SelectItem>
              <SelectItem value="indefinite">{t('form.rentalPeriodIndefinite')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Income section */}
        <div className="space-y-3 pt-2 border-t border-border">
          <p className="font-body text-sm text-foreground pt-1">
            {language === 'nl' ? 'Inkomensgegevens' : 'Income details'}
          </p>
          
          <div className="space-y-1.5">
            <Label htmlFor="vr-income" className="font-body text-sm">
              {t('form.grossMonthlyIncome')} *
            </Label>
            <Input
              id="vr-income"
              type="number"
              min="0"
              value={formData.grossMonthlyIncome}
              onChange={(e) => { setFormData({ ...formData, grossMonthlyIncome: e.target.value }); if (errors.grossMonthlyIncome) setErrors(p => ({ ...p, grossMonthlyIncome: '' })); }}
              className="h-11 font-body text-sm border-border bg-background rounded-sm"
              placeholder="€"
            />
            {errors.grossMonthlyIncome && <p className="font-body text-xs text-destructive">{errors.grossMonthlyIncome}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="vr-partner-income" className="font-body text-sm">
              {t('form.partnerGrossMonthlyIncome')}
            </Label>
            <Input
              id="vr-partner-income"
              type="number"
              min="0"
              value={formData.partnerGrossMonthlyIncome}
              onChange={(e) => setFormData({ ...formData, partnerGrossMonthlyIncome: e.target.value })}
              className="h-11 font-body text-sm border-border bg-background rounded-sm"
              placeholder="€"
            />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <Label htmlFor="vr-message" className="font-body text-sm">{t('form.message')}</Label>
          <Textarea
            id="vr-message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="min-h-[80px] font-body text-sm border-border bg-background rounded-sm resize-none"
            placeholder={language === 'nl' 
              ? 'Vertel ons iets over uzelf en uw wensen...'
              : 'Tell us a bit about yourself and your rental needs...'
            }
          />
        </div>

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
              {t('form.requestViewing')}
            </>
          )}
        </Button>

        <p className="font-body text-xs text-muted-foreground text-center">
          {t('form.privacy')} <a href="/privacy" className="underline">{t('form.privacyPolicy')}</a>
        </p>
      </form>
    </motion.div>
  );
};

export default ViewingRequestForm;
