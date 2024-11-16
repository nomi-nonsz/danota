import { poppins } from "@/lib/fonts"
import { SettingsClient } from "./client"

export default function NotesPage () {
  return (
    <main className="h-full flex flex-col gap-7">
      <header className="my-16 text-center">
        <h1 className={`text-4xl font-bold ${poppins.className}`}>Settings</h1>
      </header>
      <SettingsClient />
    </main>
  )
}