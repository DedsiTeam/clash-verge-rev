import { styled } from '@mui/material/styles'
import { default as MuiSwitch, SwitchProps } from '@mui/material/Switch'

export const Switch = styled((props: SwitchProps) => (
  <MuiSwitch
    focusVisibleClassName="Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: theme.palette.mode === 'light' ? 48 : 42,
  height: theme.palette.mode === 'light' ? 40 : 26,
  padding: theme.palette.mode === 'light' ? '7px 3px' : 0,
  marginRight: 1,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    top: theme.palette.mode === 'light' ? 7 : 0,
    left: theme.palette.mode === 'light' ? 3 : 0,
    transitionDuration: theme.palette.mode === 'light' ? '160ms' : '300ms',
    '&.Mui-focusVisible':
      theme.palette.mode === 'light'
        ? { outline: '2px solid var(--focus-color)', outlineOffset: 2 }
        : {},
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? 'inherit' : '#33cf4d',
      border: theme.palette.mode === 'light' ? 0 : '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor:
      theme.palette.mode === 'light' ? theme.palette.text.disabled : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: theme.palette.mode === 'light' ? 160 : 500,
    }),
  },
}))
