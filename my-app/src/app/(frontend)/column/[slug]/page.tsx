import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ColumnDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
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
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#b3e41d_2px,transparent_2px)] bg-size-[24px_24px] pointer-events-none"></div>

      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <div className="mb-12">
          <Link
            href="/column"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-text font-black rounded-full border-3 border-border shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all mb-8 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
            BACK TO LIST
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

            <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-text prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue prose-a:font-bold prose-a:no-underline prose-a:border-b-2 prose-a:border-blue/30 hover:prose-a:border-blue prose-img:rounded-xl prose-img:border-3 prose-img:border-border prose-img:shadow-md">
              {column.content && <RichText data={column.content} />}
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
        </div>
      </div>
    </div>
  )
}
