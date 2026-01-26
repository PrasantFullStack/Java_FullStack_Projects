import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search as SearchIcon, X, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { BottomNav } from "@/components/BottomNav";

const recentSearches = ["Cement", "TMT Steel", "Bricks", "Sand"];
const popularCategories = ["Cement", "Steel", "Bricks", "Sand", "Paint", "Tools"];

const allProducts = [
  {
    id: "s1",
    name: "ACC Cement 50kg",
    image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=300&h=300&fit=crop",
    price: 380,
    unit: "bag",
    gst: 28,
    vendorName: "ABC Traders",
    inStock: true,
  },
  {
    id: "s2",
    name: "Ambuja Cement PPC",
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=300&h=300&fit=crop",
    price: 395,
    unit: "bag",
    gst: 28,
    vendorName: "Cement World",
    inStock: true,
  },
  {
    id: "s3",
    name: "TMT Steel Bars 8mm",
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=300&h=300&fit=crop",
    price: 5600,
    unit: "quintal",
    gst: 18,
    vendorName: "Steel Hub",
    inStock: true,
  },
  {
    id: "s4",
    name: "Fly Ash Bricks",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    price: 5500,
    unit: "1000 pcs",
    gst: 5,
    vendorName: "Brick Masters",
    inStock: true,
  },
];

export const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 safe-top">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-muted">
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(e.target.value.length > 0);
              }}
              placeholder="Search materials, vendors..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              autoFocus
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setShowResults(false);
                }}
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <button className="p-2 rounded-xl bg-muted">
            <SlidersHorizontal className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </header>

      {!showResults ? (
        <div className="px-4 py-4">
          {/* Recent Searches */}
          <section className="mb-6">
            <h2 className="text-sm font-semibold text-foreground mb-3">
              Recent Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search) => (
                <motion.button
                  key={search}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSearch(search)}
                  className="px-3 py-1.5 rounded-full bg-muted text-sm text-foreground"
                >
                  {search}
                </motion.button>
              ))}
            </div>
          </section>

          {/* Popular Categories */}
          <section>
            <h2 className="text-sm font-semibold text-foreground mb-3">
              Popular Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {popularCategories.map((category) => (
                <motion.button
                  key={category}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSearch(category)}
                  className="px-4 py-2 rounded-xl bg-primary/10 text-sm font-medium text-primary"
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="px-4 py-4">
          <p className="text-sm text-muted-foreground mb-4">
            {allProducts.length} results for "{query}"
          </p>
          <div className="grid grid-cols-2 gap-3">
            {allProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default SearchPage;
