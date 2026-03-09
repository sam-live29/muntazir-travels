import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Home, Calendar, Bookmark, Info, MessageSquare, Settings, LogOut, ChevronRight, MapPin, Star, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Home', icon: Home, path: '/home' },
    { label: 'Featured Packages', icon: Star, path: '/search' },
    { label: 'Photo Gallery', icon: ImageIcon, path: '/gallery' },
    { label: 'My Bookings', icon: Calendar, path: '/bookings' },
    { label: 'Saved Trips', icon: Bookmark, path: '/wishlist' },
    { label: 'Travel Resources', icon: Info, path: '/info' },
    { label: 'Support', icon: MessageSquare, path: '/support' },
    { label: 'Settings', icon: Settings, path: '/profile' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[80%] max-w-[320px] bg-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-8 bg-primary/5 border-b border-primary/10">
              <div className="flex justify-between items-start mb-6">
                <div className="size-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/20">
                  M
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full bg-white shadow-sm text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Muntazir Travels</h2>
              <div className="flex items-center gap-1.5 text-slate-500 mt-1">
                <MapPin size={14} />
                <span className="text-xs font-medium">Srinagar, Jammu & Kashmir</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      navigate(item.path);
                      onClose();
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 active:bg-slate-100 transition-colors group"
                  >
                    <div className="text-slate-400 group-hover:text-primary transition-colors">
                      <Icon size={22} />
                    </div>
                    <span className="flex-1 text-left font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                      {item.label}
                    </span>
                    <ChevronRight size={16} className="text-slate-300" />
                  </button>
                );
              })}
            </div>

            <div className="p-6 border-t border-slate-100">
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-50 text-red-600 font-bold active:scale-95 transition-transform">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
              <div className="mt-6 text-center">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-300">Version 2.4.0</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideDrawer;
