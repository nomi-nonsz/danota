'use client'

import { useCollectionModal } from "@/hooks/disclosures/use-collection-modal"
import { PlusIcon } from "lucide-react"

export const AddCollectionButton = () => {
  const { onOpen } = useCollectionModal();

  return (
    <button className="rounded-md bg-primary flex justify-center items-center gap-2 p-8 text-lg w-full" onClick={ onOpen}>
      <PlusIcon />
      Add new collection
    </button>
  )
}