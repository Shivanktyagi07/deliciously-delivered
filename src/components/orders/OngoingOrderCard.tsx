import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Navigation, ChefHat, Bike, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface OngoingOrderProps {
  order: {
    id: string;
    restaurantName: string;
    status: "confirmed" | "preparing" | "out_for_delivery";
    estimatedTime: string;
    deliveryAddress: string;
    items: { name: string; quantity: number; image?: string }[];
    totalAmount: number;
  };
  onTrack: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const statusConfig = {
  confirmed: {
    label: "Order Confirmed",
    color: "bg-blue-500",
    progress: 25,
    icon: CheckCircle2,
  },
  preparing: {
    label: "Preparing",
    color: "bg-amber-500",
    progress: 50,
    icon: ChefHat,
  },
  out_for_delivery: {
    label: "Out for Delivery",
    color: "bg-success",
    progress: 80,
    icon: Bike,
  },
};

const OngoingOrderCard = ({ order, onTrack, onViewDetails }: OngoingOrderProps) => {
  const config = statusConfig[order.status];
  const StatusIcon = config.icon;

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-5 hover:shadow-card-hover transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground">Order #{order.id}</span>
            <Badge className={`${config.color} text-white border-0 gap-1`}>
              <StatusIcon className="h-3 w-3" />
              {config.label}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold text-foreground">{order.restaurantName}</h3>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-primary font-semibold">
            <Clock className="h-4 w-4" />
            <span>{order.estimatedTime}</span>
          </div>
          <span className="text-xs text-muted-foreground">Estimated delivery</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <Progress value={config.progress} className="h-2" />
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Confirmed</span>
          <span>Preparing</span>
          <span>On the way</span>
          <span>Delivered</span>
        </div>
      </div>

      {/* Items Preview */}
      <div className="flex items-center gap-2 mb-4 py-3 border-t border-b border-border">
        <div className="flex -space-x-2">
          {order.items.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="w-10 h-10 rounded-lg bg-secondary border-2 border-card flex items-center justify-center text-xs font-medium overflow-hidden"
            >
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                item.name.charAt(0)
              )}
            </div>
          ))}
          {order.items.length > 3 && (
            <div className="w-10 h-10 rounded-lg bg-primary/10 border-2 border-card flex items-center justify-center text-xs font-medium text-primary">
              +{order.items.length - 3}
            </div>
          )}
        </div>
        <div className="flex-1">
          <span className="text-sm text-foreground">
            {order.items.map(i => `${i.quantity}x ${i.name}`).slice(0, 2).join(", ")}
            {order.items.length > 2 && ` +${order.items.length - 2} more`}
          </span>
        </div>
        <span className="font-semibold text-foreground">₹{order.totalAmount}</span>
      </div>

      {/* Delivery Address */}
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 text-primary" />
        <span>{order.deliveryAddress}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button 
          onClick={() => onTrack(order.id)} 
          className="flex-1 gap-2"
        >
          <Navigation className="h-4 w-4" />
          Track Order
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onViewDetails(order.id)}
          className="flex-1"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default OngoingOrderCard;
