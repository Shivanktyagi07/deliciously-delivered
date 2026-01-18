import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const FloatingCart = () => {
  const [itemCount] = useState(3);

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button className="group relative flex items-center gap-3 px-5 py-3 bg-primary text-primary-foreground rounded-full shadow-primary hover:scale-105 transition-transform duration-200">
        <ShoppingCart className="h-5 w-5" />
        <span className="font-semibold">View Cart</span>
        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-success text-success-foreground text-xs font-bold">
          {itemCount}
        </span>
      </button>
    </div>
  );
};

export default FloatingCart;
