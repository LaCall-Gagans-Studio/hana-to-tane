import { getPayload } from 'payload'
import type { Where } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'

export function isColumnPreviewParam(
  value: string | string[] | undefined,
): boolean {
  if (Array.isArray(value)) return value.includes('true')
  return value === 'true'
}

export async function getColumnBySlug(slug: string, preview = false) {
  // プレビュー時は ISR キャッシュを使わず最新の下書きを返す
  if (preview) {
    noStore()
  }

  const { isEnabled: isDraftMode } = await draftMode()
  const allowDraft = preview || isDraftMode

  const payload = await getPayload({ config: configPromise })

  const whereConditions: Where[] = [
    {
      slug: {
        equals: slug,
      },
    },
  ]

  if (!allowDraft) {
    whereConditions.push({
      _status: {
        equals: 'published',
      },
    })
  }

  const columns = await payload.find({
    collection: 'column',
    where: {
      and: whereConditions,
    },
    limit: 1,
    depth: 2,
    draft: allowDraft,
    overrideAccess: allowDraft,
  })

  return columns.docs[0] ?? null
}

export function getColumnPreviewUrl(slug: string): string {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return `${base.replace(/\/$/, '')}/column/${encodeURIComponent(slug)}?preview=true`
}
