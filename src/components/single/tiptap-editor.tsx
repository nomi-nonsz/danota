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
      "text-left text-foreground text-lg",
      "*:text-foreground",
      "[&_.tiptap]:min-h-[480px] [&_.tiptap]:p-7 [&_.tiptap]:rounded-xl [&_.tiptap]:focus:border-foreground",
      "[&_h1]:[&_.tiptap]:text-3xl [&_h2]:[&_.tiptap]:text-2xl [&_h3]:[&_.tiptap]:text-xl [&_h4]:[&_.tiptap]:text-lg [&_h5]:[&_.tiptap]:text-base [&_h6]:[&_.tiptap]:text-sm",
      "[&_.tiptap]:space-y-4",
    )} editor={editor} />
  )
}