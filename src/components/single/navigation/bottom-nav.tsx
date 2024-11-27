'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { icons } from "lucide-react"

import { cn } from "@/lib/utils";
import { useNoteModal } from "@/hooks/disclosures/use-notemodal";
import { Button } from "@/components/ui/button";

const navigations = [
  {
    name: "Your Notes",
    path: "/notes",
    icon: icons.Notebook,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: icons.Settings,
  },
]

export const BottomNav = () => {
  const noteModal = useNoteModal();

  const currentPath = usePathname();
  const currentTab = currentPath.split('/')[1]; // billboards or products or ...
  
  return (
    <div className="px-6 py-2 bg-background flex flex-row justify-around items-center">
      <Button
        variant={'default'}
        className="p-6 w-[80px] rounded-xl [&_svg]:size-auto flex flex-col -gap-1"
        onClick={noteModal.onOpen}
      >
        <icons.Plus size={20} className="pt-1" />
        <div className="text-[10px]">
          Create
        </div>
      </Button>
      {navigations.map((nav) => {
        const tab = nav.path.split('/')[1];
        const LucideIcon = nav.icon;
        
        return (
          <Link href={nav.path} className="block" key={nav.name}>
            <Button
              variant={'ghost'}
              className={cn(
                "p-6 w-[80px] rounded-xl [&_svg]:size-auto flex flex-col -gap-1",
                currentTab === tab && "text-primary hover:text-primary hover:bg-primary-foreground"
              )}
            >
              <LucideIcon size={20} className="pt-1" />
              <div className="text-[10px]">
                {nav.name}
              </div>
            </Button>
          </Link>
        )
      })}
    </div>
  )
}