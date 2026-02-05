import { Plus, Minus, Star } from "lucide-react";
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
    <div className="group bg-card rounded-2xl border border-border/50 p-4 hover:shadow-xl hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex gap-4">
        {/* Item Details */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Veg/Non-veg Indicator & Badges */}
          <div className="flex items-center gap-2 mb-2">
            <div
              className={cn(
                "w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0",
                item.isVeg ? "border-success" : "border-destructive"
              )}
            >
              <div
                className={cn(
                  "w-2.5 h-2.5 rounded-full",
                  item.isVeg ? "bg-success" : "bg-destructive"
                )}
              />
            </div>
            
            {/* Badges */}
            <div className="flex gap-1.5 flex-wrap">
              {item.isBestseller && (
                <Badge className="bg-gradient-to-r from-amber-500 to-amber-400 text-white border-0 text-[10px] px-2 py-0.5 gap-1 shadow-sm">
                  <Star className="h-3 w-3 fill-current" />
                  Bestseller
                </Badge>
              )}
              {item.isPopular && (
                <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 text-[10px] px-2 py-0.5 shadow-sm">
                  Popular
                </Badge>
              )}
            </div>
          </div>

          {/* Name */}
          <h3 className="font-bold text-foreground text-base mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
            {item.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2 mt-auto">
            <span className="font-bold text-foreground text-lg">
              ₹{item.price}
            </span>
            {item.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  ₹{item.originalPrice}
                </span>
                <Badge variant="secondary" className="bg-success/15 text-success border-0 text-[10px] px-1.5 py-0 font-bold">
                  {discount}% OFF
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* Image & Add Button */}
        <div className="relative flex-shrink-0">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-md">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Add/Quantity Button */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
            {quantity === 0 ? (
              <Button
                onClick={onAdd}
                className="bg-card hover:bg-primary border-2 border-primary text-primary hover:text-primary-foreground px-6 py-1.5 h-auto text-sm font-bold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                ADD
                <Plus className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <div className="flex items-center gap-0.5 bg-primary rounded-lg shadow-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onRemove}
                  className="h-9 w-9 text-primary-foreground hover:bg-primary-foreground/20 rounded-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-primary-foreground font-bold w-7 text-center text-base">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onAdd}
                  className="h-9 w-9 text-primary-foreground hover:bg-primary-foreground/20 rounded-none"
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
