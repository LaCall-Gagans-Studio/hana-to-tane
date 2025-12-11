'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Member, Sponsor, About as AboutType } from '@/payload-types'

type AboutProps = {
  aboutData: AboutType
  members: Member[]
  sponsors: Sponsor[]
}

export const About = ({ aboutData, members, sponsors }: AboutProps) => {
  const [selectedStaff, setSelectedStaff] = useState<Member | null>(null)

  const staffMembers = members.filter((s) => s.type === 'staff' || !s.type) // Default to staff if type is missing
  const collaborators = members.filter((s) => s.type === 'collaborator')

  const representatives = staffMembers.filter((s) => s.isRepresentative)
  const otherStaff = staffMembers.filter((s) => !s.isRepresentative)

  const {
    mission,
    intro_message,
    history_years: historyYears,
    free_school_desc: freeSchoolDesc,
    play_park_desc: playParkDesc,
  } = aboutData

  return (
    <section id="about" className="py-24 bg-surface relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-6xl font-black text-text tracking-tighter mb-4 relative inline-block">
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
          <div className="md:col-span-8 bg-surface border-3 border-border rounded-3xl p-8 md:p-12 shadow-hard relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
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
            <span className="text-6xl font-black text-text mb-2 group-hover:scale-110 transition-transform duration-300">
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
                <p className="text-surface font-medium leading-relaxed">{freeSchoolDesc || ''}</p>
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
                <h3 className="text-3xl font-black mb-2 text-text">PLAY PARK</h3>
                <p className="font-semibold text-text/80 mb-4">プレーパーク</p>
                <p className="text-text font-medium leading-relaxed">
                  {playParkDesc ||
                    '「自分の責任で自由に遊ぶ」をモットーに、屋外で思いっきり遊べる場です。禁止事項を極力減らし、子どもの自主性を尊重します。'}
                </p>
              </div>
              <div className="mt-8 text-right">
                <Link
                  href="/playpark"
                  className="inline-block px-6 py-2 bg-surface text-text border-2 border-border rounded-full font-black text-sm shadow-sm hover:shadow-md transition-all hover:scale-105"
                >
                  詳しく見る
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black text-text inline-block border-b-4 border-yellow pb-2">
              STAFF
            </h3>
            <p className="mt-4 font-semibold text-gray-500">スタッフ紹介</p>
          </div>

          {/* Representatives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
            {representatives.map((s, i) => (
              <div
                key={s.id}
                onClick={() => setSelectedStaff(s)}
                className={`bg-white p-8 rounded-3xl border-3 border-border shadow-hard cursor-pointer transform transition-all hover:-translate-y-2 hover:shadow-hard-lg ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'} hover:rotate-0`}
              >
                <div
                  className={`w-32 h-32 mx-auto ${s.color || 'bg-gray-200'} rounded-full border-3 border-border flex items-center justify-center text-5xl shadow-sm mb-6 overflow-hidden relative`}
                >
                  {s.image && typeof s.image === 'object' && s.image.url ? (
                    <Image src={s.image.url} alt={s.name} fill className="object-cover" />
                  ) : (
                    <span>{'👤'}</span>
                  )}
                </div>
                <h4 className="text-2xl font-black text-center mb-2 text-text">{s.name}</h4>
                <p className="text-sm mx-auto font-semibold text-center text-gray-500 mb-4 bg-gray-100 px-4 py-1 rounded-full block w-fit">
                  {s.role}
                </p>
                <p className="text-base text-left font-medium text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {s.description}
                </p>
                <div className="text-center mt-4">
                  <span className="text-blue font-semibold text-sm border-b border-blue">
                    もっと見る
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Other Staff */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {otherStaff.map((s, i) => (
              <div
                key={s.id}
                onClick={() => setSelectedStaff(s)}
                className="bg-white p-6 rounded-2xl border-2 border-border shadow-sm cursor-pointer hover:shadow-md transition-all flex items-center gap-4"
              >
                <div
                  className={`w-16 h-16 ${s.color || 'bg-gray-200'} rounded-full border-2 border-border flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden relative`}
                >
                  {s.image && typeof s.image === 'object' && s.image.url ? (
                    <Image src={s.image.url} alt={s.name} fill className="object-cover" />
                  ) : (
                    <span>{'👤'}</span>
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-black text-text">{s.name}</h4>
                  <p className="text-xs font-semibold text-gray-500 mb-1">{s.role}</p>
                  <p className="text-sm text-gray-600 line-clamp-1 whitespace-pre-wrap">
                    {s.description}
                  </p>
                  <span className="text-xs font-semibold text-blue flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                    VIEW PROFILE →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaborators Section */}
        {collaborators.length > 0 && (
          <div className="mb-24">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-black text-text inline-block border-b-4 border-blue pb-2">
                COLLABORATORS
              </h3>
              <p className="mt-4 font-semibold text-gray-500">協力者・パートナー</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {collaborators.map((s, i) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedStaff(s)}
                  className="bg-white p-6 rounded-2xl border-2 border-border shadow-sm cursor-pointer hover:shadow-md transition-all flex items-center gap-4"
                >
                  <div
                    className={`w-16 h-16 ${s.color || 'bg-gray-200'} rounded-full border-2 border-border flex items-center justify-center text-2xl shrink-0 overflow-hidden relative`}
                  >
                    {s.image && typeof s.image === 'object' && s.image.url ? (
                      <Image src={s.image.url} alt={s.name} fill className="object-cover" />
                    ) : (
                      <span>{'🤝'}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-text">{s.name}</h4>
                    <p className="text-xs font-semibold text-gray-500 mb-1">{s.role}</p>
                    <p className="text-sm text-gray-600 line-clamp-1 whitespace-pre-wrap">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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

      {/* Staff Popup Modal */}
      {selectedStaff && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedStaff(null)}
        >
          <div
            className="bg-white rounded-3xl border-4 border-border shadow-2xl max-w-lg w-full p-8 relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedStaff(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-500 hover:bg-gray-200 transition-colors z-10"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div
                className={`w-32 h-32 mx-auto ${selectedStaff.color || 'bg-gray-200'} rounded-full border-3 border-border flex items-center justify-center text-6xl shadow-sm mb-6 overflow-hidden relative`}
              >
                {selectedStaff.image &&
                typeof selectedStaff.image === 'object' &&
                selectedStaff.image.url ? (
                  <Image
                    src={selectedStaff.image.url}
                    alt={selectedStaff.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span>{'👤'}</span>
                )}
              </div>
              <h3 className="text-3xl font-black text-text mb-2">{selectedStaff.name}</h3>
              <p className="text-sm font-semibold text-gray-500 bg-gray-100 inline-block px-4 py-1 rounded-full mb-4">
                {selectedStaff.role}
              </p>

              {/* Favorite Words */}
              {selectedStaff.favoriteWords && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-pink mb-1">好きな言葉</p>
                  <p className="text-lg font-black text-text">{selectedStaff.favoriteWords}</p>
                </div>
              )}

              {/* Hobbies - Added */}
              {(selectedStaff as any).hobbies && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-lime mb-1">趣味</p>
                  <p className="text-lg font-black text-text">{(selectedStaff as any).hobbies}</p>
                </div>
              )}
            </div>

            <div className="bg-surface p-6 rounded-2xl border-2 border-border/50 space-y-6">
              {/* Description */}
              <div className="text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">
                {selectedStaff.fullDescription ? (
                  <p>{selectedStaff.fullDescription}</p>
                ) : (
                  <p>{selectedStaff.description}</p>
                )}
              </div>

              {/* Collaboration Type (for Collaborators) */}
              {selectedStaff.collaborationType && (
                <div>
                  <h4 className="font-black text-text mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue"></span>
                    関わり
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {selectedStaff.collaborationType}
                  </p>
                </div>
              )}

              {/* Qualifications */}
              {selectedStaff.qualifications && selectedStaff.qualifications.length > 0 && (
                <div>
                  <h4 className="font-black text-text mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-lime"></span>
                    保有資格
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {selectedStaff.qualifications.map((q, i) => (
                      <li
                        key={i}
                        className="text-xs font-semibold text-gray-600 bg-white border border-border px-3 py-1 rounded-full"
                      >
                        {q.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Past Qualifications */}
              {selectedStaff.pastQualifications && selectedStaff.pastQualifications.length > 0 && (
                <div>
                  <h4 className="font-black text-text mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow"></span>
                    過去に取得した資格
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {selectedStaff.pastQualifications.map((q, i) => (
                      <li
                        key={i}
                        className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full"
                      >
                        {q.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Links */}
              {selectedStaff.links && selectedStaff.links.length > 0 && (
                <div className="pt-4 border-t-2 border-border/30">
                  <h4 className="font-black text-text mb-3 text-center text-sm">LINKS</h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    {selectedStaff.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-border rounded-full text-sm font-semibold text-blue hover:bg-blue hover:text-white transition-colors shadow-sm"
                      >
                        {link.label}
                        <span className="text-xs">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
