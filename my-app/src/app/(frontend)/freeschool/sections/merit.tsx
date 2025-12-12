import React from 'react'
import { Freeschool } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

type MeritProps = {
  data?: Freeschool['merits']
}

export const Merit = ({ data }: MeritProps) => {
  if (!data) return null

  return (
    <section className="py-12 md:py-24 bg-yellow/10 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Certification Benefits Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-text mb-4 inline-block border-b-4 border-yellow pb-2">
              {data.certificationTitle || '認定フリースクールになると'}
            </h2>
            <p className="font-semibold text-gray-600 mt-2">公的なサポートや連携について</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {data.certificationItems?.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 md:p-8 rounded-3xl border-3 border-border shadow-hard hover:shadow-hard-lg transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-yellow text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-xl shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-text mb-3">{item.title}</h3>
                    <p className="text-gray-700 font-medium leading-relaxed whitespace-pre-wrap">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits of Attending Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl md:rounded-[2rem] border-4 border-blue shadow-hard p-6 md:p-12 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue text-white px-8 py-2 rounded-full font-black text-xl shadow-md whitespace-nowrap">
            {data.attendingTitle || 'いっぽへ通うと？'}
          </div>

          <div className="mt-6 text-gray-700 font-medium leading-loose text-lg">
            {data.attendingBody && <RichText data={data.attendingBody} />}
          </div>

          {/* Decorative Stamp/Icon */}
          <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-16 h-16 md:w-24 md:h-24 bg-pink text-white rounded-full flex items-center justify-center font-black text-xs md:text-sm rotate-12 shadow-lg border-4 border-white">
            <div>
              <p className="text-center leading-tight">
                元気
                <br />
                やる気
                <br />
                UP!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
