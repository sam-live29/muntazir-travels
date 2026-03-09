import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, Calendar, Tag, Info, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const NotificationsScreen: React.FC = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "Booking Confirmed!",
      message: "Your trip to Gulmarg has been successfully booked for March 15th.",
      time: "2 hours ago",
      type: "success",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      id: 2,
      title: "Special Offer",
      message: "Get 20% off on all houseboat bookings this weekend! Use code: KASHMIR20",
      time: "5 hours ago",
      type: "promo",
      icon: Tag,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      id: 3,
      title: "Trip Reminder",
      message: "Don't forget to pack warm clothes for your upcoming Pahalgam trip.",
      time: "1 day ago",
      type: "info",
      icon: Info,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      id: 4,
      title: "New Package Available",
      message: "Explore the hidden gems of Doodhpathri with our new 3-day package.",
      time: "2 days ago",
      type: "new",
      icon: Bell,
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      id: 5,
      title: "Payment Successful",
      message: "Payment of ₹12,500 received for invoice #MT-8821.",
      time: "3 days ago",
      type: "success",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    }
  ];

  return (
    <div className="bg-background-light flex flex-col h-full">
      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4">
        {notifications.map((notification, index) => {
          const Icon = notification.icon;
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex gap-4 relative overflow-hidden group active:scale-[0.98] transition-transform"
            >
              <div className={`size-12 rounded-2xl ${notification.bg} ${notification.color} flex items-center justify-center shrink-0`}>
                <Icon size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-900 leading-tight">{notification.title}</h3>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <Clock size={10} />
                    {notification.time}
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {notification.message}
                </p>
              </div>
              {index < 2 && (
                <div className="absolute top-4 right-4 size-2 bg-primary rounded-full ring-4 ring-primary/10"></div>
              )}
            </motion.div>
          );
        })}

        <div className="py-10 text-center">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">You're all caught up!</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsScreen;
