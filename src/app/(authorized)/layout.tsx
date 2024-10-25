import { Metadata } from "next";

import { SideNav } from "@/components/single/navigation/side-nav";

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
        <div className="w-[260px] flex-none">
          <SideNav />
        </div>
        <div className="overflow-y-auto flex-grow p-16">
          {children}
        </div>
      </main>
    </>
  )
}