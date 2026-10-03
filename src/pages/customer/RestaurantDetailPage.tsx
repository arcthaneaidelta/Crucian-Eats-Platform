import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Heart, Plus, Check } from 'lucide-react';
import { useDemoStore } from '../../store/useDemoStore';
import { ItemSheet } from '../../components/customer/ItemSheet';
import type { MenuItem } from '../../data/types';
import { useToast } from '../../components/ui/Toast';

export const RestaurantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { restaurants, menuItems, addToCart, reviews } = useDemoStore();
  const { success } = useToast();

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isItemSheetOpen, setIsItemSheetOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isFavorited, setIsFavorited] = useState(false);

  const restaurant = restaurants.find((r) => r.id === id) || restaurants[0];
  const items = menuItems.filter((m) => m.restaurantId === restaurant.id);
  const restaurantReviews = reviews.filter((r) => r.restaurantId === restaurant.id);

  // Group items by category
  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter((i) => i.category === activeCategory);

  const handleOpenItem = (item: MenuItem) => {
    setSelectedItem(item);
    setIsItemSheetOpen(true);
  };

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    if (item.options && item.options.length > 0) {
      handleOpenItem(item);
      return;
    }
    addToCart(item, 1, {}, '');
    success(`Added 1× ${item.name} to order`, 'Added to Order');
  };

  return (
    <div className="font-body text-xs text-[#1D2624]">
      {/* Cover Header */}
      <div className="relative h-44 bg-[#14403F] text-[#F7F2E8] p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between z-10">
          <button
            onClick={() => navigate('/app')}
            aria-label="Back to restaurants"
            className="w-9 h-9 rounded-full bg-[#1D2624]/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#1D2624] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFavorited(!isFavorited)}
            aria-label="Favorite restaurant"
            className={`w-9 h-9 rounded-full bg-[#1D2624]/60 backdrop-blur-sm flex items-center justify-center transition-colors ${
              isFavorited ? 'text-[#C65D3B]' : 'text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Ambient overlay */}
        <div className="z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9A84E] bg-black/40 px-2 py-0.5 rounded">
            {restaurant.zone}, St. Croix
          </span>
        </div>
      </div>

      {/* Restaurant Overview Info Card */}
      <div className="p-4 sm:p-5 border-b border-[#E1D9C8] space-y-3 bg-[#FFFDF8]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-medium text-[#14403F]">
              {restaurant.name}
            </h1>
            <p className="text-xs text-[#4A5753] mt-0.5">
              {restaurant.cuisine} · Owner: Chef {restaurant.ownerName}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-[#EFE8DA] px-2.5 py-1 rounded-[8px] text-xs font-bold text-[#14403F]">
            <Star className="w-3.5 h-3.5 text-[#D9A84E] fill-[#D9A84E]" />
            <span>{restaurant.rating}</span>
            <span className="text-[10px] text-[#76817D]">({restaurant.reviewCount})</span>
          </div>
        </div>

        <p className="text-xs text-[#4A5753] leading-relaxed">
          {restaurant.description}
        </p>

        {/* Delivery Specs Row */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E1D9C8] text-center text-[11px]">
          <div className="bg-[#FAF5EC] p-2 rounded-[8px]">
            <span className="text-[#76817D] block">Est. Delivery</span>
            <span className="font-semibold text-[#14403F]">{restaurant.deliveryTime}</span>
          </div>
          <div className="bg-[#FAF5EC] p-2 rounded-[8px]">
            <span className="text-[#76817D] block">Delivery Fee</span>
            <span className="font-semibold text-[#14403F]">${restaurant.deliveryFee.toFixed(2)}</span>
          </div>
          <div className="bg-[#FAF5EC] p-2 rounded-[8px]">
            <span className="text-[#76817D] block">Hours</span>
            <span className="font-semibold text-[#2E7D5B]">Open until {restaurant.closesAt}</span>
          </div>
        </div>
      </div>

      {/* Sticky Category Tabs with Scroll-Spy (§26.S7) */}
      <div className="sticky top-0 z-20 bg-[#FFFDF8] border-b border-[#E1D9C8] px-4 py-2 flex gap-1.5 overflow-x-auto scrollbar-none shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[#14403F] text-[#F7F2E8]'
                : 'text-[#4A5753] hover:bg-[#EFE8DA]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Dish Items Grid */}
      <div className="p-4 sm:p-5 space-y-3">
        <h3 className="text-sm font-display font-medium text-[#14403F]">
          {activeCategory === 'All' ? 'Menu Favourites' : activeCategory}
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {filteredItems.map((dish) => (
            <div
              key={dish.id}
              onClick={() => !dish.soldOut && handleOpenItem(dish)}
              className={`p-3.5 rounded-[14px] bg-[#FFFDF8] border border-[#E1D9C8] hover:border-[#14403F] transition-all flex items-start justify-between gap-3 select-none ${
                dish.soldOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer shadow-sm'
              }`}
            >
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-[#14403F]">{dish.name}</h4>
                  {dish.soldOut && (
                    <span className="text-[10px] font-bold uppercase text-[#B2402E] bg-[#F8D7DA] px-2 py-0.5 rounded">
                      Sold out today
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#76817D] line-clamp-2 leading-relaxed">
                  {dish.description}
                </p>

                <div className="flex items-center gap-2 pt-1 font-mono">
                  <span className="text-xs font-bold text-[#14403F]">${dish.price.toFixed(2)}</span>
                  {dish.options && dish.options.length > 0 && (
                    <span className="text-[10px] font-body text-[#2F6F6A]">
                      · Customizable
                    </span>
                  )}
                </div>
              </div>

              {/* Plus Button with Stepper Morph (§10) */}
              {!dish.soldOut && (
                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(e, dish)}
                  className="w-8 h-8 rounded-[10px] bg-[#EFE8DA] hover:bg-[#14403F] text-[#14403F] hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-sm active:scale-95"
                  aria-label={`Add ${dish.name} to cart`}
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Summary Section */}
      {restaurantReviews.length > 0 && (
        <div className="p-4 sm:p-5 border-t border-[#E1D9C8] bg-[#FAF5EC] space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-display font-medium text-[#14403F]">
              Recent Customer Reviews ({restaurantReviews.length})
            </h4>
            <span className="text-xs font-semibold text-[#D9A84E] flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{restaurant.rating}</span>
            </span>
          </div>

          <div className="space-y-2">
            {restaurantReviews.map((rev) => (
              <div key={rev.id} className="p-3 bg-[#FFFDF8] rounded-[10px] border border-[#E1D9C8] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-[#14403F]">{rev.customerName}</span>
                  <div className="flex text-[#D9A84E]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#4A5753] leading-relaxed">"{rev.text}"</p>
                {rev.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {rev.tags.map((t) => (
                      <span key={t} className="text-[10px] bg-[#EFE8DA] text-[#2F6F6A] px-1.5 py-0.2 rounded font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Item Sheet */}
      <ItemSheet
        item={selectedItem}
        isOpen={isItemSheetOpen}
        onClose={() => setIsItemSheetOpen(false)}
        onAddToCart={(item, qty, opts, notes) => {
          addToCart(item, qty, opts, notes);
          success(`Added ${qty}× ${item.name} to order`, 'Added to Order');
        }}
      />
    </div>
  );
};
