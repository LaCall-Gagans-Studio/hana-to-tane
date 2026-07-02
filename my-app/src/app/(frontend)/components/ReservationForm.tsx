'use client'

import React, { useState } from 'react'
import { Column } from '@/payload-types'
import { submitReservation } from '../actions/reservation'
import { Send, CheckCircle, AlertCircle, Loader2, ChevronDown } from 'lucide-react'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'

type Props = {
  column: Column
}

type ReservationSlot = NonNullable<Column['reservationSlots']>[number]

const SingleSlotForm = ({
  column,
  slot,
}: {
  column: Column
  slot: ReservationSlot
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { executeRecaptcha } = useGoogleReCaptcha()

  const isDeadlinePassed = slot.deadline && new Date() > new Date(slot.deadline)

  if (!slot.enabled) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 font-bold">この予約枠は現在受付を停止しています</p>
      </div>
    )
  }

  if (isDeadlinePassed) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 font-bold">予約受付は終了しました</p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!executeRecaptcha) {
      setError('スパム検証モジュールがまだ読み込まれていません。通信環境をご確認ください。')
      return
    }

    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const token = await executeRecaptcha('reservation_submit')

      if (!token) {
        setError('スパム検証トークンの生成に失敗しました。ブラウザの通信状態か、設定キーをご確認ください。')
        setIsLoading(false)
        return
      }

      formData.append('recaptchaToken', token)
      formData.append('slotId', slot.id!)
      const result = await submitReservation(column.id, formData)

      if (result.success) {
        setIsSuccess(true)
      } else {
        setError(result.error || '予期せぬエラーが発生しました。')
      }
    } catch (err) {
      console.error('reCAPTCHA execution error:', err)
      setError('スパム検証中にエラーが発生しました。')
    }

    setIsLoading(false)
  }

  if (isSuccess) {
    return (
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-green text-white rounded-full mb-3">
          <CheckCircle size={28} />
        </div>
        <h3 className="text-xl font-black text-slate-800 mb-2">予約を受け付けました</h3>
        <p className="text-slate-600 font-bold leading-relaxed">
          確認メールをお送りしましたので、ご確認ください。
        </p>
      </div>
    )
  }

  return (
    <>
      {error && (
        <div className="bg-red-50 border-2 border-red-500 text-red-700 p-4 rounded-lg mb-6 flex items-start gap-3">
          <AlertCircle className="shrink-0 mt-0.5" size={20} />
          <span className="font-bold">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-black text-slate-700">
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
          <label className="text-lg font-black text-slate-700">
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
          <label className="text-lg font-black text-slate-700">
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
        {slot.customFields?.map((field: any) => {
          if (field.type === 'content') {
            return (
              <div
                key={field.id}
                className="bg-gray-50 border-2 border-border rounded-xl p-4 md:p-5"
              >
                {field.label && (
                  <p className="text-lg font-black text-slate-700 mb-2">{field.label}</p>
                )}
                {field.content && (
                  <p className="text-slate-600 font-bold leading-relaxed whitespace-pre-wrap">
                    {field.content}
                  </p>
                )}
              </div>
            )
          }

          return (
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
          )
        })}

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
    </>
  )
}

const InnerReservationForm = ({ column }: Props) => {
  const slots = column.reservationSlots
  const [openSlotId, setOpenSlotId] = useState<string | null>(null)

  if (!slots || slots.length === 0) return null

  const toggleSlot = (id: string) => {
    setOpenSlotId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-1 bg-pink text-white font-black text-sm rounded-full shadow-sm border-2 border-border">
          RESERVATION
        </span>
      </div>

      {slots.map((slot) => {
        const isOpen = openSlotId === slot.id
        const isDeadlinePassed = slot.deadline && new Date() > new Date(slot.deadline)
        const isDisabled = !slot.enabled || !!isDeadlinePassed

        return (
          <div
            key={slot.id}
            className={`border-3 rounded-2xl overflow-hidden transition-all ${
              isDisabled
                ? 'border-gray-300 opacity-60'
                : isOpen
                  ? 'border-pink shadow-hard'
                  : 'border-border shadow-hard'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleSlot(slot.id!)}
              className={`w-full flex justify-between items-center p-5 md:p-6 text-left transition-colors ${
                isOpen ? 'bg-pink/10' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-xl md:text-2xl font-black text-slate-800">{slot.name}</h3>
                {isDeadlinePassed && (
                  <span className="text-xs font-bold bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    受付終了
                  </span>
                )}
                {!slot.enabled && (
                  <span className="text-xs font-bold bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    停止中
                  </span>
                )}
                {slot.capacity && !isDisabled && (
                  <span className="text-xs font-bold bg-blue/10 text-blue px-2 py-1 rounded-full border border-blue/30">
                    定員 {slot.capacity}名
                  </span>
                )}
              </div>
              <ChevronDown
                size={24}
                className={`text-slate-400 transition-transform duration-300 shrink-0 ml-2 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="p-6 md:p-8 border-t-3 border-border bg-white">
                <SingleSlotForm column={column} slot={slot} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export const ReservationForm = ({ column }: Props) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
    >
      <InnerReservationForm column={column} />
    </GoogleReCaptchaProvider>
  )
}
