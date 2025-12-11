import React from 'react'
import { Freeschool } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

type SupportProps = {
  data?: Freeschool['support']
}

export const Support = ({ data }: SupportProps) => {
  if (!data) return null

  return (
    <section className="py-24 bg-surface relative overflow-visible">
      {/* Wave Separator Top - simulating organic feel */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[60px] fill-yellow/10"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-text mb-4">SUPPORT SYSTEM</h2>
          <p className="font-semibold text-gray-500">安心して過ごせるサポート体制</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Learning Support */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border-2 border-green/30 shadow-lg relative overflow-hidden group hover:shadow-xl transition-shadow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-lime/20 rounded-bl-[100%] transition-transform group-hover:scale-110 origin-top-right"></div>

            <h3 className="text-2xl font-black text-text mb-6 flex items-center gap-3 relative z-10">
              <span className="w-12 h-12 bg-lime rounded-full flex items-center justify-center text-2xl shadow-sm">
                ✏️
              </span>
              {data.learningSupportTitle || '学習サポートについて'}
            </h3>

            <div className="text-gray-700 font-medium leading-relaxed relative z-10 space-y-4">
              {data.learningSupportBody && <RichText data={data.learningSupportBody} />}
            </div>
          </div>

          {/* School Relations */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border-2 border-blue/30 shadow-lg relative overflow-hidden group hover:shadow-xl transition-shadow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue/20 rounded-bl-[100%] transition-transform group-hover:scale-110 origin-top-right"></div>

            <h3 className="text-2xl font-black text-text mb-6 flex items-center gap-3 relative z-10">
              <span className="w-12 h-12 bg-blue text-white rounded-full flex items-center justify-center text-2xl shadow-sm">
                🏫
              </span>
              {data.schoolRelationsTitle || '所属の学校について'}
            </h3>

            <div className="text-gray-700 font-medium leading-relaxed relative z-10 space-y-4">
              {data.schoolRelationsBody && <RichText data={data.schoolRelationsBody} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
