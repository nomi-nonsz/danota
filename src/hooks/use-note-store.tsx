'use client'


import { createContext, useContext, useState } from "react";
import type { NoteClient } from "@/types/prisma";
import { useAction } from "./use-action";
import axios from "axios";

export enum CloudStatus {
  NOT_SAVED,
  SAVING,
  SAVED,
}

interface NoteStore {
  note: NoteClient;
  status: CloudStatus;
  setNote: (note: NoteClient) => void;
  setStatus: (status: CloudStatus) => void
}

export const NoteContext = createContext<NoteStore>({
  note: null as unknown as NoteClient,
  status: CloudStatus.NOT_SAVED,
  setNote: () => {},
  setStatus: () => {}
});

export const NoteProvider = ({
  initialNote,
  children
}: {
  initialNote: NoteClient,
  children: React.ReactNode
}) => {
  const [note, setNote] = useState<NoteClient>(initialNote);
  const [status, setStatus] = useState<CloudStatus>(CloudStatus.NOT_SAVED);

  return <NoteContext.Provider value={{ note, setNote, status, setStatus }}>{children}</NoteContext.Provider>
}

export const useNoteStore = () => {
  const { patch } = useAction();
  const { note, setNote, status, setStatus } = useContext(NoteContext);

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

  const save = async () => {
    setStatus(CloudStatus.SAVING);
    const res = await patch(`/api/notes/${note!.id}`, note, {
      success: {
        title: "Saved"
      }
    })
    setStatus(CloudStatus.SAVED);
  }

  return {
    note,
    save,
    set,
    get,
    refetch,
    status,
    setStatus
  }
};