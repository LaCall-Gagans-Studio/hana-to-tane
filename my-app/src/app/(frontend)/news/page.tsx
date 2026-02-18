import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { Header } from '../header'
import { Footer } from '../footer'

import type { Metadata } from 'next'

export const revalidate = 60

export function generateMetadata(): Metadata {
  return {
    title: 'NEWS & TOPICS',
    description: 'はなとたねからの最新情報。フリースクールやイベントのニュースをお届けします。',
  }
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const payload = await getPayload({ config: configPromise })
  const currentPage = page ? parseInt(page) : 1
  const limit = 10

  const newsData = await payload.find({
    collection: 'news',
    limit,
    page: currentPage,
    sort: '-publishedDate',
  })

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-slate-800">
      <Header />

      <main className="pb-24">
        {/* Header Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-surface">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a349a3_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none"></div>

          {/* Blob */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-blob animation-delay-2000"></div>

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <h1 className="inline-block text-4xl md:text-6xl font-black text-white bg-purple px-12 py-4 border-4 border-border shadow-hard mb-8 transform -rotate-2">
              NEWS & TOPICS
            </h1>
            <p className="text-xl md:text-2xl font-bold text-slate-600 bg-white/80 mx-auto px-6 py-2 rounded-full border-2 border-border shadow-sm">
              はなとたねからの最新情報
            </p>
          </div>

          {/* Wavy Line Separator */}
          <div className="absolute bottom-0 left-0 w-full leading-none rotate-180">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="fill-stone-100"
              ></path>
            </svg>
          </div>
        </section>

        {/* News List */}
        <div className="max-w-4xl mx-auto px-4 mt-12">
          <div className="flex flex-col gap-6">
            {newsData.docs.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl font-bold text-gray-500">まだニュースはありません。</p>
              </div>
            ) : (
              newsData.docs.map((item) => (
                <div
                  key={item.id}
                  className={`group relative bg-white border-3 border-border rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-hard-lg flex flex-col md:flex-row items-start md:items-center gap-4`}
                >
                  {/* Ticket holes effect */}
                  <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-stone-100 border-r-3 border-border rounded-full"></div>
                  <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-stone-100 border-l-3 border-border rounded-full"></div>

                  <div className="flex items-center gap-4 w-full md:w-auto min-w-[200px]">
                    <span className="text-lg font-black text-text border-b-4 border-lime">
                      {new Date(item.publishedDate).toLocaleDateString('ja-JP')}
                    </span>
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-black border-2 border-text shadow-sm ${
                        item.category === 'EVENT'
                          ? 'bg-pink text-text'
                          : item.category === 'REPORT'
                            ? 'bg-green text-white'
                            : 'bg-blue text-text'
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                  <div className="flex-1">
                    {item.link ? (
                      <a
                        href={item.link}
                        className="block group-hover:text-purple transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h2 className="font-bold text-xl line-clamp-2">{item.title}</h2>
                      </a>
                    ) : (
                      <h2 className="font-bold text-xl group-hover:text-purple transition-colors line-clamp-2">
                        {item.title}
                      </h2>
                    )}
                  </div>
                  <span
                    className={`hidden md:block text-2xl font-black text-lime group-hover:translate-x-2 transition-transform ${
                      !item.link ? 'opacity-30' : ''
                    }`}
                  >
                    &rarr;
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {newsData.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-16">
              {newsData.hasPrevPage ? (
                <Link
                  href={`/news?page=${newsData.prevPage}`}
                  className="px-6 py-2 bg-white border-3 border-border rounded-full font-bold hover:bg-gray-100 shadow-hard"
                >
                  &larr; 前へ
                </Link>
              ) : (
                <button
                  disabled
                  className="px-6 py-2 bg-gray-200 border-3 border-gray-300 rounded-full font-bold text-gray-400 cursor-not-allowed"
                >
                  &larr; 前へ
                </button>
              )}

              <span className="font-black text-xl px-4">
                {currentPage} / {newsData.totalPages}
              </span>

              {newsData.hasNextPage ? (
                <Link
                  href={`/news?page=${newsData.nextPage}`}
                  className="px-6 py-2 bg-white border-3 border-border rounded-full font-bold hover:bg-gray-100 shadow-hard"
                >
                  次へ &rarr;
                </Link>
              ) : (
                <button
                  disabled
                  className="px-6 py-2 bg-gray-200 border-3 border-gray-300 rounded-full font-bold text-gray-400 cursor-not-allowed"
                >
                  次へ &rarr;
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
