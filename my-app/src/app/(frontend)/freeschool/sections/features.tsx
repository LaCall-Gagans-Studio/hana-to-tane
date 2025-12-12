import Image from 'next/image'
import React from 'react'
import { Media, Freeschool } from '@/payload-types'

type FeaturesProps = {
  data?: Freeschool['features']
}

const ROTATIONS = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-1']

export const Features = ({ data }: FeaturesProps) => {
  return (
    <section className="py-12 md:py-24 bg-surface relative overflow-visible">
      {/* Wood Texture Background or Tablecloth Pattern could be nice here, keeping subtle for now but adding texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'url("/images/textures/paper-texture.png")' }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-20 relative">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-9xl font-black text-gray-100 -z-10 select-none">
            FEATURES
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-text mb-2 tracking-tight">
            いっぽの特徴
          </h2>
          <div className="w-24 h-2 bg-yellow mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto perspective-[1000px]">
          {data?.map((f, i) => {
            const imageUrl =
              f.image && typeof f.image === 'object' && f.image.url
                ? f.image.url
                : typeof f.image === 'string'
                  ? f.image
                  : ''
            const rotation = ROTATIONS[i % ROTATIONS.length]
            // CMS 'backgroundColor' usually comes as value "bg-lime".
            // We can use it for the card background or text area.
            // Let's use it for the text area bg to simulate a colored note part, keeping the photo part white/clean.
            const bgColorClass = f.backgroundColor || 'bg-white'

            return (
              <div
                key={i}
                className={`group relative bg-white p-4 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:z-20 hover:shadow-2xl ${rotation}`}
              >
                {/* Masking Tape (Top Center) */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-gray-200/50 backdrop-blur-sm -rotate-1 z-30 shadow-sm border-l border-r border-white/40"></div>

                {/* Photo Area */}
                <div className="relative aspect-4/3 w-full mb-4 overflow-hidden rounded-lg shadow-inner bg-gray-100">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={f.title || 'Feature'}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  {!imageUrl && (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold">
                      No Image
                    </div>
                  )}

                  {/* Gloss Overlay */}
                  <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent pointer-events-none opacity-50"></div>
                </div>

                {/* Text Area */}
                <div
                  className={`text-center px-4 py-4 rounded-lg ${bgColorClass !== 'bg-white' ? bgColorClass + '/20' : ''}`}
                >
                  <h3 className="text-xl md:text-2xl font-black text-gray-800 mb-2 font-handwriting">
                    {f.title}
                  </h3>
                  <p className="text-sm md:text-base font-bold text-gray-500 leading-snug whitespace-pre-wrap">
                    {f.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
