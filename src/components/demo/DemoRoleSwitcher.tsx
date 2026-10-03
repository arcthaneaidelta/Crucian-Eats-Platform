import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDemoStore } from '../../store/useDemoStore';
import type { UserRole } from '../../data/types';
import { User, Store, Bike, Shield, Info } from 'lucide-react';

export const DemoRoleSwitcher: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, setRole } = useDemoStore();

  const roles: { id: UserRole; label: string; path: string; icon: React.ReactNode }[] = [
    { id: 'customer', label: 'Customer', path: '/app', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'restaurant', label: 'Restaurant', path: '/restaurant', icon: <Store className="w-3.5 h-3.5" /> },
    { id: 'driver', label: 'Driver', path: '/driver', icon: <Bike className="w-3.5 h-3.5" /> },
    { id: 'admin', label: 'Admin', path: '/admin', icon: <Shield className="w-3.5 h-3.5" /> },
  ];

  const handleRoleSelect = (newRole: UserRole, path: string) => {
    setRole(newRole);
    navigate(path);
  };

  // Determine current active role from route or store
  const getActiveRole = (): UserRole => {
    if (location.pathname.startsWith('/restaurant')) return 'restaurant';
    if (location.pathname.startsWith('/driver')) return 'driver';
    if (location.pathname.startsWith('/admin')) return 'admin';
    if (location.pathname.startsWith('/app')) return 'customer';
    return role;
  };

  const activeRole = getActiveRole();

  return (
    <div className="fixed bottom-4 left-4 z-[90] hidden md:flex items-center gap-1.5 bg-[#14403F] text-[#F7F2E8] p-1.5 rounded-[12px] shadow-[0_8px_30px_rgba(20,64,63,0.3)] border border-[#2F6F6A]/50 font-body">
      <div className="flex items-center gap-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-[#DCE8E4]/80 border-r border-[#2F6F6A]/50 pr-2.5">
        <span>Demo View</span>
        <div className="relative group cursor-help">
          <Info className="w-3 h-3 text-[#DCE8E4]/60" />
          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-48 p-2 bg-[#1D2624] text-[#F7F2E8] text-[10px] rounded-[6px] shadow-lg leading-tight pointer-events-none">
            Prototype control. Not part of the production product.
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {roles.map((r) => (
          <button
            key={r.id}
            onClick={() => handleRoleSelect(r.id, r.path)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] text-xs font-medium transition-all duration-150 select-none
              ${activeRole === r.id
                ? 'bg-[#C65D3B] text-white shadow-sm'
                : 'text-[#DCE8E4] hover:bg-[#0F3332] hover:text-white'
              }
            `}
          >
            {r.icon}
            <span>{r.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
