import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, RotateCcw, Eye, Calendar, MapPin } from "lucide-react";

interface PastOrderProps {
  order: {
    id: string;
    restaurantName: string;
    restaurantImage?: string;
    status: "delivered" | "cancelled";
    orderDate: string;
    totalAmount: number;
    items: { name: string; quantity: number; image?: string }[];
    deliveryAddress: string;
    cancellationReason?: string;
  };
  onViewDetails: (id: string) => void;
  onReorder: (id: string) => void;
}

const PastOrderCard = ({ order, onViewDetails, onReorder }: PastOrderProps) => {
  const isDelivered = order.status === "delivered";

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-5 hover:shadow-card-hover transition-all duration-300">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Restaurant Image */}
        <div className="w-16 h-16 rounded-xl bg-secondary overflow-hidden flex-shrink-0">
          {order.restaurantImage ? (
            <img 
              src={order.restaurantImage} 
              alt={order.restaurantName} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
              {order.restaurantName.charAt(0)}
            </div>
          )}
        </div>

        {/* Order Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground">Order #{order.id}</span>
            <Badge 
              variant={isDelivered ? "default" : "destructive"}
              className={`gap-1 ${isDelivered ? "bg-success hover:bg-success/90" : ""}`}
            >
              {isDelivered ? (
                <>
                  <CheckCircle2 className="h-3 w-3" />
                  Delivered
                </>
              ) : (
                <>
                  <XCircle className="h-3 w-3" />
                  Cancelled
                </>
              )}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold text-foreground truncate">{order.restaurantName}</h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {order.orderDate}
            </span>
          </div>
        </div>

        {/* Amount */}
        <div className="text-right">
          <span className="text-lg font-bold text-foreground">₹{order.totalAmount}</span>
          <p className="text-xs text-muted-foreground">Total paid</p>
        </div>
      </div>

      {/* Items Summary */}
      <div className="flex items-center gap-2 py-3 border-t border-b border-border mb-4">
        <div className="flex -space-x-2">
          {order.items.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className="w-9 h-9 rounded-lg bg-secondary border-2 border-card flex items-center justify-center text-xs font-medium overflow-hidden"
            >
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                item.name.charAt(0)
              )}
            </div>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {order.items.reduce((acc, item) => acc + item.quantity, 0)} items • {" "}
          {order.items.map(i => i.name).slice(0, 2).join(", ")}
          {order.items.length > 2 && ` +${order.items.length - 2} more`}
        </span>
      </div>

      {/* Delivery Address */}
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 text-primary" />
        <span className="truncate">{order.deliveryAddress}</span>
      </div>

      {/* Cancellation Reason */}
      {!isDelivered && order.cancellationReason && (
        <div className="mb-4 p-3 bg-destructive/10 rounded-lg">
          <p className="text-sm text-destructive">
            <span className="font-medium">Cancellation reason:</span> {order.cancellationReason}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={() => onViewDetails(order.id)}
          className="flex-1 gap-2"
        >
          <Eye className="h-4 w-4" />
          View Details
        </Button>
        {isDelivered && (
          <Button 
            onClick={() => onReorder(order.id)} 
            className="flex-1 gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reorder
          </Button>
        )}
      </div>
    </div>
  );
};

export default PastOrderCard;
