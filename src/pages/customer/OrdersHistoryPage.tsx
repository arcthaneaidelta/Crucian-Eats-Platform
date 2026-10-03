import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Receipt, Repeat, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import { useDemoStore } from '../../store/useDemoStore';
import { Button } from '../../components/ui/Button';
import { Drawer } from '../../components/ui/Drawer';
import { useToast } from '../../components/ui/Toast';
import type { Order } from '../../data/types';

export const OrdersHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { orders, addToCart } = useDemoStore();
  const { success } = useToast();
  const [selectedReceipt, setSelectedReceipt] = useState<Order | null>(null);

  const handleReorder = (order: Order) => {
    // Add items from this order to cart
    order.items.forEach((item) => {
      // Find matching item from seed if possible or stub
      const dummyItem = {
        id: item.menuItemId,
        restaurantId: order.restaurantId,
        name: item.name,
        description: '',
        price: item.price,
        category: 'Mains',
        image: '',
        available: true,
        soldOut: false,
        options: [],
      };
      addToCart(dummyItem, item.quantity, {}, item.notes);
    });
    success(`Added ${order.items.length} items to your order from ${order.restaurantName}`, 'Order Duplicated');
    navigate(`/app/r/${order.restaurantId}`);
  };

  return (
    <div className="p-4 sm:p-5 space-y-4 font-body text-xs text-[#1D2624]">
      <div className="pb-3 border-b border-[#E1D9C8]">
        <h1 className="text-xl font-display font-medium text-[#14403F]">
          Your Island Orders
        </h1>
        <p className="text-xs text-[#76817D]">
          Track live deliveries and review past orders on St. Croix
        </p>
      </div>

      <div className="space-y-3">
        {orders.map((ord) => (
          <div
            key={ord.id}
            className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[16px] p-4 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#76817D] block">
                  {ord.orderNumber} · {new Date(ord.createdAt).toLocaleDateString()}
                </span>
                <h3 className="font-semibold text-sm text-[#14403F]">
                  {ord.restaurantName}
                </h3>
              </div>

              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  ord.status === 'delivered'
                    ? 'bg-[#D4EDDA] text-[#2E7D5B]'
                    : ord.status === 'placed'
                    ? 'bg-[#F6DDD2] text-[#C65D3B]'
                    : 'bg-[#D1ECF1] text-[#2F6F8F]'
                }`}
              >
                {ord.status.replace('_', ' ')}
              </span>
            </div>

            <div className="text-xs text-[#4A5753] divide-y divide-[#E1D9C8]/50">
              {ord.items.map((it, idx) => (
                <div key={idx} className="py-1 flex justify-between">
                  <span>{it.quantity}× {it.name}</span>
                  <span className="font-mono text-[#1D2624]">${(it.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E1D9C8] flex items-center justify-between">
              <span className="font-bold text-sm text-[#14403F]">
                Total: <span className="font-mono text-[#C65D3B]">${ord.total.toFixed(2)}</span>
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedReceipt(ord)}
                >
                  <Receipt className="w-3.5 h-3.5 mr-1" />
                  <span>Receipt</span>
                </Button>

                {ord.status !== 'delivered' ? (
                  <Button
                    size="sm"
                    onClick={() => navigate(`/app/order/${ord.id}`)}
                    className="bg-[#14403F] text-white"
                  >
                    <span>Track</span>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleReorder(ord)}
                    className="bg-[#14403F] text-white"
                  >
                    <Repeat className="w-3.5 h-3.5 mr-1" />
                    <span>Reorder</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Receipt Drawer */}
      <Drawer
        isOpen={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        title={selectedReceipt ? `Receipt · ${selectedReceipt.orderNumber}` : ''}
        description="Crucian Eats Order Transaction Record"
      >
        {selectedReceipt && (
          <div className="space-y-5 text-xs text-[#1D2624] font-body">
            <div className="p-4 bg-[#EFE8DA] rounded-[12px] space-y-1">
              <p className="font-bold text-sm text-[#14403F]">{selectedReceipt.restaurantName}</p>
              <p className="text-[#76817D]">Delivered to: {selectedReceipt.deliveryAddress}</p>
              <p className="text-[#76817D] font-mono text-[11px]">{new Date(selectedReceipt.createdAt).toLocaleString()}</p>
            </div>

            <div className="space-y-2 border-y border-[#E1D9C8] py-3">
              {selectedReceipt.items.map((it, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{it.quantity}× {it.name}</span>
                  <span className="font-mono">${(it.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#76817D]">
                <span>Food Subtotal</span>
                <span className="font-mono">${selectedReceipt.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#76817D]">
                <span>Delivery Fee</span>
                <span className="font-mono">${selectedReceipt.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#76817D]">
                <span>Service Fee</span>
                <span className="font-mono">${selectedReceipt.serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#76817D]">
                <span>Driver Tip</span>
                <span className="font-mono">${selectedReceipt.tip.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-[#14403F] pt-2 border-t border-[#CFC5B0]">
                <span>Grand Total</span>
                <span className="font-mono text-[#C65D3B]">${selectedReceipt.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3 bg-[#FAF5EC] border border-[#E1D9C8] rounded-[10px] text-[11px] text-[#4A5753]">
              Payments processed securely through Crucian Eats' client account. Merchant funds distributed to island restaurant and driver partners.
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
