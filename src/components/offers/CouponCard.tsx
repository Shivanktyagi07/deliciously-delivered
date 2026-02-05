import { Copy, Check, Tag, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

interface CouponCardProps {
  coupon: {
    id: string;
    code: string;
    title: string;
    description: string;
    discount: string;
    minOrder: string;
    validTill: string;
    type: "restaurant" | "payment" | "newUser";
    badge?: "new" | "popular" | "limited";
    isExpired?: boolean;
  };
  isApplied?: boolean;
  onApply: (code: string) => void;
  onRemove: (code: string) => void;
}

const CouponCard = ({ coupon, isApplied, onApply, onRemove }: CouponCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    toast.success("Coupon code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const badgeColors = {
    new: "bg-success text-success-foreground",
    popular: "bg-primary text-primary-foreground",
    limited: "bg-destructive text-destructive-foreground",
  };

  const badgeLabels = {
    new: "New",
    popular: "Popular",
    limited: "Limited Time",
  };

  return (
    <div
      className={`relative rounded-2xl border-2 transition-all duration-300 ${
        isApplied
          ? "border-success bg-success/5 shadow-lg"
          : coupon.isExpired
          ? "border-muted bg-muted/50 opacity-60"
          : "border-dashed border-border bg-card hover:border-primary hover:shadow-md"
      }`}
    >
      {/* Badge */}
      {coupon.badge && !coupon.isExpired && (
        <div className="absolute -top-2 left-4">
          <Badge className={`${badgeColors[coupon.badge]} text-xs font-semibold px-3 py-1`}>
            {badgeLabels[coupon.badge]}
          </Badge>
        </div>
      )}

      {/* Applied Success Indicator */}
      {isApplied && (
        <div className="absolute -top-2 right-4">
          <Badge className="bg-success text-success-foreground text-xs font-semibold px-3 py-1">
            <Check className="h-3 w-3 mr-1" />
            Applied
          </Badge>
        </div>
      )}

      <div className="p-6">
        {/* Discount Banner */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Tag className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{coupon.discount}</h3>
              <p className="text-sm text-muted-foreground">{coupon.title}</p>
            </div>
          </div>
        </div>

        {/* Coupon Code */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 px-4 py-2 bg-secondary rounded-lg border border-dashed border-primary/30">
            <span className="font-mono font-bold text-primary tracking-wider">
              {coupon.code}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="hover:bg-primary/10"
            disabled={coupon.isExpired}
          >
            {copied ? (
              <Check className="h-4 w-4 text-success" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4">{coupon.description}</p>

        {/* Details */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Info className="h-3 w-3" />
            <span>Min order: {coupon.minOrder}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Valid till: {coupon.validTill}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {isApplied ? (
            <Button
              variant="outline"
              className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => onRemove(coupon.code)}
            >
              Remove Coupon
            </Button>
          ) : (
            <Button
              className="flex-1"
              variant={coupon.isExpired ? "secondary" : "default"}
              disabled={coupon.isExpired}
              onClick={() => onApply(coupon.code)}
            >
              {coupon.isExpired ? "Expired" : "Apply Coupon"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
