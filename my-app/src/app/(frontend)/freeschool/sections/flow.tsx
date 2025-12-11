import Image from 'next/image'
import React from 'react'
import { Media, Freeschool } from '@/payload-types'

type FlowProps = {
  data?: Freeschool['flow']
}

export const Flow = ({ data }: FlowProps) => {
  const stepsToRender = data || [
    {
      stepNumber: '1',
      title: '初回ご相談',
      description: 'オンライン・対面・LINE等で',
      image: '/images/freeschool/flow-1.jpg',
    },
    {
      stepNumber: '2',
      title: '見学',
      description: '保護者のみでもOK',
      image: '/images/freeschool/flow-2.jpg',
    },
    {
      stepNumber: '3',
      title: '無料体験',
      description: '親子で体験参加',
      image: '/images/freeschool/flow-3.jpg',
    },
    {
      stepNumber: '4',
      title: '懇談',
      description: '最適な選択肢を一緒に考えます',
      image: '/images/freeschool/flow-4.jpg',
    },
    {
      stepNumber: '5',
      title: 'ご入会',
      description: '新しい環境でのスタート',
      image: '/images/freeschool/flow-5.jpg',
    },
  ]

  return (
    <section className="py-24 bg-surface relative overflow-visible">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-text inline-block border-b-4 border-yellow pb-2 transform -rotate-1">
            FLOW
          </h2>
          <p className="mt-4 font-bold text-gray-500">入会までの流れ</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 lg:gap-8 max-w-7xl mx-auto">
          {stepsToRender.map((s, i) => {
            const imageUrl =
              s.image && typeof s.image === 'object' && s.image.url
                ? s.image.url
                : typeof s.image === 'string'
                  ? s.image
                  : ''

            return (
              <div key={i} className="relative group w-64">
                {/* Curved Arrow for next step */}
                {i < stepsToRender.length - 1 && (
                  <div className="hidden lg:block absolute top-[40%] -right-10 w-12 h-12 z-0 pointer-events-none">
                    <svg
                      viewBox="0 0 100 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full transform"
                    >
                      <path
                        d="M10,25 Q50,5 90,25"
                        stroke="#cbd5e1"
                        strokeWidth="4"
                        strokeDasharray="8 4"
                        strokeLinecap="round"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                      />
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="7"
                          refX="9"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon points="0 0, 10 3.5, 0 7" fill="#cbd5e1" />
                        </marker>
                      </defs>
                    </svg>
                  </div>
                )}

                <div className="bg-white p-4 pb-8 shadow-hard hover:shadow-hard-lg transition-all hover:-translate-y-2 relative z-10 text-center flex flex-col items-center rotate-1 hover:rotate-0 duration-300">
                  {/* Crayon Number */}
                  <div className="absolute -top-4 -left-4 w-14 h-14 flex items-center justify-center z-20">
                    <div
                      className="absolute scale-90 inset-0 bg-yellow rounded-full animate-wobble border-2 border-border"
                      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
                    ></div>
                    <span className="relative font-black text-2xl text-text">{s.stepNumber}</span>
                  </div>

                  {/* Polaroid Image Area */}
                  <div className="w-full aspect-square bg-gray-100 mb-4 border border-gray-200 overflow-hidden relative">
                    {/* Fallback pattern or actual image */}
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={s.title || ''}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                    {!imageUrl && (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        No Image
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-black text-text mb-2 font-handwriting">{s.title}</h3>
                  <p className="text-sm font-bold text-gray-500 leading-relaxed font-handwriting whitespace-pre-wrap">
                    {s.description}
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
