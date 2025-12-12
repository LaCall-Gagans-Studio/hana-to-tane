import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar } from '../sections/calendar'

export default async function EventPage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch all events for the calendar (client component handles filtering)
  const events = await payload.find({
    collection: 'events',
    limit: 100, // Reasonable limit
  })

  // Fetch 'event' category columns
  const reportColumns = await payload.find({
    collection: 'column',
    where: {
      category: {
        equals: 'event',
      },
    },
    limit: 9, // Reasonable limit for a page
    sort: '-publishedDate',
  })

  // Reusing Column rendering logic from column.tsx
  const categoryLabels: { [key: string]: string } = {
    free_school: 'フリースクール',
    event: 'イベント',
    other: 'その他',
  }

  return (
    <main>
      {/* Use the Calendar component */}
      {/* Note: The Calendar component already has section structure (border-y-4 etc). 
           We might want to ensure it connects well visually. */}
      <Calendar events={events.docs} />

      {/* Event Reports Section */}
      <section id="event-reports" className="py-24 bg-surface relative">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-6xl font-black text-text tracking-tighter mb-4 relative inline-block">
                EVENT REPORTS
                <span className="absolute -bottom-2 left-0 w-full h-4 bg-yellow block -z-10 rounded-full transform -rotate-1"></span>
              </h2>
              <p className="text-xl font-bold text-gray-600">イベントの様子や活動報告</p>
            </div>
          </div>

          {reportColumns.docs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reportColumns.docs.map((col: any) => (
                <Link
                  href={`/column/${col.slug}`}
                  key={col.id}
                  className="group block bg-white border-3 border-border p-4 pb-6 shadow-hard transition-all hover:-translate-y-2 hover:shadow-hard-lg flex flex-col h-full"
                >
                  {/* Image Area */}
                  <div className="aspect-video w-full bg-gray-100 border-3 border-border mb-6 relative overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10"></div>
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
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full border-2 border-border font-black text-xs shadow-sm z-20 ${
                        col.category === 'event' ? 'bg-pink text-text' : 'bg-lime text-text'
                      }`}
                    >
                      {categoryLabels[col.category] || col.category}
                    </span>
                  </div>

                  {/* Content Area */}
                  <div className="px-2 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                      <p className="text-sm font-bold text-gray-500">
                        {new Date(col.publishedDate).toLocaleDateString('ja-JP')}
                      </p>
                    </div>

                    <h3 className="text-xl font-black leading-snug mb-4 text-text group-hover:text-blue transition-colors line-clamp-2">
                      {col.title}
                    </h3>

                    <div className="flex justify-end mt-auto">
                      <span className="text-sm font-bold text-blue border-b-2 border-transparent group-hover:border-blue transition-all">
                        READ MORE &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-2xl font-bold text-gray-400">現在レポートはありません。</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
