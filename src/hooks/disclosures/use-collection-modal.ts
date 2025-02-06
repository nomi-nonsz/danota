import { create } from "zustand";
import { GlobalDisclosureStore } from "../use-diclosure";
import type { Collection } from "@prisma/client";

interface CollectionStore extends GlobalDisclosureStore {
  data: Collection | null
  setData: (data: Collection) => void,
  clearData: () => void
}

export const useCollectionModal = create<CollectionStore>(set => ({
  data: null,
  isOpen: false,
  setData: (data) => set({ data }),
  clearData: () => set({ data: null }),
  onOpen: () => { set({ isOpen: true }) },
  onClose: () => { set({ isOpen: false }) },
  onToggle: () => { set(val => ({ isOpen: !val.isOpen })) },
  setOpen: (state: boolean) => { set({ isOpen: state }) },
}));