import Image from 'next/image'
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Media, Freeschool } from '@/payload-types'

type PriceProps = {
  data?: Freeschool['price']
}

export const Price = ({ data }: PriceProps) => {
  const plans = data?.plans || [
    {
      planName: '水木金コース',
      price: '¥29,000',
      note: '/月',
      subtitle: '実質負担: ¥9,600〜',
      features: [{ text: '送迎代込み' }, { text: '週3回利用' }],
      themeColor: 'blue',
    },
    {
      planName: '月5回コース',
      price: '¥22,000',
      note: '/月',
      subtitle: '実質負担: ¥7,500〜',
      features: [{ text: '送迎代込み' }, { text: '月5回まで利用可' }],
      themeColor: 'pink',
    },
  ]

  const annotation = data?.annotation

  return (
    <section className="py-24 relative overflow-hidden bg-[#f0f4f8]">
      {/* Graph Paper Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(#e0e7ff 1px, transparent 1px), linear-gradient(90deg, #e0e7ff 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          backgroundColor: '#fff',
        }}
      ></div>

      {/* Stationery Decorations */}
      <div className="absolute top-10 -left-8 w-64 h-64 rotate-12 z-0 pointer-events-none opacity-80">
        <Image
          src="https://media.istockphoto.com/id/2196102714/ja/%E3%82%B9%E3%83%88%E3%83%83%E3%82%AF%E3%83%95%E3%82%A9%E3%83%88/%E9%89%9B%E7%AD%86%E3%81%A8%E7%99%BD%E7%B4%99%E3%82%92%E6%8C%81%E3%81%A4%E6%89%8B.jpg?s=612x612&w=0&k=20&c=ycac4aELqzFTekQA6G-FmpZmoxHag3H0Ti-JiLyTu90="
          alt="Pencil"
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-10 -right-4 w-64 h-64 -rotate-12 z-0 pointer-events-none opacity-80">
        <Image
          src="https://media.istockphoto.com/id/1446110460/ja/%E3%82%B9%E3%83%88%E3%83%83%E3%82%AF%E3%83%95%E3%82%A9%E3%83%88/%E5%AE%BF%E9%A1%8C%E3%82%92%E3%81%99%E3%82%8B%E6%97%A5%E6%9C%AC%E3%81%AE%E5%B0%8F%E5%AD%A6%E7%94%9F.jpg?s=612x612&w=0&k=20&c=qZhOvp_UzoGFEN4Ze7-nn79pOPV18yhSEd_7-R1CbI8="
          alt="Eraser"
          fill
          className="object-contain"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 relative">
          <h2 className="text-5xl font-black text-text mb-2 tracking-tight">PRICE</h2>
          <p className="font-bold text-gray-400">ご利用料金</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-16">
          {plans.map((plan, i) => {
            const isBlue = plan.themeColor === 'blue' || (!plan.themeColor && i === 0)
            const colorClass = isBlue ? 'blue' : 'pink'
            const rotation = i % 2 === 0 ? 'rotate-1' : '-rotate-1'
            const stickyColor = isBlue ? 'bg-yellow-200' : 'bg-pink-200'
            // Logic in original was blue -> yellow note, pink -> pink note.
            // I'll stick to that or simplify.

            return (
              <div
                key={i}
                className={`bg-white rounded-sm shadow-xl p-8 relative group hover:-translate-y-2 transition-transform transform ${rotation}`}
              >
                {/* Paper Clip (CSS or SVG) - Keep existing logic or toggle based on index for slight variety if desired */}
                <div
                  className={`absolute -top-4 ${i % 2 === 0 ? 'right-8' : 'left-8'} w-8 h-16 z-20`}
                >
                  <svg viewBox="0 0 50 100" className="w-full h-full text-gray-400 drop-shadow-sm">
                    <path
                      d="M25,0 C38,0 48,10 48,25 V75 C48,90 38,100 25,100 C12,100 2,90 2,75 V25"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                    />
                    {i % 2 === 0 && (
                      <path
                        d="M25,100 C12,100 2,90 2,75 V30"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="opacity-50"
                      />
                    )}
                  </svg>
                </div>

                <div className={`absolute top-0 left-0 w-full h-2 bg-${colorClass}/50`}></div>

                <h3 className="text-2xl font-black text-center mb-8 font-handwriting text-gray-700">
                  {plan.planName}
                </h3>

                <div className="text-center mb-8 relative">
                  {/* Sticky Note for Price */}
                  <div
                    className={`inline-block relative ${stickyColor} p-6 shadow-md transform ${i % 2 === 0 ? '-rotate-2' : 'rotate-2'}`}
                  >
                    {/* Tape for sticky note */}
                    <div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/40 ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
                    ></div>

                    <p className="text-4xl md:text-5xl font-black text-text mb-1">
                      {plan.price}
                      <span className="text-base font-bold text-gray-600">{plan.note}</span>
                    </p>
                    <p className="text-xs font-bold text-gray-600">{plan.subtitle}</p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {plan.features?.map((f, fi) => (
                    <li
                      key={fi}
                      className="flex items-center gap-3 font-bold text-gray-600 border-b border-dashed border-gray-200 pb-2"
                    >
                      <span className={`text-${colorClass} text-xl`}>✓</span> <span>{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <div className="inline-block bg-white px-8 py-4 shadow-lg transform rotate-1 border-2 border-gray-100 relative max-w-2xl mx-auto">
            {/* Hand-drawn circle highlight around Free */}
            <div className="absolute right-4 bottom-2 w-12 h-8 border-2 border-red-500 rounded-[50%_60%_70%_40%/40%_50%_60%_50%] animate-pulse opacity-70"></div>

            <div className="font-bold text-gray-700 font-handwriting text-lg leading-relaxed">
              {annotation ? (
                <RichText data={annotation} />
              ) : (
                <p>
                  <span className="text-red-500 font-black">※</span> 入会金: ¥10,000 / 保険料:
                  ¥800(年額) / 体験: 無料
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
