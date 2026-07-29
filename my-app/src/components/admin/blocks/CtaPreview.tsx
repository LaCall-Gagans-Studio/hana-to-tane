'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'
import { BlockPreviewFrame, EmptyPreview, brand } from './shared'

const styleColors: Record<string, string> = {
  primary: brand.pink,
  secondary: brand.lime,
  blue: brand.blue,
}

export const CtaBlockComponent: React.FC = () => {
  const { label, url, style } = useFormFields(([fields]) => ({
    label: fields.label?.value as string | undefined,
    url: fields.url?.value as string | undefined,
    style: (fields.style?.value as string | undefined) || 'primary',
  }))

  return (
    <BlockPreviewFrame hint="CTAボタン">
      {label ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              borderRadius: 999,
              border: `3px solid ${brand.border}`,
              boxShadow: '3px 3px 0 #000',
              background: styleColors[style] || brand.pink,
              color: brand.text,
              fontWeight: 900,
              fontSize: 16,
            }}
          >
            {label}
          </div>
          {url ? (
            <div
              style={{
                alignSelf: 'center',
                marginLeft: 12,
                fontSize: 12,
                color: brand.muted,
                maxWidth: 220,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              → {url}
            </div>
          ) : null}
        </div>
      ) : (
        <EmptyPreview label="CTAボタン未設定" />
      )}
    </BlockPreviewFrame>
  )
}

export const CtaBlockLabel: React.FC = () => {
  const label = useFormFields(([fields]) => fields.label?.value as string | undefined)
  return <span>{label ? `CTA: ${label}` : 'CTAボタン'}</span>
}
