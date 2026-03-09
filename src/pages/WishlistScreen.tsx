import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, Star, ArrowRight, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { wishlistService, WishlistItem } from '../services/wishlistService';

const WishlistScreen: React.FC = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const loadWishlist = () => setWishlistItems(wishlistService.getWishlist());

  useEffect(() => {
    loadWishlist();
    window.addEventListener('wishlist-updated', loadWishlist);
    return () => window.removeEventListener('wishlist-updated', loadWishlist);
  }, []);

  const handleRemove = (id: number) => {
    wishlistService.removeFromWishlist(id);
    setWishlistItems(wishlistService.getWishlist());
  };

  return (
    <div className="bg-background-light flex flex-col h-full">
      <div className="px-6 pt-6 pb-10">
        <p className="text-slate-500 font-medium mb-8">Your saved travel dreams</p>

        <AnimatePresence mode="popLayout">
          {wishlistItems.length > 0 ? (
            <div className="space-y-6">
              {wishlistItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, x: -20 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex h-40"
                >
                  <div className="w-1/3 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-primary flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> {item.rating}
                    </div>
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-base leading-tight mb-1 line-clamp-2">{item.title}</h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(item.id);
                          }}
                          className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center text-slate-400 text-xs gap-3">
                        <div className="flex items-center">
                          <MapPin size={12} className="mr-1" />
                          {item.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Starting from</span>
                        <span className="text-primary font-black text-lg">₹{item.price.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => navigate(`/package/${item.id}`)}
                        className="bg-slate-900 text-white p-2 rounded-xl active:scale-90 transition-transform"
                      >
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="size-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
                <Heart size={48} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
              <p className="text-slate-500 max-w-[240px] mb-8">Start exploring and save your favorite trips to see them here.</p>
              <button
                onClick={() => navigate('/explore')}
                className="bg-primary text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-primary/25 active:scale-95 transition-transform"
              >
                Explore Destinations
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WishlistScreen;
