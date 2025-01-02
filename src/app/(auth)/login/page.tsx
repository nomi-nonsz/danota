import { LoginForm } from "@/components/single/forms/login-form";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { genCsrf } from "@/lib/csrf";
import Image from "next/image";

export default function LoginPage () {
  const csrfToken = genCsrf();

  return (
    <main className="flex flex-row h-screen">
      <Image
        className="hidden sm:block flex-1 object-cover pointer-events-none"
        src={"/images/blackbeard.jpg"}
        alt="blackbeard"
        width="1280"
        height="1280"
      />
      <div className="sm:my-20 my-6 flex-1">
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
    </main>
  )
}