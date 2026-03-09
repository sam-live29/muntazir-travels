import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, Bookmark, Settings, User, Calendar, MessageSquare, Shield, AlertCircle, Grid, Menu, ShoppingCart, Bell, ChevronLeft } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Navbar from './Navbar';
import Footer from './Footer';
import SideDrawer from './SideDrawer';
import { cartService } from '../services/cartService';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartCount, setCartCount] = useState(cartService.getCartCount());

  React.useEffect(() => {
    const updateCount = () => setCartCount(cartService.getCartCount());
    window.addEventListener('cart-updated', updateCount);
    return () => window.removeEventListener('cart-updated', updateCount);
  }, []);

  const hideNavPaths = ['/', '/login', '/welcome', '/support', '/search', '/info', '/write-review', '/checkout', '/confirmation'];
  const isPackagePage = location.pathname.startsWith('/package/');
  const shouldShowNav = !hideNavPaths.includes(location.pathname) && !isPackagePage;

  const hideHeaderPaths = ['/search', '/support', '/write-review', '/checkout', '/confirmation', '/gallery'];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname) && !isPackagePage;

  const navItems = [
    { label: 'Home', icon: Home, path: '/home' },
    { label: 'Explore', icon: Compass, path: '/explore' },
    { label: 'Wishlist', icon: Bookmark, path: '/wishlist' },
    { label: 'Bookings', icon: Calendar, path: '/bookings' },
    { label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="flex flex-col h-screen md:h-auto md:min-h-screen bg-white overflow-hidden md:overflow-visible">
      {/* Desktop Navbar */}
      <Navbar />

      {/* Mobile Header - Fixed */}
      {shouldShowHeader && (
        <header className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-md px-6 py-4 flex items-center gap-3 border-b border-slate-100">
          {location.pathname === '/home' ? (
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <Menu size={24} />
            </button>
          ) : (
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              {location.pathname === '/home' && <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white font-black shadow-sm">M</div>}
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {location.pathname === '/home' ? 'Muntazir Travels' :
                  location.pathname === '/explore' ? 'Explore' :
                    location.pathname === '/wishlist' ? 'Wishlist' :
                      location.pathname === '/bookings' ? 'My Bookings' :
                        location.pathname === '/profile' ? 'Profile' :
                          location.pathname === '/notifications' ? 'Notifications' : 'Muntazir Travels'}
              </h1>
            </div>
            {location.pathname === '/home' && <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-0.5">Your Gateway to Paradise</p>}
          </div>
          <button
            onClick={() => navigate('/cart')}
            className="ml-auto h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 relative active:scale-95 transition-transform"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 size-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
          {location.pathname !== '/notifications' && (
            <button
              onClick={() => navigate('/notifications')}
              className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary relative active:scale-95 transition-transform"
            >
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 size-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          )}
        </header>
      )}

      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto relative overflow-hidden md:overflow-visible px-4 lg:px-8">
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        {shouldShowNav && (
          <nav className="sticky bottom-0 bg-white/90 backdrop-blur-lg border-t border-slate-100 px-6 pt-3 pb-8 flex justify-around items-center z-40 sm:pb-4 md:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "flex flex-col items-center gap-1 transition-colors",
                    isActive ? "text-primary" : "text-slate-400"
                  )}
                >
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Desktop Footer */}
      <Footer />
    </div>
  );
};
