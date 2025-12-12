'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Member, Sponsor, About as AboutType, Freeschool } from '@/payload-types'
import { AboutStaff } from './staff'

type AboutProps = {
  aboutData: AboutType
  freeschoolData: Freeschool
  members: Member[]
  sponsors: Sponsor[]
}

export const About = ({ aboutData, freeschoolData, members, sponsors }: AboutProps) => {
  const { mission, intro_message, history_years: historyYears } = aboutData

  const freeSchoolDesc = freeschoolData.summary?.free_school_desc

  return (
    <section id="about" className="py-12 md:py-24 bg-surface relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-yellow/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-50 md:opacity-100"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-50 md:opacity-100"></div>

      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 md:mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-text tracking-tighter mb-4 relative inline-block">
              ABOUT US
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-lime/50 -z-10 rounded-full"></span>
            </h2>
            <p className="text-xl font-semibold text-gray-600 max-w-xl leading-relaxed">
              「自分らしく」いられる場所。
              <br />
              私たちは、誰もが安心して過ごせる居場所を作っています。
            </p>
          </div>
          <Link
            href="/about"
            className="group flex items-center gap-2 font-black text-lg border-b-4 border-lime hover:border-yellow transition-colors pb-1"
          >
            もっと知りたい
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
          {/* Main Intro Card - Large */}
          <div className="md:col-span-8 bg-surface border-3 border-border rounded-3xl p-6 md:p-12 shadow-hard relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink rounded-bl-full opacity-20 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="relative z-10">
              <span className="inline-block px-4 py-1 bg-pink text-text text-sm font-black rounded-full border-2 border-border mb-6 shadow-sm">
                MISSION
              </span>
              {intro_message ? (
                <h3 className="text-3xl md:text-4xl font-black mb-6 text-text leading-tight">
                  <RichText data={intro_message} />
                </h3>
              ) : (
                <p>エラーです。再読み込みしてください。</p>
              )}
              {/* Render RichText for Mission if needed, or keep static summary for now */}
              {mission ? (
                <div className="text-lg font-medium whitespace-pre-wrap text-gray-600 leading-relaxed mb-8">
                  <RichText data={mission} />
                </div>
              ) : (
                <p>エラーです。再読み込みしてください。</p>
              )}
              <div className="flex gap-4">
                <div className="w-3 h-3 rounded-full bg-blue border-2 border-border"></div>
                <div className="w-3 h-3 rounded-full bg-yellow border-2 border-border"></div>
                <div className="w-3 h-3 rounded-full bg-lime border-2 border-border"></div>
              </div>
            </div>
          </div>

          {/* Stat Card 1 - Small */}
          <div className="md:col-span-4 bg-yellow border-3 border-border rounded-3xl p-8 shadow-hard flex flex-col justify-center items-center text-center group hover:-translate-y-1 transition-transform duration-300">
            <span className="text-5xl md:text-6xl font-black text-text mb-2 group-hover:scale-110 transition-transform duration-300">
              {historyYears}+
            </span>
            <span className="font-semibold text-lg border-t-2 border-text pt-2 w-full max-w-[120px]">
              YEARS
            </span>
          </div>

          {/* Free School Card - Medium */}
          <div className="md:col-span-6 bg-blue border-3 border-border rounded-3xl p-8 shadow-hard relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-surface/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-black mb-2 text-surface drop-shadow-md">
                  FREE SCHOOL
                </h3>
                <p className="font-semibold text-surface/90 mb-4">フリースクール</p>
                <p className="text-surface font-medium leading-relaxed whitespace-pre-wrap">
                  {freeSchoolDesc || ''}
                </p>
              </div>
              <div className="mt-8 text-right">
                <Link
                  href="/freeschool"
                  className="inline-block px-6 py-2 bg-surface text-text border-2 border-border rounded-full font-black text-sm shadow-sm hover:shadow-md transition-all hover:scale-105"
                >
                  詳しく見る
                </Link>
              </div>
            </div>
          </div>

          {/* Play Park Card - Medium */}
          <div className="md:col-span-6 bg-lime border-3 border-border rounded-3xl p-8 shadow-hard relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-surface/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-black mb-2 text-text">JOIN EVENT!</h3>
                <p className="font-semibold text-text/80 mb-4">各種イベント</p>
                <p className="text-text font-medium leading-relaxed">
                  広大な敷地を生かして様々なイベントを行っています！ <br />
                  興味あるイベントにぜひご参加ください。
                </p>
              </div>
              <div className="mt-8 text-right">
                <Link
                  href="/event"
                  className="inline-block px-6 py-2 bg-surface text-text border-2 border-border rounded-full font-black text-sm shadow-sm hover:shadow-md transition-all hover:scale-105"
                >
                  直近のイベントを見る
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Section */}
        <AboutStaff members={members} />

        {/* Supporting Organizations Section */}
        <div>
          <div className="text-center mb-10">
            <span className="inline-block px-6 py-2 bg-gray-100 border-2 border-border rounded-full text-sm font-black text-gray-600 shadow-sm">
              賛助団体一覧
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.url || '#'}
                target={sponsor.url ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="w-64 h-24 bg-white border-2 border-border rounded-xl flex items-center justify-center group hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md cursor-pointer overflow-hidden relative"
              >
                {sponsor.logo && typeof sponsor.logo === 'object' && sponsor.logo.url ? (
                  <Image
                    src={sponsor.logo.url}
                    alt={sponsor.name}
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <span className="font-black text-gray-300 text-sm p-2 text-center group-hover:text-gray-800 transition-colors">
                    {sponsor.name}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
