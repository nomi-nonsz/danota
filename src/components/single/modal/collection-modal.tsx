'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCollectionModal } from "@/hooks/disclosures/use-collection-modal";
import { CollectionCreationForm } from "../forms/collection-form";
import { useDisclosure } from "@/hooks/use-diclosure";
import { CollectionSaver } from "../collection-saver";

export const CollectionCreationModal = () => {
  const { isOpen, onToggle, data } = useCollectionModal();

  return (
    <Dialog open={isOpen} onOpenChange={onToggle} modal>
      <DialogContent
        className="bg-opacity-30"
      >
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            {data ? "Edit collection" : "Create a new collection"}
          </DialogTitle>
        </DialogHeader>
        <CollectionCreationForm />
      </DialogContent>
    </Dialog>
  )
}

export const CollectionModal = ({
  isOpen, onToggle, noteId
}: {
  noteId: string | number,
  isOpen: boolean,
  onToggle: () => void,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onToggle} modal>
      <DialogContent
        className="bg-opacity-30"
      >
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Add to collection
          </DialogTitle>
        </DialogHeader>
        <CollectionSaver noteId={noteId} />
      </DialogContent>
    </Dialog>
  )
}