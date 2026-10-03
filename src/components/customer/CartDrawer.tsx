import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Stepper } from '../ui/Stepper';
import { EmptyState } from '../ui/EmptyState';
import { useDemoStore } from '../../store/useDemoStore';
import { useToast } from '../ui/Toast';
import { useNavigate } from 'react-router-dom';
import { Trash2, MapPin, Clock, CreditCard, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, updateCartItem, removeFromCart, placeOrder, clearCart, fees, restaurants, cartRestaurantId } = useDemoStore();
  const { toast, success, error } = useToast();
  const navigate = useNavigate();

  // Checkout form states
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [deliveryAddress, setDeliveryAddress] = useState('Estate Whim, Frederiksted');
  const [gateCode, setGateCode] = useState('Blue gate, 2nd house on left');
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [customTip, setCustomTip] = useState<string>('');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);

  const restaurant = restaurants.find((r) => r.id === cartRestaurantId);
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = restaurant?.deliveryFee ?? 3.99;
  const serviceFee = Math.round(subtotal * (fees.serviceFeePercent / 100) * 100) / 100;

  const tipAmount = customTip !== ''
    ? parseFloat(customTip) || 0
    : Math.round(subtotal * (tipPercent / 100) * 100) / 100;

  const grandTotal = Math.round((subtotal + deliveryFee + serviceFee + tipAmount) * 100) / 100;
  const meetsMinimum = subtotal >= 12;

  const handleRemove = (index: number) => {
    const item = cart[index];
    removeFromCart(index);
    toast({
      title: 'Item removed',
      message: `Removed ${item.menuItem.name} from your order.`,
      action: {
        label: 'Undo',
        onClick: () => {
          // re-add item
          useDemoStore.getState().addToCart(item.menuItem, item.quantity, item.selectedOptions, item.notes);
        },
      },
    });
  };

  const handlePlaceOrder = () => {
    setCardError(null);
    setIsProcessing(true);

    // Deterministic test card declined check (§11.1)
    if (cardNumber.endsWith('0002')) {
      setTimeout(() => {
        setIsProcessing(false);
        setCardError("Your card was declined. Please choose another payment method.");
        error("Payment declined by issuing bank (Test card 0002 triggered).", "Payment Failed");
      }, 1200);
      return;
    }

    // 1.4s processing ring state (§11.1)
    setTimeout(() => {
      setIsProcessing(false);
      const fullAddress = `${deliveryAddress} (${gateCode})`;
      const newOrder = placeOrder(fullAddress, 'Estate Whim', tipAmount, cardNumber);
      success("Order CE-24817 confirmed. Chef Dale has been notified!", "Order Placed");
      onClose();
      setStep('cart');
      navigate(`/app/order/${newOrder.id}`);
    }, 1400);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={step === 'cart' ? 'Your Crucian Order' : 'Checkout & Payment'}
      description={step === 'cart' ? restaurant?.name || 'Local Island Food' : 'Payments held safely in Crucian Eats client account'}
    >
      <div className="flex flex-col h-full justify-between font-body text-xs text-[#1D2624]">
        {cart.length === 0 ? (
          <div className="py-12">
            <EmptyState
              icon="bag"
              title="Your order is empty"
              description="Your order is empty. Start with something local from St. Croix's finest kitchens."
              actionLabel="Explore Restaurants"
              onAction={onClose}
            />
          </div>
        ) : step === 'cart' ? (
          /* Cart Review View */
          <div className="space-y-6 flex-1 overflow-y-auto pr-1">
            {/* Minimum Order Notice */}
            {!meetsMinimum && (
              <div className="p-3 bg-[#FFF3CD] border border-[#B7791F]/30 rounded-[12px] text-[#B7791F] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Minimum order is $12.00. Add ${(12 - subtotal).toFixed(2)} more to checkout.</span>
              </div>
            )}

            {/* Line Items */}
            <div className="divide-y divide-[#E1D9C8]">
              {cart.map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#14403F]">{item.menuItem.name}</span>
                    </div>
                    {Object.values(item.selectedOptions).length > 0 && (
                      <p className="text-[11px] text-[#76817D] mt-0.5">
                        {Object.values(item.selectedOptions).join(', ')}
                      </p>
                    )}
                    {item.notes && (
                      <p className="text-[11px] text-[#2F6F6A] mt-0.5 italic">
                        "{item.notes}"
                      </p>
                    )}
                    <span className="text-xs font-mono font-bold text-[#14403F] mt-1 block">
                      ${item.totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Stepper
                      value={item.quantity}
                      onChange={(q) => updateCartItem(idx, q)}
                      min={1}
                      size="sm"
                    />
                    <button
                      onClick={() => handleRemove(idx)}
                      aria-label="Remove item"
                      className="p-1.5 text-[#76817D] hover:text-[#B2402E] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="bg-[#FAF5EC] border border-[#E1D9C8] rounded-[16px] p-4 space-y-2 text-xs">
              <div className="flex justify-between text-[#4A5753]">
                <span>Food Subtotal</span>
                <span className="font-mono text-[#1D2624]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#4A5753]">
                <span>Island Delivery Fee</span>
                <span className="font-mono text-[#1D2624]">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#4A5753]">
                <span>Service Fee (6%)</span>
                <span className="font-mono text-[#1D2624]">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#14403F] pt-2 border-t border-[#E1D9C8]">
                <span>Estimated Subtotal</span>
                <span className="font-mono">${(subtotal + deliveryFee + serviceFee).toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                size="lg"
                disabled={!meetsMinimum}
                onClick={() => setStep('checkout')}
                className="w-full bg-[#14403F] text-[#F7F2E8] hover:bg-[#0F3332]"
              >
                <span>Proceed to Checkout</span>
              </Button>
            </div>
          </div>
        ) : (
          /* Checkout Sheet View */
          <div className="space-y-5 flex-1 overflow-y-auto pr-1">
            {/* Step 1: Delivery Address & Gate Code */}
            <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[14px] p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#14403F]">
                <MapPin className="w-4 h-4 text-[#C65D3B]" />
                <span>Delivery Location (St. Croix)</span>
              </div>
              <div>
                <label className="block text-[11px] text-[#76817D] mb-1 font-semibold">Street / Area</label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[8px] p-2 text-xs font-medium text-[#1D2624]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#76817D] mb-1 font-semibold">Landmark / Gate Code (USVI Critical)</label>
                <input
                  type="text"
                  value={gateCode}
                  onChange={(e) => setGateCode(e.target.value)}
                  placeholder="e.g. Blue gate, yellow cistern on right"
                  className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[8px] p-2 text-xs text-[#1D2624]"
                />
              </div>
            </div>

            {/* Step 2: Tip Chips */}
            <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[14px] p-4 space-y-2.5">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#14403F]">
                Add Courier Tip (100% to Driver)
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {[10, 15, 20].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => {
                      setTipPercent(pct);
                      setCustomTip('');
                    }}
                    className={`py-2 rounded-[8px] text-xs font-semibold select-none border transition-all ${
                      tipPercent === pct && customTip === ''
                        ? 'bg-[#14403F] text-white border-[#14403F]'
                        : 'bg-[#EFE8DA] text-[#4A5753] border-transparent hover:bg-[#E1D9C8]'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setTipPercent(0);
                    setCustomTip('0');
                  }}
                  className={`py-2 rounded-[8px] text-xs font-semibold select-none border transition-all ${
                    customTip === '0'
                      ? 'bg-[#14403F] text-white border-[#14403F]'
                      : 'bg-[#EFE8DA] text-[#4A5753] border-transparent hover:bg-[#E1D9C8]'
                  }`}
                >
                  None
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTipPercent(0);
                    setCustomTip('5.00');
                  }}
                  className={`py-2 rounded-[8px] text-xs font-semibold select-none border transition-all ${
                    customTip === '5.00'
                      ? 'bg-[#14403F] text-white border-[#14403F]'
                      : 'bg-[#EFE8DA] text-[#4A5753] border-transparent hover:bg-[#E1D9C8]'
                  }`}
                >
                  $5.00
                </button>
              </div>
            </div>

            {/* Step 3: Payment Method (§11.1) */}
            <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[14px] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#14403F]">
                  <CreditCard className="w-4 h-4 text-[#2F6F6A]" />
                  <span>Payment Method</span>
                </div>
                <span className="text-[10px] text-[#2E7D5B] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Sovereign Client Account</span>
                </span>
              </div>

              {/* Express Mobile Pay Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCardNumber('Apple Pay (Default)')}
                  className="py-2.5 px-3 bg-[#1D2624] text-white rounded-[10px] font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-black transition-colors"
                >
                  <span> Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCardNumber('Google Pay (Default)')}
                  className="py-2.5 px-3 bg-[#FFFDF8] border border-[#CFC5B0] text-[#1D2624] rounded-[10px] font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#EFE8DA] transition-colors"
                >
                  <span>G Pay</span>
                </button>
              </div>

              {/* Card selection */}
              <div>
                <label className="block text-[11px] text-[#76817D] mb-1 font-semibold">Saved Card / Test Cards</label>
                <select
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[8px] p-2 text-xs font-medium text-[#1D2624]"
                >
                  <option value="Visa ending •••• 4242 (Simulate Success)">Visa ending •••• 4242 (Simulate Success)</option>
                  <option value="Mastercard ending •••• 0002 (Simulate Decline)">Mastercard ending •••• 0002 (Simulate Decline)</option>
                  <option value="Apple Pay (Default)">Apple Pay (Connected)</option>
                </select>
              </div>

              {/* Declined Error State (§11.1) */}
              {cardError && (
                <div className="p-3 bg-[#F8D7DA] text-[#B2402E] rounded-[10px] flex items-center gap-2 text-xs animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{cardError}</span>
                </div>
              )}
            </div>

            {/* Total Split Summary */}
            <div className="p-4 bg-[#FAF5EC] rounded-[14px] border border-[#E1D9C8] space-y-1.5">
              <div className="flex justify-between text-[#4A5753]">
                <span>Items & Delivery Subtotal</span>
                <span className="font-mono">${(subtotal + deliveryFee + serviceFee).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#4A5753]">
                <span>Driver Tip</span>
                <span className="font-mono">${tipAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#14403F] pt-2 border-t border-[#CFC5B0]">
                <span>Total Charge</span>
                <span className="font-mono text-[#C65D3B]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex gap-2">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setStep('cart')}
              >
                Back
              </Button>
              <Button
                size="lg"
                isLoading={isProcessing}
                onClick={handlePlaceOrder}
                className="flex-1 bg-[#C65D3B] hover:bg-[#AE4D2E] text-white"
              >
                <span>Place Order · ${grandTotal.toFixed(2)}</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};
