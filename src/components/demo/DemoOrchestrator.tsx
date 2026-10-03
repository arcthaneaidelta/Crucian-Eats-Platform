import React, { useState, useEffect, useRef } from 'react';
import { useDemoStore } from '../../store/useDemoStore';
import { Play, Pause, SkipForward, RotateCcw, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';
import { useToast } from '../ui/Toast';

const ORCHESTRATOR_STEPS = [
  { t: 0, title: 'Customer places order CE-24817', role: 'Customer & Restaurant', description: 'Customer submits order; restaurant receives instant new-order ping.' },
  { t: 4, title: 'Restaurant accepts (15 min prep)', role: 'Restaurant', description: 'Kallaloo & Co. reviews items and confirms 15-minute prep time.' },
  { t: 8, title: 'Kitchen preparing order', role: 'Restaurant', description: 'Order moves into kitchen pipeline column.' },
  { t: 14, title: 'Order ready & driver dispatch sent', role: 'Driver dispatch', description: 'Food packaged; nearby driver Jerome receives delivery offer.' },
  { t: 18, title: 'Driver accepts delivery', role: 'Driver', description: 'Driver slides to accept; customer tracker shows assigned driver.' },
  { t: 22, title: 'Driver picks up from Kallaloo & Co.', role: 'Driver', description: 'Courier confirms pickup and starts route to Estate Whim.' },
  { t: 28, title: 'In transit across St. Croix', role: 'Live GPS', description: 'Courier travels along Centerline Road; live map coordinates update.' },
  { t: 33, title: 'Delivered with photo proof', role: 'Customer & Admin', description: 'Delivery completed with confirmation photo. Customer rating sheet unlocks.' },
];

export const DemoOrchestrator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    advanceOrder,
    setDeliveryPhoto,
    resetDemo,
    orders,
    setDriverOnline,
  } = useDemoStore();

  const { info, success } = useToast();

  const primaryOrderId = 'ord-1';

  // Step runner logic
  const executeStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    const step = ORCHESTRATOR_STEPS[stepIndex];

    switch (stepIndex) {
      case 0:
        info('Step 1/8: Customer placed order CE-24817 at Kallaloo & Co.', 'Order Placed');
        break;
      case 1:
        advanceOrder(primaryOrderId, 15);
        info('Step 2/8: Restaurant accepted order (15 min prep).', 'Accepted');
        break;
      case 2:
        advanceOrder(primaryOrderId);
        info('Step 3/8: Kitchen is preparing Kallaloo & Johnnycakes.', 'Preparing');
        break;
      case 3:
        advanceOrder(primaryOrderId);
        setDriverOnline('d1', true);
        info('Step 4/8: Order marked ready. Driver request dispatched.', 'Ready for Pickup');
        break;
      case 4:
        advanceOrder(primaryOrderId);
        info('Step 5/8: Driver Jerome Maynard accepted the delivery.', 'Driver Assigned');
        break;
      case 5:
        advanceOrder(primaryOrderId);
        info('Step 6/8: Driver picked up order from Christiansted.', 'Picked Up');
        break;
      case 6:
        advanceOrder(primaryOrderId);
        info('Step 7/8: Courier is on the way to Estate Whim.', 'On The Way');
        break;
      case 7:
        advanceOrder(primaryOrderId);
        setDeliveryPhoto(primaryOrderId, '/images/delivery-proof.jpg', 'Left safely at front porch table by blue gate.');
        success('Step 8/8: Order delivered! Customer rating sheet prompted.', 'Delivered');
        setIsPlaying(false);
        break;
      default:
        break;
    }
  };

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (currentStep < ORCHESTRATOR_STEPS.length - 1) {
      const nextStepIndex = currentStep + 1;
      const stepIntervals = [3500, 4000, 4500, 4500, 4000, 4500, 5500, 4000];
      const waitTime = stepIntervals[currentStep] || 4000;

      timerRef.current = setTimeout(() => {
        executeStep(nextStepIndex);
      }, waitTime);
    } else {
      setIsPlaying(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStep]);

  const handleStart = () => {
    setIsOpen(true);
    if (currentStep === -1 || currentStep >= ORCHESTRATOR_STEPS.length - 1) {
      resetDemo();
      executeStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(true);
    }
  };

  const handleNextStep = () => {
    if (currentStep < ORCHESTRATOR_STEPS.length - 1) {
      executeStep(currentStep + 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(-1);
    resetDemo();
    info('Demo state reset to initial seed values.', 'Demo Reset');
  };

  return (
    <div className="fixed bottom-4 right-4 z-[90] font-body">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#14403F] text-[#F7F2E8] hover:bg-[#0F3332] px-3.5 py-2.5 rounded-[12px] shadow-[0_8px_30px_rgba(20,64,63,0.35)] border border-[#2F6F6A]/50 transition-all duration-200 group active:scale-95"
        >
          <Layers className="w-4 h-4 text-[#C65D3B] group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-semibold">Demo Orchestrator</span>
          <span className="w-2 h-2 rounded-full bg-[#2E7D5B] animate-pulse"></span>
        </button>
      ) : (
        <div className="w-[340px] sm:w-[380px] bg-[#FFFDF8] border border-[#CFC5B0] rounded-[16px] shadow-[0_16px_40px_rgba(29,38,36,0.18)] overflow-hidden transition-all duration-200 animate-slideInUp">
          {/* Header */}
          <div className="bg-[#14403F] text-[#F7F2E8] p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C65D3B]" />
              <div>
                <h4 className="text-xs font-semibold tracking-wide">Demo Orchestrator</h4>
                <p className="text-[10px] text-[#DCE8E4]/80">Synchronized 4-Role State Simulation</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#DCE8E4] hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3.5">
            {/* Current Step Banner */}
            <div className="bg-[#EFE8DA] border border-[#CFC5B0]/50 rounded-[10px] p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C65D3B]">
                  {currentStep >= 0 ? `Step ${currentStep + 1} of ${ORCHESTRATOR_STEPS.length}` : 'Ready to Run'}
                </span>
                {currentStep >= 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#14403F] text-[#F7F2E8] font-medium">
                    {ORCHESTRATOR_STEPS[currentStep].role}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-[#14403F]">
                {currentStep >= 0 ? ORCHESTRATOR_STEPS[currentStep].title : 'Click "Run live order" to watch customer, restaurant, driver, and admin views sync live.'}
              </p>
              {currentStep >= 0 && (
                <p className="text-[11px] text-[#4A5753] mt-1 leading-relaxed">
                  {ORCHESTRATOR_STEPS[currentStep].description}
                </p>
              )}
            </div>

            {/* Step Progress Bar */}
            <div className="grid grid-cols-8 gap-1 py-1">
              {ORCHESTRATOR_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-colors duration-300 ${
                    i <= currentStep ? 'bg-[#C65D3B]' : 'bg-[#E1D9C8]'
                  }`}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 pt-1">
              {!isPlaying ? (
                <button
                  onClick={handleStart}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#C65D3B] text-white hover:bg-[#AE4D2E] active:bg-[#964024] text-xs font-semibold py-2 px-3 rounded-[10px] transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{currentStep >= 0 && currentStep < ORCHESTRATOR_STEPS.length - 1 ? 'Resume Flow' : 'Run Live Order'}</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsPlaying(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#14403F] text-[#F7F2E8] hover:bg-[#0F3332] text-xs font-semibold py-2 px-3 rounded-[10px] transition-all"
                >
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause</span>
                </button>
              )}

              <button
                onClick={handleNextStep}
                disabled={currentStep >= ORCHESTRATOR_STEPS.length - 1}
                title="Advance to next step"
                className="flex items-center justify-center p-2 rounded-[10px] border border-[#CFC5B0] bg-[#FFFDF8] hover:bg-[#EFE8DA] text-[#1D2624] disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={handleReset}
                title="Reset demo data"
                className="flex items-center justify-center p-2 rounded-[10px] border border-[#CFC5B0] bg-[#FFFDF8] hover:bg-[#EFE8DA] text-[#B2402E] transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Disclaimer footer (§24) */}
            <p className="text-[10px] text-[#76817D] text-center border-t border-[#E1D9C8] pt-2">
              Frontend prototype. Real-time state machine runs on Zustand store.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
