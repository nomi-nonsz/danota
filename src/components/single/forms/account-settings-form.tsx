'use client'

import { Input } from "@/components/ui/input"

import { FormField, FormItem, FormControl, FormMessage, FormLabel, FormDescription } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import { settingsSchema } from "@/schemas/settings-schema"

export const AccountSettingsForm = ({
  form
}: {
  form: UseFormReturn<typeof settingsSchema._type>
}) => {
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
                <Input type="text" placeholder="joemama213" {...field} />
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
                <Input type="text" placeholder="Joe Mama" {...field} />
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
                <Input type="email" placeholder="joe.mama@example.com" {...field} />
              </FormControl>
              <FormDescription>
                If anything happens to your account, we will send it to this address
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
    </div>
  )
}