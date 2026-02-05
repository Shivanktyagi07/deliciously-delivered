import { Star, Clock, MapPin, Heart, Percent } from "lucide-react";
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
    <section className="relative">
      {/* Banner Image */}
      <div className="relative h-64 md:h-80 overflow-hidden rounded-2xl">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full shadow-lg"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }`}
          />
        </Button>

        {/* Offer Badge */}
        {restaurant.offer && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-success text-success-foreground px-3 py-1.5 text-sm font-semibold gap-1">
              <Percent className="h-3.5 w-3.5" />
              {restaurant.offer}
            </Badge>
          </div>
        )}
      </div>

      {/* Restaurant Info Card */}
      <div className="relative -mt-16 mx-4 md:mx-8">
        <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {restaurant.name}
              </h1>
              
              {/* Cuisine Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {restaurant.cuisines.map((cuisine) => (
                  <Badge
                    key={cuisine}
                    variant="secondary"
                    className="text-xs font-medium"
                  >
                    {cuisine}
                  </Badge>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {/* Rating */}
                <div className="flex items-center gap-1.5 bg-success/10 text-success px-2.5 py-1 rounded-lg">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-semibold">{restaurant.rating}</span>
                  <span className="text-muted-foreground">
                    ({restaurant.reviewCount} reviews)
                  </span>
                </div>

                {/* Delivery Time */}
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{restaurant.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantHeader;
