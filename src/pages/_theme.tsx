import getSystem from '@/utils/get-system'
const OS = getSystem()

export const lightUiTokens = {
  primary: '#0D0D0D',
  primaryHover: '#262626',
  primaryPressed: '#000000',
  onPrimary: '#FFFFFF',
  background: '#F7F8FA',
  surface: '#FFFFFF',
  surfaceMuted: '#F0F2F5',
  surfaceHover: '#F0F2F5',
  surfacePressed: '#E5E7EB',
  textPrimary: '#0D0D0D',
  textSecondary: '#525866',
  divider: '#E5E7EB',
  controlBorder: '#858B95',
  focus: '#2563EB',
  success: '#15803D',
  successSurface: '#DCFCE7',
  warning: '#B45309',
  warningSurface: '#FEF3C7',
  error: '#B91C1C',
  errorSurface: '#FEE2E2',
  disabledSurface: '#F0F2F5',
  disabledText: '#858B95',
} as const

// default theme setting
export const defaultTheme = {
  primary_color: lightUiTokens.primary,
  secondary_color: lightUiTokens.textSecondary,
  primary_text: lightUiTokens.textPrimary,
  secondary_text: lightUiTokens.textSecondary,
  info_color: '#007AFF',
  error_color: lightUiTokens.error,
  warning_color: lightUiTokens.warning,
  success_color: lightUiTokens.success,
  background_color: lightUiTokens.background,
  font_family: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei UI", "PingFang SC", "Microsoft YaHei", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji"${
    OS === 'windows' ? ', twemoji mozilla' : ''
  }`,
}

// dark mode
export const defaultDarkTheme = {
  ...defaultTheme,
  primary_color: '#0A84FF',
  secondary_color: '#FF9F0A',
  primary_text: '#FFFFFF',
  background_color: '#2E303D',
  secondary_text: '#EBEBF599',
  info_color: '#0A84FF',
  error_color: '#FF453A',
  warning_color: '#FF9F0A',
  success_color: '#30D158',
}
