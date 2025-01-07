'use client'

import dynamic from "next/dynamic"
import { WorkContainer } from "./work-container"
import { useNoteStore } from "@/hooks/use-note-store";

const TiptapEditor = dynamic(() => import('../single/tiptap-editor').then(c => c.TiptapEditor), { ssr: false });

export const NoteCanvas = () => {
  const { note } = useNoteStore();

  return (
    <WorkContainer className="h-fit transition-[height] mx-auto">
      <TiptapEditor content={note!.content} />
    </WorkContainer>
  )
}