'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'
import {
  BlockPreviewFrame,
  EmptyPreview,
  brand,
  lexicalToPlainText,
} from './shared'

const typeStyles: Record<string, { bg: string; border: string; label: string }> = {
  info: { bg: 'rgba(152, 216, 233, 0.25)', border: brand.blue, label: '情報' },
  warning: { bg: 'rgba(253, 241, 1, 0.25)', border: brand.yellow, label: '警告' },
  success: { bg: 'rgba(179, 228, 29, 0.25)', border: brand.lime, label: '成功' },
}

export const CalloutBlockComponent: React.FC = () => {
  const { type, icon, content } = useFormFields(([fields]) => ({
    type: (fields.type?.value as string | undefined) || 'info',
    icon: (fields.icon?.value as string | undefined) || '💡',
    content: lexicalToPlainText(fields.content?.value),
  }))

  const style = typeStyles[type] || typeStyles.info

  return (
    <BlockPreviewFrame hint={`コールアウト · ${style.label}`}>
      {content || icon ? (
        <div
          style={{
            display: 'flex',
            gap: 14,
            padding: 18,
            borderRadius: 16,
            border: `3px solid ${brand.border}`,
            borderLeft: `8px solid ${style.border}`,
            background: style.bg,
            boxShadow: '3px 3px 0 #000',
          }}
        >
          <div style={{ fontSize: 28, lineHeight: 1 }}>{icon}</div>
          <div style={{ color: brand.text, lineHeight: 1.55, fontSize: 14, flex: 1 }}>
            {content || '（内容未入力）'}
          </div>
        </div>
      ) : (
        <EmptyPreview label="コールアウト未設定" />
      )}
    </BlockPreviewFrame>
  )
}

export const CalloutBlockLabel: React.FC = () => {
  const { type, icon } = useFormFields(([fields]) => ({
    type: (fields.type?.value as string | undefined) || 'info',
    icon: (fields.icon?.value as string | undefined) || '💡',
  }))
  const label = typeStyles[type]?.label || '情報'
  return (
    <span>
      {icon} コールアウト · {label}
    </span>
  )
}
