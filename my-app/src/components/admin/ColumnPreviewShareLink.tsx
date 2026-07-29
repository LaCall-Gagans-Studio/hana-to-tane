'use client'

import React, { useMemo, useState } from 'react'
import { useFormFields } from '@payloadcms/ui'

/**
 * 管理画面サイドバーに、下書きでも閲覧できる共有用プレビューURLを表示する
 */
export default function ColumnPreviewShareLink() {
  const slug = useFormFields(([fields]) => fields.slug?.value as string | undefined)
  const [copied, setCopied] = useState(false)

  const previewUrl = useMemo(() => {
    if (!slug) return ''
    const base =
      (typeof window !== 'undefined' ? window.location.origin : '') ||
      process.env.NEXT_PUBLIC_SERVER_URL ||
      'http://localhost:3000'
    return `${base.replace(/\/$/, '')}/column/${encodeURIComponent(slug)}?preview=true`
  }, [slug])

  if (!slug) {
    return (
      <div style={{ fontSize: 13, color: 'var(--theme-elevation-600)' }}>
        スラグを入力すると、共有用プレビューURLが表示されます。
      </div>
    )
  }

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(previewUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--theme-elevation-800)' }}>
        下書き保存後も、このURLを共有すれば記事を確認できます。
      </p>
      <input
        readOnly
        value={previewUrl}
        onFocus={(e) => e.currentTarget.select()}
        style={{
          width: '100%',
          padding: '8px 10px',
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: 6,
          background: 'var(--theme-elevation-50)',
          fontSize: 12,
        }}
      />
      <button
        type="button"
        onClick={onCopy}
        style={{
          alignSelf: 'flex-start',
          padding: '6px 12px',
          borderRadius: 6,
          border: '1px solid var(--theme-elevation-250)',
          background: 'var(--theme-elevation-100)',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {copied ? 'コピーしました' : 'URLをコピー'}
      </button>
    </div>
  )
}
