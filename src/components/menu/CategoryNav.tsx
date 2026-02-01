import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sparkles, Flame, Coffee, Utensils, Cookie, IceCream, GlassWater } from "lucide-react";

interface CategoryNavProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Recommended: <Sparkles className="h-4 w-4" />,
  Biryani: <Flame className="h-4 w-4" />,
  Starters: <Utensils className="h-4 w-4" />,
  "Main Course": <Utensils className="h-4 w-4" />,
  Breads: <Cookie className="h-4 w-4" />,
  Desserts: <IceCream className="h-4 w-4" />,
  Beverages: <GlassWater className="h-4 w-4" />,
};

const CategoryNav = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryNavProps) => {
  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 py-3 -mx-4 px-4">
      <ScrollArea className="w-full">
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                  : "bg-secondary/80 text-secondary-foreground hover:bg-secondary hover:shadow-md"
              )}
            >
              {categoryIcons[category]}
              {category}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
};

export default CategoryNav;
