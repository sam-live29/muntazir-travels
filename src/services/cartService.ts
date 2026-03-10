import { Package } from '../data/packages';

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
    const session = localStorage.getItem('simulated_session');
    if (!session) {
      memoryCart = [];
      cartService.notifyListeners();
      return;
    }

    const storedCart = localStorage.getItem('simulated_cart');
    if (storedCart) {
      try {
        memoryCart = JSON.parse(storedCart);
      } catch (e) {
        console.error("Failed to parse simulated cart", e);
        memoryCart = [];
      }
    } else {
      memoryCart = [];
    }
    isCartLoaded = true;
    cartService.notifyListeners();
  },

  async syncCart() {
    const session = localStorage.getItem('simulated_session');
    if (!session) return;
    localStorage.setItem('simulated_cart', JSON.stringify(memoryCart));
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
