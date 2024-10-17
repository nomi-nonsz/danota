'use client'

import { poppins } from "@/lib/fonts";
import { Button } from "../ui/button";

export default function Hero () {
  return (
    <section className="h-[70vh] text-center flex align-middle justify-center">
      <header className="h-fit my-auto w-[600px]">
        <h1 className={`font-bold text-3xl mb-6 ${poppins.className}`}>
          Write your note️, share with your friends, 🚀 online
        </h1>
        <Button className="font-bold">Create One</Button>
      </header>
    </section>
  )
}