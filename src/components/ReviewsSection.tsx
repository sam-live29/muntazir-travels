import React, { useEffect, useState } from 'react';
import { Star, User, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '@/src/lib/api';

interface Review {
  id: number;
  package_id: number;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewsSectionProps {
  packageId: number;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ packageId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await api.getReviews(packageId);
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [packageId]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-dashed border-slate-200 text-center">
        <p className="text-sm text-slate-400 font-medium">No reviews yet. Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={review.id}
          className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <User size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Verified Traveler</p>
                <div className="flex items-center gap-1 text-amber-400 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill={i < review.rating ? "currentColor" : "none"}
                      className={i < review.rating ? "text-amber-400" : "text-slate-200"}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Calendar size={12} />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed italic">
            "{review.comment}"
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default ReviewsSection;
