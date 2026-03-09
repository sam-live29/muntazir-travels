import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Camera, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { api } from '@/src/lib/api';

const WriteReview: React.FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0 || !comment.trim()) return;

    setIsSubmitting(true);
    try {
      await api.createReview({
        package_id: 1, // Mock package ID for now, ideally passed via state or URL
        rating,
        comment,
      });

      navigate(-1);
    } catch (error) {
      console.error('Review submission error:', error);
      navigate(-1); // Fallback
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-full flex flex-col">
      <header className="sticky top-0 z-10 flex items-center bg-white p-4 justify-between border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="text-slate-900 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Write a Review</h1>
      </header>

      <main className="p-6 flex-1">
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 shadow-md">
            <img
              alt="Package"
              className="w-full h-full object-cover"
              src="/images/240_F_1305283767_27cPMdIZ12Lxv6ZydDhDSe8DakR5DxAo (2).jpg"
            />
          </div>
          <h2 className="text-xl font-bold">Srinagar Sightseeing</h2>
          <p className="text-slate-500 text-sm">Muntazir Travels</p>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col items-center">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">How was your experience?</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={cn(
                    "transition-all duration-200",
                    rating >= star ? "text-amber-400 scale-110" : "text-slate-200"
                  )}
                >
                  <Star size={40} fill={rating >= star ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Your Feedback</label>
            <textarea
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your trip, the guide, and the service..."
              className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all resize-none text-sm"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Add Photos</label>
            <div className="flex gap-3">
              <button className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                <Camera size={24} />
                <span className="text-[10px] font-bold mt-1">Add</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-6">
        <button
          onClick={handleSubmit}
          disabled={rating === 0 || !comment.trim() || isSubmitting}
          className={cn(
            "w-full text-white font-bold py-4 rounded-2xl shadow-lg transition-all",
            rating === 0 || !comment.trim() || isSubmitting
              ? "bg-slate-200 shadow-none"
              : "bg-primary shadow-primary/20 active:scale-95"
          )}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </footer>
    </div>
  );
};

export default WriteReview;
