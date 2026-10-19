import { createTheme, type Theme } from '@mui/material'

import { lightUiTokens as ui } from '@/pages/_theme'

export const applyLightTheme = (theme: Theme) => {
  const primary = theme.palette.primary
  const focus = { outline: `2px solid ${ui.focus}`, outlineOffset: 2 }
  const floatingShadow = '0 8px 24px rgb(13 13 13 / 10%)'

  return createTheme(theme, {
    shape: { borderRadius: 8 },
    palette: {
      primary: {
        ...primary,
        dark: primary.main === ui.primary ? ui.primaryHover : primary.dark,
      },
      divider: ui.divider,
      background: { paper: ui.surface, default: ui.background },
      action: {
        hover: ui.surfaceHover,
        selected: ui.surfaceMuted,
        disabled: ui.disabledText,
        disabledBackground: ui.disabledSurface,
      },
    },
    typography: {
      h4: { fontSize: 28, lineHeight: '36px', fontWeight: 600 },
      h6: { fontSize: 16, lineHeight: '24px', fontWeight: 600 },
      body1: { fontSize: 14, lineHeight: '22px' },
      body2: { fontSize: 14, lineHeight: '22px' },
      button: {
        fontSize: 14,
        lineHeight: '22px',
        fontWeight: 500,
        textTransform: 'none',
      },
      caption: { fontSize: 12, lineHeight: '18px' },
    },
    components: {
      MuiButtonBase: {
        styleOverrides: { root: { '&.Mui-focusVisible': focus } },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            minHeight: 40,
            padding: '8px 16px',
            borderRadius: 8,
            boxShadow: 'none',
          },
          containedPrimary: {
            '&:hover': {
              backgroundColor:
                primary.main === ui.primary ? ui.primaryHover : primary.dark,
              boxShadow: 'none',
            },
            '&:active': {
              backgroundColor:
                primary.main === ui.primary ? ui.primaryPressed : primary.dark,
            },
          },
          outlined: {
            backgroundColor: ui.surface,
            borderColor: ui.controlBorder,
            '&:hover': {
              backgroundColor: ui.surfaceHover,
              borderColor: theme.palette.text.secondary,
            },
            '&:active': { backgroundColor: ui.surfacePressed },
          },
          startIcon: { marginRight: 8 },
          endIcon: { marginLeft: 8 },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            minWidth: 40,
            minHeight: 40,
            borderRadius: 8,
            '&:hover': { backgroundColor: ui.surfaceHover },
            '&:active': { backgroundColor: ui.surfacePressed },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            minHeight: 40,
            borderRadius: 8,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: ui.controlBorder,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.text.secondary,
            },
            '&.Mui-focused': focus,
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.error.main,
            },
          },
          input: { padding: '9px 12px' },
        },
      },
      MuiInputLabel: {
        styleOverrides: { root: { color: theme.palette.text.secondary } },
      },
      MuiCheckbox: { styleOverrides: { root: { color: ui.controlBorder } } },
      MuiRadio: { styleOverrides: { root: { color: ui.controlBorder } } },
      MuiListItemButton: {
        styleOverrides: { root: { minHeight: 48, borderRadius: 8 } },
      },
      MuiMenuItem: {
        styleOverrides: { root: { minHeight: 48, whiteSpace: 'normal' } },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
            boxShadow: floatingShadow,
            backgroundImage: 'none',
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
            boxShadow: floatingShadow,
            border: `1px solid ${ui.divider}`,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: { fontSize: 12, lineHeight: '18px', borderRadius: 8 },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            padding: 4,
            backgroundColor: ui.surfaceMuted,
            borderRadius: 8,
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            minHeight: 40,
            border: 0,
            borderRadius: 8,
            color: theme.palette.text.secondary,
            '&.Mui-selected': {
              backgroundColor: ui.surface,
              color: theme.palette.text.primary,
            },
            '&.Mui-selected:hover': { backgroundColor: ui.surfaceHover },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: { padding: '12px 16px', fontVariantNumeric: 'tabular-nums' },
        },
      },
      MuiSvgIcon: { styleOverrides: { root: { fontSize: 20 } } },
      MuiAlert: {
        styleOverrides: {
          root: { borderRadius: 8 },
          standardSuccess: { backgroundColor: ui.successSurface },
          standardWarning: { backgroundColor: ui.warningSurface },
          standardError: { backgroundColor: ui.errorSurface },
        },
      },
    },
  })
}
