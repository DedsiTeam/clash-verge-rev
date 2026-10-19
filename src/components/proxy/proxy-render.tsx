import {
  ExpandLessRounded,
  ExpandMoreRounded,
  InboxRounded,
} from '@mui/icons-material'
import {
  Box,
  ListItemText,
  ListItemButton,
  Typography,
  styled,
  Chip,
  Tooltip,
} from '@mui/material'
import { memo, useId, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useIconCache } from '@/hooks/use-icon-cache'
import { useVerge } from '@/hooks/use-verge'
import type { ResolvedProxyMember } from '@/types/proxy-view'

import { ProxyGroupHeaderBlock } from './proxy-group-header-block'
import { ProxyGroupTools } from './proxy-group-tools'
import { ProxyHead } from './proxy-head'
import { ProxyItem } from './proxy-item'
import { ProxyItemMini } from './proxy-item-mini'
import type { HeadState } from './use-head-state'
import type { IRenderItem } from './use-render-list'

interface RenderProps {
  item: IRenderItem
  stickyed?: boolean
  isChainMode?: boolean
  onLocation: (group: IRenderItem['group']) => void
  onCheckAll: (groupName: string) => void
  onHeadState: (groupName: string, patch: Partial<HeadState>) => void
  onChangeProxy: (
    group: IRenderItem['group'],
    member: ResolvedProxyMember,
  ) => void
  onGroupToggle?: (group: IRenderItem['group']) => void
}

export const ProxyRender = memo(function ProxyRender(props: RenderProps) {
  const { t } = useTranslation()
  const {
    item,
    stickyed = false,
    onLocation,
    onCheckAll,
    onHeadState,
    onChangeProxy,
    onGroupToggle,
    isChainMode: _ = false,
  } = props
  const { type, group, headState, member, memberCol } = item
  const { verge } = useVerge()
  const enable_group_icon = verge?.enable_group_icon ?? true
  const toolsOnLeft = verge?.proxy_group_tools_position === 'left'
  const headerId = useId()
  const iconCachePath = useIconCache({
    icon: group.icon,
    cacheKey: group.name.replaceAll(' ', ''),
    enabled: enable_group_icon,
  })

  const showType = headState?.showType
  const memberColItemsMemo = useMemo(() => {
    if (type !== 4 || !memberCol) {
      return null
    }

    return memberCol.map((occurrence) => (
      <ProxyItemMini
        key={`${item.key}-${occurrence.memberIndex}`}
        group={group}
        member={occurrence.member}
        selected={group.now === occurrence.member.ref.name}
        showType={showType}
        onClick={(nextMember) => onChangeProxy(group, nextMember)}
      />
    ))
  }, [type, memberCol, item.key, group, showType, onChangeProxy])

  if (type === 0) {
    const nameBlock = (
      <ProxyGroupHeaderBlock
        key="name"
        group={headerId}
        block="name"
        sx={{ flex: '1 1 200px', gap: 1.5, mr: toolsOnLeft ? 1 : 0 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            flexShrink: 0,
            borderRadius: 1,
            bgcolor: 'action.hover',
            color: 'text.secondary',
          }}
        >
          {headState?.open ? <ExpandLessRounded /> : <ExpandMoreRounded />}
        </Box>
        {enable_group_icon && group.icon?.trim().startsWith('http') && (
          <img
            src={iconCachePath === '' ? group.icon : iconCachePath}
            alt={group.name}
            width="32px"
            style={{ marginRight: '12px', borderRadius: '6px' }}
          />
        )}
        {enable_group_icon && group.icon?.trim().startsWith('data') && (
          <img
            src={group.icon}
            alt={group.name}
            width="32px"
            style={{ marginRight: '12px', borderRadius: '6px' }}
          />
        )}
        {enable_group_icon && group.icon?.trim().startsWith('<svg') && (
          <img
            src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(group.icon)}`}
            alt={group.name}
            width="32px"
          />
        )}
        <ListItemText
          sx={{ flex: '0 1 auto', minWidth: 0 }}
          primary={
            <StyledPrimary title={group.name}>{group.name}</StyledPrimary>
          }
          secondary={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                pt: '2px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              <Box
                component="span"
                sx={{
                  marginTop: '2px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <StyledTypeBox>{group.type}</StyledTypeBox>
                <StyledSubtitle sx={{ color: 'text.secondary' }}>
                  {group.now}
                </StyledSubtitle>
              </Box>
            </Box>
          }
          slotProps={{
            secondary: {
              component: 'div',
              sx: {
                display: 'flex',
                alignItems: 'center',
                color: '#ccc',
              },
            },
          }}
        />
      </ProxyGroupHeaderBlock>
    )

    const proxyCount = (
      <Tooltip title={t('proxies.page.labels.proxyCount')} arrow>
        <div
          style={{
            minWidth: '40px',
            display: 'flex',
            justifyContent: toolsOnLeft ? 'start' : 'end',
            alignItems: 'center',
          }}
        >
          <Chip
            size="small"
            label={`${group.members.length}`}
            sx={{
              mx: 0.5,
              backgroundColor: 'background.paper',
              color: 'text.secondary',
              borderRadius: 1,
              fontSize: 12,
              fontVariantNumeric: 'tabular-nums',
            }}
          />
        </div>
      </Tooltip>
    )

    const toolsBlock = (
      <ProxyGroupHeaderBlock
        key="tools"
        group={headerId}
        block="tools"
        sx={{
          flex: headState?.textState ? '1 1 100%' : '0 1 auto',
          maxWidth: '100%',
          flexWrap: 'wrap',
          p: 0.5,
          bgcolor: 'action.hover',
          color: 'text.secondary',
          justifyContent: toolsOnLeft ? 'start' : 'end',
          mr: toolsOnLeft ? 2 : 0,
        }}
      >
        {toolsOnLeft && proxyCount}
        <ProxyGroupTools
          side={toolsOnLeft ? 'left' : 'right'}
          url={group.testUrl!}
          groupName={group.name}
          headState={headState!}
          onLocation={() => onLocation(group)}
          onCheckDelay={() => onCheckAll(group.name)}
          onHeadState={(p) => onHeadState(group.name, p)}
        />
        {!toolsOnLeft && proxyCount}
      </ProxyGroupHeaderBlock>
    )

    return (
      <div style={{ padding: '8px 16px' }}>
        <ListItemButton
          dense
          aria-expanded={!!headState?.open}
          aria-label={group.name}
          sx={{
            p: 2,
            minHeight: 80,
            borderRadius: 1.5,
            border: '1px solid',
            borderColor: headState?.open ? 'transparent' : 'divider',
            bgcolor: headState?.open
              ? 'background.default'
              : 'background.paper',
            boxShadow:
              stickyed && headState?.open
                ? '0 4px 12px rgb(13 13 13 / 4%)'
                : 'none',
            '&:hover': {
              bgcolor: headState?.open ? 'background.default' : 'action.hover',
            },
          }}
          onClick={() => {
            if (headState?.open) {
              onGroupToggle?.(group)
            }
            onHeadState?.(group.name, { open: !headState?.open })
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
                width: '100%',
              }}
            >
              {toolsOnLeft ? toolsBlock : nameBlock}
              {toolsOnLeft ? nameBlock : toolsBlock}
            </Box>
          </Box>
        </ListItemButton>
      </div>
    )
  }

  if (type === 1) {
    return (
      <ProxyHead
        sx={{ pl: 2, pr: 3, mt: 0.5, mb: 1 }}
        url={group.testUrl!}
        groupName={group.name}
        headState={headState!}
        onLocation={() => onLocation(group)}
        onCheckDelay={() => onCheckAll(group.name)}
        onHeadState={(p) => onHeadState(group.name, p)}
      />
    )
  }

  if (type === 2) {
    return (
      <ProxyItem
        group={group}
        member={member!.member}
        selected={group.now === member?.member.ref.name}
        showType={headState?.showType}
        sx={{ py: 0, pl: 2 }}
        onClick={(nextMember) => onChangeProxy(group, nextMember)}
      />
    )
  }

  if (type === 3) {
    return (
      <Box
        sx={{
          py: 2,
          pl: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <InboxRounded sx={{ fontSize: '2.5em', color: 'inherit' }} />
        <Typography sx={{ color: 'inherit' }}>
          {t('proxies.page.empty.noProxies')}
        </Typography>
      </Box>
    )
  }

  if (type === 4) {
    return (
      <Box
        sx={{
          height: 96,
          display: 'grid',
          my: 1,
          gap: 2,
          px: 2,
          gridTemplateColumns: `repeat(${item.col! || 2}, 1fr)`,
        }}
      >
        {memberColItemsMemo}
      </Box>
    )
  }

  return null
})

const StyledPrimary = styled('span')`
  display: block;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const StyledSubtitle = styled('span')`
  font-size: 12px;
  overflow: hidden;
  color: text.secondary;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const StyledTypeBox = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  backgroundColor: theme.palette.action.hover,
  color: theme.palette.text.secondary,
  borderRadius: 4,
  fontSize: 12,
  padding: '1px 6px',
  lineHeight: 1.5,
  marginRight: '8px',
}))
