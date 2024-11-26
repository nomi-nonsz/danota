'use client'

import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"
import { forwardRef } from "react"

interface ISearchInput extends React.InputHTMLAttributes<HTMLDivElement> {
  field?: HTMLInputElement
}

export const SearchInput = forwardRef<HTMLDivElement, ISearchInput>(
  ({ className, field, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex border rounded-lg relative bg-background",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="p-3 absolute pointer-events-none top-1/2 -translate-y-1/2">
          <SearchIcon className="text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className={cn(
            "w-full p-3 ps-12 bg-transparent",
            field?.className
          )}
        />
      </div>
    )
})