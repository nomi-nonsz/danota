'use client'

import { Position, Setting } from "@prisma/client";
import { useEffect } from "react";
import { create } from "zustand";
import { useAction } from "./use-action";
import { BooleanProperties } from "@/types/utils";

type EditablePreferences = Omit<Setting, 'userId' | 'id'>;
type TogglePreferences = Pick<EditablePreferences, 'autoSave' | 'darkMode'>;

interface PreferencesStore extends Omit<Setting, 'userId'> {
  isInitialized: boolean;
  setPreference: (preference: Setting) => void;
  setz: (key: keyof EditablePreferences, value: any) => void;
  toggle: (key: keyof TogglePreferences) => void;
}

const usePreferencesStore = create<PreferencesStore>((set) => ({
  isInitialized: false,
  id: "",
  autoSave: true,
  darkMode: false,
  toolbarPosition: Position.BOTTOM,
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

  const save = () => action.patch(`/settings/${preferencesStore.id}`, {
    autoSave: preferencesStore.autoSave,
    darkMode: preferencesStore.darkMode,
    toolbarPosition: preferencesStore.toolbarPosition,
  });

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
  const { setPreference, isInitialized } = usePreferences();

  useEffect(() => {
    return () => {
      if (!isInitialized && initValue) setPreference(initValue);
    }
  }, []);

  return <div className="hidden" />
}