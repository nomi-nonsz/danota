'use client'

export const EmptyLabel = ({
  title, description, icon
}: {
  title: React.ReactNode,
  description?: string,
  icon?: React.ReactNode
}) => (
  <div className="text-center py-4 text-foreground/50">
    {icon}
    <h2 className="text-xl">{title}</h2>
    {description && <p>{description}</p>}
  </div>
)