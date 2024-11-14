'use client'

import { cn } from "@/lib/utils"
import { forwardRef } from "react"

export const ContentContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      className={cn("w-[960px]", className)}
      {...props}
    />
))