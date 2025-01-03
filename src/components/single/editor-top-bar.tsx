'use client'

import { Badge } from "@/components/ui/badge";
import { ProfileBar } from "@/components/ui/profile-bar";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ClientUser } from "@/types/prisma";
import { GlobeIcon, LockIcon, PencilIcon } from "lucide-react";
import { EditableTitle } from "./editable-title";
import { useNoteStore } from "@/hooks/use-note-store";

export const EditorTopBar = ({
  isScrolled, currentUser
} : {
  currentUser: ClientUser | null,
  isScrolled?: boolean,
}) => {
  const { note } = useNoteStore();

  return (
    <div className={cn(
      "flex justify-between sticky top-0 p-8 transition border-b z-10",
      "bg-transparent backdrop-blur-0 border-transparent",
      isScrolled && "bg-background/70 backdrop-blur-lg border-border"
    )}>
      <div className="space-y-2">
        <EditableTitle prevTitle={note!.title ?? ""} />
        <div className="flex gap-3 items-center">
          <div className="flex gap-2">
            {note!.isPublic ? <>
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