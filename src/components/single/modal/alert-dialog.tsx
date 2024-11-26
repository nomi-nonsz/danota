'use client'

import { useCallback, useState } from "react";
import { useAlert } from "@/hooks/use-alert"

import { Button } from "@/components/ui/button";
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export const AlertDialog = () => {
  const { isOpen, onClose, payload } = useAlert();
  const [isPending, setPending] = useState<boolean>(false);

  const onChange = (open: boolean) => {
    if (!open) onClose();
  }

  const onConfirm = useCallback(() => {
    if (!payload.onConfirm) return;

    setPending(true);

    Promise.resolve(payload.onConfirm())
      .then(() => {
        onClose();
      })
      .finally(() => {
        setPending(false);
      })
  }, [payload.onConfirm])
  
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onChange}
      modal
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">
            {payload.title ?? "Delete this?"}
          </DialogTitle>
        </DialogHeader>
        {payload.description ?? "Are you sure want to delete this? this process cannot be undone"}
        <DialogFooter className="[&_button]:p-5 [&_button]:text-md">
          <Button
            className="font-bold"
            variant={"destructive"}
            onClick={onConfirm}
            disabled={isPending}
          >
            Delete
          </Button>
          <Button
            variant={"outline-2"}
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}