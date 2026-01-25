import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Shield, Edit3, Save, X, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface ProfileInformationProps {
  user: {
    name: string;
    email: string;
    phone: string;
  };
  onUpdate: (data: { name: string; email: string; phone: string }) => void;
}

const ProfileInformation = ({ user, onUpdate }: ProfileInformationProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Profile Information</h2>
          <p className="text-muted-foreground mt-1">Manage your personal details</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleCancel} variant="ghost" size="icon">
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2 text-foreground">
            <User className="w-4 h-4 text-muted-foreground" />
            Full Name
          </Label>
          {isEditing ? (
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12"
              placeholder="Enter your full name"
            />
          ) : (
            <div className="h-12 px-4 flex items-center bg-secondary rounded-xl text-foreground">
              {user.name}
            </div>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2 text-foreground">
            <Phone className="w-4 h-4 text-muted-foreground" />
            Phone Number
            <Badge variant="outline" className="gap-1 text-success border-success/30 bg-success/10">
              <CheckCircle2 className="w-3 h-3" />
              Verified
            </Badge>
          </Label>
          {isEditing ? (
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-12"
              placeholder="Enter your phone number"
            />
          ) : (
            <div className="h-12 px-4 flex items-center bg-secondary rounded-xl text-foreground">
              {user.phone}
            </div>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2 text-foreground">
            <Mail className="w-4 h-4 text-muted-foreground" />
            Email Address
            <Badge variant="outline" className="gap-1 text-success border-success/30 bg-success/10">
              <CheckCircle2 className="w-3 h-3" />
              Verified
            </Badge>
          </Label>
          {isEditing ? (
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-12"
              placeholder="Enter your email address"
            />
          ) : (
            <div className="h-12 px-4 flex items-center bg-secondary rounded-xl text-foreground">
              {user.email}
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} size="lg" className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      )}

      {/* Security Note */}
      <div className="mt-8 p-4 bg-secondary/50 rounded-xl flex items-start gap-3">
        <Shield className="w-5 h-5 text-success mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground">Your information is safe with us</p>
          <p className="text-xs text-muted-foreground mt-1">
            We use industry-standard encryption to protect your personal data. Your information will never be shared without your consent.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
