'use client'

import { Badge } from "@/components/ui/badge";
import { ProfileBar } from "@/components/ui/profile-bar";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LockIcon, PencilIcon } from "lucide-react";

export const EditorTopBar = ({
  isScrolled
} : {
  isScrolled?: boolean
}) => {
  return (
    <div className={cn(
      "flex justify-between sticky top-0 p-8 transition border-b",
      "bg-transparent backdrop-blur-0 border-transparent",
      isScrolled && "bg-background/30 backdrop-blur-lg border-border"
    )}>
      <div className="space-y-2">
        <header className="flex gap-2 items-center">
          <h1 className="text-3xl font-bold">My New note or sumthing</h1>
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
        <div className="flex gap-3">
          <div className="flex gap-2">
            <LockIcon size={20} />
            Private
          </div>
          <Badge variant="warning">Not saved</Badge>
        </div>
      </div>
      <ProfileBar />
    </div>
  )
}