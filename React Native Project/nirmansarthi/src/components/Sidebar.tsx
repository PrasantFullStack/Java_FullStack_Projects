import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Store,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menus = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { name: "Vendors", path: "/admin/vendors", icon: Store },
  { name: "Buyers", path: "/admin/buyers", icon: Users },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-3 fixed top-3 left-3 z-50 bg-white shadow rounded"
      >
        <Menu />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-blue-700 text-white transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-5 text-2xl font-bold border-b flex justify-between">
          NirmanSarthi
          <button onClick={() => setOpen(false)} className="md:hidden">
            <X />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menus.map((m) => {
            const active = location.pathname === m.path;
            return (
              <Link
                key={m.name}
                to={m.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 p-3 rounded transition ${
                  active ? "bg-blue-600" : "hover:bg-blue-600"
                }`}
              >
                <m.icon size={20} />
                {m.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
