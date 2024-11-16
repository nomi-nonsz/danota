'use client'

import { forwardRef } from "react"
import { Switch } from "./switch"
import { FormLabel, FormControl } from "./form"

import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

interface SwitchFormProps extends React.HTMLAttributes<HTMLDivElement> {
  field: Omit<React.ComponentPropsWithRef<typeof SwitchPrimitives.Root>, 'value' | 'onChange'> & {
    value?: boolean,
    onChange?: (value: boolean) => void
  };
  label: string
}

export const SwitchForm = forwardRef<HTMLDivElement, SwitchFormProps>(
  ({ className, field, label, ...props }, ref) => (
    <div
      className={cn("flex justify-between items-center", className)}
      ref={ref}
      {...props}
    >
      <FormLabel className={cn(field.disabled && "text-muted-foreground")}>{label}</FormLabel>
      <FormControl>
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
          disabled={field.disabled}
          ref={field.ref}
        />
      </FormControl>
    </div>
  )
)