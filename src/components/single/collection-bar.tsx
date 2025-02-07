'use client'

import { useState } from "react"
import { PlusIcon } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"

import { Button } from "../ui/button"

import { SearchInput } from "@/components/ui/search-input"
import { useCollectionModal } from "@/hooks/disclosures/use-collection-modal"
import { useFilterByParam } from "@/hooks/use-filter-byparam"

export const CollectionBar = () => {
  const collectionModal = useCollectionModal();

  const search = useFilterByParam('q');

  const [isSearchFocused, setSearchFocused] = useState<boolean>(false);
  
  const onSearch = useDebouncedCallback(search.onChange, 500);

  const onOpen = () => {
    collectionModal.onOpen();
    collectionModal.clearData();
  }

  return (
    <div className="flex gap-2">
      <SearchInput
        className="flex-grow h-12"
        onFocusInput={() => setSearchFocused(true)}
        onBlurInput={() => setSearchFocused(false)}
        onChange={onSearch}
      />
      {!isSearchFocused && (
        <Button
          variant={"default"}
          className="h-12 text-md [&_svg]:size-5"
          onClick={onOpen}
        >
          <PlusIcon />
          <span className="sm:inline hidden">
            Create collection
          </span>
        </Button>
      )}
    </div>
  )
}