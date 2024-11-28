
import { RegisterForm } from "@/components/single/forms/register-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";

export default function SignupPage () {
  return (
    <main className="">
      <div className="sm:my-20 my-6">
        <Card className="w-[380px] mx-auto sm:border-solid border-none">
          <CardHeader className="">
            <CardTitle className="text-2xl font-bold">
              Create a new account
            </CardTitle>
            <p className="text-sm">
              Already have a account? <Link href="/login">Login</Link>
            </p>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>      
      </div>
    </main>
  )
}