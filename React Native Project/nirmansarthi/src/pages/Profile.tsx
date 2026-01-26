import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User,
  Wallet,
  MapPin,
  Package,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  Bell,
} from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

const menuItems = [
  { icon: Wallet, label: "My Wallet", value: "₹2,450", path: "/wallet" },
  { icon: MapPin, label: "Saved Addresses", value: "3 addresses", path: "/addresses" },
  { icon: Package, label: "My Orders", value: "", path: "/orders" },
  { icon: Bell, label: "Notifications", value: "", path: "/notifications" },
  { icon: Star, label: "Rate Us", value: "", path: "/rate" },
  { icon: HelpCircle, label: "Help & Support", value: "", path: "/support" },
  { icon: Settings, label: "Settings", value: "", path: "/settings" },
];

export const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-primary px-4 pt-12 pb-8 safe-top">
        <h1 className="text-xl font-bold text-primary-foreground mb-6">
          My Profile
        </h1>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-4 shadow-elevated"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">
                Rajesh Kumar
              </h2>
              <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-3 w-3 fill-warning text-warning" />
                <span className="text-xs text-muted-foreground">
                  Premium Member
                </span>
              </div>
            </div>
            <button className="px-3 py-1.5 text-sm font-medium text-primary border border-primary rounded-lg">
              Edit
            </button>
          </div>
        </motion.div>
      </div>

      {/* Menu Items */}
      <div className="px-4 -mt-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 ${
                  index !== menuItems.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                </div>
                {item.value && (
                  <span className="text-sm text-muted-foreground">
                    {item.value}
                  </span>
                )}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </motion.button>
            );
          })}
        </motion.div>

        {/* Logout Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3.5 bg-destructive/10 rounded-2xl"
        >
          <LogOut className="h-5 w-5 text-destructive" />
          <span className="text-sm font-medium text-destructive">Logout</span>
        </motion.button>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          NirmanSarthi v1.0.0
        </p>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
