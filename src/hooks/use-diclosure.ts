'use client'

import { useState } from "react";
import { create } from "zustand";

export function useDisclosure () {
  const [isOpen, setOpen] = useState<boolean>(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onToggle = () => setOpen(open => !open);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    setOpen
  }
}

export interface GlobalDisclosureStore {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  onToggle: () => void,
  setOpen: (state: boolean) => void
}

export const useGlobalDisclosure = create<GlobalDisclosureStore>(set => ({
  isOpen: false,
  onOpen: () => { set({ isOpen: true }) },
  onClose: () => { set({ isOpen: false }) },
  onToggle: () => { set(val => ({ isOpen: !val.isOpen })) },
  setOpen: (state: boolean) => { set({ isOpen: state }) }
}));