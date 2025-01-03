'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ClientUser } from "@/types/prisma"
import { UserIcon } from "lucide-react"

export const ProfileBar = ({
  currentUser
}: {
  currentUser: ClientUser | null
}) => {
  return (
    <div className="sm:w-64 sm:p-4 p-3 bg-background border rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="sm:w-12 sm:h-12">
          <AvatarImage src={currentUser?.image ?? ""} />
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
        <div className="text-left sm:text-base text-xs">
          <div className="font-bold">{currentUser?.name ?? "Guest"}</div>
          {currentUser?.username ?? "username"}
        </div>
      </div>
      <div className="text-muted-foreground">
        <UserIcon size={28} />
      </div>
    </div>
  )
}