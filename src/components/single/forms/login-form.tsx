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
import { useRefreshAlert } from "@/hooks/use-refresh-alert"
import { signIn } from "@/lib/auth"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

const loginSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(6)
})

export const LoginForm = ({ csrfToken }: { csrfToken: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // useRefreshAlert(form.formState.isDirty);
 
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        ...values,
        redirect: false
      });

      if (result?.error) {
        throw {
          x_message: "Invalid credentials"
        }
      }
      
      toast({
        title: "Sign in success!",
        description: "You can continue the app",
      })

      router.push("/");
    }
    catch (err: any) {
      const message = err.x_message || err.response?.data?.message || "Something went wrong";
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      })
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <OAuthButtons />
      <SeparatorText text="Or" className="my-1" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="px-5 py-6" type="email" placeholder="Email" {...field} />
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
                <Input className="px-5 py-6" type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div className="text-sm">
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
        <Button
          className="w-full font-bold py-4 h-fit text-lg"
          type="submit"
          disabled={loading}
        >
          Continue
        </Button>
      </form>
    </Form>
  )
}