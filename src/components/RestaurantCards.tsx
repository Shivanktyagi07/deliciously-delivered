import { Star, Clock, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import restaurant1 from "@/assets/restaurant-1.jpg";
import restaurant2 from "@/assets/restaurant-2.jpg";
import restaurant3 from "@/assets/restaurant-3.jpg";
import restaurant4 from "@/assets/restaurant-4.jpg";
import restaurant5 from "@/assets/restaurant-5.jpg";
import restaurant6 from "@/assets/restaurant-6.jpg";

const restaurants = [
  {
    id: 1,
    name: "La Bella Italia",
    image: restaurant1,
    cuisine: "Italian, Pizza, Pasta",
    rating: 4.5,
    deliveryTime: "25-30 min",
    priceForTwo: 600,
    discount: "20% OFF up to ₹100",
    promoted: true,
  },
  {
    id: 2,
    name: "Tokyo Sushi House",
    image: restaurant2,
    cuisine: "Japanese, Sushi, Asian",
    rating: 4.7,
    deliveryTime: "30-35 min",
    priceForTwo: 800,
    discount: "Free Delivery",
    promoted: false,
  },
  {
    id: 3,
    name: "Spice Kingdom",
    image: restaurant3,
    cuisine: "Indian, Biryani, Curry",
    rating: 4.3,
    deliveryTime: "20-25 min",
    priceForTwo: 450,
    discount: "Buy 1 Get 1 Free",
    promoted: true,
  },
  {
    id: 4,
    name: "Burger Barn",
    image: restaurant4,
    cuisine: "American, Burgers, Fast Food",
    rating: 4.6,
    deliveryTime: "15-20 min",
    priceForTwo: 350,
    discount: "50% OFF on first order",
    promoted: false,
  },
  {
    id: 5,
    name: "Green Bowl Cafe",
    image: restaurant5,
    cuisine: "Healthy, Salads, Smoothies",
    rating: 4.4,
    deliveryTime: "20-30 min",
    priceForTwo: 400,
    discount: null,
    promoted: false,
  },
  {
    id: 6,
    name: "Sweet Delights",
    image: restaurant6,
    cuisine: "Desserts, Cakes, Bakery",
    rating: 4.8,
    deliveryTime: "25-30 min",
    priceForTwo: 500,
    discount: "30% OFF on cakes",
    promoted: true,
  },
];

const RestaurantCards = () => {
  return (
    <section className="py-12 bg-secondary/30">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Top Restaurants Near You
            </h2>
            <p className="text-muted-foreground">
              Best picks from your neighborhood
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            View All
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="card-hover group bg-card rounded-2xl overflow-hidden border border-border/50"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {restaurant.discount && (
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-success text-success-foreground text-xs font-bold rounded-lg">
                    {restaurant.discount}
                  </div>
                )}
                {restaurant.promoted && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-foreground/80 text-background text-[10px] font-medium rounded">
                    Promoted
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-success/10 rounded">
                    <Star className="h-3 w-3 text-success fill-success" />
                    <span className="text-xs font-bold text-success">{restaurant.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-1">
                  {restaurant.cuisine}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <IndianRupee className="h-3 w-3" />
                    <span>{restaurant.priceForTwo} for two</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="hero" size="sm" className="flex-1">
                    Order Now
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Menu
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 md:hidden">
          <Button variant="outline">View All Restaurants</Button>
        </div>
      </div>
    </section>
  );
};

export default RestaurantCards;
