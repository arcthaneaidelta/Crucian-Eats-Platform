import React from 'react';
import type { OrderStatus } from '../../data/types';

export interface IslandMapProps {
  interactive?: boolean;
  orderStatus?: OrderStatus;
  progressPercent?: number; // 0 to 100 for tracking
  showOrderChip?: boolean;
  driverLocation?: { x: number; y: number };
  className?: string;
  height?: number | string;
}

// Towns on St. Croix coordinate layout (viewBox 0 0 600 360)
export const ISLAND_LOCATIONS = {
  christiansted: { x: 420, y: 170, name: 'Christiansted', zone: 'Christiansted' },
  frederiksted: { x: 95, y: 220, name: 'Frederiksted', zone: 'Frederiksted' },
  caneBay: { x: 260, y: 105, name: 'Cane Bay', zone: 'Cane Bay' },
  saltRiver: { x: 330, y: 130, name: 'Salt River', zone: 'Salt River' },
  sunnyIsles: { x: 320, y: 200, name: 'Sunny Isles', zone: 'Sunny Isles' },
  kingshill: { x: 250, y: 215, name: 'Kingshill', zone: 'Kingshill' },
  estateWhim: { x: 125, y: 250, name: 'Estate Whim', zone: 'Estate Whim' },
};

export const IslandMap: React.FC<IslandMapProps> = ({
  orderStatus,
  progressPercent,
  showOrderChip = true,
  className = '',
  height = 360,
}) => {
  // St. Croix outline path (elongated island, narrow east end, hook at west)
  const coastlinePath = `
    M 60,200
    C 70,160 110,130 180,120
    C 240,110 270,95 320,115
    C 370,130 450,145 540,165
    C 560,170 565,180 545,190
    C 470,210 400,230 330,240
    C 240,255 180,270 120,275
    C 85,275 60,250 60,200
    Z
  `;

  // Main Centerline Road & North/South branches connecting towns
  const mainRoadPath = "M 95,220 C 140,230 200,225 250,215 C 290,205 320,200 420,170";
  const northRoadPath = "M 250,215 C 255,160 258,130 260,105 C 290,115 315,120 330,130 C 370,145 420,170 420,170";
  const southRoadPath = "M 95,220 C 110,240 120,245 125,250 C 180,260 230,235 250,215";

  // Active delivery route: Christiansted -> Kingshill -> Estate Whim (Frederiksted)
  const deliveryRoute = "M 420,170 C 340,195 280,210 250,215 C 190,225 140,240 125,250";

  // Calculate driver marker position based on status or percentage
  let driverPos = { x: 420, y: 170 }; // default at restaurant in Christiansted

  if (progressPercent !== undefined) {
    // Interpolate along route
    const t = Math.max(0, Math.min(1, progressPercent / 100));
    // Simple parametric approx of deliveryRoute
    driverPos = {
      x: 420 - t * 295,
      y: 170 + t * 80 + Math.sin(t * Math.PI) * 15,
    };
  } else if (orderStatus) {
    switch (orderStatus) {
      case 'placed':
      case 'accepted':
      case 'preparing':
      case 'ready':
        driverPos = { x: 420, y: 170 }; // At restaurant
        break;
      case 'driver_assigned':
        driverPos = { x: 390, y: 178 };
        break;
      case 'picked_up':
        driverPos = { x: 340, y: 192 };
        break;
      case 'on_the_way':
        driverPos = { x: 230, y: 220 };
        break;
      case 'delivered':
        driverPos = { x: 125, y: 250 }; // At dropoff
        break;
      default:
        driverPos = { x: 420, y: 170 };
    }
  }

  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`}>
      <svg
        viewBox="0 0 600 340"
        className="w-full h-auto max-h-[460px] drop-shadow-sm"
        style={{ height }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Subtle water texture gradient */}
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EFE8DA" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#E1D9C8" stopOpacity="0.2" />
          </linearGradient>

          {/* Island land gradient */}
          <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FFFDF8" />
            <stop offset="100%" stopColor="#FAF5EC" />
          </linearGradient>

          {/* Pulse animation filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ocean Background */}
        <rect width="600" height="340" fill="url(#waterGrad)" rx="16" />

        {/* Shallow reef shelf contour */}
        <path
          d={coastlinePath}
          fill="none"
          stroke="#DCE8E4"
          strokeWidth="12"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* St. Croix Main Island Landmass */}
        <path
          d={coastlinePath}
          fill="url(#landGrad)"
          stroke="#CFC5B0"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Buck Island (off northeast shore of St. Croix) */}
        <ellipse cx="490" cy="115" rx="20" ry="7" fill="#FAF5EC" stroke="#CFC5B0" strokeWidth="1.2" transform="rotate(-15 490 115)" />
        <text x="490" y="102" fontSize="9" fill="#76817D" textAnchor="middle" fontStyle="italic" fontFamily="Inter, sans-serif">
          Buck Island Reef
        </text>

        {/* Secondary Road Network */}
        <path d={northRoadPath} fill="none" stroke="#E1D9C8" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d={southRoadPath} fill="none" stroke="#E1D9C8" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d={mainRoadPath} fill="none" stroke="#D1C7B2" strokeWidth="2" />

        {/* Active Route Highlight with Animated Flow */}
        <path
          id="activeDeliveryRoute"
          d={deliveryRoute}
          fill="none"
          stroke="#C65D3B"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          opacity="0.85"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="20;0"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>

        {/* Town Points & Labels */}
        {Object.entries(ISLAND_LOCATIONS).map(([key, loc]) => {
          const isRestaurant = ['christiansted', 'caneBay', 'frederiksted'].includes(key);
          const isDropoff = key === 'estateWhim';

          return (
            <g key={key} className="transition-transform duration-200">
              {/* Outer halo */}
              <circle
                cx={loc.x}
                cy={loc.y}
                r={isRestaurant ? 6 : isDropoff ? 5 : 3.5}
                fill={isRestaurant ? '#DCE8E4' : isDropoff ? '#F6DDD2' : '#EFE8DA'}
                stroke={isRestaurant ? '#14403F' : isDropoff ? '#C65D3B' : '#76817D'}
                strokeWidth="1.5"
              />
              {/* Core dot */}
              <circle
                cx={loc.x}
                cy={loc.y}
                r={isRestaurant ? 3 : isDropoff ? 2.5 : 2}
                fill={isRestaurant ? '#14403F' : isDropoff ? '#C65D3B' : '#4A5753'}
              />

              {/* Label */}
              <text
                x={loc.x}
                y={loc.y + (key === 'caneBay' ? -10 : key === 'estateWhim' ? 16 : 14)}
                fontSize="10"
                fontWeight={isRestaurant || isDropoff ? "600" : "400"}
                fill={isRestaurant ? '#14403F' : isDropoff ? '#C65D3B' : '#4A5753'}
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                className="select-none tracking-tight"
              >
                {loc.name}
              </text>
            </g>
          );
        })}

        {/* Driver Marker */}
        <g
          transform={`translate(${driverPos.x}, ${driverPos.y})`}
          className="transition-transform duration-700 ease-out"
        >
          {/* Animated ping ring */}
          <circle cx="0" cy="0" r="10" fill="#C65D3B" opacity="0.25">
            <animate attributeName="r" values="6;16;6" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" />
          </circle>

          {/* Driver Pin */}
          <circle cx="0" cy="0" r="5.5" fill="#C65D3B" stroke="#FFFDF8" strokeWidth="2" filter="url(#glow)" />
          <circle cx="0" cy="0" r="2" fill="#FFFDF8" />
        </g>

        {/* Floating Order Chip on the Hero (§8.1) */}
        {showOrderChip && (
          <g
            transform="translate(380, 115)"
            className="animate-fadeUp pointer-events-none"
          >
            <rect
              x="-65"
              y="-14"
              width="150"
              height="28"
              rx="8"
              fill="#14403F"
              stroke="#DCE8E4"
              strokeWidth="1"
              opacity="0.95"
            />
            <circle cx="-50" cy="0" r="3" fill="#D9A84E">
              <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <text
              x="-40"
              y="4"
              fill="#F7F2E8"
              fontSize="9.5"
              fontWeight="500"
              fontFamily="Inter, sans-serif"
            >
              Fish & fungi · $24.50 · Live
            </text>
          </g>
        )}

        {/* Compass Rose Accent */}
        <g transform="translate(540, 50)" opacity="0.6">
          <circle cx="0" cy="0" r="16" fill="none" stroke="#CFC5B0" strokeWidth="0.75" />
          <path d="M 0,-14 L 3,-3 L 14,0 L 3,3 L 0,14 L -3,3 L -14,0 L -3,-3 Z" fill="#14403F" />
          <text x="0" y="-18" fontSize="8" fontWeight="bold" fill="#14403F" textAnchor="middle" fontFamily="Inter, sans-serif">N</text>
        </g>

        {/* Illustrative Label (§29) */}
        <text
          x="18"
          y="324"
          fontSize="9"
          fill="#76817D"
          fontFamily="Inter, sans-serif"
          className="select-none"
        >
          ST. CROIX, USVI · SCHEMATIC OVERVIEW
        </text>
      </svg>
    </div>
  );
};
