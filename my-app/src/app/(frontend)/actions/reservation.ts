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

  // 1. Fetch Column to check settings
  let column: Column
  try {
    column = await payload.findByID({
      collection: 'column',
      id: columnId,
    })
  } catch (error) {
    return { success: false, error: 'Column not found' }
  }

  const settings = column.reservationSettings

  if (!settings?.enabled) {
    return { success: false, error: 'このコラムは予約を受け付けていません。' }
  }

  // 2. Check Deadline
  if (settings.deadline) {
    const deadline = new Date(settings.deadline)
    const now = new Date()
    if (now > deadline) {
      return { success: false, error: '予約締め切り日時を過ぎています。' }
    }
  }

  // 3. Check Capacity
  if (settings.capacity) {
    const { totalDocs: currentCount } = await payload.count({
      collection: 'reservations',
      where: {
        column: {
          equals: columnId,
        },
      },
    })

    if (currentCount >= settings.capacity) {
      return { success: false, error: '満席のため予約できません。' }
    }
  }

  // 4. Extract Data
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
      
      console.log('reCAPTCHA Verify Response:', recaptchaData) // エラー原因の特定用
      
      if (!recaptchaData.success) {
        // detailを追加してフロントに返すか、サーバーログで確認
        return { success: false, error: `スパム検証に失敗しました。詳細: ${recaptchaData['error-codes']?.join(', ') || '不明'}` }
      }
      
      // v3 score check (usually 0.0 ~ 1.0)
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
  
  // より厳格なメールアドレス形式チェック
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    return { success: false, error: '有効なメールアドレスの形式ではありません。正しく入力されているかご確認ください。' }
  }
  
  const phone = (formData.get('phone') as string)?.trim() || ''

  if (!name || !email || !phone) {
    return { success: false, error: '必須項目が入力されていません。' }
  }

  // Handle Custom Fields
  const responses = []
  if (settings.customFields) {
    for (const field of settings.customFields) {
      const answer = formData.get(`custom_${field.id}`) as string
      if (answer) {
        responses.push({
          question: field.label,
          answer: answer,
        })
      }
    }
  }

  // 5. Create Reservation
  try {
    const reservation = await payload.create({
      collection: 'reservations',
      data: {
        column: columnId,
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
