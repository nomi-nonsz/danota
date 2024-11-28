'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRefreshAlert } from "@/hooks/use-refresh-alert"

import { AccountSettingsForm } from "@/components/single/forms/account-settings-form"
import { SettingsCard } from "@/components/ui/settings-card"
import { WorkContainer } from "@/components/ui/work-container"
import { Form } from "@/components/ui/form"
import { EditorSettingsForm } from "@/components/single/forms/editor-settings-form"
import { Button } from "@/components/ui/button"

import { settingsSchema } from "@/schemas/settings-schema"

import { PencilRulerIcon, SaveIcon, TrashIcon, UserIcon } from "lucide-react"


export const SettingsClient = () => {
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      email: "ee",
      username: "",
      displayName: "",
      autoSave: false
    },
  })

  useRefreshAlert(form.formState.isDirty);

  const onSave = (values: z.infer<typeof settingsSchema>) => {
    console.log(values)
  }
  
  return (
    <WorkContainer className="sm:space-y-5 space-y-3 sm:p-0 px-4 pb-4">
      <Form {...form}>
        <SettingsCard title="Account" icon={UserIcon}>
          <AccountSettingsForm uid={"any id"} form={form} />
        </SettingsCard>
        <SettingsCard title="Editor" icon={PencilRulerIcon}>
          <EditorSettingsForm form={form} />
        </SettingsCard>
        <div className="p-4 bg-background border rounded-lg flex gap-3 justify-end">
          <Button variant={"destructive"} disabled={!form.formState.isDirty}>
            <TrashIcon />
            Discard Changes
          </Button>
          <Button variant={"default"} onClick={form.handleSubmit(onSave)} disabled={!form.formState.isDirty}>
            <SaveIcon />
            Save Changes
          </Button>
        </div>
      </Form>
    </WorkContainer>
  )
}