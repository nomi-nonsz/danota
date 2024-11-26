'use client'

import type { Editor } from "@tiptap/react"
import { ToolbarButton } from "../toolbar-button"
import { BoldIcon } from "lucide-react"

export const BoldToolbar = ({
  editor
}: {
  editor: Editor
}) => {
  const run = () => {
    editor.chain().focus().toggleBold().run();
  }

  return (
    <ToolbarButton
      icon={BoldIcon}
      label="Bold"
      name="bold"
      hotkey="CTRL + B"
      onClick={run}
      isActive={editor.isActive('bold')}
    />
  )
}