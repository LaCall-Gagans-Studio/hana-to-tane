'use server'

import { getPayload } from 'payload'
import type { Payload } from 'payload'
import configPromise from '@payload-config'
import { Plant } from '@/payload-types'

const LOCAL = { overrideAccess: true as const }
const PLANT_TYPES = ['Classic', 'Sakura', 'Fern', 'Vine'] as const
const GAME_STATES = ['seed', 'sprout', 'growing', 'bud', 'flower'] as const
const MAX_HEIGHT_CM = 10000

type GameState = (typeof GAME_STATES)[number]

export type WaterPlantResult =
  | { ok: true; plant: Plant; evolved: boolean }
  | { ok: false; reason: 'already_watered' | 'not_found' }

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
const generateUniqueTransferId = async (payload: Payload): Promise<string> => {
  for (let i = 0; i < 5; i++) {
    const id = generateTransferId()
    const existing = await payload.find({
      collection: 'plants',
      where: { transferId: { equals: id } },
      limit: 1,
      ...LOCAL,
    })
    if (existing.docs.length === 0) return id
  }
  return generateTransferId() + '-' + Date.now().toString(36) // Fallback
}

const getJSTYYYYMMDD = (d: Date): string => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(d)
  const year = parts.find((p) => p.type === 'year')?.value
  const month = parts.find((p) => p.type === 'month')?.value
  const day = parts.find((p) => p.type === 'day')?.value
  return `${year}-${month}-${day}`
}

const shiftISODate = (isoDate: string, days: number): string => {
  const [y, m, d] = isoDate.split('-').map(Number)
  const next = new Date(Date.UTC(y, m - 1, d + days))
  const year = next.getUTCFullYear()
  const month = String(next.getUTCMonth() + 1).padStart(2, '0')
  const day = String(next.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const parsePlantId = (id: string): number | null => {
  const n = Number(id)
  if (!Number.isInteger(n) || n <= 0) return null
  return n
}

const normalizeState = (state: string | null | undefined): GameState => {
  if (state && (GAME_STATES as readonly string[]).includes(state)) return state as GameState
  return 'seed'
}

const nextState = (state: GameState): GameState | null => {
  if (state === 'seed') return 'sprout'
  if (state === 'sprout') return 'growing'
  if (state === 'growing') return 'bud'
  if (state === 'bud') return 'flower'
  return null
}

const applyWatering = (plant: Plant) => {
  const today = getJSTYYYYMMDD(new Date())
  const lastWateredDate = plant.lastWatered ? getJSTYYYYMMDD(new Date(plant.lastWatered)) : null
  if (lastWateredDate === today) return { alreadyWatered: true as const }

  let currentState = normalizeState(plant.state)
  let growthAmount = 0.1 + Math.random() * 0.1
  if (currentState === 'seed') growthAmount = 1.0

  let growthProgress = (plant.growthProgress || 0) + growthAmount
  let evolved = false

  if (growthProgress >= 1.0) {
    const upcoming = nextState(currentState)
    if (upcoming) {
      growthProgress -= 1.0
      currentState = upcoming
      evolved = true
    }
  }

  let streak = plant.streak || 0
  if (lastWateredDate) {
    const yesterdayStr = shiftISODate(today, -1)
    if (lastWateredDate === yesterdayStr) streak += 1
    else streak = 1
  } else {
    streak = 1
  }

  return {
    alreadyWatered: false as const,
    evolved,
    data: {
      growthProgress,
      streak,
      lastWatered: new Date().toISOString(),
      waterCount: (plant.waterCount || 0) + 1,
      state: currentState,
    },
  }
}

export async function getOrCreatePlant(transferId?: string) {
  const payload = await getPayload({ config: configPromise })

  if (transferId) {
    try {
      const result = await payload.find({
        collection: 'plants',
        where: { transferId: { equals: transferId } },
        limit: 1,
        ...LOCAL,
      })

      if (result.docs.length > 0) {
        return result.docs[0]
      }
    } catch (error) {
      console.log('Plant search error, creating new one.', error)
    }
  }

  const newTransferId = await generateUniqueTransferId(payload)

  return payload.create({
    collection: 'plants',
    data: {
      transferId: newTransferId,
      dna: generateDNA(),
      type: 'Classic',
      state: 'seed',
      growthProgress: 0,
      streak: 0,
      hueShift: 0,
      maxHeight: 0,
      waterCount: 0,
      lastWatered: null,
    },
    ...LOCAL,
  })
}

export async function waterPlant(id: string): Promise<WaterPlantResult> {
  const plantId = parsePlantId(id)
  if (!plantId) return { ok: false, reason: 'not_found' }

  const payload = await getPayload({ config: configPromise })

  let existing: Plant
  try {
    existing = await payload.findByID({
      collection: 'plants',
      id: plantId,
      ...LOCAL,
    })
  } catch {
    return { ok: false, reason: 'not_found' }
  }

  const result = applyWatering(existing)
  if (result.alreadyWatered) return { ok: false, reason: 'already_watered' }

  const plant = await payload.update({
    collection: 'plants',
    id: plantId,
    data: result.data,
    ...LOCAL,
  })

  return { ok: true, plant, evolved: result.evolved }
}

export async function claimPlant(transferId: string): Promise<Plant | null> {
  const id = transferId.trim()
  if (!id) return null

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'plants',
    where: { transferId: { equals: id } },
    limit: 1,
    ...LOCAL,
  })

  return result.docs[0] ?? null
}

export async function resetPlant(id: string): Promise<Plant | null> {
  const plantId = parsePlantId(id)
  if (!plantId) return null

  const payload = await getPayload({ config: configPromise })

  try {
    await payload.findByID({
      collection: 'plants',
      id: plantId,
      ...LOCAL,
    })
  } catch {
    return null
  }

  const type = PLANT_TYPES[Math.floor(Math.random() * PLANT_TYPES.length)]

  return payload.update({
    collection: 'plants',
    id: plantId,
    data: {
      dna: generateDNA(),
      type,
      state: 'seed',
      growthProgress: 0,
      streak: 0,
      hueShift: Math.floor(Math.random() * 60) - 30,
      maxHeight: 0,
      lastWatered: null,
      waterCount: 0,
    },
    ...LOCAL,
  })
}

export async function recordMaxHeight(id: string, height: number): Promise<Plant | null> {
  const plantId = parsePlantId(id)
  if (!plantId) return null
  if (!Number.isFinite(height) || height <= 0) return null

  const capped = Math.min(height, MAX_HEIGHT_CM)
  const payload = await getPayload({ config: configPromise })

  let existing: Plant
  try {
    existing = await payload.findByID({
      collection: 'plants',
      id: plantId,
      ...LOCAL,
    })
  } catch {
    return null
  }

  if (capped <= (existing.maxHeight || 0)) return existing

  return payload.update({
    collection: 'plants',
    id: plantId,
    data: { maxHeight: capped },
    ...LOCAL,
  })
}

export async function getPlantStats() {
  const payload = await getPayload({ config: configPromise })

  const maxRecordQuery = await payload.find({
    collection: 'plants',
    sort: '-maxHeight',
    limit: 1,
    ...LOCAL,
  })

  const maxUserHeight = maxRecordQuery.docs[0]?.maxHeight || 0

  const allPlants = await payload.find({
    collection: 'plants',
    limit: 1000,
    select: {
      maxHeight: true,
    },
    ...LOCAL,
  })

  const totalHeight = allPlants.docs.reduce((sum, doc) => sum + (doc.maxHeight || 0), 0)

  return {
    totalHeight,
    maxUserHeight,
  }
}
