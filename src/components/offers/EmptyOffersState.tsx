import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EmptyOffersState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <Tag className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No offers available right now
      </h3>
      <p className="text-muted-foreground text-center max-w-sm mb-6">
        Check back later for exciting deals and discounts on your favorite food!
      </p>
      <Button onClick={() => navigate("/")} size="lg" className="rounded-xl">
        Browse Restaurants
      </Button>
    </div>
  );
};

export default EmptyOffersState;
