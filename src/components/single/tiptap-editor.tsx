'use client'

import { useCanvasEditor } from "@/hooks/use-canvas-editor";
import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";

export const TiptapEditor = ({
  content
}: {
  content: string
}) => {
  const { editor, isEditorLoaded } = useCanvasEditor();

  if (!isEditorLoaded) {
    return (
      <div className="inset-0 m-auto pt-12">Loading editor please wait...</div>
    )
  }

  return (
    <EditorContent
      placeholder="Type something..."
      editor={editor}
      content={content}
      className={cn(
        "note-editor text-left text-foreground text-lg *:text-foreground",
        // Not recommended bruh, it's should be inside global.css
        "[&_.tiptap]:min-h-[480px] [&_.tiptap]:p-9 [&_.tiptap]:rounded-xl [&_.tiptap]:focus:border-foreground",
        "[&_.tiptap]:bg-background dark:[&_.tiptap]:bg-accent [&_.tiptap]:border dark:[&_.tiptap]:border-white/20",
        "[&_.tiptap]:space-y-3",
      )}
    />
  )
}