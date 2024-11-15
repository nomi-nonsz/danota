import { NoteItem } from "@/components/single/note-item"
import { NotesBar } from "@/components/single/notes-bar"
import { Button } from "@/components/ui/button"
import { ProfileBar } from "@/components/ui/profile-bar"

import { poppins } from "@/lib/fonts"
import { ArrowDownWideNarrowIcon, PlusIcon } from "lucide-react"

export default function NotesPage () {
  return (
    <main className="h-full flex flex-col gap-3 w-[960px] mx-auto">
      <div className="fixed top-4 right-4">
        <ProfileBar />
      </div>
      <header className="my-16 text-center">
        <h1 className={`text-4xl font-bold ${poppins.className}`}>Your Notes</h1>
      </header>
      <NotesBar />
      <br className="h-12" />
      <div className="flex flex-col gap-2 overflow-y-scroll flex-grow">
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
      </div>
    </main>
  )
}