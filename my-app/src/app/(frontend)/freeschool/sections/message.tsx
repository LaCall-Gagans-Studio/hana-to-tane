import Image from 'next/image'
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Media, Freeschool } from '@/payload-types'

type MessageProps = {
  data?: Freeschool['message']
}

export const Message = ({ data }: MessageProps) => {
  const imageUrl =
    data?.image && typeof data.image === 'object' && data.image.url ? data.image.url : null

  return (
    <section className="py-12 md:py-24 bg-pink relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_3px,transparent_3px)] bg-size-[20px_20px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white rounded-3xl md:rounded-[3rem] border-4 border-border shadow-hard-lg p-6 pt-16 md:p-16 max-w-4xl mx-auto relative overflow-visible">
          {/* Photo in Hand-drawn Speech Bubble (Absolute position on top right or overlapping) */}
          <div className="absolute -top-12 right-1/2 translate-x-1/2 md:translate-x-0 md:-top-16 md:right-8 md:-right-8 w-32 h-32 md:w-56 md:h-56 z-20 drop-shadow-lg transform rotate-6">
            <div className="relative w-full h-full">
              {/*  Hand-drawn bubble shape using Border Radius tricks */}
              <div className="absolute inset-0 bg-white border-4 border-black rounded-[40%_60%_70%_30%/50%_60%_30%_60%] overflow-hidden z-10">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={data?.repName || 'Representative'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src="/images/freeschool/message-representative.jpg"
                    alt="河上 美穂"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              {/* Little tail for the bubble */}
              <div className="absolute bottom-0 left-0 w-8 h-8 overflow-visible bg-white border-b-4 border-l-4 border-r-4 border-black transform rotate-45 translate-y-2 -translate-x-2 z-0"></div>
            </div>
          </div>

          <div className="md:pr-40">
            {' '}
            {/* Add padding right to avoid text overlapping with absolute photo on desktop */}
            {data?.title ? (
              <h2 className="text-3xl md:text-4xl font-black text-left mb-12 text-text leading-tight whitespace-pre-wrap">
                {data.title}
              </h2>
            ) : (
              <h2 className="text-3xl md:text-4xl font-black text-left mb-12 text-text leading-tight">
                フリースクールは
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10">心の病院</span>
                  <span className="absolute bottom-0 left-0 w-full h-4 bg-pink/40 -rotate-1 z-0 rounded-sm"></span>
                </span>
              </h2>
            )}
            <div className="prose prose-lg max-w-none font-medium text-gray-700 leading-loose text-left mb-12">
              {data?.body ? (
                <RichText data={data.body} />
              ) : (
                <>
                  <p>
                    心も風邪をひくことがある。
                    <br />
                    誰でもいつでもなる可能性がある。
                  </p>
                  <p>
                    風邪の時に行ける病院が自分の街にあると思ったら、
                    <br className="hidden md:block" />
                    安心して生活できるのと同じように、
                    <br />
                    心が風邪ひいたら、いつでも治しに行ける場所があると思うと
                    <br className="hidden md:block" />
                    安心して学校に向かえる。
                  </p>
                  <p className="font-bold text-xl text-text relative inline-block">
                    <span className="relative z-10">そんな場所がいっぽです。</span>
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow/60 -rotate-1 z-0 rounded-sm"></span>
                  </p>
                  <p>
                    また、心が風邪をひいたら、いつでも来て、
                    <br className="hidden md:block" />
                    治ったらまた元気になれるよ。
                    <br />
                    そんな安心感で子ども達が生活できるように、
                    <br className="hidden md:block" />
                    いつでも存在している「いっぽ」でありたい。
                  </p>
                </>
              )}
            </div>
            <div className="text-left border-t-2 border-dashed border-gray-300 pt-8">
              <p className="font-bold text-lg text-gray-500 mb-1">
                {data?.repRole || 'NPO法人はなとたね 代表'}
              </p>
              <p className="font-black text-2xl text-text">{data?.repName || '河上 美穂'}</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <a
            href="#"
            className="inline-block px-10 py-4 bg-yellow text-text border-3 border-border rounded-full font-black text-xl shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            お問い合わせ・相談予約
          </a>
        </div>
      </div>
    </section>
  )
}
