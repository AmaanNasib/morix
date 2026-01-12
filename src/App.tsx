import { Route, Routes } from "react-router-dom";

import DeviceManagement from "./pages/DeviceManagement";
import LoginPage from "./pages/login";
import { UsersRoles } from "./pages/usersRoles";
import ScreenControl from "./pages/ScreenControl";
import LicenseManagement from "./pages/LicenseManagement";
import OrderManagement from "./pages/OrderManagement";
import ViewPurchaseRequest from "./pages/OrderManagement/purchaseRequest/viewPurchaseRequest";
import MediaFileManagement from "./pages/MediaFileManagement";
import Playlists from "./pages/Playlists";
import Groups from "./pages/Groups";
import Library from "./pages/Library";
import ViewProformaInvoice from "./pages/OrderManagement/proformaInvoices/viewProformaInvoice";
import ViewGroup from "./pages/Groups/viewGroup/viewGroup";
import AnalyticsPage from "./pages/reportAndAnalytics";
import LanguagesPage from "./pages/languages";
import SupportPage from "./pages/support";
import NotificationsPage from "./pages/notifications";
import SettingsPage from "./pages/settings";
import { ProtectedRoute } from "./config/guards";
import Register from "./components/auth/register";
import ForgotPassword from "./components/auth/forgotPassword";

import AboutPage from "@/pages/about";
import BlogPage from "@/pages/blog";
import DocsPage from "@/pages/docs";
import IndexPage from "@/pages/index";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<LoginPage />} path="/" />
      <Route element={<Register />} path="/register" />
      <Route element={<ForgotPassword />} path="/forgot-password" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <IndexPage />
          </ProtectedRoute>
        }
        path="/dashboard"
      />
      <Route
        element={
          <ProtectedRoute>
            <UsersRoles />
          </ProtectedRoute>
        }
        path="/users"
      />
      <Route
        element={
          <ProtectedRoute>
            <DeviceManagement />
          </ProtectedRoute>
        }
        path="/devices"
      />
      <Route
        element={
          <ProtectedRoute>
            <ScreenControl />
          </ProtectedRoute>
        }
        path="/screen-control"
      />
      <Route
        element={
          <ProtectedRoute>
            <LicenseManagement />
          </ProtectedRoute>
        }
        path="/licenses"
      />
      <Route
        element={
          <ProtectedRoute>
            <OrderManagement />
          </ProtectedRoute>
        }
        path="/orders"
      />
      <Route
        element={
          <ProtectedRoute>
            <ViewPurchaseRequest />
          </ProtectedRoute>
        }
        path="/orders/pr/:id"
      />
      <Route
        element={
          <ProtectedRoute>
            <ViewProformaInvoice />
          </ProtectedRoute>
        }
        path="/orders/pi/:id"
      />
      <Route
        element={
          <ProtectedRoute>
            <MediaFileManagement />
          </ProtectedRoute>
        }
        path="/media"
      />
      <Route
        element={
          <ProtectedRoute>
            <Playlists />
          </ProtectedRoute>
        }
        path="/playlists"
      />
      <Route
        element={
          <ProtectedRoute>
            <Groups />
          </ProtectedRoute>
        }
        path="/groups"
      />
      <Route
        element={
          <ProtectedRoute>
            <ViewGroup />
          </ProtectedRoute>
        }
        path="/groups/view/:id"
      />
      <Route
        element={
          <ProtectedRoute>
            <Library />
          </ProtectedRoute>
        }
        path="/library"
      />
      <Route
        element={
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        }
        path="/analytics"
      />
      <Route
        element={
          <ProtectedRoute>
            <LanguagesPage />
          </ProtectedRoute>
        }
        path="/languages"
      />
      <Route
        element={
          <ProtectedRoute>
            <SupportPage />
          </ProtectedRoute>
        }
        path="/support"
      />
      <Route
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
        path="/notifications"
      />
      <Route
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
        path="/settings"
      />
    </Routes>
  );
}

export default App;
