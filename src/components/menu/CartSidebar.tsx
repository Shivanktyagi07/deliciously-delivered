import { MapPin, Plus, Minus, ShoppingBag, Bike, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
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
    <div className="sticky top-20 bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/50">
        <div className="flex items-center gap-2 text-foreground font-bold text-lg">
          <div className="p-2 bg-primary/15 rounded-lg">
            <ShoppingBag className="h-5 w-5 text-primary" />
          </div>
          <span>Your Cart</span>
          {items.length > 0 && (
            <span className="ml-auto text-sm font-medium text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-full">
              {items.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        /* Empty State */
        <div className="p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/80 flex items-center justify-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <p className="text-muted-foreground text-sm font-medium mb-1">
            Your cart is empty
          </p>
          <p className="text-muted-foreground/70 text-xs">
            Add items from the menu to get started
          </p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <ScrollArea className="max-h-72">
            <div className="p-3 space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40 hover:bg-secondary/60 transition-colors"
                >
                  {/* Veg/Non-veg indicator */}
                  <div
                    className={cn(
                      "w-4 h-4 border-2 rounded flex-shrink-0 flex items-center justify-center",
                      item.isVeg ? "border-success" : "border-destructive"
                    )}
                  >
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        item.isVeg ? "bg-success" : "bg-destructive"
                      )}
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-0.5 bg-card rounded-lg border border-border/50 shadow-sm">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:text-primary"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-bold w-5 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:text-primary"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Item Total */}
                  <span className="text-sm font-bold text-foreground min-w-[56px] text-right">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>

          <Separator />

          {/* Price Breakdown */}
          <div className="p-4 space-y-2.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Bike className="h-3.5 w-3.5" />
                Delivery Fee
              </span>
              <span>₹{deliveryFee}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-success font-medium">
                <span className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" />
                  Discount Applied
                </span>
                <span>-₹{discount}</span>
              </div>
            )}
            <Separator className="my-3" />
            <div className="flex justify-between font-bold text-foreground text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Delivery Location */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/60 rounded-xl p-3">
              <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
              <span className="truncate font-medium">Delivering to: {deliveryLocation}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="p-4 pt-1">
            <Button className="w-full h-12 text-base font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all group">
              Proceed to Checkout
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebar;
