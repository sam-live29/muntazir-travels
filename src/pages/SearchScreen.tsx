import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Search as SearchIcon, X, MapPin, History, TrendingUp, Star, SlidersHorizontal, Calendar, Clock, IndianRupee, ShoppingCart, Plus } from 'lucide-react';
import { cartService } from '../services/cartService';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { packages } from '../data/packages';

const SearchScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cartCount, setCartCount] = useState(cartService.getCartCount());

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  useEffect(() => {
    const updateCount = () => setCartCount(cartService.getCartCount());
    window.addEventListener('cart-updated', updateCount);
    return () => window.removeEventListener('cart-updated', updateCount);
  }, []);
  
  // Filter States
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [duration, setDuration] = useState<number | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const recentSearches = ["Gulmarg", "Dal Lake", "Pahalgam", "Houseboat", "Gurez", "Sonamarg"];
  const popularDestinations = [
    { name: "Srinagar", count: "120+ Packages" },
    { name: "Sonamarg", count: "45+ Packages" },
    { name: "Pahalgam", count: "80+ Packages" },
    { name: "Gulmarg", count: "60+ Packages" },
    { name: "Doodhpathri", count: "30+ Packages" },
    { name: "Gurez Valley", count: "15+ Packages" },
    { name: "Yusmarg", count: "20+ Packages" },
  ];

  const filteredPackages = useMemo(() => {
    let result = packages;

    // Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.location.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    } else {
      // If no search query and no filters, return empty for results section
      if (!duration && !minRating && !selectedMonth && priceRange[0] === 0 && priceRange[1] === 50000) {
        return [];
      }
    }

    // Price Filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Duration Filter
    if (duration) {
      result = result.filter(p => p.days === duration);
    }

    // Rating Filter
    if (minRating) {
      result = result.filter(p => p.rating >= minRating);
    }

    // Month Filter
    if (selectedMonth) {
      result = result.filter(p => p.months.includes(selectedMonth));
    }

    return result;
  }, [searchQuery, priceRange, duration, minRating, selectedMonth]);

  const resetFilters = () => {
    setPriceRange([0, 50000]);
    setDuration(null);
    setMinRating(null);
    setSelectedMonth(null);
  };

  const activeFilterCount = [
    priceRange[0] !== 0 || priceRange[1] !== 50000,
    duration !== null,
    minRating !== null,
    selectedMonth !== null
  ].filter(Boolean).length;

  return (
    <div className="bg-white min-h-full flex flex-col relative overflow-hidden">
      <header className="p-4 flex items-center gap-3 sticky top-0 bg-white z-20 border-b border-slate-50">
        <button onClick={() => navigate(-1)} className="text-slate-900 p-1">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Where to?"
            className="w-full pl-11 pr-10 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all text-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button 
          onClick={() => navigate('/cart')}
          className="p-3 bg-slate-50 text-slate-600 rounded-2xl transition-all relative"
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 size-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>
        <button 
          onClick={() => setIsFilterOpen(true)}
          className={cn(
            "p-3 rounded-2xl transition-all relative",
            activeFilterCount > 0 ? "bg-primary text-white" : "bg-slate-50 text-slate-600"
          )}
        >
          <SlidersHorizontal size={20} />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 size-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
        {(searchQuery.trim() || activeFilterCount > 0) ? (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {filteredPackages.length} Results Found
              </h3>
              {activeFilterCount > 0 && (
                <button onClick={resetFilters} className="text-primary text-xs font-bold">Clear Filters</button>
              )}
            </div>
            {filteredPackages.length > 0 ? (
              <div className="space-y-4">
                {filteredPackages.map((pkg) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={pkg.id} 
                    onClick={() => navigate(`/package/${pkg.id}`)}
                    className="flex items-center gap-4 w-full p-3 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <img src={pkg.image} alt={pkg.title} className="size-20 rounded-2xl object-cover" />
                    <div className="flex-1 text-left">
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-slate-900">{pkg.title}</p>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            cartService.addToCart(pkg);
                          }}
                          className="size-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center active:scale-90 transition-all"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium mt-0.5">
                        <MapPin size={10} />
                        <span>{pkg.location}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <span className="text-primary font-black text-sm">₹{pkg.price.toLocaleString()}</span>
                        <div className="flex items-center gap-1 text-slate-500">
                          <Clock size={12} />
                          <span className="text-[10px] font-bold">{pkg.days}D/{pkg.nights}N</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          <Star size={12} fill="currentColor" />
                          <span className="text-[10px] font-black">{pkg.rating}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <SearchIcon size={32} />
                </div>
                <p className="text-slate-900 font-bold">No matches found</p>
                <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or search query</p>
                <button onClick={resetFilters} className="mt-6 text-primary font-bold text-sm">Reset all filters</button>
              </div>
            )}
          </section>
        ) : (
          <>
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Recent Searches</h3>
                <button className="text-primary text-xs font-bold">Clear All</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item) => (
                  <button 
                    key={item} 
                    onClick={() => setSearchQuery(item)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full text-sm font-medium hover:bg-slate-100 transition-colors"
                  >
                    <History size={14} className="text-slate-400" />
                    {item}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Popular Destinations</h3>
              <div className="space-y-4">
                {popularDestinations.map((dest) => (
                  <button 
                    key={dest.name} 
                    onClick={() => setSearchQuery(dest.name)}
                    className="flex items-center gap-4 w-full group"
                  >
                    <div className="bg-primary/10 p-3 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <MapPin size={20} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-sm">{dest.name}</p>
                      <p className="text-xs text-slate-500">{dest.count}</p>
                    </div>
                    <TrendingUp size={16} className="text-slate-300" />
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Browse by Theme</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Honeymoon", color: "bg-pink-500" },
                  { label: "Adventure", color: "bg-orange-500" },
                  { label: "Family", color: "bg-blue-500" },
                  { label: "Budget", color: "bg-emerald-500" },
                ].map((theme) => (
                  <button 
                    key={theme.label} 
                    onClick={() => setSearchQuery(theme.label)}
                    className="relative h-24 rounded-2xl overflow-hidden group"
                  >
                    <div className={cn("absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity", theme.color)}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{theme.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Filter Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[40px] z-[101] p-8 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-900">Filters</h2>
                <button onClick={resetFilters} className="text-primary font-bold text-sm">Reset All</button>
              </div>

              <div className="space-y-10">
                {/* Price Range */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <IndianRupee size={18} className="text-primary" />
                    <h3 className="font-bold text-slate-900">Price Range</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Min Price</p>
                      <p className="font-black text-slate-900">₹{priceRange[0].toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Max Price</p>
                      <p className="font-black text-slate-900">₹{priceRange[1].toLocaleString()}</p>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="50000" 
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full mt-6 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </section>

                {/* Duration */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={18} className="text-primary" />
                    <h3 className="font-bold text-slate-900">Duration (Days)</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {[3, 4, 5, 6, 7, 8].map((d) => (
                      <button 
                        key={d}
                        onClick={() => setDuration(duration === d ? null : d)}
                        className={cn(
                          "px-6 py-3 rounded-2xl font-bold text-sm transition-all",
                          duration === d ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        {d} Days
                      </button>
                    ))}
                  </div>
                </section>

                {/* Ratings */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Star size={18} className="text-primary" />
                    <h3 className="font-bold text-slate-900">Minimum Rating</h3>
                  </div>
                  <div className="flex gap-3">
                    {[3, 4, 4.5, 5].map((r) => (
                      <button 
                        key={r}
                        onClick={() => setMinRating(minRating === r ? null : r)}
                        className={cn(
                          "flex-1 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all",
                          minRating === r ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        <Star size={14} fill={minRating === r ? "currentColor" : "none"} />
                        {r}+
                      </button>
                    ))}
                  </div>
                </section>

                {/* Travel Month */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={18} className="text-primary" />
                    <h3 className="font-bold text-slate-900">Travel Month</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {["March", "April", "May", "June", "July", "August"].map((m) => (
                      <button 
                        key={m}
                        onClick={() => setSelectedMonth(selectedMonth === m ? null : m)}
                        className={cn(
                          "py-3 rounded-2xl font-bold text-xs transition-all",
                          selectedMonth === m ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </section>
              </div>

              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-slate-900 text-white font-bold py-5 rounded-3xl mt-12 active:scale-[0.98] transition-transform"
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchScreen;
