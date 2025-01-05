"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { usePreferences } from "@/hooks/use-preferencesx"

export function ThemeProvider({
  defaultTheme,
  attribute = "class",
  enableSystem = true,
  disableTransitionOnChange = true,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const preferences = usePreferences();
  const theme = preferences.darkMode ? 'dark' : 'light';

  return <NextThemesProvider
    attribute={attribute}
    defaultTheme={defaultTheme}
    forcedTheme={preferences.isInitialized ? theme : defaultTheme}
    enableSystem={enableSystem}
    disableTransitionOnChange={disableTransitionOnChange}
    {...props}
  />
}