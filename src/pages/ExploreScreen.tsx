import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Filter, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import WishlistButton from '../components/WishlistButton';
import { packages as destinations } from '../data/packages';
import { galleryImages } from '../data/gallery';

const ExploreScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light flex flex-col h-full">
      <div className="px-6 pt-6 pb-10">
        <p className="text-slate-500 font-medium mb-8">Find your next adventure in Kashmir</p>

        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
              <Search size={20} />
            </span>
            <input 
              readOnly
              onClick={() => navigate('/search')}
              className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-primary cursor-pointer" 
              placeholder="Search places..." 
              type="text"
            />
          </div>
          <button className="bg-white p-4 rounded-2xl shadow-sm text-slate-600 active:scale-95 transition-transform">
            <Filter size={24} />
          </button>
        </div>

        <section className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Photo Gallery</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Snapshots from Paradise</p>
            </div>
            <button onClick={() => navigate('/gallery')} className="text-primary text-sm font-bold uppercase tracking-widest">View All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6">
            {galleryImages.slice(0, 6).map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/gallery')}
                className="min-w-[180px] md:min-w-[240px] h-64 rounded-[2rem] overflow-hidden relative shadow-md group cursor-pointer"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em] mb-1">{img.location}</p>
                  <p className="text-white font-bold text-sm truncate">{img.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900">Trending Destinations</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Curated for your next adventure</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, idx) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => navigate(`/package/${dest.id}`)}
                className={cn(
                  "group relative h-80 rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 cursor-pointer",
                  idx === 0 && "md:col-span-2 md:h-[450px]"
                )}
              >
                <img 
                  src={dest.image} 
                  alt={dest.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                
                <div className="absolute top-6 right-6 flex flex-col gap-3">
                  <WishlistButton item={dest} className="size-12 rounded-[1.25rem]" />
                  <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-black text-amber-500 flex items-center gap-2 shadow-lg border border-amber-100">
                    <Star size={14} fill="currentColor" /> {dest.rating}
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dest.tags.slice(0, 2).map((tag, tIdx) => (
                      <span key={tag} className={cn(
                        "backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl text-white border border-white/20 shadow-lg",
                        tIdx === 0 ? "bg-rose-500/40" : "bg-emerald-500/40"
                      )}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className={cn(
                    "font-black text-white mb-2 leading-tight",
                    idx === 0 ? "text-4xl" : "text-2xl"
                  )}>{dest.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-white/70 text-sm font-bold">
                      <MapPin size={16} className="mr-2 text-primary" />
                      {dest.region}, J&K
                    </div>
                    <div className="bg-gradient-to-br from-primary to-indigo-600 text-white size-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExploreScreen;
