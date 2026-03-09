import { supabase } from '../lib/supabase';

export interface WishlistItem {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

let memoryWishlist: WishlistItem[] = [];
let isWishlistLoaded = false;

export const wishlistService = {
  getWishlist: (): WishlistItem[] => {
    return memoryWishlist;
  },

  loadWishlist: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      memoryWishlist = [];
      window.dispatchEvent(new Event('wishlist-updated'));
      return;
    }
    const { data } = await supabase
      .from('user_data')
      .select('wishlist')
      .eq('user_id', session.user.id)
      .single();

    if (data?.wishlist) {
      memoryWishlist = Array.isArray(data.wishlist) ? data.wishlist : JSON.parse(data.wishlist);
    } else {
      memoryWishlist = [];
    }
    isWishlistLoaded = true;
    window.dispatchEvent(new Event('wishlist-updated'));
  },

  syncWishlist: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;
    await supabase.from('user_data').upsert({ user_id: session.user.id, wishlist: memoryWishlist }, { onConflict: 'user_id' });
  },

  addToWishlist: async (item: WishlistItem) => {
    if (!isWishlistLoaded) await wishlistService.loadWishlist();
    if (!memoryWishlist.find(i => i.id === item.id)) {
      memoryWishlist.push(item);
      window.dispatchEvent(new Event('wishlist-updated'));
      await wishlistService.syncWishlist();
    }
  },

  removeFromWishlist: async (id: number) => {
    if (!isWishlistLoaded) await wishlistService.loadWishlist();
    memoryWishlist = memoryWishlist.filter(i => i.id !== id);
    window.dispatchEvent(new Event('wishlist-updated'));
    await wishlistService.syncWishlist();
  },

  isInWishlist: (id: number): boolean => {
    return !!memoryWishlist.find(i => i.id === id);
  }
};
