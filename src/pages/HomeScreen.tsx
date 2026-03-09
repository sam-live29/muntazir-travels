import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, ChevronLeft, ChevronRight, Phone, Mail, Map as MapIcon, Clock, Image as ImageIcon, Compass } from 'lucide-react';
import { cartService } from '../services/cartService';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import HeroBanners from '../components/HeroBanners';
import WishlistButton from '../components/WishlistButton';
import { packages } from '../data/packages';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTravelers, setActiveTravelers] = React.useState(1240);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveTravelers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const featuredPackages = packages.slice(0, 6);
  const packagesRef = React.useRef<HTMLDivElement>(null);

  const scrollPackages = (direction: 'left' | 'right') => {
    if (packagesRef.current) {
      const { scrollLeft, clientWidth } = packagesRef.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;

      packagesRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-background-light flex flex-col h-full">
      <div className="px-6 md:px-12 pt-6 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">Where would you <br className="hidden md:block" /> like to go?</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeTravelers.toLocaleString()} travelers active now</p>
            </div>
          </div>
          <div className="relative flex-1 md:max-w-md">
            <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
              <Search size={18} />
            </span>
            <input
              readOnly
              onClick={() => navigate('/search')}
              className="w-full pl-11 pr-4 py-3 bg-white border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-primary hover:shadow-md transition-shadow text-sm cursor-pointer"
              placeholder="Search destinations..."
              type="text"
            />
          </div>
        </div>

        <div className="w-[100vw] relative left-1/2 -translate-x-1/2">
          <HeroBanners />
        </div>
        <section className="mb-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900">Categories</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Browse by your interest</p>
            </div>
            <button onClick={() => navigate('/categories')} className="text-primary text-[10px] font-bold uppercase tracking-widest">View All</button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3">
            <button
              onClick={() => navigate('/search')}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-amber-50 rounded-[1.5rem] border border-amber-100 shadow-sm active:scale-95 transition-all group"
            >
              <div className="size-10 flex items-center justify-center bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <Star className="text-amber-500" size={20} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-amber-900">Featured</span>
            </button>
            <button
              onClick={() => navigate('/gallery')}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-purple-50 rounded-[1.5rem] border border-purple-100 shadow-sm active:scale-95 transition-all group"
            >
              <div className="size-10 flex items-center justify-center bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <ImageIcon className="text-purple-500" size={20} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-purple-900">Gallery</span>
            </button>
            <button
              onClick={() => navigate('/search')}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-emerald-50 rounded-[1.5rem] border border-emerald-100 shadow-sm active:scale-95 transition-all group"
            >
              <div className="size-10 flex items-center justify-center bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <MapIcon className="text-emerald-500" size={20} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-900">Map</span>
            </button>
            <button
              onClick={() => navigate('/search')}
              className="hidden md:flex flex-col items-center justify-center gap-2 p-4 bg-pink-50 rounded-[1.5rem] border border-pink-100 shadow-sm active:scale-95 transition-all group"
            >
              <div className="size-10 flex items-center justify-center bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <Clock className="text-pink-500" size={20} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-pink-900">Recent</span>
            </button>
            <button
              onClick={() => navigate('/search')}
              className="hidden md:flex flex-col items-center justify-center gap-2 p-4 bg-rose-50 rounded-[1.5rem] border border-rose-100 shadow-sm active:scale-95 transition-all group"
            >
              <div className="size-10 flex items-center justify-center bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <Star className="text-rose-500" size={20} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-rose-900">Top</span>
            </button>
            <button
              onClick={() => navigate('/search')}
              className="hidden md:flex flex-col items-center justify-center gap-2 p-4 bg-indigo-50 rounded-[1.5rem] border border-indigo-100 shadow-sm active:scale-95 transition-all group"
            >
              <div className="size-10 flex items-center justify-center bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <Compass className="text-indigo-500" size={20} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-indigo-900">Deals</span>
            </button>
          </div>
        </section>

        <section className="mb-12 relative group/packages">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Featured Packages</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Handpicked for you</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 mr-2">
                <button
                  onClick={() => scrollPackages('left')}
                  className="size-8 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all active:scale-90"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={() => scrollPackages('right')}
                  className="size-8 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all active:scale-90"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
              <button className="text-primary text-sm font-bold uppercase tracking-widest">View All</button>
            </div>
          </div>
          <div
            ref={packagesRef}
            className="flex gap-6 overflow-x-auto no-scrollbar -mx-6 px-6 pb-4 scroll-smooth"
          >
            {featuredPackages.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => navigate(`/package/${pkg.id}`)}
                className="min-w-[300px] md:min-w-[350px] bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 group cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={pkg.image} />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <WishlistButton item={pkg} />
                    <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl text-xs font-black text-amber-500 flex items-center gap-1.5 shadow-lg border border-amber-100">
                      <Star size={14} fill="currentColor" /> {pkg.rating}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border border-white/20 shadow-lg">
                      {pkg.days} Days
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-black text-xl mb-2 text-slate-900">{pkg.title}</h3>
                  <div className="flex items-center text-slate-400 text-sm mb-4 font-bold">
                    <MapPin size={16} className="mr-2 text-primary" />
                    {pkg.location}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price starts at</span>
                      <span className="text-emerald-600 font-black text-2xl">₹{pkg.price.toLocaleString()}</span>
                    </div>
                    <button className="bg-gradient-to-r from-primary to-indigo-600 text-white px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">Book</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Why Choose Muntazir Travels?</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Experience the difference of local expertise</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <MapPin className="text-emerald-500" />, title: "Local Experts", desc: "True insights from local guides" },
              { icon: <Star className="text-amber-500" />, title: "Best Experience", desc: "Curated premium itineraries" },
              { icon: <Phone className="text-indigo-500" />, title: "24/7 Support", desc: "Always here when you need us" },
              { icon: <Clock className="text-rose-500" />, title: "Secure Booking", desc: "Fast & safe payment process" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="size-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h4 className="font-black text-sm text-slate-900 mb-1">{item.title}</h4>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Travel Blogs */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Travel Stories</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Get inspired for your next journey</p>
            </div>
            <button onClick={() => navigate('/blogs')} className="text-primary text-sm font-bold uppercase tracking-widest hover:underline">Read All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: "kashmiri-cuisine-guide",
                title: "Traditional Kashmiri Cuisine: A Foodie's Paradise",
                image: "/images/kashmir_thumb_autumn_1773077687668.png",
                date: "March 5, 2024",
                readTime: "5 min read"
              },
              {
                id: "gurez-valley-hidden-jewel",
                title: "Gurez Valley: The Hidden Jewel of Jammu & Kashmir",
                image: "/images/kashmir_gurez_1773078269626.png",
                date: "February 28, 2024",
                readTime: "8 min read"
              },
              {
                id: "first-trip-gulmarg-packing",
                title: "How to Pack for Your First Trip to Gulmarg",
                image: "/images/kashmir_banner_snow_1773077629818.png",
                date: "February 20, 2024",
                readTime: "4 min read"
              }
            ].map((blog, idx) => (
              <div key={idx} onClick={() => navigate(`/blog/${blog.id}`)} className="group cursor-pointer">
                <div className="relative h-48 rounded-[2rem] overflow-hidden mb-4 shadow-sm border border-slate-100">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-sm">Kashmir Guide</span>
                  </div>
                </div>
                <div className="px-1">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    <span>{blog.date}</span>
                    <span className="size-1 bg-slate-200 rounded-full"></span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 leading-snug group-hover:text-primary transition-colors">{blog.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16 bg-slate-900 -mx-6 md:-mx-12 px-6 md:px-12 py-16 rounded-[3rem]">
          <div className="text-center mb-12">
            <h2 className="text-white text-2xl md:text-3xl font-black mb-2">Happy Travelers</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Stories from those who explored Kashmir with us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Ananya Sharma",
                location: "Delhi",
                text: "The houseboat stay in Dal Lake was absolutely magical. Muntazir Travels handled every detail with perfection. Highly recommend!",
                rating: 5
              },
              {
                name: "Rahul Mehra",
                location: "Mumbai",
                text: "Professional services and very knowledgeable guides. Our winter trip to Gulmarg was the highlight of our year.",
                rating: 5
              },
              {
                name: "Priyanka Chopra",
                location: "Bangalore",
                text: "A seamless experience from booking to departure. The local insights shared by the team truly made the trip unique.",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2.5rem] relative">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-300 text-sm italic leading-relaxed mb-6 font-medium">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-gradient-to-br from-primary to-indigo-600 rounded-full"></div>
                  <div>
                    <h4 className="text-white font-black text-sm">{testimonial.name}</h4>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary to-indigo-600 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 size-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 size-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="text-white text-3xl md:text-4xl font-black mb-4">Get Special Offers</h2>
              <p className="text-white/80 text-sm md:text-base font-medium mb-8">Join 5,000+ travelers and receive our exclusive deals and travel guides directly in your inbox.</p>

              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-white/50 outline-none focus:bg-white/20 transition-all font-medium"
                />
                <button className="bg-white text-slate-900 font-black px-10 py-4 rounded-2xl hover:bg-slate-50 transition-colors uppercase tracking-widest text-xs">
                  Subscribe
                </button>
              </div>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-4">We respect your privacy. Unsubscribe anytime.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Need Help?</h2>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Call Us Anytime</p>
                <p className="font-bold text-lg">+91 7889570933</p>
              </div>
              <button className="ml-auto bg-slate-100 p-2 rounded-full text-slate-600">
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="h-px bg-slate-100"></div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Email Address</p>
                <p className="font-bold text-sm">muntazirtravels.09@gmail.com</p>
              </div>
              <button className="ml-auto bg-slate-100 p-2 rounded-full text-slate-600">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </section>

        <footer className="text-center py-4">
          <p className="text-slate-400 text-xs font-medium tracking-widest uppercase">Muntazir Travels • Srinagar, J&K</p>
        </footer>
      </div>
    </div>
  );
};

export default HomeScreen;
