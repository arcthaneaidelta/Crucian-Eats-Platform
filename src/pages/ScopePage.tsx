import React, { useState } from 'react';
import { ArrowLeft, ArrowRightLeft, Check, Sparkles, Sliders, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

interface ScopeItem {
  id: string;
  name: string;
  category: string;
  weight: number; // 1 to 3
}

const INITIAL_V1_ITEMS: ScopeItem[] = [
  { id: '1', name: 'Customer restaurant browse & live search', category: 'Customer', weight: 1 },
  { id: '2', name: 'Menu item customizations & side options', category: 'Customer', weight: 2 },
  { id: '3', name: 'Gate code & landmark instructions field', category: 'Customer', weight: 1 },
  { id: '4', name: 'Direct credit/debit card processing (client account)', category: 'Payments', weight: 2 },
  { id: '5', name: 'Tip percentage selectors (10/15/20%)', category: 'Payments', weight: 1 },
  { id: '6', name: 'Order confirmation & live status progression', category: 'Customer', weight: 2 },
  { id: '7', name: 'Post-delivery rating & tag submission', category: 'Customer', weight: 1 },
  { id: '8', name: 'Restaurant Kanban order board (New/Prep/Ready)', category: 'Restaurant', weight: 2 },
  { id: '9', name: 'Restaurant prep-time picker (10/15/20/30m)', category: 'Restaurant', weight: 1 },
  { id: '10', name: 'Restaurant item manager & sold-out toggles', category: 'Restaurant', weight: 2 },
  { id: '11', name: 'Driver online/offline toggle & requests', category: 'Driver', weight: 2 },
  { id: '12', name: 'Driver delivery photo proof & gate notes', category: 'Driver', weight: 1 },
  { id: '13', name: 'Admin KPI overview & live orders table', category: 'Admin', weight: 2 },
  { id: '14', name: 'Admin order refund & adjustment tools', category: 'Admin', weight: 2 },
  { id: '15', name: 'Multi-location database architecture (STX/STT/STJ)', category: 'Architecture', weight: 3 },
];

const INITIAL_LATER_ITEMS: ScopeItem[] = [
  { id: '16', name: 'Native Apple Pay & Google Pay direct buttons', category: 'Payments', weight: 2 },
  { id: '17', name: 'Multi-card saved wallet storage', category: 'Payments', weight: 2 },
  { id: '18', name: 'Scheduled orders for later calendar times', category: 'Customer', weight: 3 },
  { id: '19', name: 'Discount vouchers & promotional codes engine', category: 'Marketing', weight: 2 },
  { id: '20', name: 'Live continuous driver GPS interpolation (1Hz)', category: 'Driver', weight: 3 },
  { id: '21', name: 'Multi-restaurant batched order checkout', category: 'Customer', weight: 4 },
  { id: '22', name: 'Advanced cohort retention & driver heatmap reports', category: 'Admin', weight: 3 },
];

export const ScopePage: React.FC = () => {
  const [v1Items, setV1Items] = useState<ScopeItem[]>(INITIAL_V1_ITEMS);
  const [laterItems, setLaterItems] = useState<ScopeItem[]>(INITIAL_LATER_ITEMS);

  const moveToLater = (item: ScopeItem) => {
    setV1Items((prev) => prev.filter((i) => i.id !== item.id));
    setLaterItems((prev) => [...prev, item]);
  };

  const moveToV1 = (item: ScopeItem) => {
    setLaterItems((prev) => prev.filter((i) => i.id !== item.id));
    setV1Items((prev) => [...prev, item]);
  };

  // Calculate relative effort (no dollar figures per §26.S5)
  const totalWeight = v1Items.reduce((acc, curr) => acc + curr.weight, 0);
  let effortLabel = 'Low / Fast Launch';
  let effortPercentage = 35;
  let barColor = 'bg-[#2E7D5B]';

  if (totalWeight > 32) {
    effortLabel = 'High / Extended Timeline';
    effortPercentage = 90;
    barColor = 'bg-[#B2402E]';
  } else if (totalWeight > 22) {
    effortLabel = 'Balanced Startup V1';
    effortPercentage = 60;
    barColor = 'bg-[#C65D3B]';
  }

  return (
    <div className="min-h-screen bg-[#F7F2E8] py-12 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14403F] hover:text-[#0F3332]">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to overview</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="pb-8 border-b border-[#E1D9C8] mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCE8E4] text-[#14403F] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sliders className="w-4 h-4 text-[#2F6F6A]" />
            <span>Budget & Launch Scope Advisor · §1.1 & §2</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-medium text-[#14403F] tracking-tight">
            A realistic V1: Launch fast, learn, expand.
          </h1>
          <p className="text-base text-[#4A5753] mt-2 max-w-2xl">
            Successful marketplaces launch with razor-sharp focus on the core transaction. Click any feature below to shift it between V1 and Later to balance your initial runway.
          </p>
        </div>

        {/* Relative Effort Meter (No dollar figures §26.S5) */}
        <div className="bg-[#FFFDF8] border border-[#CFC5B0] rounded-[20px] p-6 mb-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#76817D]">Scope Load Indicator</span>
              <h4 className="text-base font-semibold text-[#14403F]">Estimated Implementation Velocity: {effortLabel}</h4>
            </div>
            <span className="text-xs font-semibold text-[#4A5753] bg-[#EFE8DA] px-3 py-1 rounded-full">
              {v1Items.length} Features in V1 · {laterItems.length} Reserved for Post-Launch
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 bg-[#EFE8DA] rounded-full overflow-hidden">
            <div
              className={`h-full ${barColor} transition-all duration-300 ease-out`}
              style={{ width: `${effortPercentage}%` }}
            />
          </div>

          <p className="text-xs text-[#76817D] mt-2.5">
            Tip: Keeping Phase 1 lean guarantees getting the app into the hands of St. Croix restaurants and eaters weeks sooner.
          </p>
        </div>

        {/* Two-Column Drag / Toggle Board */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Column 1: In V1 */}
          <div className="bg-[#FFFDF8] border-2 border-[#14403F] rounded-[24px] p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#E1D9C8] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#2E7D5B]" />
                <h3 className="text-lg font-display font-medium text-[#14403F]">
                  In Scope for V1 Launch ({v1Items.length})
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase text-[#2E7D5B] bg-[#D4EDDA] px-2 py-0.5 rounded">
                Must-Have
              </span>
            </div>

            <p className="text-xs text-[#76817D] mb-4">
              Click any item to defer to Later:
            </p>

            <div className="space-y-2">
              {v1Items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => moveToLater(item)}
                  className="w-full text-left p-3 rounded-[12px] bg-[#EFE8DA]/60 hover:bg-[#E1D9C8] border border-[#CFC5B0]/50 transition-all flex items-center justify-between gap-3 group"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2F6F6A]">
                      {item.category}
                    </span>
                    <p className="text-xs font-semibold text-[#1D2624]">{item.name}</p>
                  </div>
                  <span className="text-[11px] text-[#76817D] group-hover:text-[#B2402E] font-medium shrink-0 flex items-center gap-1">
                    <span>Defer</span>
                    <ArrowRightLeft className="w-3 h-3" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Suggested Later (V2 / V3) */}
          <div className="bg-[#FAF5EC] border border-[#CFC5B0] rounded-[24px] p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#E1D9C8] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#C65D3B]" />
                <h3 className="text-lg font-display font-medium text-[#14403F]">
                  Suggested for V2 & Expansion ({laterItems.length})
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase text-[#C65D3B] bg-[#F6DDD2] px-2 py-0.5 rounded">
                Fast Follow
              </span>
            </div>

            <p className="text-xs text-[#76817D] mb-4">
              Click any item to promote into V1:
            </p>

            <div className="space-y-2">
              {laterItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => moveToV1(item)}
                  className="w-full text-left p-3 rounded-[12px] bg-[#FFFDF8] hover:bg-[#FAF5EC] border border-[#E1D9C8] transition-all flex items-center justify-between gap-3 group"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#76817D]">
                      {item.category}
                    </span>
                    <p className="text-xs font-semibold text-[#4A5753]">{item.name}</p>
                  </div>
                  <span className="text-[11px] text-[#76817D] group-hover:text-[#2E7D5B] font-medium shrink-0 flex items-center gap-1">
                    <span>Add to V1</span>
                    <ArrowRightLeft className="w-3 h-3" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
