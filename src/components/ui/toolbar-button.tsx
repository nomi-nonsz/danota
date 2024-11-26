'use client'

import { cn } from "@/lib/utils";

import { Button } from "./button"
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./tooltip";
import { Badge } from "./badge";

export interface IToolbar {
  onClick?: () => void,
  name: string,
  label?: string,
  icon: any,
  hotkey?: React.ReactNode,
  isActive?: boolean,
}

export const ToolbarButton = ({
  onClick,
  name,
  label,
  icon,
  hotkey,
  isActive
} : IToolbar) => { 
  const Icon = icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              "w-12 h-12",
              isActive && "bg-primary-foreground text-primary"
            )}
            variant={"ghost"}
            onClick={onClick}
          >
            <Icon />
            <span className="sr-only">
              {name}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="pointer-events-none">
          <p>
            {label}
            {hotkey && <Badge className="ms-1 bg-border/50 p-1 rounded-sm text-foreground">
              {hotkey}
            </Badge>}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}