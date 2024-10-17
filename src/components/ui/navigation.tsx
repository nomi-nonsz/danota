'use client'

import Link from "next/link"
import { Button } from "./button"

export const SimpleNav = () => {
  return (
    <nav className="flex justify-end w-screen p-3">
      <div className="flex gap-2">
        <Link href={"/login"}>
          <Button className="text-sm font-semibold py-2 px-3 h-fit" variant={"outline"}>Login</Button>
        </Link>
        <Link href={"/signup"}>
          <Button className="text-sm font-semibold py-2 px-3 h-fit">Sign Up</Button>
        </Link>
      </div>
    </nav>
  )
}