'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Media } from '@/payload-types'

type ConceptProps = {
  data?: {
    title?: string | null
    subtitle?: string | null
    main_image?: number | Media | null
    features?:
      | {
          image?: number | Media | null
          title?: string | null
          description?: string | null
          id?: string | null
        }[]
      | null
    activities?:
      | {
          text?: string | null
          color?: ('bg-lime' | 'bg-yellow' | 'bg-blue' | 'bg-pink' | 'bg-purple') | null
          id?: string | null
        }[]
      | null
    description_1?: string | null
    description_2?: string | null
  } | null
}

export const Concept = ({ data }: ConceptProps) => {
  if (!data) return null

  const {
    title,
    subtitle,
    main_image,
    features: rawFeatures,
    activities: rawActivities,
    description_1,
    description_2,
  } = data

  const features = rawFeatures || []
  const activities = rawActivities || []

  const mainImageUrl = main_image && typeof main_image === 'object' ? main_image.url : null
  const hasFeatures = features && features.length > 0

  return (
    <section className="py-12 md:py-24 bg-yellow relative overflow-hidden">
      {/* Main Image Background if available */}
      {mainImageUrl && (
        <div className="absolute inset-0 z-0">
          <Image src={mainImageUrl} alt="Background" fill className="object-cover opacity-10" />
        </div>
      )}

      {/* Static Background Pattern (Cleaner look) */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-24"
        >
          <div className="inline-block relative mb-6">
            <h2 className="text-4xl md:text-7xl font-black text-text tracking-tighter relative z-10">
              {title || 'はなとたねってどんなところ？'}
            </h2>
            {/* Simple underline accent instead of animated bar */}
            <div className="absolute bottom-2 left-0 w-full h-3 bg-white/60 -z-10 rounded-full transform -rotate-1"></div>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="bg-white px-8 py-4 md:px-12 md:py-6 rounded-2xl border-4 border-text shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-3xl">
              <p className="text-xl md:text-3xl font-bold text-text whitespace-pre-wrap leading-relaxed">
                {subtitle || '子どもも大人も\n心地よく居られる場所'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards / Main Content */}
        {hasFeatures ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
            {features?.map((feature, i) => {
              const imgUrl =
                feature.image && typeof feature.image === 'object' ? feature.image.url : null
              return (
                <motion.div
                  key={feature.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl overflow-hidden border-3 border-text shadow-hard flex flex-col h-full hover:shadow-hard-lg transition-shadow duration-300"
                >
                  {imgUrl && (
                    <div className="relative h-56 w-full border-b-3 border-text bg-gray-50">
                      <Image
                        src={imgUrl}
                        alt={feature.title || 'Feature image'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-black text-text mb-4 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-text/80 font-medium leading-relaxed flex-1 text-lg">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          /* Fallback description layout */
          <div className="max-w-5xl mx-auto grid gap-8 mb-20">
            {(description_1 || description_2) && (
              <div className="grid md:grid-cols-2 gap-8">
                {description_1 && (
                  <div className="bg-white p-8 rounded-2xl border-3 border-text shadow-hard">
                    <p className="font-bold text-lg text-text leading-loose whitespace-pre-wrap">
                      {description_1}
                    </p>
                  </div>
                )}
                {description_2 && (
                  <div className="bg-white p-8 rounded-2xl border-3 border-text shadow-hard">
                    <p className="font-bold text-lg text-text leading-loose whitespace-pre-wrap">
                      {description_2}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Activities Tags (Static & Clean) */}
        {activities.length > 0 && (
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-2xl font-black text-text mb-8 flex items-center justify-center gap-3">
              <span className="w-2 h-2 bg-text rounded-full"></span>
              いろいろな活動ができます！
              <span className="w-2 h-2 bg-text rounded-full"></span>
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {activities.map((act, i) => (
                <span
                  key={act.id || i}
                  className={`px-6 py-2 md:px-8 md:py-3 ${
                    act.color || 'bg-white'
                  } text-text font-black text-base md:text-lg rounded-xl border-3 border-text shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default`}
                >
                  {act.text}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
