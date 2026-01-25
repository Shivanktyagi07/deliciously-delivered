import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Home, Briefcase, MapPinned, Edit2, Trash2, Star } from "lucide-react";

export interface Address {
  id: string;
  type: "home" | "work" | "other";
  label: string;
  fullAddress: string;
  landmark?: string;
  isDefault: boolean;
}

interface AddressCardProps {
  address: Address;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

const typeIcons = {
  home: Home,
  work: Briefcase,
  other: MapPinned,
};

const typeColors = {
  home: "bg-primary/10 text-primary",
  work: "bg-blue-500/10 text-blue-600",
  other: "bg-purple-500/10 text-purple-600",
};

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }: AddressCardProps) => {
  const Icon = typeIcons[address.type];

  return (
    <div className={`bg-card rounded-2xl border-2 p-5 transition-all duration-200 hover:shadow-card-hover ${
      address.isDefault ? "border-primary shadow-card" : "border-border"
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColors[address.type]}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{address.label}</h3>
              {address.isDefault && (
                <Badge className="bg-primary/10 text-primary border-0 gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Default
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground capitalize">{address.type}</span>
          </div>
        </div>
      </div>

      {/* Address Details */}
      <div className="flex items-start gap-2 mb-4">
        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm text-foreground">{address.fullAddress}</p>
          {address.landmark && (
            <p className="text-xs text-muted-foreground mt-1">Landmark: {address.landmark}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-border">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onEdit(address.id)}
          className="gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onDelete(address.id)}
          className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
        {!address.isDefault && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onSetDefault(address.id)}
            className="gap-1.5 text-primary hover:text-primary hover:bg-primary/10 ml-auto"
          >
            <Star className="w-4 h-4" />
            Set as Default
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
