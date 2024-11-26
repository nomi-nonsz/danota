'use client'

import { Input } from "@/components/ui/input"

import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import { settingsSchema } from "@/schemas/settings-schema"
import { Switch } from "@/components/ui/switch"
import { SwitchForm } from "@/components/ui/switch-form"

export const EditorSettingsForm = ({
  form
}: {
  form: UseFormReturn<typeof settingsSchema._type>
}) => {
  return (
    <div className="space-y-3 [&_input]:w-fit">
      <FormField
        control={form.control}
        name="autoSave"
        render={({ field }) => (
          <FormItem> 
            <SwitchForm label="Auto save" field={field} />
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  )
}