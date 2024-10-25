'use client'

import { BoldIcon, ItalicIcon, Link2Icon, SaveIcon, UnderlineIcon } from "lucide-react"
import { Button } from "./button"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Badge } from "./badge";
import { SeparatorLite } from "./separator";

export const ToolbarButton = ({
  onClick,
  name,
  icon,
  hotkey
} : {
  onClick?: () => void,
  name: string,
  icon: any,
  hotkey?: React.ReactNode
}) => { 
  const Icon = icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"ghost"} onClick={onClick}>
            <Icon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {name}
            {hotkey && <Badge className="ms-1 bg-border/50 p-1 rounded-sm text-foreground">
              {hotkey}
            </Badge>}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const Toolbar = () => {
  return (
    <div className="flex rounded-2xl bg-background border w-fit shadow-lg">
      <section className="p-2 flex">
        <ToolbarButton
          icon={BoldIcon}
          name="Bold"
          hotkey="CTRL + B"
        />
        <ToolbarButton
          icon={UnderlineIcon}
          name="Underline"
          hotkey="CTRL + U"
        />
        <ToolbarButton
          icon={ItalicIcon}
          name="Italic"
          hotkey="CTRL + I"
        />
        <ToolbarButton
          icon={Link2Icon}
          name="Insert link"
        />
      </section>
      <SeparatorLite orientation="vertical" className="h-14" />
      <section className="p-2 flex">
        <Button variant={"default"} className="font-bold">
          <SaveIcon />
          Save
        </Button>
      </section>
    </div>
  )
}