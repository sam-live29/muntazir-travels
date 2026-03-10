import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const HeroBanners: React.FC = () => {
  const banners = [
    {
      id: 0,
      title: "Ramadan Kareem Specials",
      subtitle: "Exclusive 20% discount on all family packages during the holy month",
      image: "/images/kashmir_ramadan_1773078371573.png",
      tag: "Ramadan Offer",
      color: "bg-emerald-600"
    },
    {
      id: 1,
      title: "Discover Paradise",
      subtitle: "Explore the serene beauty of Dal Lake",
      image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=100&w=3840",
      tag: "Limited Offer"
    },
    {
      id: 2,
      title: "Winter Wonderland",
      subtitle: "Skiing adventures in Gulmarg",
      image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=100&w=3840",
      tag: "Trending"
    },
    {
      id: 3,
      title: "Valley of Shepherds",
      subtitle: "Experience the magic of Pahalgam",
      image: "https://images.unsplash.com/photo-1582260656910-c97699742055?auto=format&fit=crop&q=100&w=3840",
      tag: "Best Seller"
    },
    {
      id: 4,
      title: "Hidden Gem: Gurez",
      subtitle: "The untouched beauty of North Kashmir",
      image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=100&w=3840",
      tag: "New Destination"
    },
    {
      id: 5,
      title: "Sonamarg Glaciers",
      subtitle: "The Meadow of Gold awaits you",
      image: "https://images.unsplash.com/photo-1603522199709-66bf246ca797?auto=format&fit=crop&q=100&w=3840",
      tag: "Seasonal"
    },
    {
      id: 6,
      title: "Houseboat Stay",
      subtitle: "A night on the floating palaces",
      image: "https://images.unsplash.com/photo-1616421448375-7b56f8f55da2?auto=format&fit=crop&q=100&w=3840",
      tag: "Authentic"
    }
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  React.useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
        let nextScroll = scrollLeft + clientWidth;

        // If we're at the end, jump back to start
        if (nextScroll >= scrollWidth - 10) { // Small buffer for rounding
          nextScroll = 0;
        }

        scrollRef.current.scrollTo({ left: nextScroll, behavior: 'smooth' });
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    // Temporarily disable auto-play on manual interaction
    setIsAutoPlaying(false);

    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      let scrollTo;

      if (direction === 'left') {
        scrollTo = scrollLeft - clientWidth;
        if (scrollTo < 0) scrollTo = scrollWidth - clientWidth;
      } else {
        scrollTo = scrollLeft + clientWidth;
        if (scrollTo >= scrollWidth - 10) scrollTo = 0;
      }

      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }

    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section
      className="mb-12 relative group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-[4px] md:border-[6px] border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] bg-white">
        <div className="absolute inset-y-0 left-4 md:left-20 z-20 flex items-center pointer-events-none">
          <button
            onClick={() => scroll('left')}
            className="size-10 md:size-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-slate-900 active:scale-95 transition-all pointer-events-auto opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="size-5 md:size-6" strokeWidth={2} />
          </button>
        </div>

        <div className="absolute inset-y-0 right-4 md:right-20 z-20 flex items-center pointer-events-none">
          <button
            onClick={() => scroll('right')}
            className="size-10 md:size-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-slate-900 active:scale-95 transition-all pointer-events-auto opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="size-5 md:size-6" strokeWidth={2} />
          </button>
        </div>

        {/* Banner Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          {banners.map((banner) => (
            <motion.div
              key={banner.id}
              className="min-w-full h-[350px] md:h-[450px] lg:h-[500px] relative snap-center flex-shrink-0"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-xl w-fit mb-4 border border-white/20 flex items-center gap-2.5 backdrop-blur-md bg-white/5">
                    <span className="size-1.5 bg-white rounded-full animate-[pulse_2s_infinite]"></span>
                    {banner.tag}
                  </span>
                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-4 tracking-tighter max-w-2xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
                    {banner.title.split(' ').map((word, i) => (
                      <span key={i} className="block overflow-hidden">
                        <motion.span
                          initial={{ y: "100%" }}
                          whileInView={{ y: 0 }}
                          transition={{ duration: 0.8, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                          className="block"
                        >
                          {word}
                        </motion.span>
                      </span>
                    ))}
                  </h3>
                  <p className="text-sm md:text-lg text-white/80 font-medium max-w-lg leading-relaxed mb-8 border-l-2 border-white/20 pl-6 backdrop-blur-[2px]">
                    {banner.subtitle}
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="bg-white text-slate-900 text-xs md:text-sm font-black px-10 py-4 rounded-2xl hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 shadow-xl uppercase tracking-widest">
                      Book Trip
                    </button>
                    <button className="bg-white/5 backdrop-blur-xl text-white border border-white/20 text-xs md:text-sm font-black px-8 py-4 rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest">
                      Explore
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Frame Indicators */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {banners.map((banner, i) => (
            <div
              key={i}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentIndex === i
                  ? cn("w-8", banner.color || "bg-primary")
                  : "w-2 bg-white/30 border border-white/20"
              )}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanners;
