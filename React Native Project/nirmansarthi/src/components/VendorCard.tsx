import { motion } from "framer-motion";
import { Star, MapPin, Clock, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface VendorCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  deliveryTime: string;
  isVerified?: boolean;
  discount?: string;
  onClick?: () => void;
  className?: string;
}

export const VendorCard = ({
  name,
  image,
  rating,
  reviews,
  location,
  deliveryTime,
  isVerified,
  discount,
  onClick,
  className,
}: VendorCardProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden text-left transition-shadow hover:shadow-elevated",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-32 bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {discount && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold">
            {discount}
          </div>
        )}
        {isVerified && (
          <div className="absolute top-2 right-2 p-1 rounded-full bg-card/90 backdrop-blur-sm">
            <BadgeCheck className="h-4 w-4 text-primary" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1">{name}</h3>
          <div className="flex items-center gap-1 shrink-0 px-1.5 py-0.5 rounded bg-success/10">
            <Star className="h-3 w-3 fill-success text-success" />
            <span className="text-xs font-semibold text-success">{rating}</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-0.5">
          {reviews} reviews
        </p>

        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate max-w-[100px]">{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{deliveryTime}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
};
