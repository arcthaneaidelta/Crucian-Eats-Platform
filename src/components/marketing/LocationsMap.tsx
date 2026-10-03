import React, { useState } from 'react';
import { MapPin, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LocationsMap: React.FC = () => {
  const [selectedIsland, setSelectedIsland] = useState<'stx' | 'stt' | 'stj'>('stx');

  const islandData = {
    stx: {
      name: 'St. Croix',
      status: 'Active Launch Island',
      badgeColor: 'bg-[#D4EDDA] text-[#2E7D5B]',
      zones: ['Christiansted', 'Frederiksted', 'Cane Bay', 'Salt River', 'Sunny Isles', 'Estate Whim', 'Kingshill'],
      activeRestaurants: 9,
      baseFee: '$3.99',
      description: 'The foundation market. Operating with 7 distinct delivery delivery zones, full courier routing across Centerline Road, and local cuisine specialists.',
    },
    stt: {
      name: 'St. Thomas',
      status: 'Pre-Configured Architecture',
      badgeColor: 'bg-[#FFF3CD] text-[#B7791F]',
      zones: ['Charlotte Amalie', 'Red Hook', 'Havensight'],
      activeRestaurants: 'Draft Ready',
      baseFee: '$4.49 (Custom)',
      description: 'Ready to launch without rebuilding. Clones fee rules and restaurant onboarding workflows with custom island zones and harbor-aware delivery radii.',
    },
    stj: {
      name: 'St. John',
      status: 'Pre-Configured Architecture',
      badgeColor: 'bg-[#FFF3CD] text-[#B7791F]',
      zones: ['Cruz Bay', 'Coral Bay'],
      activeRestaurants: 'Draft Ready',
      baseFee: '$4.99 (Custom)',
      description: 'Compact island setup with boutique villa delivery policies and ferry-adjacent pickup zones.',
    },
  };

  const active = islandData[selectedIsland];

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-body">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="label-style text-[#2F6F6A]">Expand Without Rebuilding · §8.2.4</span>
        <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#14403F] mt-2 mb-4">
          One platform. All three U.S. Virgin Islands.
        </h2>
        <p className="text-base text-[#4A5753]">
          Built with multi-tenant location schemas from Day 1. When you're ready to open St. Thomas or St. John, you simply activate zones in Admin rather than commissioning a new app.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Island Selector Buttons & Map Diagram */}
        <div className="lg:col-span-7 bg-[#FFFDF8] border border-[#E1D9C8] rounded-[24px] p-6 sm:p-8 shadow-sm">
          <div className="flex gap-2 pb-6 border-b border-[#E1D9C8]">
            <button
              onClick={() => setSelectedIsland('stx')}
              className={`flex-1 py-3 px-4 rounded-[12px] text-xs sm:text-sm font-semibold transition-all select-none border ${
                selectedIsland === 'stx'
                  ? 'bg-[#14403F] text-[#F7F2E8] border-[#14403F] shadow-sm'
                  : 'bg-[#EFE8DA] text-[#4A5753] hover:bg-[#E1D9C8] border-transparent'
              }`}
            >
              St. Croix (Active)
            </button>
            <button
              onClick={() => setSelectedIsland('stt')}
              className={`flex-1 py-3 px-4 rounded-[12px] text-xs sm:text-sm font-semibold transition-all select-none border ${
                selectedIsland === 'stt'
                  ? 'bg-[#14403F] text-[#F7F2E8] border-[#14403F] shadow-sm'
                  : 'bg-[#EFE8DA] text-[#4A5753] hover:bg-[#E1D9C8] border-dashed border-[#CFC5B0]'
              }`}
            >
              St. Thomas (Ready)
            </button>
            <button
              onClick={() => setSelectedIsland('stj')}
              className={`flex-1 py-3 px-4 rounded-[12px] text-xs sm:text-sm font-semibold transition-all select-none border ${
                selectedIsland === 'stj'
                  ? 'bg-[#14403F] text-[#F7F2E8] border-[#14403F] shadow-sm'
                  : 'bg-[#EFE8DA] text-[#4A5753] hover:bg-[#E1D9C8] border-dashed border-[#CFC5B0]'
              }`}
            >
              St. John (Ready)
            </button>
          </div>

          {/* Abstract Island Outlines SVG */}
          <div className="py-8 flex items-center justify-center">
            <svg viewBox="0 0 500 220" className="w-full h-44 drop-shadow-sm select-none">
              {/* St. Thomas & St. John in north */}
              <g opacity={selectedIsland === 'stt' ? 1 : 0.45} className="cursor-pointer transition-opacity" onClick={() => setSelectedIsland('stt')}>
                <path d="M 80,45 C 110,35 150,40 180,48 C 170,60 130,65 90,60 Z" fill="#FFFDF8" stroke={selectedIsland === 'stt' ? '#C65D3B' : '#76817D'} strokeWidth="1.5" strokeDasharray={selectedIsland === 'stt' ? 'none' : '4 3'} />
                <circle cx="130" cy="50" r="3" fill="#14403F" />
                <text x="130" y="75" fontSize="10" fontWeight="600" textAnchor="middle" fill="#14403F" fontFamily="Inter, sans-serif">St. Thomas (STT)</text>
              </g>

              <g opacity={selectedIsland === 'stj' ? 1 : 0.45} className="cursor-pointer transition-opacity" onClick={() => setSelectedIsland('stj')}>
                <path d="M 230,42 C 255,38 275,44 285,52 C 275,60 250,62 230,55 Z" fill="#FFFDF8" stroke={selectedIsland === 'stj' ? '#C65D3B' : '#76817D'} strokeWidth="1.5" strokeDasharray={selectedIsland === 'stj' ? 'none' : '4 3'} />
                <circle cx="255" cy="48" r="3" fill="#14403F" />
                <text x="255" y="75" fontSize="10" fontWeight="600" textAnchor="middle" fill="#14403F" fontFamily="Inter, sans-serif">St. John (STJ)</text>
              </g>

              {/* Water Channel line */}
              <line x1="40" y1="100" x2="460" y2="100" stroke="#E1D9C8" strokeWidth="1" strokeDasharray="6 6" />
              <text x="250" y="96" fontSize="9" fill="#76817D" textAnchor="middle" fontFamily="Inter, sans-serif">Caribbean Sea (Approx. 40 miles channel to St. Croix)</text>

              {/* St. Croix in south */}
              <g opacity={selectedIsland === 'stx' ? 1 : 0.6} className="cursor-pointer transition-opacity" onClick={() => setSelectedIsland('stx')}>
                <path d="M 120,165 C 160,135 240,130 350,145 C 380,150 370,165 310,180 C 230,195 160,195 120,165 Z" fill="#FFFDF8" stroke={selectedIsland === 'stx' ? '#14403F' : '#76817D'} strokeWidth={selectedIsland === 'stx' ? '2.5' : '1.5'} />
                <circle cx="160" cy="165" r="3.5" fill="#C65D3B" />
                <circle cx="320" cy="155" r="3.5" fill="#14403F" />
                <text x="240" y="170" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#14403F" fontFamily="Inter, sans-serif">St. Croix (STX)</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Right: Selected Island Specifications */}
        <div className="lg:col-span-5 bg-[#FAF5EC] border border-[#CFC5B0] rounded-[24px] p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-display font-medium text-[#14403F]">
              {active.name}
            </h3>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${active.badgeColor}`}>
              {active.status}
            </span>
          </div>

          <p className="text-xs text-[#4A5753] leading-relaxed">
            {active.description}
          </p>

          <div className="space-y-3 pt-2">
            <div className="bg-[#FFFDF8] p-3 rounded-[12px] border border-[#E1D9C8]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#76817D]">Configured Zones</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {active.zones.map((z) => (
                  <span key={z} className="text-xs px-2 py-0.5 rounded bg-[#EFE8DA] text-[#14403F] font-medium">
                    {z}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#FFFDF8] p-3 rounded-[12px] border border-[#E1D9C8]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#76817D]">Base Delivery Fee</span>
                <p className="text-sm font-bold text-[#14403F] mt-0.5">{active.baseFee}</p>
              </div>
              <div className="bg-[#FFFDF8] p-3 rounded-[12px] border border-[#E1D9C8]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#76817D]">Expansion Readiness</span>
                <p className="text-sm font-bold text-[#2E7D5B] mt-0.5">Pre-Seeded in DB</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link to="/admin">
              <button className="text-xs font-semibold text-[#14403F] hover:text-[#0F3332] flex items-center gap-1.5 underline underline-offset-4">
                <span>Test "Prepare St. Thomas" wizard in Admin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
