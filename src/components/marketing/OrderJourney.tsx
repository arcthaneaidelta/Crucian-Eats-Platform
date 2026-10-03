import React, { useState } from 'react';
import { Check, Clock, Bike, ShieldCheck, CheckCircle2, ChevronRight, MapPin, ChefHat } from 'lucide-react';
import type { OrderStatus } from '../../data/types';

interface JourneyStep {
  status: OrderStatus;
  title: string;
  actor: string;
  time: string;
  description: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  { status: 'placed', title: 'Order Placed', actor: 'Marisol H. (Customer)', time: '7:14 PM', description: 'Customer checks out with 2× Kallaloo & 1× Johnnycakes to Estate Whim.' },
  { status: 'accepted', title: 'Accepted by Kitchen', actor: 'Dale F. (Kallaloo & Co.)', time: '7:16 PM', description: 'Chef Dale reviews tickets and accepts with 15-minute preparation window.' },
  { status: 'preparing', title: 'Kitchen Cooking', actor: 'Kitchen Line', time: '7:20 PM', description: 'Fungi cornmeal steamed fresh; callaloo greens and goat simmered.' },
  { status: 'ready', title: 'Packaged & Ready', actor: 'Kallaloo & Co.', time: '7:31 PM', description: 'Order boxed in thermal bags with receipt CE-24817 attached.' },
  { status: 'driver_assigned', title: 'Courier Dispatched', actor: 'Jerome M. (Driver)', time: '7:32 PM', description: 'Driver on Honda scooter receives job ($9.25 base + $6 tip) and accepts.' },
  { status: 'picked_up', title: 'Order Picked Up', actor: 'Jerome M.', time: '7:36 PM', description: 'Courier confirms pickup in Christiansted and departs toward west end.' },
  { status: 'on_the_way', title: 'En Route on Centerline', actor: 'Jerome M.', time: '7:44 PM', description: 'Courier travels across Kingshill past Sunny Isles toward Frederiksted.' },
  { status: 'delivered', title: 'Delivered at Gate', actor: 'Customer Verified', time: '7:49 PM', description: 'Dropped off by blue gate; photo proof captured; 5-star review submitted.' },
];

export const OrderJourney: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = JOURNEY_STEPS[activeStepIndex];

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-body">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="label-style text-[#2F6F6A]">Unified State Machine · §3</span>
        <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#14403F] mt-2 mb-4">
          How one order moves across St. Croix.
        </h2>
        <p className="text-base text-[#4A5753]">
          A single source of truth connects customer, kitchen, courier, and ledger. Click any step to inspect how the order card transforms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 8-Step Timeline selector */}
        <div className="lg:col-span-6 space-y-2 bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-5 shadow-sm">
          {JOURNEY_STEPS.map((step, idx) => {
            const isCurrent = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;

            return (
              <button
                key={step.status}
                onClick={() => setActiveStepIndex(idx)}
                className={`w-full text-left p-3 rounded-[12px] transition-all flex items-start gap-3 border ${
                  isCurrent
                    ? 'bg-[#14403F] text-[#F7F2E8] border-[#14403F] shadow-sm'
                    : 'bg-[#FFFDF8] text-[#1D2624] hover:bg-[#EFE8DA] border-transparent'
                }`}
              >
                {/* Step Indicator Dot */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                    isCurrent
                      ? 'bg-[#C65D3B] text-white'
                      : isCompleted
                      ? 'bg-[#D4EDDA] text-[#2E7D5B]'
                      : 'bg-[#EFE8DA] text-[#76817D]'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-semibold ${isCurrent ? 'text-[#F7F2E8]' : 'text-[#14403F]'}`}>
                      {step.title}
                    </h4>
                    <span className={`text-[11px] font-mono ${isCurrent ? 'text-[#DCE8E4]' : 'text-[#76817D]'}`}>
                      {step.time}
                    </span>
                  </div>
                  <p className={`text-xs mt-0.5 ${isCurrent ? 'text-[#DCE8E4]/90' : 'text-[#4A5753]'}`}>
                    {step.actor}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Morphing Live Order Card */}
        <div className="lg:col-span-6 sticky top-24">
          <div className="bg-[#FFFDF8] border border-[#CFC5B0] rounded-[24px] p-6 sm:p-8 shadow-[0_16px_40px_rgba(29,38,36,0.09)] space-y-6">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E1D9C8]">
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#76817D]">
                  Order CE-24817
                </span>
                <h3 className="text-xl font-display font-medium text-[#14403F]">
                  Kallaloo & Co.
                </h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                activeStep.status === 'delivered'
                  ? 'bg-[#D4EDDA] text-[#2E7D5B]'
                  : 'bg-[#F6DDD2] text-[#C65D3B]'
              }`}>
                {activeStep.title}
              </span>
            </div>

            {/* Status Narrative Callout */}
            <div className="bg-[#FAF5EC] border border-[#E1D9C8] rounded-[14px] p-4 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-[#C65D3B] font-bold uppercase tracking-wider text-[10px]">
                <Clock className="w-3.5 h-3.5" />
                <span>Current State: {activeStep.title}</span>
              </div>
              <p className="text-xs text-[#1D2624] font-medium leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            {/* Route Summary */}
            <div className="space-y-3 py-1 text-xs">
              <div className="flex items-start gap-2.5">
                <ChefHat className="w-4 h-4 text-[#2F6F6A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#14403F]">Pickup: Kallaloo & Co.</p>
                  <p className="text-[#76817D]">Company St, Christiansted · Prep ready</p>
                </div>
              </div>
              <div className="w-0.5 h-4 bg-[#CFC5B0] ml-2" />
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C65D3B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#14403F]">Dropoff: Estate Whim, Frederiksted</p>
                  <p className="text-[#76817D]">Blue gate, 2nd house on left</p>
                </div>
              </div>
            </div>

            {/* Financial Ledger Split on this Order */}
            <div className="border-t border-[#E1D9C8] pt-4 bg-[#EFE8DA]/50 -mx-6 -mb-6 p-6 rounded-b-[24px] space-y-2 text-xs">
              <div className="flex justify-between text-[#4A5753]">
                <span>Food Subtotal (2 items)</span>
                <span className="font-mono text-[#1D2624]">$39.00</span>
              </div>
              <div className="flex justify-between text-[#4A5753]">
                <span>Delivery Fee (St. Croix base)</span>
                <span className="font-mono text-[#1D2624]">$3.99</span>
              </div>
              <div className="flex justify-between text-[#4A5753]">
                <span>Service Fee (6%) + Tip ($6.00)</span>
                <span className="font-mono text-[#1D2624]">$8.34</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#14403F] border-t border-[#CFC5B0] pt-2">
                <span>Customer Paid</span>
                <span className="font-mono text-[#C65D3B]">$51.33</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#2E7D5B] font-semibold pt-1">
                <span>Direct Split: Restaurant $34.32 · Courier $9.99 · Your Platform $7.02</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
