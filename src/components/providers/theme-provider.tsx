"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  defaultTheme,
  attribute = "class",
  enableSystem = true,
  disableTransitionOnChange = true,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider
    attribute={attribute}
    defaultTheme={'system'}
    enableSystem={enableSystem}
    disableTransitionOnChange={disableTransitionOnChange}
    {...props}
  />
}