'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'
import { BlockPreviewFrame, EmptyPreview, brand } from './shared'

export const QuoteBlockComponent: React.FC = () => {
  const { text, source, url } = useFormFields(([fields]) => ({
    text: fields.text?.value as string | undefined,
    source: fields.source?.value as string | undefined,
    url: fields.url?.value as string | undefined,
  }))

  return (
    <BlockPreviewFrame hint="引用">
      {text ? (
        <figure
          style={{
            margin: 0,
            padding: 24,
            background: brand.gray50,
            borderRadius: 16,
            border: `3px solid ${brand.border}`,
            borderLeft: `8px solid ${brand.pink}`,
            boxShadow: '3px 3px 0 #000',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 8,
              left: 12,
              fontSize: 42,
              color: 'rgba(253, 173, 200, 0.35)',
              fontFamily: 'Georgia, serif',
              lineHeight: 1,
            }}
          >
            &quot;
          </div>
          <blockquote
            style={{
              margin: 0,
              position: 'relative',
              zIndex: 1,
              fontSize: 16,
              fontWeight: 700,
              fontStyle: 'italic',
              color: '#374151',
              lineHeight: 1.55,
              whiteSpace: 'pre-wrap',
            }}
          >
            {text}
          </blockquote>
          {(source || url) && (
            <figcaption
              style={{
                textAlign: 'right',
                fontSize: 12,
                color: brand.muted,
                marginTop: 14,
                paddingTop: 12,
                borderTop: '2px dashed #e5e7eb',
              }}
            >
              — {source || url}
            </figcaption>
          )}
        </figure>
      ) : (
        <EmptyPreview label="引用テキスト未設定" />
      )}
    </BlockPreviewFrame>
  )
}

export const QuoteBlockLabel: React.FC = () => {
  const text = useFormFields(([fields]) => fields.text?.value as string | undefined)
  const preview = text?.replace(/\s+/g, ' ').trim()
  return (
    <span>
      {preview
        ? `引用: ${preview.slice(0, 24)}${preview.length > 24 ? '…' : ''}`
        : '引用'}
    </span>
  )
}
