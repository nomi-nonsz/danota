'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { OAuthButtons } from "@/components/ui/oauth-buttons"
import { SeparatorText } from "@/components/ui/separator-text"
import { useRefreshAlert } from "@/hooks/use-refresh-alert"
import { useAction } from "@/hooks/use-action"
import Link from "next/link"
import { signupSchema } from "@/schemas/auth-schema"
import { AvatarInput } from "@/components/ui/avatar-input"

export const RegisterForm = ({ csrfToken }: { csrfToken: string }) => {
  const { post, pending, errorMessage } = useAction();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      csrfToken,
      image: null,
      email: "",
      username: "",
      displayName: "",
      password: ""
    },
  })

  // useRefreshAlert(form.formState.isDirty);
 
  function onSubmit(values: z.infer<typeof signupSchema>) {
    post("/api/user", values, {
      success: {
        title: "Account creation success!",
        description: <><Link  href="/login">Login</Link> to continue the app</>,
      },
      redirect: () => `/login`,
    });
  }

  return (
    <Form {...form}>
      <OAuthButtons />
      <SeparatorText text="Or" className="my-1" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AvatarInput field={{
                  value: field.value ?? "",
                  onChange: field.onChange
                }} />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="px-5 py-6" type="email" placeholder="joe.mama@example.com" {...field} />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="px-5 py-6" type="text" placeholder="joemama213" {...field} />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input className="px-5 py-6" type="text" placeholder="Joe Mama" {...field} />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input className="px-5 py-6" type="password" placeholder="Min. 6 Caracters" {...field} />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <div className="text-sm text-destructive">
          {errorMessage}
        </div>
        <Button
          className="w-full font-bold py-4 text-lg h-fit [&_svg]:size-7"
          type="submit"
          isLoading={pending}
        >
          Continue
        </Button>
      </form>
    </Form>
  )
}