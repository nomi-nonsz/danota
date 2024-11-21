'use client'

import type { Editor } from "@tiptap/react"
import { ToolbarButton } from "../toolbar-button"
import { ItalicIcon, UnderlineIcon } from "lucide-react"

export const ItalicToolbar = ({
  editor
}: {
  editor: Editor
}) => {
  const run = () => {
    editor.chain().focus().toggleItalic().run();
  }

  return (
    <ToolbarButton
      icon={ItalicIcon}
      label="Italic"
      name="italic"
      hotkey="CTRL + I"
      onClick={run}
      isActive={editor.isActive('italic')}
    />
  )
}