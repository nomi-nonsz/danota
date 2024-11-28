import { Metadata } from "next";

import { SideNav } from "@/components/single/navigation/side-nav";
import { NoteModal } from "@/components/single/modal/note-modal";
import { AlertDialog } from "@/components/single/modal/alert-dialog";
import { BottomNav } from "@/components/single/navigation/bottom-nav";

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
      <main className="flex sm:flex-row flex-col h-screen">
        <div className="flex-none sm:block hidden">
          <SideNav />
        </div>
        <div className="relative flex-grow bg-background-2 sm:overflow-y-auto overflow-y-scroll">
          {children}
        </div>
        <div className="sm:hidden block sticky bottom-0">
          <BottomNav />
        </div>
      </main>
      <NoteModal />
      <AlertDialog />
    </>
  )
}