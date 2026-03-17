import { SearchBar } from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { LayoutDashboard, ShoppingCart, Users, Store, Settings } from "lucide-react";
// Dummy Data
const orders = [
  { id: "ORD101", customer: "Rahul", vendor: "Sharma Traders", amount: "₹7,200", pay: "Paid", status: "Delivered" },
  { id: "ORD102", customer: "Amit", vendor: "Verma Cement", amount: "₹5,300", pay: "COD", status: "Pending" },
  { id: "ORD103", customer: "Neha", vendor: "Singh Bricks", amount: "₹3,100", pay: "Paid", status: "Shipped" },
];

// add more dummy data as needed
export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
        <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <SearchBar  />
          <div className="flex items-center gap-3">
            <span className="font-medium">Hello, Admin</span>
            <img
              src="https://i.pravatar.cc/40"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Content */}
        <main className="p-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow p-5"
          >
            <h3 className="font-semibold text-lg mb-4">Orders</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Order ID</th>
                    <th className="p-3 text-left">Customer</th>
                    <th className="p-3 text-left">Vendor</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Payment</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{o.id}</td>
                      <td className="p-3">{o.customer}</td>
                      <td className="p-3">{o.vendor}</td>
                      <td className="p-3">{o.amount}</td>
                      <td className="p-3">{o.pay}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          o.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : o.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

        </main>
      </div>
    </div>
  );
}

function Menu({ icon, label }: any) {
  return (
    <div className="flex items-center gap-3 p-3 rounded hover:bg-blue-600 cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
  );
}




// import { motion } from "framer-motion";
// import { Users, Package, ShoppingCart, LogOut, Menu } from "lucide-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AdminDashboard() {
//   const [open, setOpen] = useState(true);
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <aside
//         className={`bg-white shadow-lg p-5 min-h-screen transition-all ${
//           open ? "w-64" : "w-0 overflow-hidden"
//         }`}
//       >
//         <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

//         <nav className="space-y-3">
//           <button className="w-full text-left p-2 rounded hover:bg-gray-100">
//             Dashboard
//           </button>
//           <button className="w-full text-left p-2 rounded hover:bg-gray-100">
//             Users
//           </button>
//           <button className="w-full text-left p-2 rounded hover:bg-gray-100">
//             Products
//           </button>
//           <button className="w-full text-left p-2 rounded hover:bg-gray-100">
//             Orders
//           </button>
//         </nav>

//         <button
//           onClick={logout}
//           className="flex items-center gap-2 mt-10 text-red-500"
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-4 md:p-6">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <Menu
//               onClick={() => setOpen(!open)}
//               className="cursor-pointer"
//             />
//             <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
//           </div>
//           <p className="text-sm text-gray-500">Welcome Admin</p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//           <motion.div
//             whileHover={{ scale: 1.03 }}
//             className="bg-white p-5 rounded-xl shadow"
//           >
//             <Users />
//             <h3 className="text-gray-500 text-sm">Total Users</h3>
//             <p className="text-xl font-bold">120</p>
//           </motion.div>

//           <motion.div
//             whileHover={{ scale: 1.03 }}
//             className="bg-white p-5 rounded-xl shadow"
//           >
//             <Package />
//             <h3 className="text-gray-500 text-sm">Products</h3>
//             <p className="text-xl font-bold">340</p>
//           </motion.div>

//           <motion.div
//             whileHover={{ scale: 1.03 }}
//             className="bg-white p-5 rounded-xl shadow"
//           >
//             <ShoppingCart />
//             <h3 className="text-gray-500 text-sm">Orders</h3>
//             <p className="text-xl font-bold">89</p>
//           </motion.div>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
//           <h2 className="font-semibold mb-3">Recent Users</h2>

//           <table className="min-w-full text-sm">
//             <thead>
//               <tr className="text-left text-gray-500">
//                 <th className="p-2">Name</th>
//                 <th className="p-2">Role</th>
//                 <th className="p-2">Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               <tr className="border-t">
//                 <td className="p-2">Prashant</td>
//                 <td className="p-2">SELLER</td>
//                 <td className="p-2 text-green-600">Active</td>
//               </tr>
//               <tr className="border-t">
//                 <td className="p-2">Amit</td>
//                 <td className="p-2">BUYER</td>
//                 <td className="p-2 text-green-600">Active</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }
