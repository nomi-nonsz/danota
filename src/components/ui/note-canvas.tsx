'use client'

import { ContentContainer } from "./container"

export const NoteCanvas = () => {
  return (
    <ContentContainer className="h-screen bg-white p-8 mx-auto border rounded-2xl">
      <textarea className="block w-full h-full p-2" placeholder="Type your note..."></textarea>
    </ContentContainer>
  )
}