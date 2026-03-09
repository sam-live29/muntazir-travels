import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, totalPrice } = useCheckout();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added any luxury experiences to your cart yet. Start exploring our curated collections.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all shadow-lg"
        >
          Explore Experiences
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center justify-between border-b border-gray-100 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
          <span className="text-sm text-gray-500">{cart.length} items</span>
        </div>

        <div className="space-y-6">
          {cart.map((item) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-6 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm group hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="flex flex-col justify-between flex-grow py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg leading-tight mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-1 border border-gray-100">
                    <button className="p-1 hover:bg-white rounded transition-colors text-gray-500">
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                    <button className="p-1 hover:bg-white rounded transition-colors text-gray-500">
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">${item.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl sticky top-24">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span className="text-black font-medium">${totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Tax (8%)</span>
              <span className="text-black font-medium">${(totalPrice * 0.08).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Service Fee</span>
              <span className="text-black font-medium">$45.00</span>
            </div>
            <div className="h-px bg-gray-100 my-4" />
            <div className="flex justify-between items-baseline">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-bold text-black">${(totalPrice * 1.08 + 45).toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/checkout/shipping')}
            className="w-full py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg group"
          >
            Continue to Shipping
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-center text-xs text-gray-400 mt-6 px-4">
            By proceeding to checkout, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};
