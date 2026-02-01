import { Star, Clock, MapPin, Heart, Percent, Bike } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RestaurantHeaderProps {
  restaurant: {
    name: string;
    image: string;
    cuisines: string[];
    rating: number;
    reviewCount: number;
    deliveryTime: string;
    location: string;
    offer?: string;
  };
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <section className="relative animate-fade-in">
      {/* Banner Image */}
      <div className="relative h-56 md:h-72 lg:h-80 overflow-hidden rounded-2xl shadow-lg">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/95 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${
              isWishlisted ? "fill-destructive text-destructive scale-110" : "text-muted-foreground"
            }`}
          />
        </Button>

        {/* Offer Badge */}
        {restaurant.offer && (
          <div className="absolute top-4 left-4 animate-slide-up">
            <Badge className="bg-gradient-to-r from-success to-success/80 text-success-foreground px-4 py-2 text-sm font-bold gap-1.5 shadow-lg">
              <Percent className="h-4 w-4" />
              {restaurant.offer}
            </Badge>
          </div>
        )}

        {/* Bottom gradient info preview */}
        <div className="absolute bottom-4 left-4 right-4 md:hidden">
          <h1 className="text-xl font-bold text-white drop-shadow-lg">
            {restaurant.name}
          </h1>
        </div>
      </div>

      {/* Restaurant Info Card */}
      <div className="relative -mt-12 md:-mt-16 mx-2 md:mx-6 lg:mx-8">
        <div className="bg-card rounded-2xl p-5 md:p-6 shadow-xl border border-border/50 backdrop-blur-sm">
          <div className="flex flex-col gap-4">
            {/* Name - hidden on mobile since it's shown on image */}
            <h1 className="hidden md:block text-2xl lg:text-3xl font-bold text-foreground">
              {restaurant.name}
            </h1>
            <h1 className="md:hidden text-xl font-bold text-foreground">
              {restaurant.name}
            </h1>
            
            {/* Cuisine Tags */}
            <div className="flex flex-wrap gap-2">
              {restaurant.cuisines.map((cuisine) => (
                <Badge
                  key={cuisine}
                  variant="secondary"
                  className="text-xs font-medium px-3 py-1 hover:bg-primary/10 transition-colors cursor-default"
                >
                  {cuisine}
                </Badge>
              ))}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 md:gap-5">
              {/* Rating */}
              <div className="flex items-center gap-1.5 bg-success/15 text-success px-3 py-1.5 rounded-lg">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold">{restaurant.rating}</span>
                <span className="text-xs text-success/80">
                  ({restaurant.reviewCount.toLocaleString()} reviews)
                </span>
              </div>

              {/* Delivery Time */}
              <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-lg">
                <Bike className="h-4 w-4" />
                <span className="font-semibold text-sm">{restaurant.deliveryTime}</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{restaurant.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantHeader;
