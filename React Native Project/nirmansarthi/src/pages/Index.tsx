import { useState, useEffect } from "react";
import { Onboarding } from "@/components/Onboarding";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("nirman-onboarding");
    if (hasSeenOnboarding) {
      setShowOnboarding(false);
    }
  }, []);

  if (showOnboarding) {
    return <Onboarding />;
  }

  return null;
};

export default Index;
