import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Compass, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { IslandMap } from './IslandMap';
import { useDemoStore } from '../../store/useDemoStore';

export const Hero: React.FC = () => {
  const { startOrchestrator } = useDemoStore();

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden font-body">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column (6 cols): Copy & Primary CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
          {/* Island Launch Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#DCE8E4] border border-[#2F6F6A]/30 text-[#14403F] text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-[#C65D3B] animate-pulse" />
            <span>Launching in St. Croix, USVI</span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-[#14403F] leading-[1.08] tracking-tight mb-5">
            Island food, delivered the way you'd want it.
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-[#4A5753] leading-relaxed max-w-xl mb-8">
            One platform for customers, restaurants, drivers, and your own admin console. Built to launch locally in St. Croix and expand to St. Thomas and St. John without a rebuild.
          </p>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6">
            <Link to="/app">
              <Button size="lg" className="w-full sm:w-auto bg-[#14403F] text-[#F7F2E8] shadow-md hover:bg-[#0F3332]">
                <span>Try the customer app</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <Link to="/restaurant">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <span>See restaurant dashboard</span>
              </Button>
            </Link>
          </div>

          {/* Tertiary Live Runner Trigger */}
          <div className="flex items-center gap-2.5 text-xs text-[#76817D] pt-2">
            <button
              onClick={startOrchestrator}
              className="inline-flex items-center gap-1.5 font-semibold text-[#C65D3B] hover:text-[#AE4D2E] underline underline-offset-2 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Or press Run live order</span>
            </button>
            <span>to watch all four roles sync simultaneously.</span>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 mt-6 border-t border-[#E1D9C8] w-full text-xs text-[#4A5753]">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
              <span>100% Client-Owned</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
              <span>Direct Bank Payouts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
              <span>Multi-Island Ready</span>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): Living Abstract St. Croix Map */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <div className="w-full bg-[#FFFDF8] border border-[#E1D9C8] rounded-[24px] p-3 sm:p-5 shadow-[0_12px_36px_rgba(29,38,36,0.08)] relative">
            {/* Top Bar on Map Stage */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E1D9C8] px-1 text-xs">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#2F6F6A]" />
                <span className="font-semibold text-[#14403F]">St. Croix Island Delivery Radar</span>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2E7D5B] bg-[#D4EDDA] px-2 py-0.5 rounded-full">
                Live Simulation
              </span>
            </div>

            {/* The SVG St. Croix Map */}
            <IslandMap showOrderChip={true} />

            {/* Town Legend Badges */}
            <div className="flex items-center justify-between pt-3 mt-1 border-t border-[#E1D9C8] px-1 text-[11px] text-[#76817D]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#14403F]" />
                Restaurant hubs (Christiansted, Cane Bay, Frederiksted)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C65D3B]" />
                Active courier route
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
