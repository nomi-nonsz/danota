import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { CollectionBar } from '@/components/single/collection-bar'
import { ProfileBar } from "@/components/ui/profile-bar"
import { WorkContainer } from "@/components/ui/work-container"

import prisma from '@/lib/prisma'
import { poppins } from "@/lib/fonts"
import { getCurrentUser } from '@/lib/auth'
import { NoteItem } from '@/components/single/note-item'
import { NotesClientEmptyLabel } from '../../notes/client'

export async function generateMetadata(
  { params }: {
    params: Promise<{collectionId: string}>
  },
): Promise<Metadata> {
  const id = (await params).collectionId;
 
  const collection = await prisma.collection.findUnique({
    select: {
      id: true,
      name: true,
    },
    where: { id }
  });
 
  return {
    title: !!collection ? collection.name : "Untitled collection",
    description: "Notes of this collection"
  }
}

export default async function CollectionPage ({
  params
}: {
  params: {
    collectionId: string
  }
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/');

  const collection = await prisma.collection.findUnique({
    where: {
      id: params.collectionId,
      userId: currentUser.id
    },
    include: {
      notes: {
        take: 10
      }
    }
  });

  if (!collection) {
    notFound();
  }

  return (
    <main className="h-full flex flex-col sm:gap-2">
      <WorkContainer className="sm:p-0 px-4 w-full">
        <div className="sm:fixed w-fit sm:ms-0 ms-auto top-4 right-4 sm:pt-0 pt-4">
          <ProfileBar currentUser={currentUser} />
        </div>
        <header className="my-8 mt-16">
          <h2 className={`sm:text-2xl text-xl font-bold ${poppins.className}`}>{collection.name}</h2>
          {collection.description && <p className='mt-3 opacity-70'>{collection.description}</p>}
        </header>
      </WorkContainer>
      <div className="flex-grow sm:overflow-y-scroll p-4">
        <WorkContainer className="flex flex-col sm:gap-4 gap-2">
          {collection?.notes.length > 0 ?
            collection?.notes.map((note) => 
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
                isOnCollection
              />) : (
                <div className="text-center my-16">You haven't add notes to this collection yet</div>
              )
          }
        </WorkContainer>
      </div>
    </main>
  )
}