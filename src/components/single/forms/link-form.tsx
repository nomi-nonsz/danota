'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"

const linkSchema = z.object({
  url: z.string().url(),
})

export const LinkForm = ({
  onSubmit
}: {
  onSubmit?: (url: string) => void
}) => {
  const form = useForm<z.infer<typeof linkSchema>>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      url: ""
    },
  })
 
  function _onSubmit(values: z.infer<typeof linkSchema>) {
    onSubmit?.(values.url);
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(_onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormControl>
                  <Input className="w-[240px]" type="text" placeholder="Enter url" {...field} />
                </FormControl>
                <Button className="font-bold" type="submit">Insert</Button>
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}