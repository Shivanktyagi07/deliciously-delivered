import { Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  isPopular?: boolean;
  category: string;
}

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

const MenuItemCard = ({ item, quantity, onAdd, onRemove }: MenuItemCardProps) => {
  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-card rounded-2xl border border-border p-4 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
      <div className="flex gap-4">
        {/* Item Details */}
        <div className="flex-1 min-w-0">
          {/* Veg/Non-veg Indicator */}
          <div className="flex items-center gap-2 mb-2">
            <div
              className={cn(
                "w-4 h-4 border-2 rounded-sm flex items-center justify-center",
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
            
            {/* Badges */}
            <div className="flex gap-1.5">
              {item.isBestseller && (
                <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px] px-1.5 py-0">
                  Bestseller
                </Badge>
              )}
              {item.isPopular && (
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] px-1.5 py-0">
                  Popular
                </Badge>
              )}
            </div>
          </div>

          {/* Name */}
          <h3 className="font-semibold text-foreground text-base mb-1 truncate">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {item.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground text-lg">
              ₹{item.price}
            </span>
            {item.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  ₹{item.originalPrice}
                </span>
                <Badge variant="secondary" className="text-success text-[10px] px-1.5 py-0">
                  {discount}% OFF
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* Image & Add Button */}
        <div className="relative flex-shrink-0">
          <div className="w-28 h-28 rounded-xl overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Add/Quantity Button */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
            {quantity === 0 ? (
              <Button
                onClick={onAdd}
                className="bg-card hover:bg-card border-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary px-6 py-1.5 h-auto text-sm font-semibold rounded-lg shadow-md transition-all"
              >
                ADD
                <Plus className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <div className="flex items-center gap-1 bg-primary rounded-lg shadow-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onRemove}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary/80 rounded-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-primary-foreground font-semibold w-6 text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onAdd}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary/80 rounded-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
