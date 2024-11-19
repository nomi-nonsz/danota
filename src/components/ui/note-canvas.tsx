'use client'

import dynamic from "next/dynamic"
import { WorkContainer } from "./work-container"

const TiptapEditor = dynamic(() => import('../single/tiptap-editor').then(c => c.TiptapEditor), { ssr: false });

export const NoteCanvas = ({
  content
}: {
  content: string | null
}) => {
  return (
    <WorkContainer className="h-fit bg-white mx-auto border rounded-2xl">
      <TiptapEditor content={content} />
    </WorkContainer>
  )
}