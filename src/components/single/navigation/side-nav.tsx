'use client'

import { LogoTypography } from "@/components/ui/logo"
import { NavLinks } from "./nav-links"
import { Button } from "@/components/ui/button"
import { LogOutIcon, MoonIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const SideNav = () => {
  return (
    <div className="border-r border-border p-4 h-full flex flex-col justify-between">
      <div className="">
        <div className="py-10 text-center">
          <LogoTypography />
        </div>
        <div className="space-y-2">
          <NavLinks />
        </div>
      </div>
      <div className="flex gap-1 text-muted-foreground">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={'ghost'}>
                <LogOutIcon className="rotate-180" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={'ghost'}>
                <MoonIcon size={28} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Dark Mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}