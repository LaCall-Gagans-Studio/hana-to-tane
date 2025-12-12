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
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  if (!email || !email.includes('@')) {
    return { success: false, error: 'メールアドレスが正しくありません' }
  }
  const phone = formData.get('phone') as string

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
