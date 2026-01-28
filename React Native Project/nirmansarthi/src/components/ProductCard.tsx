import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
// Define props for ProductCard component
interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  unit: string;
  gst: number;
  vendorName: string;
  inStock?: boolean;
  className?: string;
}

export const ProductCard = ({
  id,
  name,
  image,
  price,
  unit,
  gst,
  vendorName,
  inStock = true,
  className,
}: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const { addItem, updateQuantity, items } = useCart();

  const cartItem = items.find((item) => item.id === id);
  const currentQty = cartItem?.quantity || quantity;

  const handleAdd = () => {
    if (currentQty === 0) {
      addItem({
        id,
        name,
        price,
        quantity: 1,
        unit,
        image,
        vendorName,
        gst,
      });
      setQuantity(1);
    } else {
      updateQuantity(id, currentQty + 1);
      setQuantity(currentQty + 1);
    }
  };

  const handleRemove = () => {
    if (currentQty > 0) {
      updateQuantity(id, currentQty - 1);
      setQuantity(Math.max(0, currentQty - 1));
    }
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className={cn(
        "bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden",
        !inStock && "opacity-60",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-28 bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {!inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="text-xs font-semibold text-destructive">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="text-[10px] text-muted-foreground truncate">
          {vendorName}
        </p>
        <h3 className="font-medium text-sm text-foreground line-clamp-2 mt-0.5 min-h-[2.5rem]">
          {name}
        </h3>

        <div className="flex items-end justify-between mt-2">
          <div>
            <p className="text-base font-bold text-foreground">
              ₹{price.toLocaleString("en-IN")}
            </p>
            <p className="text-[10px] text-muted-foreground">
              per {unit} • +{gst}% GST
            </p>
          </div>

          {inStock && (
            <div className="flex items-center">
              {currentQty > 0 ? (
                <div className="flex items-center gap-2 bg-primary rounded-full px-1 py-0.5">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleRemove}
                    className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center"
                  >
                    <Minus className="h-3 w-3 text-primary-foreground" />
                  </motion.button>
                  <span className="text-sm font-semibold text-primary-foreground min-w-[1.25rem] text-center">
                    {currentQty}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAdd}
                    className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center"
                  >
                    <Plus className="h-3 w-3 text-primary-foreground" />
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAdd}
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md"
                >
                  <Plus className="h-4 w-4 text-primary-foreground" />
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
