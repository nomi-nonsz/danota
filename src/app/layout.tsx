import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/fonts";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Danota",
  description: "Online Note",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
