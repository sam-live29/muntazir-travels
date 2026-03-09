import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';
import { CreditCard, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const PaymentPage: React.FC = () => {
  const { payment, setPayment, totalPrice, clearCart } = useCheckout();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/checkout/success');
    }, 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Payment Method</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Card Details */}
          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center">
                  <CreditCard size={20} />
                </div>
                <h2 className="text-xl font-bold">Credit or Debit Card</h2>
              </div>
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-gray-100 rounded border border-gray-200" />
                <div className="w-10 h-6 bg-gray-100 rounded border border-gray-200" />
                <div className="w-10 h-6 bg-gray-100 rounded border border-gray-200" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-700">Cardholder Name</label>
                <input 
                  required
                  type="text"
                  name="cardName"
                  value={payment.cardName}
                  onChange={handleChange}
                  placeholder="JOHN DOE"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all uppercase tracking-wider"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-700">Card Number</label>
                <div className="relative">
                  <input 
                    required
                    type="text"
                    name="cardNumber"
                    value={payment.cardNumber}
                    onChange={handleChange}
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Lock size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Expiry Date</label>
                <input 
                  required
                  type="text"
                  name="expiryDate"
                  value={payment.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">CVV</label>
                <input 
                  required
                  type="text"
                  name="cvv"
                  value={payment.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck size={14} className="text-emerald-500" />
              Your payment information is encrypted and secure.
            </div>
          </section>

          <div className="flex justify-end items-center pt-4">
            <button 
              type="submit"
              disabled={isProcessing}
              className={`px-10 py-4 bg-black text-white rounded-2xl font-bold flex items-center gap-3 shadow-lg transition-all ${
                isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-800'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Pay ${(totalPrice * 1.08 + 45).toLocaleString()}
                  <CheckCircle2 size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl sticky top-24">
          <h2 className="text-xl font-bold mb-6">Final Summary</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Subtotal</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-500 text-sm">
              <span>Tax & Fees</span>
              <span>${(totalPrice * 0.08 + 45).toLocaleString()}</span>
            </div>
            <div className="h-px bg-gray-100 my-2" />
            <div className="flex justify-between items-baseline">
              <span className="font-bold">Total</span>
              <span className="text-2xl font-bold text-black">${(totalPrice * 1.08 + 45).toLocaleString()}</span>
            </div>
          </div>
          
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-3">
            <ShieldCheck size={20} className="text-emerald-600 flex-shrink-0" />
            <p className="text-xs text-emerald-800 leading-relaxed">
              Secure checkout powered by LuxePay. We use 256-bit SSL encryption to protect your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
