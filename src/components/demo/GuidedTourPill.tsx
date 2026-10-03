import React, { useState } from 'react';
import { useDemoStore } from '../../store/useDemoStore';
import { useNavigate } from 'react-router-dom';
import { Sparkles, X, ChevronRight, Check } from 'lucide-react';

const TOUR_STEPS = [
  {
    step: 1,
    title: 'Living Island Map',
    text: 'Notice the SVG map of St. Croix with real island geography and courier movement.',
    path: '/',
  },
  {
    step: 2,
    title: 'Customer Order Flow',
    text: 'Browse local restaurants (Kallaloo & Co.), select items, customize sides, and checkout.',
    path: '/app',
  },
  {
    step: 3,
    title: 'Restaurant Kitchen Board',
    text: 'Kitchen receives the incoming ticket with prep-time accept modal & menu controls.',
    path: '/restaurant',
  },
  {
    step: 4,
    title: 'Courier Sunlit Dispatch',
    text: 'Driver toggles online with radar pulse, reviews payout offer, and slides to accept.',
    path: '/driver',
  },
  {
    step: 5,
    title: 'Admin & St. Thomas Expansion',
    text: 'Test the live fee commission calculator and 4-step St. Thomas preparation wizard.',
    path: '/admin',
  },
  {
    step: 6,
    title: 'Ownership & Milestone Approvals',
    text: 'Review the asset matrix (all accounts in your name) and milestone release controls.',
    path: '/ownership',
  },
];

export const GuidedTourPill: React.FC = () => {
  const { tourDismissed, dismissTour } = useDemoStore();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const navigate = useNavigate();

  if (tourDismissed) return null;

  const currentTourItem = activeStep !== null ? TOUR_STEPS[activeStep] : null;

  return (
    <div className="fixed top-20 right-4 z-[50] font-body">
      {activeStep === null ? (
        <div className="bg-[#FFFDF8] border border-[#CFC5B0] rounded-full px-3.5 py-1.5 shadow-[0_4px_14px_rgba(29,38,36,0.08)] flex items-center gap-2 transition-all hover:bg-[#FAF5EC] text-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C65D3B]" />
          <button
            onClick={() => {
              setActiveStep(0);
              navigate(TOUR_STEPS[0].path);
            }}
            className="font-medium text-[#14403F] hover:text-[#0F3332]"
          >
            Take the 90-second tour
          </button>
          <button
            onClick={dismissTour}
            aria-label="Dismiss tour"
            className="text-[#76817D] hover:text-[#1D2624] ml-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div className="w-[300px] bg-[#FFFDF8] border border-[#CFC5B0] rounded-[16px] p-4 shadow-[0_12px_32px_rgba(29,38,36,0.14)] animate-fadeIn">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E1D9C8]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C65D3B]">
              Tour Step {currentTourItem?.step} of {TOUR_STEPS.length}
            </span>
            <button
              onClick={() => {
                setActiveStep(null);
                dismissTour();
              }}
              className="text-[#76817D] hover:text-[#1D2624]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <h4 className="text-sm font-semibold font-display text-[#14403F] mb-1">
            {currentTourItem?.title}
          </h4>
          <p className="text-xs text-[#4A5753] leading-relaxed mb-3">
            {currentTourItem?.text}
          </p>
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => {
                if (activeStep > 0) {
                  const prev = activeStep - 1;
                  setActiveStep(prev);
                  navigate(TOUR_STEPS[prev].path);
                }
              }}
              disabled={activeStep === 0}
              className="text-xs text-[#76817D] hover:text-[#1D2624] disabled:opacity-30"
            >
              Back
            </button>
            <button
              onClick={() => {
                if (activeStep < TOUR_STEPS.length - 1) {
                  const next = activeStep + 1;
                  setActiveStep(next);
                  navigate(TOUR_STEPS[next].path);
                } else {
                  setActiveStep(null);
                  dismissTour();
                }
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold bg-[#14403F] text-[#F7F2E8] px-3 py-1.5 rounded-[8px] hover:bg-[#0F3332]"
            >
              <span>{activeStep === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next'}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
