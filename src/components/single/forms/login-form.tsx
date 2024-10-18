'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Link } from "@/components/ui/link"
import { OAuthButtons } from "@/components/ui/oauth-buttons"
import { SeparatorText } from "@/components/ui/separator-text"

const loginSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(2)
})

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <OAuthButtons />
      <SeparatorText text="Or" className="my-1" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div className="text-xs">
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
        <Button className="w-full" type="submit">Continue</Button>
      </form>
    </Form>
  )
}