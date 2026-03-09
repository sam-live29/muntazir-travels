import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';
import { CheckCircle2, Package, Calendar, ArrowRight, Download, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '../../lib/api';

export const SuccessPage: React.FC = () => {
  const { clearCart } = useCheckout();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear cart on success
    clearCart();
  }, []);

  const [isDownloading, setIsDownloading] = React.useState(false);
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));

      await api.saveUserAsset({
        prompt_input: `Itinerary & Receipt for Order #LX-${orderNumber}`,
        pdf_url: `https://example.com/receipt-${orderNumber}.pdf`,
        metadata: { order_number: orderNumber }
      });

      alert('Your itinerary and receipt have been generated and saved to your account!');
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8"
      >
        <CheckCircle2 size={48} />
      </motion.div>

      <h1 className="text-4xl font-bold tracking-tight mb-4">Order Confirmed!</h1>
      <p className="text-gray-500 text-lg mb-12">
        Thank you for choosing Luxe Travel. Your adventure begins soon.
        We've sent a confirmation email with all the details.
      </p>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden mb-12">
        <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-left">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order Number</span>
            <p className="text-xl font-bold">#LX-{orderNumber}</p>
          </div>
          <div className="text-left md:text-right">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Estimated Date</span>
            <p className="text-xl font-bold">Oct 12 - Oct 19, 2026</p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex items-start gap-4 text-left">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
              <Package size={20} />
            </div>
            <div>
              <h3 className="font-bold">Digital Tickets & Itinerary</h3>
              <p className="text-sm text-gray-500">Available for download in your account dashboard.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 text-left">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
              <Calendar size={20} />
            </div>
            <div>
              <h3 className="font-bold">Concierge Support</h3>
              <p className="text-sm text-gray-500">Your personal travel assistant will contact you within 24 hours.</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex flex-col md:flex-row gap-4">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 py-4 bg-white border border-gray-200 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all disabled:opacity-50"
          >
            {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            {isDownloading ? "Generating..." : "Download Itinerary"}
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg group"
          >
            Back to Home
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-400">
        Need help? <a href="#" className="text-black font-semibold underline underline-offset-4">Contact our 24/7 support team</a>
      </div>
    </div>
  );
};
