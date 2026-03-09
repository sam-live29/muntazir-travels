import React, { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, Thermometer, Calendar } from 'lucide-react';

interface WeatherData {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
}

const WeatherForecast: React.FC<{ lat: number; lon: number; days: number }> = ({ lat, lon, days }) => {
  const [forecast, setForecast] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();
        
        const formattedData = data.daily.time.slice(0, days).map((time: string, index: number) => ({
          date: time,
          maxTemp: data.daily.temperature_2m_max[index],
          minTemp: data.daily.temperature_2m_min[index],
          weatherCode: data.daily.weathercode[index],
        }));
        
        setForecast(formattedData);
      } catch (err) {
        setError('Weather data unavailable');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon, days]);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="text-amber-500" size={20} />;
    if (code <= 3) return <Cloud className="text-slate-400" size={20} />;
    if (code === 45 || code === 48) return <CloudFog className="text-slate-300" size={20} />;
    if (code >= 51 && code <= 67) return <CloudRain className="text-blue-500" size={20} />;
    if (code >= 71 && code <= 77) return <CloudSnow className="text-blue-200" size={20} />;
    if (code >= 80 && code <= 82) return <CloudRain className="text-blue-600" size={20} />;
    if (code >= 95) return <CloudLightning className="text-purple-500" size={20} />;
    return <Cloud className="text-slate-400" size={20} />;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm animate-pulse">
        <div className="h-4 w-32 bg-slate-100 rounded mb-4"></div>
        <div className="flex gap-4 overflow-x-auto">
          {[1, 2, 3].map(i => (
            <div key={i} className="min-w-[80px] h-24 bg-slate-50 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Weather Forecast</h2>
        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          <Thermometer size={12} />
          <span>Srinagar, JK</span>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {forecast.map((day, index) => (
            <div 
              key={day.date} 
              className={`flex flex-col items-center min-w-[85px] p-3 rounded-2xl border ${
                index === 0 ? 'bg-primary/5 border-primary/20' : 'bg-slate-50/50 border-slate-100'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                {index === 0 ? 'Today' : formatDate(day.date)}
              </span>
              <div className="mb-2">
                {getWeatherIcon(day.weatherCode)}
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm font-bold">{Math.round(day.maxTemp)}°</span>
                <span className="text-[10px] text-slate-400">{Math.round(day.minTemp)}°</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 mt-4 flex items-center gap-1">
          <Calendar size={10} />
          Expected weather for your 3-day trip duration
        </p>
      </div>
    </section>
  );
};

export default WeatherForecast;
