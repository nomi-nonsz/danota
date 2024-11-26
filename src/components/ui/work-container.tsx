'use client'

import { cn } from "@/lib/utils"
import { forwardRef } from "react"

export const WorkContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      className={cn("w-[960px] mx-auto", className)}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  )
)