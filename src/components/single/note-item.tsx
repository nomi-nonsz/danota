'use client'

import { format } from "date-fns";
import {
  EllipsisVerticalIcon,
  GlobeIcon,
  icons,
  LockIcon,
  MessageSquareIcon,
  PencilIcon,
  StarIcon,
  TrashIcon,
} from "lucide-react";
import { useAlert } from "@/hooks/use-alert";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface NoteItemProps {
  id: string | number;
  content?: React.ReactNode;
  isPublic: boolean;
  starCount: number;
  commentCount: number;
  date: Date;
  icon: keyof typeof icons;
}

export const NoteItem: React.FC<NoteItemProps> = ({
  id,
  content,
  isPublic,
  starCount,
  commentCount,
  date,
  icon
}) => {
  const Icon = icons[icon];
  const { dispatch } = useAlert();

  const onDelete = () => {
    dispatch({
      title: "Delete this note?",
      onConfirm: () => {}
    });
  }

  return (
    <div className="border rounded-md bg-background">
      <button className='p-6 text-left bg-background hover:bg-accent rounded-md'>
        <article className="space-y-2 [&_p]:text-muted-foreground">
          <h4 className="font-bold">How to make crispiest french fries</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.</p>
          <p>Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit....</p>
        </article>
      </button>
      <hr className="border-border" />
      <section className="p-4 flex justify-between items-center">
        <div className="flex gap-3 text-sm p-2">
          <Icon size={20} />
          <div className='border-s' />
          <div className="flex items-center gap-1">
            <LockIcon size={16} />
            {isPublic ? 'Public' : 'Private'}
          </div>
          {isPublic && <>
            <div className="flex items-center gap-1">
              <StarIcon size={16} />
              {starCount}
            </div>
            <div className="flex items-center gap-1">
              <MessageSquareIcon size={16} />
              {commentCount}
            </div>
          </>}
          <div className='border-s' />
          <div className="">
            {format(date, "K:mm a")}
            <span className="text-muted-foreground mx-2">·</span>
            {format(date, "MMM d, y")}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline-2"} className='w-10 h-10'>
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              {isPublic ? <>
                <LockIcon />
                Unpublish
              </> : <>
                <GlobeIcon />
                Publish
              </>}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PencilIcon />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-destructive focus:text-background focus:bg-destructive'
              onClick={onDelete}
            >
              <TrashIcon />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </div>
  )
}