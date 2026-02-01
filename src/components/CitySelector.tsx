import { MapPin, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCity, cities } from "@/contexts/CityContext";

const CitySelector = () => {
  const { selectedCity, setSelectedCity } = useCity();

  return (
    <section className="py-6 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 md:p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
          {/* Left side - Label */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Delivery Location
              </h3>
              <p className="text-sm text-muted-foreground">
                Select your city for faster delivery
              </p>
            </div>
          </div>

          {/* Right side - City Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[200px] justify-between gap-2 h-12 px-4 bg-background border-border hover:bg-secondary"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium">{selectedCity.name}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-[220px] bg-card border border-border shadow-lg z-50"
            >
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Popular Cities
              </div>
              {cities
                .filter((city) => city.popular)
                .map((city) => (
                  <DropdownMenuItem
                    key={city.id}
                    onClick={() => setSelectedCity(city)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <span>{city.name}</span>
                    {selectedCity.id === city.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              <div className="my-1 border-t border-border" />
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Other Cities
              </div>
              {cities
                .filter((city) => !city.popular)
                .map((city) => (
                  <DropdownMenuItem
                    key={city.id}
                    onClick={() => setSelectedCity(city)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <span>{city.name}</span>
                    {selectedCity.id === city.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  );
};

export default CitySelector;
