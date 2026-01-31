'use client'

import { useDocumentInfo } from '@payloadcms/ui'
import { useEffect, useState } from 'react'
import { Printer } from 'lucide-react'

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
}

export default function ReservationManager() {
  const { id } = useDocumentInfo()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchReservations = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/reservations?where[column][equals]=${id}&limit=100`)
        const data = await res.json()
        if (data.docs) {
          setReservations(data.docs)
        }
      } catch (error) {
        console.error('Failed to fetch reservations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, [id])

  const handlePrint = () => {
    window.print()
  }

  if (!id) return null

  return (
    <div
      className="
      p-4 border border-border rounded-lg bg-card text-card-foreground shadow-sm mt-8
      print:fixed print:inset-0 print:z-[9999] print:bg-white print:p-8 print:w-screen print:h-screen print:m-0 print:border-0 print:rounded-none
    "
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">予約者一覧 (合計: {reservations.length}名)</h2>
        <button
          onClick={handlePrint}
          type="button"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors print:hidden"
        >
          <Printer size={16} />
          名簿を印刷する
        </button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">読み込み中...</p>
      ) : reservations.length === 0 ? (
        <p className="text-muted-foreground p-4 text-center bg-muted/50 rounded-md">
          まだ予約はありません
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
              <tr>
                <th className="p-3">名前</th>
                <th className="p-3">メールアドレス</th>
                <th className="p-3">電話番号</th>
                <th className="p-3">備考 (回答)</th>
                <th className="p-3">申込日時</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reservations.map((res) => (
                <tr key={res.id} className="hover:bg-muted/30">
                  <td className="p-3 font-medium">{res.name}</td>
                  <td className="p-3">{res.email}</td>
                  <td className="p-3">{res.phone}</td>
                  <td className="p-3 max-w-xs break-words">
                    {res.responses && res.responses.length > 0 ? (
                      <ul className="list-disc list-inside text-xs text-muted-foreground">
                        {res.responses.map((r, i) => (
                          <li key={i}>
                            <span className="font-semibold">{r.question}:</span> {r.answer}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {new Date(res.createdAt).toLocaleString('ja-JP')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Print only footer */}
      <div className="hidden print:block mt-8 text-right text-sm text-gray-500">
        出力日時: {new Date().toLocaleString('ja-JP')}
      </div>
    </div>
  )
}
