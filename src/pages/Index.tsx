import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Estate - Find Your Dream Property | Premium Real Estate Listings</title>
        <meta
          name="description"
          content="Discover exceptional properties with Estate. Browse curated listings of premium homes, apartments, and estates in the most desirable locations."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <FeaturedProperties />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
