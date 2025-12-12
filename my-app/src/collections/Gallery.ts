import { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  labels: {
    singular: 'ギャラリー',
    plural: 'ギャラリー',
  },
  admin: {
    useAsTitle: 'title',
    group: '更新コンテンツ',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'タイトル',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      label: '画像',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'shotDate',
      label: '撮影日',
      type: 'date',
    },
    {
      name: 'description',
      label: '説明',
      type: 'textarea',
    },
  ],
}
