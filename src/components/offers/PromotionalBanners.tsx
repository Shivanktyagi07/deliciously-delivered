import { ChevronLeft, ChevronRight, Truck, Percent, Sparkles } from "lucide-react";
import { useState } from "react";

const banners = [
  {
    id: 1,
    title: "Free Delivery Week",
    subtitle: "No delivery charges on all orders above ₹199",
    icon: Truck,
    bgClass: "from-success to-success/80",
  },
  {
    id: 2,
    title: "Festival Special",
    subtitle: "Up to 60% OFF on select restaurants",
    icon: Sparkles,
    bgClass: "from-primary to-primary-glow",
  },
  {
    id: 3,
    title: "Flat 50% OFF",
    subtitle: "On your first order with code FIRST50",
    icon: Percent,
    bgClass: "from-violet-500 to-purple-600",
  },
];

const PromotionalBanners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-secondary transition-colors -translate-x-5"
      >
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-secondary transition-colors translate-x-5"
      >
        <ChevronRight className="h-5 w-5 text-foreground" />
      </button>

      {/* Banners */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner) => {
            const IconComponent = banner.icon;
            return (
              <div
                key={banner.id}
                className={`min-w-full p-8 md:p-10 bg-gradient-to-r ${banner.bgClass} text-white`}
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold mb-1">
                      {banner.title}
                    </h3>
                    <p className="text-base opacity-90">{banner.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-6 bg-primary"
                : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionalBanners;
