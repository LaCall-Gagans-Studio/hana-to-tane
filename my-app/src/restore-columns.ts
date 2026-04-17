import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import fs from 'fs'
import path from 'path'

// Simple CSV parser for quoted CSV
function parseCSV(csvText: string) {
  const lines = []
  let currentLine = []
  let currentField = ''
  let inQuotes = false

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i]
    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < csvText.length && csvText[i + 1] === '"') {
          currentField += '"'
          i++ // skip next quote
        } else {
          inQuotes = false
        }
      } else {
        currentField += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === ',') {
        currentLine.push(currentField)
        currentField = ''
      } else if (char === '\n' || char === '\r') {
        currentLine.push(currentField)
        lines.push(currentLine)
        currentLine = []
        currentField = ''
        if (char === '\r' && i + 1 < csvText.length && csvText[i + 1] === '\n') {
          i++ // skip newline
        }
      } else {
        currentField += char
      }
    }
  }
  if (currentField !== '' || currentLine.length > 0) {
    currentLine.push(currentField)
    lines.push(currentLine)
  }
  
  const headers = lines[0]
  return lines.slice(1).filter(l => l.length > 1).map(line => {
    const obj: any = {}
    headers.forEach((header, i) => {
      obj[header] = line[i]
    })
    return obj
  })
}

async function restore() {
  const payload = await getPayload({ config: configPromise })
  const csvPath = path.resolve(process.cwd(), 'public/column.csv')
  const csvData = fs.readFileSync(csvPath, 'utf-8')
  
  const records = parseCSV(csvData)

  for (const record of records) {
    console.log(`Restoring ${record.title}...`)
    
    let content
    try {
      if (record.content) {
        content = JSON.parse(record.content)
      }
    } catch(e) {
      console.warn('Failed to parse content JSON for', record.title)
    }

    const payloadData: any = {
      title: record.title,
      slug: record.slug,
      publishedDate: record.published_date ? new Date(record.published_date).toISOString() : new Date().toISOString(),
      category: record.category,
      content: content,
      _status: 'published', // Publish as drafts feature was enabled
    }
    
    if (record.image_id) payloadData.image = Number(record.image_id)
    if (record.target_event_id) payloadData.targetEvent = Number(record.target_event_id)

    if (record.reservation_settings_enabled === 'true') {
      payloadData.reservationSettings = {
        enabled: true,
        capacity: record.reservation_settings_capacity ? Number(record.reservation_settings_capacity) : undefined,
        deadline: record.reservation_settings_deadline ? new Date(record.reservation_settings_deadline).toISOString() : undefined,
      }
    } else {
      payloadData.reservationSettings = {
        enabled: false,
      }
    }

    try {
      const existing = await payload.find({
        collection: 'column',
        where: { slug: { equals: record.slug } },
      })

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'column',
          id: existing.docs[0].id,
          data: payloadData,
        })
        console.log(`Updated: ${record.title}`)
      } else {
        await payload.create({
          collection: 'column',
          data: payloadData,
        })
        console.log(`Created: ${record.title}`)
      }
    } catch (e: any) {
      console.error(`Error: ${record.title}`, e.message)
    }
  }
  
  console.log('Restoration complete.')
  process.exit(0)
}

restore()
