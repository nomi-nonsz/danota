import { getCurrentUser } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function AuthLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  if (currentUser) redirect("/notes");

  return (
    <main className="flex flex-row h-screen">
      <Image
        className="hidden sm:block flex-1 object-cover pointer-events-none"
        src={"/images/blackbeard.jpg"}
        alt="blackbeard"
        width="1280"
        height="1280"
      />
      {children}
    </main>
  )
}