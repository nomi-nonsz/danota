'use client'

import { DownloadIcon, EllipsisVertical, PanelBottomIcon, PanelRightIcon, RefreshCwIcon, Settings } from "lucide-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Switch } from "./switch";
import { usePreferences } from "@/hooks/use-preferencesx";
import { useDisclosure } from "@/hooks/use-diclosure";
import { NoteSettingsModal } from "../single/modal/note-modal";

export const ToolbarMenu = ({
  bottom = true,
  onMoveTo
}: {
  bottom?: boolean,
  onMoveTo?: () => void,
}) => {
  const preferences = usePreferences();
  const noteSettings = useDisclosure();

  const toggleAutoSave = () => preferences.toggle("autoSave");

  const onSettings = () => noteSettings.onOpen();

  return (
    <DropdownMenu>
      <NoteSettingsModal
        open={noteSettings.isOpen}
        onClose={noteSettings.onClose}
        onToggle={noteSettings.onToggle}
      />
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="font-bold h-12">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]" side={bottom ? "top" : "right"}>
        <label className="text-sm px-3 py-2 flex justify-between items-center">
          <div className="flex gap-2">
            <RefreshCwIcon size={20} />
            Auto save
          </div>
          <Switch checked={preferences.autoSave ?? false} onClick={toggleAutoSave} />
        </label>
        <DropdownMenuItem className="[&_svg]:size-auto">
          <DownloadIcon size={20} />
          Export
        </DropdownMenuItem>
        <DropdownMenuItem className="[&_svg]:size-auto" onClick={onSettings}>
          <Settings size={20} />
          Note Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="[&_svg]:size-auto" onClick={onMoveTo}>
          {bottom ? (<>
            <PanelRightIcon size={20} />
            Move to the right
          </>) : (<>
            <PanelBottomIcon size={20} />
            Move to the bottom
          </>)}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}