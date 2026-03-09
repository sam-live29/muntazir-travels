import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { galleryImages, GalleryImage } from '../data/gallery';
import { cn } from '@/src/lib/utils';

const GalleryScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'nature', label: 'Nature' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'culture', label: 'Culture' },
    { id: 'monuments', label: 'Monuments' },
  ];

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'all') return galleryImages;
    return galleryImages.filter(img => img.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <header className="p-4 flex items-center bg-white border-b border-slate-100 sticky top-0 z-50 md:hidden">
        <button onClick={() => navigate(-1)} className="text-slate-900 p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="ml-2">
          <h1 className="text-lg font-black text-slate-900">Photo Gallery</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Explore Kashmir</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        {/* Categories Filter */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                selectedCategory === cat.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-white text-slate-500 border border-slate-100"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(img)}
                className="break-inside-avoid mb-4 group relative rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-white"
              >
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-0.5">{img.location}</p>
                  <h4 className="text-xs font-bold truncate">{img.title}</h4>
                </div>

                <div className="absolute top-3 right-3 size-8 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={14} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredImages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="size-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-4">
              <Maximize2 size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No images found</h3>
            <p className="text-sm text-slate-500">Try selecting a different category</p>
          </div>
        )}
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900 flex flex-col"
          >
            <div className="p-6 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-white/10 rounded-2xl flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-black text-lg">{selectedImage.title}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{selectedImage.location}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedImage(null)}
                className="size-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-[70vh] rounded-[2rem] shadow-2xl object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-8 text-center">
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                Discover the mesmerizing beauty of {selectedImage.location}. A perfect spot for {selectedImage.category} lovers.
              </p>
              <button 
                onClick={() => navigate(`/search?q=${selectedImage.location}`)}
                className="mt-8 bg-primary text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all"
              >
                Explore Packages
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryScreen;
