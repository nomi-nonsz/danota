import { create } from "zustand";
import { GlobalDisclosureStore } from "../use-diclosure";

interface INotemodalStore extends GlobalDisclosureStore {
  data?: any;
  onCreate: () => void;
  onUpdate: (data: any) => void;
  setData: (data: any) => void;
}

export const useNoteModal = create<INotemodalStore>(set => ({
  isOpen: false,
  data: null,
  
  onCreate: () => { set({ isOpen: true, data: null }) },
  onUpdate: (data) => { set({ isOpen: true, data }) },
  setData: (data) => { set({ data }) },

  onOpen: () => { set({ isOpen: true }) },
  onClose: () => { set({ isOpen: false }) },
  onToggle: () => { set(val => ({ isOpen: !val.isOpen })) },
  setOpen: (state: boolean) => { set({ isOpen: state }) },
}));