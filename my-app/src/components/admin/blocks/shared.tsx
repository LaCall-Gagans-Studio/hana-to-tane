'use client'

import React from 'react'
import {
  BlockEditButton,
  BlockRemoveButton,
} from '@payloadcms/richtext-lexical/client'
import type { FormState } from 'payload'

export const brand = {
  lime: '#b3e41d',
  yellow: '#fdf101',
  blue: '#98d8e9',
  pink: '#fdadc8',
  green: '#23af4e',
  border: '#000000',
  text: '#000000',
  muted: '#4b5563',
  surface: '#ffffff',
  gray50: '#f9fafb',
} as const

export function lexicalToPlainText(data: unknown): string {
  if (!data || typeof data !== 'object') return ''
  const root = (data as { root?: { children?: unknown[] } }).root
  if (!root?.children) return ''

  const walk = (nodes: unknown[]): string =>
    nodes
      .map((node) => {
        if (!node || typeof node !== 'object') return ''
        const n = node as { type?: string; text?: string; children?: unknown[] }
        if (n.type === 'text') return n.text || ''
        if (Array.isArray(n.children)) return walk(n.children)
        return ''
      })
      .join('')

  return walk(root.children).replace(/\s+/g, ' ').trim()
}

export function getArrayRowIds(field: FormState[string] | undefined): string[] {
  const rows = (field as { rows?: Array<{ id?: string } | string> } | undefined)?.rows
  if (!Array.isArray(rows)) return []
  return rows
    .map((row) => (typeof row === 'string' ? row : row?.id))
    .filter((id): id is string => Boolean(id))
}

export function fieldValue<T = unknown>(fields: FormState, path: string): T | undefined {
  return fields[path]?.value as T | undefined
}

type BlockPreviewFrameProps = {
  children: React.ReactNode
  hint?: string
}

export function BlockPreviewFrame({ children, hint }: BlockPreviewFrameProps) {
  return (
    <div className="column-block-preview">
      <div className="column-block-preview__toolbar">
        {hint ? <span className="column-block-preview__hint">{hint}</span> : <span />}
        <div className="column-block-preview__actions">
          <BlockEditButton />
          <BlockRemoveButton />
        </div>
      </div>
      <div className="column-block-preview__body">{children}</div>
    </div>
  )
}

export function EmptyPreview({ label }: { label: string }) {
  return (
    <div className="column-block-preview__empty">
      {label}
      <span>編集ボタンから内容を設定できます</span>
    </div>
  )
}
