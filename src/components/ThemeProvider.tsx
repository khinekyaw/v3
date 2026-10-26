import { useCallback, useMemo, useState, type ReactNode } from "react"
import { PixelCurtain } from "./pixel"
import { ThemeContext, applyTheme, useThemeValue } from "../hooks/useTheme"

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useThemeValue()
  const [switchCount, setSwitchCount] = useState(0)
  const [switching, setSwitching] = useState(false)

  const toggleTheme = useCallback(() => {
    if (switching) return
    setSwitching(true)
    setSwitchCount((c) => c + 1)
  }, [switching])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
      {switching && (
        <PixelCurtain
          key={switchCount}
          onCovered={() => applyTheme(theme === "dark" ? "light" : "dark")}
          onDone={() => setSwitching(false)}
        />
      )}
    </ThemeContext.Provider>
  )
}
