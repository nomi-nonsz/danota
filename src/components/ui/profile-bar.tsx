'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { UserIcon } from "lucide-react"

export const ProfileBar = () => {
  return (
    <div className="sm:p-4 p-3 bg-background border rounded-xl flex items-center gap-4">
      <Avatar className="sm:w-12 sm:h-12">
        <AvatarImage src="https://avatars.githubusercontent.com/u/65523690?v=4" />
        <AvatarFallback>
          <UserIcon />
        </AvatarFallback>
      </Avatar>
      <div className="text-left sm:text-base text-xs">
        <div className="font-bold">Joe Mama</div>
        joemama213
      </div>
      <div className="text-muted-foreground">
        <UserIcon size={28} />
      </div>
    </div>
  )
}