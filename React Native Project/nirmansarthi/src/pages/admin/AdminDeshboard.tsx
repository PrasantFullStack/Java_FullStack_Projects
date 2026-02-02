import { motion } from "framer-motion";
import { Users, Package, ShoppingCart, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg p-5 min-h-screen transition-all ${
          open ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-3">
          <button className="w-full text-left p-2 rounded hover:bg-gray-100">
            Dashboard
          </button>
          <button className="w-full text-left p-2 rounded hover:bg-gray-100">
            Users
          </button>
          <button className="w-full text-left p-2 rounded hover:bg-gray-100">
            Products
          </button>
          <button className="w-full text-left p-2 rounded hover:bg-gray-100">
            Orders
          </button>
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-2 mt-10 text-red-500"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Menu
              onClick={() => setOpen(!open)}
              className="cursor-pointer"
            />
            <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
          </div>
          <p className="text-sm text-gray-500">Welcome Admin</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white p-5 rounded-xl shadow"
          >
            <Users />
            <h3 className="text-gray-500 text-sm">Total Users</h3>
            <p className="text-xl font-bold">120</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white p-5 rounded-xl shadow"
          >
            <Package />
            <h3 className="text-gray-500 text-sm">Products</h3>
            <p className="text-xl font-bold">340</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white p-5 rounded-xl shadow"
          >
            <ShoppingCart />
            <h3 className="text-gray-500 text-sm">Orders</h3>
            <p className="text-xl font-bold">89</p>
          </motion.div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
          <h2 className="font-semibold mb-3">Recent Users</h2>

          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="p-2">Name</th>
                <th className="p-2">Role</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="p-2">Prashant</td>
                <td className="p-2">SELLER</td>
                <td className="p-2 text-green-600">Active</td>
              </tr>
              <tr className="border-t">
                <td className="p-2">Amit</td>
                <td className="p-2">BUYER</td>
                <td className="p-2 text-green-600">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
