'use client'

import { forwardRef, HTMLAttributes } from "react"
import LinkElement from "next/link"
import { cn } from "@/lib/utils"

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, ...props }) => (
    <LinkElement
      className={cn("text-primary", className)}
      {...props}
    />
))