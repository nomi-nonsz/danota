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
  isInitializedClient: boolean;
  setInitialized: () => void;
  setInitializedClient: () => void;
  setPreference: (preference: Setting) => void;
  setz: (key: keyof EditablePreferences, value: any) => void;
  toggle: (key: keyof TogglePreferences) => void;
}

const usePreferencesStore = create<PreferencesStore>((set) => ({
  isInitialized: false,
  isInitializedClient: false,
  id: "",
  autoSave: true,
  darkMode: null,
  expandSidebar: true,
  toolbarPosition: Position.BOTTOM,
  setInitialized: () => set({ isInitialized: true }),
  setInitializedClient: () => set({ isInitializedClient: true }),
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

  const save = useDebouncedCallback((changed: keyof EditablePreferences) => {
    if (!['darkMode', 'expandSidebar'].includes(changed)) {
      action.patch(`/api/settings/${preferencesStore.id}`, {
        autoSave: preferencesStore.autoSave,
        toolbarPosition: preferencesStore.toolbarPosition
      })
      return;
    }
    const { expandSidebar } = preferencesStore;
    Object.entries({ expandSidebar }).forEach((val) => {
      localStorage.setItem(val[0], `${val[1]}`);
    })
  }, 1000);

  const set = (key: keyof EditablePreferences, value: any) => {
    preferencesStore.setz(key, value);
    save(key);
  }

  const toggle = (key: keyof TogglePreferences) => {
    preferencesStore.toggle(key);
    save(key);
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

export const ClientPreferenceProvider = ({ children }: { children: React.ReactNode }) => {
  const { expandSidebar, set, setInitializedClient, isInitializedClient } = usePreferences();

  useEffect(() => {
    return () => {
      if (isInitializedClient) return;

      Object.keys({ expandSidebar }).forEach((key) => {
        const raw: string | null = localStorage.getItem(key);
        if (raw !== null) {
          let value: any = raw;
          if (raw === 'true' || raw === 'false') {
            value = raw === 'true' ? true : false;
          }
          set(key as keyof EditablePreferences, value);
        }
      })

      setInitializedClient();
    }
  }, []);

  if (!isInitializedClient) return null;

  return children;
}