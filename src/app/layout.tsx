import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/fonts";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Setting } from "@prisma/client";

export const metadata: Metadata = {
  title: "Danota",
  description: "Online Note",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  let preference: Setting | null = null;
  if (currentUser) preference = await prisma.setting.findUnique({ where: { userId: currentUser.id ?? '' } });

  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider defaultTheme={!!preference?.darkMode ? 'dark' : 'light'}>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
