'use client'

import { useRef, useState } from "react"
import { useToolbarPosition } from "@/hooks/use-toolbar";
import { cn } from "@/lib/utils";

import { ClientUser } from "@/types/prisma";
import { EditorTopBar } from "@/components/single/editor-top-bar"
import { NoteCanvas } from "@/components/ui/note-canvas";
import { Toolbar } from "@/components/ui/toolbar";
import dynamic from "next/dynamic";

const CanvasEditorProvider = dynamic(() => import('@/hooks/use-canvas-editor').then(c => c.CanvasEditorProvider), { ssr: false });

export const NoteClient = ({
  title, isPublic, content, currentUser
}: {
  title: string,
  isPublic: boolean,
  content: string,
  currentUser: ClientUser | null
}) => {
  const toolbarPos = useToolbarPosition();

  const [scroll, setScroll] = useState<number>(0);

  return (
    <main
      className="overflow-y-auto h-full"
      onScroll={(e) => {
        setScroll(e.currentTarget.scrollTop ?? 0);
      }}
    >
      <CanvasEditorProvider>
        <EditorTopBar
          title={title}
          isPublic={isPublic}
          isScrolled={scroll > 20}
          currentUser={currentUser}
        />
        <div className="py-10 text-center">
          <NoteCanvas content={content} />
        </div>
        <div className={cn(
          "w-fit h-fit",
          toolbarPos.position === 'bottom' ? "sticky inset-0 mx-auto bottom-8" : "absolute h-fit inset-0 my-auto ms-auto right-8"
        )}>
          <Toolbar />
        </div>
      </CanvasEditorProvider>
    </main>
  )
}