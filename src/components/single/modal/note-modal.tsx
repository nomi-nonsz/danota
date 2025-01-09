'use client'

import { useNoteModal } from "@/hooks/disclosures/use-notemodal"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NoteForm } from "../forms/note-form";
import { NoteSettingsForm } from "../forms/note-settings-form";

export const NoteModal = () => {
  const { isOpen, onToggle, data } = useNoteModal();

  return (
    <Dialog open={isOpen} onOpenChange={onToggle} modal>
      <DialogContent
        className="bg-opacity-30"
      >
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Create a new note
          </DialogTitle>
        </DialogHeader>
        <NoteForm />
      </DialogContent>
    </Dialog>
  )
}


export const NoteSettingsModal = ({
  open, onClose, onToggle
}: {
  open: boolean,
  onClose: () => void
  onToggle: (st: boolean) => void
}) => {
  return (
    <Dialog open={open} onOpenChange={onToggle} modal>
      <DialogContent
        className="bg-opacity-30"
      >
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Note settings
          </DialogTitle>
        </DialogHeader>
        <NoteSettingsForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}