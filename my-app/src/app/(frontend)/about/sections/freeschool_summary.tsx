import React from 'react'
import Link from 'next/link'
import { Freeschool, Media } from '@/payload-types'
import Image from 'next/image'

type FreeSchoolSummaryProps = {
  data?: Freeschool['summary']
}

export const FreeSchoolSummary = ({ data }: FreeSchoolSummaryProps) => {
  const {
    visualImage,
    introTitle,
    description,
    importantPointsTitle,
    importantPoints,
    dialogueLeft,
    dialogueRight,
  } = data || {}

  const visualImageUrl =
    visualImage && typeof visualImage === 'object' && visualImage.url ? visualImage.url : null

  return (
    <section className="py-24 bg-blue relative overflow-hidden">
      {/* Background Pattern - Grid Line */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white rounded-[40px] border-4 border-border shadow-hard-lg p-8 md:p-16 max-w-5xl mx-auto relative">
          {/* Notebook Binding Effect */}
          <div className="absolute top-0 left-8 md:left-16 w-4 h-16 bg-gray-300 rounded-b-lg border-2 border-border border-t-0"></div>
          <div className="absolute top-0 right-8 md:right-16 w-4 h-16 bg-gray-300 rounded-b-lg border-2 border-border border-t-0"></div>

          <div className="text-center mb-16 mt-8">
            <span className="inline-block px-4 py-1 bg-blue text-white font-black rounded-full border-2 border-border mb-4 shadow-sm">
              FREE SCHOOL
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-text mb-8 tracking-tight">
              森の子がっこう{' '}
              <span className="text-blue inline-block transform -rotate-2">いっぽ</span>
            </h1>

            <div className="aspect-video w-full max-w-3xl mx-auto bg-gray-100 rounded-2xl border-3 border-border flex items-center justify-center relative overflow-hidden group">
              {visualImageUrl ? (
                <Image
                  src={visualImageUrl}
                  alt="トリノス神戸の全景"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-blue/5 group-hover:bg-transparent transition-colors"></div>
                  <span className="font-black text-gray-400 text-xl">
                    IMAGE PLACEHOLDER: トリノス神戸の全景
                  </span>
                </>
              )}
            </div>
            <p className="mt-2 font-bold text-gray-500 text-sm">トリノス神戸の全景</p>
          </div>

          <div className="text-center mb-16">
            <h3 className="text-3xl font-black mb-6 text-text relative inline-block">
              {introTitle || 'ここからはじまる一歩'}
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-yellow/50 -z-10 rounded-full"></span>
            </h3>
            <p className="text-lg md:text-xl font-medium text-gray-600 leading-loose whitespace-pre-wrap">
              {description || (
                <>
                  自分らしく一歩一歩進んでいけたらいい
                  <br />
                  一人一人の個性と好奇心に寄り添います
                  <br />
                  目の前は川　後ろは森　自然豊かな環境です
                </>
              )}
            </p>
          </div>

          <div className="bg-yellow/10 rounded-3xl p-8 md:p-12 border-3 border-border border-dashed mb-16 relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow px-6 py-2 rounded-full border-3 border-border shadow-sm">
              <h4 className="font-black text-text">{importantPointsTitle || '大切にしたいこと'}</h4>
            </div>
            <ul className="space-y-4 pt-4">
              {(importantPoints?.length
                ? importantPoints.map((p) => p.text)
                : [
                    'ここへ来ることで、社会とつながったり、仲間とつながったり、家族以外と過ごす居場所だったり',
                    '日時を決めて通う場所があることは、生活のリズムをつくり、気持ちが落ち着いて自信にもつながります',
                    'そうやってみんなが、自分らしく居られるがっこうです',
                    '個別に学習支援を行います（学習の目的は単に学力向上のためではなく、知らなかったことを知る楽しさを知ること）',
                    '職業体験を通して、将来の夢へとつなげます',
                  ]
              ).map((item, i) => (
                <li key={i} className="flex items-start gap-3 font-bold text-text leading-relaxed">
                  <span className="text-blue text-xl flex-shrink-0">✅</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dialogue */}
          <div className="max-w-3xl mx-auto grid gap-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pink rounded-full border-2 border-border flex-shrink-0"></div>
              <div className="bg-gray-50 px-6 py-3 rounded-2xl border-2 border-border shadow-sm">
                <p className="font-bold text-sm md:text-base whitespace-pre-wrap">
                  {dialogueLeft ||
                    '廃校となった旧神戸（かんど）小学校を利用した鳥取のフリースクールになります。'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-row-reverse">
              <div className="w-12 h-12 bg-blue rounded-full border-2 border-border flex-shrink-0"></div>
              <div className="bg-gray-50 px-6 py-3 rounded-2xl border-2 border-border shadow-sm">
                <p className="font-bold text-sm md:text-base whitespace-pre-wrap">
                  {dialogueRight || '詳しくは下のボタンをタップしてお問い合わせください。'}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/freeschool"
              className="inline-block px-10 py-4 bg-blue text-white border-3 border-border rounded-full font-black text-xl shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              いっぽについて詳しく見る
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
