import {
  alpha,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'
import type { ReactNode } from 'react'
import { useMatch, useNavigate, useResolvedPath } from 'react-router'

import { useVerge } from '@/hooks/use-verge'

interface Props {
  to: string
  children: string
  icon: ReactNode[]
}
export const LayoutItem = (props: Props) => {
  const { to, children, icon } = props
  const { verge } = useVerge()
  const { menu_icon } = verge ?? {}
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: true })
  const navigate = useNavigate()

  const effectiveMenuIcon = menu_icon === 'disable' ? 'monochrome' : menu_icon

  return (
    <Tooltip title={children} placement="right" arrow>
      <ListItem sx={{ py: 0.5, maxWidth: 250, mx: 'auto', padding: '4px 0px' }}>
        <ListItemButton
          selected={!!match}
          aria-current={match ? 'page' : undefined}
          sx={[
            {
              borderRadius: 2,
              marginLeft: 1.25,
              paddingLeft: 1,
              paddingRight: 1,
              marginRight: 1.25,
              cursor: 'pointer',
              '& .MuiListItemText-primary': {
                color: 'text.primary',
                fontWeight: '700',
              },
            },
            ({ palette: { mode, primary } }) => {
              const bgcolor =
                mode === 'light'
                  ? alpha(primary.main, 0.15)
                  : alpha(primary.main, 0.35)
              const color = mode === 'light' ? '#1f1f1f' : '#ffffff'
              return {
                '&.Mui-selected': { bgcolor },
                '&.Mui-selected:hover': { bgcolor },
                '&.Mui-selected .MuiListItemText-primary': { color },
                ...(mode === 'light' && {
                  minHeight: 44,
                  px: 2,
                  borderRadius: '8px',
                  '& .MuiListItemIcon-root': { minWidth: 28, marginLeft: 0 },
                  '& .MuiListItemText-root': {
                    marginLeft: 0,
                    textAlign: 'left',
                  },
                  '& .MuiListItemText-primary': {
                    fontWeight: 500,
                    whiteSpace: 'normal',
                  },
                  '&:hover': { bgcolor: 'action.hover' },
                  '&:active': { bgcolor: 'action.selected' },
                  '&.Mui-selected': {
                    bgcolor: primary.main,
                    color: primary.contrastText,
                  },
                  '&.Mui-selected:hover': { bgcolor: primary.dark },
                  '&.Mui-selected .MuiListItemText-primary, &.Mui-selected .MuiListItemIcon-root':
                    { color: primary.contrastText },
                }),
              }
            },
          ]}
          aria-label={children}
          onClick={() => navigate(to)}
        >
          {(effectiveMenuIcon === 'monochrome' || !effectiveMenuIcon) && (
            <ListItemIcon
              sx={{
                color: 'text.primary',
                marginLeft: '6px',
                cursor: 'inherit',
              }}
            >
              {icon[0]}
            </ListItemIcon>
          )}
          {effectiveMenuIcon === 'colorful' && (
            <ListItemIcon sx={{ cursor: 'inherit' }}>{icon[1]}</ListItemIcon>
          )}
          <ListItemText
            sx={{
              textAlign: 'center',
              marginLeft: effectiveMenuIcon === 'disable' ? '' : '-35px',
            }}
            primary={children}
          />
        </ListItemButton>
      </ListItem>
    </Tooltip>
  )
}
