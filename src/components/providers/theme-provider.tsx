"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { usePreferences } from "@/hooks/use-preferencesx"

export function ThemeProvider({
  attribute = "class",
  defaultTheme = "light",
  disableTransitionOnChange = true,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const preferences = usePreferences();
  const theme = preferences.darkMode ? 'dark' : 'light';

  return <NextThemesProvider
    attribute={attribute}
    defaultTheme={defaultTheme}
    forcedTheme={theme}
    disableTransitionOnChange={disableTransitionOnChange}
    {...props}
  />
}