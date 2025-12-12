'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Plant } from '@/payload-types' // Assuming types are generated

// Helper to generate 12-digit DNA
const generateDNA = () => Math.floor(Math.random() * 900000000000) + 100000000000

// Mnemonic Word List (Positive/Friendly words)
const WORD_LIST = [
  'apple',
  'blue',
  'cat',
  'dream',
  'earth',
  'flower',
  'green',
  'happy',
  'ice',
  'jump',
  'kite',
  'lucky',
  'moon',
  'nice',
  'orange',
  'pink',
  'queen',
  'red',
  'sky',
  'tree',
  'unit',
  'violet',
  'water',
  'yellow',
  'zoo',
  'angel',
  'brave',
  'calm',
  'dance',
  'eagle',
  'fairy',
  'gold',
  'hope',
  'island',
  'joy',
  'king',
  'lemon',
  'magic',
  'nature',
  'ocean',
  'peace',
  'quest',
  'river',
  'star',
  'top',
  'view',
  'wind',
  'yard',
  'zen',
  'art',
  'book',
  'cake',
  'door',
  'egg',
  'fish',
  'gift',
  'hat',
  'ink',
  'jam',
  'leaf',
  'map',
  'note',
  'owl',
  'pen',
  'rose',
  'ship',
  'tea',
]

const generateTransferId = () => {
  const shuffled = [...WORD_LIST].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 4).join('-')
}

// Generate unique ID with retry
const generateUniqueTransferId = async (payload: any): Promise<string> => {
  for (let i = 0; i < 5; i++) {
    const id = generateTransferId()
    const existing = await payload.find({
      collection: 'plants',
      where: { transferId: { equals: id } },
      limit: 1,
    })
    if (existing.docs.length === 0) return id
  }
  return generateTransferId() + '-' + Date.now().toString(36) // Fallback
}

export async function getOrCreatePlant(transferId?: string) {
  const payload = await getPayload({ config: configPromise })

  if (transferId) {
    try {
      // Find by transferId field
      const result = await payload.find({
        collection: 'plants',
        where: { transferId: { equals: transferId } },
        limit: 1,
      })

      if (result.docs.length > 0) {
        return result.docs[0]
      }
    } catch (error) {
      console.log('Plant search error, creating new one.', error)
    }
  }

  // Create new plant
  const newTransferId = await generateUniqueTransferId(payload)

  const newPlant = await payload.create({
    collection: 'plants',
    data: {
      transferId: newTransferId,
      dna: generateDNA(),
      type: 'default',
      state: 'seed',
      growthProgress: 0,
      streak: 0,
      hueShift: 0,
      maxHeight: 0,
      waterCount: 0,
      lastWatered: new Date().toISOString(),
    },
  })

  return newPlant
}

export async function updatePlant(id: string, data: Partial<Plant>) {
  const payload = await getPayload({ config: configPromise })

  try {
    const updated = await payload.update({
      collection: 'plants',
      id,
      data,
    })
    return updated
  } catch (error) {
    console.error('Failed to update plant:', error)
    throw new Error('Failed to update plant')
  }
}

export async function getPlantStats() {
  const payload = await getPayload({ config: configPromise })

  // Max User Height (World Record)
  // Payload 'find' returns paginated docs. We sort by maxHeight descending.
  const maxRecordQuery = await payload.find({
    collection: 'plants',
    sort: '-maxHeight',
    limit: 1,
  })

  const maxUserHeight = maxRecordQuery.docs[0]?.maxHeight || 0

  // Total Height (All plants)
  // Note: For large datasets, this should be an aggregation query or cached.
  // Using iteration here for MVP as requested implicitly by " 합算値 ".
  // Limit to 1000 for safety or iterate if needed. For now 1000 is likely enough for initial launch.
  const allPlants = await payload.find({
    collection: 'plants',
    limit: 1000,
    select: {
      maxHeight: true,
    },
  })

  const totalHeight = allPlants.docs.reduce((sum, doc) => sum + (doc.maxHeight || 0), 0)

  return {
    totalHeight,
    maxUserHeight,
  }
}
