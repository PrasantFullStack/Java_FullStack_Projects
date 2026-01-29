import { Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";
// Define props for SearchBar component
interface SearchBarProps {
  placeholder?: string;
  location?: string;
  onSearchClick?: () => void;
  onLocationClick?: () => void;
}

export const SearchBar = ({
  placeholder = "Search materials, vendors...",
  location = "Noida, UP",
  onSearchClick,
  onLocationClick,
}: SearchBarProps) => {
  return (
    <div className="flex items-center gap-2">
      {/* Location Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onLocationClick}
        className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-card border border-border shadow-sm"
      >
        <MapPin className="h-4 w-4 text-accent" />
        <span className="text-xs font-medium text-foreground max-w-[60px] truncate">
          {location}
        </span>
      </motion.button>

      {/* Search Input */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onSearchClick}
        className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border shadow-sm"
      >
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{placeholder}</span>
      </motion.button>
    </div>
  );
};
