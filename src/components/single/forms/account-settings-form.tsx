'use client'

import { Input } from "@/components/ui/input"

import { FormField, FormItem, FormControl, FormMessage, FormLabel, FormDescription } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import { settingsSchema } from "@/schemas/settings-schema"
import { Button } from "@/components/ui/button"
import { CopyIcon } from "lucide-react"
import { CopyButton } from "@/components/ui/copy-button"

export const AccountSettingsForm = ({
  uid,
  form
}: {
  uid: string | number,
  form: UseFormReturn<typeof settingsSchema._type>
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(uid.toString());
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>
                This is your unique identity
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter display name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name, can changed anytime
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input className="w-auto" type="email" placeholder="Enter email" {...field} />
            </FormControl>
            <FormDescription>
              If anything happens to your account, we will send it to this address
            </FormDescription>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <FormItem className="flex-1">
        <FormLabel>User ID</FormLabel>
        <div className="flex gap-2">
          <Input className="w-fit" type="text" value={uid} disabled />
          <CopyButton text={uid.toString()} />
        </div>
      </FormItem>
    </div>
  )
}