'use client'

import { Link } from "../ui/link"

export const Footer = () => {
  return (
    <footer className="home-container text-center text-sm mt-12">
      <div className="py-4">
        <div className="">
          © 2024 Nomi Nonsense
        </div>
        <Link href="/privacy-policy">
          Privacy & Policy
        </Link>
      </div>
    </footer>
  )
}