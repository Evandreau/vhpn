import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface ViewingRequestFormProps {
  listingTitle: string;
}

const ViewingRequestForm = ({ listingTitle }: ViewingRequestFormProps) => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredDate1: "",
    preferredDate2: "",
    preferredDate3: "",
    timeSlot1: "",
    timeSlot2: "",
    timeSlot3: "",
    grossMonthlyIncome: "",
    partnerGrossMonthlyIncome: "",
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

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      preferredDate1: "",
      preferredDate2: "",
      preferredDate3: "",
      timeSlot1: "",
      timeSlot2: "",
      timeSlot3: "",
      grossMonthlyIncome: "",
      partnerGrossMonthlyIncome: "",
    });
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
            placeholder={language === 'nl' ? 'Uw volledige naam' : 'Your full name'}
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
            placeholder="your@email.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="font-body text-sm">
            {t('form.phone')} *
          </Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="h-11 font-body text-sm border-border bg-background rounded-sm"
            placeholder="+31 6 1234 5678"
          />
        </div>

        {/* Viewing dates section */}
        <div className="space-y-3 pt-2 border-t border-border">
          <p className="font-body text-sm text-foreground pt-2">
            {language === 'nl' ? 'Selecteer tot 3 voorkeursdata:' : 'Select up to 3 preferred dates:'}
          </p>
          
          {/* Date 1 */}
          <div className="space-y-2">
            <Label className="font-body text-xs text-muted-foreground">
              {t('form.preferredDate1')} *
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="date"
                  required
                  value={formData.preferredDate1}
                  onChange={(e) => setFormData({ ...formData, preferredDate1: e.target.value })}
                  className="h-11 pl-10 font-body text-sm border-border bg-background rounded-sm"
                />
              </div>
              <select
                value={formData.timeSlot1}
                onChange={(e) => setFormData({ ...formData, timeSlot1: e.target.value })}
                required
                className="h-11 rounded-sm border border-border bg-background px-3 font-body text-sm"
              >
                <option value="">{t('form.timeSlot')}</option>
                <option value="morning">{t('form.morning')}</option>
                <option value="afternoon">{t('form.afternoon')}</option>
                <option value="evening">{t('form.evening')}</option>
              </select>
            </div>
          </div>

          {/* Date 2 */}
          <div className="space-y-2">
            <Label className="font-body text-xs text-muted-foreground">
              {t('form.preferredDate2')}
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="date"
                  value={formData.preferredDate2}
                  onChange={(e) => setFormData({ ...formData, preferredDate2: e.target.value })}
                  className="h-11 pl-10 font-body text-sm border-border bg-background rounded-sm"
                />
              </div>
              <select
                value={formData.timeSlot2}
                onChange={(e) => setFormData({ ...formData, timeSlot2: e.target.value })}
                className="h-11 rounded-sm border border-border bg-background px-3 font-body text-sm"
              >
                <option value="">{t('form.timeSlot')}</option>
                <option value="morning">{t('form.morning')}</option>
                <option value="afternoon">{t('form.afternoon')}</option>
                <option value="evening">{t('form.evening')}</option>
              </select>
            </div>
          </div>

          {/* Date 3 */}
          <div className="space-y-2">
            <Label className="font-body text-xs text-muted-foreground">
              {t('form.preferredDate3')}
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="date"
                  value={formData.preferredDate3}
                  onChange={(e) => setFormData({ ...formData, preferredDate3: e.target.value })}
                  className="h-11 pl-10 font-body text-sm border-border bg-background rounded-sm"
                />
              </div>
              <select
                value={formData.timeSlot3}
                onChange={(e) => setFormData({ ...formData, timeSlot3: e.target.value })}
                className="h-11 rounded-sm border border-border bg-background px-3 font-body text-sm"
              >
                <option value="">{t('form.timeSlot')}</option>
                <option value="morning">{t('form.morning')}</option>
                <option value="afternoon">{t('form.afternoon')}</option>
                <option value="evening">{t('form.evening')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Income section */}
        <div className="space-y-3 pt-2 border-t border-border">
          <p className="font-body text-sm text-foreground pt-2">
            {language === 'nl' ? 'Inkomensgegevens:' : 'Income details:'}
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="grossMonthlyIncome" className="font-body text-sm">
              {t('form.grossMonthlyIncome')} *
            </Label>
            <Input
              id="grossMonthlyIncome"
              type="number"
              required
              value={formData.grossMonthlyIncome}
              onChange={(e) => setFormData({ ...formData, grossMonthlyIncome: e.target.value })}
              className="h-11 font-body text-sm border-border bg-background rounded-sm"
              placeholder="€"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="partnerGrossMonthlyIncome" className="font-body text-sm">
              {t('form.partnerGrossMonthlyIncome')}
            </Label>
            <Input
              id="partnerGrossMonthlyIncome"
              type="number"
              value={formData.partnerGrossMonthlyIncome}
              onChange={(e) => setFormData({ ...formData, partnerGrossMonthlyIncome: e.target.value })}
              className="h-11 font-body text-sm border-border bg-background rounded-sm"
              placeholder="€"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="font-body text-sm">
            {t('form.message')}
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="min-h-[100px] font-body text-sm border-border bg-background rounded-sm resize-none"
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
      </form>
    </motion.div>
  );
};

export default ViewingRequestForm;
