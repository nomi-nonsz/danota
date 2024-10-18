import { cn } from "@/lib/utils"

export const SeparatorText = ({ className, text }: { className?: string, text: string }) => {
  return (
    <div className={cn("py-2 flex items-center", className)}>
      <div className="w-full h-[0.5px] bg-border"></div>
      <div className="text-muted-foreground px-2 text-sm">{text}</div>
      <div className="w-full h-[0.5px] bg-border"></div>
    </div>
  )
}