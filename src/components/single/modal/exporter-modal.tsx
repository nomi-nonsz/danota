'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Exporter } from "../forms/exporter"

export const ExporterModal = ({
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
            Export note
          </DialogTitle>
        </DialogHeader>
        <Exporter noteId={noteId} />
      </DialogContent>
    </Dialog>
  )
}