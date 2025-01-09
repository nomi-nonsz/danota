'use client'

import { useState } from "react"
import { PlusIcon } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "../ui/button"
import { NotesFilter } from "./notes-filter"

import { SearchInput } from "@/components/ui/search-input"
import { useNoteModal } from "@/hooks/disclosures/use-notemodal"
import { useFilterByParam } from "@/hooks/use-filter-byparam"

export const NotesBar = () => {
  const noteModal = useNoteModal();
  const searchParams = useSearchParams();

  const search = useFilterByParam(searchParams, 'q');

  const [isSearchFocused, setSearchFocused] = useState<boolean>(false);
  
  const onSearch = useDebouncedCallback(search.onChange, 500);

  return (
    <div className="flex gap-2">
      <SearchInput
        className="flex-grow h-12"
        onFocusInput={() => setSearchFocused(true)}
        onBlurInput={() => setSearchFocused(false)}
        onChange={onSearch}
      />
      {!isSearchFocused && <>
        <NotesFilter />
        <Button
          variant={"default"}
          className="h-12 text-md [&_svg]:size-5"
          onClick={noteModal.onOpen}
        >
          <PlusIcon />
          <span className="sm:inline hidden">
            Create new
          </span>
        </Button>
      </>}
    </div>
  )
}