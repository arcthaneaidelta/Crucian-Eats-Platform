import React, { useState } from 'react';
import { User, MapPin, CreditCard, Bell, Shield, LogOut, Check, AlertCircle } from 'lucide-react';
import { useDemoStore } from '../../store/useDemoStore';
import { Button } from '../../components/ui/Button';
import { Toggle } from '../../components/ui/Toggle';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';

export const AccountPage: React.FC = () => {
  const { isLoggedIn, currentUser, login, logout } = useDemoStore();
  const { success, error, toast } = useToast();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authName, setAuthName] = useState('Marisol Henry');
  const [authEmail, setAuthEmail] = useState('marisol@example.com');
  const [authPass, setAuthPass] = useState('••••••••');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Notification toggles
  const [notifOrder, setNotifOrder] = useState(true);
  const [notifPromos, setNotifPromos] = useState(false);
  const [notifDriver, setNotifDriver] = useState(true);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    // Deterministic failed account trigger (§11.1)
    if (authEmail.includes('fail@')) {
      setTimeout(() => {
        setAuthLoading(false);
        setAuthError("We couldn't create that account. Try another email address.");
        error("Simulated auth failure for fail@ emails.", "Authentication Error");
      }, 700);
      return;
    }

    // 700ms simulated success (§11.1)
    setTimeout(() => {
      setAuthLoading(false);
      login(authName, authEmail);
      setIsAuthModalOpen(false);
      success(`Welcome, ${authName.split(' ')[0]}.`, "Signed In");
    }, 700);
  };

  return (
    <div className="p-4 sm:p-5 space-y-6 font-body text-xs text-[#1D2624]">
      <div className="pb-3 border-b border-[#E1D9C8]">
        <h1 className="text-xl font-display font-medium text-[#14403F]">
          Your Account
        </h1>
        <p className="text-xs text-[#76817D]">
          Manage island addresses, payments, and delivery preferences
        </p>
      </div>

      {/* User Profile Card */}
      <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-5 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-[#14403F] text-[#F7F2E8] flex items-center justify-center font-display font-bold text-lg">
            {currentUser?.name ? currentUser.name[0] : 'M'}
          </div>
          <div>
            <h3 className="font-semibold text-base text-[#14403F]">
              {currentUser?.name || 'Marisol Henry'}
            </h3>
            <p className="text-xs text-[#76817D]">
              {currentUser?.email || 'marisol@example.com'} · (340) 555-0142
            </p>
            <span className="text-[10px] text-[#2E7D5B] font-semibold bg-[#D4EDDA] px-2 py-0.2 rounded mt-1 inline-block">
              St. Croix Local Eater
            </span>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsAuthModalOpen(true)}
        >
          {isLoggedIn ? 'Switch Account' : 'Sign In'}
        </Button>
      </div>

      {/* Saved Addresses with Gate Codes (§11.1) */}
      <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C65D3B]" />
            <h3 className="font-semibold text-sm text-[#14403F]">Saved Addresses</h3>
          </div>
          <button
            onClick={() => toast({ message: "Address editor simulated in demo", title: "Addresses" })}
            className="text-xs text-[#C65D3B] font-semibold hover:underline"
          >
            + Add Location
          </button>
        </div>

        <div className="space-y-2">
          <div className="p-3 bg-[#EFE8DA] rounded-[12px] space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#14403F]">Home · Frederiksted</span>
              <span className="text-[10px] bg-[#14403F] text-white px-2 py-0.2 rounded">Default</span>
            </div>
            <p className="text-xs text-[#4A5753]">Estate Whim, Frederiksted, St. Croix</p>
            <p className="text-[11px] text-[#76817D] italic">Gate note: "Blue gate, 2nd house on left. Potcake dog friendly."</p>
          </div>

          <div className="p-3 bg-[#FAF5EC] rounded-[12px] space-y-0.5">
            <span className="font-bold text-[#14403F]">Marina Office · Christiansted</span>
            <p className="text-xs text-[#4A5753]">Company St, Christiansted, St. Croix</p>
            <p className="text-[11px] text-[#76817D] italic">Gate note: "Above dive shop. Ring bell for unit 2B."</p>
          </div>
        </div>
      </div>

      {/* Saved Payment Cards (§11.1) */}
      <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#2F6F6A]" />
            <h3 className="font-semibold text-sm text-[#14403F]">Payment Methods</h3>
          </div>
          <span className="text-[10px] text-[#2E7D5B] font-semibold flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Held in Client Account</span>
          </span>
        </div>

        <div className="p-3 bg-[#EFE8DA] rounded-[12px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-6 bg-[#14403F] rounded text-white flex items-center justify-center font-bold text-[10px]">
              VISA
            </div>
            <div>
              <p className="font-semibold text-[#14403F]">Visa ending in 4242</p>
              <p className="text-[10px] text-[#76817D]">Expires 12/28 · Primary</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-[#2E7D5B] bg-[#D4EDDA] px-2 py-0.5 rounded">Active</span>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#14403F]" />
          <h3 className="font-semibold text-sm text-[#14403F]">Notifications</h3>
        </div>

        <div className="space-y-3">
          <Toggle
            label="Live Order Progression Alerts"
            description="Push updates when kitchen accepts and driver is approaching"
            checked={notifOrder}
            onChange={setNotifOrder}
          />
          <Toggle
            label="Driver Proximity Alerts"
            description="SMS notifications when courier is 3 minutes from your gate"
            checked={notifDriver}
            onChange={setNotifDriver}
          />
          <Toggle
            label="Local Food Specials & New Menus"
            description="Weekly announcements from St. Croix restaurant partners"
            checked={notifPromos}
            onChange={setNotifPromos}
          />
        </div>
      </div>

      {/* Sign In / Sign Up Bottom Sheet Modal (§11.1) */}
      <Modal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        title="Sign In or Register"
        description="Demo auth simulation. Enter any email to continue as guest or test errors."
      >
        <form onSubmit={handleAuthSubmit} className="space-y-4 font-body text-xs">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A5753] mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={authName}
              onChange={(e) => setAuthName(e.target.value)}
              className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[8px] p-2.5 text-xs text-[#1D2624]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A5753] mb-1">
              Email or Phone
            </label>
            <input
              type="email"
              required
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              placeholder="e.g. marisol@example.com (or fail@test.com)"
              className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[8px] p-2.5 text-xs text-[#1D2624]"
            />
            <span className="text-[10px] text-[#76817D] mt-1 block">
              Tip: Use an email with <code>fail@</code> to trigger a simulated decline error state (§11.1).
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A5753] mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={authPass}
              onChange={(e) => setAuthPass(e.target.value)}
              className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[8px] p-2.5 text-xs text-[#1D2624]"
            />
          </div>

          {authError && (
            <div className="p-2.5 bg-[#F8D7DA] text-[#B2402E] rounded-[8px] flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <div className="pt-2 flex flex-col gap-2">
            <Button
              type="submit"
              size="md"
              isLoading={authLoading}
              className="w-full bg-[#14403F] text-white"
            >
              Sign In to Crucian Eats
            </Button>
            <button
              type="button"
              onClick={() => {
                login('Guest Island Visitor', 'guest@crucianeats.vi');
                setIsAuthModalOpen(false);
                success("Signed in as Guest Visitor.", "Guest Mode");
              }}
              className="text-xs text-[#76817D] hover:text-[#14403F] py-1"
            >
              Continue as guest
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
