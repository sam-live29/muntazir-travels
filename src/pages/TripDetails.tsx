import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  MapPin,
  Calendar,
  Users,
  Star,
  Check,
  Info,
  Phone,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  XCircle,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TripDetails: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestStatus, setRequestStatus] = useState<'none' | 'processing' | 'success'>('none');
  const [requestReason, setRequestReason] = useState('');

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAction = () => {
    if (!requestReason.trim()) {
      alert('Please provide a reason for your request');
      return;
    }
    setRequestStatus('processing');
    // Simulate API call
    setTimeout(() => {
      setRequestStatus('success');
      setRequestReason('');
    }, 2000);
  };

  const Skeleton = () => (
    <div className="p-6 animate-pulse">
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 mb-6">
        <div className="h-48 bg-slate-100" />
        <div className="p-5 space-y-4">
          <div className="h-6 w-3/4 bg-slate-100 rounded" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-10 bg-slate-100 rounded-xl" />
            <div className="h-10 bg-slate-100 rounded-xl" />
          </div>
        </div>
      </div>
      <div className="space-y-4 mb-8">
        <div className="h-6 w-1/3 bg-slate-100 rounded" />
        <div className="h-32 bg-white rounded-3xl border border-slate-100" />
      </div>
      <div className="space-y-4 mb-8">
        <div className="h-6 w-1/3 bg-slate-100 rounded" />
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-12 bg-white rounded-2xl border border-slate-100" />)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-background-light min-h-full pb-32">

      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="p-6">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 mb-6">
            <div className="h-48 relative">
              <img
                alt="Gulmarg"
                className="w-full h-full object-cover"
                src="/images/240_F_1177250477_I728pe1U9q5nIfINKmdNzNvjJmnCJCEA.jpg"
              />
              <div className="absolute bottom-4 left-4">
                <span className="bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Upcoming</span>
              </div>
            </div>
            <div className="p-5">
              <h2 className="text-xl font-bold mb-4">Gulmarg Winter Wonder</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Dates</p>
                    <p className="text-xs font-semibold">Dec 20 - 25</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Guests</p>
                    <p className="text-xs font-semibold">2 Adults</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Booking ID</span>
                <span className="text-sm font-bold text-slate-900">#MT-2024-8921</span>
              </div>
              <div className="h-px bg-slate-50 w-full" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Package</span>
                <span className="text-sm font-bold text-slate-900">Gulmarg Winter Wonder</span>
              </div>
              <div className="h-px bg-slate-50 w-full" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Dates</span>
                <span className="text-sm font-bold text-slate-900">Dec 20 - Dec 25, 2024</span>
              </div>
              <div className="h-px bg-slate-50 w-full" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Guests</span>
                <span className="text-sm font-bold text-slate-900">2 Adults</span>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">Inclusions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Airport Pickup', '4 Star Hotel', 'Breakfast & Dinner', 'Local Guide', 'Private Cab', 'Sightseeing'
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-slate-100">
                  <div className="bg-emerald-500/10 p-1 rounded-full text-emerald-500">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-xs font-medium">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">Travel Guide</h3>
            <div className="bg-primary/5 rounded-3xl p-5 border border-primary/10">
              <div className="flex items-center gap-4 mb-4">
                <img
                  alt="Guide"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-lHz_HGTLY6zG-jhoceRuYfRqSFaBef17s2R6BUKAiy6bmyAGXznqad4E9G9fKNj_QYKDQvAKtHaUJI-fVok1aihWoAaI1paY-6ltda3JmEQI0Dxvuh63uBEkmOstSk8S0yc1ndQsd3RaOPH4HlHOK0zcEy4Ayqs-bQp6Va8-y96NdxCsm3PquX2HSIdB2xRuPy1DZ0hDLJldrtkbzB6psiGNstlSBuNmPa6gdVZdcj0sTfJCCaNJTr4uIHFU16UC4My-eZxo5As"
                />
                <div>
                  <h4 className="font-bold">Muntazir Ahmad</h4>
                  <p className="text-xs text-slate-500">Local Expert • 8+ Years Experience</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <button className="bg-white p-2 rounded-full shadow-sm text-primary">
                    <Phone size={18} />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-sm text-primary">
                    <MessageSquare size={18} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Assalamu Alaikum! I will be your primary contact for this trip. Looking forward to showing you the hidden gems of Gulmarg."
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">Cancellation Policy</h3>
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-emerald-500/10 p-2 rounded-xl text-emerald-600 shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Free Cancellation</h4>
                  <p className="text-xs text-slate-500 mt-1">Full refund if you cancel up to 7 days before the trip starts.</p>
                </div>
              </div>
              <div className="h-px bg-slate-100 w-full mb-4" />
              <div className="flex items-start gap-4">
                <div className="bg-amber-500/10 p-2 rounded-xl text-amber-600 shrink-0">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Late Cancellation</h4>
                  <p className="text-xs text-slate-500 mt-1">A 50% charge applies for cancellations made within 7 days of the trip.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">Manage Booking</h3>
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                Need to make changes? You can request a cancellation or a refund here.
              </p>
              <button
                onClick={() => setShowRequestModal(true)}
                className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white font-bold py-4 rounded-2xl active:scale-95 transition-all text-xs uppercase tracking-widest"
              >
                <RotateCcw size={16} />
                Cancellations and Refund
              </button>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Important Info</h3>
              <Info size={18} className="text-slate-400" />
            </div>
            <div className="space-y-3">
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                <p className="text-xs text-amber-800 font-medium">
                  Please carry heavy woolens as temperatures in Gulmarg can drop below -10°C during December.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 z-50">
        <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2">
          Download E-Ticket
        </button>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {showRequestModal && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (requestStatus !== 'processing') {
                  setShowRequestModal(false);
                }
              }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full max-w-md bg-white rounded-t-[3rem] sm:rounded-[3rem] p-8 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8 sm:hidden" />

              {requestStatus === 'success' ? (
                <div className="text-center py-6">
                  <div className="size-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Request Submitted</h3>
                  <p className="text-slate-500 text-sm mb-8">
                    Your request has been received. Our team will review it and get back to you within 3-5 business days.
                  </p>
                  <button
                    onClick={() => {
                      setRequestStatus('none');
                      setShowRequestModal(false);
                    }}
                    className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl active:scale-95 transition-all"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="size-16 bg-slate-100 text-slate-900 rounded-2xl flex items-center justify-center mb-6">
                    <RotateCcw size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    Cancellations and Refund
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                    Please provide a reason for your cancellation or refund request.
                  </p>

                  <textarea
                    value={requestReason}
                    onChange={(e) => setRequestReason(e.target.value)}
                    placeholder="Reason for request..."
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl mb-8 focus:ring-2 focus:ring-slate-900 outline-none min-h-[120px] text-sm"
                  />

                  <div className="flex flex-col gap-3">
                    <button
                      disabled={requestStatus === 'processing'}
                      onClick={handleAction}
                      className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {requestStatus === 'processing' && <div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />}
                      {requestStatus === 'processing' ? 'Processing...' : 'Submit Request'}
                    </button>
                    <button
                      disabled={requestStatus === 'processing'}
                      onClick={() => {
                        setShowRequestModal(false);
                      }}
                      className="w-full bg-slate-100 text-slate-600 font-black py-5 rounded-2xl active:scale-95 transition-all disabled:opacity-50"
                    >
                      Go Back
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TripDetails;
