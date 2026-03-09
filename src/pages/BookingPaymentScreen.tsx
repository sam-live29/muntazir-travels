import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft, CreditCard, PenTool, ChevronDown, ArrowRight } from 'lucide-react';
import { packages } from '../data/packages';

const BookingPaymentScreen: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const formData = location.state as any;
    const packageData = packages.find(p => p.id === Number(id)) || packages[0];

    // If someone navigates directly without state
    const totalAmount = formData?.totalAmount || 0;
    const contactInfo = formData?.contactInfo || { fullName: '', email: '', mobile: '' };

    const [payment, setPayment] = useState({
        advanceAmount: (totalAmount * 0.2).toString(),
        method: 'UPI'
    });

    const [declaration, setDeclaration] = useState({
        agreed: false, signature: '', date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        // Cleanup function to ensure the body overflow is always reset
        // if the user navigates away from this screen while the Razorpay modal is open
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!declaration.agreed) {
            alert("Please agree to the terms and conditions.");
            return;
        }
        if (!declaration.signature) {
            alert("Please provide a signature in the declaration section.");
            return;
        }

        const res = await loadRazorpayScript();

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        const amountToPay = parseFloat(payment.advanceAmount) || totalAmount;

        const options = {
            key: 'rzp_test_YourTestKeyHere', // Replace with Live Key for production
            amount: amountToPay * 100, // Amount in paisa
            currency: 'INR',
            name: 'Muntazir Travels',
            description: `Payment for ${packageData.title}`,
            image: 'https://cdn.iconscout.com/icon/free/png-256/free-travel-icon-download-in-svg-png-gif-file-formats--trip-luggage-bag-tourism-and-pack-1188383.png?f=webp',
            handler: function (response: any) {
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                navigate('/bookings');
            },
            prefill: {
                name: contactInfo.fullName || '',
                email: contactInfo.email || '',
                contact: contactInfo.mobile || ''
            },
            theme: {
                color: '#0f172a'
            },
            modal: {
                ondismiss: function () {
                    // Force re-enable scrolling in case Razorpay script leaves it locked
                    document.body.style.overflow = 'auto';
                }
            }
        };

        const paymentObject = new (window as any).Razorpay(options);
        // Force overflow auto when opening as well just in case, though it's the dismiss that gets stuck
        paymentObject.open();
    };

    const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all";
    const labelClass = "block text-xs font-bold text-slate-500 mb-1 pointer-events-none uppercase tracking-wide";

    if (!formData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <p className="text-slate-600 font-medium mb-4">No booking data found. Please complete the form first.</p>
                    <button onClick={() => navigate(-1)} className="text-primary font-bold hover:underline">Go back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <header className="px-6 py-4 flex items-center bg-white border-b border-slate-100 sticky top-0 z-50">
                <div className="ml-0">
                    <h1 className="text-lg font-black text-slate-900">Payment & Declaration</h1>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{packageData.title} • Step 2</p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-4 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Payment Details */}
                    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <span className="bg-primary/10 text-primary p-2 rounded-lg"><CreditCard size={18} /></span>
                            Payment Details
                        </h2>

                        <div className="bg-slate-50 p-4 rounded-xl mb-6 border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <span className="text-slate-700 font-bold block mb-1 text-sm">Total Package Price</span>
                                <p className="text-xs text-slate-500">Includes fare and taxes</p>
                            </div>
                            <span className="text-2xl font-bold text-slate-900">₹{totalAmount.toLocaleString('en-IN')}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
                            <div>
                                <label className={labelClass}>Advance Payment Amount</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">₹</span>
                                    <input required type="number" className={`${inputClass} pl-8`} value={payment.advanceAmount} onChange={e => setPayment({ ...payment, advanceAmount: e.target.value })} />
                                </div>
                                <p className="text-[10px] text-slate-400 mt-1 pl-1">Min 20% required: ₹{(totalAmount * 0.2).toLocaleString('en-IN')}</p>
                            </div>
                            <div>
                                <label className={labelClass}>Payment Method</label>
                                <div className="relative">
                                    <select className={`${inputClass} appearance-none`} value={payment.method} onChange={e => setPayment({ ...payment, method: e.target.value })}>
                                        <option value="UPI">UPI</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Credit / Debit Card">Credit / Debit Card</option>
                                        <option value="Cash">Cash</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Declaration */}
                    <section className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="bg-white/10 text-white p-2 rounded-lg"><PenTool size={18} /></span>
                            Declaration
                        </h2>

                        <label className="flex items-start gap-4 mb-8 cursor-pointer group">
                            <div className={`mt-1 size-6 shrink-0 rounded-md flex items-center justify-center border-2 transition-all ${declaration.agreed ? 'bg-primary border-primary' : 'border-slate-500 group-hover:border-slate-400'}`}>
                                <input type="checkbox" className="opacity-0 absolute w-0 h-0" checked={declaration.agreed} onChange={e => setDeclaration({ ...declaration, agreed: e.target.checked })} />
                                {declaration.agreed && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                )}
                            </div>
                            <span className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                                I confirm that the above information is correct and I agree to the tour company's <a href="#" className="text-white underline font-bold hover:text-primary transition-colors">terms and conditions</a>, cancellation policy, and privacy policy.
                            </span>
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Signature <span className="text-[10px] lowercase font-normal opacity-70">(Type Full Name)</span></label>
                                <input required type="text" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary outline-none transition-all font-mono text-sm" value={declaration.signature} onChange={e => setDeclaration({ ...declaration, signature: e.target.value })} placeholder="electronic signature" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Date</label>
                                <input required type="date" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary outline-none transition-all text-sm" value={declaration.date} onChange={e => setDeclaration({ ...declaration, date: e.target.value })} />
                            </div>
                        </div>

                        <button type="submit" disabled={!declaration.agreed || !declaration.signature} className={`w-full mt-6 font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-base ${declaration.agreed && declaration.signature ? 'bg-primary text-white hover:bg-primary/90' : 'bg-white/10 text-white/50 cursor-not-allowed'}`}>
                            Confirm & Proceed
                            <ArrowRight size={18} />
                        </button>
                    </section>
                </form>
            </main>
        </div>
    );
};

export default BookingPaymentScreen;
