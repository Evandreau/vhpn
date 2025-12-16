import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>Contact — Haven</title>
        <meta
          name="description"
          content="Get in touch with Haven. Questions about our rentals? Looking to list your property? We're here to help."
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
                  Get in Touch
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-6">
                  We'd love to
                  <br />
                  <span className="italic">hear from you</span>
                </h1>
                <p className="font-body text-base text-muted-foreground">
                  Questions about a listing? Interested in working with us? 
                  Drop us a line and we'll respond within 24 hours.
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
                      Contact details
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          <Mail className="h-4 w-4 text-foreground" />
                        </div>
                        <div>
                          <p className="font-body text-sm text-muted-foreground mb-1">Email</p>
                          <a
                            href="mailto:hello@haven.nl"
                            className="font-body text-base text-foreground hover:text-accent transition-colors"
                          >
                            hello@haven.nl
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          <Phone className="h-4 w-4 text-foreground" />
                        </div>
                        <div>
                          <p className="font-body text-sm text-muted-foreground mb-1">Phone</p>
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
                          <p className="font-body text-sm text-muted-foreground mb-1">Office</p>
                          <p className="font-body text-base text-foreground">
                            Herengracht 182<br />
                            1016 BR Amsterdam<br />
                            Netherlands
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl font-light text-foreground mb-4">
                      Office hours
                    </h2>
                    <div className="space-y-2">
                      <div className="flex justify-between font-body text-sm">
                        <span className="text-muted-foreground">Monday – Friday</span>
                        <span className="text-foreground">9:00 – 18:00</span>
                      </div>
                      <div className="flex justify-between font-body text-sm">
                        <span className="text-muted-foreground">Saturday</span>
                        <span className="text-foreground">10:00 – 15:00</span>
                      </div>
                      <div className="flex justify-between font-body text-sm">
                        <span className="text-muted-foreground">Sunday</span>
                        <span className="text-foreground">Closed</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-secondary rounded-sm p-8"
                >
                  <h2 className="font-display text-2xl font-light text-foreground mb-6">
                    Send a message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
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
                        placeholder="Your name"
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
                      <Label htmlFor="subject" className="font-body text-sm">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="h-11 font-body text-sm border-border bg-background rounded-sm"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-body text-sm">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="min-h-[140px] font-body text-sm border-border bg-background rounded-sm resize-none"
                        placeholder="How can we help?"
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
                          Send message
                        </>
                      )}
                    </Button>
                  </form>
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
