import { Package } from '../data/packages';
import { supabase } from '../lib/supabase';

export interface CartItem extends Package {
  quantity: number;
  selectedDuration?: number;
  priceMultiplier?: number;
}

let memoryCart: CartItem[] = [];
let isCartLoaded = false;

export const cartService = {
  getCart(): CartItem[] {
    return memoryCart;
  },

  async loadCart() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      memoryCart = [];
      cartService.notifyListeners();
      return;
    }
    const { data } = await supabase
      .from('user_data')
      .select('cart')
      .eq('user_id', session.user.id)
      .single();

    if (data?.cart) {
      memoryCart = Array.isArray(data.cart) ? data.cart : JSON.parse(data.cart);
    } else {
      memoryCart = [];
    }
    isCartLoaded = true;
    cartService.notifyListeners();
  },

  async syncCart() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;
    await supabase.from('user_data').upsert({ user_id: session.user.id, cart: memoryCart }, { onConflict: 'user_id' });
  },

  notifyListeners() {
    window.dispatchEvent(new Event('cart-updated'));
  },

  async addToCart(pkg: Package, quantity: number = 1, selectedDuration?: number, priceMultiplier?: number) {
    if (!isCartLoaded) await this.loadCart();

    const existingIndex = memoryCart.findIndex(item => item.id === pkg.id && item.selectedDuration === selectedDuration);
    if (existingIndex > -1) {
      memoryCart[existingIndex].quantity += quantity;
    } else {
      memoryCart.push({ ...pkg, quantity, selectedDuration, priceMultiplier });
    }

    this.notifyListeners();
    await this.syncCart();
  },

  async removeFromCart(pkgId: number | string) {
    if (!isCartLoaded) await this.loadCart();
    memoryCart = memoryCart.filter(item => item.id.toString() !== pkgId.toString());
    this.notifyListeners();
    await this.syncCart();
  },

  async updateQuantity(pkgId: number | string, quantity: number) {
    if (!isCartLoaded) await this.loadCart();
    const item = memoryCart.find(i => i.id.toString() === pkgId.toString());
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.notifyListeners();
      await this.syncCart();
    }
  },

  async clearCart() {
    memoryCart = [];
    this.notifyListeners();
    await this.syncCart();
  },

  getCartCount(): number {
    return memoryCart.reduce((acc, item) => acc + item.quantity, 0);
  },

  getCartTotal(): number {
    return memoryCart.reduce((acc, item) => {
      const price = item.priceMultiplier ? Math.floor(item.price * item.priceMultiplier) : item.price;
      return acc + (price * item.quantity);
    }, 0);
  }
};
