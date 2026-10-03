import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Star, CheckCircle2 } from 'lucide-react';
import { useDemoStore } from '../../store/useDemoStore';
import { useToast } from '../ui/Toast';

export interface RatingSheetProps {
  orderId: string;
  restaurantName: string;
  isOpen: boolean;
  onClose: () => void;
}

const REVIEW_TAGS = ['Hot & fresh', 'Fast driver', 'Great portions', 'Authentic taste', 'Courteous'];

export const RatingSheet: React.FC<RatingSheetProps> = ({
  orderId,
  restaurantName,
  isOpen,
  onClose,
}) => {
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Hot & fresh', 'Fast driver']);
  const [reviewText, setReviewText] = useState('');
  const { rateOrder } = useDemoStore();
  const { success } = useToast();

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    rateOrder(orderId, rating, reviewText || 'Delicious island food and smooth delivery!', selectedTags);
    success("Thank you! Your review has been posted to Kallaloo & Co. and the Admin dashboard.", "Review Submitted");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Rate Your Experience"
      description={`How was your order from ${restaurantName}?`}
    >
      <div className="space-y-5 font-body text-xs text-[#1D2624]">
        {/* Star Rating Control */}
        <div className="flex flex-col items-center justify-center py-3 space-y-2">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                aria-label={`${star} star rating`}
                className="p-1 hover:scale-110 active:scale-95 transition-transform"
              >
                <Star
                  className={`w-7 h-7 ${
                    star <= rating
                      ? 'text-[#D9A84E] fill-[#D9A84E]'
                      : 'text-[#CFC5B0] fill-transparent'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs font-semibold text-[#14403F]">
            {rating === 5 ? 'Excellent · True Crucian Hospitality' : `${rating} Stars`}
          </span>
        </div>

        {/* Compliment Tags */}
        <div>
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#76817D] mb-2">
            What went well?
          </span>
          <div className="flex flex-wrap gap-2">
            {REVIEW_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-[8px] text-xs font-medium transition-all select-none border ${
                    isSelected
                      ? 'bg-[#14403F] text-[#F7F2E8] border-[#14403F]'
                      : 'bg-[#EFE8DA] text-[#4A5753] border-transparent hover:bg-[#E1D9C8]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Text Review */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#76817D] mb-1.5">
            Leave a note for the kitchen & courier
          </label>
          <textarea
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="The callaloo soup was piping hot and the johnnycakes were soft and sweet..."
            className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[10px] p-2.5 text-xs text-[#1D2624] placeholder-[#76817D] focus:outline-none focus:border-[#2F6F6A]"
          />
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end gap-2.5">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Skip
          </Button>
          <Button size="sm" onClick={handleSubmit} className="bg-[#14403F] text-[#F7F2E8]">
            Submit Review
          </Button>
        </div>
      </div>
    </Modal>
  );
};
