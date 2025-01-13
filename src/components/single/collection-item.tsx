'use client'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCollectionModal } from "@/hooks/disclosures/use-collection-modal";
import type { Collection as CollectionType } from "@prisma/client";
import { useAction } from "@/hooks/use-action";
import { useAlert } from "@/hooks/use-alert";

const CollectionMenu = ({
  data
}: {
  data: CollectionType
}) => {
  const collectionModal = useCollectionModal();
  const router = useRouter();
  const action = useAction();
  const { dispatch } = useAlert();

  const onDelete = () => {
    dispatch({
      title: "Delete this collection?",
      onConfirm: () => action.remove(`/api/collections/${data.id}`, {
        success: {
          title: "Collection deleted"
        }
      }).then(() => {
        router.refresh();
      })
    });
  }

  const onEdit = () => {
    collectionModal.setData(data);
    collectionModal.onOpen();
  }

  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant={"outline-2"} className='w-10 h-10'>
        <EllipsisVerticalIcon />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="right" align="start">
      <DropdownMenuItem onClick={onEdit}>
        <PencilIcon />
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem className="text-destructive focus:text-background dark:focus:text-foreground focus:bg-destructive" onClick={onDelete}>
        <TrashIcon />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}

export const CollectionItem = ({
  id, name, description
}: {
  id: string,
  name: string,
  description: string | null,
}) => {
  const router = useRouter();
  const onOpen = () => router.push(`/collection/${id}`);

  return (
    <div className="border rounded-md bg-background flex">
      <button className="p-6 text-left hover:bg-accent group w-full overflow-y-clip relative flex-grow" onClick={onOpen}>
        <h2 className="text-lg font-bold">{name}</h2>
        {description && <p className="text-foreground/60">{description}</p>}
      </button>
      <div className="p-6 border-s">
        <CollectionMenu data={{ id, name, description, userId: '' }} />
      </div>
    </div>
  )
}