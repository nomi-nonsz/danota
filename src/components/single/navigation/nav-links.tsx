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
    name: "Collections",
    path: "/collections",
    icon: icons.SquareLibrary,
  },
  {
    name: "Discover",
    path: "/discover",
    icon: icons.Telescope,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: icons.Settings,
  },
]

export const NavLinks = ({
  shrink
}: {
  shrink?: boolean
}) => {
  const noteModal = useNoteModal();

  const currentPath = usePathname();
  const currentTab = currentPath.split('/')[1]; // billboards or products or ...
  
  return <>
    <Button
      variant={'default'}
      className="w-full justify-start gap-3 px-[18px] py-4 h-fit rounded-xl font-bold overflow-hidden [&_svg]:size-6"
      onClick={noteModal.onOpen}
    >
      <icons.Plus size={40} className="" />
      <div className={cn(
        "transition-opacity",
        shrink ? "opacity-0" : "opacity-100"
      )}>
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
              "w-full justify-start gap-3 px-[18px] py-4 h-fit rounded-xl font-bold overflow-hidden [&_svg]:size-6",
              currentTab !== tab && "text-muted-foreground"
            )}
          >
            <LucideIcon size={40} className="" />
            <div className={cn(
              "transition-opacity",
              shrink ? "opacity-0" : "opacity-100"
            )}>
              {nav.name}
            </div>
          </Button>
        </Link>
      )
    })}
  </>
}