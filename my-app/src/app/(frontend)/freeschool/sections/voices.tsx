import React from 'react'
import Image from 'next/image'
import { Freeschool } from '@/payload-types'

type VoicesProps = {
  data?: Freeschool['voices']
}

const CATEGORY_LABEL: Record<string, string> = {
  graduate: '卒業生',
  parent: '保護者',
}

export const Voices = ({ data }: VoicesProps) => {
  const items = data?.items?.filter((item) => item.body || item.name) ?? []

  if (items.length === 0) return null

  return (
    <section className="py-12 md:py-24 bg-lime/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-lime/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-text mb-4 inline-block border-b-4 border-lime pb-2">
            {data?.title || '卒業生・保護者の声'}
          </h2>
          {data?.subtitle && <p className="font-semibold text-gray-600 mt-2">{data.subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {items.map((item, index) => {
            const imageUrl =
              item.image && typeof item.image === 'object' && item.image.url
                ? item.image.url
                : null

            return (
              <div
                key={index}
                className="bg-white p-6 md:p-8 rounded-3xl border-3 border-border shadow-hard flex flex-col h-full"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full border-2 border-border bg-gray-100 shrink-0 overflow-hidden relative flex items-center justify-center">
                    {imageUrl ? (
                      <Image src={imageUrl} alt={item.name || ''} fill className="object-cover" />
                    ) : (
                      <span className="text-2xl">👤</span>
                    )}
                  </div>
                  <div>
                    {item.name && <p className="font-black text-text leading-tight">{item.name}</p>}
                    <p className="text-sm font-semibold text-gray-500">
                      {item.attribute || CATEGORY_LABEL[item.category || 'graduate']}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 font-medium leading-relaxed whitespace-pre-wrap flex-1">
                  {item.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
