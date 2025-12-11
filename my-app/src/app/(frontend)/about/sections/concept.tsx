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

const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
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
    <section className="py-24 bg-yellow relative overflow-hidden">
      {/* Main Image Background if available */}
      {mainImageUrl && (
        <div className="absolute inset-0 z-0">
          <Image src={mainImageUrl} alt="Background" fill className="object-cover opacity-10" />
        </div>
      )}

      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-blue rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_4px,transparent_4px)] bg-size-[30px_30px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block relative mb-8">
            <h2 className="text-4xl md:text-6xl font-black text-text tracking-tight relative z-10">
              {title || 'はなとたねってどんなところ？'}
            </h2>
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-4 bg-white/50 -rotate-1 z-0 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.span>
          </div>

          <div className="mt-8">
            <div className="inline-block bg-white px-10 py-6 rounded-3xl border-4 border-text shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
              <p className="text-xl md:text-3xl font-black text-text whitespace-pre-wrap leading-relaxed">
                {subtitle || '子どもも大人も\n心地よく居られる場所'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards / Main Content */}
        {hasFeatures ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {features?.map((feature, i) => {
              const imgUrl =
                feature.image && typeof feature.image === 'object' ? feature.image.url : null
              return (
                <motion.div
                  key={feature.id || i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  className="bg-white rounded-3xl overflow-hidden border-3 border-text shadow-hard flex flex-col h-full"
                >
                  {imgUrl && (
                    <div className="relative h-48 w-full border-b-3 border-text bg-gray-100">
                      <Image
                        src={imgUrl}
                        alt={feature.title || 'Feature image'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-black text-text mb-3">{feature.title}</h3>
                    <p className="text-text/80 font-bold whitespace-pre-wrap leading-relaxed flex-1">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          /* Fallback to legacy description if no features */
          <div className="max-w-4xl mx-auto grid gap-8 mb-20">
            {(description_1 || description_2) && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-8"
              >
                {description_1 && (
                  <div className="bg-white p-8 rounded-3xl border-3 border-border shadow-hard">
                    <p className="font-bold text-lg text-text whitespace-pre-wrap">
                      {description_1}
                    </p>
                  </div>
                )}
                {description_2 && (
                  <div className="bg-white p-8 rounded-3xl border-3 border-border shadow-hard">
                    <p className="font-bold text-lg text-text whitespace-pre-wrap">
                      {description_2}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}

        {/* Activities Bubbles */}
        {activities.length > 0 && (
          <div className="text-center">
            <h3 className="text-2xl font-black text-text mb-10">いろいろな活動</h3>
            <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
              {activities.map((act, i) => (
                <motion.span
                  key={act.id || i}
                  variants={floatAnimation}
                  animate="animate"
                  custom={i}
                  className={`px-8 py-4 ${
                    act.color || 'bg-white'
                  } text-text font-black text-lg rounded-full border-3 border-text shadow-hard transform hover:scale-110 transition-transform cursor-default relative z-10`}
                  style={{
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  {act.text}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
