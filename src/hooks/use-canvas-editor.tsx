'use client'

import { editorOptions } from "@/data/editor-options";

import { useEditor, type Editor } from "@tiptap/react";
import { createContext, useContext, useEffect, useState } from "react";
import { CloudStatus, useNoteStore } from "./use-note-store";
import { useSaveShortcut } from "./use-shortcut";

import { useDebouncedCallback } from "use-debounce";
import { usePreferences } from "./use-preferencesx";

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

export const CanvasEditorProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const noteStore = useNoteStore();
  const { autoSave } = usePreferences();
  const [isEditorLoaded, setLoaded] = useState<boolean>(false);

  const onSave = useDebouncedCallback(() => {
    noteStore.save();
  }, 1600);

  const onUpdate = (editor: Editor) => {
    noteStore.set('content', editor.getHTML());
    noteStore.setStatus(CloudStatus.NOT_SAVED);
    if (autoSave) onSave();
  }

  useSaveShortcut(noteStore.save);

  const editor = useEditor(editorOptions({ onUpdate, initContent: noteStore.note.content }));

  useEffect(() => {
    setLoaded(!!editor);
  }, [editor])

  return (
    <CanvasEditorContext.Provider value={{ editor, isEditorLoaded }}>
      {children}
    </CanvasEditorContext.Provider>
  )
}