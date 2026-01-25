import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Clock, MapPin, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FavoriteRestaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisines: string[];
  location: string;
}

interface FavoritesSectionProps {
  favorites: FavoriteRestaurant[];
  onRemove: (id: string) => void;
}

const FavoritesSection = ({ favorites, onRemove }: FavoritesSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Favorites</h2>
          <p className="text-muted-foreground mt-1">Your favorite restaurants</p>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Heart className="w-3 h-3 fill-primary text-primary" />
          {favorites.length} saved
        </Badge>
      </div>

      {/* Favorites Grid */}
      {favorites.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {favorites.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-secondary/30 rounded-2xl border border-border overflow-hidden hover:shadow-card-hover transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => onRemove(restaurant.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  <Heart className="w-4 h-4 fill-primary text-primary" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1">{restaurant.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {restaurant.cuisines.join(" • ")}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-rating fill-rating" />
                    <span className="font-medium text-foreground">{restaurant.rating}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {restaurant.deliveryTime}
                  </span>
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{restaurant.location}</span>
                  </span>
                </div>

                <Button className="w-full" onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
                  Order Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No favorites yet</h3>
          <p className="text-muted-foreground text-center max-w-sm mb-6">
            Save your favorite restaurants for quick access when you're ready to order
          </p>
          <Button onClick={() => navigate("/")} size="lg">
            Explore Restaurants
          </Button>
        </div>
      )}
    </div>
  );
};

export default FavoritesSection;
