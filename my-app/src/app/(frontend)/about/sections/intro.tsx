import React from 'react'
import { Member } from '@/payload-types'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

type IntroProps = {
  message?: any
  representatives?: Member[]
}

export const Intro = ({ message, representatives = [] }: IntroProps) => {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#a349a3_2px,transparent_2px)] bg-size-[20px_20px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="inline-block text-6xl md:text-7xl font-black text-text mb-6 relative tracking-tighter">
            ABOUT US
            <span className="absolute -bottom-2 left-0 w-full h-4 bg-pink/50 -z-10 rounded-full rotate-1"></span>
          </h1>
          <p className="text-xl font-bold text-gray-600 max-w-2xl mx-auto">
            はなとたねは、子どもも大人も「自分らしく」いられる場所をつくっています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {representatives && representatives.length > 0 ? (
            representatives.slice(0, 2).map((rep, index) => (
              <div
                key={rep.id}
                className={`bg-white p-8 rounded-3xl border-3 border-border shadow-hard transform ${
                  index % 2 === 0 ? '-rotate-1' : 'rotate-1'
                } hover:rotate-0 transition-transform duration-300 relative group`}
              >
                <div
                  className={`absolute -top-6 ${
                    index % 2 === 0 ? '-left-6' : '-right-6'
                  } w-12 h-12 ${
                    rep.color || 'bg-pink'
                  } rounded-full border-3 border-border flex items-center justify-center text-2xl shadow-sm z-20`}
                >
                  {index % 2 === 0 ? '🌸' : '🌱'}
                </div>
                <div
                  className={`w-32 h-32 mx-auto ${
                    rep.color || 'bg-pink'
                  } rounded-full border-3 border-border flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform overflow-hidden relative`}
                >
                  {rep.image && typeof rep.image === 'object' && rep.image.url ? (
                    <Image src={rep.image.url} alt={rep.name} fill className="object-cover" />
                  ) : (
                    <span className="text-3xl font-black text-text">
                      {rep.name.substring(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-black text-center mb-2 text-text">{rep.name}</h3>
                <p className="text-sm font-bold text-center text-gray-500 mb-4">{rep.role}</p>
                <div className="font-medium text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {rep.description}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500">
              代表者情報が見つかりませんでした。
            </div>
          )}
        </div>

        {/* Message Section */}
        {message && (
          <div className="mt-20 max-w-3xl mx-auto text-center">
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border-2 border-border/50">
              <div className="text-3xl font-black text-text leading-relaxed">
                <RichText data={message} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
