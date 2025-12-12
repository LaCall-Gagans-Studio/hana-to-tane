'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function fetchGalleryItems(page: number = 1) {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'gallery',
    limit: 15,
    sort: '-shotDate', // Sort by shotDate descending, fallback to createdAt if shotDate is missing
    page,
  })

  return {
    docs: result.docs,
    hasNextPage: result.hasNextPage,
    nextPage: result.nextPage,
  }
}
