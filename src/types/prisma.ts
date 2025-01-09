import type { Note, Setting, User } from "@prisma/client";

export type ClientUser = Omit<User, 'hash' | 'emailVerified'>;
export type NoteClient = Omit<Note, 'userId' | 'collectionId' | 'updatedAt'>
export type Preferences = Setting & {
  expandSidebar: boolean
}
export type EditablePreferences = Omit<Preferences, 'userId' | 'id'>;