import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoryNavProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryNav = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryNavProps) => {
  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border py-3">
      <ScrollArea className="w-full">
        <div className="flex gap-2 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
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
