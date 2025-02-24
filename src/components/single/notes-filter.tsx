'use client'

import { ArrowDownWideNarrowIcon, ArrowUpDownIcon } from "lucide-react"

import { Button } from "../ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { useEffect, useState } from "react"
import { useFilterByParams } from "@/hooks/use-filter-byparam"

export const NotesFilter = () => {
  const params = useFilterByParams({ dontReplaceUrl: true });
  const [form, setForm] = useState({
    sort: 'updatedAt',
    order: 'desc',
  });
  const [isInitialized, setInitialized] = useState(false);

  const set = (key: keyof typeof form, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value
    }));
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => set(e.target.name as keyof typeof form, e.target.value)
  const onChangeSwitch = (key: keyof typeof form, value: string) => set(key, value)

  useEffect(() => {
    return () => {
      setInitialized(true);
    }
  }, [])

  useEffect(() => {
    if (isInitialized) params.set(form);
  }, [form])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline-2"} className="h-12 text-md [&_svg]:size-5">
          <ArrowDownWideNarrowIcon />
          <span className="sm:inline hidden">
            Sort
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <form onSubmit={(e) => { e.preventDefault() }}>
          <RadioGroup
            name="sort"
            className="p-4"
            defaultValue={form.sort}
            onChange={onChangeInput}
          >
            <label className="flex items-center gap-2">
              <RadioGroupItem value="title" />
              By title
            </label>
            <label className="flex items-center gap-2">
              <RadioGroupItem value="updatedAt" />
              By date
            </label>
            <label className="flex items-center gap-2">
              <RadioGroupItem value="star" />
              By star
            </label>
            <label className="flex items-center gap-2">
              <RadioGroupItem value="comments" />
              By comments
            </label>
          </RadioGroup>
          <div className="border-b"></div>
          <div className="p-2">
            <Select
              defaultValue={form.order}
              name="order"
              onValueChange={(value) => onChangeSwitch('order', value)}
            >
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