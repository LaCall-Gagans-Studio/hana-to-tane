'use client'

import React, { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

export const ConsultationForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Mock submission - replace with actual API call later
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Consultation form submitted')
    setIsLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-white border-3 border-orange rounded-xl p-8 text-center shadow-hard animate-fade-in max-w-2xl mx-auto">
        <h3 className="text-2xl font-black text-slate-800 mb-4">送信完了しました</h3>
        <p className="text-slate-600 font-bold mb-6 leading-relaxed">
          お問い合わせありがとうございます。
          <br />
          内容を確認後、担当者よりメールにてご連絡させていただきます。
          <br />
          (休業日の場合は翌営業日以降のご連絡となります)
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-orange font-bold hover:underline"
        >
          フォームに戻る
        </button>
      </div>
    )
  }

  return (
    <section id="consultation" className="py-24 relative">
      {/* Background Pattern */}
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-orange text-white bg-accent font-black text-sm rounded-full mb-4 shadow-sm border-2 border-border">
            CONSULTATION
          </span>
          <h2 className="text-3xl md:text-5xl block font-black text-slate-800 mb-6">
            新規相談予約フォーム
          </h2>
          <div className="bg-white border-3 border-orange rounded-xl p-6 md:p-8 text-left shadow-sm">
            <p className="text-slate-700 font-medium leading-relaxed mb-4">
              フリースクール森の子がっこういっぽへの入会をご検討中の方は、まずは下記のフォームよりお問い合わせください。内容を確認後、メールにて折り返しご連絡いたします。
            </p>
            <p className="text-slate-700 font-medium leading-relaxed mb-4">
              なお、土曜日・日曜日・月曜日・祝日はお休みのため、いただいたお問い合わせへの返信ができません。休業日に送信いただいた場合は、翌営業日以降のご対応となります。あらかじめご了承ください。
            </p>
            <p className="text-slate-700 font-bold leading-relaxed text-sm bg-orange/10 p-4 rounded-lg border-2 border-orange/20">
              ※事前にフォームよりご予約いただければ、入会相談については定休日や夜間でも個別対応が可能です。ご希望の日時を遠慮なくお知らせください。
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 bg-white border-3 border-orange rounded-xl p-6 md:p-10 shadow-hard"
        >
          {/* Parent Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="parentName" className="text-lg font-black text-slate-700">
              保護者様のお名前 <span className="text-pink text-xs align-top ml-1">●必須</span>
            </label>
            <input
              id="parentName"
              name="parentName"
              type="text"
              required
              placeholder="例：山田 花子"
              className="w-full bg-white border-3 border-border rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-orange focus:ring-4 focus:ring-orange/20 transition-all"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg font-black text-slate-700">
              メールアドレス <span className="text-pink text-xs align-top ml-1">●必須</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="example@hana-tane.com"
              className="w-full bg-white border-3 border-border rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-orange focus:ring-4 focus:ring-orange/20 transition-all"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-lg font-black text-slate-700">
              ご連絡先電話番号 <span className="text-pink text-xs align-top ml-1">●必須</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="090-1234-5678"
              className="w-full bg-white border-3 border-border rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-orange focus:ring-4 focus:ring-orange/20 transition-all"
            />
          </div>

          <hr className="border-t-2 border-dashed border-gray-200 my-2" />

          {/* Child Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="childName" className="text-lg font-black text-slate-700">
                お子様のお名前 <span className="text-pink text-xs align-top ml-1">●必須</span>
              </label>
              <input
                id="childName"
                name="childName"
                type="text"
                required
                placeholder="例：山田 太郎"
                className="w-full bg-white border-3 border-border rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-orange focus:ring-4 focus:ring-orange/20 transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="childFurigana" className="text-lg font-black text-slate-700">
                フリガナ <span className="text-pink text-xs align-top ml-1">●必須</span>
              </label>
              <input
                id="childFurigana"
                name="childFurigana"
                type="text"
                required
                placeholder="ヤマダ タロウ"
                className="w-full bg-white border-3 border-border rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-orange focus:ring-4 focus:ring-orange/20 transition-all"
              />
            </div>
          </div>

          {/* Grade */}
          <div className="flex flex-col gap-2">
            <label htmlFor="grade" className="text-lg font-black text-slate-700">
              お子様の現在の学年 <span className="text-pink text-xs align-top ml-1">●必須</span>
            </label>
            <div className="relative">
              <select
                id="grade"
                name="grade"
                required
                className="w-full bg-white border-3 border-border rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-orange focus:ring-4 focus:ring-orange/20 transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled selected>
                  選択してください
                </option>
                <option value="preschool">未就学児</option>
                <option value="e1">小学1年生</option>
                <option value="e2">小学2年生</option>
                <option value="e3">小学3年生</option>
                <option value="e4">小学4年生</option>
                <option value="e5">小学5年生</option>
                <option value="e6">小学6年生</option>
                <option value="j1">中学1年生</option>
                <option value="j2">中学2年生</option>
                <option value="j3">中学3年生</option>
                <option value="other">その他</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                ▼
              </div>
            </div>
          </div>

          <hr className="border-t-2 border-dashed border-gray-200 my-2" />

          {/* Date Check */}
          <div className="flex flex-col gap-2">
            <label htmlFor="consultationDate" className="text-lg font-black text-slate-700">
              ご相談希望日時 <span className="text-pink text-xs align-top ml-1">●必須</span>
            </label>
            <input
              id="consultationDate"
              name="consultationDate"
              type="text"
              required
              placeholder="例：○月○日 10:00〜、平日午前中希望など"
              className="w-full bg-white border-3 border-border rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-orange focus:ring-4 focus:ring-orange/20 transition-all"
            />
          </div>

          {/* Method */}
          <div className="flex flex-col gap-2">
            <span className="text-lg font-black text-slate-700">
              ご相談の方法 <span className="text-pink text-xs align-top ml-1">●必須</span>
            </span>
            <div className="flex flex-wrap gap-4 mt-2">
              {['対面', 'オンライン（ZOOM等）', '電話', 'その他'].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border-2 border-border hover:bg-orange/10 transition-colors"
                >
                  <input
                    type="radio"
                    name="method"
                    value={method}
                    required
                    className="accent-orange w-5 h-5 cursor-pointer"
                  />
                  <span className="font-bold text-slate-700">{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Memo */}
          <div className="flex flex-col gap-2">
            <label htmlFor="memo" className="text-lg font-black text-slate-700">
              備考・ご質問など <span className="text-pink text-xs align-top ml-1">●必須</span>
            </label>
            <textarea
              id="memo"
              name="memo"
              required
              rows={4}
              placeholder="ご相談内容や、お子様の状況について簡単にご記入ください。"
              className="w-full bg-white border-3 border-border rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-orange focus:ring-4 focus:ring-orange/20 transition-all resize-y"
            />
          </div>

          {/* Privacy Policy */}
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border-2 border-border">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                className="mt-1 accent-orange w-6 h-6 cursor-pointer"
              />
              <span className="text-sm font-bold text-slate-600">
                <a href="/privacy" target="_blank" className="text-blue underline hover:opacity-80">
                  プライバシーポリシー
                </a>
                に同意の上、送信します。
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 text-white font-black text-xl rounded-xl border-3 border-border shadow-hard transition-all flex items-center justify-center gap-2 mt-4
                ${isLoading ? 'bg-gray-400 cursor-not-allowed shadow-none translate-y-1' : 'bg-orange hover:bg-orange-600 hover:-translate-y-1 hover:shadow-hard-lg active:translate-y-1 active:shadow-none'}`}
          >
            {isLoading ? (
              '送信中...'
            ) : (
              <>
                送信する <Send size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
