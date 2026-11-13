import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
export type Theme = 'light' | 'dark'
type ThemeValue = { theme: Theme; toggleTheme: () => void }
export const ThemeContext = createContext<ThemeValue | null>(null)
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => localStorage.getItem('mystat-theme') === 'dark' ? 'dark' : 'light')
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('mystat-theme', theme) }, [theme])
  const toggleTheme = useCallback(() => setTheme(current => current === 'light' ? 'dark' : 'light'), [])
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

