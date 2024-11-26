'use client'

import { SearchInput } from "@/components/ui/search-input"
import { PlusIcon } from "lucide-react"
import { Button } from "../ui/button"
import { useNoteModal } from "@/hooks/disclosures/use-notemodal"
import { NotesFilter } from "./notes-filter"

export const NotesBar = () => {
  const noteModal = useNoteModal();

  return (
    <div className="flex gap-2">
      <SearchInput className="flex-grow h-12" />
      <NotesFilter />
      <Button
        variant={"default"}
        className="h-12 text-md [&_svg]:size-5"
        onClick={noteModal.onOpen}
      >
        <PlusIcon />
        Create new
      </Button>
    </div>
  )
}