'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NotebookIcon, PlusIcon, SettingsIcon } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigations = [
  {
    name: "Create",
    path: "/create",
    variant: 'primary',
    icon: PlusIcon,
  },
  {
    name: "Your Notes",
    path: "/notes",
    icon: NotebookIcon,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: SettingsIcon,
  },
]

export const NavLinks = () => {
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
            "w-full justify-start gap-3 px-4 py-6 rounded-xl font-bold",
            (currentTab !== tab && !nav.variant) && "text-muted-foreground"
          )}
        >
          <LucideIcon size={20} />
          <div className="">
            {nav.name}
          </div>
        </Button>
      </Link>
    )
  })
}