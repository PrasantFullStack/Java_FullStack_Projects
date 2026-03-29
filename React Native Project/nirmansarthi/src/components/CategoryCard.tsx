import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
// Define props for CategoryCard component
interface CategoryCardProps {
  icon: React.ReactNode;
  name: string;
  count: number;
  onClick?: () => void; 
  className?: string;
}



export const CategoryCard = ({
  icon,
  name,
  count,
  onClick,
  className,
}: CategoryCardProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-2xl bg-card shadow-card border border-border/50 min-w-[80px] transition-shadow hover:shadow-elevated",
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold text-foreground truncate max-w-[70px]">
          {name}
        </p>
        <p className="text-[10px] text-muted-foreground">{count} items</p>
      </div>
    </motion.button> 
  );
};
