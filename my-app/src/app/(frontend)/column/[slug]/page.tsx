import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ColumnClient } from './ColumnClient'
import { getColumnBySlug, isColumnPreviewParam } from '@/lib/column'

export const dynamic = 'force-dynamic'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const { slug: rawSlug } = await props.params
  const slug = decodeURIComponent(rawSlug)
  const searchParams = await props.searchParams
  const isPreview = isColumnPreviewParam(searchParams.preview)

  const column = await getColumnBySlug(slug, isPreview)

  if (!column) {
    return {
      title: '記事が見つかりません',
    }
  }

  const title = column.title
  const description = `はなとたねのコラム「${title}」の記事詳細です。`
  const robots = isPreview || column._status === 'draft' ? { index: false, follow: false } : undefined

  return {
    title: isPreview ? `【プレビュー】${title}` : title,
    description,
    robots,
    openGraph: {
      title,
      description,
      images:
        column.image &&
        typeof column.image === 'object' &&
        'url' in column.image &&
        typeof column.image.url === 'string'
          ? [column.image.url]
          : undefined,
    },
  }
}

export default async function ColumnDetailPage(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug: rawSlug } = await props.params
  const slug = decodeURIComponent(rawSlug)
  const searchParams = await props.searchParams
  const isPreview = isColumnPreviewParam(searchParams.preview)

  const column = await getColumnBySlug(slug, isPreview)

  if (!column) {
    notFound()
  }

  return <ColumnClient initialData={column} isPreview={isPreview} />
}
