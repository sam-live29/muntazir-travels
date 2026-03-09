import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';
import { ArrowRight, MapPin, Mail, User } from 'lucide-react';

export const ShippingPage: React.FC = () => {
  const { shipping, setShipping, totalPrice } = useCheckout();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/checkout/payment');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Shipping Details</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Info */}
          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center">
                <Mail size={20} />
              </div>
              <h2 className="text-xl font-bold">Contact Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">First Name</label>
                <input 
                  required
                  type="text"
                  name="firstName"
                  value={shipping.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Last Name</label>
                <input 
                  required
                  type="text"
                  name="lastName"
                  value={shipping.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <input 
                  required
                  type="email"
                  name="email"
                  value={shipping.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <h2 className="text-xl font-bold">Shipping Address</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-700">Street Address</label>
                <input 
                  required
                  type="text"
                  name="address"
                  value={shipping.address}
                  onChange={handleChange}
                  placeholder="123 Luxury Lane"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">City</label>
                <input 
                  required
                  type="text"
                  name="city"
                  value={shipping.city}
                  onChange={handleChange}
                  placeholder="New York"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">ZIP / Postal Code</label>
                <input 
                  required
                  type="text"
                  name="zipCode"
                  value={shipping.zipCode}
                  onChange={handleChange}
                  placeholder="10001"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-700">Country</label>
                <select 
                  name="country"
                  value={shipping.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-white"
                >
                  <option value="">Select a country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="IN">India</option>
                  <option value="FR">France</option>
                </select>
              </div>
            </div>
          </section>

          <div className="flex justify-end items-center pt-4">
            <button 
              type="submit"
              className="px-10 py-4 bg-black text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg group"
            >
              Continue to Payment
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>

      {/* Mini Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl sticky top-24">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-500">
              <span>Total Amount</span>
              <span className="text-2xl font-bold text-black">${(totalPrice * 1.08 + 45).toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-400">
              Shipping costs are included in the service fee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
