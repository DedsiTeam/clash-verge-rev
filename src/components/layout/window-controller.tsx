import { Close, Minimize } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'
import { useTranslation } from 'react-i18next'

import { useWindowControls } from '@/hooks/use-window'
import getSystem from '@/utils/get-system'

export const WindowControls = forwardRef(function WindowControls(props, ref) {
  const { t } = useTranslation()
  const { currentWindow, minimize, close } = useWindowControls()
  const isMac = getSystem() === 'macos'

  useImperativeHandle(ref, () => ({ currentWindow, minimize, close }), [
    currentWindow,
    minimize,
    close,
  ])

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        flexDirection: isMac ? 'row-reverse' : 'row',
        '> button': { cursor: 'default' },
      }}
    >
      <IconButton
        size="small"
        aria-label={t('shared.window.minimize')}
        onClick={minimize}
      >
        <Minimize fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        aria-label={t('shared.actions.close')}
        onClick={close}
        sx={{
          ':hover': { bgcolor: 'error.main', color: 'error.contrastText' },
        }}
      >
        <Close fontSize="small" />
      </IconButton>
    </Box>
  )
})
