import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Compass } from 'lucide-react';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image with subtle zoom animation */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0"
      >
        <img
          alt="Majestic Himalayas, Kashmir"
          className="w-full h-full object-cover"
          src="/images/kashmir_welcome_1773078248702.png"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Overlays for depth and readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-transparent to-black/80"></div>
      <div className="absolute inset-0 z-[1] bg-black/10 backdrop-blur-[2px]"></div>

      <div className="relative z-10 h-full flex flex-col justify-between p-10 text-white">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="size-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
            <Compass size={24} />
          </div>
          <span className="font-bold tracking-widest uppercase text-xs">Muntazir Travels</span>
        </motion.header>

        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="font-display text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none uppercase italic">
              Kashmir
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide max-w-xs mx-auto opacity-90 leading-relaxed">
              Experience the <span className="font-bold italic">Paradise</span> on Earth
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col gap-4"
        >
          <button
            onClick={() => navigate('/home')}
            className="w-full bg-white text-slate-900 font-black py-5 rounded-full shadow-2xl hover:bg-opacity-90 active:scale-95 transition-all duration-300 text-lg flex items-center justify-center gap-3 uppercase tracking-widest"
          >
            Explore Now
            <ArrowRight size={24} />
          </button>

          <div className="flex items-center justify-center gap-8 mt-4">
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-bold uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity"
            >
              Sign In
            </button>
            <div className="w-1 h-1 bg-white/30 rounded-full"></div>
            <button
              onClick={() => navigate('/signup')}
              className="text-sm font-bold uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity"
            >
              Join Us
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
