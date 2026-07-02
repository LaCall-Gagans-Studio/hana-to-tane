import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    group: '更新コンテンツ',
    description:
      '※ 今後追加する画像は WebP（.webp）形式のみアップロードしてください。JPEG・PNG などは受け付けません。',
  },
  labels: {
    singular: 'メディア',
    plural: 'メディア',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    mimeTypes: ['image/webp'],
  },
  hooks: {
    beforeOperation: [
      ({ operation, req }) => {
        if (operation === 'create' && req.file && req.file.mimetype !== 'image/webp') {
          throw new Error(
            '画像は WebP（.webp）形式のみアップロードできます。他の形式で保存する場合は、事前に WebP へ変換してください。',
          )
        }
      },
    ],
  },
}
