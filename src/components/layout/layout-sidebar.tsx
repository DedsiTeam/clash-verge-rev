import { Box, List } from '@mui/material'
import { useTranslation } from 'react-i18next'

import logo from '@/assets/image/logo.png'
import { navItems } from '@/pages/_navigation'

import { LayoutItem } from './layout-item'
import { UpdateButton } from './update-button'

interface LayoutSidebarProps {
  isDark: boolean
}

const settingsItem = navItems.find((item) => item.path === '/settings')
const mainNavItems = navItems.filter((item) => item.path !== '/settings')

export const LayoutSidebar = (props: LayoutSidebarProps) => {
  const { isDark } = props
  const { t } = useTranslation()

  return (
    <div
      className="layout-content__left"
      onContextMenu={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
    >
      {/* Logo */}
      <div className="the-logo" data-tauri-drag-region="false">
        <div
          data-tauri-drag-region="true"
          style={{
            height: '27px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="DedsiClash"
            sx={{
              objectFit: 'contain',
              filter: isDark ? 'invert(1)' : undefined,
            }}
            style={{
              height: '36px',
              width: '36px',
              marginTop: '-3px',
              marginRight: '5px',
              marginLeft: '-3px',
            }}
          />
          <Box
            component="span"
            className="brand-name"
            sx={{ fontSize: 22, fontWeight: 700, lineHeight: '27px' }}
          >
            DedsiClash
          </Box>
        </div>
        <UpdateButton className="the-newbtn" />
      </div>

      <List className="the-menu">
        {mainNavItems.map((item) => (
          <LayoutItem key={item.path} to={item.path} icon={item.icon}>
            {t(item.label)}
          </LayoutItem>
        ))}
      </List>

      {settingsItem && (
        <List
          className="the-menu"
          style={{ flex: '0 0 auto', marginTop: 'auto' }}
        >
          <LayoutItem to={settingsItem.path} icon={settingsItem.icon}>
            {t(settingsItem.label)}
          </LayoutItem>
        </List>
      )}
    </div>
  )
}
