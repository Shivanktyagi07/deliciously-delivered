import { useState, useMemo } from "react";
import MenuHeader from "@/components/menu/MenuHeader";
import RestaurantHeader from "@/components/menu/RestaurantHeader";
import CategoryNav from "@/components/menu/CategoryNav";
import MenuItemCard, { MenuItem } from "@/components/menu/MenuItemCard";
import CartSidebar from "@/components/menu/CartSidebar";

// Mock restaurant data
const restaurantData = {
  name: "Bismillah Biryani House",
  image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800",
  cuisines: ["Indian", "Biryani", "Mughlai", "North Indian"],
  rating: 4.5,
  reviewCount: 2340,
  deliveryTime: "30-40 min",
  location: "Civil Lines, Prayagraj",
  offer: "25% OFF up to ₹100",
};

// Mock menu items
const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Hyderabadi Chicken Biryani",
    description: "Aromatic basmati rice layered with tender chicken, saffron, and signature spices",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
    isVeg: false,
    isBestseller: true,
    category: "Biryani",
  },
  {
    id: "2",
    name: "Mutton Biryani",
    description: "Slow-cooked mutton with fragrant rice and traditional spices",
    price: 399,
    originalPrice: 499,
    image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=400",
    isVeg: false,
    isPopular: true,
    category: "Biryani",
  },
  {
    id: "3",
    name: "Veg Dum Biryani",
    description: "Garden fresh vegetables with aromatic basmati rice and herbs",
    price: 229,
    image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400",
    isVeg: true,
    category: "Biryani",
  },
  {
    id: "4",
    name: "Paneer Tikka",
    description: "Marinated cottage cheese cubes grilled to perfection with bell peppers",
    price: 249,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400",
    isVeg: true,
    isBestseller: true,
    category: "Starters",
  },
  {
    id: "5",
    name: "Chicken Seekh Kebab",
    description: "Minced chicken skewers with aromatic spices, charcoal grilled",
    price: 279,
    originalPrice: 329,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
    isVeg: false,
    isPopular: true,
    category: "Starters",
  },
  {
    id: "6",
    name: "Butter Chicken",
    description: "Tender chicken in creamy tomato-based curry with butter and spices",
    price: 329,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
    isVeg: false,
    isBestseller: true,
    category: "Main Course",
  },
  {
    id: "7",
    name: "Dal Makhani",
    description: "Slow-cooked black lentils in creamy tomato gravy",
    price: 199,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
    isVeg: true,
    category: "Main Course",
  },
  {
    id: "8",
    name: "Butter Naan",
    description: "Soft leavened bread brushed with butter, baked in tandoor",
    price: 49,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400",
    isVeg: true,
    category: "Breads",
  },
  {
    id: "9",
    name: "Garlic Naan",
    description: "Tandoor baked bread topped with garlic and coriander",
    price: 59,
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=400",
    isVeg: true,
    isPopular: true,
    category: "Breads",
  },
  {
    id: "10",
    name: "Gulab Jamun",
    description: "Deep fried milk dumplings soaked in sugar syrup",
    price: 99,
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400",
    isVeg: true,
    category: "Desserts",
  },
  {
    id: "11",
    name: "Masala Chaas",
    description: "Spiced buttermilk with cumin and mint",
    price: 49,
    image: "https://images.unsplash.com/photo-1626082896492-766af4eb6501?w=400",
    isVeg: true,
    category: "Beverages",
  },
  {
    id: "12",
    name: "Mango Lassi",
    description: "Creamy yogurt drink blended with fresh mango pulp",
    price: 79,
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400",
    isVeg: true,
    isBestseller: true,
    category: "Beverages",
  },
];

const categories = [
  "Recommended",
  "Biryani",
  "Starters",
  "Main Course",
  "Breads",
  "Desserts",
  "Beverages",
];

const RestaurantMenu = () => {
  const [activeCategory, setActiveCategory] = useState("Recommended");
  const [cart, setCart] = useState<Record<string, number>>({});

  const filteredItems = useMemo(() => {
    if (activeCategory === "Recommended") {
      return menuItems.filter((item) => item.isBestseller || item.isPopular);
    }
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .filter(([, quantity]) => quantity > 0)
      .map(([id, quantity]) => {
        const item = menuItems.find((i) => i.id === id)!;
        return { ...item, quantity };
      });
  }, [cart]);

  const totalCartItems = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  const handleAddItem = (itemId: string) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: Math.max(quantity, 0),
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <MenuHeader cartItemCount={totalCartItems} />

      <main className="container mx-auto px-4 py-6">
        {/* Restaurant Header */}
        <RestaurantHeader restaurant={restaurantData} />

        {/* Category Navigation */}
        <div className="mt-8">
          <CategoryNav
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Main Content */}
        <div className="mt-6 flex gap-6">
          {/* Menu Items */}
          <div className="flex-1">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-foreground">
                {activeCategory}
              </h2>
              <p className="text-sm text-muted-foreground">
                {filteredItems.length} items
              </p>
            </div>

            <div className="grid gap-4">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  quantity={cart[item.id] || 0}
                  onAdd={() => handleAddItem(item.id)}
                  onRemove={() => handleRemoveItem(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Cart Sidebar - Desktop Only */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <CartSidebar
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
            />
          </div>
        </div>
      </main>

      {/* Mobile Cart Bar */}
      {totalCartItems > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary p-4 shadow-lg">
          <button className="w-full flex items-center justify-between text-primary-foreground">
            <span className="font-semibold">
              {totalCartItems} item{totalCartItems > 1 ? "s" : ""} | ₹
              {cartItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              )}
            </span>
            <span className="font-bold">View Cart →</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
