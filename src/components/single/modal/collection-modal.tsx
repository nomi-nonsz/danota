'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCollectionModal } from "@/hooks/disclosures/use-collection-modal";
import { CollectionCreationForm } from "../forms/collection-form";

export const CollectionCreationModal = () => {
  const { isOpen, onToggle } = useCollectionModal();

  return (
    <Dialog open={isOpen} onOpenChange={onToggle} modal>
      <DialogContent
        className="bg-opacity-30"
      >
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Create a new collection
          </DialogTitle>
        </DialogHeader>
        <CollectionCreationForm />
      </DialogContent>
    </Dialog>
  )
}