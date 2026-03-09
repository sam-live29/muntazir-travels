import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Mountain, Waves, Hotel, Car, Users, Utensils, ShoppingBag, Heart, Camera, Church } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const CategoriesScreen: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { label: 'Mountains', icon: Mountain, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Lakes', icon: Waves, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Hotels', icon: Hotel, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Cabs', icon: Car, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Guides', icon: Users, color: 'text-pink-500', bg: 'bg-pink-50' },
    { label: 'Food', icon: Utensils, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Shopping', icon: ShoppingBag, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Honeymoon', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Photography', icon: Camera, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'Pilgrimage', icon: Church, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="bg-slate-50 min-h-full flex flex-col pb-20">
      <header className="p-4 flex items-center bg-white border-b border-slate-100 sticky top-0 z-10 md:hidden">
        <button onClick={() => navigate(-1)} className="text-slate-900">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold ml-4">Menu / Categories</h1>
      </header>

      <main className="flex-1 p-6">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-primary" 
            placeholder="Search categories..." 
            type="text"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button 
                key={cat.label} 
                onClick={() => navigate('/search')}
                className="flex flex-col items-center gap-3 group"
              >
                <div className={cn("size-20 flex items-center justify-center rounded-3xl transition-all group-active:scale-95 shadow-sm border border-white", cat.bg)}>
                  <Icon className={cn("size-8", cat.color)} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 text-center">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default CategoriesScreen;
