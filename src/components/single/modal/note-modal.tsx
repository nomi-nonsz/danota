'use client'

import { useNoteModal } from "@/hooks/disclosures/use-notemodal"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Modal } from "./modal"
import { NoteForm } from "../forms/note-form";

export const NoteModal = () => {
  const { isOpen, onToggle, data } = useNoteModal();

  return (
    <Dialog open={isOpen} onOpenChange={onToggle} modal>
      <DialogContent
        className="bg-opacity-30"
      >
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            {data ? "Edit note" : "Create new note"}
          </DialogTitle>
        </DialogHeader>
        <NoteForm />
      </DialogContent>
    </Dialog>
  )
}