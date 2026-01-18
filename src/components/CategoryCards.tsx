import categoryPizza from "@/assets/category-pizza.jpg";
import categoryBurger from "@/assets/category-burger.jpg";
import categoryBiryani from "@/assets/category-biryani.jpg";
import categoryMomos from "@/assets/category-momos.jpg";
import categoryDesserts from "@/assets/category-desserts.jpg";
import categoryDrinks from "@/assets/category-drinks.jpg";

const categories = [
  { name: "Pizza", image: categoryPizza },
  { name: "Burger", image: categoryBurger },
  { name: "Biryani", image: categoryBiryani },
  { name: "Momos", image: categoryMomos },
  { name: "Desserts", image: categoryDesserts },
  { name: "Drinks", image: categoryDrinks },
];

const CategoryCards = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            What's on your mind?
          </h2>
          <p className="text-muted-foreground">
            Explore cuisines that make your taste buds dance
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="category-card group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-secondary aspect-square mb-3">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-icon w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <p className="text-center font-semibold text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
