'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'
import { BlockPreviewFrame, EmptyPreview, brand } from './shared'

function getProvider(url?: string): 'YouTube' | 'Vimeo' | '動画' {
  if (!url) return '動画'
  if (url.includes('youtu')) return 'YouTube'
  if (url.includes('vimeo')) return 'Vimeo'
  return '動画'
}

function getThumbnail(url?: string): string | null {
  if (!url) return null
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.slice(1)
      return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null
    }
    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v')
      return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null
    }
  } catch {
    return null
  }
  return null
}

export const VideoEmbedBlockComponent: React.FC = () => {
  const url = useFormFields(([fields]) => fields.url?.value as string | undefined)
  const provider = getProvider(url)
  const thumb = getThumbnail(url)

  return (
    <BlockPreviewFrame hint="動画埋め込み">
      {url ? (
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '56.25%',
            borderRadius: 16,
            overflow: 'hidden',
            border: `3px solid ${brand.border}`,
            boxShadow: '3px 3px 0 #000',
            background: '#111',
          }}
        >
          {thumb ? (
            <img
              src={thumb}
              alt="動画プレビュー"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.85,
              }}
            />
          ) : null}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              color: '#fff',
              textShadow: '0 1px 3px rgba(0,0,0,.6)',
              padding: 16,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.92)',
                color: '#111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                fontWeight: 900,
                border: `3px solid ${brand.border}`,
              }}
            >
              ▶
            </div>
            <div style={{ fontWeight: 800, fontSize: 14 }}>{provider}</div>
            <div
              style={{
                fontSize: 11,
                opacity: 0.9,
                maxWidth: '90%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {url}
            </div>
          </div>
        </div>
      ) : (
        <EmptyPreview label="動画URL未設定" />
      )}
    </BlockPreviewFrame>
  )
}

export const VideoEmbedBlockLabel: React.FC = () => {
  const url = useFormFields(([fields]) => fields.url?.value as string | undefined)
  return <span>{url ? `${getProvider(url)} 埋め込み` : '動画埋め込み'}</span>
}
