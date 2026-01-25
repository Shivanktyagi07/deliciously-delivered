import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrderFiltersProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { value: "all", label: "All Orders" },
  { value: "30days", label: "Last 30 Days" },
  { value: "thisMonth", label: "This Month" },
  { value: "lastMonth", label: "Last Month" },
];

const OrderFilters = ({ selectedFilter, onFilterChange }: OrderFiltersProps) => {
  const currentFilter = filters.find(f => f.value === selectedFilter);

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            {currentFilter?.label || "All Orders"}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {filters.map((filter) => (
            <DropdownMenuItem
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={selectedFilter === filter.value ? "bg-primary/10 text-primary" : ""}
            >
              {filter.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default OrderFilters;
