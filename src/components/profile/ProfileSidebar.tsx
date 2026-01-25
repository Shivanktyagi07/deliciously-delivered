import { User, MapPin, Heart, Package, LogOut, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ProfileSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  user: {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
}

const menuItems = [
  { id: "profile", label: "Profile Information", icon: User },
  { id: "addresses", label: "Saved Addresses", icon: MapPin },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "favorites", label: "Favorites", icon: Heart },
];

const ProfileSidebar = ({ activeSection, onSectionChange, user }: ProfileSidebarProps) => {
  return (
    <aside className="w-full lg:w-80 bg-card rounded-2xl border border-border shadow-card p-6">
      {/* User Info */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-primary/20">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-primary" />
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-card">
            <Shield className="w-4 h-4 text-success-foreground" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <p className="text-sm text-muted-foreground">{user.phone}</p>
      </div>

      <Separator className="mb-6" />

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-primary"
                  : "text-foreground hover:bg-secondary"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <Separator className="my-6" />

      {/* Logout */}
      <Button 
        variant="ghost" 
        className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </Button>
    </aside>
  );
};

export default ProfileSidebar;
