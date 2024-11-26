import { NoteItem } from "@/components/single/note-item"
import { NotesBar } from "@/components/single/notes-bar"
import { ProfileBar } from "@/components/ui/profile-bar"
import { WorkContainer } from "@/components/ui/work-container"

import { poppins } from "@/lib/fonts"

export default function NotesPage () {
  return (
    <main className="h-full flex flex-col gap-3">
      <WorkContainer className="sm:p-0 px-4">
        <div className="fixed top-4 right-4">
          <ProfileBar />
        </div>
        <header className="my-16 text-center">
          <h1 className={`text-4xl font-bold ${poppins.className}`}>Your Notes</h1>
        </header>
        <NotesBar />
      </WorkContainer>
      <div className="flex-grow overflow-y-scroll p-4">
        <WorkContainer className="flex flex-col gap-4">
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