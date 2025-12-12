// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Plants } from './collections/Plants'
import { News } from './collections/News'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Column } from './collections/Column'
import { Member } from './collections/Member'
import { Sponsor } from './collections/Sponsor'
import { About } from './collections/About'
import { Freeschool } from './collections/Freeschool'
import { Event } from './collections/Event'

import { Gallery } from './collections/Gallery'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Media, Column, Member, Sponsor, Event, Gallery, Users, Plants, News],
  globals: [About, Freeschool],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      disableLocalStorage: true,
      collections: {
        media: true,
      },
      bucket: process.env.R2_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        // forcePathStyle: true, // 必要なら
      },
    }),
  ],
})
