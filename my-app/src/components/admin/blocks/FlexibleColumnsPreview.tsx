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

const layoutLabels: Record<string, string> = {
  '1/2_1/2': '2カラム',
  '1/3_1/3_1/3': '3カラム',
  '1/4_1/4_1/4_1/4': '4カラム',
}

export const FlexibleColumnsBlockComponent: React.FC = () => {
  const { layout, columns } = useFormFields(([fields]) => {
    const layoutValue = (fields.layout?.value as string | undefined) || '1/2_1/2'
    const rowIds = getArrayRowIds(fields.columns)
    return {
      layout: layoutValue,
      columns: rowIds.map((id) => ({
        id,
        preview: lexicalToPlainText(fieldValue(fields, `columns.${id}.content`)),
      })),
    }
  })

  const colCount = Math.max(columns.length, layout.startsWith('1/4') ? 4 : layout.startsWith('1/3') ? 3 : 2)

  return (
    <BlockPreviewFrame hint={`柔軟な段組み · ${layoutLabels[layout] || layout}`}>
      {columns.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(colCount, columns.length || colCount)}, minmax(0, 1fr))`,
            gap: 12,
          }}
        >
          {columns.map((col, index) => (
            <div
              key={col.id}
              style={{
                border: `3px solid ${brand.border}`,
                borderRadius: 14,
                padding: 12,
                background: brand.gray50,
                minHeight: 72,
                boxShadow: '2px 2px 0 #000',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 6, opacity: 0.6 }}>
                カラム {index + 1}
              </div>
              <div style={{ fontSize: 13, color: brand.muted, lineHeight: 1.45 }}>
                {col.preview
                  ? col.preview.slice(0, 80) + (col.preview.length > 80 ? '…' : '')
                  : '（未入力）'}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyPreview label="段組みカラムがありません" />
      )}
    </BlockPreviewFrame>
  )
}

export const FlexibleColumnsBlockLabel: React.FC = () => {
  const layout = useFormFields(
    ([fields]) => (fields.layout?.value as string | undefined) || '1/2_1/2',
  )
  return <span>段組み · {layoutLabels[layout] || layout}</span>
}
