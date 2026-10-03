import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Layers, Users, Store, Bike, Receipt, Sliders, BarChart3, MapPin, Search, Download, AlertCircle, CheckCircle2, ChevronRight, RefreshCw, X, ArrowRight, DollarSign } from 'lucide-react';
import { useDemoStore } from '../../store/useDemoStore';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Drawer } from '../../components/ui/Drawer';
import { useToast } from '../../components/ui/Toast';
import { adminKPIs, ordersByHour } from '../../data/seed';
import type { Order, Location } from '../../data/types';

export const AdminDashboard: React.FC = () => {
  const {
    orders,
    restaurants,
    drivers,
    transactions,
    fees,
    setFees,
    locations,
    prepareLocation,
    refundOrder,
  } = useDemoStore();

  const { success, info, toast } = useToast();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'vendors' | 'drivers' | 'ledger' | 'fees' | 'locations'>('overview');

  // Order detail & refund modal states
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [refundModalOrder, setRefundModalOrder] = useState<Order | null>(null);
  const [refundAmount, setRefundAmount] = useState<number>(0);
  const [refundReason, setRefundReason] = useState<string>('Customer accommodation');

  // Location wizard states (§11.4, §21.5)
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);

  // Command palette state (§12)
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  const [cmdSearch, setCmdSearch] = useState('');

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCmdKOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle refund execution (§11.4)
  const handleExecuteRefund = () => {
    if (!refundModalOrder) return;
    refundOrder(refundModalOrder.id, refundAmount, refundReason);
    success(`Refunded $${refundAmount.toFixed(2)} on order ${refundModalOrder.orderNumber}. Ledger updated.`, 'Refund Completed');
    setRefundModalOrder(null);
  };

  // Sample order calculator values (§11.4, §21.4)
  const sampleOrderSubtotal = 40.00;
  const sampleDeliveryFee = fees.baseFee;
  const sampleServiceFee = Math.round(sampleOrderSubtotal * (fees.serviceFeePercent / 100) * 100) / 100;
  const sampleCustomerTotal = sampleOrderSubtotal + sampleDeliveryFee + sampleServiceFee + 6.00; // $6 tip
  const sampleRestaurantPayout = sampleOrderSubtotal * ((100 - fees.defaultCommission) / 100);
  const sampleDriverPayout = fees.driverPayBase + 6.00;
  const samplePlatformNet = sampleOrderSubtotal * (fees.defaultCommission / 100) + sampleServiceFee;

  return (
    <div className="min-h-screen bg-[#F7F2E8] font-body text-xs text-[#1D2624]">
      {/* Top Header (§12) */}
      <header className="sticky top-0 z-30 bg-[#14403F] text-[#F7F2E8] px-4 sm:px-6 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[8px] bg-[#2F6F6A] flex items-center justify-center font-bold text-white">
              <Shield className="w-4 h-4 text-[#D9A84E]" />
            </div>
            <div>
              <span className="font-display font-medium text-base text-white block leading-tight">
                Crucian Eats Admin
              </span>
              <span className="text-[10px] text-[#DCE8E4]">
                Multi-Island Command Center
              </span>
            </div>
          </Link>
        </div>

        {/* Global Search / Command Palette Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCmdKOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#0F3332] text-[#DCE8E4] rounded-[10px] border border-[#2F6F6A] text-xs hover:text-white"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search orders, restaurants...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/30 text-[10px] font-mono">⌘K</kbd>
          </button>

          <Link to="/app" className="text-xs text-[#D9A84E] font-semibold hover:underline">
            Open Customer Store →
          </Link>
        </div>
      </header>

      {/* Admin Navigation Bar (§12) */}
      <div className="bg-[#FFFDF8] border-b border-[#E1D9C8] px-4 sm:px-6 flex gap-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Platform Overview', icon: <BarChart3 className="w-3.5 h-3.5" /> },
          { id: 'orders', label: `Orders (${orders.length})`, icon: <Receipt className="w-3.5 h-3.5" /> },
          { id: 'vendors', label: `Restaurants (${restaurants.length})`, icon: <Store className="w-3.5 h-3.5" /> },
          { id: 'drivers', label: `Couriers (${drivers.length})`, icon: <Bike className="w-3.5 h-3.5" /> },
          { id: 'ledger', label: 'Transaction Ledger', icon: <DollarSign className="w-3.5 h-3.5" /> },
          { id: 'fees', label: 'Fee & Commission Engine', icon: <Sliders className="w-3.5 h-3.5" /> },
          { id: 'locations', label: 'USVI Multi-Location', icon: <MapPin className="w-3.5 h-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1.5 py-3.5 px-3 font-semibold text-xs border-b-2 transition-all select-none whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-[#14403F] text-[#14403F] bg-[#FAF5EC]'
                : 'border-transparent text-[#76817D] hover:text-[#1D2624]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Needs Attention Strip (§12) */}
        <div className="bg-[#FFF3CD] border border-[#B7791F]/30 rounded-[14px] p-3.5 flex items-center justify-between text-xs text-[#B7791F]">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Operational Alert: <strong>Sunny Isles Grill</strong> is closed until 11:00 AM. 11 active drivers online in St. Croix.</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#B7791F]/15 px-2 py-0.5 rounded">All Systems Green</span>
        </div>

        {/* TAB 1: OVERVIEW & KPIS (§11.4, §12) */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4">
              <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[16px] p-4 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#76817D]">Orders Today</span>
                <p className="text-2xl font-display font-medium text-[#14403F] mt-1">{adminKPIs.ordersToday}</p>
                <span className="text-[10px] text-[#2E7D5B] font-semibold">▲ 8.2% vs yesterday</span>
              </div>
              <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[16px] p-4 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#76817D]">Gross Volume</span>
                <p className="text-2xl font-display font-medium text-[#14403F] mt-1">${adminKPIs.gmv.toLocaleString()}</p>
                <span className="text-[10px] text-[#2E7D5B] font-semibold">100% in your bank</span>
              </div>
              <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[16px] p-4 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#76817D]">Platform Fee Net</span>
                <p className="text-2xl font-display font-medium text-[#C65D3B] mt-1">${adminKPIs.platformRevenue}</p>
                <span className="text-[10px] text-[#76817D] font-semibold">{fees.defaultCommission}% Commission</span>
              </div>
              <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[16px] p-4 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#76817D]">Active Drivers</span>
                <p className="text-2xl font-display font-medium text-[#14403F] mt-1">{adminKPIs.activeDrivers}</p>
                <span className="text-[10px] text-[#2E7D5B] font-semibold">Across 7 STX Zones</span>
              </div>
              <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[16px] p-4 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#76817D]">Avg Delivery</span>
                <p className="text-2xl font-display font-medium text-[#14403F] mt-1">{adminKPIs.avgDeliveryTime}m</p>
                <span className="text-[10px] text-[#76817D]">Centerline corridor</span>
              </div>
              <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[16px] p-4 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#76817D]">Island Rating</span>
                <p className="text-2xl font-display font-medium text-[#14403F] mt-1">★ {adminKPIs.avgRating}</p>
                <span className="text-[10px] text-[#D9A84E] font-semibold">Top Satisfaction</span>
              </div>
            </div>

            {/* Orders by Hour Bar Graph (§11.4) */}
            <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-display font-medium text-[#14403F]">
                    Order Volume by Hour (St. Croix Peak Lunch & Dinner)
                  </h3>
                  <p className="text-xs text-[#76817D]">
                    Highest delivery velocity: 12:00 PM and 7:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-between h-40 pt-4 gap-1.5 border-b border-[#E1D9C8] pb-2">
                {ordersByHour.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <div
                      className="w-full bg-[#14403F] hover:bg-[#C65D3B] rounded-t-[4px] transition-all cursor-pointer"
                      style={{ height: `${(item.orders / 30) * 100}%` }}
                      title={`${item.hour}: ${item.orders} orders`}
                    />
                    <span className="text-[10px] text-[#76817D]">{item.hour}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Orders Table Preview */}
            <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-display font-medium text-[#14403F]">
                  Recent Live Orders Across St. Croix
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-semibold text-[#14403F] hover:underline"
                >
                  View all ({orders.length}) →
                </button>
              </div>

              <div className="divide-y divide-[#E1D9C8]">
                {orders.slice(0, 4).map((ord) => (
                  <div key={ord.id} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <span className="font-mono font-bold text-[#14403F]">{ord.orderNumber}</span>
                      <p className="text-xs text-[#4A5753]">{ord.restaurantName} → {ord.customerName}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-[#14403F]">${ord.total.toFixed(2)}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#D4EDDA] text-[#2E7D5B]">
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT & REFUNDS (§11.4) */}
        {activeTab === 'orders' && (
          <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-display font-medium text-[#14403F]">Orders Management</h3>
                <p className="text-xs text-[#76817D]">Audit timelines, inspect splits, or process client refunds</p>
              </div>
            </div>

            <div className="divide-y divide-[#E1D9C8]">
              {orders.map((ord) => (
                <div key={ord.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#14403F] text-sm">{ord.orderNumber}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#EFE8DA] text-[#14403F]">
                        {ord.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#4A5753] mt-1">
                      {ord.restaurantName} · Customer: {ord.customerName} ({ord.deliveryAddress})
                    </p>
                    <p className="text-[11px] text-[#76817D]">
                      Items: {ord.items.map((i) => `${i.quantity}× ${i.name}`).join(', ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="font-mono font-bold text-base text-[#14403F]">${ord.total.toFixed(2)}</span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setRefundModalOrder(ord);
                        setRefundAmount(ord.total);
                      }}
                      className="border-[#B2402E] text-[#B2402E] hover:bg-[#F8D7DA]"
                    >
                      Refund / Adjust
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: TRANSACTION LEDGER (§11.4) */}
        {activeTab === 'ledger' && (
          <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-display font-medium text-[#14403F]">Real-Time Financial Ledger</h3>
                <p className="text-xs text-[#76817D]">Sovereign fund distribution audit trail</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => toast({ message: "Export is simulated in the demo.", title: "CSV Export" })}
              >
                <Download className="w-3.5 h-3.5 mr-1" />
                <span>Export Ledger CSV</span>
              </Button>
            </div>

            <div className="divide-y divide-[#E1D9C8]">
              {transactions.map((tx) => (
                <div key={tx.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-mono font-bold text-xs text-[#14403F] uppercase tracking-wider block">
                      {tx.type.replace('_', ' ')}
                    </span>
                    <p className="text-xs text-[#4A5753]">{tx.description}</p>
                    <span className="text-[10px] text-[#76817D]">{new Date(tx.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="text-right">
                    <span className={`font-mono font-bold text-sm ${
                      tx.type === 'refund' ? 'text-[#B2402E]' : tx.type === 'commission' ? 'text-[#2E7D5B]' : 'text-[#14403F]'
                    }`}>
                      {tx.type === 'refund' ? '-' : '+'}${tx.amount.toFixed(2)}
                    </span>
                    <span className="block text-[10px] font-bold uppercase text-[#2E7D5B]">{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: FEES & COMMISSION SLIDER WITH LIVE SPLIT CALCULATOR (§11.4, §21.4) */}
        {activeTab === 'fees' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Fee Configuration Form */}
            <div className="lg:col-span-6 bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-6 shadow-sm space-y-5">
              <div>
                <h3 className="text-lg font-display font-medium text-[#14403F]">
                  St. Croix Fee & Commission Controls
                </h3>
                <p className="text-xs text-[#76817D]">
                  Adjust parameters below to see the split recalculate in real time on the right.
                </p>
              </div>

              {/* Commission Slider */}
              <div className="space-y-2 bg-[#EFE8DA]/50 p-4 rounded-[14px]">
                <div className="flex justify-between">
                  <label className="font-bold text-xs text-[#14403F]">Platform Commission Rate</label>
                  <span className="font-mono font-bold text-sm text-[#C65D3B]">{fees.defaultCommission}%</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="20"
                  step="1"
                  value={fees.defaultCommission}
                  onChange={(e) => setFees({ defaultCommission: parseInt(e.target.value) })}
                  className="w-full accent-[#C65D3B]"
                />
                <span className="text-[10px] text-[#76817D]">
                  Industry standard is 12–15%. Your fee on every gross restaurant meal.
                </span>
              </div>

              {/* Base Delivery Fee */}
              <div className="space-y-2 bg-[#EFE8DA]/50 p-4 rounded-[14px]">
                <div className="flex justify-between">
                  <label className="font-bold text-xs text-[#14403F]">Base Delivery Fee (Customer)</label>
                  <span className="font-mono font-bold text-sm text-[#14403F]">${fees.baseFee.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="2.50"
                  max="6.00"
                  step="0.25"
                  value={fees.baseFee}
                  onChange={(e) => setFees({ baseFee: parseFloat(e.target.value) })}
                  className="w-full accent-[#14403F]"
                />
              </div>

              {/* Driver Pay Base */}
              <div className="space-y-2 bg-[#EFE8DA]/50 p-4 rounded-[14px]">
                <div className="flex justify-between">
                  <label className="font-bold text-xs text-[#14403F]">Driver Guaranteed Base Pay</label>
                  <span className="font-mono font-bold text-sm text-[#2E7D5B]">${fees.driverPayBase.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="7.00"
                  max="14.00"
                  step="0.25"
                  value={fees.driverPayBase}
                  onChange={(e) => setFees({ driverPayBase: parseFloat(e.target.value) })}
                  className="w-full accent-[#2E7D5B]"
                />
                <span className="text-[10px] text-[#76817D]">
                  Driver keeps 100% of customer tips on top of this base.
                </span>
              </div>
            </div>

            {/* Right: Live Order Split Calculator (§21.4 Hero Wow Moment) */}
            <div className="lg:col-span-6 bg-[#FAF5EC] border-2 border-[#14403F] rounded-[24px] p-6 sm:p-8 shadow-md space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#CFC5B0]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C65D3B]">
                    Dynamic Simulation Engine
                  </span>
                  <h3 className="text-xl font-display font-medium text-[#14403F]">
                    Sample $40.00 Order Split
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#2E7D5B] bg-[#D4EDDA] px-2.5 py-1 rounded-full">
                  Live Tweening
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#FFFDF8] rounded-[12px] border border-[#E1D9C8] flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#14403F]">Customer Charges</p>
                    <p className="text-[#76817D]">$40 food + ${sampleDeliveryFee.toFixed(2)} delivery + $2.40 service + $6 tip</p>
                  </div>
                  <span className="text-base font-bold font-mono text-[#14403F]">
                    ${sampleCustomerTotal.toFixed(2)}
                  </span>
                </div>

                <div className="p-3 bg-[#FFFDF8] rounded-[12px] border border-[#E1D9C8] flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#14403F]">Restaurant Payout ({100 - fees.defaultCommission}%)</p>
                    <p className="text-[#76817D]">Direct deposit to vendor account</p>
                  </div>
                  <span className="text-base font-bold font-mono text-[#14403F]">
                    ${sampleRestaurantPayout.toFixed(2)}
                  </span>
                </div>

                <div className="p-3 bg-[#FFFDF8] rounded-[12px] border border-[#E1D9C8] flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#14403F]">Courier Payout (Base + 100% Tip)</p>
                    <p className="text-[#76817D]">${fees.driverPayBase.toFixed(2)} guaranteed + $6.00 tip</p>
                  </div>
                  <span className="text-base font-bold font-mono text-[#C65D3B]">
                    ${sampleDriverPayout.toFixed(2)}
                  </span>
                </div>

                <div className="p-4 bg-[#14403F] text-[#F7F2E8] rounded-[14px] flex justify-between items-center shadow-sm">
                  <div>
                    <p className="font-bold text-sm text-[#D9A84E]">Your Platform Net Revenue</p>
                    <p className="text-[11px] text-[#DCE8E4]">Commission (${(sampleOrderSubtotal * (fees.defaultCommission / 100)).toFixed(2)}) + Service Fee ($2.40)</p>
                  </div>
                  <span className="text-xl font-bold font-mono text-white">
                    ${samplePlatformNet.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: USVI MULTI-LOCATION & PREPARE ST. THOMAS WIZARD (§11.4, §21.5) */}
        {activeTab === 'locations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-display font-medium text-[#14403F]">
                  Multi-Location Island Architecture
                </h2>
                <p className="text-xs text-[#76817D]">
                  Zero rebuild needed to expand beyond St. Croix
                </p>
              </div>

              <Button
                size="md"
                onClick={() => {
                  setIsWizardOpen(true);
                  setWizardStep(1);
                }}
                className="bg-[#C65D3B] hover:bg-[#AE4D2E] text-white"
              >
                <span>Prepare St. Thomas Expansion</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Location Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  className={`bg-[#FFFDF8] border rounded-[20px] p-5 shadow-sm space-y-3 flex flex-col justify-between ${
                    loc.status === 'active' ? 'border-[#14403F]' : 'border-[#E1D9C8]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-base text-[#14403F]">
                        {loc.name}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        loc.status === 'active'
                          ? 'bg-[#D4EDDA] text-[#2E7D5B]'
                          : loc.status === 'draft'
                          ? 'bg-[#D1ECF1] text-[#2F6F8F]'
                          : 'bg-[#FFF3CD] text-[#B7791F]'
                      }`}>
                        {loc.status === 'active' ? 'Live Launch' : loc.status === 'draft' ? 'Draft Ready' : 'Coming Soon'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-[#76817D]">Zones:</span>
                      <p className="text-xs text-[#4A5753]">{loc.zones.join(', ')}</p>
                    </div>

                    <div className="pt-2 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[#76817D]">Base Fee:</span>
                        <span className="font-mono font-bold">${loc.baseFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#76817D]">Default Commission:</span>
                        <span className="font-mono font-bold">{loc.defaultCommission}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E1D9C8]">
                    {loc.status === 'active' ? (
                      <span className="text-xs font-semibold text-[#2E7D5B] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Operating in St. Croix</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setIsWizardOpen(true);
                          setWizardStep(1);
                        }}
                        className="text-xs font-semibold text-[#C65D3B] hover:underline"
                      >
                        Run Expansion Setup Wizard →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 4-Step "Prepare St. Thomas" Wizard Modal (§11.4, §21.5) */}
      <Modal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        title={`Prepare St. Thomas Expansion (Step ${wizardStep} of 4)`}
        description="Clone St. Croix logic without rebuilding code or database schemas"
      >
        <div className="space-y-4 font-body text-xs text-[#1D2624]">
          {wizardStep === 1 && (
            <div className="space-y-3 animate-fadeIn">
              <span className="font-bold text-xs text-[#14403F] block">Step 1: Island Name & Delivery Zones</span>
              <p className="text-[#4A5753]">
                St. Thomas includes high-density commercial and tourism clusters across Charlotte Amalie, Havensight Cruise Port, and the Red Hook ferry terminal.
              </p>
              <div className="p-3 bg-[#EFE8DA] rounded-[10px] space-y-2">
                <span className="text-[10px] font-bold uppercase text-[#76817D]">Pre-Configured Zones:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Charlotte Amalie', 'Red Hook Ferry', 'Havensight', 'Yacht Haven Grand', 'Smith Bay'].map((z) => (
                    <span key={z} className="px-2 py-0.5 rounded bg-white text-[#14403F] font-semibold text-xs">
                      {z}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {wizardStep === 2 && (
            <div className="space-y-3 animate-fadeIn">
              <span className="font-bold text-xs text-[#14403F] block">Step 2: Copy Fees & Commission Model</span>
              <p className="text-[#4A5753]">
                Fee structure copied automatically from your proven St. Croix parameters. You can modify island-specific surcharges for harbor-to-island transits.
              </p>
              <div className="p-3 bg-[#FAF5EC] rounded-[10px] space-y-1.5 border border-[#E1D9C8]">
                <div className="flex justify-between">
                  <span>Base Delivery Fee:</span>
                  <span className="font-bold text-[#14403F]">$4.49 (STT Harbor Rate)</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Commission:</span>
                  <span className="font-bold text-[#C65D3B]">12% (Standard)</span>
                </div>
                <div className="flex justify-between">
                  <span>Driver Base Pay:</span>
                  <span className="font-bold text-[#2E7D5B]">$9.75</span>
                </div>
              </div>
            </div>
          )}

          {wizardStep === 3 && (
            <div className="space-y-3 animate-fadeIn">
              <span className="font-bold text-xs text-[#14403F] block">Step 3: St. Thomas Restaurant Invitation Link</span>
              <p className="text-[#4A5753]">
                Generate an onboarding link for food vendors in Charlotte Amalie and Red Hook to claim their restaurant dashboard before launch.
              </p>
              <div className="p-3 bg-[#EFE8DA] rounded-[10px] font-mono text-[11px] text-[#14403F] select-all">
                https://crucianeats.vi/onboard?loc=stt_charlotte_amalie
              </div>
            </div>
          )}

          {wizardStep === 4 && (
            <div className="space-y-3 text-center py-2 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-[#D4EDDA] text-[#2E7D5B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-display font-bold text-[#14403F]">
                Draft Ready. Launch When You Are.
              </h4>
              <p className="text-xs text-[#4A5753] max-w-sm mx-auto leading-relaxed">
                St. Thomas configuration has been committed to your database. You can open customer ordering with one click in this panel when restaurant onboarding completes.
              </p>
            </div>
          )}

          {/* Wizard Footer Controls */}
          <div className="pt-3 border-t border-[#E1D9C8] flex justify-between">
            <Button
              variant="secondary"
              size="sm"
              disabled={wizardStep === 1}
              onClick={() => setWizardStep((p) => p - 1)}
            >
              Previous
            </Button>

            {wizardStep < 4 ? (
              <Button
                size="sm"
                onClick={() => setWizardStep((p) => p + 1)}
                className="bg-[#14403F] text-white"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => {
                  prepareLocation('stt');
                  setIsWizardOpen(false);
                  success("St. Thomas is now Draft Ready in multi-location architecture!", "Expansion Configured");
                }}
                className="bg-[#2E7D5B] text-white"
              >
                Done
              </Button>
            )}
          </div>
        </div>
      </Modal>

      {/* Refund Modal (§11.4) */}
      <Modal
        isOpen={!!refundModalOrder}
        onClose={() => setRefundModalOrder(null)}
        title={`Process Refund · ${refundModalOrder?.orderNumber}`}
        description="Funds will be returned to customer payment method and recorded in transaction ledger."
      >
        <div className="space-y-4 font-body text-xs text-[#1D2624]">
          <div>
            <label className="block text-[11px] font-semibold uppercase text-[#76817D] mb-1">
              Refund Amount (USD)
            </label>
            <input
              type="number"
              step="0.01"
              value={refundAmount}
              onChange={(e) => setRefundAmount(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[8px] p-2 text-sm font-mono font-bold text-[#14403F]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase text-[#76817D] mb-1">
              Reason for Adjustment
            </label>
            <input
              type="text"
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[8px] p-2 text-xs text-[#1D2624]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setRefundModalOrder(null)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleExecuteRefund} className="bg-[#B2402E] text-white">
              Confirm & Execute Refund
            </Button>
          </div>
        </div>
      </Modal>

      {/* Command Palette Modal (Ctrl+K §12) */}
      <Modal
        isOpen={isCmdKOpen}
        onClose={() => setIsCmdKOpen(false)}
        title="Admin Command Palette"
        description="Quick navigation across pages, orders, and restaurants"
      >
        <div className="space-y-3 text-xs font-body">
          <input
            type="text"
            autoFocus
            value={cmdSearch}
            onChange={(e) => setCmdSearch(e.target.value)}
            placeholder="Type 'fees', 'orders', 'st thomas', 'kallaloo'..."
            className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[10px] p-3 text-sm text-[#1D2624] focus:outline-none focus:border-[#2F6F6A]"
          />

          <div className="space-y-1 max-h-60 overflow-y-auto">
            {[
              { label: 'Platform Overview & KPIs', action: () => setActiveTab('overview') },
              { label: 'Fee & Commission Split Engine', action: () => setActiveTab('fees') },
              { label: 'USVI Multi-Location & St. Thomas Wizard', action: () => setActiveTab('locations') },
              { label: 'Transaction Audit Ledger', action: () => setActiveTab('ledger') },
              { label: 'Orders List & Refund Actions', action: () => setActiveTab('orders') },
              { label: 'Switch to Customer App', action: () => window.location.href = '/app' },
              { label: 'Switch to Restaurant Dashboard', action: () => window.location.href = '/restaurant' },
              { label: 'Switch to Driver App', action: () => window.location.href = '/driver' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  item.action();
                  setIsCmdKOpen(false);
                }}
                className="w-full text-left p-2.5 rounded-[8px] hover:bg-[#EFE8DA] flex items-center justify-between text-xs text-[#14403F] font-semibold"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#76817D]" />
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};
