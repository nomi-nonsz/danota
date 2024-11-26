import { Metadata } from "next";

import { SideNav } from "@/components/single/navigation/side-nav";
import { NoteModal } from "@/components/single/modal/note-modal";
import { AlertDialog } from "@/components/single/modal/alert-dialog";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your dashboard"
}

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex flex-row h-screen">
        <div className="flex-none sm:block hidden">
          <SideNav />
        </div>
        <div className="relative flex-grow bg-background-2">
          {children}
        </div>
      </main>
      <NoteModal />
      <AlertDialog />
    </>
  )
}