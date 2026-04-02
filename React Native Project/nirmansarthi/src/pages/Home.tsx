import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Layers,
  HardHat,
  Droplets,
  Wrench,
  Paintbrush,
  Zap,
  Truck,
  Bell,
  ChevronRight,
} from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { CategoryCard } from "@/components/CategoryCard";
import { VendorCard } from "@/components/VendorCard";
import { ProductCard } from "@/components/ProductCard";
import { BottomNav } from "@/components/BottomNav";
// Sample data for categories, vendors, and products
const categories = [
  { icon: <Building2 className="h-6 w-6" />, name: "Cement", count: 45 },
  { icon: <Layers className="h-6 w-6" />, name: "Steel", count: 32 },
  { icon: <HardHat className="h-6 w-6" />, name: "Bricks", count: 28 },
  { icon: <Droplets className="h-6 w-6" />, name: "Sand", count: 18 },
  { icon: <Wrench className="h-6 w-6" />, name: "Tools", count: 56 },
  { icon: <Paintbrush className="h-6 w-6" />, name: "Paint", count: 42 },
  { icon: <Zap className="h-6 w-6" />, name: "Electric", count: 38 },
  { icon: <Truck className="h-6 w-6" />, name: "Aggregates", count: 24 },
];
// Sample data for vendors and products
const vendors = [
  {
    id: "1",
    name: "Shree Cement Traders",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 234,
    location: "Sector 62",
    deliveryTime: "2-3 days",
    isVerified: true,
    discount: "15% OFF",
  },
  {
    id: "2",
    name: "Delhi Steel Suppliers",
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 189,
    location: "Noida",
    deliveryTime: "1-2 days",
    isVerified: true,
  },
];

const products = [
  {
    id: "p1",
    name: "UltraTech PPC Cement 50kg",
    image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=300&h=300&fit=crop",
    price: 390,
    unit: "bag",
    gst: 28,
    vendorName: "Shree Cement Traders",
    inStock: true,
  },
  {
    id: "p2",
    name: "TMT Steel Bars 12mm",
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=300&h=300&fit=crop",
    price: 5850,
    unit: "quintal",
    gst: 18,
    vendorName: "Delhi Steel Suppliers",
    inStock: true,
  },
  {
    id: "p3",
    name: "Red Clay Bricks (1000 pcs)",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    price: 6500,
    unit: "lot",
    gst: 5,
    vendorName: "Noida Bricks Co.",
    inStock: true,
  },
  {
    id: "p4",
    name: "River Sand Fine Grade",
    image: "https://images.unsplash.com/photo-1594125312108-f26e7a85f66c?w=300&h=300&fit=crop",
    price: 2200,
    unit: "ton",
    gst: 5,
    vendorName: "Sand & Aggregates Ltd",
    inStock: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-primary px-4 pt-12 pb-6 safe-top">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-primary-foreground/80 text-sm">Good morning 👋</p>
            <h1 className="text-xl font-bold text-primary-foreground">
              NirmanSarthi
            </h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="relative w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
          >
            <Bell className="h-5 w-5 text-primary-foreground" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-accent" />
          </motion.button>
        </div>
        <SearchBar onSearchClick={() => navigate("/search")} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 -mt-2"
      >
        {/* Categories */}
        <motion.section variants={itemVariants} className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Categories</h2>
            <button className="text-sm text-primary font-medium flex items-center">
              See all <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </motion.section>

        {/* Promo Banner */}
        <motion.section variants={itemVariants} className="mt-6">
          <div className="relative h-32 rounded-2xl overflow-hidden bg-gradient-accent">
            <div className="absolute inset-0 p-4 flex flex-col justify-center">
              <p className="text-accent-foreground/80 text-xs font-medium">
                LIMITED TIME OFFER
              </p>
              <h3 className="text-xl font-bold text-accent-foreground mt-1">
                Get 20% OFF
              </h3>
              <p className="text-accent-foreground/90 text-sm mt-0.5">
                On your first order
              </p>
              <button className="mt-2 px-4 py-1.5 bg-card text-accent text-sm font-semibold rounded-full w-fit">
                Shop Now
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-accent-foreground/10" />
            <div className="absolute -right-8 top-0 w-24 h-24 rounded-full bg-accent-foreground/5" />
          </div>
        </motion.section>

        {/* Top Vendors */}
        <motion.section variants={itemVariants} className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">
              Top Vendors
            </h2>
            <button className="text-sm text-primary font-medium flex items-center">
              See all <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                {...vendor}
                onClick={() => navigate(`/vendor/${vendor.id}`)}
              />
            ))}
          </div>
        </motion.section>

        {/* Popular Products */}
        <motion.section variants={itemVariants} className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">
              Popular Products
            </h2>
            <button className="text-sm text-primary font-medium flex items-center">
              See all <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </motion.section>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default Home;
