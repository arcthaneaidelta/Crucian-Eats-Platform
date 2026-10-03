import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, Star, Clock, ChevronDown, UtensilsCrossed, AlertCircle } from 'lucide-react';
import { useDemoStore } from '../../store/useDemoStore';
import { Chip } from '../../components/ui/Chip';
import { Modal } from '../../components/ui/Modal';
import { foodCategories } from '../../data/seed';
import type { Restaurant } from '../../data/types';

export const CustomerHomePage: React.FC = () => {
  const navigate = useNavigate();
  const { restaurants, notifications, markAllRead, menuItems } = useDemoStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeAddress, setActiveAddress] = useState('Estate Whim, Frederiksted');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const customerNotifs = notifications.filter((n) => n.role === 'customer');
  const unreadCount = customerNotifs.filter((n) => !n.read).length;

  // Filter restaurants based on search & category
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      const matchesCategory = selectedCategory ? r.category.includes(selectedCategory) : true;

      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase();
      const matchesName = r.name.toLowerCase().includes(q);
      const matchesCuisine = r.cuisine.toLowerCase().includes(q);
      const matchesZone = r.zone.toLowerCase().includes(q);

      // Check dish items
      const hasMatchingDish = menuItems.some(
        (m) => m.restaurantId === r.id && (m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q))
      );

      return matchesCategory && (matchesName || matchesCuisine || matchesZone || hasMatchingDish);
    });
  }, [restaurants, searchQuery, selectedCategory, menuItems]);

  const featuredRestaurants = restaurants.filter((r) => r.isOpen).slice(0, 3);

  return (
    <div className="p-4 sm:p-6 space-y-6 font-body text-xs text-[#1D2624]">
      {/* Top Header: Address & Notifications */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setIsAddressModalOpen(true)}
          className="flex items-center gap-1.5 text-left group"
        >
          <MapPin className="w-4 h-4 text-[#C65D3B] shrink-0" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#76817D] block">
              Deliver to St. Croix
            </span>
            <div className="flex items-center gap-1 font-semibold text-sm text-[#14403F] group-hover:text-[#0F3332]">
              <span className="truncate max-w-[200px]">{activeAddress}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#76817D]" />
            </div>
          </div>
        </button>

        <button
          onClick={() => {
            setIsNotifOpen(true);
            markAllRead('customer');
          }}
          aria-label="Notifications"
          className="relative p-2 rounded-full bg-[#EFE8DA] text-[#14403F] hover:bg-[#E1D9C8] transition-colors"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C65D3B] animate-pulse" />
          )}
        </button>
      </div>

      {/* Live Search Bar (§11.1) */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#76817D] absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search 'roti', 'kallaloo', 'conch' or restaurant..."
          className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[12px] py-2.5 pl-10 pr-4 text-sm text-[#1D2624] placeholder-[#76817D] focus:outline-none focus:border-[#2F6F6A] focus:bg-[#FFFDF8]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-2.5 text-xs text-[#76817D] hover:text-[#1D2624]"
          >
            Clear
          </button>
        )}
      </div>

      {/* Horizontal Category Chips (§11.1) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
        <Chip
          label="All Food"
          selected={selectedCategory === null}
          onClick={() => setSelectedCategory(null)}
        />
        {foodCategories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            selected={selectedCategory === cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
          />
        ))}
      </div>

      {/* Empty Search Suggestion State (§11.1) */}
      {filteredRestaurants.length === 0 && (
        <div className="py-8 text-center bg-[#FAF5EC] border border-[#E1D9C8] rounded-[16px] p-6 space-y-3">
          <UtensilsCrossed className="w-8 h-8 text-[#76817D] mx-auto" />
          <h4 className="text-sm font-semibold text-[#14403F]">
            No matches for '{searchQuery}'
          </h4>
          <p className="text-xs text-[#76817D]">
            Try island favourites:
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {['roti', 'conch', 'johnnycake', 'goat'].map((sug) => (
              <button
                key={sug}
                onClick={() => setSearchQuery(sug)}
                className="px-2.5 py-1 rounded bg-[#EFE8DA] text-[#14403F] text-xs font-semibold hover:bg-[#E1D9C8]"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Featured "Open Now" Carousel (§26.S6) */}
      {!searchQuery && selectedCategory === null && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-display font-medium text-[#14403F]">
              Featured on the Island
            </h3>
            <span className="text-[11px] font-semibold text-[#2F6F6A]">Fast Delivery</span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {featuredRestaurants.map((res) => (
              <div
                key={res.id}
                onClick={() => navigate(`/app/r/${res.id}`)}
                className="w-64 shrink-0 bg-[#FFFDF8] border border-[#E1D9C8] rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="h-28 bg-[#14403F]/10 flex items-center justify-center relative p-3">
                  <span className="font-display font-medium text-base text-[#14403F] text-center">
                    {res.name}
                  </span>
                  <span className="absolute bottom-2 left-2 bg-[#14403F] text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {res.zone}
                  </span>
                </div>
                <div className="p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#14403F]">{res.cuisine}</span>
                    <span className="flex items-center gap-0.5 text-xs font-semibold text-[#D9A84E]">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{res.rating}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#76817D]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{res.deliveryTime}</span>
                    </span>
                    <span>${res.deliveryFee.toFixed(2)} delivery</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Restaurants List */}
      <div className="space-y-3">
        <h3 className="text-base font-display font-medium text-[#14403F]">
          {selectedCategory ? `${selectedCategory} (${filteredRestaurants.length})` : 'All St. Croix Restaurants'}
        </h3>

        <div className="grid grid-cols-1 gap-3.5">
          {filteredRestaurants.map((res) => (
            <div
              key={res.id}
              onClick={() => navigate(`/app/r/${res.id}`)}
              className={`bg-[#FFFDF8] border rounded-[16px] p-3.5 transition-all flex items-center gap-3.5 cursor-pointer hover:border-[#14403F] ${
                !res.isOpen ? 'opacity-65 border-[#E1D9C8]' : 'border-[#E1D9C8] shadow-sm'
              }`}
            >
              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-[12px] bg-[#EFE8DA] flex items-center justify-center shrink-0 border border-[#CFC5B0]">
                <span className="font-display font-bold text-lg text-[#14403F]">
                  {res.name[0]}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[#14403F] truncate">
                    {res.name}
                  </h4>
                  <span className="flex items-center gap-1 text-xs font-bold text-[#D9A84E] shrink-0">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{res.rating}</span>
                  </span>
                </div>

                <p className="text-[11px] text-[#4A5753] truncate">
                  {res.cuisine} · {res.zone}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-[#76817D] pt-0.5">
                  <span>{res.deliveryTime}</span>
                  <span>·</span>
                  <span>${res.deliveryFee.toFixed(2)} fee</span>
                  {!res.isOpen && (
                    <span className="text-[#C65D3B] font-semibold ml-auto">
                      Opens {res.opensAt || 'later'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Address Switcher Modal */}
      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title="Delivery Address on St. Croix"
        description="Select your villa, home, or marina location"
      >
        <div className="space-y-2.5 font-body text-xs">
          {[
            { label: 'Home (Estate Whim)', address: 'Estate Whim, Frederiksted', landmark: 'Blue gate, 2nd house on left' },
            { label: 'Office / Marina', address: 'Company St, Christiansted', landmark: 'Above Big Beard dive shop' },
            { label: 'Villa (Cane Bay)', address: 'North Shore Road, Cane Bay', landmark: 'Near The Landing restaurant' },
          ].map((loc, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveAddress(loc.address);
                setIsAddressModalOpen(false);
              }}
              className="w-full p-3 rounded-[12px] bg-[#EFE8DA] hover:bg-[#E1D9C8] text-left flex items-start gap-2.5 transition-all"
            >
              <MapPin className="w-4 h-4 text-[#C65D3B] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#14403F]">{loc.label}</p>
                <p className="text-[#4A5753]">{loc.address}</p>
                <p className="text-[11px] text-[#76817D] italic">{loc.landmark}</p>
              </div>
            </button>
          ))}
        </div>
      </Modal>

      {/* Notifications Drawer */}
      <Modal
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        title="Your Notifications"
        description="Updates on orders and deliveries"
      >
        <div className="space-y-2 text-xs">
          {customerNotifs.length === 0 ? (
            <p className="text-[#76817D] text-center py-4">No recent notifications</p>
          ) : (
            customerNotifs.map((n) => (
              <div key={n.id} className="p-3 bg-[#EFE8DA] rounded-[10px] space-y-1">
                <span className="font-semibold text-[#14403F] block">{n.title}</span>
                <p className="text-[#4A5753] leading-relaxed">{n.message}</p>
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
};
