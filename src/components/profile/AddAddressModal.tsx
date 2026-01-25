import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Home, Briefcase, MapPinned, MapPin, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Address } from "./AddressCard";

interface AddAddressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (address: Omit<Address, "id">) => void;
  editAddress?: Address | null;
}

const addressTypes = [
  { id: "home", label: "Home", icon: Home },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "other", label: "Other", icon: MapPinned },
] as const;

const AddAddressModal = ({ open, onOpenChange, onSave, editAddress }: AddAddressModalProps) => {
  const [selectedType, setSelectedType] = useState<"home" | "work" | "other">(
    editAddress?.type || "home"
  );
  const [formData, setFormData] = useState({
    label: editAddress?.label || "",
    fullAddress: editAddress?.fullAddress || "",
    landmark: editAddress?.landmark || "",
  });
  const [isDefault, setIsDefault] = useState(editAddress?.isDefault || false);

  const handleSave = () => {
    if (!formData.label.trim()) {
      toast.error("Please enter an address label");
      return;
    }
    if (!formData.fullAddress.trim()) {
      toast.error("Please enter the full address");
      return;
    }

    onSave({
      type: selectedType,
      label: formData.label,
      fullAddress: formData.fullAddress,
      landmark: formData.landmark,
      isDefault,
    });

    // Reset form
    setFormData({ label: "", fullAddress: "", landmark: "" });
    setSelectedType("home");
    setIsDefault(false);
    onOpenChange(false);
    
    toast.success(editAddress ? "Address updated successfully!" : "Address added successfully!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {editAddress ? "Edit Address" : "Add New Address"}
          </DialogTitle>
          <DialogDescription>
            {editAddress ? "Update your delivery address details" : "Add a new delivery address to your account"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Address Type Selector */}
          <div className="space-y-3">
            <Label>Address Type</Label>
            <div className="grid grid-cols-3 gap-3">
              {addressTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.id;
                
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                      isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Address Label */}
          <div className="space-y-2">
            <Label htmlFor="label">Address Label</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="e.g., My Home, Office, Mom's Place"
              className="h-12"
            />
          </div>

          {/* Full Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Textarea
              id="address"
              value={formData.fullAddress}
              onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
              placeholder="Enter your complete address with house/flat number, street, area, city, and pincode"
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Landmark */}
          <div className="space-y-2">
            <Label htmlFor="landmark">Landmark (Optional)</Label>
            <Input
              id="landmark"
              value={formData.landmark}
              onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
              placeholder="e.g., Near City Mall, Opposite Park"
              className="h-12"
            />
          </div>

          {/* Map Preview Placeholder */}
          <div className="rounded-xl border border-border bg-secondary/30 p-6 flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Map preview will be shown here
            </p>
          </div>

          {/* Set as Default */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-foreground">Set as default delivery address</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            {editAddress ? "Update Address" : "Save Address"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModal;
