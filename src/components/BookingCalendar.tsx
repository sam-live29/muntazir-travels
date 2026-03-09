import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  isBefore, 
  startOfToday 
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookingCalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
  dateCaptions?: Record<string, string>;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onDateSelect, selectedDate, dateCaptions = {} }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const today = startOfToday();

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-md font-bold text-slate-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        const isPast = isBefore(day, today);
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            key={day.toString()}
            className={`relative h-14 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group
              ${!isCurrentMonth ? 'text-slate-300' : ''}
              ${isPast ? 'text-slate-200 cursor-not-allowed' : 'hover:bg-primary/5 rounded-xl'}
              ${isSelected ? 'bg-primary text-white hover:bg-primary shadow-lg shadow-primary/20 rounded-xl' : ''}
            `}
            onClick={() => !isPast && onDateSelect(cloneDay)}
            onMouseEnter={() => setHoveredDate(day.toDateString())}
            onMouseLeave={() => setHoveredDate(null)}
          >
            <span className="text-sm font-semibold z-10">{formattedDate}</span>
            
            {/* Caption Indicator (Dot) */}
            {dateCaptions[day.toDateString()] && !isPast && (
              <div className={`mt-1 size-1 rounded-full ${isSelected ? 'bg-white' : 'bg-primary'}`} />
            )}

            {/* Today Indicator */}
            {isSameDay(day, today) && !isSelected && (
              <div className="absolute bottom-1 w-1 h-1 bg-primary/40 rounded-full" />
            )}

            {/* Tooltip for Caption */}
            {dateCaptions[day.toDateString()] && hoveredDate === day.toDateString() && !isPast && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-lg whitespace-nowrap z-50 shadow-xl pointer-events-none">
                {dateCaptions[day.toDateString()]}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-slate-900" />
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="space-y-1">{rows}</div>;
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-100" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary/20" />
            <span>Today</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="flex items-center gap-1">
              Offer
              <div className="size-1 rounded-full bg-primary" />
            </span>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed">
          * Prices may vary based on seasonal demand. Please select a date to see the exact fare for your group.
        </p>
      </div>
    </div>
  );
};

export default BookingCalendar;
