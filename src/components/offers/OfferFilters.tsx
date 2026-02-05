import { Button } from "@/components/ui/button";

interface OfferFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: "all", label: "All Offers" },
  { id: "restaurant", label: "Restaurant Offers" },
  { id: "payment", label: "Payment Offers" },
  { id: "newUser", label: "New User Offers" },
  { id: "expiring", label: "Expiring Soon" },
];

const OfferFilters = ({ activeFilter, onFilterChange }: OfferFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          onClick={() => onFilterChange(filter.id)}
          className={`rounded-full transition-all duration-200 ${
            activeFilter === filter.id
              ? "shadow-lg"
              : "hover:bg-primary/10 hover:text-primary hover:border-primary"
          }`}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default OfferFilters;
