import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Check, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  { id: 'cart', name: 'Cart', path: '/checkout/cart' },
  { id: 'shipping', name: 'Shipping', path: '/checkout/shipping' },
  { id: 'payment', name: 'Payment', path: '/checkout/payment' },
  { id: 'success', name: 'Success', path: '/checkout/success' },
];

export const CheckoutLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);

  const handleBack = () => {
    if (currentStepIndex > 0) {
      navigate(steps[currentStepIndex - 1].path);
    } else {
      navigate('/cart');
    }
  };

  const isSuccessPage = location.pathname === '/checkout/success';
  const isPaymentPage = location.pathname === '/checkout/payment';

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isSuccessPage && !isPaymentPage && (
              <button
                onClick={handleBack}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
                aria-label="Go back"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <Link to="/home" className="text-xl font-bold tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">M</div>
              MUNTAZIR
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            {steps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isActive = index === currentStepIndex;

              return (
                <React.Fragment key={step.id}>
                  <div className={`flex items-center gap-2 ${isActive ? 'text-black font-semibold' : isCompleted ? 'text-emerald-600' : 'text-gray-400'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${isActive ? 'border-black bg-black text-white' :
                        isCompleted ? 'border-emerald-600 bg-emerald-600 text-white' :
                          'border-gray-300'
                      }`}>
                      {isCompleted ? <Check size={14} /> : index + 1}
                    </div>
                    <span className="text-sm">{step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight size={16} className="text-gray-300" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          <div className="text-sm text-gray-500 md:hidden">
            Step {currentStepIndex + 1} of 4
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 Luxe Travel Experiences. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-black transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
