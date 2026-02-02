import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Building2, Package, Truck, Shield } from "lucide-react";
// Define features to showcase in the onboarding carousel
const features = [
  {
    icon: Building2,
    title: "Quality Materials",
    description: "Premium construction materials from verified vendors",
  },
  {
    icon: Package,
    title: "Wide Selection",
    description: "Cement, steel, bricks, sand & more at best prices",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Reliable delivery to your construction site",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Pay via UPI, cards, or wallet securely",
  },
];

export const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
  const redirectTimer = setTimeout(() => {
    navigate("/login");
  }, 5000); // 5 sec

  return () => clearTimeout(redirectTimer);
}, []);



  if (!showOnboarding) {
    return null;
  }

  function handleGetStarted(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    setShowOnboarding(false);
    navigate("/login");
  }
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-primary via-primary to-primary/95"
    >
      {/* Logo Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-2xl bg-card/20 backdrop-blur flex items-center justify-center mb-4 mx-auto">
            <Building2 className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground text-center">
            NirmanSarthi
          </h1>
          <p className="text-primary-foreground/80 text-center mt-1 text-sm">
            Your Construction Partner
          </p>
        </motion.div>

        {/* Feature Carousel */}
        <div className="w-full max-w-sm h-40 relative">
          <AnimatePresence mode="wait">
            {features.map(
              (feature, index) =>
                index === currentIndex && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-0 flex flex-col items-center text-center px-4"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-card/20 backdrop-blur flex items-center justify-center mb-4">
                      <feature.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold text-primary-foreground mb-2">
                      {feature.title}
                    </h2>
                    <p className="text-primary-foreground/80 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-4">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-6 bg-accent"
                  : "w-2 bg-primary-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-6 pb-12 safe-bottom">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleGetStarted}
          className="w-full py-4 rounded-2xl bg-accent text-accent-foreground font-semibold text-lg shadow-lg"
        >
          Get Started
        </motion.button>
        <p className="text-center text-primary-foreground/60 text-xs mt-4">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </motion.div>
  );
};
