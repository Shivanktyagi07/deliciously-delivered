import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrdersHeader from "@/components/orders/OrdersHeader";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileInformation from "@/components/profile/ProfileInformation";
import SavedAddresses from "@/components/profile/SavedAddresses";
import FavoritesSection from "@/components/profile/FavoritesSection";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import type { Address } from "@/components/profile/AddressCard";

// Mock data
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 98765 43210",
  avatar: undefined,
};

const mockAddresses: Address[] = [
  {
    id: "addr-1",
    type: "home",
    label: "My Home",
    fullAddress: "123, Civil Lines, Near City Mall, Prayagraj, Uttar Pradesh 211001",
    landmark: "Near City Mall",
    isDefault: true,
  },
  {
    id: "addr-2",
    type: "work",
    label: "Office",
    fullAddress: "456, MG Road, Tech Park Building, Floor 5, Prayagraj, UP 211002",
    landmark: "Opposite Metro Station",
    isDefault: false,
  },
];

const mockFavorites = [
  {
    id: "rest-1",
    name: "Royal Biryani House",
    image: "/src/assets/restaurant-1.jpg",
    rating: 4.5,
    deliveryTime: "25-30 mins",
    cuisines: ["Indian", "Biryani", "Mughlai"],
    location: "Civil Lines",
  },
  {
    id: "rest-2",
    name: "Pizza Paradise",
    image: "/src/assets/restaurant-2.jpg",
    rating: 4.3,
    deliveryTime: "20-25 mins",
    cuisines: ["Italian", "Pizza", "Pasta"],
    location: "MG Road",
  },
];

const Profile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");
  const [user, setUser] = useState(mockUser);
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [favorites, setFavorites] = useState(mockFavorites);

  const handleSectionChange = (section: string) => {
    if (section === "orders") {
      navigate("/orders");
    } else {
      setActiveSection(section);
    }
  };

  const handleProfileUpdate = (data: { name: string; email: string; phone: string }) => {
    setUser({ ...user, ...data });
  };

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter((f) => f.id !== id));
    toast.success("Removed from favorites");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileInformation user={user} onUpdate={handleProfileUpdate} />;
      case "addresses":
        return <SavedAddresses addresses={addresses} onAddressesChange={setAddresses} />;
      case "favorites":
        return <FavoritesSection favorites={favorites} onRemove={handleRemoveFavorite} />;
      default:
        return <ProfileInformation user={user} onUpdate={handleProfileUpdate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <OrdersHeader />

      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <ProfileSidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            user={user}
          />

          {/* Main Content */}
          <div className="flex-1">{renderContent()}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
