import { poppins } from "@/lib/fonts"
import { SettingsClient } from "./client"

export default function NotesPage () {
  return (
    <main className="h-full flex flex-col gap-7">
      <header className="sm:my-16 mb-2 mt-8 text-center">
        <h1 className={`sm:text-4xl text-2xl font-bold ${poppins.className}`}>Settings</h1>
      </header>
      <SettingsClient />
    </main>
  )
}