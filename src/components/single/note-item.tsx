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
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getCategory } from "@/data/categories";
import { useAction } from "@/hooks/use-action";

interface NoteItemProps {
  id: string | number;
  title: string;
  content: string | null;
  isPublic: boolean;
  starCount: number;
  commentCount: number;
  date: Date;
  icon: string;
}

export const NoteItem: React.FC<NoteItemProps> = ({
  id,
  title,
  content,
  isPublic,
  starCount,
  commentCount,
  date,
  icon
}) => {
  const category = getCategory(icon);
  const action = useAction();
  const Icon = icons[category?.icon ?? 'NotebookPen'];
  const { dispatch } = useAlert();
  const { push } = useRouter();

  const onDelete = () => {
    dispatch({
      title: "Delete this note?",
      onConfirm: () => action.remove(`/api/notes/${id}`, {
        success: {
          title: "Note deleted"
        }
      })
    });
  }

  const onOpen = () => push(`/note/${id}`);

  return (
    <div className="border rounded-md bg-background">
      <button className='flex flex-col p-6 text-left bg-background hover:bg-accent group rounded-md w-full h-44 overflow-y-clip relative' onClick={onOpen}>
        <h3 className="font-bold text-xl mb-3">{title}</h3>
        <article
          className="note-content space-y-2 text-muted-foreground sm:[&_p]:text-base [&_p]:text-xs"
          dangerouslySetInnerHTML={{ __html: content ?? "" }}
        />
        <div className={cn(
          "absolute inset-0 mx-auto mt-auto w-full h-1/2",
          "bg-gradient-to-b from-background/0 via-background via-90% to-background",
          "group-hover:from-accent/0 group-hover:via-accent group-hover:to-accent"
        )} />
      </button>
      <hr className="border-border" />
      <section className="p-4 flex justify-between items-center">
        <div className="flex gap-3 sm:text-sm text-xs p-2">
          <Icon size={20} />
          <div className='border-s' />
          <div className="flex items-center gap-1">
            <LockIcon size={16} />
            <span className="sm:inline hidden">
              {isPublic ? 'Public' : 'Private'}
            </span>
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
            <span className="text-muted-foreground mx-1">·</span>
            {format(date, "MMM d, y")}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline-2"} className='w-10 h-10'>
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start">
            <DropdownMenuItem className="pr-14">
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
              className='text-destructive focus:text-background dark:focus:text-foreground focus:bg-destructive'
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