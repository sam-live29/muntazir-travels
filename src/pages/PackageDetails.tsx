import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ChevronLeft,
  Share2,
  Heart,
  Star,
  Clock,
  Hotel,
  Utensils,
  ArrowRight,
  Phone,
  Bookmark,
  ShoppingCart,
  Calendar,
  Check,
  PlaneLanding,
  PlaneTakeoff,
  Mountain,
  Camera,
  Map as MapIcon,
  Snowflake,
  Waves,
  Coffee,
  X,
  RotateCcw,
  AlertCircle,
  Loader2,
  Settings,
  Link,
  Mail,
  MessageCircle,
  Facebook,
  Twitter
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { cartService } from '../services/cartService';
import { motion, AnimatePresence } from 'motion/react';
import WeatherForecast from '../components/WeatherForecast';
import BookingCalendar from '../components/BookingCalendar';
import FAQSection from '../components/FAQSection';
import ReviewsSection from '../components/ReviewsSection';
import { wishlistService } from '../services/wishlistService';
import { packages } from '../data/packages';

const PackageDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const packageData = packages.find(p => p.id === Number(id)) || packages[0];
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState(packageData.days);
  const [cartCount, setCartCount] = useState(cartService.getCartCount());
  const [isAdding, setIsAdding] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processSuccess, setProcessSuccess] = useState(false);
  const [requestReason, setRequestReason] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  const handleSubmitRequest = () => {
    if (!requestReason.trim()) {
      alert('Please provide a reason for your request');
      return;
    }
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setProcessSuccess(true);
      setTimeout(() => {
        setProcessSuccess(false);
        setShowRequestModal(false);
        setRequestReason('');
      }, 2000);
    }, 1500);
  };

  useEffect(() => {
    const updateCount = () => setCartCount(cartService.getCartCount());
    window.addEventListener('cart-updated', updateCount);
    return () => window.removeEventListener('cart-updated', updateCount);
  }, []);

  const handleAddToCart = () => {
    setIsAdding(true);
    cartService.addToCart(packageData, guests, selectedDuration, currentDurationOption.priceMultiplier);

    // Reset state after animation
    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  const durationOptions = useMemo(() => {
    const options = [
      { label: 'Standard', days: packageData.days, nights: packageData.nights, priceMultiplier: 1 },
    ];

    if (packageData.days > 2) {
      options.push({ label: 'Short', days: packageData.days - 1, nights: packageData.nights - 1, priceMultiplier: 0.8 });
    }

    options.push({ label: 'Extended', days: packageData.days + 2, nights: packageData.nights + 2, priceMultiplier: 1.4 });

    return options;
  }, [packageData]);

  const currentDurationOption = durationOptions.find(o => o.days === selectedDuration) || durationOptions[0];
  const totalPrice = Math.floor(packageData.price * guests * currentDurationOption.priceMultiplier);

  const displayedItinerary = useMemo(() => {
    const original = packageData.itinerary;
    const targetDays = selectedDuration;

    if (targetDays === packageData.days) return original;

    if (targetDays < packageData.days) {
      // Truncate: Keep first N-1 days and the last day (departure)
      const start = original.slice(0, targetDays - 1);
      const end = original[original.length - 1];
      return [...start, { ...end, day: targetDays }];
    } else {
      // Extend: Add extra days before the last day
      const start = original.slice(0, original.length - 1);
      const end = original[original.length - 1];

      const extraDays = [];
      for (let i = original.length; i < targetDays; i++) {
        extraDays.push({
          day: i,
          title: "Leisure & Local Exploration",
          desc: "Spend the day at your own pace. Explore local markets, try traditional cuisine, or revisit your favorite spots in the city."
        });
      }

      return [...start, ...extraDays, { ...end, day: targetDays }];
    }
  }, [packageData, selectedDuration]);

  // Mock date captions for demo
  const dateCaptions = useMemo(() => {
    const captions: Record<string, string> = {};
    const today = new Date();

    // Add some mock captions for the next few days
    for (let i = 1; i <= 15; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const dateStr = date.toDateString();

      if (i === 3) captions[dateStr] = "Fast Filling";
      if (i === 5) captions[dateStr] = "Low Price";
      if (i === 7) captions[dateStr] = "Last 2 Seats";
      if (i === 10) captions[dateStr] = "Special Offer";
    }
    return captions;
  }, []);

  useEffect(() => {
    setIsWishlisted(wishlistService.isInWishlist(packageData.id));
  }, [packageData.id]);

  const toggleWishlist = () => {
    if (isWishlisted) {
      wishlistService.removeFromWishlist(packageData.id);
    } else {
      wishlistService.addToWishlist({
        id: packageData.id,
        title: packageData.title,
        location: packageData.location,
        price: packageData.price,
        rating: packageData.rating,
        image: packageData.image,
      });
    }
    setIsWishlisted(!isWishlisted);
  };

  const [isCalendarOpen, setIsCalendarOpen] = useState(true);

  useEffect(() => {
    if (selectedDate) {
      setIsCalendarOpen(false);
    }
  }, [selectedDate]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={24} />,
      color: 'bg-[#25D366]',
      action: () => {
        const url = `https://wa.me/?text=${encodeURIComponent(`Check out this amazing Srinagar trip: ${window.location.href}`)}`;
        window.open(url, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: <Facebook size={24} />,
      color: 'bg-[#1877F2]',
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
      }
    },
    {
      name: 'Twitter',
      icon: <Twitter size={24} />,
      color: 'bg-[#1DA1F2]',
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this amazing Srinagar trip!`)}&url=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
      }
    },
    {
      name: 'Email',
      icon: <Mail size={24} />,
      color: 'bg-slate-600',
      action: () => {
        const url = `mailto:?subject=${encodeURIComponent(packageData.title)}&body=${encodeURIComponent(`Check out this amazing trip package: ${window.location.href}`)}`;
        window.location.href = url;
      }
    },
    {
      name: 'Copy Link',
      icon: <Link size={24} />,
      color: 'bg-primary',
      action: async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setShowCopiedToast(true);
          setTimeout(() => setShowCopiedToast(false), 2000);
          setShowShareModal(false);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      }
    }
  ];

  return (
    <div className="bg-background-light text-slate-900 min-h-full pb-32">
      <div className="relative h-[45vh] w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden">
        <img
          alt={packageData.title}
          className="w-full h-full object-cover"
          src={packageData.image}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center text-white">
          <button
            onClick={handleBack}
            className="bg-black/20 backdrop-blur-md p-2 rounded-full hover:bg-black/40 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
            <motion.button
              onClick={() => navigate('/cart')}
              animate={isAdding ? { scale: [1, 1.2, 1] } : {}}
              className="bg-black/20 backdrop-blur-md p-2 rounded-full hover:bg-black/40 transition-colors relative"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1 -right-1 size-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-black/20"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>
            <button
              onClick={handleShare}
              className="bg-black/20 backdrop-blur-md p-2 rounded-full hover:bg-black/40 transition-colors"
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={toggleWishlist}
              className={`bg-black/20 backdrop-blur-md p-2 rounded-full transition-all duration-300 ${isWishlisted ? 'bg-rose-500 text-white' : 'hover:bg-black/40 text-white'}`}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 text-white">
          <span className="bg-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">Top Rated</span>
          <h1 className="text-3xl font-display mt-2 leading-tight">{packageData.title}</h1>
        </div>
      </div>

      <main className="relative -mt-6 rounded-t-3xl bg-background-light p-6 max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Muntazir Travels</p>
                  <div className="flex items-center mt-1 text-amber-400">
                    {[1, 2, 3, 4].map(i => <Star key={i} size={16} fill="currentColor" />)}
                    <Star size={16} className="text-amber-400/50" />
                    <span className="text-xs text-slate-500 ml-2">({Math.floor(packageData.rating * 25)} Reviews)</span>
                  </div>
                </div>
                <div className="text-right lg:hidden">
                  <p className="text-primary font-bold text-xl leading-none">₹{packageData.price.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-slate-500 mt-1">per person</p>
                </div>
              </div>

              <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar py-2">
                <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl shadow-sm border border-slate-100 flex-shrink-0">
                  <Clock size={18} className="text-primary" />
                  <span className="text-sm font-medium">{packageData.days} Days / {packageData.nights} Nights</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl shadow-sm border border-slate-100 flex-shrink-0">
                  <Hotel size={18} className="text-primary" />
                  <span className="text-sm font-medium">{packageData.hotelRating} Stays</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl shadow-sm border border-slate-100 flex-shrink-0">
                  <Utensils size={18} className="text-primary" />
                  <span className="text-sm font-medium">{packageData.mealsIncluded ? 'Meals Incl.' : 'Breakfast Only'}</span>
                </div>
              </div>

              <section className="mb-8">
                <h2 className="text-lg font-bold mb-3">About the Trip</h2>
                <p className="text-slate-600 leading-relaxed text-sm mb-6">
                  {packageData.description}
                </p>

                <div className="flex gap-3 md:max-w-md">
                  <button
                    onClick={toggleWishlist}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border transition-all duration-300 text-sm font-bold ${isWishlisted
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    <Bookmark size={18} fill={isWishlisted ? "currentColor" : "none"} />
                    {isWishlisted ? 'Saved' : 'Save Trip'}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-bold text-sm"
                  >
                    <Share2 size={18} />
                    Share Trip
                  </button>
                </div>
              </section>

              <WeatherForecast lat={34.0837} lon={74.7973} days={3} />

              <section className="mb-10">
                <div className="flex justify-between items-end mb-6">
                  <h2 className="text-lg font-bold">User Reviews</h2>
                  <button
                    onClick={() => navigate('/write-review')}
                    className="text-primary text-sm font-bold uppercase tracking-widest"
                  >
                    Write Review
                  </button>
                </div>

                <ReviewsSection packageId={packageData.id} />
              </section>

              <section>
                <h2 className="text-lg font-bold mb-6">Detailed Itinerary</h2>
                <div className="space-y-10 relative">
                  <div className="absolute top-0 bottom-0 left-[15px] w-[2px] bg-gradient-to-b from-primary/30 via-primary/10 to-transparent"></div>

                  {displayedItinerary.map((item, idx) => {
                    const getIcon = (title: string) => {
                      const t = title.toLowerCase();
                      if (t.includes('arrival')) return <PlaneLanding size={16} />;
                      if (t.includes('departure')) return <PlaneTakeoff size={16} />;
                      if (t.includes('skiing') || t.includes('snow')) return <Snowflake size={16} />;
                      if (t.includes('trek') || t.includes('glacier') || t.includes('peak')) return <Mountain size={16} />;
                      if (t.includes('lake') || t.includes('shikara') || t.includes('river') || t.includes('waterfall')) return <Waves size={16} />;
                      if (t.includes('sightseeing') || t.includes('tour') || t.includes('explore')) return <Camera size={16} />;
                      if (t.includes('garden') || t.includes('meadow')) return <MapIcon size={16} />;
                      return <Coffee size={16} />;
                    };

                    return (
                      <motion.div
                        key={item.day}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative pl-12"
                      >
                        <div className="absolute left-0 top-0 w-8 h-8 rounded-2xl bg-white shadow-md border border-slate-100 z-10 flex items-center justify-center text-primary">
                          {getIcon(item.title)}
                        </div>
                        <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Day {item.day}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Morning Activity</span>
                          </div>
                          <h3 className="text-md font-black text-slate-900 leading-tight">{item.title}</h3>
                          <p className="text-sm text-slate-500 mt-3 leading-relaxed font-medium">
                            {item.desc}
                          </p>
                          <div className="mt-4 flex gap-2">
                            <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-3 py-1 rounded-full border border-slate-100">Breakfast Included</span>
                            <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-3 py-1 rounded-full border border-slate-100">Guided Tour</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              <FAQSection />

              <section className="mt-12 mb-10 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="size-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Settings size={20} />
                  </div>
                  <h2 className="text-xl font-black text-slate-900">Manage Booking</h2>
                </div>

                <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                  Need to make changes? You can request a cancellation or refund here. Please note that all requests are subject to our cancellation policy and will be processed by our administration team.
                </p>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setShowRequestModal(true)}
                    className="w-full flex items-center gap-4 p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm active:scale-95 transition-all group hover:border-primary/20 hover:bg-primary/5"
                  >
                    <div className="size-14 flex items-center justify-center bg-primary/10 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                      <RotateCcw className="text-primary" size={28} />
                    </div>
                    <div className="text-left">
                      <span className="block text-[10px] font-black uppercase tracking-widest text-primary mb-1">Cancellations and Refund</span>
                      <span className="block text-sm font-bold text-slate-900">Request a cancellation or refund</span>
                    </div>
                  </button>
                </div>
              </section>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="hidden lg:block w-[350px]">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-24">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Starts at</p>
                  <p className="text-2xl font-bold text-slate-900">₹{packageData.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                  Best Value
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-medium">Duration</span>
                  <span className="text-slate-900 font-bold">{selectedDuration} Days / {currentDurationOption.nights} Nights</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-medium">Guests</span>
                  <span className="text-slate-900 font-bold">{guests} {guests === 1 ? 'Person' : 'People'}</span>
                </div>
                {selectedDate && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 font-medium">Date</span>
                    <span className="text-slate-900 font-bold">{selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                )}
                <div className="h-px bg-slate-100 my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-slate-900 font-bold">Total</span>
                  <span className="text-xl font-bold text-slate-900">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    navigate(`/checkout/${packageData.id}`);
                  }}
                  className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <span>Book Now</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${isAdding ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  {isAdding ? <Check size={16} /> : <ShoppingCart size={16} />}
                  {isAdding ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center mt-4 font-medium uppercase tracking-wide leading-relaxed">
                No hidden charges. Secure payment.<br />
                24/7 Local Support.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Footer Bar (Mobile Only) */}
      <footer className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center justify-between gap-4 z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Total</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-slate-900">₹{totalPrice.toLocaleString('en-IN')}</span>
            <span className="text-[10px] font-medium text-slate-500">/{guests}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end max-w-sm">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`hidden sm:flex p-3 rounded-xl transition-all duration-300 items-center justify-center relative overflow-hidden ${isAdding ? 'bg-emerald-50 border border-emerald-200 text-emerald-600' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
          >
            <motion.div
              animate={isAdding ? { y: -40, opacity: 0 } : { y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ShoppingCart size={18} />
            </motion.div>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={isAdding ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Check size={18} />
            </motion.div>
          </button>

          <button
            onClick={() => {
              navigate(`/checkout/${packageData.id}`);
            }}
            className="flex-1 md:flex-none md:px-8 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <span>Book Now</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </footer>

      {/* Share Toast */}
      {showCopiedToast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-2xl z-[100]"
        >
          Link copied to clipboard!
        </motion.div>
      )}

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-slate-900">Share Trip</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <p className="text-slate-500 mb-8 text-sm font-medium">
                Share this amazing experience with your friends and family!
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-8">
                {shareOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={option.action}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={cn(
                      "size-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all group-hover:scale-110 group-active:scale-95",
                      option.color
                    )}>
                      {option.icon}
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{option.name}</span>
                  </button>
                ))}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Direct Link</p>
                  <p className="text-sm font-medium text-slate-600 truncate">{window.location.href}</p>
                </div>
                <button
                  onClick={shareOptions.find(o => o.name === 'Copy Link')?.action}
                  className="p-3 bg-white border border-slate-200 rounded-xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  <Link size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cancellation & Refund Modal */}
      <AnimatePresence>
        {showRequestModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isProcessing && setShowRequestModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
            >
              {processSuccess ? (
                <div className="text-center py-8">
                  <div className="size-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Request Submitted</h3>
                  <p className="text-slate-500">Your request has been received. Our admin team will review it and get back to you within 3-5 business days.</p>
                </div>
              ) : (
                <>
                  <div className="size-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <RotateCcw size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Cancellations and Refund</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">
                    Please provide a reason for your cancellation or refund request. This will help our team process it efficiently.
                  </p>
                  <textarea
                    value={requestReason}
                    onChange={(e) => setRequestReason(e.target.value)}
                    placeholder="Reason for cancellation or refund..."
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl mb-8 focus:ring-2 focus:ring-primary outline-none min-h-[120px] text-sm"
                  />
                  <div className="flex gap-3">
                    <button
                      disabled={isProcessing}
                      onClick={() => setShowRequestModal(false)}
                      className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 text-slate-600 font-black uppercase tracking-widest text-xs active:scale-95 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isProcessing}
                      onClick={handleSubmitRequest}
                      className="flex-1 px-6 py-4 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      {isProcessing ? <Loader2 size={18} className="animate-spin" /> : 'Submit Request'}
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

export default PackageDetails;
