import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import LoginPage from "./features/auth/pages/LoginPage";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import ClientListPage from "./features/clients/pages/ClientListPage";
import AddClientPage from "./features/clients/pages/AddClientPage";
import EditClientPage from "./features/clients/pages/EditClientPage";
import ClientDetailsPage from "./features/clients/pages/ClientDetailsPage";
import OrderListPage from "./features/orders/pages/OrderListPage";
import AddOrderPage from "./features/orders/pages/AddOrderPage";
import OrderDetailsPage from "./features/orders/pages/OrderDetailsPage";
import ScriptListPage from "./features/scripts/pages/ScriptListPage";
import AddScriptPage from "./features/scripts/pages/AddScriptPage";
import ScriptDetailsPage from "./features/scripts/pages/ScriptDetailsPage";
import CreatorListPage from "./features/creators/pages/CreatorListPage";
import AddCreatorPage from "./features/creators/pages/AddCreatorPage";
import ShootListPage from "./features/shoots/pages/ShootListPage";
import ScheduleShootPage from "./features/shoots/pages/ScheduleShootPage";
import VideoPipelinePage from "./features/videos/pages/VideoPipelinePage";
import VideoDetailsPage from "./features/videos/pages/VideoDetailsPage";
import ClientDashboardPage from "./features/client-portal/pages/ClientDashboardPage";
import ClientVideoReviewPage from "./features/client-portal/pages/ClientVideoReviewPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/clients" element={<ClientListPage />} />
        <Route path="/clients/add" element={<AddClientPage />} />
        <Route path="/clients/:id" element={<ClientDetailsPage />} />
        <Route path="/clients/:id/edit" element={<EditClientPage />} />

        <Route path="/orders" element={<OrderListPage />} />
        <Route path="/orders/add" element={<AddOrderPage />} />
        <Route path="/orders/:id" element={<OrderDetailsPage />} />

        <Route path="/scripts" element={<ScriptListPage />} />
        <Route path="/scripts/add" element={<AddScriptPage />} />
        <Route path="/scripts/:id" element={<ScriptDetailsPage />} />

        <Route path="/creators" element={<CreatorListPage />} />
        <Route path="/creators/add" element={<AddCreatorPage />} />

        <Route path="/shoots" element={<ShootListPage />} />
        <Route path="/shoots/schedule" element={<ScheduleShootPage />} />

        <Route path="/videos" element={<VideoPipelinePage />} />
        <Route path="/videos/:id" element={<VideoDetailsPage />} />

        <Route
          path="/portal"
          element={
            <ProtectedRoute allowedRoles={["CLIENT"]}>
              <ClientDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal/review/:videoId"
          element={
            <ProtectedRoute allowedRoles={["CLIENT"]}>
              <ClientVideoReviewPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
