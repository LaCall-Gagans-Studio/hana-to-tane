import Image from 'next/image'
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Media, Freeschool } from '@/payload-types'

type ScheduleProps = {
  data?: Freeschool['schedule']
}

export const Schedule = ({ data }: ScheduleProps) => {
  // Use CMS data if available, otherwise fallback (or empty)
  // We want to support the specific blackboard items from CMS.
  const scheduleItems = data?.scheduleItems || []

  // If no CMS items, we can show a default set or just the body
  const showItems = scheduleItems.length > 0

  const imageUrl =
    data?.image && typeof data.image === 'object' && data.image.url ? data.image.url : null

  return (
    <section className="py-16 bg-surface relative overflow-visible">
      <div className="container mx-auto px-4">
        {/* Blackboard Container */}
        <div className="bg-[#2d3748] rounded-4xl border-8 border-[#8b5a2b] shadow-2xl p-6 md:p-10 max-w-4xl mx-auto relative overflow-hidden">
          {/* Chalk Dust Texture */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-noise mix-blend-overlay"></div>
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "url('/images/textures/chalk-texture.png')" }}
          ></div>
          {/* Chalk Tray */}
          <div className="absolute bottom-0 left-0 w-full h-4 bg-[#5d4037] border-t border-[#3e2723] z-20"></div>
          <div className="absolute bottom-4 right-12 w-16 h-2 bg-white rounded-full opacity-80 shadow-sm transform rotate-12"></div>{' '}
          {/* Chalk piece */}
          <div className="text-center mb-10 relative z-10">
            <h2
              className="text-4xl md:text-5xl font-black text-white/90 mb-2 font-handwriting tracking-wide"
              style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.3)' }}
            >
              DAILY SCHEDULE
            </h2>
            <div className="w-1/2 h-1 bg-white/30 mx-auto rounded-full"></div>
            <p className="mt-2 font-bold text-gray-300 font-handwriting text-lg">1日の流れ</p>
          </div>
          <div className="max-w-3xl mx-auto relative z-10">
            {/* Rich Text Body (Optional Intro) */}
            {data?.body && (
              <div className="font-handwriting text-white text-xl leading-relaxed space-y-6 mb-8">
                <RichText data={data.body} />
              </div>
            )}

            {/* Main Schedule Items from CMS */}
            {showItems ? (
              <div className="space-y-2 max-w-2xl mx-auto">
                {scheduleItems.map((s, i) => {
                  const itemImage =
                    s.image && typeof s.image === 'object' && s.image.url ? s.image.url : null

                  return (
                    <div
                      key={s.id || i}
                      className={`flex flex-col md:flex-row items-center gap-4 relative group ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                      {/* Time Display (Chalk Circle) */}
                      <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                        <svg
                          className="absolute inset-0 w-full h-full text-white/80 animate-pulse-slow"
                          viewBox="0 0 100 100"
                        >
                          <path
                            d="M10,50 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeDasharray="100 20"
                            strokeLinecap="round"
                            className="opacity-70"
                          />
                          <path
                            d="M10,50 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeDasharray="5 5"
                            className="opacity-40 scale-90"
                          />
                        </svg>
                        <span className="text-xl md:text-2xl font-black text-white font-handwriting">
                          {s.time}
                        </span>
                      </div>

                      {/* Connection Line (Hand Drawn) */}
                      {i < scheduleItems.length - 1 && (
                        <div className="hidden md:block absolute top-24 left-1/2 w-0.5 h-12 bg-white/30 -translate-x-1/2 border-l-2 border-dashed border-white/20"></div>
                      )}

                      {/* Content Card (Photo or Icon) */}
                      <div
                        className={`p-4 bg-transparent rounded-xl transform transition-transform duration-300 group-hover:scale-105 flex items-center gap-4 ${s.rotation || 'rotate-1'}`}
                      >
                        {/* Photo/Icon */}
                        <div className="relative w-20 h-20 bg-white/10 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg shrink-0">
                          {itemImage ? (
                            <Image
                              src={itemImage}
                              alt={s.label || ''}
                              fill
                              className="object-cover opacity-90"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl">
                              {s.icon || '📌'}
                            </div>
                          )}
                        </div>

                        {/* Text */}
                        <span
                          className="font-bold text-xl md:text-2xl text-white font-handwriting tracking-wider"
                          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                        >
                          {s.label}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              // Fallback / Start State
              <div className="text-center text-white/50 font-handwriting">
                <p>スケジュールが登録されていません。</p>
                {imageUrl && (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 border-white/20 shadow-lg mt-8 rotate-1 mx-auto max-w-md">
                    <Image src={imageUrl} alt="Schedule" fill className="object-cover" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
