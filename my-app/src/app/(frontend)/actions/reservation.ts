'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Column } from '@/payload-types'

type ReservationResponse = {
  success: boolean
  error?: string
  reservationId?: string
}

export async function submitReservation(
  columnId: number,
  formData: FormData,
): Promise<ReservationResponse> {
  const payload = await getPayload({ config: configPromise })
  const slotId = formData.get('slotId') as string

  if (!slotId) {
    return { success: false, error: '予約枠が指定されていません。' }
  }

  let column: Column
  try {
    column = await payload.findByID({
      collection: 'column',
      id: columnId,
    })
  } catch (error) {
    return { success: false, error: 'Column not found' }
  }

  const slot = column.reservationSlots?.find((s) => s.id === slotId)
  if (!slot) {
    return { success: false, error: '指定された予約枠が見つかりません。' }
  }

  if (!slot.enabled) {
    return { success: false, error: 'この予約枠は現在受付を停止しています。' }
  }

  if (slot.deadline) {
    if (new Date() > new Date(slot.deadline)) {
      return { success: false, error: '予約締め切り日時を過ぎています。' }
    }
  }

  if (slot.capacity) {
    const { totalDocs: currentCount } = await payload.count({
      collection: 'reservations',
      where: {
        column: { equals: columnId },
        reservationSlotId: { equals: slotId },
      },
    })

    if (currentCount >= slot.capacity) {
      return { success: false, error: '満席のため予約できません。' }
    }
  }

  const recaptchaToken = formData.get('recaptchaToken') as string

  if (!recaptchaToken) {
    return { success: false, error: 'スパム検証情報が不足しています。画面を再読み込みしてお試しください。' }
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (secretKey) {
    try {
      const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${recaptchaToken}`,
      })
      const recaptchaData = await recaptchaRes.json()

      console.log('reCAPTCHA Verify Response:', recaptchaData)

      if (!recaptchaData.success) {
        return { success: false, error: `スパム検証に失敗しました。詳細: ${recaptchaData['error-codes']?.join(', ') || '不明'}` }
      }

      if (recaptchaData.score !== undefined && recaptchaData.score < 0.5) {
        return { success: false, error: 'スパムの可能性が高いと判定されました。' }
      }
    } catch (error) {
      console.error('reCAPTCHA verification error:', error)
      return { success: false, error: 'reCAPTCHAの通信エラーが発生しました。' }
    }
  }

  const name = (formData.get('name') as string)?.trim() || ''
  const email = (formData.get('email') as string)?.trim() || ''

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    return { success: false, error: '有効なメールアドレスの形式ではありません。正しく入力されているかご確認ください。' }
  }

  const phone = (formData.get('phone') as string)?.trim() || ''

  if (!name || !email || !phone) {
    return { success: false, error: '必須項目が入力されていません。' }
  }

  const responses = []
  if (slot.customFields) {
    for (const field of slot.customFields) {
      if (field.type === 'content') continue

      const answer = formData.get(`custom_${field.id}`) as string
      if (answer) {
        responses.push({
          question: field.label,
          answer: answer,
        })
      }
    }
  }

  try {
    const reservation = await payload.create({
      collection: 'reservations',
      data: {
        column: columnId,
        reservationSlotId: slotId,
        reservationSlotName: slot.name,
        name,
        email,
        phone,
        responses,
      },
    })
    return { success: true, reservationId: String(reservation.id) }
  } catch (error) {
    console.error('Reservation creation failed:', error)
    return { success: false, error: '予約の保存に失敗しました。' }
  }
}
