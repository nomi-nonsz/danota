
import { RegisterForm } from "@/components/single/forms/register-form";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { genCsrf } from "@/lib/csrf";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Sign Up Danota',
  description: 'Create a now account',
}

export default function SignupPage () {
  const csrfToken = genCsrf();

  return (
    <div className="sm:my-20 my-6 flex-1">
      <div className="w-[480px] mx-auto">
        <CardHeader className="">
          <CardTitle className="text-3xl font-bold">
            Create a new account
          </CardTitle>
          <p className="text-sm">
            Already have a account? <Link href="/login">Login</Link>
          </p>
        </CardHeader>
        <CardContent>
          <RegisterForm csrfToken={csrfToken} />
        </CardContent>
      </div>
    </div>
  )
}