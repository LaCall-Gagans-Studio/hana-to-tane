/**
 * 旧 reservationSettings → 新 reservationSlots へのデータ移行スクリプト
 *
 * 実行方法:
 *   npx tsx src/scripts/migrate-reservation-slots.ts
 *
 * 移行完了後:
 *   1. Column.ts から reservationSettings (旧) フィールドを削除
 *   2. 開発サーバーを再起動し、schema push で Y を選択
 *   3. このスクリプトファイルを削除
 */

import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function migrate() {
  const payload = await getPayload({ config: configPromise })

  const { docs: columns } = await payload.find({
    collection: 'column',
    limit: 0, // all
    draft: true, // include drafts
  })

  let migrated = 0
  let skipped = 0

  for (const column of columns) {
    const old = (column as any).reservationSettings
    if (!old?.enabled) {
      skipped++
      continue
    }

    const existingSlots = (column as any).reservationSlots || []
    if (existingSlots.length > 0) {
      console.log(`[SKIP] Column "${column.title}" (id=${column.id}) — already has reservationSlots`)
      skipped++
      continue
    }

    const slot: Record<string, any> = {
      name: column.title || '予約',
      enabled: old.enabled ?? false,
      capacity: old.capacity ?? null,
      deadline: old.deadline ?? null,
    }

    if (old.customFields && old.customFields.length > 0) {
      slot.customFields = old.customFields.map((cf: any) => ({
        label: cf.label,
        type: cf.type || 'text',
        content: cf.content || null,
        options: cf.options || [],
      }))
    }

    try {
      await payload.update({
        collection: 'column',
        id: column.id,
        data: {
          reservationSlots: [slot],
        } as any,
        draft: true,
      })
      console.log(`[OK] Column "${column.title}" (id=${column.id}) — migrated`)
      migrated++
    } catch (err) {
      console.error(`[ERROR] Column "${column.title}" (id=${column.id}):`, err)
    }
  }

  console.log(`\n=== 移行完了 ===`)
  console.log(`移行済み: ${migrated} / スキップ: ${skipped} / 合計: ${columns.length}`)
  console.log(`\n次のステップ:`)
  console.log(`1. Column.ts から reservationSettings (旧) のフィールドブロックを削除`)
  console.log(`2. 開発サーバーを再起動して schema push で Y を選択`)
  console.log(`3. このスクリプトファイルを削除`)

  process.exit(0)
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
