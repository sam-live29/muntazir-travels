import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, ShoppingCart, User, Menu, Compass, Bookmark, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { cartService } from '../services/cartService';
import { cn } from '@/src/lib/utils';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = React.useState(cartService.getCartCount());

  React.useEffect(() => {
    const updateCount = () => setCartCount(cartService.getCartCount());
    window.addEventListener('cart-updated', updateCount);
    return () => window.removeEventListener('cart-updated', updateCount);
  }, []);

  const navItems = [
    { label: 'Home', path: '/home', icon: null },
    { label: 'Featured', path: '/search', icon: null },
    { label: 'Explore', path: '/explore', icon: null },
    { label: 'Wishlist', path: '/wishlist', icon: null },
    { label: 'Bookings', path: '/bookings', icon: null },
    { label: 'Gallery', path: '/gallery', icon: null },
  ];

  return (
    <nav className="hidden md:block sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-3 group">
          <div className="size-10 bg-gradient-to-br from-primary to-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">M</div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-primary transition-colors">Muntazir Travels</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Paradise Awaits</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-semibold transition-all relative py-2",
                location.pathname === item.path 
                  ? "text-primary" 
                  : "text-slate-600 hover:text-primary"
              )}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/search')}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Search size={20} />
          </button>
          
          <button 
            onClick={() => navigate('/cart')}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 size-4 bg-primary text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => navigate('/notifications')}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 size-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="h-8 w-px bg-slate-200 mx-2"></div>

          <button 
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 pl-2 pr-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
          >
            <div className="size-8 bg-white rounded-full flex items-center justify-center text-slate-400">
              <User size={18} />
            </div>
            <span className="text-sm font-bold text-slate-700">Account</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
