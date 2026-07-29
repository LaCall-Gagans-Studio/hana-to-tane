'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'
import {
  BlockPreviewFrame,
  EmptyPreview,
  brand,
  fieldValue,
  getArrayRowIds,
  lexicalToPlainText,
} from './shared'

export const AccordionBlockComponent: React.FC = () => {
  const items = useFormFields(([fields]) => {
    const rowIds = getArrayRowIds(fields.items)
    return rowIds.map((id) => ({
      id,
      title: fieldValue<string>(fields, `items.${id}.title`),
      contentPreview: lexicalToPlainText(fieldValue(fields, `items.${id}.content`)),
    }))
  })

  return (
    <BlockPreviewFrame hint="アコーディオン (FAQ)">
      {items.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                background: brand.surface,
                border: `3px solid ${brand.border}`,
                borderRadius: 16,
                boxShadow: '3px 3px 0 #000',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 16px',
                  fontWeight: 900,
                  fontSize: 15,
                }}
              >
                <span>{item.title || '（タイトル未設定）'}</span>
                <span style={{ color: '#3b82f6', fontSize: 14 }}>▼</span>
              </div>
              {item.contentPreview ? (
                <div
                  style={{
                    padding: '0 16px 14px',
                    borderTop: `2px dashed ${brand.border}`,
                    marginTop: 0,
                    paddingTop: 12,
                    color: brand.muted,
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  {item.contentPreview.slice(0, 120)}
                  {item.contentPreview.length > 120 ? '…' : ''}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <EmptyPreview label="FAQ項目がありません" />
      )}
    </BlockPreviewFrame>
  )
}

export const AccordionBlockLabel: React.FC = () => {
  const count = useFormFields(([fields]) => getArrayRowIds(fields.items).length)
  return <span>{count > 0 ? `アコーディオン (${count}件)` : 'アコーディオン (FAQ)'}</span>
}
