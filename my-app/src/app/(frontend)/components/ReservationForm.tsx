'use client'

import React, { useState } from 'react'
import { Column } from '@/payload-types'
import { submitReservation } from '../actions/reservation'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

type Props = {
  column: Column
}

export const ReservationForm = ({ column }: Props) => {
  const settings = column.reservationSettings
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!settings?.enabled) {
    return null
  }

  const isDeadlinePassed = settings.deadline && new Date() > new Date(settings.deadline)

  if (isDeadlinePassed) {
    return (
      <div className="bg-gray-100 border-3 border-gray-300 rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-gray-500">予約受付は終了しました</h3>
      </div>
    )
  }

  // Note: Capacity check strictly happens on server action to avoid race conditions,
  // but we could also pass a "isFull" prop if we did a server-side check before rendering.
  // For now, we rely on server response.

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await submitReservation(column.id, formData)

    if (result.success) {
      setIsSuccess(true)
    } else {
      setError(result.error || '予期せぬエラーが発生しました。')
    }
    setIsLoading(false)
  }

  if (isSuccess) {
    return (
      <div className="bg-white border-3 border-green rounded-xl p-8 text-center shadow-hard animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green text-white rounded-full mb-4 shadow-sm">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-4">予約を受け付けました</h3>
        <p className="text-slate-600 font-bold mb-6 leading-relaxed">
          ご予約ありがとうございます。
          <br />
          確認メールをお送りしましたので、ご確認ください。
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border-3 border-pink rounded-xl p-6 md:p-8 shadow-hard relative overflow-hidden">
      {/* Decor */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-pink/10 rounded-bl-full pointer-events-none"></div>

      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1 bg-pink text-white font-black text-sm rounded-full mb-4 shadow-sm border-2 border-border">
          RESERVATION
        </span>
        <h2 className="text-3xl font-black text-slate-800">参加予約</h2>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-500 text-red-700 p-4 rounded-lg mb-6 flex items-start gap-3">
          <AlertCircle className="shrink-0 mt-0.5" size={20} />
          <span className="font-bold">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Basic Info */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-lg font-black text-slate-700">
            お名前 <span className="text-pink text-xs align-top ml-1">●必須</span>
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="例：山田 太郎"
            className="w-full bg-white border-3 border-border rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-pink focus:ring-4 focus:ring-pink/20 transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg font-black text-slate-700">
            メールアドレス <span className="text-pink text-xs align-top ml-1">●必須</span>
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="example@email.com"
            className="w-full bg-white border-3 border-border rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-pink focus:ring-4 focus:ring-pink/20 transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-lg font-black text-slate-700">
            電話番号 <span className="text-pink text-xs align-top ml-1">●必須</span>
          </label>
          <input
            name="phone"
            type="tel"
            required
            placeholder="090-1234-5678"
            className="w-full bg-white border-3 border-border rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-pink focus:ring-4 focus:ring-pink/20 transition-all"
          />
        </div>

        {/* Custom Fields */}
        {settings.customFields?.map((field: any) => (
          <div key={field.id} className="flex flex-col gap-2">
            <label className="text-lg font-black text-slate-700">{field.label}</label>
            {field.type === 'text' && (
              <input
                name={`custom_${field.id}`}
                type="text"
                className="w-full bg-white border-3 border-border rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-pink focus:ring-4 focus:ring-pink/20 transition-all"
              />
            )}
            {field.type === 'textarea' && (
              <textarea
                name={`custom_${field.id}`}
                rows={3}
                className="w-full bg-white border-3 border-border rounded-xl p-3 font-bold text-slate-800 focus:outline-none focus:border-pink focus:ring-4 focus:ring-pink/20 transition-all resize-y"
              />
            )}
            {field.type === 'radio' && (
              <div className="flex flex-wrap gap-4 mt-2">
                {field.options?.map((opt: any) => (
                  <label
                    key={opt.id}
                    className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border-2 border-border hover:bg-pink/10 transition-colors"
                  >
                    <input
                      type="radio"
                      name={`custom_${field.id}`}
                      value={opt.value}
                      className="accent-pink w-5 h-5 cursor-pointer"
                    />
                    <span className="font-bold text-slate-700">{opt.value}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 text-white font-black text-xl rounded-xl border-3 border-border shadow-hard transition-all flex items-center justify-center gap-2 mt-4
                ${isLoading ? 'bg-gray-400 cursor-not-allowed shadow-none translate-y-1' : 'bg-pink hover:bg-pink-600 hover:-translate-y-1 hover:shadow-hard-lg active:translate-y-1 active:shadow-none'}`}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              予約する <Send size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
