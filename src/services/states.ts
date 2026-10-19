import { createContextState } from 'foxact/create-context-state'

const [ThemeModeProvider, useThemeMode] = createContextState<'light' | 'dark'>(
  'light',
)

export { ThemeModeProvider, useThemeMode }
