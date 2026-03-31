import { create } from 'zustand'

export type Theme = 'dark' | 'light' | 'system'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem('app-theme') as Theme) || 'system',
  setTheme: (theme: Theme) => {
    localStorage.setItem('app-theme', theme)
    set({ theme })
  },
}))
