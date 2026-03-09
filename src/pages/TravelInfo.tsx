import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldAlert, CloudRain, BookOpen, HeartPulse, ShoppingBag, Languages } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const TravelInfo: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('guidelines');

  const tabs = [
    { id: 'guidelines', label: 'Guidelines', icon: BookOpen },
    { id: 'emergency', label: 'Emergency', icon: ShieldAlert },
    { id: 'weather', label: 'Weather', icon: CloudRain },
    { id: 'culture', label: 'Culture', icon: Languages },
  ];

  const content = {
    guidelines: [
      { title: "ID Proof", desc: "Always carry a valid Govt ID proof. Postpaid SIM cards from other states work in J&K, but prepaid ones don't." },
      { title: "Clothing", desc: "Even in summer, evenings can be cool. Carry a light jacket. For winter, heavy woolens are mandatory." },
      { title: "Photography", desc: "Photography is allowed in most places, but avoid taking pictures of military installations." }
    ],
    emergency: [
      { title: "Police", desc: "100 / +91-194-2452222" },
      { title: "Ambulance", desc: "102 / 108" },
      { title: "Tourism Helpline", desc: "1800-103-1070" },
      { title: "Muntazir SOS", desc: "+91 7889570933 (24/7)" }
    ],
    weather: [
      { title: "Spring (Mar-May)", desc: "15°C to 25°C. Best for Tulip Garden and greenery." },
      { title: "Summer (Jun-Aug)", desc: "20°C to 30°C. Pleasant weather, best for trekking." },
      { title: "Autumn (Sep-Nov)", desc: "10°C to 20°C. Chinar trees turn golden/red." },
      { title: "Winter (Dec-Feb)", desc: "-5°C to 10°C. Heavy snowfall, best for skiing." }
    ],
    culture: [
      { title: "Language", desc: "Kashmiri, Urdu, and Hindi are widely spoken. English is understood in tourist areas." },
      { title: "Food", desc: "Don't miss Wazwan, Kahwa (saffron tea), and Noon Chai (pink salt tea)." },
      { title: "Etiquette", desc: "Dress modestly when visiting shrines and mosques. Remove shoes before entering." }
    ]
  };

  return (
    <div className="bg-background-light min-h-full pb-24">
      <header className="sticky top-0 z-10 flex items-center bg-white p-4 justify-between border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="text-slate-900 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Travel Resources</h1>
      </header>

      <div className="flex overflow-x-auto no-scrollbar bg-white border-b border-slate-100 sticky top-[65px] z-10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-4 border-b-2 transition-all whitespace-nowrap",
                isActive ? "border-primary text-primary" : "border-transparent text-slate-400"
              )}
            >
              <Icon size={18} />
              <span className="text-sm font-bold">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <main className="p-6 space-y-4">
        {content[activeTab as keyof typeof content].map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <div className="w-1.5 h-4 bg-primary rounded-full"></div>
              {item.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}

        {activeTab === 'culture' && (
          <div className="mt-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Common Phrases</h3>
            <div className="space-y-3">
              {[
                { k: "As-salamu alaykum", e: "Peace be upon you (Greeting)" },
                { k: "Vaaray chuv?", e: "How are you?" },
                { k: "Shukriya", e: "Thank you" },
                { k: "Kyah chuv naav?", e: "What is your name?" }
              ].map((phrase, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <span className="font-bold text-primary">{phrase.k}</span>
                  <span className="text-xs text-slate-500 italic">{phrase.e}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TravelInfo;
