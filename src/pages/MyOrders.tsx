import { useState } from "react";
import OrdersHeader from "@/components/orders/OrdersHeader";
import OrderTabs from "@/components/orders/OrderTabs";
import OrderFilters from "@/components/orders/OrderFilters";
import OngoingOrderCard from "@/components/orders/OngoingOrderCard";
import PastOrderCard from "@/components/orders/PastOrderCard";
import EmptyOrderState from "@/components/orders/EmptyOrderState";
import Footer from "@/components/Footer";
import { TabsContent, Tabs } from "@/components/ui/tabs";
import { Package } from "lucide-react";
import { toast } from "sonner";

// Mock data for demonstration
const mockOngoingOrders = [
  {
    id: "FDZ-78234",
    restaurantName: "Royal Biryani House",
    status: "preparing" as const,
    estimatedTime: "25-30 mins",
    deliveryAddress: "123 Civil Lines, Prayagraj, UP 211001",
    items: [
      { name: "Chicken Biryani", quantity: 2 },
      { name: "Butter Naan", quantity: 4 },
      { name: "Raita", quantity: 1 },
    ],
    totalAmount: 649,
  },
  {
    id: "FDZ-78235",
    restaurantName: "Pizza Paradise",
    status: "out_for_delivery" as const,
    estimatedTime: "10-15 mins",
    deliveryAddress: "123 Civil Lines, Prayagraj, UP 211001",
    items: [
      { name: "Margherita Pizza", quantity: 1 },
      { name: "Garlic Bread", quantity: 1 },
    ],
    totalAmount: 449,
  },
];

const mockPastOrders = [
  {
    id: "FDZ-78100",
    restaurantName: "Royal Biryani House",
    status: "delivered" as const,
    orderDate: "Jan 20, 2026",
    totalAmount: 549,
    items: [
      { name: "Veg Biryani", quantity: 1 },
      { name: "Paneer Tikka", quantity: 1 },
      { name: "Lassi", quantity: 2 },
    ],
    deliveryAddress: "123 Civil Lines, Prayagraj, UP 211001",
  },
  {
    id: "FDZ-78050",
    restaurantName: "Burger King",
    status: "delivered" as const,
    orderDate: "Jan 18, 2026",
    totalAmount: 399,
    items: [
      { name: "Whopper", quantity: 2 },
      { name: "Fries", quantity: 2 },
    ],
    deliveryAddress: "456 MG Road, Prayagraj, UP 211002",
  },
  {
    id: "FDZ-77890",
    restaurantName: "Domino's Pizza",
    status: "cancelled" as const,
    orderDate: "Jan 15, 2026",
    totalAmount: 699,
    items: [
      { name: "Pepperoni Pizza", quantity: 1 },
      { name: "Cheesy Bread", quantity: 1 },
    ],
    deliveryAddress: "123 Civil Lines, Prayagraj, UP 211001",
    cancellationReason: "Restaurant was unable to fulfill the order due to high demand.",
  },
  {
    id: "FDZ-77500",
    restaurantName: "Chinese Wok",
    status: "delivered" as const,
    orderDate: "Jan 10, 2026",
    totalAmount: 520,
    items: [
      { name: "Hakka Noodles", quantity: 1 },
      { name: "Manchurian", quantity: 1 },
      { name: "Spring Rolls", quantity: 6 },
    ],
    deliveryAddress: "123 Civil Lines, Prayagraj, UP 211001",
  },
];

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleTrackOrder = (orderId: string) => {
    toast.info(`Tracking order ${orderId}`, {
      description: "Opening live tracking...",
    });
  };

  const handleViewDetails = (orderId: string) => {
    toast.info(`Viewing details for order ${orderId}`);
  };

  const handleReorder = (orderId: string) => {
    toast.success("Items added to cart!", {
      description: "Ready to checkout your reorder.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <OrdersHeader />

      <main className="container mx-auto py-8 px-4">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
              <p className="text-muted-foreground">Track and manage your orders</p>
            </div>
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <OrderTabs 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
              ongoingCount={mockOngoingOrders.length}
              pastCount={mockPastOrders.length}
            />
          </Tabs>
          
          {activeTab === "past" && (
            <OrderFilters 
              selectedFilter={selectedFilter} 
              onFilterChange={setSelectedFilter} 
            />
          )}
        </div>

        {/* Orders Content */}
        <div className="space-y-6">
          {activeTab === "ongoing" && (
            <>
              {mockOngoingOrders.length > 0 ? (
                <div className="grid gap-6 lg:grid-cols-2">
                  {mockOngoingOrders.map((order) => (
                    <OngoingOrderCard
                      key={order.id}
                      order={order}
                      onTrack={handleTrackOrder}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <EmptyOrderState type="ongoing" />
              )}
            </>
          )}

          {activeTab === "past" && (
            <>
              {mockPastOrders.length > 0 ? (
                <div className="grid gap-6 lg:grid-cols-2">
                  {mockPastOrders.map((order) => (
                    <PastOrderCard
                      key={order.id}
                      order={order}
                      onViewDetails={handleViewDetails}
                      onReorder={handleReorder}
                    />
                  ))}
                </div>
              ) : (
                <EmptyOrderState type="past" />
              )}
            </>
          )}
        </div>

        {/* Order Statistics */}
        {activeTab === "past" && mockPastOrders.length > 0 && (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-2xl border border-border p-6 text-center">
              <p className="text-3xl font-bold text-primary">{mockPastOrders.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Orders</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 text-center">
              <p className="text-3xl font-bold text-success">
                {mockPastOrders.filter(o => o.status === "delivered").length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Delivered</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 text-center">
              <p className="text-3xl font-bold text-foreground">
                ₹{mockPastOrders.reduce((acc, o) => acc + o.totalAmount, 0)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Total Spent</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 text-center">
              <p className="text-3xl font-bold text-rating">4.8</p>
              <p className="text-sm text-muted-foreground mt-1">Avg Rating Given</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyOrders;
