'use client'

import { useCanvasEditor } from "@/hooks/use-canvas-editor";
import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";

export const TiptapEditor = ({
  content
}: {
  content: string | null
}) => {
  const { editor, isEditorLoaded } = useCanvasEditor();

  if (!isEditorLoaded) {
    return (
      <div className="inset-0 m-auto pt-12">Loading editor please wait...</div>
    )
  }

  return (
    <EditorContent className={cn(
      "text-left text-foreground",
      "[&_.tiptap]:min-h-[480px] [&_.tiptap]:p-6 [&_.tiptap]:rounded-xl *:text-foreground"
    )} editor={editor} />
  )
}