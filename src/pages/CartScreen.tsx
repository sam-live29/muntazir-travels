import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { cartService, CartItem } from '../services/cartService';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const CartScreen: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const loadCart = () => {
    setCartItems(cartService.getCart());
    setTotal(cartService.getCartTotal());
  };

  useEffect(() => {
    loadCart();
    window.addEventListener('cart-updated', loadCart);
    return () => window.removeEventListener('cart-updated', loadCart);
  }, []);

  const handleRemove = (id: string) => {
    cartService.removeFromCart(id);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    cartService.updateQuantity(id, quantity);
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-white min-h-screen flex flex-col">

        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative mb-10"
          >
            <div className="size-40 bg-primary/5 rounded-full flex items-center justify-center relative">
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-primary"
              >
                <ShoppingCart size={80} strokeWidth={1.5} />
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-2 -right-2 size-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shadow-sm"
              >
                <Plus size={20} />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-2 size-10 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 shadow-sm"
              >
                <Minus size={16} />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xs space-y-4"
          >
            <h2 className="text-3xl font-black text-slate-900 leading-tight">Your cart is feeling a bit light!</h2>
            <p className="text-slate-500 font-medium">
              It looks like you haven't picked your next adventure yet. Kashmir is waiting for you!
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/home')}
            className="mt-12 bg-slate-900 text-white font-black px-10 py-5 rounded-[2rem] shadow-2xl shadow-slate-200 flex items-center gap-3 group"
          >
            <span>Start Exploring</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col pb-32">

      <main className="p-6 max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-black text-slate-900 mb-6 hidden md:block">Your Selection ({cartItems.length})</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl p-5 flex gap-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-28 md:size-32 rounded-2xl object-cover shadow-sm"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-black text-lg text-slate-900 leading-tight">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-slate-500 font-bold">{item.location}</p>
                        <div className="size-1 bg-slate-300 rounded-full" />
                        <p className="text-[10px] text-primary font-black uppercase tracking-wider">
                          {item.selectedDuration || item.days} Days / {(item.selectedDuration ? item.selectedDuration - 1 : item.nights)} Nights
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-slate-300 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-full transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-primary font-black text-xl">
                      ₹{(item.priceMultiplier ? Math.floor(item.price * item.priceMultiplier) : item.price).toLocaleString()}
                    </p>
                    <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                      <button
                        onClick={() => handleUpdateQuantity(item.id.toString(), item.quantity - 1)}
                        className="size-9 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg transition-all active:scale-90"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center text-sm font-black">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id.toString(), item.quantity + 1)}
                        className="size-9 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg transition-all active:scale-90"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-5 pt-5 border-t border-slate-50">
                    <button
                      onClick={() => navigate(`/package/${item.id}`)}
                      className="flex-1 py-3.5 text-[10px] font-black uppercase tracking-widest text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all flex items-center justify-center gap-2"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        const duration = item.selectedDuration || item.days;
                        navigate(`/checkout/${item.id}?guests=${item.quantity}&duration=${duration}`);
                      }}
                      className="flex-1 py-3.5 text-[10px] font-black uppercase tracking-widest text-white bg-primary hover:opacity-90 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                    >
                      Book Now
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-[400px]">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24">
              <h3 className="text-xl font-black text-slate-900 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-slate-500 font-bold text-sm">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 font-bold text-sm">
                  <span>Platform Fee</span>
                  <span className="text-emerald-500">FREE</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 font-bold text-sm">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="h-px bg-slate-100 my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-slate-900 font-black">Total Amount</span>
                  <span className="text-3xl font-black text-primary">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (cartItems.length > 0) {
                    const item = cartItems[0];
                    const duration = item.selectedDuration || item.days;
                    navigate(`/checkout/${item.id}?guests=${item.quantity}&duration=${duration}`);
                  }
                }}
                className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl shadow-2xl shadow-slate-200 hover:bg-primary transition-all flex items-center justify-center gap-3 group"
              >
                <span className="text-sm uppercase tracking-widest">Proceed to Checkout</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[10px] text-slate-400 text-center mt-6 font-bold uppercase tracking-widest leading-relaxed">
                Secure checkout powered by Muntazir Travels.<br />
                Free cancellation up to 7 days before.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-xl border-t border-slate-100 space-y-4 z-20 md:hidden">
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-medium">Total Amount</span>
          <span className="text-2xl font-black text-slate-900">₹{total.toLocaleString()}</span>
        </div>
        <button
          onClick={() => {
            if (cartItems.length > 0) {
              const item = cartItems[0];
              const duration = item.selectedDuration || item.days;
              navigate(`/checkout/${item.id}?guests=${item.quantity}&duration=${duration}`);
            }
          }}
          className="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          Proceed to Checkout
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
