'use client'

export const SettingsCard = ({
  title,
  children,
  icon: Icon,
}: {
  title: string,
  icon: React.ElementType,
  children: React.ReactNode
}) => (
  <div className="bg-background border rounded-xl">
    <header className="p-4 flex gap-2 items-center">
      <Icon />
      <h2 className="font-semibold text-lg">{title}</h2>
    </header>
    <hr className="border-border" />
    <div className="p-4">
      {children}
    </div>
  </div>
)