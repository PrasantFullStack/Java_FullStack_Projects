import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { ShoppingBag, Package, Heart, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BuyerProfile() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
        <Sidebar />

      {/* Main */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Buyer Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-5 rounded-xl shadow"
          >
            <ShoppingBag className="mb-2" />
            <h3 className="text-sm text-gray-500">Total Orders</h3>
            <p className="text-xl font-bold">8</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-5 rounded-xl shadow"
          >
            <Package className="mb-2" />
            <h3 className="text-sm text-gray-500">In Progress</h3>
            <p className="text-xl font-bold">3</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-5 rounded-xl shadow"
          >
            <Heart className="mb-2" />
            <h3 className="text-sm text-gray-500">Wishlist</h3>
            <p className="text-xl font-bold">5</p>
          </motion.div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="font-semibold mb-4">Recent Orders</h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th>Order ID</th>
                <th>Item</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td>#201</td>
                <td>Bricks</td>
                <td className="text-green-600">Delivered</td>
                <td>₹900</td>
              </tr>
              <tr className="border-t">
                <td>#202</td>
                <td>Sand</td>
                <td className="text-yellow-600">Processing</td>
                <td>₹1500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
