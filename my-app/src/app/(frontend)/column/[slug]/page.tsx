import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import { ReservationForm } from '../../components/ReservationForm'
import {
  CtaComponent,
  AccordionComponent,
  CustomTableComponent,
} from '@/components/Blocks/RichTextBlocks'

import type { Metadata } from 'next'

export const revalidate = 60

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const { slug: rawSlug } = await props.params
  const slug = decodeURIComponent(rawSlug)
  const searchParams = await props.searchParams
  const isPreview = searchParams.preview === 'true'

  const payload = await getPayload({ config: configPromise })

  const whereConditions: any[] = [
    {
      slug: {
        equals: slug,
      },
    },
  ]

  if (!isPreview) {
    whereConditions.push({
      _status: {
        equals: 'published',
      },
    })
  }

  const columns = await payload.find({
    collection: 'column',
    where: {
      and: whereConditions,
    },
    limit: 1,
    draft: isPreview,
  })

  const column = columns.docs[0]

  if (!column) {
    return {
      title: '記事が見つかりません',
    }
  }

  const title = column.title
  const description = `はなとたねのコラム「${title}」の記事詳細です。`

  return {
    title,
    description,
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

import { ColumnClient } from './ColumnClient'

export default async function ColumnDetailPage(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug: rawSlug } = await props.params
  const slug = decodeURIComponent(rawSlug)
  const searchParams = await props.searchParams
  const isPreview = searchParams.preview === 'true'

  const payload = await getPayload({ config: configPromise })

  const whereConditions: any[] = [
    {
      slug: {
        equals: slug,
      },
    },
  ]

  if (!isPreview) {
    whereConditions.push({
      _status: {
        equals: 'published',
      },
    })
  }

  const columns = await payload.find({
    collection: 'column',
    where: {
      and: whereConditions,
    },
    limit: 1,
    draft: isPreview,
  })

  const column = columns.docs[0]

  if (!column) {
    notFound()
  }

  return <ColumnClient initialData={column} />
}
