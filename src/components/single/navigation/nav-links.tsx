'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { icons, NotebookIcon, PlusIcon, SettingsIcon } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigations = [
  {
    name: "Create",
    path: "/create",
    variant: 'primary',
    icon: icons.Plus,
  },
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

export const NavLinks = ({
  shrink
}: {
  shrink?: boolean
}) => {
  const currentPath = usePathname();
  const currentTab = currentPath.split('/')[1]; // billboards or products or ...
  
  return navigations.map((nav) => {
    const tab = nav.path.split('/')[1];
    const LucideIcon = nav.icon;
    
    return (
      <Link href={nav.path} className="block" key={nav.name}>
        <Button
          variant={nav.variant === "primary" ? "default" : 'ghost'}
          className={cn(
            "w-full justify-start gap-3 px-[18px] py-4 h-fit rounded-xl font-bold overflow-hidden text-base [&_svg]:size-6",
            (currentTab !== tab && !nav.variant) && "text-muted-foreground"
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
  })
}