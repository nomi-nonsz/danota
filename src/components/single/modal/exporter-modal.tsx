'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Exporter } from "../forms/exporter"
import { useCallback } from "react"

export const ExporterModal = ({
  isOpen, onToggle, noteId
}: {
  noteId: string | number,
  isOpen: boolean,
  onToggle: () => void,
}) => {
  const onClose = useCallback(() => {
    if (isOpen) onToggle();
  }, [onToggle])

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
        <Exporter
          noteId={noteId}
          onModalClose={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}