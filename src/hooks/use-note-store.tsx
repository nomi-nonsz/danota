'use client'


import { createContext, useContext, useState } from "react";
import type { NoteClient } from "@/types/prisma";
import { useAction } from "./use-action";
import axios from "axios";

interface NoteStore {
  note: NoteClient;
  setNote: (note: NoteClient) => void;
}

export const NoteContext = createContext<NoteStore>({
  note: null as unknown as NoteClient,
  setNote: () => {}
});

export const NoteProvider = ({
  initialNote,
  children
}: {
  initialNote: NoteClient,
  children: React.ReactNode
}) => {
  const [note, setNote] = useState<NoteClient>(initialNote);

  return <NoteContext.Provider value={{ note, setNote }}>{children}</NoteContext.Provider>
}

export const useNoteStore = () => {
  const { patch } = useAction();
  const { note, setNote } = useContext(NoteContext);

  const set = (key: keyof NoteClient, value: any) => {
    // @ts-ignore
    setNote((prevNote) => ({
      ...prevNote,
      [key]: value
    }))
  }

  const get = (key: keyof NoteClient) => {
    return note![key];
  }

  const refetch = async () => {
    const { data: res } = await axios.get(`/api/notes/${note!.id}`);
    setNote(res.data);
  }

  const save = () => {
    patch(`/api/notes/${note!.id}`, note, {
      success: {
        title: "Saved"
      }
    })
  }

  return {
    note,
    save,
    set,
    get,
    refetch
  }
};