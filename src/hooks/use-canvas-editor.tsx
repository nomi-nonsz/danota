'use client'

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, UseEditorOptions, type Editor } from "@tiptap/react";
import { createContext, useContext, useEffect, useState } from "react";

interface CanvasEditorStore {
  editor: Editor | null;
  isEditorLoaded: boolean;
  // setEditor: (editor: Editor | null) => void;
}

export const CanvasEditorContext = createContext<CanvasEditorStore>({
  editor: null,
  isEditorLoaded: false,
});

export const useCanvasEditor = () => useContext(CanvasEditorContext);

export const editorOptions: UseEditorOptions = {
  extensions: [
    StarterKit.configure({}),
    Placeholder.configure({
      placeholder: "Type something..."
    })
  ],
  immediatelyRender: true
};

export const CanvasEditorProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [isEditorLoaded, setLoaded] = useState<boolean>(false);

  const editor = useEditor(editorOptions);

  useEffect(() => {
    setLoaded(!!editor);
  }, [editor])

  return (
    <CanvasEditorContext.Provider value={{ editor, isEditorLoaded }}>
      {children}
    </CanvasEditorContext.Provider>
  )
}