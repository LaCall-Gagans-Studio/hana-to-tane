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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const payload = await getPayload({ config: configPromise })

  const columns = await payload.find({
    collection: 'column',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
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

export default async function ColumnDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const payload = await getPayload({ config: configPromise })

  const columns = await payload.find({
    collection: 'column',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const column = columns.docs[0]

  if (!column) {
    notFound()
  }

  // カテゴリのラベル定義
  const categoryLabels: { [key: string]: string } = {
    free_school: 'フリースクール',
    event: 'イベント',
    other: 'その他',
  }

  return (
    <div className="bg-surface min-h-screen relative overflow-hidden pb-32">
      {/* Background Pattern */}
      <div className="absolute inset-0  opacity-10 bg-[radial-gradient(#b3e41d_2px,transparent_2px)] bg-size-[24px_24px] pointer-events-none"></div>

      <div className="container mx-auto px-4 py-24 max-w-6l relative z-10">
        <div className="mb-12">
          <Link
            href="/column"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-text font-black rounded-full border-3 border-border shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all mb-8 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
            一覧に戻る
          </Link>

          <article className="bg-white border-3 border-border rounded-3xl p-8 md:p-12 shadow-hard-lg relative overflow-hidden">
            {/* Decorative Top Bar */}
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue via-lime to-yellow"></div>

            <div className="flex flex-wrap gap-4 items-center mb-8 text-sm">
              <span
                className={`px-4 py-1 rounded-full font-black border-2 border-border shadow-sm ${column.category === 'event' ? 'bg-pink text-text' : 'bg-lime text-text'}`}
              >
                {categoryLabels[column.category as string] || column.category}
              </span>
              <time dateTime={column.publishedDate as string} className="font-bold text-gray-500">
                {new Date(column.publishedDate as string).toLocaleDateString('ja-JP')}
              </time>
            </div>

            <h1 className="text-3xl md:text-5xl font-black mb-10 leading-tight tracking-tight text-text relative inline-block">
              {column.title}
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-yellow/30 -z-10 rounded-full"></span>
            </h1>

            {column.image &&
              typeof column.image === 'object' &&
              'url' in column.image &&
              column.image.url && (
                <div className="relative w-full h-[300px] md:h-[500px] mb-12 rounded-2xl overflow-hidden border-3 border-border shadow-hard">
                  <Image
                    src={column.image.url}
                    alt={column.image.alt || (column.title as string)}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

            <div
              className="
              text-gray-800 leading-[1.8] sm:leading-[2] tracking-[0.03em]
              [&_p]:mb-8 [&_p]:text-[1rem] sm:[&_p]:text-[1.125rem]
              [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-black [&_h2]:border-b-4 [&_h2]:border-yellow [&_h2]:pb-4 [&_h2]:mt-16 [&_h2]:mb-8
              [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:border-l-4 [&_h3]:border-lime [&_h3]:pl-4 [&_h3]:mt-14 [&_h3]:mb-6
              [&_h4]:text-lg sm:[&_h4]:text-xl [&_h4]:font-bold [&_h4]:mt-10 [&_h4]:mb-4
              [&_a]:text-blue [&_a]:border-b-2 [&_a]:border-blue/30 [&_a]:font-bold hover:[&_a]:border-blue hover:[&_a]:bg-blue/5 [&_a]:transition-all
              [&_ul]:list-disc [&_ul]:pl-6 sm:[&_ul]:pl-8 [&_ul]:mb-8 [&_ul]:space-y-4
              [&_ol]:list-decimal [&_ol]:pl-6 sm:[&_ol]:pl-8 [&_ol]:mb-8 [&_ol]:space-y-4
              [&_li]:text-[1rem] sm:[&_li]:text-[1.125rem]
              [&_img]:rounded-2xl [&_img]:border-3 [&_img]:border-border [&_img]:shadow-hard hover:[&_img]:shadow-hard-lg [&_img]:transition-shadow [&_img]:my-12 [&_img]:w-full [&_img]:object-cover
              [&_strong]:font-black [&_strong]:text-black [&_strong]:underline [&_strong]:decoration-pink/30 [&_strong]:decoration-4 [&_strong]:underline-offset-4
              [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-6 [&_blockquote]:text-gray-600 [&_blockquote]:my-10 [&_blockquote]:bg-gray-50 [&_blockquote]:py-6 [&_blockquote]:rounded-r-2xl
            "
            >
              {column.content && (
                <RichText
                  data={column.content}
                  converters={({ defaultConverters }) => ({
                    ...defaultConverters,
                    blocks: {
                      ...defaultConverters.blocks,
                      cta: ({ node }: { node: any }) => <CtaComponent fields={node.fields} />,
                      accordion: ({ node }: { node: any }) => (
                        <AccordionComponent fields={node.fields} />
                      ),
                      customTable: ({ node }: { node: any }) => (
                        <CustomTableComponent fields={node.fields} />
                      ),
                    },
                  })}
                />
              )}
            </div>

            {column.tags && (column.tags as any[]).length > 0 && (
              <div className="mt-12 pt-8 border-t-3 border-border border-dashed">
                <div className="flex flex-wrap gap-2">
                  {(column.tags as any[]).map((tagItem: any, index: number) => (
                    <Link
                      key={index}
                      href={`/column?tag=${tagItem.tag}`}
                      className="inline-block bg-gray-50 hover:bg-yellow text-gray-600 hover:text-text font-bold text-sm px-4 py-2 rounded-lg border-2 border-transparent hover:border-border transition-all"
                    >
                      #{tagItem.tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Reservation Form Section */}
          {column.reservationSettings?.enabled && (
            <div className="mt-12">
              <ReservationForm column={column} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
