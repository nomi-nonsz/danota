import StarterKit from "@tiptap/starter-kit";

import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";

import type { UseEditorOptions } from "@tiptap/react";

export const editorOptions: UseEditorOptions = {
  extensions: [
    StarterKit.configure({}),
    Placeholder.configure({
      placeholder: "Type something..."
    }),
    Underline
  ],
  immediatelyRender: true
};