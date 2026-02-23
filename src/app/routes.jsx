import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import NotFound from "../pages/NotFound";

// Dashboards
import AdminDashboard from "../features/admin/AdminDashboard";
import LenderDashboard from "../features/lender/LenderDashboard";
import BorrowerDashboard from "../features/borrower/BorrowerDashboard";
import AnalystDashboard from "../features/analyst/AnalystDashboard";

// Borrower features
import ApplyLoan from "../features/borrower/ApplyLoan";
import MyLoans from "../features/borrower/MyLoans";
import EmiSchedule from "../features/borrower/EmiSchedule";

// Lender features
import CreateLoan from "../features/lender/CreateLoan";
import ActiveLoans from "../features/lender/ActiveLoans";
import Borrowers from "../features/lender/Borrowers";

// Admin features
import LoansOverview from "../features/admin/LoansOverview";

// Analyst features
import RiskReports from "../features/analyst/RiskReports";

function RoleDashboard() {
  const { user } = useAuth();

  switch (user?.role) {
    case "ADMIN":
      return <AdminDashboard />;
    case "LENDER":
      return <LenderDashboard />;
    case "ANALYST":
      return <AnalystDashboard />;
    case "BORROWER":
      return <BorrowerDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Protected app routes */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <RoleDashboard />
            </ProtectedRoute>
          }
        />

        {/* Borrower routes */}
        <Route
          path="/app/apply-loan"
          element={
            <ProtectedRoute allowedRoles={["BORROWER"]}>
              <ApplyLoan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/my-loans"
          element={
            <ProtectedRoute allowedRoles={["BORROWER"]}>
              <MyLoans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/emi-schedule"
          element={
            <ProtectedRoute allowedRoles={["BORROWER"]}>
              <EmiSchedule />
            </ProtectedRoute>
          }
        />

        {/* Lender routes */}
        <Route
          path="/app/create-loan"
          element={
            <ProtectedRoute allowedRoles={["LENDER"]}>
              <CreateLoan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/active-loans"
          element={
            <ProtectedRoute allowedRoles={["LENDER"]}>
              <ActiveLoans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/borrowers"
          element={
            <ProtectedRoute allowedRoles={["LENDER"]}>
              <Borrowers />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/app/loans-overview"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <LoansOverview />
            </ProtectedRoute>
          }
        />

        {/* Analyst routes */}
        <Route
          path="/app/risk-reports"
          element={
            <ProtectedRoute allowedRoles={["ANALYST"]}>
              <RiskReports />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}