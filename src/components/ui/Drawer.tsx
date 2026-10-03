import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  width?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  width = 'max-w-[480px]',
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#1D2624]/40 z-[60] transition-opacity duration-200" />
        <div className="fixed inset-y-0 right-0 z-[60] flex max-w-full pointer-events-none">
          <Dialog.Content
            className={`w-screen ${width} bg-[#FFFDF8] border-l border-[#E1D9C8] shadow-[0_16px_40px_rgba(29,38,36,0.14)] pointer-events-auto flex flex-col h-full focus:outline-none transition-transform duration-300 ease-out`}
          >
            <div className="flex items-center justify-between p-5 border-b border-[#E1D9C8] bg-[#FFFDF8]">
              <div>
                {title && (
                  <Dialog.Title className="text-lg font-medium font-display text-[#14403F]">
                    {title}
                  </Dialog.Title>
                )}
                {description && (
                  <Dialog.Description className="text-xs text-[#76817D] mt-0.5 font-body">
                    {description}
                  </Dialog.Description>
                )}
              </div>
              <Dialog.Close asChild>
                <button
                  onClick={onClose}
                  aria-label="Close drawer"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#76817D] hover:text-[#1D2624] hover:bg-[#EFE8DA] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </Dialog.Close>
            </div>
            <div className="flex-1 overflow-y-auto p-6 font-body">
              {children}
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
