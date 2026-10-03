import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Stepper } from '../ui/Stepper';
import type { MenuItem } from '../../data/types';
import { Check, AlertCircle } from 'lucide-react';

export interface ItemSheetProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, options: Record<string, string>, notes: string) => void;
}

export const ItemSheet: React.FC<ItemSheetProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Initialize defaults
  useEffect(() => {
    if (item) {
      setQuantity(1);
      setNotes('');
      setErrorMsg(null);
      const initial: Record<string, string> = {};
      if (item.options) {
        item.options.forEach((opt) => {
          if (opt.required && opt.choices.length > 0) {
            initial[opt.id] = opt.choices[0].id;
          }
        });
      }
      setSelectedOptions(initial);
    }
  }, [item, isOpen]);

  if (!item) return null;

  // Calculate live total price
  let itemPrice = item.price;
  if (item.options) {
    item.options.forEach((opt) => {
      const choiceId = selectedOptions[opt.id];
      if (choiceId) {
        const choice = opt.choices.find((c) => c.id === choiceId);
        if (choice) itemPrice += choice.price;
      }
    });
  }
  const totalPrice = itemPrice * quantity;

  const handleAdd = () => {
    // Validate required options
    if (item.options) {
      for (const opt of item.options) {
        if (opt.required && !selectedOptions[opt.id]) {
          setErrorMsg(`Please select an option for: ${opt.name}`);
          return;
        }
      }
    }

    onAddToCart(item, quantity, selectedOptions, notes);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item.name}>
      <div className="space-y-5 font-body text-xs text-[#1D2624]">
        {/* Item Image / Graphic */}
        <div className="w-full h-44 rounded-[14px] bg-[#EFE8DA] overflow-hidden flex items-center justify-center relative border border-[#E1D9C8]">
          <div className="text-center p-4">
            <span className="font-display font-medium text-lg text-[#14403F] block mb-1">
              {item.name}
            </span>
            <span className="text-[11px] text-[#76817D] uppercase tracking-wider font-semibold">
              Crucian Prepared Fresh
            </span>
          </div>
        </div>

        {/* Description & Base Price */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2F6F6A]">
              {item.category}
            </span>
            <span className="text-base font-bold font-mono text-[#14403F]">
              ${item.price.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-[#4A5753] leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Option Groups */}
        {item.options && item.options.length > 0 && (
          <div className="space-y-4 pt-2 border-t border-[#E1D9C8]">
            {item.options.map((opt) => (
              <div key={opt.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#14403F] text-xs">
                    {opt.name}
                  </span>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${opt.required ? 'bg-[#F6DDD2] text-[#C65D3B]' : 'bg-[#EFE8DA] text-[#76817D]'}`}>
                    {opt.required ? 'Required' : 'Optional'}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {opt.choices.map((choice) => {
                    const isSelected = selectedOptions[opt.id] === choice.id;
                    return (
                      <label
                        key={choice.id}
                        className={`flex items-center justify-between p-2.5 rounded-[10px] border cursor-pointer transition-all select-none ${
                          isSelected
                            ? 'bg-[#14403F]/5 border-[#14403F] text-[#14403F] font-semibold'
                            : 'bg-[#FFFDF8] border-[#E1D9C8] text-[#4A5753] hover:bg-[#FAF5EC]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name={`opt-${opt.id}`}
                            checked={isSelected}
                            onChange={() => {
                              setSelectedOptions({ ...selectedOptions, [opt.id]: choice.id });
                              setErrorMsg(null);
                            }}
                            className="text-[#14403F] focus:ring-[#2F6F6A]"
                          />
                          <span>{choice.name}</span>
                        </div>
                        {choice.price > 0 && (
                          <span className="text-[11px] font-mono font-medium text-[#76817D]">
                            +${choice.price.toFixed(2)}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Special Instructions Notes Field */}
        <div className="pt-2 border-t border-[#E1D9C8]">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A5753] mb-1.5">
            Special Instructions / Dietary Notes
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Extra hot pepper sauce on side, no onions"
            className="w-full bg-[#EFE8DA] border border-[#CFC5B0] rounded-[10px] p-2.5 text-xs text-[#1D2624] placeholder-[#76817D] focus:outline-none focus:border-[#2F6F6A]"
          />
        </div>

        {/* Validation Error banner */}
        {errorMsg && (
          <div className="p-2.5 bg-[#F8D7DA] text-[#B2402E] rounded-[8px] flex items-center gap-2 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Bottom Stepper & Add Button */}
        <div className="pt-4 border-t border-[#E1D9C8] flex items-center gap-4">
          <Stepper
            value={quantity}
            onChange={(val) => setQuantity(Math.max(1, val))}
            min={1}
            size="md"
          />

          <Button
            size="md"
            onClick={handleAdd}
            className="flex-1 bg-[#14403F] text-[#F7F2E8] hover:bg-[#0F3332]"
          >
            <span>Add to Order · ${totalPrice.toFixed(2)}</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
