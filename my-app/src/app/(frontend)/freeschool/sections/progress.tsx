import React from 'react'
import { Freeschool } from '@/payload-types'

type ProgressProps = {
  data?: Freeschool['progress']
}

export const ProgressResults = ({ data }: ProgressProps) => {
  const items = data?.items?.filter((item) => item.destination) ?? []

  if (items.length === 0) return null

  return (
    <section className="py-12 md:py-24 bg-blue/10 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-text mb-4 inline-block border-b-4 border-blue pb-2">
            {data?.title || '進学実績'}
          </h2>
          {data?.description && (
            <p className="font-semibold text-gray-600 mt-2 whitespace-pre-wrap">
              {data.description}
            </p>
          )}
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-3xl border-3 border-border shadow-hard p-6 md:p-10">
          <ul className="divide-y-2 divide-gray-100">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-4"
              >
                {item.year && (
                  <span className="shrink-0 font-black text-sm text-blue bg-blue/10 border-2 border-blue/30 rounded-full px-4 py-1 w-fit">
                    {item.year}
                  </span>
                )}
                <span className="font-black text-lg text-text">{item.destination}</span>
                {item.note && <span className="text-sm text-gray-500 font-medium">{item.note}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
