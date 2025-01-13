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

export const CollectionItem = ({
  id, name, description
}: {
  id: string | number
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline-2"} className='w-10 h-10'>
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start">
            <DropdownMenuItem>
              <PencilIcon />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-background dark:focus:text-foreground focus:bg-destructive">
              <TrashIcon />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}