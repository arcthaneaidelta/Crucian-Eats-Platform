import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Phone, MessageSquare, CheckCircle2, AlertCircle, ChefHat, Bike, ShieldCheck } from 'lucide-react';
import { useDemoStore } from '../../store/useDemoStore';
import { IslandMap } from '../../components/marketing/IslandMap';
import { RatingSheet } from '../../components/customer/RatingSheet';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';

export const OrderTrackerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders } = useDemoStore();
  const { toast } = useToast();

  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const order = orders.find((o) => o.id === id) || orders[0];

  // Headline mapping based on state machine (§11.1)
  const getStatusHeadline = () => {
    switch (order.status) {
      case 'placed':
        return { title: 'Order Submitted', sub: 'Sent to Kallaloo & Co. kitchen...' };
      case 'accepted':
        return { title: 'Kitchen Accepted', sub: `Chef Dale will have it ready in ${order.prepTime || 15} minutes.` };
      case 'preparing':
        return { title: 'Kitchen Preparing', sub: 'Cooking your Kallaloo and frying johnnycakes fresh.' };
      case 'ready':
        return { title: 'Packaged & Ready', sub: 'Awaiting courier pickup in Christiansted.' };
      case 'driver_assigned':
        return { title: 'Courier Assigned', sub: 'Jerome Maynard on Honda scooter heading to restaurant.' };
      case 'picked_up':
        return { title: 'Order Picked Up', sub: 'Thermal bag secured. Courier en route to Frederiksted.' };
      case 'on_the_way':
        return { title: 'On The Way to You', sub: 'Travelling across Centerline Road past Kingshill.' };
      case 'delivered':
        return { title: 'Delivered at Gate', sub: 'Left safely at front porch by blue gate. Enjoy your meal!' };
      case 'rejected':
        return { title: 'Order Cancelled', sub: `Reason: ${order.rejectionReason || 'Restaurant unable to fulfil'}. Full refund initiated.` };
      case 'refunded':
        return { title: 'Order Refunded', sub: `$${order.refundAmount?.toFixed(2)} refunded to your payment method.` };
      default:
        return { title: 'Processing Order', sub: 'Checking restaurant connection...' };
    }
  };

  const statusInfo = getStatusHeadline();

  // Trigger rating sheet after delivery (§11.1)
  useEffect(() => {
    if (order.status === 'delivered' && !order.rating) {
      const timer = setTimeout(() => {
        setIsRatingOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [order.status, order.rating]);

  const handleDisabledAction = (type: 'Call' | 'Message') => {
    toast({
      title: `${type} Disabled in Demo`,
      message: `${type}ing the driver or kitchen is disabled in the frontend prototype.`,
      type: 'info',
    });
  };

  return (
    <div className="font-body text-xs text-[#1D2624] space-y-4 p-4 sm:p-5">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/app')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#14403F] hover:text-[#0F3332]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Restaurants</span>
        </button>
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#76817D]">
          {order.orderNumber}
        </span>
      </div>

      {/* Live Status Hero Banner */}
      <div className="bg-[#14403F] text-[#F7F2E8] rounded-[20px] p-5 shadow-md space-y-2">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#D9A84E]">
          <span>Live St. Croix Tracking</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#2E7D5B] animate-pulse" />
            <span>ETA: ~18 Min</span>
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-medium text-white">
          {statusInfo.title}
        </h2>
        <p className="text-xs text-[#DCE8E4] leading-relaxed">
          {statusInfo.sub}
        </p>
      </div>

      {/* Animated St. Croix Island Map (§11.1) */}
      <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-3 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-2 pb-2 text-[11px] text-[#76817D] border-b border-[#E1D9C8]">
          <span>Christiansted (Pickup)</span>
          <span className="font-semibold text-[#C65D3B]">Centerline Road Route</span>
          <span>Estate Whim (Dropoff)</span>
        </div>
        <IslandMap orderStatus={order.status} showOrderChip={false} height={260} />
      </div>

      {/* Driver Card (Appears when driver assigned §11.1) */}
      {['driver_assigned', 'picked_up', 'on_the_way', 'delivered'].includes(order.status) && (
        <div className="bg-[#FFFDF8] border border-[#CFC5B0] rounded-[16px] p-4 shadow-sm flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#EFE8DA] border border-[#CFC5B0] flex items-center justify-center text-[#14403F] font-bold text-sm">
              JM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#14403F]">Jerome Maynard</span>
                <span className="text-[10px] font-semibold text-[#2E7D5B] bg-[#D4EDDA] px-2 py-0.2 rounded">★ 4.9</span>
              </div>
              <p className="text-xs text-[#4A5753]">Honda Scooter · Local Courier</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDisabledAction('Call')}
              aria-label="Call driver"
              className="p-2.5 rounded-full bg-[#EFE8DA] text-[#14403F] hover:bg-[#E1D9C8] transition-colors"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDisabledAction('Message')}
              aria-label="Message driver"
              className="p-2.5 rounded-full bg-[#EFE8DA] text-[#14403F] hover:bg-[#E1D9C8] transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Delivered Photo Proof Banner (if delivered §11.3) */}
      {order.status === 'delivered' && (
        <div className="bg-[#D4EDDA]/60 border border-[#2E7D5B]/30 rounded-[16px] p-4 space-y-2">
          <div className="flex items-center gap-2 text-[#2E7D5B] font-bold uppercase tracking-wider text-[10px]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Delivery Photo Verified</span>
          </div>
          <p className="text-xs text-[#1D2624]">
            Courier note: "Left safely at front porch table by blue gate."
          </p>
          {!order.rating && (
            <Button
              size="sm"
              onClick={() => setIsRatingOpen(true)}
              className="bg-[#14403F] text-white mt-1"
            >
              Rate Order Experience
            </Button>
          )}
        </div>
      )}

      {/* Order Item Summary */}
      <div className="bg-[#FAF5EC] border border-[#E1D9C8] rounded-[16px] p-4 space-y-2.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#76817D] block">
          Order Items ({order.items.length})
        </span>
        <div className="space-y-1.5 divide-y divide-[#E1D9C8]/60">
          {order.items.map((it, idx) => (
            <div key={idx} className="pt-1.5 first:pt-0 flex justify-between">
              <span className="font-semibold text-[#14403F]">
                {it.quantity}× {it.name}
              </span>
              <span className="font-mono text-[#1D2624]">${(it.price * it.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="pt-2 border-t border-[#CFC5B0] flex justify-between font-bold text-sm text-[#14403F]">
          <span>Total Paid (Direct Client Account)</span>
          <span className="font-mono text-[#C65D3B]">${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Rating Sheet Modal */}
      <RatingSheet
        orderId={order.id}
        restaurantName={order.restaurantName}
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
      />
    </div>
  );
};
