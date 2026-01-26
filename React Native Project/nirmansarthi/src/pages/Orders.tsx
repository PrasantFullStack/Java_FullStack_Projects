import { motion } from "framer-motion";
import { ArrowLeft, Package, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";

const orders = [
  {
    id: "ORD001",
    date: "15 Jan 2025",
    status: "Delivered",
    statusColor: "text-success",
    items: 3,
    total: 15450,
    image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=100&h=100&fit=crop",
  },
  {
    id: "ORD002",
    date: "12 Jan 2025",
    status: "In Transit",
    statusColor: "text-primary",
    items: 2,
    total: 8900,
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=100&h=100&fit=crop",
  },
  {
    id: "ORD003",
    date: "10 Jan 2025",
    status: "Processing",
    statusColor: "text-warning",
    items: 5,
    total: 24500,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
  },
];

export const Orders = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 safe-top">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">My Orders</h1>
        </div>
      </header>

      {/* Orders List */}
      <div className="px-4 py-4 space-y-3">
        {orders.map((order, index) => (
          <motion.button
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/order/${order.id}`)}
            className="w-full bg-card rounded-2xl border border-border shadow-card p-4 text-left"
          >
            <div className="flex items-center gap-3">
              <img
                src={order.image}
                alt=""
                className="w-14 h-14 rounded-lg object-cover bg-muted"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">
                    {order.id}
                  </p>
                  <span className={`text-xs font-medium ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {order.date} • {order.items} items
                </p>
                <p className="text-sm font-bold text-foreground mt-1">
                  ₹{order.total.toLocaleString("en-IN")}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </div>
          </motion.button>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center px-6 py-20">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <Package className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            No orders yet
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Start shopping to see your orders here
          </p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/home")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold"
          >
            Browse Products
          </motion.button>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Orders;
