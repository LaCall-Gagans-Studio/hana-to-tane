'use client'

import React, { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

export const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Mock submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Form submitted')
    setIsLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-white border-3 border-border rounded-xl p-8 text-center shadow-hard animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green text-white rounded-full mb-4 shadow-sm">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-2">送信完了！</h3>
        <p className="text-slate-600 font-bold mb-6">
          お問い合わせありがとうございます。
          <br />
          担当者より折り返しご連絡いたします。
        </p>
        <button onClick={() => setSubmitted(false)} className="text-blue font-bold hover:underline">
          他の内容を送信する
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 bg-white border-3 border-border rounded-xl p-6 md:p-8 shadow-hard"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-lg font-black text-slate-700">
          お名前 <span className="text-pink text-sm ml-1">*必須</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full bg-gray-50 border-3 border-border rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-blue focus:ring-4 focus:ring-blue/20 transition-all"
          placeholder="山田 太郎"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-lg font-black text-slate-700">
          メールアドレス <span className="text-pink text-sm ml-1">*必須</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full bg-gray-50 border-3 border-border rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-blue focus:ring-4 focus:ring-blue/20 transition-all"
          placeholder="example@hana-tane.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="type" className="text-lg font-black text-slate-700">
          お問い合わせ種別 <span className="text-pink text-sm ml-1">*必須</span>
        </label>
        <div className="relative">
          <select
            id="type"
            name="type"
            required
            className="w-full bg-gray-50 border-3 border-border rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-blue focus:ring-4 focus:ring-blue/20 transition-all appearance-none cursor-pointer"
          >
            {/* Default empty option for required validation */}
            <option value="" disabled selected>
              選択してください
            </option>
            <option value="support">賛助会員・寄付について</option>
            <option value="recruit">採用・スタッフ募集について</option>
            <option value="other">その他のお問い合わせ</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
            ▼
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-lg font-black text-slate-700">
          お問い合わせ内容 <span className="text-pink text-sm ml-1">*必須</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full bg-gray-50 border-3 border-border rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-blue focus:ring-4 focus:ring-blue/20 transition-all resize-y"
          placeholder="お問い合わせ内容をご記入ください..."
        />
      </div>

      <div className="mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 text-white font-black text-xl rounded-xl border-3 border-border shadow-hard transition-all flex items-center justify-center gap-2
            ${isLoading ? 'bg-gray-400 cursor-not-allowed shadow-none translate-y-1' : 'bg-blue hover:bg-blue-600 hover:-translate-y-1 hover:shadow-hard-lg active:translate-y-1 active:shadow-none'}`}
        >
          {isLoading ? (
            '送信中...'
          ) : (
            <>
              送信する <Send size={20} />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
