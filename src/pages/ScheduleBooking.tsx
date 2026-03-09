import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sun, CloudSun, Moon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const ScheduleBooking: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(5);
  const [selectedTime, setSelectedTime] = useState('09:00');

  const morningSlots = ['08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45'];
  const afternoonSlots = ['12:00', '12:15', '12:30', '12:45', '01:00', '01:15', '01:30', '01:45', '02:00', '02:15', '02:30', '02:45'];
  const eveningSlots = ['05:00', '05:15', '05:30', '05:45', '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45'];

  return (
    <div className="bg-white min-h-full flex flex-col">
      <header className="p-4 flex items-center justify-between bg-white border-b border-slate-100 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-slate-900">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Schedule Booking</h1>
        <div className="size-6"></div>
      </header>

      <main className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar">
        <section>
          <h3 className="text-lg font-black text-slate-900 mb-4">Select Date</h3>
          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <button className="text-slate-400"><ChevronLeft size={20} /></button>
              <h4 className="font-black text-slate-900">October 2023</h4>
              <button className="text-slate-400"><ChevronRight size={20} /></button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                <span key={d} className="text-[10px] font-bold text-slate-300">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {[...Array(4)].map((_, i) => <div key={`empty-${i}`}></div>)}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(d => (
                <button 
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={cn(
                    "size-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all",
                    selectedDate === d ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-900 hover:bg-slate-100"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col">
            <h3 className="text-lg font-black text-slate-900">Select Time</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available in 15-minute intervals</p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-amber-500 mb-4">
                <Sun size={16} />
                <span className="text-xs font-black uppercase tracking-widest">Morning</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {morningSlots.map(slot => (
                  <button 
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={cn(
                      "py-3 rounded-xl text-xs font-bold border transition-all",
                      selectedTime === slot 
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                        : "bg-white border-slate-100 text-slate-600 hover:border-primary/30"
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-orange-500 mb-4">
                <CloudSun size={16} />
                <span className="text-xs font-black uppercase tracking-widest">Afternoon</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {afternoonSlots.map(slot => (
                  <button 
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={cn(
                      "py-3 rounded-xl text-xs font-bold border transition-all",
                      selectedTime === slot 
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                        : "bg-white border-slate-100 text-slate-600 hover:border-primary/30"
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-indigo-500 mb-4">
                <Moon size={16} />
                <span className="text-xs font-black uppercase tracking-widest">Evening</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {eveningSlots.map(slot => (
                  <button 
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={cn(
                      "py-3 rounded-xl text-xs font-bold border transition-all",
                      selectedTime === slot 
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                        : "bg-white border-slate-100 text-slate-600 hover:border-primary/30"
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-6 bg-white border-t border-slate-100 space-y-4">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Selected Schedule</p>
            <p className="text-sm font-black text-slate-900">Thursday, Oct {selectedDate} • {selectedTime} AM</p>
          </div>
          <div className="flex flex-col text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</p>
            <p className="text-sm font-black text-slate-900">Full Day</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/pickup-location')}
          className="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all text-lg"
        >
          Continue
        </button>
      </footer>
    </div>
  );
};

export default ScheduleBooking;
