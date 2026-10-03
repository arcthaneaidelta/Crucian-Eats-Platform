import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'max-w-[520px]',
  showCloseButton = true,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#1D2624]/45 z-[70] transition-opacity duration-200 backdrop-blur-[1px] data-[state=open]:animate-fadeIn" />
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
          <Dialog.Content
            className={`w-full ${maxWidth} bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-6 shadow-[0_16px_40px_rgba(29,38,36,0.14)] pointer-events-auto max-h-[90vh] overflow-y-auto focus:outline-none transition-all duration-200 data-[state=open]:animate-scaleIn`}
          >
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E1D9C8]">
                <div>
                  {title && (
                    <Dialog.Title className="text-xl font-medium font-display text-[#14403F]">
                      {title}
                    </Dialog.Title>
                  )}
                  {description && (
                    <Dialog.Description className="text-xs text-[#76817D] mt-0.5 font-body">
                      {description}
                    </Dialog.Description>
                  )}
                </div>
                {showCloseButton && (
                  <Dialog.Close asChild>
                    <button
                      onClick={onClose}
                      aria-label="Close"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#76817D] hover:text-[#1D2624] hover:bg-[#EFE8DA] transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </Dialog.Close>
                )}
              </div>
            )}
            {children}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
