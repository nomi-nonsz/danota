'use client'

import { Badge } from "@/components/ui/badge";
import { ProfileBar } from "@/components/ui/profile-bar";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ClientUser } from "@/types/prisma";
import { GlobeIcon, LockIcon, PencilIcon } from "lucide-react";

export const EditorTopBar = ({
  isScrolled, currentUser, title, isPublic
} : {
  currentUser: ClientUser | null,
  isScrolled?: boolean,
  title: string,
  isPublic: boolean
}) => {
  return (
    <div className={cn(
      "flex justify-between sticky top-0 p-8 transition border-b z-10",
      "bg-transparent backdrop-blur-0 border-transparent",
      isScrolled && "bg-background/70 backdrop-blur-lg border-border"
    )}>
      <div className="space-y-2">
        <header className="flex gap-2 items-center">
          <h1 className="text-3xl font-bold">{title}</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="p-3">
                <PencilIcon className="text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit note information</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </header>
        <div className="flex gap-3 items-center">
          <div className="flex gap-2">
            {isPublic ? <>
              <GlobeIcon size={20} />
              Publish
            </> : <>
              <LockIcon size={20} />
              Private
            </>}
          </div>
          <Badge variant="warning">Not saved</Badge>
        </div>
      </div>
      <ProfileBar currentUser={currentUser} />
    </div>
  )
}