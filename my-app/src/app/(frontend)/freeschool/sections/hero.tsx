import Image from 'next/image'
import React from 'react'
import { Media, Freeschool } from '@/payload-types'

type HeroProps = {
  data?: Freeschool['hero']
  schoolName?: string | null
}

export const Hero = ({ data, schoolName }: HeroProps) => {
  const { catchphrase, subcopy, mainImage, decorativeImages } = data || {}

  const bgImageUrl =
    mainImage && typeof mainImage === 'object' && mainImage.url
      ? mainImage.url
      : '/images/freeschool/hero-bg.jpg'

  // Default texts
  // If schoolName is provided, we prioritize it as the main visual element.
  const displaySchoolName = schoolName || '森の子がっこう\nいっぽ'
  const displayCatchphrase = catchphrase || '森の子がっこう\nいっぽ'
  const descriptionText = subcopy || '学校以外の「居場所」「相談の場」「学びの場」'

  // Logic:
  // If we have a specific schoolName (e.g. "森の子がっこう いっぽ"), we show it.
  // The catchphrase might be something else like "自然の中で育つ".
  // If catchphrase includes the school name, we might want to just show the school name.

  // Let's use schoolName for the big text.
  // Check if schoolName has a newline or space we can split on for styling.
  // "森の子がっこう いっぽ" -> line1: 森の子がっこう, line2: いっぽ
  const nameParts = displaySchoolName.split(/[\n\s]+/)
  const line1 = nameParts[0]
  const line2 = nameParts.length > 1 ? nameParts.slice(1).join(' ') : null

  return (
    <section className="relative min-h-[90vh] flex items-center bg-blue/30 overflow-hidden pt-20 pb-32">
      {/* Abstract Background Shapes (Blobs) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Subtle grid or texture pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_2px,transparent_2px)] bg-size-[30px_30px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content Area (Text) */}
          <div className="relative z-10 space-y-8 text-center lg:text-left">
            {/* Certification Badge - Playful style */}
            <div className="inline-block transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="bg-lime text-text font-black px-6 py-2 rounded-full border-3 border-border shadow-hard text-sm md:text-base tracking-wider">
                ✨ 鳥取県・市教育委員会認定 ✨
              </div>
            </div>

            {/* Typography - Main Title with Pop styling */}
            <div className="relative">
              {/* Backing brush stroke/shape behind title */}
              <svg
                className="absolute top-1/2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:-translate-x-4 -translate-y-1/2 w-[110%] h-[140%] -z-10 text-white fill-current opacity-90"
                viewBox="0 0 200 120"
                preserveAspectRatio="none"
              >
                <path d="M10,60 Q30,10 90,30 T190,60 Q170,110 90,90 T10,60" />
              </svg>

              <h1 className="font-black text-text leading-tight drop-shadow-sm">
                <span className="block text-4xl mb-2 text-blue-900">{catchphrase}</span>
                <span className="block text-7xl text-blue drop-shadow-[4px_4px_0px_rgba(255,255,255,1)] stroke-text stroke-2">
                  {displaySchoolName}
                </span>
              </h1>
            </div>

            {/* Description Bubble */}
            <div className="relative inline-block lg:block max-w-xl mx-auto lg:mx-0">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-dashed border-3 border-blue shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <p className="text-lg md:text-xl font-bold text-gray-700 leading-relaxed font-handwriting whitespace-pre-wrap">
                  {descriptionText}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Visual Area (Organic Image Mask) */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* Main Photo Blob Mask */}
            <div className="relative w-full h-full">
              {/* Organic Border/Frame */}
              <div className="absolute inset-0 bg-yellow translate-x-4 translate-y-4 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-morph-slow opacity-80 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-pink -translate-x-2 -translate-y-2 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-morph-slower opacity-80 mix-blend-multiply"></div>

              {/* The Image Itself masked */}
              <div className="relative w-full h-full rounded-[50%_50%_50%_50%/50%_50%_50%_50%] overflow-hidden border-8 border-white shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-700 ease-elastic">
                <Image
                  src={bgImageUrl}
                  alt="School Life"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  priority
                />
                {/* Overlay Text/Sticker */}
                <div className="absolute bottom-10 right-10 bg-white p-3 rounded-xl border-2 border-border shadow-hard transform rotate-6">
                  <span className="font-black text-blue text-lg">ENJOY!</span>
                </div>
              </div>

              {/* Floating Decorative Items (Peeking) */}
              {decorativeImages &&
                decorativeImages.map((img, i) => {
                  const url =
                    img.image && typeof img.image === 'object' && img.image.url
                      ? img.image.url
                      : null
                  if (!url) return null
                  return (
                    <div
                      key={i}
                      className={`absolute w-32 md:w-48 aspect-square z-20 rounded-full border-4 border-white shadow-lg overflow-hidden animate-float`}
                      style={{
                        top: i === 0 ? '-10%' : 'auto',
                        bottom: i === 1 ? '-5%' : 'auto',
                        left: i === 1 ? '-5%' : 'auto',
                        right: i === 0 ? '-5%' : 'auto',
                        animationDelay: `${i * 1.5}s`,
                      }}
                    >
                      <Image src={url} alt="Decoration" fill className="object-cover" />
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Playful Wavy Bottom Border - Paper Cut style */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-1">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[80px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-surface stroke-border stroke-2"
            transform="rotate(180 600 60)"
          />
        </svg>
      </div>
    </section>
  )
}
