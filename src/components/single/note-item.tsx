'use client'

import { icons, LockIcon, MessageSquareIcon, StarIcon, } from 'lucide-react';
import { format } from 'date-fns';

interface NoteItemProps {
  content?: React.ReactNode;
  isPublic: boolean;
  starCount: number;
  commentCount: number;
  date: Date;
  icon: keyof typeof icons;
}

export const NoteItem: React.FC<NoteItemProps> = ({
  content,
  isPublic,
  starCount,
  commentCount,
  date,
  icon
}) => {
  const Icon = icons[icon];

  return (
    <div className="border rounded-md">
      <article className="p-6 space-y-2 [&_p]:text-muted-foreground">
        <h4 className="font-bold">How to make crispiest french fries</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.</p>
        <p>Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit....</p>
      </article>
      <hr className="border-border" />
      <section className="p-6 flex justify-between items-center">
        <div className="flex gap-3 text-sm">
          <Icon size={20} />
          <div className='border-s' />
          <div className="flex items-center gap-1">
            <LockIcon size={16} />
            {isPublic ? 'Public' : 'Private'}
          </div>
          <div className="flex items-center gap-1">
            <StarIcon size={16} />
            {starCount}
          </div>
          <div className="flex items-center gap-1">
            <MessageSquareIcon size={16} />
            {commentCount}
          </div>
          <div className='border-s' />
          <div className="">
            {format(date, "K:mm a")}
            <span className="text-muted-foreground mx-2">·</span>
            {format(date, "MMM d, Y")}
          </div>
        </div>
      </section>
    </div>
  )
}