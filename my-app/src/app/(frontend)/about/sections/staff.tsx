'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Member } from '@/payload-types'

type StaffSectionProps = {
  members: Member[]
}

export const AboutStaff = ({ members }: StaffSectionProps) => {
  const [selectedStaff, setSelectedStaff] = useState<Member | null>(null)

  const staffMembers = members.filter((s) => s.type === 'staff' || !s.type)
  const collaborators = members.filter((s) => s.type === 'collaborator')

  const representatives = staffMembers.filter((s) => s.isRepresentative)
  const otherStaff = staffMembers.filter((s) => !s.isRepresentative)

  const Modal = ({ member, onClose }: { member: Member; onClose: () => void }) => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl border-4 border-border shadow-2xl max-w-lg w-full p-8 relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-500 hover:bg-gray-200 transition-colors z-10"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div
            className={`w-32 h-32 mx-auto ${member.color || 'bg-gray-200'} rounded-full border-3 border-border flex items-center justify-center text-6xl shadow-sm mb-6 overflow-hidden relative`}
          >
            {member.image && typeof member.image === 'object' && member.image.url ? (
              <Image src={member.image.url} alt={member.name} fill className="object-cover" />
            ) : (
              <span>{'👤'}</span>
            )}
          </div>
          <h3 className="text-3xl font-black text-text mb-2">{member.name}</h3>
          {(member.role || member.type === 'collaborator') && (
            <p className="text-sm font-semibold text-gray-500 bg-gray-100 inline-block px-4 py-1 rounded-full mb-4">
              {member.role || 'コラボレーター'}
            </p>
          )}

          {/* Favorite Words */}
          {member.favoriteWords && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-pink mb-1">好きな言葉</p>
              <p className="text-lg font-black text-text">{member.favoriteWords}</p>
            </div>
          )}

          {/* Hobbies */}
          {(member as any).hobbies && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-lime mb-1">趣味</p>
              <p className="text-lg font-black text-text">{(member as any).hobbies}</p>
            </div>
          )}
        </div>

        <div className="bg-surface p-6 rounded-2xl border-2 border-border/50 space-y-6">
          {/* Description */}
          <div className="text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">
            {member.fullDescription ? <p>{member.fullDescription}</p> : <p>{member.description}</p>}
          </div>

          {/* Collaboration Type (for Collaborators) */}
          {member.collaborationType && (
            <div>
              <h4 className="font-black text-text mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue"></span>
                関わり
              </h4>
              <p className="text-gray-700 leading-relaxed text-sm">{member.collaborationType}</p>
            </div>
          )}

          {/* Qualifications */}
          {member.qualifications && member.qualifications.length > 0 && (
            <div>
              <h4 className="font-black text-text mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-lime"></span>
                保有資格
              </h4>
              <ul className="flex flex-wrap gap-2">
                {member.qualifications.map((q, i) => (
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
          {member.pastQualifications && member.pastQualifications.length > 0 && (
            <div>
              <h4 className="font-black text-text mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow"></span>
                過去に取得した資格
              </h4>
              <ul className="flex flex-wrap gap-2">
                {member.pastQualifications.map((q, i) => (
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
          {member.links && member.links.length > 0 && (
            <div className="pt-4 border-t-2 border-border/30">
              <h4 className="font-black text-text mb-3 text-center text-sm">LINKS</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {member.links.map((link, i) => (
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
  )

  return (
    <section className="py-24 bg-surface relative">
      <div className="container mx-auto px-4">
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
                className={`bg-white p-8 rounded-3xl border-3 border-border shadow-hard cursor-pointer transform transition-all hover:-translate-y-2 hover:shadow-hard-lg ${
                  i % 2 === 0 ? '-rotate-1' : 'rotate-1'
                } hover:rotate-0 h-full flex flex-col`}
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
                <p className="text-base text-left font-medium text-gray-600 leading-relaxed whitespace-pre-wrap flex-1">
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
            {otherStaff.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedStaff(s)}
                className="bg-white p-6 rounded-2xl border-2 border-border shadow-sm cursor-pointer hover:shadow-md transition-all flex items-center gap-4 group"
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
                  <div className="h-4">
                    <span className="text-xs font-semibold text-blue flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                      VIEW PROFILE →
                    </span>
                  </div>
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
              {collaborators.map((s) => (
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
      </div>

      {selectedStaff && <Modal member={selectedStaff} onClose={() => setSelectedStaff(null)} />}
    </section>
  )
}
