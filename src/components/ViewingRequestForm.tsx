import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ViewingRequestFormProps {
  listingTitle: string;
}

const ViewingRequestForm = ({ listingTitle }: ViewingRequestFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Request sent",
      description: "We'll be in touch within 24 hours to confirm your viewing.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      preferredDate: "",
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
        Request a viewing
      </h3>
      <p className="font-body text-sm text-muted-foreground mb-6">
        Interested in {listingTitle}? Fill out the form below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="font-body text-sm">
            Name *
          </Label>
          <Input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-11 font-body text-sm border-border bg-background rounded-sm"
            placeholder="Your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="font-body text-sm">
            Email *
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
            Phone (optional)
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="h-11 font-body text-sm border-border bg-background rounded-sm"
            placeholder="+31 6 1234 5678"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredDate" className="font-body text-sm">
            Preferred viewing date
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              id="preferredDate"
              type="date"
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              className="h-11 pl-10 font-body text-sm border-border bg-background rounded-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="font-body text-sm">
            Message
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="min-h-[100px] font-body text-sm border-border bg-background rounded-sm resize-none"
            placeholder="Tell us a bit about yourself and your rental needs..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-foreground hover:bg-foreground/90 text-background font-body text-sm rounded-sm"
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send request
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default ViewingRequestForm;
