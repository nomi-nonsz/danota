'use client'

import type { Editor } from "@tiptap/react";

import { IToolbar } from "../toolbar-button";
import { Heading1Icon, Heading2Icon, Heading3Icon, Heading4Icon, Heading5Icon, Heading6Icon } from "lucide-react";
import { ToolbarSelect } from "../toolbar-select";

const toolbarHeading: (editor: Editor) => IToolbar[] = (editor) => [
  {
    name: "h1",
    icon: Heading1Icon,
    label: "Heading 1",
    onClick: () => {
      editor.chain().focus().toggleHeading({ level: 1 }).run();
    },
    isActive: editor.isActive('heading', { level: 1 })
  },
  {
    name: "h2",
    icon: Heading2Icon,
    label: "Heading 2",
    onClick: () => {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    },
    isActive: editor.isActive('heading', { level: 2 })
  },
  {
    name: "h3",
    icon: Heading3Icon,
    label: "Heading 3",
    onClick: () => {
      editor.chain().focus().toggleHeading({ level: 3 }).run();
    },
    isActive: editor.isActive('heading', { level: 3 })
  },
  {
    name: "h4",
    icon: Heading4Icon,
    label: "Heading 4",
    onClick: () => {
      editor.chain().focus().toggleHeading({ level: 4 }).run();
    },
    isActive: editor.isActive('heading', { level: 4 })
  },
  {
    name: "h5",
    icon: Heading5Icon,
    label: "Heading 5",
    onClick: () => {
      editor.chain().focus().toggleHeading({ level: 5 }).run();
    },
    isActive: editor.isActive('heading', { level: 5 })
  },
  {
    name: "h6",
    icon: Heading6Icon,
    label: "Heading 6",
    onClick: () => {
      editor.chain().focus().toggleHeading({ level: 6 }).run();
    },
    isActive: editor.isActive('heading', { level: 6 })
  }
]

export const HeadingToolbar = ({
  editor: editor,
  direction = 'horizontal'
}: {
  direction?: 'horizontal' | 'vertical',
  editor: Editor
}) => {
  return (
    <ToolbarSelect
      data={toolbarHeading(editor)}
      direction={direction}
    />
  )
}