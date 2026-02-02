import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, role }: any) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user?.role) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/login" />;

  return children;
}
