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
    const session = localStorage.getItem('simulated_session');
    if (!session) {
      memoryWishlist = [];
      window.dispatchEvent(new Event('wishlist-updated'));
      return;
    }

    const storedWishlist = localStorage.getItem('simulated_wishlist');
    if (storedWishlist) {
      try {
        memoryWishlist = JSON.parse(storedWishlist);
      } catch (e) {
        console.error("Failed to parse simulated wishlist", e);
        memoryWishlist = [];
      }
    } else {
      memoryWishlist = [];
    }
    isWishlistLoaded = true;
    window.dispatchEvent(new Event('wishlist-updated'));
  },

  syncWishlist: async () => {
    const session = localStorage.getItem('simulated_session');
    if (!session) return;
    localStorage.setItem('simulated_wishlist', JSON.stringify(memoryWishlist));
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
