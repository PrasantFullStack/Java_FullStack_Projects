import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: number;
  phone: string;
  role: "Admin" | "Seller" | "Buyer";
  token: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (data: User) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const json = await AsyncStorage.getItem("user");
      if (json) {
        setUser(JSON.parse(json));
      }
    } catch (e) {
      console.log("Load user error", e);
    } finally {
      setLoading(false);
    }
  };
// Function to log in the user and store their data
  const login = async (data: User) => {
    setUser(data);
    await AsyncStorage.setItem("user", JSON.stringify(data));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
