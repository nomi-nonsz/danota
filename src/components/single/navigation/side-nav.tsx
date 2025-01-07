'use client'

import { cn } from "@/lib/utils"

import { LogoTypography } from "@/components/ui/logo"
import { NavLinks } from "./nav-links"
import { Button } from "@/components/ui/button"
import { ChevronsLeftIcon, LogOutIcon, MoonIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useResponsive } from "@/hooks/use-responsive"
import { signOut } from "next-auth/react"
import { usePreferences } from "@/hooks/use-preferencesx"
import { useTheme } from "next-themes"

export const SideNav = () => {
  const { setTheme } = useTheme();
  const { isTablet } = useResponsive();
  const { expandSidebar, toggle } = usePreferences();

  const toggleExpand = () => toggle('expandSidebar');
  const toggleDarkMode = () => setTheme(v => v === 'dark' ? 'light' : 'dark');

  const handleLogout = () => {
    signOut({
      redirect: true,
      redirectTo: '/'
    })
  }

  return (
    <div className={cn(
      "border-r border-border p-4 h-full flex flex-col justify-between relative transition-[width] bg-background",
      expandSidebar ? "w-[280px]" : "w-[90px]"
    )}>
      <Button
        variant={"outline-2"}
        className={cn(
          "absolute w-9 h-9 -right-4 z-20",
          expandSidebar ? "rotate-0" : "rotate-180"
        )}
        onClick={toggleExpand}
      >
        <ChevronsLeftIcon />
      </Button>
      <div className="">
        <div className={cn(
          "flex justify-center items-center transition-[height,transform,margin]",
          expandSidebar ? "h-32 mb-0 rotate-0 scale-1" : "h-40 mb-5 -rotate-90 scale-75"
        )}>
          <LogoTypography />
        </div>
        <div className="space-y-2">
          <NavLinks shrink={!expandSidebar} />
        </div>
      </div>
      <div className={cn(
        "flex gap-1 text-muted-foreground",
        expandSidebar ? "flex-row" : "flex-col-reverse"
      )}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={'ghost'} onClick={handleLogout}>
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
              <Button variant={'ghost'} onClick={toggleDarkMode}>
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