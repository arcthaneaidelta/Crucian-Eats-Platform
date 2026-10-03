import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store, Utensils, Clock, DollarSign, Settings, Bell, Check, X, AlertCircle, Plus, Edit2, ArrowRight, ShieldCheck, Download, Power } from 'lucide-react';
import { useDemoStore } from '../../store/useDemoStore';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Drawer } from '../../components/ui/Drawer';
import { Toggle } from '../../components/ui/Toggle';
import { useToast } from '../../components/ui/Toast';
import type { Order, MenuItem } from '../../data/types';

export const RestaurantDashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
    restaurants,
    orders,
    advanceOrder,
    rejectOrder,
    menuItems,
    updateMenuItem,
    toggleSoldOut,
    toggleAcceptingOrders,
    notifications,
    markAllRead,
  } = useDemoStore();

  const { success, info, toast } = useToast();

  const restaurant = restaurants[0]; // Kallaloo & Co.
  const restaurantOrders = orders.filter((o) => o.restaurantId === restaurant.id);
  const restaurantItems = menuItems.filter((m) => m.restaurantId === restaurant.id);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'history' | 'payouts' | 'profile'>('orders');

  // Order management states
  const [acceptModalOrder, setAcceptModalOrder] = useState<Order | null>(null);
  const [prepTimeChoice, setPrepTimeChoice] = useState<number>(15);
  const [rejectModalOrder, setRejectModalOrder] = useState<Order | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Out of item');

  // Menu editor drawer states
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editName, setEditName] = useState<string>('');
  const [editDesc, setEditDesc] = useState<string>('');

  // Kanban column grouping (§11.2)
  const newOrders = restaurantOrders.filter((o) => o.status === 'placed');
  const preparingOrders = restaurantOrders.filter((o) => ['accepted', 'preparing'].includes(o.status));
  const readyOrders = restaurantOrders.filter((o) => ['ready', 'driver_assigned', 'picked_up', 'on_the_way'].includes(o.status));

  // Accept workflow (§11.2)
  const handleConfirmAccept = () => {
    if (!acceptModalOrder) return;
    advanceOrder(acceptModalOrder.id, prepTimeChoice);
    success(`Order ${acceptModalOrder.orderNumber} accepted (${prepTimeChoice} min prep). Customer notified!`, 'Order Accepted');
    setAcceptModalOrder(null);
  };

  // Reject workflow (§11.2)
  const handleConfirmReject = () => {
    if (!rejectModalOrder) return;
    rejectOrder(rejectModalOrder.id, rejectionReason);
    info(`Order ${rejectModalOrder.orderNumber} rejected. Reason: ${rejectionReason}. Refund initiated.`, 'Order Rejected');
    setRejectModalOrder(null);
  };

  // Save menu edit (§11.2)
  const handleSaveMenuEdit = () => {
    if (!editingItem) return;
    updateMenuItem(editingItem.id, {
      price: editPrice,
      name: editName,
      description: editDesc,
    });
    success(`Updated ${editName} ($${editPrice.toFixed(2)}). Customer app reflects new price immediately!`, 'Menu Updated');
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-[#F7F2E8] font-body text-xs text-[#1D2624]">
      {/* Top Bar (§12) */}
      <header className="sticky top-0 z-30 bg-[#FFFDF8] border-b border-[#E1D9C8] px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-[8px] bg-[#14403F] text-[#F7F2E8] flex items-center justify-center font-display font-bold">
              K
            </div>
            <div>
              <span className="font-display font-medium text-base text-[#14403F] block leading-tight">
                {restaurant.name}
              </span>
              <span className="text-[10px] text-[#76817D]">
                Christiansted, St. Croix · Kitchen Station
              </span>
            </div>
          </Link>
        </div>

        {/* Center/Right Operations Controls */}
        <div className="flex items-center gap-4">
          {/* Accepting Orders Toggle (§11.2) */}
          <div className="flex items-center gap-2 bg-[#EFE8DA] px-3 py-1.5 rounded-[12px] border border-[#CFC5B0]">
            <span className="text-[11px] font-semibold text-[#14403F]">
              {restaurant.acceptingOrders ? 'Accepting Orders' : 'Kitchen Paused'}
            </span>
            <button
              onClick={() => {
                toggleAcceptingOrders(restaurant.id);
                success(
                  restaurant.acceptingOrders ? "Kitchen paused. Closed to new incoming tickets." : "Kitchen online. Ready to accept orders.",
                  "Status Updated"
                );
              }}
              className={`w-4 h-4 rounded-full transition-colors ${
                restaurant.acceptingOrders ? 'bg-[#2E7D5B]' : 'bg-[#B2402E]'
              }`}
              title="Toggle accepting orders"
            />
          </div>

          {/* New Orders Count Badge */}
          {newOrders.length > 0 && (
            <span className="bg-[#C65D3B] text-white px-2.5 py-1 rounded-full text-[11px] font-bold animate-pulse">
              {newOrders.length} New Order{newOrders.length > 1 ? 's' : ''}
            </span>
          )}

          <Link to="/app" className="text-xs font-semibold text-[#2F6F6A] hover:underline hidden sm:inline">
            View Customer Menu →
          </Link>
        </div>
      </header>

      {/* Navigation Tabs Bar (§15) */}
      <div className="bg-[#FAF5EC] border-b border-[#E1D9C8] px-4 sm:px-6 flex gap-2 overflow-x-auto">
        {[
          { id: 'orders', label: `Live Orders (${newOrders.length + preparingOrders.length})`, icon: <Clock className="w-3.5 h-3.5" /> },
          { id: 'menu', label: 'Menu Manager', icon: <Utensils className="w-3.5 h-3.5" /> },
          { id: 'history', label: 'Order History', icon: <Clock className="w-3.5 h-3.5" /> },
          { id: 'payouts', label: 'Payouts & Margins', icon: <DollarSign className="w-3.5 h-3.5" /> },
          { id: 'profile', label: 'Kitchen Profile & Hours', icon: <Settings className="w-3.5 h-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1.5 py-3 px-3.5 font-semibold text-xs border-b-2 transition-all select-none whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-[#14403F] text-[#14403F] bg-[#FFFDF8]'
                : 'border-transparent text-[#76817D] hover:text-[#1D2624]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* TAB 1: KANBAN LIVE ORDER BOARD (§11.2) */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-display font-medium text-[#14403F]">
                  Kitchen Kanban Dispatch
                </h2>
                <p className="text-xs text-[#76817D]">
                  3-stage touch-screen workflow for cooks and counter staff
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1.5 text-[#2E7D5B] font-semibold bg-[#D4EDDA] px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#2E7D5B] animate-pulse" />
                  <span>Real-Time Sync Active</span>
                </span>
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
              {/* Column 1: NEW ORDERS */}
              <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E1D9C8]">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#C65D3B] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C65D3B]" />
                    <span>New Orders ({newOrders.length})</span>
                  </span>
                  <span className="text-[10px] text-[#76817D]">Tap to accept</span>
                </div>

                {newOrders.length === 0 ? (
                  <p className="text-[#76817D] text-center py-8 italic text-xs">
                    No new orders right now. Take a breath!
                  </p>
                ) : (
                  newOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-[#FAF5EC] border-2 border-[#C65D3B] rounded-[14px] p-4 space-y-3 border-pulse shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase text-[#76817D]">
                            {ord.orderNumber}
                          </span>
                          <h4 className="font-bold text-sm text-[#14403F]">
                            {ord.customerName}
                          </h4>
                          <span className="text-[10px] text-[#2E7D5B]">2 mins ago</span>
                        </div>
                        <span className="text-sm font-mono font-bold text-[#14403F]">
                          ${ord.total.toFixed(2)}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="bg-[#FFFDF8] p-2.5 rounded-[10px] border border-[#E1D9C8] space-y-1">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between font-semibold">
                            <span>{it.quantity}× {it.name}</span>
                            <span className="text-[#76817D] font-mono">${(it.price * it.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Big touch controls (§11.2, §15) */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <Button
                          variant="secondary"
                          size="md"
                          onClick={() => setRejectModalOrder(ord)}
                          className="border-[#B2402E] text-[#B2402E] hover:bg-[#F8D7DA]"
                        >
                          Decline
                        </Button>
                        <Button
                          size="md"
                          onClick={() => setAcceptModalOrder(ord)}
                          className="bg-[#14403F] text-white hover:bg-[#0F3332]"
                        >
                          Accept
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Column 2: PREPARING */}
              <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E1D9C8]">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#14403F] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#14403F]" />
                    <span>In Kitchen Line ({preparingOrders.length})</span>
                  </span>
                  <span className="text-[10px] text-[#76817D]">Cooking</span>
                </div>

                {preparingOrders.length === 0 ? (
                  <p className="text-[#76817D] text-center py-8 italic text-xs">
                    No orders currently in prep.
                  </p>
                ) : (
                  preparingOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-[#FAF5EC] border border-[#CFC5B0] rounded-[14px] p-4 space-y-3 shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase text-[#76817D]">
                            {ord.orderNumber}
                          </span>
                          <h4 className="font-bold text-sm text-[#14403F]">
                            {ord.customerName}
                          </h4>
                          <span className="text-[10px] text-[#C65D3B] font-semibold">
                            Est. Prep: {ord.prepTime || 15} min
                          </span>
                        </div>
                        <span className="text-sm font-mono font-bold text-[#14403F]">
                          ${ord.total.toFixed(2)}
                        </span>
                      </div>

                      <div className="bg-[#FFFDF8] p-2.5 rounded-[10px] border border-[#E1D9C8] space-y-1">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between font-medium">
                            <span>{it.quantity}× {it.name}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        size="md"
                        onClick={() => {
                          advanceOrder(ord.id);
                          success(`Order ${ord.orderNumber} marked Ready for Courier! Dispatch notified.`, 'Ready for Pickup');
                        }}
                        className="w-full bg-[#2E7D5B] hover:bg-[#256348] text-white"
                      >
                        <Check className="w-4 h-4 mr-1.5" />
                        <span>Mark Order Ready</span>
                      </Button>
                    </div>
                  ))
                )}
              </div>

              {/* Column 3: READY / DISPATCHED */}
              <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E1D9C8]">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#2E7D5B] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D5B]" />
                    <span>Courier Pickup / En Route ({readyOrders.length})</span>
                  </span>
                  <span className="text-[10px] text-[#76817D]">Handed off</span>
                </div>

                {readyOrders.length === 0 ? (
                  <p className="text-[#76817D] text-center py-8 italic text-xs">
                    No active pickups at the counter.
                  </p>
                ) : (
                  readyOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-[#D4EDDA]/30 border border-[#2E7D5B]/30 rounded-[14px] p-4 space-y-2.5 shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase text-[#76817D]">
                            {ord.orderNumber}
                          </span>
                          <h4 className="font-bold text-sm text-[#14403F]">
                            {ord.customerName}
                          </h4>
                          <span className="text-[11px] font-semibold text-[#2E7D5B] block">
                            Courier: {ord.driverName || 'Jerome Maynard (Honda Scooter)'}
                          </span>
                        </div>
                        <span className="text-sm font-mono font-bold text-[#14403F]">
                          ${ord.total.toFixed(2)}
                        </span>
                      </div>

                      <div className="p-2 bg-[#FFFDF8] rounded-[8px] border border-[#E1D9C8] flex justify-between items-center text-[11px]">
                        <span className="text-[#76817D]">Status:</span>
                        <span className="font-bold uppercase text-[#14403F]">{ord.status.replace('_', ' ')}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MENU MANAGER (§11.2) */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-display font-medium text-[#14403F]">
                  Menu Manager: Kallaloo & Co.
                </h2>
                <p className="text-xs text-[#76817D]">
                  Changes reflect in the customer ordering app in real time
                </p>
              </div>

              <Button
                size="md"
                onClick={() => {
                  toast({ message: "Item added to menu draft", title: "Menu Manager" });
                }}
                className="bg-[#14403F] text-white"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                <span>Add New Dish</span>
              </Button>
            </div>

            {/* Menu Items Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {restaurantItems.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[16px] p-4 flex flex-col justify-between gap-3 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm text-[#14403F]">{dish.name}</h4>
                        <span className="text-[10px] font-bold uppercase bg-[#EFE8DA] text-[#2F6F6A] px-2 py-0.2 rounded">
                          {dish.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#76817D] mt-1 leading-relaxed">{dish.description}</p>
                      <p className="text-sm font-mono font-bold text-[#14403F] mt-2">${dish.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E1D9C8] flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleSoldOut(dish.id)}
                      className={`text-xs px-3 py-1.5 rounded-[8px] font-semibold transition-all ${
                        dish.soldOut
                          ? 'bg-[#B2402E] text-white'
                          : 'bg-[#EFE8DA] text-[#4A5753] hover:bg-[#E1D9C8]'
                      }`}
                    >
                      {dish.soldOut ? 'Mark Available' : 'Toggle Sold Out Today'}
                    </button>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setEditingItem(dish);
                        setEditPrice(dish.price);
                        setEditName(dish.name);
                        setEditDesc(dish.description);
                      }}
                    >
                      <Edit2 className="w-3.5 h-3.5 mr-1" />
                      <span>Edit Price & Details</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ORDER HISTORY (§11.2) */}
        {activeTab === 'history' && (
          <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-display font-medium text-[#14403F]">Completed Orders</h3>
                <p className="text-xs text-[#76817D]">Full audit trail with customer receipts</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => toast({ message: "Export is simulated in the demo.", title: "CSV Export" })}
              >
                <Download className="w-3.5 h-3.5 mr-1" />
                <span>Export CSV</span>
              </Button>
            </div>

            <div className="divide-y divide-[#E1D9C8]">
              {restaurantOrders.map((ord) => (
                <div key={ord.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-mono font-bold text-[#14403F] text-xs">{ord.orderNumber}</span>
                    <p className="text-xs text-[#4A5753]">{ord.customerName} · {ord.deliveryAddress}</p>
                    <span className="text-[11px] text-[#76817D]">{new Date(ord.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-sm text-[#14403F]">${ord.total.toFixed(2)}</span>
                    <span className="block text-[10px] font-bold uppercase text-[#2E7D5B]">{ord.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PAYOUTS & MARGINS (§11.2) */}
        {activeTab === 'payouts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[16px] p-5 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#76817D]">Estimated Next Payout</span>
                <p className="text-2xl font-display font-bold text-[#14403F] mt-1">$486.20</p>
                <span className="text-xs text-[#2E7D5B] font-semibold">Deposit Scheduled: Friday</span>
              </div>
              <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[16px] p-5 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#76817D]">Transparent Platform Fee</span>
                <p className="text-2xl font-display font-bold text-[#C65D3B] mt-1">12%</p>
                <span className="text-xs text-[#4A5753]">Fixed Crucian Eats Marketplace Commission</span>
              </div>
              <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[16px] p-5 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#76817D]">Disbursed Direct</span>
                <p className="text-2xl font-display font-bold text-[#2E7D5B] mt-1">100%</p>
                <span className="text-xs text-[#76817D]">Direct deposit to FirstBank USVI</span>
              </div>
            </div>

            <div className="bg-[#FAF5EC] border border-[#CFC5B0] rounded-[20px] p-6 space-y-3">
              <h4 className="font-semibold text-sm text-[#14403F]">Weekly Payout Ledger</h4>
              <p className="text-xs text-[#4A5753]">
                Crucian Eats distributes vendor payouts every Friday. You receive 88% of all gross food sales. Delivery fees and customer tips pass directly to courier partners without kitchen deductions.
              </p>
            </div>
          </div>
        )}

        {/* TAB 5: PROFILE & HOURS (§11.2) */}
        {activeTab === 'profile' && (
          <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-6 shadow-sm space-y-5 max-w-2xl">
            <h3 className="text-lg font-display font-medium text-[#14403F]">Kitchen Hours & Location</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#76817D] mb-1">Kitchen Name</label>
                <input
                  type="text"
                  disabled
                  value={restaurant.name}
                  className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[8px] p-2 font-semibold text-[#14403F]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#76817D] mb-1">Address & Zone</label>
                <input
                  type="text"
                  disabled
                  value={`${restaurant.zone}, St. Croix, USVI`}
                  className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[8px] p-2 text-[#4A5753]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#76817D] mb-1">Closes Daily At</label>
                  <input
                    type="text"
                    disabled
                    value={restaurant.closesAt}
                    className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[8px] p-2 text-[#14403F]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#76817D] mb-1">Delivery Radius</label>
                  <input
                    type="text"
                    disabled
                    value="Managed by Crucian Eats (All St. Croix)"
                    className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[8px] p-2 text-[#76817D] italic"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Accept Prep Time Picker Modal (§11.2) */}
      <Modal
        isOpen={!!acceptModalOrder}
        onClose={() => setAcceptModalOrder(null)}
        title="Accept Order & Set Preparation Time"
        description="Select how many minutes the kitchen needs before courier pickup"
      >
        <div className="space-y-4 font-body text-xs text-[#1D2624]">
          <p>
            Customer <strong className="text-[#14403F]">{acceptModalOrder?.customerName}</strong> will receive an instant push notification with your preparation timeline.
          </p>

          <div className="grid grid-cols-4 gap-2">
            {[10, 15, 20, 30].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => setPrepTimeChoice(mins)}
                className={`py-3 rounded-[10px] text-center font-bold text-sm border transition-all ${
                  prepTimeChoice === mins
                    ? 'bg-[#14403F] text-white border-[#14403F]'
                    : 'bg-[#EFE8DA] text-[#4A5753] border-transparent hover:bg-[#E1D9C8]'
                }`}
              >
                {mins} min
              </button>
            ))}
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setAcceptModalOrder(null)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleConfirmAccept} className="bg-[#14403F] text-white">
              Confirm & Start Cooking
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reject Reason Modal (§11.2) */}
      <Modal
        isOpen={!!rejectModalOrder}
        onClose={() => setRejectModalOrder(null)}
        title="Decline Order"
        description="Please select a reason. A full refund will be initiated immediately."
      >
        <div className="space-y-4 font-body text-xs text-[#1D2624]">
          <div className="space-y-2">
            {['Out of item', 'Kitchen too busy', 'Closing early today', 'Special request cannot be met'].map((r) => (
              <label key={r} className="flex items-center gap-2 p-2.5 rounded-[8px] bg-[#EFE8DA] cursor-pointer">
                <input
                  type="radio"
                  name="rejectReason"
                  checked={rejectionReason === r}
                  onChange={() => setRejectionReason(r)}
                  className="text-[#B2402E]"
                />
                <span className="font-semibold text-[#14403F]">{r}</span>
              </label>
            ))}
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setRejectModalOrder(null)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleConfirmReject} className="bg-[#B2402E] text-white">
              Decline & Initiate Refund
            </Button>
          </div>
        </div>
      </Modal>

      {/* Menu Edit Drawer (§11.2) */}
      <Drawer
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title={`Edit Dish · ${editingItem?.name}`}
        description="Update pricing and menu descriptions"
      >
        {editingItem && (
          <div className="space-y-4 text-xs font-body text-[#1D2624]">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#76817D] mb-1">Dish Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[8px] p-2 text-xs font-bold text-[#14403F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#76817D] mb-1">Price (USD)</label>
              <input
                type="number"
                step="0.50"
                value={editPrice}
                onChange={(e) => setEditPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[8px] p-2 text-sm font-mono font-bold text-[#14403F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#76817D] mb-1">Description</label>
              <textarea
                rows={3}
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[8px] p-2 text-xs text-[#1D2624]"
              />
            </div>

            <div className="pt-4 flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setEditingItem(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveMenuEdit} className="bg-[#14403F] text-white">
                Save & Update Live App
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
