'use client'

import { EllipsisVertical, PanelBottomIcon, PanelRightIcon, RefreshCwIcon, Settings } from "lucide-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Switch } from "./switch";
import { usePreferences } from "@/hooks/use-preferencesx";

export const ToolbarMenu = ({
  bottom = true,
  onMoveTo
}: {
  bottom?: boolean,
  onMoveTo?: () => void,
}) => {
  const preferences = usePreferences();

  const toggleAutoSave = () => preferences.toggle("autoSave");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="font-bold h-12">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]" side={bottom ? "bottom" : "right"}>
        <label className="text-base p-3 flex justify-between items-center">
          <div className="flex gap-2">
            <RefreshCwIcon size={20} />
            Auto save
          </div>
          <Switch checked={preferences.autoSave ?? false} onClick={toggleAutoSave} />
        </label>
        <DropdownMenuItem className="[&_svg]:size-auto text-base p-3">
          <Settings size={20} />
          Note Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="[&_svg]:size-auto text-base p-3" onClick={onMoveTo}>
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