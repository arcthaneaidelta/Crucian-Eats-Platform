import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Receipt, User, ShoppingBag, Smartphone, Monitor, ArrowLeft, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useDemoStore } from '../../store/useDemoStore';

interface CustomerShellProps {
  children: React.ReactNode;
  onOpenCart?: () => void;
}

export const CustomerShell: React.FC<CustomerShellProps> = ({ children, onOpenCart }) => {
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, restaurants } = useDemoStore();

  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = cart.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const navItems = [
    { label: 'Explore', path: '/app', icon: <Home className="w-5 h-5" /> },
    { label: 'Search', path: '/app?tab=search', icon: <Search className="w-5 h-5" /> },
    { label: 'Orders', path: '/app/orders', icon: <Receipt className="w-5 h-5" /> },
    { label: 'Account', path: '/app/account', icon: <User className="w-5 h-5" /> },
  ];

  const currentTab = location.pathname;

  return (
    <div className="min-h-screen bg-[#F7F2E8] font-body text-[#1D2624]">
      {/* Top Demo Bar on Desktop (§18) */}
      <div className="hidden lg:flex items-center justify-between px-6 py-2.5 bg-[#14403F] text-[#F7F2E8] text-xs border-b border-[#0F3332]">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 hover:text-[#D9A84E] transition-colors font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Pitch Landing</span>
          </Link>
          <span className="text-[#DCE8E4]/50">|</span>
          <span className="text-[#DCE8E4]">
            Customer Experience Stage (St. Croix Launch Market)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-[#2F6F6A] hover:bg-[#255854] text-white transition-colors select-none font-medium"
          >
            {isPhoneFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span>Switch to Full-Width Web View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>Switch to Mobile-First Phone Frame (App Store View)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-0 sm:px-4 py-0 lg:py-6">
        <div className="flex items-start justify-center gap-8">
          {/* Persistent Demo Guide Panel (Desktop Only, beside phone frame §18) */}
          {isPhoneFrame && (
            <div className="hidden xl:flex flex-col w-72 bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-5 shadow-sm space-y-4 text-xs shrink-0 self-start sticky top-6">
              <div className="flex items-center gap-2 pb-2 border-b border-[#E1D9C8]">
                <Sparkles className="w-4 h-4 text-[#C65D3B]" />
                <h4 className="font-semibold text-sm font-display text-[#14403F]">Customer Demo Guide</h4>
              </div>

              <div className="space-y-3 text-[#4A5753]">
                <p>
                  This phone frame demonstrates how island customers and resort guests interact with Crucian Eats on iOS and Android.
                </p>

                <div className="p-3 bg-[#EFE8DA] rounded-[10px] space-y-1.5 text-[11px]">
                  <p className="font-bold text-[#14403F]">Try this path:</p>
                  <ol className="list-decimal list-inside space-y-1 text-[#1D2624]">
                    <li>Open <strong>Kallaloo & Co.</strong></li>
                    <li>Add <em>Kallaloo & Fungi</em> with plantain</li>
                    <li>Open cart & proceed to checkout</li>
                    <li>Place order & watch live tracking</li>
                  </ol>
                </div>

                <div className="pt-2 border-t border-[#E1D9C8]">
                  <p className="text-[10px] text-[#76817D]">
                    Notice local touches: gate code / landmark delivery fields, St. Croix SVG route tracking, and instant role synchronization.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* App Stage: Phone Frame on Desktop or Full Responsive */}
          <div
            className={`w-full transition-all duration-200 ${
              isPhoneFrame
                ? 'max-w-[420px] min-h-[844px] bg-[#FFFDF8] sm:border sm:border-[#CFC5B0] sm:rounded-[36px] sm:shadow-[0_24px_60px_rgba(29,38,36,0.18)] sm:overflow-hidden relative flex flex-col'
                : 'max-w-5xl bg-[#FFFDF8] rounded-[20px] border border-[#E1D9C8] shadow-sm overflow-hidden min-h-[80vh] flex flex-col'
            }`}
          >
            {/* Phone Speaker Notch bar (only when phone frame is active) */}
            {isPhoneFrame && (
              <div className="hidden sm:flex items-center justify-between px-6 pt-3 pb-1 bg-[#FFFDF8] text-[11px] font-semibold text-[#1D2624] select-none z-20">
                <span>9:41</span>
                <div className="w-20 h-4 bg-[#1D2624] rounded-full mx-auto" />
                <span className="flex items-center gap-1">5G</span>
              </div>
            )}

            {/* Viewport Content */}
            <div className="flex-1 overflow-y-auto pb-24">
              {children}
            </div>

            {/* Floating Cart Pill (when cart has items §15) */}
            {totalItems > 0 && onOpenCart && (
              <div className="fixed sm:absolute bottom-20 left-4 right-4 z-30 animate-slideInUp">
                <button
                  onClick={onOpenCart}
                  className="w-full bg-[#14403F] text-[#F7F2E8] hover:bg-[#0F3332] active:bg-[#0B2827] py-3.5 px-5 rounded-[16px] shadow-[0_8px_24px_rgba(20,64,63,0.35)] flex items-center justify-between text-sm font-semibold transition-all duration-150"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#C65D3B] text-white text-xs flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                    <span>View Your Order</span>
                  </div>
                  <span className="font-mono text-base">${subtotal.toFixed(2)}</span>
                </button>
              </div>
            )}

            {/* Bottom Tab Bar (§15) */}
            <nav className="fixed sm:absolute bottom-0 left-0 right-0 z-20 bg-[#FFFDF8]/95 backdrop-blur-md border-t border-[#E1D9C8] px-4 py-2 flex items-center justify-around select-none">
              {navItems.map((item) => {
                const isActive = currentTab === item.path || (item.path === '/app' && currentTab === '/app');
                return (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
                      isActive ? 'text-[#14403F]' : 'text-[#76817D] hover:text-[#1D2624]'
                    }`}
                  >
                    {item.icon}
                    <span className="text-[10px] font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
