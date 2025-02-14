import StarterKit from "@tiptap/starter-kit";

import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

import type { Editor, UseEditorOptions } from "@tiptap/react";

export const editorOptions = ({
  initContent,
  onUpdate
}: {
  initContent?: string,
  onUpdate: (editor: Editor) => void
}): UseEditorOptions => ({
  content: initContent,
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: {
          class: "font-bold"
        }
      },
    }),
    Placeholder.configure({
      placeholder: "Type something..."
    }),
    Underline,
    Link.configure({
      protocols: ['http', 'https'],
      HTMLAttributes: {
        target: '_blank',
        class: "underline text-primary"
      },
      openOnClick: false
    })
  ],
  immediatelyRender: true,
  onUpdate: ({ editor }) => onUpdate(editor)
});