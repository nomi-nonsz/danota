
import { RegisterForm } from "@/components/single/forms/register-form";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import Image from "next/image";

export default function SignupPage () {
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
              Create a new account
            </CardTitle>
            <p className="text-sm">
              Already have a account? <Link href="/login">Login</Link>
            </p>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </div>
      </div>
    </main>
  )
}