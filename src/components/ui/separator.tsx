"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface SeparatorLiteProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

const SeparatorLite = React.forwardRef<
  HTMLDivElement,
  SeparatorLiteProps
>(
  (
    { className, orientation, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
SeparatorLite.displayName = "SeparatorLite";

export { SeparatorLite }
