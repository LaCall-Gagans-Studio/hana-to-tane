/**
 * temp_webp の店舗画像を momofes2026 の出店ブロックへ差し込む。
 * 画像がない店舗は外部プレースホルダを取得して使用する。
 *
 * 実行:
 *   npx tsx src/scripts/attach-momofes-vendor-images.ts
 */
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const tempWebpDir = path.resolve(process.cwd(), '../temp_webp')
const cacheDir = path.resolve(process.cwd(), '.tmp-momofes-landing')
const PLACEHOLDER_URL =
  'https://placehold.co/800x600/fdadc8/111111/png?text=Coming+Soon&font=noto-sans'

/** 店舗見出し → temp_webp ファイル名（なければ null = ダミー） */
const VENDOR_IMAGE_KEYS: Array<{ match: RegExp; file: string | null }> = [
  { match: /^①/, file: '1.webp' },
  { match: /^②/, file: '2.webp' },
  { match: /^③/, file: '3.webp' },
  { match: /^④/, file: '4.webp' },
  { match: /^⑤/, file: '5.webp' },
  { match: /^⑥/, file: '6.webp' },
  { match: /^⑦/, file: '7.webp' },
  { match: /^⑧⑨|^⑧/, file: '8-9.webp' },
  { match: /^⑩⑪|^⑩/, file: '10-11.webp' },
  { match: /^⑫/, file: '12.webp' },
  { match: /^⑬/, file: '13.webp' },
  { match: /^⑭⑮|^⑭/, file: '14-15.webp' },
  { match: /^⑯/, file: '16.webp' },
  { match: /^⑰⑱|^⑰/, file: '17-18.webp' },
  { match: /^⑲/, file: '19.webp' },
  { match: /^⑳/, file: '20.webp' },
  { match: /^A\./, file: 'A.webp' },
  { match: /^B\./, file: 'B.webp' },
  { match: /^㉑/, file: '21.webp' },
  { match: /^㉒/, file: '22.webp' },
  { match: /^㉓/, file: null },
  { match: /^㉔/, file: '24.webp' },
  { match: /^㉕/, file: '25.webp' },
  { match: /^㉖/, file: '26.webp' },
  { match: /^㉗/, file: null },
  { match: /^㉘/, file: null },
  { match: /^㉚/, file: '30.webp' },
  { match: /^㉛/, file: '31-34.webp' },
  { match: /^㊵/, file: '40.webp' },
  { match: /^㊶/, file: null },
  { match: /^㊷/, file: null },
  { match: /^㊺/, file: null },
  { match: /^㊻/, file: '46.webp' },
  { match: /^㊼/, file: '47.webp' },
  { match: /^㊽/, file: null },
]

function uid(): string {
  return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

function uploadNode(mediaId: number | string) {
  return {
    id: uid(),
    type: 'upload',
    value: mediaId,
    fields: null,
    format: '',
    version: 3,
    relationTo: 'media',
  }
}

function headingText(node: any): string {
  if (node?.type !== 'heading') return ''
  return (node.children || []).map((c: any) => c?.text || '').join('')
}

function isVendorHeading(text: string): boolean {
  // 駐車場案内など集客用カラムを除外
  if (/グラウンド|駐車場|シャトル|アクセス/.test(text)) return false
  return VENDOR_IMAGE_KEYS.some((v) => v.match.test(text))
}

function resolveImageKey(heading: string): string | null | undefined {
  const found = VENDOR_IMAGE_KEYS.find((v) => v.match.test(heading))
  return found ? found.file : undefined
}

async function getOrCreateMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filename: string,
  alt: string,
  filePath: string,
) {
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  if (existing.docs[0]) return existing.docs[0]

  const data = fs.readFileSync(filePath)
  return payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data,
      mimetype: 'image/webp',
      name: filename,
      size: data.length,
    },
  })
}

async function ensurePlaceholderWebp(): Promise<string> {
  const outPath = path.join(cacheDir, 'momofes2026-vendor-placeholder.webp')
  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 1000) return outPath

  fs.mkdirSync(cacheDir, { recursive: true })
  console.log('Downloading placeholder from', PLACEHOLDER_URL)
  const res = await fetch(PLACEHOLDER_URL)
  if (!res.ok) throw new Error(`Failed to download placeholder: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const pngPath = path.join(cacheDir, 'momofes2026-vendor-placeholder.png')
  fs.writeFileSync(pngPath, buf)

  // Convert via sharp if available, else keep pre-made webp from PIL fallback
  try {
    const sharp = (await import('sharp')).default
    await sharp(pngPath).webp({ quality: 85 }).toFile(outPath)
  } catch {
    if (!fs.existsSync(outPath)) {
      throw new Error('sharp convert failed and no fallback webp exists')
    }
  }
  return outPath
}

async function main() {
  if (!fs.existsSync(tempWebpDir)) {
    throw new Error(`temp_webp not found: ${tempWebpDir}`)
  }

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'column',
    where: { slug: { equals: 'momofes2026' } },
    depth: 0,
    draft: true,
    limit: 1,
  })
  const article = result.docs[0] as any
  if (!article) throw new Error('momofes2026 が見つかりません')

  const placeholderPath = await ensurePlaceholderWebp()
  const placeholder = await getOrCreateMedia(
    payload,
    'momofes2026-vendor-placeholder.webp',
    '出店画像準備中',
    placeholderPath,
  )

  const mediaByFile = new Map<string, number | string>()
  mediaByFile.set('__placeholder__', placeholder.id)

  const files = fs.readdirSync(tempWebpDir).filter((f) => f.toLowerCase().endsWith('.webp'))
  for (const file of files) {
    const media = await getOrCreateMedia(
      payload,
      `momofes2026-vendor-${file}`,
      `桃フェス出店 ${file.replace(/\.webp$/i, '')}`,
      path.join(tempWebpDir, file),
    )
    mediaByFile.set(file, media.id)
    console.log('uploaded', file, '->', media.id)
  }

  const children = article.content?.root?.children || []
  let updatedVendors = 0
  let withReal = 0
  let withDummy = 0

  for (const node of children) {
    if (node?.type !== 'block') continue
    const fields = node.fields
    if (fields?.blockType !== 'flexibleColumns') continue

    for (const col of fields.columns || []) {
      const rtChildren = col?.content?.root?.children
      if (!Array.isArray(rtChildren) || rtChildren.length === 0) continue

      const title = headingText(rtChildren[0])
      if (!isVendorHeading(title)) {
        // 誤って付いた駐車場などの画像を除去
        if (/グラウンド|駐車場|シャトル|アクセス/.test(title)) {
          col.content.root.children = rtChildren.filter((c: any) => c?.type !== 'upload')
        }
        continue
      }

      const key = resolveImageKey(title)
      if (key === undefined) continue

      const mediaId =
        key && mediaByFile.has(key) ? mediaByFile.get(key)! : mediaByFile.get('__placeholder__')!

      if (key && mediaByFile.has(key)) withReal++
      else withDummy++

      // Remove existing upload nodes then insert after heading
      const withoutUploads = rtChildren.filter((c: any) => c?.type !== 'upload')
      const heading = withoutUploads[0]
      const rest = withoutUploads.slice(1)
      col.content.root.children = [heading, uploadNode(mediaId), ...rest]
      updatedVendors++
    }
  }

  await payload.update({
    collection: 'column',
    id: article.id,
    draft: true,
    depth: 0,
    data: {
      content: article.content,
      _status: 'draft',
    } as any,
  })

  console.log(
    `完了: vendors=${updatedVendors}, realImages=${withReal}, placeholders=${withDummy}`,
  )
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
