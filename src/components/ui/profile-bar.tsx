'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { UserIcon } from "lucide-react"

export const ProfileBar = () => {
  return (
    <div className="p-4 bg-background border rounded-xl flex items-center gap-4">
      <Avatar className="w-12 h-12">
        <AvatarImage src="https://avatars.githubusercontent.com/u/65523690?v=4" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="text-left">
        <div className="font-bold">Joe Mama</div>
        joemama213
      </div>
      <div className="text-muted-foreground">
        <UserIcon size={28} />
      </div>
    </div>
  )
}