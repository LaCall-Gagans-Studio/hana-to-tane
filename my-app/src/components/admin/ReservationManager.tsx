'use client'

import { useDocumentInfo } from '@payloadcms/ui'

export default function ReservationManager() {
  const { id } = useDocumentInfo()

  if (!id) return null

  return (
    <div className="mt-4">
      <p className="text-sm text-muted-foreground mb-4">
        予約の管理は、専用の全画面ページで行います。
      </p>
      <a
        href={`/admin/reservations/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
      >
        予約管理画面を全画面で開く (別タブ)
      </a>
    </div>
  )
}
