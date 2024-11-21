'use client'

import { ArrowDownWideNarrowIcon, ArrowUpDownIcon } from "lucide-react"

import { Button } from "../ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { Checkbox } from "../ui/checkbox"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const NotesFilter = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline-2"} className="h-12 text-md [&_svg]:size-5">
          <ArrowDownWideNarrowIcon />
          Sort
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <form onSubmit={(e) => { e.preventDefault() }}>
          <div className="p-2">
            <label className="flex items-center gap-2 p-2">
              <Checkbox />
              By title
            </label>
            <label className="flex items-center gap-2 p-2">
              <Checkbox />
              By date
            </label>
            <label className="flex items-center gap-2 p-2">
              <Checkbox />
              By star
            </label>
            <label className="flex items-center gap-2 p-2">
              <Checkbox />
              By comments
            </label>
          </div>
          <div className="border-b"></div>
          <div className="p-2">
            <Select defaultValue="desc">
              <SelectTrigger className="px-4 py-6">
                <div className="flex gap-2 items-center">
                  <ArrowUpDownIcon className="text-muted-foreground size-4" />
                  <SelectValue placeholder="Order" className="m-2" />
                </div>
              </SelectTrigger>
              <SelectContent className="[&_]">
                <SelectItem value="desc">Descending</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}