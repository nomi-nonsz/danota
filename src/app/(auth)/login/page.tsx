import { LoginForm } from "@/components/single/forms/login-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";

export default function LoginPage () {
  return (
    <main className="">
      <div className="sm:my-20 my-6">
        <Card className="w-[380px] mx-auto sm:border-solid border-none">
          <CardHeader className="">
            <CardTitle className="text-2xl font-bold">
              Login
            </CardTitle>
            <p className="text-sm">
              Don't have any account? <Link href="/signup">Create new</Link>
            </p>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>      
      </div>
    </main>
  )
}