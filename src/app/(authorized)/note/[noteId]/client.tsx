'use client'

import { EditorTopBar } from "@/components/single/editor-top-bar"
import { NoteCanvas } from "@/components/ui/note-canvas";
import { useRef, useState } from "react"

export const NoteClient = () => {
  const [scroll, setScroll] = useState<number>(0);
  const scrollRef = useRef<HTMLElement | null>(null);

  return (
    <main
      className="overflow-y-auto h-full"
      onScroll={(e) => {
        setScroll(scrollRef.current?.scrollTop ?? 0);
      }}
      ref={scrollRef}
    >
      <EditorTopBar isScrolled={scroll > 20} />
      <div className="pt-5 text-center">
        <NoteCanvas />
      </div>
    </main>
  )
}