import { Metadata } from "next";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { ClientPreferenceProvider, PreferencesProvider } from "@/hooks/use-preferencesx";

import { SideNav } from "@/components/single/navigation/side-nav";
import { NoteModal } from "@/components/single/modal/note-modal";
import { AlertDialog } from "@/components/single/modal/alert-dialog";
import { BottomNav } from "@/components/single/navigation/bottom-nav";
import { CollectionCreationModal } from "@/components/single/modal/collection-modal";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your dashboard"
}

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/");

  const preference = await prisma.setting.findUnique({
    where: { userId: currentUser.id }
  });

  return (
    <>
      <main className="flex sm:flex-row flex-col h-screen bg-accent">
        <ClientPreferenceProvider>
          <div className="flex-none sm:block hidden">
            <SideNav />
          </div>
          <div className="relative flex-grow bg-background-2 sm:overflow-y-auto overflow-y-scroll">
            {children}
          </div>
        </ClientPreferenceProvider>
        <div className="sm:hidden block sticky bottom-0">
          <BottomNav />
        </div>
      </main>
      <NoteModal />
      <CollectionCreationModal />
      <AlertDialog />
      <PreferencesProvider initValue={preference} />
    </>
  )
}