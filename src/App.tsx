import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { Loader } from './components/marketing/Loader';
import { DemoRoleSwitcher } from './components/demo/DemoRoleSwitcher';
import { DemoOrchestrator } from './components/demo/DemoOrchestrator';
import { GuidedTourPill } from './components/demo/GuidedTourPill';
import { CartDrawer } from './components/customer/CartDrawer';
import { CustomerShell } from './components/customer/CustomerShell';

// Eager load critical landing and customer home for sub-second FCP
import { LandingPage } from './pages/LandingPage';
import { CustomerHomePage } from './pages/customer/CustomerHomePage';

// Code-split secondary marketing and role dashboards (§16, §23)
const OwnershipPage = lazy(() => import('./pages/OwnershipPage').then(m => ({ default: m.OwnershipPage })));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage').then(m => ({ default: m.RoadmapPage })));
const ScopePage = lazy(() => import('./pages/ScopePage').then(m => ({ default: m.ScopePage })));

const RestaurantDetailPage = lazy(() => import('./pages/customer/RestaurantDetailPage').then(m => ({ default: m.RestaurantDetailPage })));
const OrderTrackerPage = lazy(() => import('./pages/customer/OrderTrackerPage').then(m => ({ default: m.OrderTrackerPage })));
const OrdersHistoryPage = lazy(() => import('./pages/customer/OrdersHistoryPage').then(m => ({ default: m.OrdersHistoryPage })));
const AccountPage = lazy(() => import('./pages/customer/AccountPage').then(m => ({ default: m.AccountPage })));

const RestaurantDashboard = lazy(() => import('./pages/restaurant/RestaurantDashboard').then(m => ({ default: m.RestaurantDashboard })));
const DriverPage = lazy(() => import('./pages/driver/DriverPage').then(m => ({ default: m.DriverPage })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

// Loading skeleton fallback
const RouteFallback: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-3">
    <div className="w-10 h-10 rounded-full border-2 border-[#14403F] border-t-transparent animate-spin" />
    <span className="text-xs font-semibold text-[#76817D] uppercase tracking-wider">
      Loading view...
    </span>
  </div>
);

export const App: React.FC = () => {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ToastProvider>
      {/* Brand Entry Loader (§7) */}
      {!loaderComplete && <Loader onComplete={() => setLoaderComplete(true)} />}

      <div className="relative min-h-screen bg-[#F7F2E8]">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            {/* Pitch & Marketing Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/ownership" element={<OwnershipPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/scope" element={<ScopePage />} />

            {/* Customer Application Routes (Wrapped in phone-frame shell stage §18) */}
            <Route
              path="/app"
              element={
                <CustomerShell onOpenCart={() => setIsCartOpen(true)}>
                  <CustomerHomePage />
                </CustomerShell>
              }
            />
            <Route
              path="/app/r/:id"
              element={
                <CustomerShell onOpenCart={() => setIsCartOpen(true)}>
                  <RestaurantDetailPage />
                </CustomerShell>
              }
            />
            <Route
              path="/app/order/:id"
              element={
                <CustomerShell onOpenCart={() => setIsCartOpen(true)}>
                  <OrderTrackerPage />
                </CustomerShell>
              }
            />
            <Route
              path="/app/orders"
              element={
                <CustomerShell onOpenCart={() => setIsCartOpen(true)}>
                  <OrdersHistoryPage />
                </CustomerShell>
              }
            />
            <Route
              path="/app/account"
              element={
                <CustomerShell onOpenCart={() => setIsCartOpen(true)}>
                  <AccountPage />
                </CustomerShell>
              }
            />

            {/* Restaurant Dashboard Route */}
            <Route path="/restaurant" element={<RestaurantDashboard />} />

            {/* Driver Experience Route */}
            <Route path="/driver" element={<DriverPage />} />

            {/* Admin Command Console Route */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* 404 Fallback */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </Suspense>

        {/* Global Cart Drawer */}
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* Global Demo Controls (§6, §21, §22) */}
        <DemoRoleSwitcher />
        <DemoOrchestrator />
        <GuidedTourPill />
      </div>
    </ToastProvider>
  );
};

export default App;
