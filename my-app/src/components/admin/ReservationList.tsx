'use client'

import { useEffect, useState } from 'react'
import { Printer, Plus, X } from 'lucide-react'

type Reservation = {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
  responses?: {
    question: string
    answer: string
  }[]
  column?: string | { id: string }
}

type ColumnSettings = {
  reservationSettings?: {
    customFields?: {
      label: string
      type: 'text' | 'textarea' | 'radio'
      options?: { value: string }[]
    }[]
  }
}

interface ReservationListProps {
  columnId: string
}

export default function ReservationList({ columnId }: ReservationListProps) {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(false)
  const [columnSettings, setColumnSettings] = useState<ColumnSettings | null>(null)

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null)
  const [formData, setFormData] = useState<Partial<Reservation>>({})

  // Fetch Reservations & Column Settings
  useEffect(() => {
    if (!columnId) return

    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch Reservations
        const resReservations = await fetch(
          `/api/reservations?where[column][equals]=${columnId}&limit=100&sort=-createdAt`,
        )
        const dataReservations = await resReservations.json()
        if (dataReservations.docs) {
          setReservations(dataReservations.docs)
        }

        // Fetch Column Settings (for custom fields)
        const resColumn = await fetch(`/api/column/${columnId}`)
        const dataColumn = await resColumn.json()
        setColumnSettings(dataColumn)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [columnId])

  const handlePrint = () => {
    window.print()
  }

  const handleDelete = async (resId: string) => {
    if (!window.confirm('本当にこの予約を削除しますか？\nこの操作は取り消せません。')) return

    try {
      const res = await fetch(`/api/reservations/${resId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setReservations((prev) => prev.filter((r) => r.id !== resId))
        alert('予約を削除しました。')
      } else {
        throw new Error('Deletion failed')
      }
    } catch (error) {
      console.error('Failed to delete reservation:', error)
      alert('削除に失敗しました。')
    }
  }

  const openModal = (reservation?: Reservation) => {
    if (reservation) {
      setEditingReservation(reservation)
      setFormData({
        name: reservation.name,
        email: reservation.email,
        phone: reservation.phone,
        responses: reservation.responses || [],
      })
    } else {
      setEditingReservation(null)
      setFormData({
        name: '',
        email: '',
        phone: '',
        responses:
          columnSettings?.reservationSettings?.customFields?.map((f) => ({
            question: f.label,
            answer: '',
          })) || [],
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingReservation(null)
    setFormData({})
  }

  const handleInputChange = (field: keyof Reservation, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleResponseChange = (question: string, value: string) => {
    setFormData((prev) => {
      const currentResponses = prev.responses || []
      const existingIndex = currentResponses.findIndex((r) => r.question === question)

      let newResponses
      if (existingIndex >= 0) {
        newResponses = [...currentResponses]
        newResponses[existingIndex] = { question, answer: value }
      } else {
        newResponses = [...currentResponses, { question, answer: value }]
      }

      return { ...prev, responses: newResponses }
    })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!columnId) return

    try {
      const payload = {
        ...formData,
        column: columnId, // Ensure linked to current column
      }

      let res
      if (editingReservation) {
        // Update
        res = await fetch(`/api/reservations/${editingReservation.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        // Create
        res = await fetch(`/api/reservations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }

      if (res.ok) {
        const savedDoc = await res.json()
        const savedReservation = savedDoc.doc || savedDoc // Payload response structure check

        setReservations((prev) => {
          if (editingReservation) {
            return prev.map((r) => (r.id === savedReservation.id ? savedReservation : r))
          } else {
            return [savedReservation, ...prev]
          }
        })
        closeModal()
        alert(editingReservation ? '予約を更新しました。' : '予約を追加しました。')
      } else {
        const errorData = await res.json()
        console.error('Save failed:', errorData)
        throw new Error('Save failed')
      }
    } catch (error) {
      console.error('Failed to save reservation:', error)
      alert('保存に失敗しました。')
    }
  }

  if (!columnId) return null

  return (
    <>
      <div
        className="reservation-list-custom
      p-4 border border-border rounded-lg bg-card text-card-foreground shadow-sm mt-8
      print:fixed print:inset-0 print:z-9999 print:bg-white print:p-8 print:w-screen print:h-screen print:m-0 print:border-0 print:rounded-none
    "
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">予約者一覧 (合計: {reservations.length}名)</h2>
          <div className="flex gap-2 print:hidden">
            <button
              onClick={() => openModal()}
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
            >
              <Plus size={16} />
              予約を追加
            </button>
            <button
              onClick={handlePrint}
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md transition-colors"
            >
              <Printer size={16} />
              印刷
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-muted-foreground">読み込み中...</p>
        ) : reservations.length === 0 ? (
          <p className="text-muted-foreground p-4 text-center bg-muted/50">まだ予約はありません</p>
        ) : (
          <div className="custom-table-wrapper">
            <table className="w-full text-sm text-left border-collapse bg-white text-black">
              <thead className="bg-gray-100 text-black border-b border-gray-400">
                <tr>
                  <th className="p-3 border-r border-gray-400 w-[100px] text-center text-black font-normal">
                    操作
                  </th>
                  <th className="p-3 border-r border-gray-400 min-w-[120px] text-black font-normal">
                    名前
                  </th>
                  <th className="p-3 border-r border-gray-400 min-w-[150px] text-black font-normal">
                    メールアドレス
                  </th>
                  <th className="p-3 border-r border-gray-400 min-w-[120px] text-black font-normal">
                    電話番号
                  </th>
                  <th className="p-3 border-r border-gray-400 min-w-[200px] text-black font-normal">
                    備考 (回答)
                  </th>
                  <th className="p-3 border-r border-gray-400 min-w-[150px] text-black font-normal">
                    申込日時
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-400">
                {reservations.map((res) => (
                  <tr
                    key={res.id}
                    className="hover:bg-gray-50 transition-colors border-b border-gray-400 last:border-b-0"
                  >
                    <td className="p-3 border-r border-gray-400 text-center">
                      <div className="flex justify-center gap-2 print:hidden">
                        <button
                          onClick={() => openModal(res)}
                          className="p-1 px-2 border border-gray-300 bg-white text-blue-600 hover:bg-blue-50 transition-colors"
                          title="編集"
                        >
                          編集
                        </button>
                        <button
                          onClick={() => handleDelete(res.id)}
                          className="p-1 px-2 border border-gray-300 bg-white text-red-600 hover:bg-red-50 transition-colors"
                          title="削除"
                        >
                          削除
                        </button>
                      </div>
                    </td>
                    <td className="p-3 border-r border-gray-400 text-black">{res.name}</td>
                    <td className="p-3 border-r border-gray-400 text-black">{res.email}</td>
                    <td className="p-3 border-r border-gray-400 text-black">{res.phone}</td>
                    <td className="p-3 border-r border-gray-400 max-w-xs break-words">
                      {res.responses && res.responses.length > 0 ? (
                        <div className="flex flex-col">
                          {res.responses.map((r, i) => (
                            <div key={i} className="custom-response-item">
                              <span className="question">{r.question}</span>
                              <span className="answer">{r.answer}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="p-3 border-r border-gray-400 whitespace-nowrap text-black">
                      {new Date(res.createdAt).toLocaleString('ja-JP')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Print only footer */}
        <div className="hidden print:block mt-8 text-right text-sm text-black">
          出力日時: {new Date().toLocaleString('ja-JP')}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="custom-modal-overlay print:hidden">
          <div className="custom-modal-content">
            <div className="custom-modal-header">
              <h3>{editingReservation ? '予約情報の編集' : '新規予約の追加'}</h3>
              <button onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="custom-modal-form">
              <div className="custom-form-field">
                <label>お名前 *</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="山田 太郎"
                />
              </div>
              <div className="custom-form-field">
                <label>メールアドレス *</label>
                <input
                  type="email"
                  required
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="example@example.com"
                />
              </div>
              <div className="custom-form-field">
                <label>電話番号 *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="090-1234-5678"
                />
              </div>

              {/* Custom Fields */}
              {columnSettings?.reservationSettings?.customFields?.map((field, idx) => (
                <div key={idx} className="custom-form-field">
                  <label>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={
                        formData.responses?.find((r) => r.question === field.label)?.answer || ''
                      }
                      onChange={(e) => handleResponseChange(field.label, e.target.value)}
                      placeholder="こちらに入力してください"
                      className="custom-field-input"
                    />
                  ) : field.type === 'radio' && field.options ? (
                    <div className="flex gap-4">
                      {field.options.map((opt, optIdx) => (
                        <label key={optIdx} className="custom-radio-label">
                          <input
                            type="radio"
                            name={`radio-${idx}`}
                            value={opt.value}
                            checked={
                              formData.responses?.find((r) => r.question === field.label)
                                ?.answer === opt.value
                            }
                            onChange={(e) => handleResponseChange(field.label, e.target.value)}
                          />
                          {opt.value}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={
                        formData.responses?.find((r) => r.question === field.label)?.answer || ''
                      }
                      onChange={(e) => handleResponseChange(field.label, e.target.value)}
                      placeholder="こちらに入力してください"
                    />
                  )}
                </div>
              ))}

              <div className="custom-modal-actions">
                <button type="button" onClick={closeModal} className="custom-btn-cancel">
                  キャンセル
                </button>
                <button type="submit" className="custom-btn-save">
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
