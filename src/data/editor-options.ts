import StarterKit from "@tiptap/starter-kit";

import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

import type { UseEditorOptions } from "@tiptap/react";

export const editorOptions: UseEditorOptions = {
  extensions: [
    StarterKit.configure({}),
    Placeholder.configure({
      placeholder: "Type something..."
    }),
    Underline,
    Link.configure({
      protocols: ['http', 'https'],
      HTMLAttributes: {
        target: '_blank',
        class: "underline text-primary"
      }
    })
  ],
  immediatelyRender: true
};