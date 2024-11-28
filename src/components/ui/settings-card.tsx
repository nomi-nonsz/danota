'use client'

import { LucideIcon } from "lucide-react"

export const SettingsCard = ({
  title,
  children,
  icon: Icon,
}: {
  title: string,
  icon: LucideIcon,
  children: React.ReactNode
}) => (
  <div className="bg-background border rounded-xl">
    <header className="p-4 flex gap-2 items-center">
      <Icon className="sm:size-auto size-5" />
      <h2 className="font-semibold sm:text-lg">{title}</h2>
    </header>
    <hr className="border-border" />
    <div className="p-4">
      {children}
    </div>
  </div>
)