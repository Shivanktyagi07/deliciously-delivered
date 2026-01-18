import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Star } from "lucide-react";
import heroFood from "@/assets/hero-food.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/30">
      <div className="container mx-auto py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
              Free delivery on your first order
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
              Craving Something <span className="text-gradient">Delicious?</span>
              <br />
              We Deliver Happiness.
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              Discover the best restaurants near you. From local favorites to popular chains, get your food delivered fast and fresh.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">30 min</p>
                  <p className="text-xs text-muted-foreground">Avg. delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rating/10">
                  <Star className="h-5 w-5 text-rating fill-rating" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">4.8 Rating</p>
                  <p className="text-xs text-muted-foreground">10k+ reviews</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl">
                Order Now
                <ArrowRight className="h-5 w-5 ml-1" />
              </Button>
              <Button variant="outline" size="xl">
                View Restaurants
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:h-[500px]">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl">
              <img
                src={heroFood}
                alt="Delicious food being delivered"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-success/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
