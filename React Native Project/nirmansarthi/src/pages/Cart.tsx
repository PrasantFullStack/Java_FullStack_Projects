import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, Trash2, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { BottomNav } from "@/components/BottomNav";

export const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, subtotal, gstAmount, total } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 safe-top">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <h1 className="text-lg font-semibold text-foreground">My Cart</h1>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center px-6 py-20">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <Trash2 className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Your cart is empty
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Add products to your cart to place an order
          </p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/home")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold"
          >
            Browse Products
          </motion.button>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-48">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 safe-top">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">
            My Cart ({items.length})
          </h1>
        </div>
      </header>

      {/* Delivery Info */}
      <div className="px-4 py-3">
        <div className="bg-card rounded-xl p-3 border border-border shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Deliver to: Sector 62, Noida
              </p>
              <p className="text-xs text-muted-foreground">
                201301, Uttar Pradesh
              </p>
            </div>
            <button className="text-sm text-primary font-medium">Change</button>
          </div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
            <Clock className="h-4 w-4 text-success" />
            <span className="text-xs text-success font-medium">
              Delivery in 2-3 business days
            </span>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-4">
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex gap-3 p-3 ${
                index !== items.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover bg-muted"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-muted-foreground">
                  {item.vendorName}
                </p>
                <h3 className="text-sm font-medium text-foreground line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  ₹{item.price}/{item.unit} • +{item.gst}% GST
                </p>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm font-bold text-foreground">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-full text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                    <div className="flex items-center gap-2 bg-muted rounded-full px-1 py-0.5">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded-full bg-card flex items-center justify-center shadow-sm"
                      >
                        <Minus className="h-3 w-3 text-foreground" />
                      </motion.button>
                      <span className="text-sm font-semibold text-foreground min-w-[1.25rem] text-center">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded-full bg-card flex items-center justify-center shadow-sm"
                      >
                        <Plus className="h-3 w-3 text-foreground" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-card border-t border-border px-4 py-4 safe-bottom">
        <div className="max-w-lg mx-auto">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">GST</span>
              <span className="text-foreground">
                ₹{gstAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span className="text-success font-medium">FREE</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-lg text-foreground">
                ₹{total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 rounded-xl bg-gradient-accent text-accent-foreground font-semibold text-base shadow-lg"
          >
            Proceed to Checkout
          </motion.button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Cart;
