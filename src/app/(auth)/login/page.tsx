import { LoginForm } from "@/components/single/forms/login-form";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { genCsrf } from "@/lib/csrf";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Login Danota',
  description: 'Continue to Danota App',
}

export default function LoginPage () {
  const csrfToken = genCsrf();

  return (
    <div className="sm:py-20 py-6 flex-1 overflow-y-scroll">
      <div className="w-[480px] mx-auto">
        <CardHeader className="">
          <CardTitle className="text-3xl font-bold">
            Login
          </CardTitle>
          <p className="text-sm">
            Don't have any account? <Link href="/signup">Create new</Link>
          </p>
        </CardHeader>
        <CardContent>
          <LoginForm csrfToken={csrfToken} />
        </CardContent>
      </div>
    </div>
  )
}