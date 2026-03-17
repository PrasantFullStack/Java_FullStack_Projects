import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import SearchPage from "./pages/Search";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Otp from "./pages/auth/Otp";
import Register from "./pages/auth/Register";
import { ProtectedRoute } from "./pages/auth/ProtectedRoute";
import VendorProfile from "./pages/vendor/VendorProfile"
import BuyerProfile from "./pages/buyer/BuyerProfile";
import AdminDashboard from "./admin/AdminDashboard";
import AdminSettings from "./admin/AdminSetting";
import Reports from "./admin/Reports";
import Support from "./admin/Support";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vendor/dashboard" element={<VendorProfile />} />
            <Route path="/buyer/dashboard" element={<BuyerProfile />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/support" element={<Support />} />
                        {/* <Route path="/vendor/dashboard" element={<ProtectedRoute role="SELLER"><VendorProfile /> </ProtectedRoute> */}

            {/* }
/> */}

            {/* <Route
  path="/buyer/dashboard"
  element={
    <ProtectedRoute role="BUYER">
      <BuyerProfile />
    </ProtectedRoute>
  }
/> */}

            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/search" element={<SearchPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
