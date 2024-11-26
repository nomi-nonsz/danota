'use client'

import type { Editor } from "@tiptap/react"
import { ToolbarButton } from "../toolbar-button"
import { ListIcon, ListOrderedIcon } from "lucide-react"

export const BulletListToolbar = ({
  editor
}: {
  editor: Editor
}) => {
  const run = () => {
    editor.chain().focus().toggleBulletList().run();
  }

  return (
    <ToolbarButton
      icon={ListIcon}
      label="Bullet List"
      name="list_bullet"
      hotkey="CTRL + Shift + B"
      onClick={run}
      isActive={editor.isActive('bulletList')}
    />
  )
}

export const OrderedListToolbar = ({
  editor
}: {
  editor: Editor
}) => {
  const run = () => {
    editor.chain().focus().toggleOrderedList().run();
  }

  return (
    <ToolbarButton
      icon={ListOrderedIcon}
      label="Ordered List"
      name="list_ordered"
      hotkey="CTRL + Shift + 7"
      onClick={run}
      isActive={editor.isActive('orderedList')}
    />
  )
}