import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const offers = [
  {
    id: 1,
    title: "Flat 50% OFF",
    subtitle: "On orders above ₹199",
    code: "WELCOME50",
    bgColor: "from-primary to-primary-glow",
  },
  {
    id: 2,
    title: "Free Delivery",
    subtitle: "On your first 3 orders",
    code: "FREEDEL",
    bgColor: "from-success to-success/80",
  },
  {
    id: 3,
    title: "₹75 OFF",
    subtitle: "On orders above ₹299",
    code: "SAVE75",
    bgColor: "from-primary to-primary-glow",
  },
];

const OfferBanners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto">
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

          {/* Offers */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className={`min-w-full p-8 md:p-12 bg-gradient-to-r ${offer.bgColor} text-primary-foreground`}
                >
                  <div className="max-w-lg">
                    <h3 className="text-3xl md:text-4xl font-extrabold mb-2">
                      {offer.title}
                    </h3>
                    <p className="text-lg opacity-90 mb-4">{offer.subtitle}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/20 rounded-lg backdrop-blur-sm">
                      <span className="text-sm font-medium">Use code:</span>
                      <span className="font-bold">{offer.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {offers.map((_, index) => (
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
      </div>
    </section>
  );
};

export default OfferBanners;
