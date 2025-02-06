import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { NotesBar } from "@/components/single/notes-bar"
import { ProfileBar } from "@/components/ui/profile-bar"
import { WorkContainer } from "@/components/ui/work-container"
import { CollectionItem } from '@/components/single/collection-item'
import { AddCollectionButton } from '@/components/single/buttons/add-collection-button'

import prisma from '@/lib/prisma'
import { poppins } from "@/lib/fonts"
import { getCurrentUser } from '@/lib/auth'
 
export const metadata: Metadata = {
  title: 'Collections',
  description: 'This is where your collections',
}

export default async function CollectionsPage () {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/');

  const collections = await prisma.collection.findMany({
    where: { userId: currentUser.id },
    take: 10
  });

  return (
    <main className="h-full flex flex-col sm:gap-2">
      <WorkContainer className="sm:p-0 px-4 w-full">
        <div className="sm:fixed w-fit sm:ms-0 ms-auto top-4 right-4 sm:pt-0 pt-4">
          <ProfileBar currentUser={currentUser} />
        </div>
        <header className="sm:my-16 my-8 text-center">
          <h1 className={`sm:text-4xl text-2xl font-bold ${poppins.className}`}>Collections</h1>
        </header>
        <AddCollectionButton />
      </WorkContainer>
      <div className="flex-grow sm:overflow-y-scroll p-4">
        <WorkContainer className="flex flex-col sm:gap-4 gap-2">
          {collections.map((collection) => (
            <CollectionItem
              key={collection.id}
              id={collection.id}
              name={collection.name}
              description={collection.description}
            />
          ))}
        </WorkContainer>
      </div>
    </main>
  )
}