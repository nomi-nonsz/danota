import type { Metadata } from "next"

import { NoteClient } from "./client"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { NoteContext } from "@/hooks/use-note-store"

export async function generateMetadata(
  { params }: {
    params: Promise<{noteId: string}>
  },
): Promise<Metadata> {
  const id = (await params).noteId;
 
  const note = await prisma.note.findFirst({
    select: {
      id: true,
      title: true,
    },
    where: { id }
  });
 
  return {
    title: `${!!note ? note.title : "Untitled note"} | Danota`,
    description: "Edit note"
  }
}

export default async function NotePage ({
  params
}: {
  params: {
    noteId: string
  }
}) {
  const currentUser = await getCurrentUser();

  const note = await prisma.note.findFirst({
    select: {
      id: true,
      title: true,
      content: true,
      isPublic: true,
      shorter: true,
      createdAt: true
    },
    where: {
      id: params.noteId,
      userId: currentUser?.id
    }
  });

  if (!note) redirect("/notes");

  return <NoteClient note={note} currentUser={currentUser} />
}