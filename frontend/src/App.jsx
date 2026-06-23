import { Navigate, Route, Routes } from "react-router-dom";

import { AppShell } from "./components/layout/AppShell.jsx";
import { ProtectedRoute } from "./components/layout/ProtectedRoute.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ApplicationsPage from "./pages/ApplicationsPage.jsx";
import CompaniesPage from "./pages/CompaniesPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import JobsPage from "./pages/JobsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import RecruiterPage from "./pages/RecruiterPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route
          path="recruiter"
          element={
            <ProtectedRoute roles={["recruiter"]}>
              <RecruiterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
