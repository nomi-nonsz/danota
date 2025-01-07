import type { Note, Setting, User } from "@prisma/client";

export type ClientUser = Omit<User, 'hash' | 'emailVerified'>;
export type NoteClient = Omit<Note, 'allowComment' | 'userId' | 'categoryId' | 'collectionIs' | 'updatedAt'>
export type EditablePreferences = Omit<Setting, 'userId' | 'id'>;