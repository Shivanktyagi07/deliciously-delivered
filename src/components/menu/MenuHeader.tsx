import { Search, ShoppingCart, User, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface MenuHeaderProps {
  cartItemCount?: number;
}

const MenuHeader = ({ cartItemCount = 0 }: MenuHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/50">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Back & Logo */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <span className="text-lg font-bold text-primary-foreground">
                  F
                </span>
              </div>
              <span className="text-lg font-bold text-foreground hidden sm:block">
                Foodzzy
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for dishes..."
                className="w-full h-10 pl-11 pr-4 rounded-xl bg-secondary border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("/profile")}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
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
