'use client'

import { create } from "zustand";

type AlertPayload = {
  title?: string,
  description?: string,
  danger?: boolean,
  onConfirm?: () => void | Promise<void>
}

interface AlertStore {
  payload?: AlertPayload,
  isOpen: boolean;
  isPending?: boolean;

  dispatch: (payload: AlertPayload) => void;

  onClose: () => void;
  onOpen: () => void;
  onToggle: () => void;
  setPending: (state: boolean) => void
}

export const useAlertStore = create<AlertStore>((set) => ({
  payload: {
    title: "Alert",
    description: "This is description of alert",
    danger: false,
    id: "1"
  },
  isOpen: false,
  isPending: false,

  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onToggle: () => set(({ isOpen }) => ({ isOpen: !isOpen })),
  setPending: (state) => set({ isPending: state }),

  dispatch: (payload: AlertPayload) => set({ payload, isOpen: true }),
}));