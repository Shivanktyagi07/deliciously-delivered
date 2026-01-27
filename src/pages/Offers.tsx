import { useState } from "react";
import { Tag } from "lucide-react";
import OffersHeader from "@/components/offers/OffersHeader";
import OfferFilters from "@/components/offers/OfferFilters";
import CouponCard from "@/components/offers/CouponCard";
import PromotionalBanners from "@/components/offers/PromotionalBanners";
import EmptyOffersState from "@/components/offers/EmptyOffersState";
import { toast } from "sonner";

const couponsData = [
  {
    id: "1",
    code: "WELCOME50",
    title: "New User Special",
    description: "Get flat 50% OFF on your first order. Maximum discount ₹150.",
    discount: "50% OFF",
    minOrder: "₹199",
    validTill: "31 Jan 2026",
    type: "newUser" as const,
    badge: "popular" as const,
  },
  {
    id: "2",
    code: "FREEDEL",
    title: "Free Delivery",
    description: "Free delivery on your next 3 orders. No minimum order value.",
    discount: "Free Delivery",
    minOrder: "No minimum",
    validTill: "28 Jan 2026",
    type: "restaurant" as const,
    badge: "new" as const,
  },
  {
    id: "3",
    code: "SAVE75",
    title: "Weekend Special",
    description: "Save ₹75 on orders above ₹299. Valid on all restaurants.",
    discount: "₹75 OFF",
    minOrder: "₹299",
    validTill: "25 Jan 2026",
    type: "restaurant" as const,
    badge: "limited" as const,
  },
  {
    id: "4",
    code: "PAYTM100",
    title: "Paytm Cashback",
    description: "Get ₹100 cashback when you pay using Paytm wallet.",
    discount: "₹100 Cashback",
    minOrder: "₹399",
    validTill: "30 Jan 2026",
    type: "payment" as const,
  },
  {
    id: "5",
    code: "GPAY50",
    title: "Google Pay Offer",
    description: "Flat ₹50 instant discount on payments via Google Pay.",
    discount: "₹50 OFF",
    minOrder: "₹249",
    validTill: "29 Jan 2026",
    type: "payment" as const,
    badge: "new" as const,
  },
  {
    id: "6",
    code: "EXPIRED20",
    title: "Old Offer",
    description: "This offer has expired. Check out our latest deals!",
    discount: "20% OFF",
    minOrder: "₹199",
    validTill: "15 Jan 2026",
    type: "restaurant" as const,
    isExpired: true,
  },
];

const Offers = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleApplyCoupon = (code: string) => {
    setAppliedCoupon(code);
    toast.success(`Coupon "${code}" applied successfully!`, {
      description: "Discount will be applied at checkout.",
    });
  };

  const handleRemoveCoupon = (code: string) => {
    setAppliedCoupon(null);
    toast.info(`Coupon "${code}" removed.`);
  };

  const filteredCoupons = couponsData.filter((coupon) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "expiring") {
      // Show coupons expiring within 3 days
      const validDate = new Date(coupon.validTill);
      const now = new Date();
      const diffDays = Math.ceil((validDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 3 && !coupon.isExpired;
    }
    return coupon.type === activeFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <OffersHeader />

      <main className="container mx-auto py-8 px-4">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Tag className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Offers & Coupons</h1>
              <p className="text-muted-foreground">Save more on your favorite food</p>
            </div>
          </div>
        </div>

        {/* Promotional Banners */}
        <section className="mb-10">
          <PromotionalBanners />
        </section>

        {/* Applied Coupon Alert */}
        {appliedCoupon && (
          <div className="mb-6 p-4 bg-success/10 border border-success/30 rounded-xl flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <Tag className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Coupon "{appliedCoupon}" applied successfully!
                </p>
                <p className="text-sm text-muted-foreground">
                  Discount will be applied at checkout
                </p>
              </div>
            </div>
            <button
              onClick={() => handleRemoveCoupon(appliedCoupon)}
              className="text-sm font-medium text-destructive hover:underline"
            >
              Remove
            </button>
          </div>
        )}

        {/* Filters */}
        <section className="mb-8">
          <OfferFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </section>

        {/* Coupons Grid */}
        <section>
          {filteredCoupons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCoupons.map((coupon) => (
                <CouponCard
                  key={coupon.id}
                  coupon={coupon}
                  isApplied={appliedCoupon === coupon.code}
                  onApply={handleApplyCoupon}
                  onRemove={handleRemoveCoupon}
                />
              ))}
            </div>
          ) : (
            <EmptyOffersState />
          )}
        </section>

        {/* Terms Section */}
        <section className="mt-12 p-6 bg-muted/50 rounded-2xl">
          <h3 className="font-semibold text-foreground mb-3">Terms & Conditions</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Coupons are valid only for the specified validity period.</li>
            <li>• Only one coupon can be applied per order.</li>
            <li>• Offers are subject to restaurant availability in your area.</li>
            <li>• Payment-specific offers require the use of the specified payment method.</li>
            <li>• Foodzzy reserves the right to modify or withdraw offers without prior notice.</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Offers;
