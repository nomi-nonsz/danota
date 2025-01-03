import type { Metadata } from 'next'

import { NoteItem } from "@/components/single/note-item"
import { NotesBar } from "@/components/single/notes-bar"
import { ProfileBar } from "@/components/ui/profile-bar"
import { WorkContainer } from "@/components/ui/work-container"

import { poppins } from "@/lib/fonts"
 
export const metadata: Metadata = {
  title: 'Your Notes',
  description: 'This is where your notes saved',
}

export default function NotesPage () {
  return (
    <main className="h-full flex flex-col sm:gap-2">
      <WorkContainer className="sm:p-0 px-4 w-full">
        <div className="sm:fixed w-fit sm:ms-0 ms-auto top-4 right-4 sm:pt-0 pt-4">
          <ProfileBar />
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
        {/* suspense this */}
        <WorkContainer className="flex flex-col sm:gap-4 gap-2">
          {Array(5).fill("").map((_, a) => 
            <NoteItem
              key={a}
              id={a}
              icon="ChefHat"
              commentCount={21}
              starCount={34}
              isPublic={false}
              date={new Date(Date.now())}
            />)}
        </WorkContainer>
      </div>
    </main>
  )
}