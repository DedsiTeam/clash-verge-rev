import { CheckCircleOutlineRounded } from '@mui/icons-material'
import { alpha, Box, ListItemButton, styled, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { BaseLoading } from '@/components/base'
import { useProxyDelayState } from '@/hooks/use-proxy-delay-state'
import delayManager from '@/services/delay'
import {
  memberDetails,
  type ProxyGroupView,
  type ResolvedProxyMember,
} from '@/types/proxy-view'

interface Props {
  group: ProxyGroupView
  member: ResolvedProxyMember
  selected: boolean
  showType?: boolean
  onClick?: (member: ResolvedProxyMember) => void
}

// 多列布局
export const ProxyItemMini = (props: Props) => {
  const { group, member, selected, showType = true, onClick } = props
  const details = memberDetails(member)
  const unresolved = member.kind === 'unresolved'
  const name = member.ref.name
  const type = unresolved ? member.ref.reason : (details?.type ?? '')
  const now = member.kind === 'group' ? member.group.now : undefined

  const { t } = useTranslation()

  // -1/<=0 为不显示，-2 为 loading
  const { delayValue, isPreset, timeout, onDelay } = useProxyDelayState(
    member,
    group.name,
  )

  return (
    <ListItemButton
      dense
      disabled={unresolved}
      selected={!unresolved && selected}
      onClick={unresolved ? undefined : () => onClick?.(member)}
      sx={[
        {
          height: 96,
          borderRadius: 1.5,
          border: '1px solid',
          borderColor: 'divider',
          minWidth: 0,
          p: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          justifyContent: 'space-between',
          alignItems: 'stretch',
        },
        ({ palette: { mode, primary } }) => {
          const bgcolor = mode === 'light' ? '#ffffff' : '#24252f'
          const showDelay = delayValue > 0
          const selectColor = mode === 'light' ? primary.main : primary.light

          return {
            '&:hover .the-check': { display: !showDelay ? 'block' : 'none' },
            '&:hover .the-delay': { display: showDelay ? 'block' : 'none' },
            '&:hover .the-icon': { display: 'none' },
            '& .the-pin, & .the-unpin': {
              position: 'absolute',
              fontSize: '12px',
              top: '-5px',
              right: '-5px',
            },
            '& .the-unpin': { filter: 'grayscale(1)' },
            '&:hover': {
              borderColor: 'text.secondary',
              bgcolor: 'action.hover',
            },
            '&.Mui-selected': {
              borderColor: selectColor,
              bgcolor:
                mode === 'light'
                  ? alpha(primary.main, 0.02)
                  : alpha(primary.main, 0.35),
            },
            '&.Mui-selected:hover': { bgcolor: alpha(primary.main, 0.08) },
            backgroundColor: bgcolor,
          }
        },
      ]}
    >
      <Box
        title={`${name}\n${now ?? ''}`}
        sx={{ minWidth: 0, overflow: 'hidden' }}
      >
        <Typography
          variant="body2"
          component="div"
          color="text.primary"
          sx={{
            display: 'block',
            fontWeight: selected ? 600 : 400,
            textOverflow: 'ellipsis',
            wordBreak: 'break-all',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </Typography>

        {showType && now && (
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            noWrap
            title={now}
            sx={{ mt: 0.5 }}
          >
            {now}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          minWidth: 0,
        }}
      >
        {showType && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'nowrap',
              minWidth: 0,
              overflow: 'hidden',
            }}
          >
            <TypeBox color="text.secondary" component="span">
              {type}
            </TypeBox>
            {!unresolved && details?.udp && (
              <TypeBox color="text.secondary" component="span">
                UDP
              </TypeBox>
            )}
            {!unresolved && details?.xudp && (
              <TypeBox color="text.secondary" component="span">
                XUDP
              </TypeBox>
            )}
            {!unresolved && details?.tfo && (
              <TypeBox color="text.secondary" component="span">
                TFO
              </TypeBox>
            )}
            {!unresolved && details?.mptcp && (
              <TypeBox color="text.secondary" component="span">
                MPTCP
              </TypeBox>
            )}
            {!unresolved && details?.smux && (
              <TypeBox color="text.secondary" component="span">
                SMUX
              </TypeBox>
            )}
          </Box>
        )}
        <Box
          sx={{
            ml: 'auto',
            flexShrink: 0,
            color: 'primary.main',
            display: isPreset ? 'none' : '',
          }}
        >
          {!unresolved && delayValue === -2 && (
            <Widget>
              <BaseLoading />
            </Widget>
          )}
          {!unresolved && delayValue !== -2 && (
            <Widget
              className="the-check"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                void onDelay()
              }}
              sx={({ palette }) => ({
                display: 'none', // hover 时显示
                ':hover': { bgcolor: alpha(palette.primary.main, 0.15) },
              })}
            >
              {t('shared.actions.check')}
            </Widget>
          )}

          {!unresolved && delayValue >= 0 && (
            // 显示延迟
            <Widget
              className="the-delay"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                void onDelay()
              }}
              sx={({ palette }) => ({
                color: delayManager.formatDelayColor(delayValue, timeout),
                ':hover': { bgcolor: alpha(palette.primary.main, 0.15) },
              })}
            >
              {delayManager.formatDelay(delayValue, timeout)}
            </Widget>
          )}
          {!unresolved &&
            type !== 'Direct' &&
            delayValue !== -2 &&
            delayValue < 0 &&
            selected && (
              // 展示已选择的 icon
              <CheckCircleOutlineRounded
                className="the-icon"
                sx={{ fontSize: 16, mr: 0.5, display: 'block' }}
              />
            )}
        </Box>
      </Box>
      {!unresolved && group.fixed && group.fixed === name && (
        // 展示 fixed 状态
        <span
          className={name === group.now ? 'the-pin' : 'the-unpin'}
          title={
            group.type === 'URLTest'
              ? t('proxies.page.labels.delayCheckReset')
              : ''
          }
        >
          📌
        </span>
      )}
    </ListItemButton>
  )
}

const Widget = styled(Box)(({ theme: { typography } }) => ({
  padding: '2px 4px',
  fontSize: 12,
  fontWeight: 500,
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
  fontFamily: typography.fontFamily,
  borderRadius: '4px',
}))

const TypeBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'component',
})<{ component?: React.ElementType }>(({ theme: { typography, palette } }) => ({
  display: 'inline-block',
  flexShrink: 0,
  backgroundColor: palette.action.hover,
  color: palette.text.secondary,
  borderRadius: 4,
  fontSize: 12,
  fontFamily: typography.fontFamily,
  marginRight: '4px',
  marginTop: 'auto',
  padding: '0 4px',
  lineHeight: 1.5,
}))
