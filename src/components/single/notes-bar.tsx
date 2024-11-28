'use client'

import { useState } from "react"
import { PlusIcon } from "lucide-react"

import { Button } from "../ui/button"
import { NotesFilter } from "./notes-filter"

import { SearchInput } from "@/components/ui/search-input"
import { useNoteModal } from "@/hooks/disclosures/use-notemodal"

export const NotesBar = () => {
  const noteModal = useNoteModal();
  const [isSearchFocused, setSearchFocused] = useState<boolean>(false);

  return (
    <div className="flex gap-2">
      <SearchInput
        className="flex-grow h-12"
        onFocusInput={() => setSearchFocused(true)}
        onBlurInput={() => setSearchFocused(false)}
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