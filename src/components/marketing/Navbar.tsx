import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight, User, Store, Bike, Shield } from 'lucide-react';
import { Button } from '../ui/Button';
import { useDemoStore } from '../../store/useDemoStore';
import type { UserRole } from '../../data/types';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const { setRole } = useDemoStore();
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole, path: string) => {
    setRole(role);
    setRoleDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-[40] bg-[#FFFDF8]/90 backdrop-blur-md border-b border-[#E1D9C8] transition-all duration-200 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo with Prototype Tag */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-[8px] bg-[#14403F] flex items-center justify-center text-[#F7F2E8] shadow-sm">
              <span className="font-display font-bold text-lg">C</span>
            </div>
            <span className="font-display font-medium text-xl sm:text-2xl text-[#14403F] tracking-tight group-hover:text-[#0F3332]">
              Crucian Eats
            </span>
          </Link>

          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EFE8DA] text-[#76817D] px-2 py-0.5 rounded border border-[#CFC5B0]/40">
            Prototype
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-[#4A5753]">
          <Link to="/app" className="hover:text-[#14403F] transition-colors">
            Customer App
          </Link>
          <Link to="/restaurant" className="hover:text-[#14403F] transition-colors">
            Restaurant Hub
          </Link>
          <Link to="/driver" className="hover:text-[#14403F] transition-colors">
            Driver App
          </Link>
          <Link to="/admin" className="hover:text-[#14403F] transition-colors">
            Admin Console
          </Link>
          <Link to="/ownership" className="hover:text-[#14403F] transition-colors">
            Ownership Matrix
          </Link>
          <Link to="/roadmap" className="hover:text-[#14403F] transition-colors">
            Milestones
          </Link>
          <Link to="/scope" className="hover:text-[#14403F] transition-colors">
            V1 Scope
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Role Switcher Menu */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-[#EFE8DA] hover:bg-[#E1D9C8] text-xs font-semibold text-[#14403F] border border-[#CFC5B0]"
            >
              <span>Explore Roles</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#FFFDF8] border border-[#CFC5B0] rounded-[14px] p-1.5 shadow-[0_12px_32px_rgba(29,38,36,0.12)] space-y-0.5 animate-fadeIn z-50">
                <button
                  onClick={() => handleRoleSelect('customer', '/app')}
                  className="w-full text-left px-3 py-2 rounded-[8px] text-xs font-medium text-[#1D2624] hover:bg-[#EFE8DA] flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-[#2F6F6A]" />
                  <span>Customer Ordering</span>
                </button>
                <button
                  onClick={() => handleRoleSelect('restaurant', '/restaurant')}
                  className="w-full text-left px-3 py-2 rounded-[8px] text-xs font-medium text-[#1D2624] hover:bg-[#EFE8DA] flex items-center gap-2"
                >
                  <Store className="w-3.5 h-3.5 text-[#C65D3B]" />
                  <span>Restaurant Kitchen</span>
                </button>
                <button
                  onClick={() => handleRoleSelect('driver', '/driver')}
                  className="w-full text-left px-3 py-2 rounded-[8px] text-xs font-medium text-[#1D2624] hover:bg-[#EFE8DA] flex items-center gap-2"
                >
                  <Bike className="w-3.5 h-3.5 text-[#2E7D5B]" />
                  <span>Courier Mobile</span>
                </button>
                <button
                  onClick={() => handleRoleSelect('admin', '/admin')}
                  className="w-full text-left px-3 py-2 rounded-[8px] text-xs font-medium text-[#1D2624] hover:bg-[#EFE8DA] flex items-center gap-2"
                >
                  <Shield className="w-3.5 h-3.5 text-[#14403F]" />
                  <span>Admin Console</span>
                </button>
              </div>
            )}
          </div>

          <a href="#contact">
            <Button size="sm" className="bg-[#14403F] text-[#F7F2E8]">
              <span>Start Conversation</span>
            </Button>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#14403F] hover:bg-[#EFE8DA] rounded-lg"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF8] border-b border-[#E1D9C8] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#E1D9C8]">
            <button
              onClick={() => handleRoleSelect('customer', '/app')}
              className="p-2.5 rounded-[10px] bg-[#EFE8DA] text-left text-xs font-bold text-[#14403F] flex items-center gap-2"
            >
              <User className="w-4 h-4 text-[#2F6F6A]" />
              <span>Customer</span>
            </button>
            <button
              onClick={() => handleRoleSelect('restaurant', '/restaurant')}
              className="p-2.5 rounded-[10px] bg-[#EFE8DA] text-left text-xs font-bold text-[#14403F] flex items-center gap-2"
            >
              <Store className="w-4 h-4 text-[#C65D3B]" />
              <span>Restaurant</span>
            </button>
            <button
              onClick={() => handleRoleSelect('driver', '/driver')}
              className="p-2.5 rounded-[10px] bg-[#EFE8DA] text-left text-xs font-bold text-[#14403F] flex items-center gap-2"
            >
              <Bike className="w-4 h-4 text-[#2E7D5B]" />
              <span>Driver</span>
            </button>
            <button
              onClick={() => handleRoleSelect('admin', '/admin')}
              className="p-2.5 rounded-[10px] bg-[#EFE8DA] text-left text-xs font-bold text-[#14403F] flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-[#14403F]" />
              <span>Admin</span>
            </button>
          </div>

          <div className="space-y-2 text-sm font-medium text-[#1D2624]">
            <Link
              to="/ownership"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-[#14403F]"
            >
              Your Assets, Your Control (Ownership Matrix)
            </Link>
            <Link
              to="/roadmap"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-[#14403F]"
            >
              Project Roadmap & Milestones
            </Link>
            <Link
              to="/scope"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-[#14403F]"
            >
              V1 Scope vs Later Advisor
            </Link>
          </div>

          <div className="pt-2">
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
              <Button size="md" className="w-full bg-[#14403F] text-[#F7F2E8]">
                <span>Start Conversation</span>
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
