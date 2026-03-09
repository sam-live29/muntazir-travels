import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Navigation, Home, Briefcase, Users, Plus, Bell, Moon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const PickupLocation: React.FC = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(1);
  const [notify, setNotify] = useState(true);
  const [nightMode, setNightMode] = useState(false);

  const locations = [
    { id: 1, label: "Home", icon: Home, address: "2118 Thornridge Cir. Syracuse, Connecticut 35624", active: true },
    { id: 2, label: "Office", icon: Briefcase, address: "Suite 100, 4517 Washington Ave. Manchester, Kentucky 39495" },
    { id: 3, label: "Parents' House", icon: Users, address: "8502 Preston Rd. Inglewood, Maine 98380" },
  ];

  return (
    <div className="bg-slate-50 min-h-full flex flex-col">
      <header className="p-4 flex items-center justify-between bg-white border-b border-slate-100 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-slate-900">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Select Pickup Location</h1>
        <div className="size-6"></div>
      </header>

      <main className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar">
        <button className="w-full bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4 shadow-sm active:scale-95 transition-all">
          <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Navigation size={24} />
          </div>
          <div className="flex flex-col text-left">
            <h3 className="font-black text-slate-900">Detect current location</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Using GPS for precision</p>
          </div>
          <ChevronRight size={20} className="ml-auto text-slate-300" />
        </button>

        <section className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-black text-slate-900">Saved Locations</h3>
            <button className="text-primary text-xs font-bold flex items-center gap-1">
              <Plus size={14} />
              Add New
            </button>
          </div>
          
          <div className="space-y-4">
            {locations.map((loc) => (
              <button 
                key={loc.id}
                onClick={() => setSelectedId(loc.id)}
                className={cn(
                  "w-full bg-white p-6 rounded-[2rem] border-2 flex items-start gap-4 transition-all relative",
                  selectedId === loc.id ? "border-primary shadow-xl shadow-primary/5" : "border-transparent shadow-sm"
                )}
              >
                <div className={cn(
                  "size-12 rounded-2xl flex items-center justify-center transition-colors",
                  selectedId === loc.id ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                )}>
                  <loc.icon size={24} />
                </div>
                <div className="flex flex-col text-left pr-8">
                  <h4 className="font-black text-slate-900">{loc.label}</h4>
                  {selectedId === loc.id && <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Active Choice</p>}
                  <p className="text-xs text-slate-500 leading-relaxed">{loc.address}</p>
                </div>
                <div className={cn(
                  "absolute top-6 right-6 size-6 rounded-full border-2 flex items-center justify-center transition-all",
                  selectedId === loc.id ? "bg-primary border-primary" : "border-slate-200"
                )}>
                  {selectedId === loc.id && <div className="size-2 bg-white rounded-full"></div>}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-black text-slate-900">Settings</h3>
          <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b border-slate-50">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Bell size={20} />
                </div>
                <span className="text-sm font-bold text-slate-900">Notify upon arrival</span>
              </div>
              <button 
                onClick={() => setNotify(!notify)}
                className={cn(
                  "w-12 h-6 rounded-full transition-all relative",
                  notify ? "bg-primary" : "bg-slate-200"
                )}
              >
                <div className={cn(
                  "absolute top-1 size-4 bg-white rounded-full transition-all",
                  notify ? "left-7" : "left-1"
                )}></div>
              </button>
            </div>
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
                  <Moon size={20} />
                </div>
                <span className="text-sm font-bold text-slate-900">Night mode interface</span>
              </div>
              <button 
                onClick={() => setNightMode(!nightMode)}
                className={cn(
                  "w-12 h-6 rounded-full transition-all relative",
                  nightMode ? "bg-primary" : "bg-slate-200"
                )}
              >
                <div className={cn(
                  "absolute top-1 size-4 bg-white rounded-full transition-all",
                  nightMode ? "left-7" : "left-1"
                )}></div>
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-6 bg-white border-t border-slate-100">
        <button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all text-lg"
        >
          Confirm Pickup Location
        </button>
      </footer>

      <button className="fixed bottom-32 right-6 size-14 bg-primary text-white rounded-full shadow-xl shadow-primary/30 flex items-center justify-center active:scale-90 transition-all z-20">
        <Plus size={28} />
      </button>
    </div>
  );
};

export default PickupLocation;
