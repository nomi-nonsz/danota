'use client'

import { useEffect } from "react";
import { create } from "zustand";
import { Position, Setting } from "@prisma/client";
import { EditablePreferences } from "@/types/prisma";
import { useAction } from "./use-action";
import { useDebouncedCallback } from "use-debounce";

type TogglePreferences = Pick<EditablePreferences, 'autoSave' | 'darkMode' | 'expandSidebar'>;

interface PreferencesStore extends Omit<Setting, 'userId'> {
  isInitialized: boolean;
  setInitialized: () => void;
  setPreference: (preference: Setting) => void;
  setz: (key: keyof EditablePreferences, value: any) => void;
  toggle: (key: keyof TogglePreferences) => void;
}

const usePreferencesStore = create<PreferencesStore>((set) => ({
  isInitialized: false,
  id: "",
  autoSave: true,
  darkMode: false,
  expandSidebar: true,
  toolbarPosition: Position.BOTTOM,
  setInitialized: () => set({ isInitialized: true }),
  setPreference: (preference) => set({
    id: preference.id,
    autoSave: preference.autoSave,
    darkMode: preference.darkMode,
    toolbarPosition: preference.toolbarPosition
  }),
  setz: (key, value) => set({ [key]: value }),
  toggle: (key) => set((val) => ({ [key]: !val[key] }))
}));

export const usePreferences = () => {
  const preferencesStore = usePreferencesStore();
  const action = useAction();

  const save = useDebouncedCallback(() => action.patch(`/api/settings/${preferencesStore.id}`, {
    autoSave: preferencesStore.autoSave,
    darkMode: preferencesStore.darkMode,
    toolbarPosition: preferencesStore.toolbarPosition,
  }), 1000);

  const set = (key: keyof EditablePreferences, value: any) => {
    preferencesStore.setz(key, value);
    save();
  }

  const toggle = (key: keyof TogglePreferences) => {
    preferencesStore.toggle(key);
    save();
  }

  return {
    ...preferencesStore,
    setz: undefined,
    save,
    set,
    toggle
  }
}

export const PreferencesProvider = ({ initValue }: { initValue: Setting | null }) => {
  const { setPreference, isInitialized, setInitialized } = usePreferences();

  useEffect(() => {
    return () => {
      if (!isInitialized && initValue) {
        setPreference(initValue);
        setInitialized();
      }
    }
  }, []);

  return <div className="hidden" />
}