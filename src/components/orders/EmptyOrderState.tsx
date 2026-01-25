import { Button } from "@/components/ui/button";
import { ShoppingBag, Utensils, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmptyOrderStateProps {
  type: "ongoing" | "past";
}

const EmptyOrderState = ({ type }: EmptyOrderStateProps) => {
  const navigate = useNavigate();

  const content = {
    ongoing: {
      title: "No ongoing orders",
      description: "You don't have any active orders right now. Hungry? Let's fix that!",
      icon: ShoppingBag,
    },
    past: {
      title: "No past orders yet",
      description: "You haven't placed any orders yet. Start exploring delicious food near you!",
      icon: Utensils,
    },
  };

  const { title, description, icon: Icon } = content[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Illustration */}
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="w-16 h-16 text-primary" />
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-success" />
        </div>
        <div className="absolute -bottom-1 -left-3 w-6 h-6 rounded-full bg-rating/20 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-rating" />
        </div>
      </div>

      {/* Text */}
      <h3 className="text-xl font-semibold text-foreground mb-2 text-center">{title}</h3>
      <p className="text-muted-foreground text-center max-w-sm mb-8">{description}</p>

      {/* CTA */}
      <Button onClick={() => navigate("/")} size="lg" className="gap-2">
        Order Now
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default EmptyOrderState;
