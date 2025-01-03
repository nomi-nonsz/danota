import type { Metadata } from "next"

import { NoteClient } from "./client"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"

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
  const note = await prisma.note.findFirst({
    select: {
      id: true,
      title: true,
      content: true,
      isPublic: true,
      createdAt: true
    },
    where: { id: params.noteId }
  });

  const currentUser = await getCurrentUser();

  if (!note) redirect("/notes");

  return <NoteClient {...note} currentUser={currentUser} />
}