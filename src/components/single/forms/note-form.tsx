'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRefreshAlert } from "@/hooks/use-refresh-alert"
import { Switch } from "@/components/ui/switch"

const noteSchema = z.object({
  title: z.string().min(1),
  isPublic: z.boolean()
})

export const NoteForm = () => {
  const form = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      isPublic: false
    },
  })

  useRefreshAlert(form.formState.isDirty);
 
  function onSubmit(values: z.infer<typeof noteSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note title</FormLabel>
              <FormControl>
                <Input placeholder="School resume..." {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Public</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button className="w-full font-bold py-4 h-fit" type="submit">Continue</Button>
      </form>
    </Form>
  )
}