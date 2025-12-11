import Image from 'next/image'
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Media, Freeschool } from '@/payload-types'
type AboutProps = {
  data?: Freeschool['about']
}
export const About = ({ data }: AboutProps) => {
  const images = data?.images || []
  const benefits = data?.benefits || []
  // Helpers to get image URL safely
  const getImageUrl = (img: any) => {
    if (img && typeof img === 'object' && img.url) return img.url
    if (typeof img === 'string') return img
    return null
  }
  const img1 = images[0] ? getImageUrl(images[0].image) : '/images/freeschool/about-interior-1.jpg'
  const img2 = images[1] ? getImageUrl(images[1].image) : '/images/freeschool/about-interior-2.jpg'
  const img3 = images[2] ? getImageUrl(images[2].image) : '/images/freeschool/about-interior-3.jpg'
  return (
    <section className="py-24 bg-surface relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-blue tracking-tight mb-2 uppercase">
            WHAT IS IPPO?
          </h2>
          <p className="font-bold text-gray-400">いっぽについて</p>
        </div>
        <div className="bg-white rounded-[3rem] border-3 border-border shadow-hard-lg p-8 md:p-12 max-w-5xl mx-auto relative overflow-hidden backdrop-blur-sm">
          {/* Decorative Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow/80 rotate-1 shadow-sm z-20"></div>
          {/* Background Collage Photos (Absolute positioning around text) */}
          <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 -translate-x-1/4 -translate-y-1/4 z-0 opacity-80 rotate-[-10deg] border-4 border-white shadow-lg rounded-xl overflow-hidden">
            {img1 && <Image src={img1} alt="Interior 1" fill className="object-cover" />}
          </div>
          <div className="absolute bottom-0 right-0 w-40 h-40 md:w-56 md:h-56 translate-x-1/4 translate-y-1/4 z-0 opacity-80 rotate-[5deg] border-4 border-white shadow-lg rounded-xl overflow-hidden">
            {img2 && <Image src={img2} alt="Interior 2" fill className="object-cover" />}
          </div>
          <div className="hidden md:block absolute top-[20%] -right-8 w-32 h-32 z-0 opacity-80 rotate-[15deg] border-4 border-white shadow-lg rounded-xl overflow-hidden">
            {img3 && <Image src={img3} alt="Interior 3" fill className="object-cover" />}
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black text-center mb-8 text-text leading-relaxed">
              自然の中で、
              <br className="md:hidden" />
              自分らしく。
            </h3>
            {/* Certification Text Frame */}
            <div className="border-4 border-double border-yellow-600 p-8 rounded-lg bg-[#fffdf5] mb-12 shadow-inner relative max-w-3xl mx-auto">
              {/* Stamp Effect */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-4 border-red-500 rounded-full opacity-60 flex items-center justify-center -rotate-12 mask-rough">
                <span className="text-red-500 font-extrabold text-sm pointer-events-none select-none text-center leading-tight">
                  認定
                  <br />
                  証明
                </span>
              </div>
              <div className="text-lg font-medium text-gray-800 leading-loose text-center">
                {data?.body ? <RichText data={data.body} /> : <></>}
              </div>
            </div>
            {/* Benefits / Checks from CMS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {benefits.length > 0 ? (
                benefits.map((b, i) => {
                  const isPink = b.color === 'bg-pink' || !b.color
                  const bgColor = isPink ? 'bg-pink/10' : 'bg-blue/10'
                  const borderColor = isPink ? 'border-pink' : 'border-blue'
                  const circleColor = isPink ? 'bg-pink' : 'bg-blue'
                  const iconPath = isPink
                    ? '/images/freeschool/icon-check.jpg'
                    : '/images/freeschool/icon-check-blue.jpg'
                  return (
                    <div
                      key={b.id || i}
                      className={`${bgColor} p-6 rounded-2xl border-2 ${borderColor} flex items-center gap-4 hover:scale-105 transition-transform`}
                    >
                      <div
                        className={`w-12 h-12 ${circleColor} rounded-full flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-sm relative overflow-hidden`}
                      >
                        <Image
                          src={iconPath}
                          alt="Check"
                          fill
                          className="object-cover mix-blend-overlay"
                        />
                        <span className="relative z-10">✓</span>
                      </div>
                      <span className="font-bold text-text">{b.text}</span>
                    </div>
                  )
                })
              ) : (
                // Fallback hardcoded if no CMS data
                <>
                  <div className="bg-pink/10 p-6 rounded-2xl border-2 border-pink flex items-center gap-4 hover:scale-105 transition-transform">
                    <div className="w-12 h-12 bg-pink rounded-full flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-sm relative overflow-hidden">
                      <Image
                        src="/images/freeschool/icon-check.jpg"
                        alt="Check"
                        fill
                        className="object-cover mix-blend-overlay"
                      />
                      <span className="relative z-10">✓</span>
                    </div>
                    <span className="font-bold text-text">通所費等の補助対象</span>
                  </div>
                  <div className="bg-blue/10 p-6 rounded-2xl border-2 border-blue flex items-center gap-4 hover:scale-105 transition-transform">
                    <div className="w-12 h-12 bg-blue rounded-full flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-sm relative overflow-hidden">
                      <Image
                        src="/images/freeschool/icon-check-blue.jpg"
                        alt="Check"
                        fill
                        className="object-cover mix-blend-overlay"
                      />
                      <span className="relative z-10">✓</span>
                    </div>
                    <span className="font-bold text-text">学校の出席扱い認定実績あり</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
