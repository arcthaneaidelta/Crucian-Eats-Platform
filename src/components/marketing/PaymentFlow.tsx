import React from 'react';
import { ArrowRight, ShieldCheck, Landmark, Store, Bike, Wallet, Lock } from 'lucide-react';

export const PaymentFlow: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FAF5EC] border-y border-[#E1D9C8] font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="label-style text-[#2F6F6A]">Financial Sovereignty · §1.1 & §8.2.3</span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#14403F] mt-2 mb-4">
            Built for payments you own and control.
          </h2>
          <p className="text-base text-[#4A5753]">
            Payments are held in Crucian Eats' verified bank processor account. Every dollar flows directly to you and your partners—the developer never holds or touches customer funds.
          </p>
        </div>

        {/* Diagram Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch relative">
          {/* Card 1: Customer */}
          <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#EFE8DA] flex items-center justify-center text-[#14403F] mb-4">
                <Wallet className="w-5 h-5 text-[#2F6F6A]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#76817D]">Origin</span>
              <h4 className="text-lg font-display font-medium text-[#14403F] mb-1">Customer Order</h4>
              <p className="text-xs text-[#4A5753] leading-relaxed">
                Guest or resident pays via Card, Apple Pay, or Google Pay ($51.33).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E1D9C8] text-xs font-mono font-bold text-[#14403F]">
              +$51.33 Gross Total
            </div>
          </div>

          {/* Card 2: Client's Processor Account (The Core Trust Anchor) */}
          <div className="bg-[#14403F] text-[#F7F2E8] border border-[#0F3332] rounded-[20px] p-6 shadow-md flex flex-col justify-between relative overflow-hidden md:scale-105 z-10">
            <div className="absolute top-0 right-0 p-3 opacity-15">
              <Landmark className="w-24 h-24 text-white" />
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-[#2F6F6A] flex items-center justify-center text-[#F7F2E8] mb-4">
                <Lock className="w-5 h-5 text-[#D9A84E]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9A84E]">Your Sovereign Vault</span>
              <h4 className="text-lg font-display font-medium text-[#FFFDF8] mb-1">Crucian Eats Merchant Account</h4>
              <p className="text-xs text-[#DCE8E4] leading-relaxed">
                Created directly in your company name. Zero developer middleman.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#2F6F6A] text-xs font-semibold text-[#D4EDDA] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2E7D5B]" />
              <span>Full Client Ownership</span>
            </div>
          </div>

          {/* Card 3: Split Dispersal */}
          <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-6 shadow-sm flex flex-col justify-between md:col-span-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C65D3B]">Automated Split Payouts</span>
              <h4 className="text-lg font-display font-medium text-[#14403F] mb-3">Instant Automated Allocation</h4>
              
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-[#EFE8DA] rounded-[10px]">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-[#14403F]" />
                    <span className="font-semibold text-[#1D2624]">Restaurant Payout (88%)</span>
                  </div>
                  <span className="font-mono font-bold text-[#14403F]">$34.32</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#EFE8DA] rounded-[10px]">
                  <div className="flex items-center gap-2">
                    <Bike className="w-4 h-4 text-[#C65D3B]" />
                    <span className="font-semibold text-[#1D2624]">Driver Base + 100% Tips</span>
                  </div>
                  <span className="font-mono font-bold text-[#C65D3B]">$9.99</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#DCE8E4] rounded-[10px]">
                  <div className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#2E7D5B]" />
                    <span className="font-semibold text-[#14403F]">Platform Net Margin (Commission & Fee)</span>
                  </div>
                  <span className="font-mono font-bold text-[#2E7D5B]">$7.02</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#76817D] mt-3 italic">
              Configured per location in Admin. Recalculates dynamically without code changes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
