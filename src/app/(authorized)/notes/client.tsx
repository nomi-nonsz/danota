'use client'

import { EmptyLabel } from '@/components/ui/empty-label'
import { useNoteModal } from '@/hooks/disclosures/use-notemodal'
import { FileQuestionIcon } from 'lucide-react'

export const NotesClientEmptyLabel = () => {
  const { onOpen } = useNoteModal();

  return (
    <div className="my-20">
      <EmptyLabel
        icon={<FileQuestionIcon className="mx-auto mb-6" size={120} strokeWidth={0.5} />}
        title={<>You haven't made any notes yet, <button className="text-primary" onClick={onOpen}>Create New</button></>}
      />
    </div>
  )
}