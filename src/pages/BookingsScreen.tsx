import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, MapPin, Share2, Star, Clock, Hotel, Utensils, ArrowRight, Phone, Info, ShoppingCart, Users, FileText, Loader2 } from 'lucide-react';
import { cartService } from '../services/cartService';
import { cn } from '@/src/lib/utils';
import { api } from '@/src/lib/api';

const BookingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<'active' | 'completed'>('active');
  const [cartCount, setCartCount] = React.useState(cartService.getCartCount());
  const [bookings, setBookings] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const completedBookings = [
    {
      id: '#MT-88234',
      package_title: 'Srinagar Sightseeing',
      package_image: '/images/240_F_1177250477_I728pe1U9q5nIfINKmdNzNvjJmnCJCEA.jpg',
      date: '2024-02-15',
      guests: 2,
      status: 'Completed'
    },
    {
      id: '#MT-77129',
      package_title: 'Gulmarg Skiing Adventure',
      package_image: '/images/240_F_1305283767_27cPMdIZ12Lxv6ZydDhDSe8DakR5DxAo.jpg',
      date: '2024-01-10',
      guests: 4,
      status: 'Completed'
    },
    {
      id: '#MT-66541',
      package_title: 'Pahalgam Valley Tour',
      package_image: '/images/240_F_140460454_eL1z7uTVLTtChNKl4lROMgREpFuKOQzs.jpg',
      date: '2023-12-05',
      guests: 3,
      status: 'Completed'
    }
  ];

  const displayedBookings = activeTab === 'active' ? bookings : completedBookings;

  React.useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await api.getBookings();
        setBookings(data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();

    const updateCount = () => setCartCount(cartService.getCartCount());
    window.addEventListener('cart-updated', updateCount);
    return () => window.removeEventListener('cart-updated', updateCount);
  }, []);

  const [downloadingId, setDownloadingId] = React.useState<string | null>(null);

  const handleDownloadItinerary = async (booking: any) => {
    try {
      setDownloadingId(booking.id);
      // Simulate PDF generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save reference to Supabase (Mock PDF URL)
      await api.saveUserAsset({
        prompt_input: `Itinerary for ${booking.package_title}`,
        pdf_url: `https://example.com/mock-itinerary-${booking.id}.pdf`,
        metadata: { booking_id: booking.id, title: booking.package_title }
      });

      alert(`Itinerary for ${booking.package_title} has been generated and saved to 'Travel Documents'!`);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to generate itinerary. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  const BookingSkeleton = () => (
    <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 animate-pulse">
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-3 w-24 bg-slate-100 rounded"></div>
          <div className="h-4 w-16 bg-slate-100 rounded"></div>
        </div>

        <div className="flex gap-4">
          <div className="size-20 bg-slate-100 rounded-2xl"></div>
          <div className="flex-1 space-y-3">
            <div className="h-5 w-3/4 bg-slate-100 rounded"></div>
            <div className="space-y-2">
              <div className="h-3 w-1/2 bg-slate-100 rounded"></div>
              <div className="h-3 w-1/3 bg-slate-100 rounded"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="h-10 bg-slate-100 rounded-xl"></div>
          <div className="h-10 bg-slate-100 rounded-xl"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 flex flex-col h-full">
      <nav className="bg-white border-b border-slate-100">
        <div className="flex px-6">
          <button
            onClick={() => setActiveTab('active')}
            className={cn(
              "flex-1 py-4 border-b-2 text-sm font-black uppercase tracking-widest transition-all",
              activeTab === 'active' ? "border-primary text-primary" : "border-transparent text-slate-400"
            )}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={cn(
              "flex-1 py-4 border-b-2 text-sm font-black uppercase tracking-widest transition-all",
              activeTab === 'completed' ? "border-primary text-primary" : "border-transparent text-slate-400"
            )}
          >
            Completed
          </button>
        </div>
      </nav>

      <main className="p-6 space-y-6 flex-1 overflow-y-auto pb-24">
        {isLoading ? (
          <div className="space-y-6">
            <BookingSkeleton />
            <BookingSkeleton />
            <BookingSkeleton />
          </div>
        ) : displayedBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 text-center px-10">
            <div className="size-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <Calendar size={32} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">No {activeTab} Bookings</h3>
            <p className="text-sm font-medium leading-relaxed mb-8">
              {activeTab === 'active'
                ? "You haven't booked any trips with us yet. Start exploring the paradise!"
                : "You don't have any completed trips yet."}
            </p>
            {activeTab === 'active' && (
              <button
                onClick={() => navigate('/home')}
                className="bg-primary text-white font-black px-8 py-4 rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all text-sm uppercase tracking-widest"
              >
                Explore Packages
              </button>
            )}
          </div>
        ) : (
          displayedBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded-xl mb-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID {booking.id}</p>
                  <span className={cn(
                    "text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-widest",
                    booking.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-primary/10 text-primary'
                  )}>
                    {booking.status}
                  </span>
                </div>

                <div className="flex gap-4">
                  <img
                    src={booking.package_image}
                    alt={booking.package_title}
                    className="size-16 rounded-xl object-cover"
                  />
                  <div className="flex-1 space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">{booking.package_title}</h3>
                    <div className="text-xs text-slate-500 font-medium space-x-4">
                      <span className="inline-flex items-center gap-1.5"><Calendar size={12} className="text-slate-400" /> {new Date(booking.date).toLocaleDateString()}</span>
                      <span className="inline-flex items-center gap-1.5"><Users size={12} className="text-slate-400" /> {booking.guests} Guests</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() => navigate('/trip-details')}
                    className="flex-1 bg-white border border-slate-200 text-slate-600 font-bold py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-xs flex items-center justify-center gap-2"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDownloadItinerary(booking)}
                    disabled={downloadingId === booking.id}
                    className="flex-1 bg-slate-900 border border-slate-900 text-white font-bold py-2.5 rounded-xl hover:bg-slate-800 transition-colors text-xs flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {downloadingId === booking.id ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
                    Itinerary
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default BookingsScreen;
