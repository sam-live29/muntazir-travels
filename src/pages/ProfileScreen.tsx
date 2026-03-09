import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  Edit2,
  User,
  CreditCard,
  Bell,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  Shield,
  Gift,
  Lock,
  Bookmark,
  AlertCircle,
  Map,
  Star,
  Image as ImageIcon
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      section: "Account Settings",
      items: [
        { label: "Edit Profile", icon: User, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "My Memories", icon: ImageIcon, color: "text-primary", bg: "bg-primary/10", path: "/my-gallery" },
        { label: "Travel Documents", icon: Shield, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Payment Methods", icon: CreditCard, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Notification Settings", icon: Bell, color: "text-rose-600", bg: "bg-rose-50" },
      ]
    },
    {
      section: "Preferences",
      items: [
        { label: "Wishlist", icon: Bookmark, color: "text-primary", bg: "bg-primary/10", path: "/wishlist" },
        { label: "Travel Info", icon: AlertCircle, color: "text-blue-600", bg: "bg-blue-50", path: "/info" },
        { label: "Language", icon: Globe, color: "text-cyan-600", bg: "bg-cyan-50", extra: "English" },
        { label: "Refer & Earn", icon: Gift, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Privacy & Security", icon: Lock, color: "text-slate-600", bg: "bg-slate-100" },
        { label: "Help & Support", icon: HelpCircle, color: "text-primary", bg: "bg-primary/10", path: "/support" },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="bg-slate-50 flex flex-col min-h-full pb-10">
      {/* Profile Header - Redesigned for Top-Left Alignment */}
      <div className="bg-white px-6 pt-10 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative shrink-0"
          >
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-3xl border-2 border-slate-100 shadow-sm size-24"
              style={{ backgroundImage: 'url("/images/240_F_140460454_eL1z7uTVLTtChNKl4lROMgREpFuKOQzs.jpg")' }}
            ></div>
            <button className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-xl border-2 border-white shadow-md flex items-center justify-center">
              <Edit2 size={12} />
            </button>
          </motion.div>

          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex-1"
          >
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Sahinur Molla</h1>
            <p className="text-slate-500 text-xs font-medium mb-3">sahinurmolla190@gmail.com</p>

            <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-black text-slate-900">12</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trips</span>
              </div>
              <div className="w-px h-8 bg-slate-100" />
              <div className="flex flex-col">
                <span className="text-sm font-black text-slate-900">8</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reviews</span>
              </div>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="size-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
          >
            <Settings size={20} />
          </motion.button>
        </div>
      </div>

      {/* Menu Sections - List Style */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col mt-2"
      >
        {menuItems.map((section) => (
          <div key={section.section} className="mb-2">
            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-4">{section.section}</h3>
            <div className="bg-white border-y border-slate-100 overflow-hidden">
              {section.items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    variants={itemVariants}
                    key={item.label}
                    onClick={() => item.path && navigate(item.path)}
                    className={cn(
                      "flex w-full items-center gap-4 px-6 py-4 active:bg-slate-50 transition-colors relative group",
                      idx !== section.items.length - 1 && "border-b border-slate-50"
                    )}
                  >
                    <div className={cn("flex items-center justify-center rounded-xl shrink-0 size-9 transition-transform group-hover:scale-110", item.bg, item.color)}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-slate-900 text-sm font-bold">{item.label}</p>
                      {item.extra && <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-0.5">{item.extra}</p>}
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <div className="px-6 mt-6">
          <motion.button
            variants={itemVariants}
            className="flex w-full items-center gap-4 bg-white border border-rose-100 px-6 py-4 rounded-2xl active:scale-[0.98] transition-all group"
          >
            <div className="text-rose-600 flex items-center justify-center rounded-xl bg-rose-50 shrink-0 size-9 group-hover:rotate-12 transition-transform">
              <LogOut size={18} />
            </div>
            <p className="text-rose-600 text-sm font-black flex-1 text-left uppercase tracking-widest">Logout</p>
          </motion.button>
        </div>

        {/* App Info */}
        <motion.div
          variants={itemVariants}
          className="mt-10 mb-8 flex flex-col items-center gap-2 opacity-40"
        >
          <p className="text-slate-900 text-[10px] font-black uppercase tracking-[0.2em]">Muntazir Travels Srinagar</p>
          <p className="text-slate-500 text-[10px] font-bold">App Version 2.4.0 (2024)</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileScreen;
