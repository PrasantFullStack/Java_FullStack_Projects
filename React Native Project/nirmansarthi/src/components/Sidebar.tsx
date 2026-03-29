import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  User,
  Boxes,
  CreditCard,
  BarChart3,
  RotateCcw,
  Headphones,
  Settings,
  ShieldCheck,
} from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/vendor/dashboard" },
    { name: "Orders", icon: ShoppingCart, path: "/orders" },
    { name: "Vendors", icon: Users, path: "/admin/vendors" },
    { name: "Buyers", icon: User, path: "/admin/buyers" },
    { name: "Categories", icon: Boxes, path: "/admin/categories" },
    { name: "Payments", icon: CreditCard, path: "/admin/payments" },
    { name: "Reports", icon: BarChart3, path: "/admin/reports" },
    { name: "Returns", icon: RotateCcw, path: "/admin/returns" },
    { name: "Support", icon: Headphones, path: "/admin/support" },
    { name: "Admins", icon: ShieldCheck, path: "/admin/admins" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-blue-800 text-white flex flex-col">
      {/* Logo */}
      <div className="p-5 text-xl font-bold border-b border-blue-700">
        NirmanSarthi
      </div>

      {/* Menu */}
      <div className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-blue-700"
                }`
              }
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 text-xs border-t border-blue-700">
        © 2026 NirmanSarthi. All rights reserved.
      </div>
    </div>
  );
}


