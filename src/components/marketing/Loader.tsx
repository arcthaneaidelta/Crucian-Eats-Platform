import React, { useState, useEffect } from 'react';

export interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if session has already viewed loader
    try {
      if (sessionStorage.getItem('ce-loader-viewed') === 'true') {
        onComplete();
        return;
      }
    } catch {
      // ignore
    }

    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 2000);

    const startTime = Date.now();
    const duration = 1200; // 1.2s target (§7)

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        handleExit();
      }
    }, 30);

    return () => {
      clearInterval(interval);
      clearTimeout(skipTimer);
    };
  }, []);

  const handleExit = () => {
    try {
      sessionStorage.setItem('ce-loader-viewed', 'true');
    } catch {
      // ignore
    }
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 550);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F7F2E8] transition-all duration-550 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? '-translate-y-full opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-sm px-6 text-center select-none">
        {/* Animated St. Croix Outline Trace */}
        <div className="w-16 h-10 mb-4 text-[#C65D3B]">
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <path
              d="M 10,35 C 15,25 25,20 40,18 C 55,16 65,14 78,18 C 88,20 95,25 90,30 C 80,35 65,40 50,42 C 35,44 25,48 18,46 C 12,45 8,40 10,35 Z"
              fill="none"
              stroke="#C65D3B"
              strokeWidth="2"
              strokeDasharray="240"
              strokeDashoffset={240 - (progress / 100) * 240}
              strokeLinecap="round"
              className="transition-all duration-150 ease-out"
            />
          </svg>
        </div>

        {/* Wordmark */}
        <h1 className="text-3xl sm:text-4xl font-display font-medium text-[#14403F] tracking-tight mb-1 animate-fadeIn">
          Crucian Eats
        </h1>

        {/* Caption */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#76817D] mb-6">
          ST. CROIX, U.S. VIRGIN ISLANDS
        </p>

        {/* 1px Progress Line (§7) */}
        <div className="w-48 h-[1.5px] bg-[#E1D9C8] relative overflow-hidden rounded-full mb-4">
          <div
            className="absolute left-0 top-0 bottom-0 bg-[#14403F] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Skip button appears if loading extends past 2s */}
        {showSkip && (
          <button
            onClick={handleExit}
            className="text-xs text-[#76817D] hover:text-[#14403F] underline underline-offset-2 transition-colors mt-2"
          >
            Skip intro
          </button>
        )}
      </div>
    </div>
  );
};
