import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, MapPin } from "lucide-react";
import AddressCard, { type Address } from "./AddressCard";
import AddAddressModal from "./AddAddressModal";
import { toast } from "sonner";

interface SavedAddressesProps {
  addresses: Address[];
  onAddressesChange: (addresses: Address[]) => void;
}

const SavedAddresses = ({ addresses, onAddressesChange }: SavedAddressesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleAddAddress = (newAddress: Omit<Address, "id">) => {
    const address: Address = {
      ...newAddress,
      id: `addr-${Date.now()}`,
    };

    // If new address is default, remove default from others
    let updatedAddresses = addresses;
    if (newAddress.isDefault) {
      updatedAddresses = addresses.map((a) => ({ ...a, isDefault: false }));
    }

    onAddressesChange([...updatedAddresses, address]);
  };

  const handleEditAddress = (id: string) => {
    const address = addresses.find((a) => a.id === id);
    if (address) {
      setEditingAddress(address);
      setIsModalOpen(true);
    }
  };

  const handleUpdateAddress = (updatedData: Omit<Address, "id">) => {
    if (!editingAddress) return;

    let updatedAddresses = addresses.map((a) => {
      if (a.id === editingAddress.id) {
        return { ...a, ...updatedData };
      }
      // If updated address is default, remove default from others
      if (updatedData.isDefault) {
        return { ...a, isDefault: false };
      }
      return a;
    });

    onAddressesChange(updatedAddresses);
    setEditingAddress(null);
  };

  const handleDeleteAddress = (id: string) => {
    const address = addresses.find((a) => a.id === id);
    onAddressesChange(addresses.filter((a) => a.id !== id));
    toast.success(`"${address?.label}" address deleted`);
  };

  const handleSetDefault = (id: string) => {
    const updatedAddresses = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    onAddressesChange(updatedAddresses);
    toast.success("Default address updated");
  };

  const handleModalClose = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setEditingAddress(null);
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Saved Addresses</h2>
          <p className="text-muted-foreground mt-1">Manage your delivery addresses</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add New Address
        </Button>
      </div>

      {/* Addresses Grid */}
      {addresses.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddress}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <MapPin className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No saved addresses yet</h3>
          <p className="text-muted-foreground text-center max-w-sm mb-6">
            Add your delivery addresses for a faster checkout experience
          </p>
          <Button onClick={() => setIsModalOpen(true)} size="lg" className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Address
          </Button>
        </div>
      )}

      {/* Add/Edit Address Modal */}
      <AddAddressModal
        open={isModalOpen}
        onOpenChange={handleModalClose}
        onSave={editingAddress ? handleUpdateAddress : handleAddAddress}
        editAddress={editingAddress}
      />
    </div>
  );
};

export default SavedAddresses;
