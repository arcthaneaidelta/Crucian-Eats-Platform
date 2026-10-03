import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bike, Power, MapPin, Navigation, Camera, Check, Clock, DollarSign, ChevronRight, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useDemoStore } from '../../store/useDemoStore';
import { Button } from '../../components/ui/Button';
import { IslandMap } from '../../components/marketing/IslandMap';
import { useToast } from '../../components/ui/Toast';

export const DriverPage: React.FC = () => {
  const navigate = useNavigate();
  const { drivers, setDriverOnline, orders, advanceOrder, setDeliveryPhoto } = useDemoStore();
  const { success, info, toast } = useToast();

  const driver = drivers[0]; // Jerome Maynard (Honda scooter)
  const isOnline = driver.isOnline;

  const [hasRequest, setHasRequest] = useState(false);
  const [requestCountdown, setRequestCountdown] = useState(30);
  const [deliveryNote, setDeliveryNote] = useState('Left safely on porch table by blue gate.');
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'delivery' | 'earnings'>('delivery');

  // Find active order assigned to this driver or pending
  const activeOrder = orders.find((o) =>
    ['driver_assigned', 'picked_up', 'on_the_way'].includes(o.status)
  ) || null;

  // When driver toggles online and there's a ready order, show request after 3s (§11.3)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOnline && !activeOrder) {
      const readyOrder = orders.find((o) => o.status === 'ready' || o.status === 'placed');
      if (readyOrder) {
        timer = setTimeout(() => {
          setHasRequest(true);
          setRequestCountdown(30);
        }, 3000);
      }
    } else {
      setHasRequest(false);
    }
    return () => clearTimeout(timer);
  }, [isOnline, activeOrder, orders]);

  // Request countdown timer
  useEffect(() => {
    if (!hasRequest) return;
    const interval = setInterval(() => {
      setRequestCountdown((prev) => {
        if (prev <= 1) {
          setHasRequest(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [hasRequest]);

  const handleToggleOnline = () => {
    const nextState = !isOnline;
    setDriverOnline(driver.id, nextState);
    if (nextState) {
      success("You're online. Radar scanning for St. Croix food orders.", "Driver Online");
    } else {
      info("You're offline. Shifts and earnings saved.", "Driver Offline");
    }
  };

  const handleAcceptRequest = () => {
    const targetOrder = orders.find((o) => o.status === 'ready') || orders[0];
    advanceOrder(targetOrder.id);
    setHasRequest(false);
    success(`Delivery accepted! Head to ${targetOrder.restaurantName} in Christiansted.`, "Job Accepted");
  };

  const handleAdvanceStep = () => {
    if (!activeOrder) return;
    advanceOrder(activeOrder.id);

    if (activeOrder.status === 'driver_assigned') {
      success("Order picked up from kitchen. Head to Frederiksted!", "Picked Up");
    } else if (activeOrder.status === 'picked_up') {
      info("Courier en route on Centerline Road.", "In Transit");
    } else if (activeOrder.status === 'on_the_way') {
      // Complete delivery with photo
      setDeliveryPhoto(activeOrder.id, '/images/delivery-proof.jpg', deliveryNote);
      success(`Delivery completed! +$${(9.25 + activeOrder.tip).toFixed(2)} added to your earnings.`, "Delivery Complete");
      setPhotoCaptured(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1D2624] text-[#F7F2E8] font-body text-xs flex flex-col justify-between selection:bg-[#C65D3B]">
      {/* High-Contrast Sunlit Top Bar (§11.3, §15) */}
      <header className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-[#14403F]">
        <div className="flex items-center gap-3">
          <Link to="/" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
            <Bike className="w-4 h-4 text-[#D9A84E]" />
          </Link>
          <div>
            <h1 className="font-bold text-sm text-white">
              {driver.name}
            </h1>
            <p className="text-[11px] text-[#DCE8E4]">
              {driver.vehicle} · ★ {driver.rating}
            </p>
          </div>
        </div>

        {/* Big Online/Offline Power Toggle (§11.3) */}
        <button
          onClick={handleToggleOnline}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all select-none shadow-md active:scale-95 ${
            isOnline
              ? 'bg-[#2E7D5B] text-white hover:bg-[#256348]'
              : 'bg-[#B2402E] text-white hover:bg-[#963323]'
          }`}
        >
          <Power className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
        </button>
      </header>

      {/* Main Courier Stage */}
      <main className="flex-1 p-4 sm:p-6 max-w-lg mx-auto w-full space-y-5">
        {/* Navigation Tabs (Delivery / Earnings) */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-white/10 rounded-[12px]">
          <button
            onClick={() => setActiveTab('delivery')}
            className={`py-2 text-xs font-bold rounded-[8px] transition-all ${
              activeTab === 'delivery' ? 'bg-[#FFFDF8] text-[#1D2624] shadow' : 'text-[#DCE8E4]'
            }`}
          >
            Dispatch & Route
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`py-2 text-xs font-bold rounded-[8px] transition-all ${
              activeTab === 'earnings' ? 'bg-[#FFFDF8] text-[#1D2624] shadow' : 'text-[#DCE8E4]'
            }`}
          >
            Driver Earnings
          </button>
        </div>

        {activeTab === 'delivery' ? (
          <>
            {/* If Offline */}
            {!isOnline && !activeOrder && (
              <div className="bg-white/5 border border-white/10 rounded-[20px] p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto text-[#76817D]">
                  <Bike className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-medium text-white">
                    You're Currently Offline
                  </h3>
                  <p className="text-xs text-[#DCE8E4]/70 mt-1 max-w-xs mx-auto leading-relaxed">
                    Toggle your status to Online above when you're ready to receive St. Croix restaurant delivery offers.
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded-[12px] flex justify-between items-center text-xs">
                  <span className="text-[#DCE8E4]">Today's Deliveries:</span>
                  <span className="font-bold text-[#D9A84E]">6 Completed ($94.50)</span>
                </div>
              </div>
            )}

            {/* If Online & Waiting (Gentle Radar Pulse §11.3) */}
            {isOnline && !activeOrder && !hasRequest && (
              <div className="bg-white/5 border border-white/10 rounded-[20px] p-8 text-center space-y-6">
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-[#2E7D5B] radar-ring" />
                  <div className="w-12 h-12 rounded-full bg-[#2E7D5B] flex items-center justify-center text-white shadow-lg">
                    <Bike className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    Looking for deliveries...
                  </h3>
                  <p className="text-xs text-[#DCE8E4]/70 mt-1">
                    Matching you with hot orders in Christiansted, Cane Bay & Frederiksted.
                  </p>
                </div>

                <div className="p-3 bg-black/20 rounded-[12px] text-[11px] text-[#D9A84E] font-medium">
                  Average payout: $9.25 base + 100% customer tips
                </div>
              </div>
            )}

            {/* INCOMING REQUEST CARD SLIDE-UP (§11.3) */}
            {hasRequest && (
              <div className="bg-[#FFFDF8] text-[#1D2624] border-2 border-[#C65D3B] rounded-[24px] p-5 shadow-2xl space-y-4 animate-slideInUp">
                <div className="flex items-center justify-between pb-2 border-b border-[#E1D9C8]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C65D3B]">
                    New Delivery Request
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#B2402E]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{requestCountdown}s</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-display font-medium text-[#14403F]">
                    Kallaloo & Co.
                  </h3>
                  <p className="text-xs text-[#76817D]">
                    Pickup: Company St, Christiansted · Dropoff: Estate Whim
                  </p>
                </div>

                <div className="bg-[#FAF5EC] p-3.5 rounded-[14px] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#76817D]">Guaranteed Payout</span>
                    <p className="text-xl font-bold font-mono text-[#2E7D5B]">$15.25</p>
                    <span className="text-[10px] text-[#76817D]">$9.25 base + $6.00 tip</span>
                  </div>
                  <span className="text-xs font-semibold text-[#14403F] bg-[#EFE8DA] px-2.5 py-1 rounded-full">
                    ~7.4 miles
                  </span>
                </div>

                {/* Big Accept & Decline Controls (§11.3) */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleAcceptRequest}
                    className="w-full h-14 bg-[#2E7D5B] hover:bg-[#256348] active:bg-[#1f523c] text-white rounded-[14px] font-bold text-base flex items-center justify-center gap-2 shadow-lg select-none"
                  >
                    <span>Accept Delivery · $15.25</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setHasRequest(false)}
                    className="w-full py-2 text-xs text-[#76817D] hover:text-[#1D2624] text-center"
                  >
                    Decline Offer
                  </button>
                </div>
              </div>
            )}

            {/* ACTIVE DELIVERY IN PROGRESS (§11.3) */}
            {activeOrder && (
              <div className="bg-[#FFFDF8] text-[#1D2624] rounded-[24px] p-5 shadow-2xl space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-[#E1D9C8]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C65D3B]">
                      Active Job · {activeOrder.orderNumber}
                    </span>
                    <h3 className="text-lg font-display font-medium text-[#14403F]">
                      {activeOrder.status === 'driver_assigned' ? 'Head to Restaurant' : 'Head to Drop-Off'}
                    </h3>
                  </div>
                  <span className="text-sm font-bold font-mono text-[#2E7D5B]">
                    ${(9.25 + activeOrder.tip).toFixed(2)}
                  </span>
                </div>

                {/* St. Croix Schematic Route Tracker */}
                <div className="rounded-[16px] overflow-hidden border border-[#E1D9C8]">
                  <IslandMap orderStatus={activeOrder.status} showOrderChip={false} height={180} />
                </div>

                {/* Destination & Gate Landmark Details */}
                <div className="p-3.5 bg-[#FAF5EC] rounded-[14px] space-y-1.5 text-xs">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#C65D3B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#14403F] text-sm">
                        {activeOrder.status === 'driver_assigned' ? 'Kallaloo & Co. (Christiansted)' : activeOrder.deliveryAddress}
                      </p>
                      <p className="text-[#4A5753] mt-0.5 font-medium">
                        Customer: Marisol Henry
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-[#EFE8DA] rounded-[8px] text-[11px] text-[#14403F] font-medium">
                    Gate note: "Blue gate, 2nd house on left. Potcake dog is friendly."
                  </div>
                </div>

                {/* Navigation Button */}
                <button
                  onClick={() => toast({ message: "GPS turn-by-turn navigation launched (Simulated)", title: "Maps Navigation" })}
                  className="w-full py-2.5 bg-[#EFE8DA] hover:bg-[#E1D9C8] rounded-[10px] text-xs font-bold text-[#14403F] flex items-center justify-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#2F6F6A]" />
                  <span>Open Route in Island Maps</span>
                </button>

                {/* Step Action Button (56px high touch target §15, §26.S13) */}
                <div className="pt-2">
                  {activeOrder.status === 'driver_assigned' && (
                    <button
                      onClick={handleAdvanceStep}
                      className="w-full h-14 bg-[#14403F] text-white hover:bg-[#0F3332] active:bg-[#0B2827] rounded-[14px] font-bold text-base shadow-lg"
                    >
                      I Have Arrived at Kallaloo & Co.
                    </button>
                  )}

                  {activeOrder.status === 'picked_up' && (
                    <button
                      onClick={handleAdvanceStep}
                      className="w-full h-14 bg-[#C65D3B] text-white hover:bg-[#AE4D2E] active:bg-[#964024] rounded-[14px] font-bold text-base shadow-lg"
                    >
                      Food Picked Up · Start Delivery Route
                    </button>
                  )}

                  {activeOrder.status === 'on_the_way' && (
                    <div className="space-y-3">
                      {/* Photo capture simulator (§11.3) */}
                      <div className="p-3 bg-[#EFE8DA] rounded-[12px] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Camera className="w-4 h-4 text-[#14403F]" />
                          <span className="font-semibold text-xs text-[#14403F]">
                            {photoCaptured ? 'Photo Attached (Porch)' : 'Drop-off Photo Required'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setPhotoCaptured(true);
                            success("Porch delivery photo captured.", "Photo Attached");
                          }}
                          className="px-3 py-1 bg-[#14403F] text-white rounded-[8px] text-[11px] font-bold"
                        >
                          {photoCaptured ? 'Retake' : 'Capture Photo'}
                        </button>
                      </div>

                      <button
                        onClick={handleAdvanceStep}
                        className="w-full h-14 bg-[#2E7D5B] text-white hover:bg-[#256348] rounded-[14px] font-bold text-base shadow-lg flex items-center justify-center gap-2"
                      >
                        <Check className="w-5 h-5 stroke-[2.5]" />
                        <span>Complete Delivery & Receive $15.25</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          /* TAB 2: DRIVER EARNINGS (§11.3) */
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-[20px] p-5 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9A84E]">Today's Shift</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-display font-bold text-white">$109.75</span>
                <span className="text-xs text-[#2E7D5B] font-semibold bg-[#2E7D5B]/20 px-2.5 py-1 rounded-full">
                  7 Deliveries Completed
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-white/10">
                <div>
                  <span className="text-[#DCE8E4]/60">Base Pay:</span>
                  <p className="font-bold text-white">$64.75</p>
                </div>
                <div>
                  <span className="text-[#DCE8E4]/60">Customer Tips (100%):</span>
                  <p className="font-bold text-[#D9A84E]">$45.00</p>
                </div>
              </div>
            </div>

            {/* Weekly Bar Chart (§11.3) */}
            <div className="bg-white/5 border border-white/10 rounded-[20px] p-5 space-y-3">
              <span className="text-xs font-bold text-white">Weekly Earnings Summary</span>
              <div className="flex items-end justify-between h-28 pt-4 gap-2">
                {[
                  { day: 'M', val: 62 },
                  { day: 'T', val: 78 },
                  { day: 'W', val: 54 },
                  { day: 'T', val: 91 },
                  { day: 'F', val: 103 },
                  { day: 'S', val: 118 },
                  { day: 'S', val: 109 },
                ].map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div
                      className="w-full bg-[#C65D3B] rounded-t-[4px] transition-all"
                      style={{ height: `${(item.val / 120) * 100}%` }}
                    />
                    <span className="text-[10px] text-[#DCE8E4]/70">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Driver Footer Navigation */}
      <footer className="p-3 bg-[#14403F] border-t border-white/10 text-center text-[11px] text-[#DCE8E4]/70">
        Crucian Courier Network · St. Croix Active Island Fleet
      </footer>
    </div>
  );
};
