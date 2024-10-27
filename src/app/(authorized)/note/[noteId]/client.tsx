'use client'

import { useRef, useState } from "react"
import { useToolbarPosition } from "@/hooks/use-toolbar";
import { cn } from "@/lib/utils";

import { EditorTopBar } from "@/components/single/editor-top-bar"
import { NoteCanvas } from "@/components/ui/note-canvas";
import { Toolbar } from "@/components/ui/toolbar";

export const NoteClient = () => {
  const toolbarPos = useToolbarPosition();

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
      <div className="py-10 text-center">
        <NoteCanvas />
      </div>
      <div className={cn(
        "w-fit h-fit",
        toolbarPos.position === 'bottom' ? "sticky inset-0 mx-auto bottom-8" : "absolute h-fit inset-0 my-auto ms-auto right-8"
      )}>
        <Toolbar />
      </div>
    </main>
  )
}