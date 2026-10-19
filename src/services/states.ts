import { createContextState } from 'foxact/create-context-state'

const [ThemeModeProvider, useThemeMode] = createContextState<'light' | 'dark'>(
  'light',
)

// save update state
const [UpdateStateProvider, useUpdateState, useSetUpdateState] =
  createContextState<boolean>(false)

export {
  ThemeModeProvider,
  useThemeMode,
  UpdateStateProvider,
  useUpdateState,
  useSetUpdateState,
}
