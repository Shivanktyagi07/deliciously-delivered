import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryCards from "@/components/CategoryCards";
import OfferBanners from "@/components/OfferBanners";
import RestaurantCards from "@/components/RestaurantCards";
import Testimonials from "@/components/Testimonials";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import FloatingCart from "@/components/FloatingCart";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoryCards />
        <OfferBanners />
        <RestaurantCards />
        <Testimonials />
        <AppDownload />
      </main>
      <Footer />
      <FloatingCart />
    </div>
  );
};

export default Index;
