import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import WelcomeScreen from './pages/WelcomeScreen';
import HomeScreen from './pages/HomeScreen';
import PackageDetails from './pages/PackageDetails';
import ProfileScreen from './pages/ProfileScreen';
import CheckoutScreen from './pages/CheckoutScreen';
import BookingPaymentScreen from './pages/BookingPaymentScreen';
import BookingsScreen from './pages/BookingsScreen';
import LoginScreen from './pages/LoginScreen';
import SignUpScreen from './pages/SignUpScreen';
import TripDetails from './pages/TripDetails';
import WriteReview from './pages/WriteReview';
import ReviewBookingScreen from './pages/ReviewBookingScreen';
import SupportChat from './pages/SupportChat';
import SearchScreen from './pages/SearchScreen';
import TravelInfo from './pages/TravelInfo';
import ExploreScreen from './pages/ExploreScreen';
import WishlistScreen from './pages/WishlistScreen';
import NotificationsScreen from './pages/NotificationsScreen';
import CategoriesScreen from './pages/CategoriesScreen';
import CartScreen from './pages/CartScreen';
import GalleryScreen from './pages/GalleryScreen';
import GalleryUpload from './pages/GalleryUpload';
import BlogsScreen from './pages/BlogsScreen';
import BlogDetailsScreen from './pages/BlogDetailsScreen';

// New Checkout Flow
import { CheckoutProvider } from './context/CheckoutContext';
import { CheckoutLayout } from './components/checkout/CheckoutLayout';
import { CartPage } from './pages/checkout/CartPage';
import { ShippingPage } from './pages/checkout/ShippingPage';
import { PaymentPage } from './pages/checkout/PaymentPage';
import { SuccessPage } from './pages/checkout/SuccessPage';
import ScrollToTop from './components/ScrollToTop';

import { useAuth, AuthProvider } from './context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <CheckoutProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />

            {/* New Multi-step Checkout Flow (Protected) */}
            <Route path="/checkout" element={<ProtectedRoute><CheckoutLayout><Navigate to="/checkout/cart" replace /></CheckoutLayout></ProtectedRoute>} />
            <Route path="/checkout/cart" element={<ProtectedRoute><CheckoutLayout><CartPage /></CheckoutLayout></ProtectedRoute>} />
            <Route path="/checkout/shipping" element={<ProtectedRoute><CheckoutLayout><ShippingPage /></CheckoutLayout></ProtectedRoute>} />
            <Route path="/checkout/payment" element={<ProtectedRoute><CheckoutLayout><PaymentPage /></CheckoutLayout></ProtectedRoute>} />
            <Route path="/checkout/success" element={<ProtectedRoute><CheckoutLayout><SuccessPage /></CheckoutLayout></ProtectedRoute>} />

            <Route element={<MainLayout />}>
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/explore" element={<ExploreScreen />} />
              <Route path="/wishlist" element={<ProtectedRoute><WishlistScreen /></ProtectedRoute>} />
              <Route path="/package/:id" element={<PackageDetails />} />
              <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
              <Route path="/checkout/:id" element={<ProtectedRoute><CheckoutScreen /></ProtectedRoute>} />
              <Route path="/review-booking/:id" element={<ProtectedRoute><ReviewBookingScreen /></ProtectedRoute>} />
              <Route path="/booking-payment/:id" element={<ProtectedRoute><BookingPaymentScreen /></ProtectedRoute>} />
              <Route path="/bookings" element={<ProtectedRoute><BookingsScreen /></ProtectedRoute>} />
              <Route path="/trip-details" element={<TripDetails />} />
              <Route path="/write-review" element={<WriteReview />} />
              <Route path="/support" element={<SupportChat />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/notifications" element={<NotificationsScreen />} />
              <Route path="/info" element={<TravelInfo />} />
              <Route path="/categories" element={<CategoriesScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/gallery" element={<GalleryScreen />} />
              <Route path="/my-gallery" element={<ProtectedRoute><GalleryUpload /></ProtectedRoute>} />
              <Route path="/blogs" element={<BlogsScreen />} />
              <Route path="/blog/:id" element={<BlogDetailsScreen />} />
              {/* Fallback for other routes */}
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CheckoutProvider>
    </AuthProvider>
  );
}
