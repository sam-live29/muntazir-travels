import React from 'react';
import { Heart } from 'lucide-react';
import { wishlistService, WishlistItem } from '../services/wishlistService';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface WishlistButtonProps {
  item: WishlistItem;
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ item, className }) => {
  const [isSaved, setIsSaved] = React.useState(wishlistService.isInWishlist(item.id));

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      wishlistService.removeFromWishlist(item.id);
      setIsSaved(false);
    } else {
      wishlistService.addToWishlist(item);
      setIsSaved(true);
    }
    window.dispatchEvent(new CustomEvent('wishlist-updated'));
  };

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={toggleWishlist}
      className={cn(
        "size-10 rounded-2xl flex items-center justify-center transition-all shadow-lg backdrop-blur-md border",
        isSaved 
          ? "bg-emerald-500 border-emerald-400 text-white" 
          : "bg-white/90 border-white/20 text-slate-400 hover:text-rose-500",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isSaved ? 'saved' : 'unsaved'}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Heart 
            size={20} 
            fill={isSaved ? "currentColor" : "none"} 
            className={cn(isSaved && "fill-white")}
          />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

export default WishlistButton;
