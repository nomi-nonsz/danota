'use client'

import type { Editor } from "@tiptap/react"
import { ToolbarButton } from "../toolbar-button"
import { UnderlineIcon } from "lucide-react"

export const UnderlineToolbar = ({
  editor
}: {
  editor: Editor
}) => {
  const run = () => {
    editor.chain().focus().toggleUnderline().run();
  }

  return (
    <ToolbarButton
      icon={UnderlineIcon}
      label="Underline"
      name="underline"
      hotkey="CTRL + U"
      onClick={run}
      isActive={editor.isActive('underline')}
    />
  )
}