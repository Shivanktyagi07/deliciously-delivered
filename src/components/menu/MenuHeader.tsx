import { Search, ShoppingCart, User, ChevronLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCity } from "@/contexts/CityContext";

interface MenuHeaderProps {
  cartItemCount?: number;
}

const MenuHeader = ({ cartItemCount = 0 }: MenuHeaderProps) => {
  const navigate = useNavigate();
  const { selectedCity } = useCity();

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Back & Logo */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full hover:bg-primary/10 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md">
                <span className="text-xl font-bold text-primary-foreground">
                  F
                </span>
              </div>
              <span className="text-xl font-bold text-foreground hidden sm:block">
                Foodzzy
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search for restaurants or dishes..."
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-secondary/80 border border-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:bg-card transition-all"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Location Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary/50 mr-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{selectedCity.name}</span>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-primary/10 transition-colors"
              onClick={() => navigate("/profile")}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative rounded-full hover:bg-primary/10 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center shadow-md animate-pulse-soft">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MenuHeader;
