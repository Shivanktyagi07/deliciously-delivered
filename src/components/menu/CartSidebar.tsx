import { MapPin, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { MenuItem } from "./MenuItemCard";

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartSidebarProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  deliveryLocation?: string;
}

const CartSidebar = ({
  items,
  onUpdateQuantity,
  deliveryLocation = "Civil Lines, Prayagraj",
}: CartSidebarProps) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const discount = subtotal > 500 ? 50 : 0;
  const total = subtotal + deliveryFee - discount;

  return (
    <div className="sticky top-20 bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-secondary/50 border-b border-border">
        <div className="flex items-center gap-2 text-foreground font-semibold">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <span>Your Cart</span>
          {items.length > 0 && (
            <span className="ml-auto text-sm text-muted-foreground">
              {items.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        /* Empty State */
        <div className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">
            Your cart is empty. Add items from the menu to get started.
          </p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <ScrollArea className="max-h-64">
            <div className="p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30"
                >
                  {/* Veg/Non-veg indicator */}
                  <div
                    className={`w-3 h-3 border rounded-sm flex-shrink-0 ${
                      item.isVeg ? "border-success" : "border-destructive"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 m-0.5 rounded-full ${
                        item.isVeg ? "bg-success" : "bg-destructive"
                      }`}
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{item.price} each
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1 bg-secondary rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-4 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Item Total */}
                  <span className="text-sm font-semibold text-foreground min-w-[60px] text-right">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>

          <Separator />

          {/* Price Breakdown */}
          <div className="p-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-foreground text-base">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Delivery Location */}
          <div className="px-4 pb-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 rounded-lg p-2">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">Delivering to: {deliveryLocation}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="p-4">
            <Button className="w-full" size="lg">
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebar;
