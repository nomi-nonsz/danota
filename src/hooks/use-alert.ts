'use client'

import { create } from "zustand";

type AlertPayload = {
  title?: string,
  description?: string,
  id?: string | number,
  onConfirm?: () => void | Promise<void>
}

interface AlertStore {
  payload: AlertPayload,
  isOpen: boolean;

  dispatch: (payload: AlertPayload) => void;

  onClose: () => void;
  onOpen: () => void;
  onToggle: () => void;
}

const _DEFAULT_PAYLOAD: AlertPayload = {
  title: "Alert",
  description: "This is description of alert, this is the default alert description, if you see this message tell the developer to fix this",
  id: "1"
}

export const useAlert = create<AlertStore>((set) => ({
  payload: _DEFAULT_PAYLOAD,
  isOpen: false,

  onOpen: () => set({
    isOpen: true
  }),
  onClose: () => set({
    isOpen: false
  }),
  onToggle: () => set(({ isOpen, payload }) => ({
    payload: isOpen ? _DEFAULT_PAYLOAD : payload,
    isOpen: !isOpen
  })),

  dispatch: (payload: AlertPayload) => set({
    payload,
    isOpen: true
  }),
}));