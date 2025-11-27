import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CustomerLookup from "./pages/CustomerLookup";
import CreateCustomer from "./pages/CreateCustomer";
import Services from "./pages/Services";
import PaymentHistory from "./pages/PaymentHistory";
import Interactions from "./pages/Interactions";
import Payment from "./pages/Payment";
import PaymentExtension from "./pages/PaymentExtension";
import PaymentArrangement from "./pages/PaymentArrangement";
import Billing from "./pages/Billing";
import BillingItems from "./pages/BillingItems";
import CreditHistory from "./pages/CreditHistory";
import Notifications from "./pages/Notifications";
import Contracts from "./pages/Contracts";
import Predict from "./pages/Predict";
import DBStatus from "./pages/DBStatus";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppContent = () => {
  const { user } = useAuth();
  const isLoginPage = window.location.pathname === "/login";

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {user && <AppSidebar />}
        <main className="flex-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer-lookup"
              element={
                <ProtectedRoute>
                  <CustomerLookup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-customer"
              element={
                <ProtectedRoute>
                  <CreateCustomer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  <Services />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment-history"
              element={
                <ProtectedRoute>
                  <PaymentHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interactions"
              element={
                <ProtectedRoute>
                  <Interactions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment-extension"
              element={
                <ProtectedRoute>
                  <PaymentExtension />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment-arrangement"
              element={
                <ProtectedRoute>
                  <PaymentArrangement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/billing"
              element={
                <ProtectedRoute>
                  <Billing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/billing-items"
              element={
                <ProtectedRoute>
                  <BillingItems />
                </ProtectedRoute>
              }
            />
            <Route
              path="/credit-history"
              element={
                <ProtectedRoute>
                  <CreditHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contracts"
              element={
                <ProtectedRoute>
                  <Contracts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/predict"
              element={
                <ProtectedRoute>
                  <Predict />
                </ProtectedRoute>
              }
            />
            <Route
              path="/db-status"
              element={
                <ProtectedRoute>
                  <DBStatus />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
