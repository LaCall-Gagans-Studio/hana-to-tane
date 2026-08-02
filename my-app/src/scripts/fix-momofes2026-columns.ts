/**
 * Fix flexibleColumns layouts in momofes2026 to match actual column counts,
 * then attempt to publish to verify validation passes.
 *
 * 実行:
 *   npx tsx src/scripts/fix-momofes2026-columns.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

function layoutForCount(count: number): string {
  if (count <= 1) return '1'
  if (count === 2) return '1/2_1/2'
  if (count === 4) return '1/4_1/4_1/4_1/4'
  return '1/3_1/3_1/3'
}

function patchNode(node: any): { node: any; changed: number } {
  if (!node || typeof node !== 'object') return { node, changed: 0 }

  if (Array.isArray(node)) {
    let changed = 0
    const next = node.map((child) => {
      const result = patchNode(child)
      changed += result.changed
      return result.node
    })
    return { node: next, changed }
  }

  let changed = 0
  let next = node

  if (
    node.type === 'block' &&
    node.fields?.blockType === 'flexibleColumns' &&
    Array.isArray(node.fields.columns)
  ) {
    const count = node.fields.columns.length
    const layout = layoutForCount(count)
    if (node.fields.layout !== layout) {
      next = {
        ...node,
        fields: {
          ...node.fields,
          layout,
        },
      }
      changed += 1
      console.log(`  layout ${node.fields.layout} → ${layout} (${count} columns)`)
    }
  }

  if (next.children) {
    const result = patchNode(next.children)
    if (result.changed) {
      next = { ...next, children: result.node }
      changed += result.changed
    }
  }

  if (next.root) {
    const result = patchNode(next.root)
    if (result.changed) {
      next = { ...next, root: result.node }
      changed += result.changed
    }
  }

  return { node: next, changed }
}

async function main() {
  const payload = await getPayload({ config: configPromise })

  const found = await payload.find({
    collection: 'column',
    where: { slug: { equals: 'momofes2026' } },
    limit: 1,
    draft: true,
    depth: 0,
  })

  const doc = found.docs[0]
  if (!doc) {
    throw new Error('Column momofes2026 not found')
  }

  console.log(`Found column id=${doc.id} status=${(doc as any)._status}`)

  const { node: content, changed } = patchNode(doc.content)
  console.log(`Patched ${changed} flexibleColumns layout(s)`)

  console.log('Saving draft with corrected layouts...')
  await payload.update({
    collection: 'column',
    id: doc.id,
    draft: true,
    data: {
      content: content as any,
      _status: 'draft',
    },
  } as any)

  console.log('Attempting publish...')
  const published: any = await payload.update({
    collection: 'column',
    id: doc.id,
    data: {
      content: content as any,
      _status: 'published',
    },
  } as any)

  console.log('Published OK:', published.id, published.slug, published._status)
  process.exit(0)
}

main().catch((err) => {
  console.error('FAILED:', err)
  process.exit(1)
})
