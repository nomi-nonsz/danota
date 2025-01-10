import { create } from "zustand";
import { GlobalDisclosureStore } from "../use-diclosure";

interface CollectionStore extends GlobalDisclosureStore {}

export const useCollectionModal = create<CollectionStore>(set => ({
  isOpen: false,
  onOpen: () => { set({ isOpen: true }) },
  onClose: () => { set({ isOpen: false }) },
  onToggle: () => { set(val => ({ isOpen: !val.isOpen })) },
  setOpen: (state: boolean) => { set({ isOpen: state }) },
}));