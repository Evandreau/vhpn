import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{language === 'nl' ? 'Pagina niet gevonden — VHPN' : 'Page Not Found — VHPN'}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content={language === 'nl' ? 'Deze pagina bestaat niet. Ga terug naar de homepage.' : 'This page does not exist. Return to the homepage.'} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-[73px]">
          <div className="container mx-auto px-6 py-24 text-center">
            <h1 className="font-display text-7xl font-light text-foreground mb-4">404</h1>
            <p className="font-body text-lg text-muted-foreground mb-2">
              {language === 'nl' ? 'Pagina niet gevonden' : 'Page not found'}
            </p>
            <p className="font-body text-sm text-muted-foreground mb-8 max-w-md mx-auto">
              {language === 'nl'
                ? 'De pagina die u zoekt bestaat niet of is verplaatst.'
                : 'The page you are looking for does not exist or has been moved.'}
            </p>
            <Link to="/">
              <Button variant="outline" className="rounded-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {language === 'nl' ? 'Terug naar home' : 'Back to home'}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
