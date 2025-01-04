import { Note, User } from "@prisma/client";

export type ClientUser = Omit<User, 'hash' | 'emailVerified'>;

export type NoteClient = Omit<Note, 'allowComment' | 'userId' | 'categoryId' | 'collectionIs' | 'updatedAt'>