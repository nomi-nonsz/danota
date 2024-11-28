'use client'

import { cn } from "@/lib/utils"
import { forwardRef } from "react"

export const WorkContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      className={cn("xl:w-[960px] lg:w-[640px] sm:w-[480px] w-auto mx-auto", className)}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  )
)