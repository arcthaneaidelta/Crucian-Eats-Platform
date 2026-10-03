import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Store, Bike, Shield, ArrowRight, Check, Star, Clock, DollarSign, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const RoleTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'customer' | 'restaurant' | 'driver' | 'admin'>('customer');
  const [isPaused, setIsPaused] = useState(false);

  const tabs = [
    { id: 'customer', label: '1. Customer Ordering', icon: <User className="w-4 h-4" /> },
    { id: 'restaurant', label: '2. Kitchen Operations', icon: <Store className="w-4 h-4" /> },
    { id: 'driver', label: '3. Sunlit Courier App', icon: <Bike className="w-4 h-4" /> },
    { id: 'admin', label: '4. Founder Command Console', icon: <Shield className="w-4 h-4" /> },
  ] as const;

  // Auto advance every 6s unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((curr) => {
        if (curr === 'customer') return 'restaurant';
        if (curr === 'restaurant') return 'driver';
        if (curr === 'driver') return 'admin';
        return 'customer';
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-16 md:py-24 bg-[#EFE8DA]/40 border-y border-[#E1D9C8] font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="label-style text-[#2F6F6A]">Four Roles · One Seamless Engine</span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#14403F] mt-2 mb-4">
            Customers order. Restaurants cook. Drivers deliver. You see all of it.
          </h2>
          <p className="text-base text-[#4A5753]">
            Every role runs on a unified state machine so that actions taken in one view instantly update the others in real time.
          </p>
        </div>

        {/* Tab Buttons */}
        <div
          className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-4 mb-8"
          onMouseEnter={() => setIsPaused(true)}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsPaused(true);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-sm font-semibold transition-all duration-150 whitespace-nowrap select-none
                ${activeTab === tab.id
                  ? 'bg-[#14403F] text-[#F7F2E8] shadow-sm'
                  : 'bg-[#FFFDF8] text-[#4A5753] hover:bg-[#EFE8DA] hover:text-[#1D2624] border border-[#CFC5B0]/50'
                }
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Active Tab Showcase Grid */}
        <div
          className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[24px] p-6 sm:p-10 shadow-[0_12px_36px_rgba(29,38,36,0.06)]"
          onMouseEnter={() => setIsPaused(true)}
        >
          {activeTab === 'customer' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C65D3B]">Frictionless Ordering</span>
                <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#14403F]">
                  Designed for island residents, guests & villas.
                </h3>
                <p className="text-sm text-[#4A5753] leading-relaxed">
                  Browse by authentic local categories (Roti, Conch, Island Classics), customize sides, and checkout with Gate Code / Landmark instructions tailored for USVI navigation.
                </p>
                <ul className="space-y-2.5 text-xs text-[#1D2624]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                    <span>Real-time restaurant search and live category chips</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                    <span>Side choices, dietary notes, and tip percentage chips</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                    <span>Live GPS order tracking with estimated countdown</span>
                  </li>
                </ul>
                <div className="pt-2">
                  <Link to="/app">
                    <Button size="md" className="bg-[#14403F] text-[#F7F2E8]">
                      <span>Open Customer App Demo</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Framed Interactive Simulation Component */}
              <div className="lg:col-span-7 bg-[#F7F2E8] border border-[#CFC5B0] rounded-[18px] p-5 shadow-inner">
                <div className="bg-[#FFFDF8] rounded-[14px] p-4 border border-[#E1D9C8] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E1D9C8]">
                    <span className="text-xs font-bold text-[#14403F]">Kallaloo & Co. · Christiansted</span>
                    <span className="text-[11px] font-semibold text-[#2E7D5B] bg-[#D4EDDA] px-2 py-0.5 rounded-full">Open · 25–35 min</span>
                  </div>
                  <div className="flex gap-3 items-center p-2.5 bg-[#EFE8DA] rounded-[10px]">
                    <div className="w-12 h-12 rounded-[8px] bg-[#14403F] flex items-center justify-center text-white text-xs font-bold">
                      2×
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1D2624]">Kallaloo & Fungi with Rice & Peas</p>
                      <p className="text-[11px] text-[#76817D]">Plus 4× Golden Johnnycakes</p>
                    </div>
                    <span className="text-sm font-semibold text-[#14403F] tabular-nums">$39.00</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#4A5753] pt-1">
                    <span>Delivery to Company St, Christiansted</span>
                    <span className="font-semibold text-[#2E7D5B]">$3.99 fee</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'restaurant' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C65D3B]">Kitchen Simplicity</span>
                <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#14403F]">
                  Large, forgiving controls for busy cooks & owners.
                </h3>
                <p className="text-sm text-[#4A5753] leading-relaxed">
                  Kanban order board designed for counter tablets. One tap to accept with prep time (10, 15, 20, 30 min), instant sold-out toggles, and direct payout transparency.
                </p>
                <ul className="space-y-2.5 text-xs text-[#1D2624]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                    <span>3-stage order pipeline: New, Preparing, Ready</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                    <span>Menu manager with live price changes and photo upload</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                    <span>"Pause orders" toggle for busy peak kitchen rushes</span>
                  </li>
                </ul>
                <div className="pt-2">
                  <Link to="/restaurant">
                    <Button size="md" className="bg-[#14403F] text-[#F7F2E8]">
                      <span>Open Restaurant Dashboard</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Framed Simulation Component */}
              <div className="lg:col-span-7 bg-[#F7F2E8] border border-[#CFC5B0] rounded-[18px] p-5 shadow-inner">
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  <div className="bg-[#FFFDF8] p-3 rounded-[12px] border border-[#C65D3B] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#C65D3B]">NEW (1)</span>
                      <span className="w-2 h-2 rounded-full bg-[#C65D3B] animate-ping" />
                    </div>
                    <div className="p-2 bg-[#EFE8DA] rounded-[8px] space-y-1">
                      <p className="font-bold text-[#14403F]">CE-24817 · $51.33</p>
                      <p className="text-[10px] text-[#76817D]">Marisol H. · 2m ago</p>
                      <div className="pt-1">
                        <span className="text-[10px] font-semibold bg-[#14403F] text-white px-2 py-0.5 rounded">Accept (15m)</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#FFFDF8] p-3 rounded-[12px] border border-[#E1D9C8] space-y-2 opacity-90">
                    <span className="font-bold text-[#14403F]">PREPARING (2)</span>
                    <div className="p-2 bg-[#FAF5EC] rounded-[8px] text-[11px]">
                      <p className="font-semibold text-[#1D2624]">Stewed Goat Plate</p>
                      <p className="text-[10px] text-[#2E7D5B]">Ready in 8 min</p>
                    </div>
                  </div>
                  <div className="bg-[#FFFDF8] p-3 rounded-[12px] border border-[#E1D9C8] space-y-2 opacity-80">
                    <span className="font-bold text-[#2E7D5B]">READY (1)</span>
                    <div className="p-2 bg-[#D4EDDA]/50 rounded-[8px] text-[11px]">
                      <p className="font-semibold text-[#14403F]">Driver Assigned</p>
                      <p className="text-[10px] text-[#4A5753]">Jerome M. (Scooter)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'driver' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C65D3B]">Courier Mobility</span>
                <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#14403F]">
                  High contrast & large touch targets for outdoor sunlight.
                </h3>
                <p className="text-sm text-[#4A5753] leading-relaxed">
                  Drivers operate with gloved hands on scooters and trucks. Features simple slide-to-accept, step-by-step progress buttons, landmark notes, and delivery photo confirmation.
                </p>
                <ul className="space-y-2.5 text-xs text-[#1D2624]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                    <span>Large 56px action buttons and minimum 17px text</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                    <span>Instant earnings breakdown: $9.25 base + 100% tip</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                    <span>Photo proof capture directly at drop-off gate</span>
                  </li>
                </ul>
                <div className="pt-2">
                  <Link to="/driver">
                    <Button size="md" className="bg-[#14403F] text-[#F7F2E8]">
                      <span>Open Driver Mobile Demo</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Framed Driver Mock */}
              <div className="lg:col-span-7 bg-[#1D2624] text-[#F7F2E8] border border-[#2F6F6A] rounded-[18px] p-5 shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D5B] animate-pulse" />
                    <span className="font-semibold text-white">ONLINE · Jerome Maynard</span>
                  </div>
                  <span className="text-emerald-400 font-bold">$94.50 Today</span>
                </div>
                <div className="my-4 bg-white/10 p-3.5 rounded-[12px] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#D9A84E] font-bold uppercase tracking-wider">Active Delivery</span>
                    <span className="bg-emerald-600/30 text-emerald-300 px-2 py-0.5 rounded text-[10px]">Head to drop-off</span>
                  </div>
                  <p className="text-sm font-bold text-white">Dropoff: Estate Whim, Frederiksted</p>
                  <p className="text-xs text-[#DCE8E4]/80">Note: "Blue gate, 2nd house on left. Watch for friendly potcake dog."</p>
                </div>
                <div className="w-full bg-[#C65D3B] text-white text-center font-bold py-3 rounded-[10px] text-sm">
                  Complete Delivery & Attach Photo
                </div>
              </div>
            </div>
          )}

          {activeTab === 'admin' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C65D3B]">Founder Oversight</span>
                <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#14403F]">
                  Full visibility over money, orders, and multi-island growth.
                </h3>
                <p className="text-sm text-[#4A5753] leading-relaxed">
                  Real-time transaction ledgers, configurable commission rates, refund adjustments, and pre-built multi-location support to launch St. Thomas and St. John without rebuilding.
                </p>
                <ul className="space-y-2.5 text-xs text-[#1D2624]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                    <span>Live fee calculator: test 12% vs 15% commission splits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                    <span>Complete transaction ledger and refund audit tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                    <span>4-step "Prepare St. Thomas" expansion wizard</span>
                  </li>
                </ul>
                <div className="pt-2">
                  <Link to="/admin">
                    <Button size="md" className="bg-[#14403F] text-[#F7F2E8]">
                      <span>Open Admin Console</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Framed Admin Mock */}
              <div className="lg:col-span-7 bg-[#FFFDF8] border border-[#CFC5B0] rounded-[18px] p-5 shadow-sm space-y-3">
                <div className="grid grid-cols-3 gap-3 text-left">
                  <div className="bg-[#EFE8DA] p-3 rounded-[10px]">
                    <span className="text-[10px] font-bold text-[#76817D] uppercase">Orders Today</span>
                    <p className="text-xl font-bold font-display text-[#14403F]">142</p>
                    <span className="text-[10px] text-[#2E7D5B]">▲ 8.2% vs yesterday</span>
                  </div>
                  <div className="bg-[#EFE8DA] p-3 rounded-[10px]">
                    <span className="text-[10px] font-bold text-[#76817D] uppercase">Gross Volume</span>
                    <p className="text-xl font-bold font-display text-[#14403F]">$6,184</p>
                    <span className="text-[10px] text-[#2E7D5B]">100% in your bank</span>
                  </div>
                  <div className="bg-[#EFE8DA] p-3 rounded-[10px]">
                    <span className="text-[10px] font-bold text-[#76817D] uppercase">Platform Fee</span>
                    <p className="text-xl font-bold font-display text-[#C65D3B]">$742</p>
                    <span className="text-[10px] text-[#76817D]">12% net margin</span>
                  </div>
                </div>
                <div className="p-2.5 bg-[#FAF5EC] rounded-[10px] border border-[#E1D9C8] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#14403F]">Locations Architecture:</span>
                    <span className="ml-2 text-[#4A5753]">St. Croix (Active) · St. Thomas (Draft) · St. John (Ready)</span>
                  </div>
                  <span className="text-[#C65D3B] font-semibold">Zero Rebuild Needed</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
