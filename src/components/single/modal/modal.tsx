'use client'

import { forwardRef } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  isOpen: boolean;
  onClose?: () => void;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({
    title,
    isOpen,
    onClose,
    children,
    className,
    ...props
  }, ref) => {
    const onChange = (open: boolean) => {
      if (!open) onClose?.();
    }
    
    return (
      <Dialog open={isOpen} onOpenChange={onChange} modal>
        <DialogContent
          className={cn("bg-opacity-30", className)}
          ref={ref}
          {...props}
        >
          <DialogHeader>
            <DialogTitle>
              {title}
            </DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
})