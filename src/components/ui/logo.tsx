'use client'

import { blinker } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export const LogoTypography = () => {
  return (
    <div className={cn("text-secondary-foreground font-bold text-3xl", blinker.className)}>
      Danota
      <span className="text-white ms-1.5 px-2 py-1 bg-primary rounded-md">
        Beta
      </span>
    </div>
  )
}