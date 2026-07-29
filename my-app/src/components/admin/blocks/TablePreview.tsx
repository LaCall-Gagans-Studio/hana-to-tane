'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'
import {
  BlockPreviewFrame,
  EmptyPreview,
  brand,
  fieldValue,
  getArrayRowIds,
} from './shared'

type Cell = { text?: string; isHeader?: boolean }

export const TableBlockComponent: React.FC = () => {
  const rows = useFormFields(([fields]) => {
    const rowIds = getArrayRowIds(fields.rows)
    return rowIds.map((rowId) => {
      const colIds = getArrayRowIds(fields[`rows.${rowId}.columns`])
      const columns: Cell[] = colIds.map((colId) => ({
        text: fieldValue<string>(fields, `rows.${rowId}.columns.${colId}.text`),
        isHeader: Boolean(fieldValue(fields, `rows.${rowId}.columns.${colId}.isHeader`)),
      }))
      return { id: rowId, columns }
    })
  })

  return (
    <BlockPreviewFrame hint="カスタムテーブル">
      {rows.length > 0 ? (
        <div
          style={{
            overflowX: 'auto',
            borderRadius: 12,
            border: `3px solid ${brand.border}`,
            boxShadow: '3px 3px 0 #000',
            background: brand.surface,
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <tbody>
              {rows.map((row, rIndex) => (
                <tr
                  key={row.id}
                  style={{
                    borderBottom:
                      rIndex !== rows.length - 1 ? `3px solid ${brand.border}` : undefined,
                  }}
                >
                  {row.columns.map((col, cIndex) => {
                    const Tag = col.isHeader ? 'th' : 'td'
                    return (
                      <Tag
                        key={`${row.id}-${cIndex}`}
                        style={{
                          padding: 12,
                          borderRight:
                            cIndex !== row.columns.length - 1
                              ? `3px solid ${brand.border}`
                              : undefined,
                          background: col.isHeader ? brand.yellow : undefined,
                          fontWeight: col.isHeader ? 900 : 400,
                          color: brand.text,
                          fontSize: 13,
                        }}
                      >
                        {col.text || '—'}
                      </Tag>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyPreview label="テーブル行がありません" />
      )}
    </BlockPreviewFrame>
  )
}

export const TableBlockLabel: React.FC = () => {
  const count = useFormFields(([fields]) => getArrayRowIds(fields.rows).length)
  return <span>{count > 0 ? `テーブル (${count}行)` : 'カスタムテーブル'}</span>
}
