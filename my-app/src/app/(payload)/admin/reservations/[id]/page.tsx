import React from 'react'
import ReservationList from '@/components/admin/ReservationList'

type Args = {
  params: Promise<{
    id: string
  }>
}

export default async function ReservationPage({ params }: Args) {
  const { id } = await params

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">予約管理</h1>
        <p className="text-muted-foreground mt-2">
          この画面はブラウザの印刷機能を使用して印刷することができます。
        </p>
      </div>
      <ReservationList columnId={id} />
    </div>
  )
}
