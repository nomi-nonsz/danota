import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { NoteItem } from "@/components/single/note-item"
import { NotesBar } from "@/components/single/notes-bar"
import { ProfileBar } from "@/components/ui/profile-bar"
import { WorkContainer } from "@/components/ui/work-container"

import prisma from '@/lib/prisma'
import { poppins } from "@/lib/fonts"
import { getCurrentUser } from '@/lib/auth'
import { NotesClientEmptyLabel } from './client'
 
export const metadata: Metadata = {
  title: 'Your Notes',
  description: 'This is where your notes saved',
}

export default async function NotesPage ({
  searchParams
}: {
  searchParams?: {
    page?: string,
    q?: string,
    sort?: string,
    order?: string
  }
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/');

  const notes = await prisma.note.findMany({
    where: {
      userId: currentUser.id,
      title: {
        contains: searchParams?.q
      }
    },
    orderBy: {
      [searchParams?.sort ?? 'updatedAt']: searchParams?.order ?? 'desc'
    },
    take: 10
  })

  return (
    <main className="h-full flex flex-col sm:gap-2">
      <WorkContainer className="sm:p-0 px-4 w-full">
        <div className="sm:fixed w-fit sm:ms-0 ms-auto top-4 right-4 sm:pt-0 pt-4">
          <ProfileBar currentUser={currentUser} />
        </div>
        <header className="sm:my-16 my-8 text-center">
          <h1 className={`sm:text-4xl text-2xl font-bold ${poppins.className}`}>Your Notes</h1>
        </header>
        <div className="sm:block hidden">
          <NotesBar />
        </div>
      </WorkContainer>
      <div className="flex-grow sm:overflow-y-scroll p-4">
        <div className="sticky top-0 py-3 bg-background-2 sm:hidden block">
          <NotesBar />
        </div>
        <Suspense>
          <WorkContainer className="flex flex-col sm:gap-4 gap-2">
            {notes.length > 0 ?
              notes.map((note) => 
                <NoteItem
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  content={note.shorter}
                  icon={note.categoryId ?? ''}
                  commentCount={0}
                  starCount={0}
                  isPublic={note.isPublic}
                  date={note.updatedAt}
                />) : (
                  <NotesClientEmptyLabel />
                )
            }
          </WorkContainer>
        </Suspense>
      </div>
    </main>
  )
}