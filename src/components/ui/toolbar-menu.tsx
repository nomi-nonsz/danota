'use client'

import { EllipsisVertical, PanelBottomIcon, PanelRightIcon, RefreshCwIcon, Settings } from "lucide-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export const ToolbarMenu = ({
  bottom = true,
  onMoveTo
}: {
  bottom?: boolean
  onMoveTo?: () => void
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="font-bold h-12">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" side={bottom ? "bottom" : "right"}>
        <DropdownMenuItem className="[&_svg]:size-auto text-sm p-2">
          <RefreshCwIcon size={18} />
          Auto save
        </DropdownMenuItem>
        <DropdownMenuItem className="[&_svg]:size-auto text-sm p-2">
          <Settings size={18} />
          Note Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="[&_svg]:size-auto text-sm p-2" onClick={onMoveTo}>
          {bottom ? (<>
            <PanelRightIcon size={18} />
            Move to the right
          </>) : (<>
            <PanelBottomIcon size={18} />
            Move to the bottom
          </>)}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}