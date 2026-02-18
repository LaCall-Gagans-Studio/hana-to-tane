import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'

import type { Metadata } from 'next'

export const revalidate = 60

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const category =
    typeof resolvedSearchParams?.category === 'string' ? resolvedSearchParams.category : undefined
  const tag = typeof resolvedSearchParams?.tag === 'string' ? resolvedSearchParams.tag : undefined
  const query = typeof resolvedSearchParams?.q === 'string' ? resolvedSearchParams.q : undefined

  let title = 'はなとたね図書館'
  if (category) {
    const categoryLabels: { [key: string]: string } = {
      free_school: 'フリースクール',
      event: 'イベント',
      other: 'その他',
    }
    title = `${categoryLabels[category] || category} | はなとたね図書館`
  } else if (tag) {
    title = `#${tag} | はなとたね図書館`
  } else if (query) {
    title = `"${query}"の検索結果 | はなとたね図書館`
  }

  return {
    title,
    description: '日々の活動の様子やイベント情報、フリースクールでの出来事などをお届けします。',
  }
}

export default async function ColumnPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const query = typeof resolvedSearchParams?.q === 'string' ? resolvedSearchParams.q : undefined
  const category =
    typeof resolvedSearchParams?.category === 'string' ? resolvedSearchParams.category : undefined
  const tag = typeof resolvedSearchParams?.tag === 'string' ? resolvedSearchParams.tag : undefined

  const payload = await getPayload({ config: configPromise })

  const where: any = {
    and: [],
  }

  if (query) {
    where.and.push({
      title: {
        contains: query,
      },
    })
  }

  if (category) {
    where.and.push({
      category: {
        equals: category,
      },
    })
  }

  if (tag) {
    where.and.push({
      'tags.tag': {
        equals: tag,
      },
    })
  }

  const columns = await payload.find({
    collection: 'column',
    where: where.and.length > 0 ? where : undefined,
    sort: '-publishedDate',
  })

  // カテゴリのラベル定義
  const categoryLabels: { [key: string]: string } = {
    free_school: 'フリースクール',
    event: 'イベント',
    other: 'その他',
  }

  return (
    <div className="bg-surface min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#b3e41d_2px,transparent_2px)] bg-size-[24px_24px] pointer-events-none"></div>

      <div className="bg-blue border-border relative pt-32 pb-24 overflow-hidden">
        {/* Decorative Elements - Refined */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink/20 rounded-full blur-2xl"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="inline-block text-6xl md:text-8xl font-black text-text mb-6 relative tracking-tighter">
            はなとたね図書館
            <span className="absolute -bottom-2 left-0 w-full h-4 bg-yellow/50 -z-10 rounded-full"></span>
          </h1>
          <p className="text-xl font-bold text-surface drop-shadow-md max-w-2xl mx-auto">
            日々の活動の様子やイベント情報、フリースクールでの出来事などをお届けします。
          </p>
        </div>

        {/* Wavy Bottom Border */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 translate-y-1">
          <svg
            className="relative block w-[calc(100%+1.3px)] h-[40px]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-surface"
            ></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* 検索・フィルタリング - Clean & Professional */}
        <div className="mb-20 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-3xl shadow-hard border-3 border-border">
            <form action="/column" method="get" className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label
                  htmlFor="q"
                  className="block text-sm font-black text-gray-500 mb-2 uppercase tracking-wider"
                >
                  Keywords
                </label>
                <input
                  type="text"
                  name="q"
                  id="q"
                  defaultValue={query}
                  placeholder="記事を検索..."
                  className="w-full px-4 py-3 bg-gray-50 border-3 border-border rounded-xl focus:ring-4 focus:ring-blue/20 focus:border-blue transition-all outline-none font-bold shadow-sm"
                />
              </div>
              <div className="w-full md:w-64">
                <label
                  htmlFor="category"
                  className="block text-sm font-black text-gray-500 mb-2 uppercase tracking-wider"
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    name="category"
                    id="category"
                    defaultValue={category || ''}
                    className="w-full px-4 py-3 bg-gray-50 border-3 border-border rounded-xl focus:ring-4 focus:ring-blue/20 focus:border-blue appearance-none transition-all outline-none cursor-pointer font-bold shadow-sm"
                  >
                    <option value="">すべて</option>
                    <option value="free_school">フリースクール</option>
                    <option value="event">イベント</option>
                    <option value="other">その他</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue text-text font-black rounded-xl border-3 border-border hover:bg-blue/80 hover:-translate-y-1 hover:shadow-hard transition-all shadow-sm h-[52px]"
                >
                  検索
                </button>
                {(query || category || tag) && (
                  <Link
                    href="/column"
                    className="px-6 py-3 bg-gray-100 text-text font-black rounded-xl border-3 border-border hover:bg-gray-200 transition-all h-[52px] flex items-center"
                  >
                    リセット
                  </Link>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* 記事一覧 - Consistent Polaroid Grid */}
        {columns.docs.length === 0 ? (
          <div className="text-center py-20 bg-white border-3 border-border border-dashed rounded-3xl max-w-2xl mx-auto">
            <div className="inline-block p-6 rounded-full bg-gray-50 mb-6 border-3 border-border">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <p className="text-text text-xl font-bold mb-2">記事が見つかりませんでした。</p>
            <p className="text-gray-500 font-medium">検索条件を変更して再度お試しください。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {columns.docs.map((col: any, index: number) => (
              <Link href={`/column/${col.slug}`} key={col.id} className="group block h-full">
                <article className="bg-white border-3 border-border p-4 pb-6 shadow-hard transition-all hover:-translate-y-2 hover:shadow-hard-lg h-full flex flex-col">
                  <div className="relative aspect-video w-full bg-gray-100 border-3 border-border mb-6 overflow-hidden rounded-lg">
                    {col.image && typeof col.image !== 'string' && col.image.url ? (
                      <Image
                        src={col.image.url}
                        alt={col.image.alt || col.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-300 bg-gray-50">
                        <svg
                          className="w-12 h-12"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black border-2 border-border text-text shadow-sm ${col.category === 'event' ? 'bg-pink' : 'bg-lime'}`}
                      >
                        {categoryLabels[col.category] || col.category}
                      </span>
                    </div>
                  </div>

                  <div className="px-2 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-3">
                      <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                      <time dateTime={col.publishedDate}>
                        {new Date(col.publishedDate).toLocaleDateString('ja-JP')}
                      </time>
                    </div>

                    <h2 className="text-xl font-black text-text mb-4 group-hover:text-blue transition-colors line-clamp-2 leading-snug">
                      {col.title}
                    </h2>

                    <div className="mt-auto pt-2 flex flex-wrap gap-2">
                      {col.tags?.map((tagItem: any) => (
                        <span
                          key={tagItem.tag}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-gray-50 text-gray-600 border border-transparent group-hover:border-border group-hover:bg-yellow group-hover:text-text transition-all"
                        >
                          #{tagItem.tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-end mt-4">
                      <span className="text-sm font-bold text-blue border-b-2 border-transparent group-hover:border-blue transition-all">
                        READ MORE &rarr;
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
