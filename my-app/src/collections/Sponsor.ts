import { CollectionConfig } from 'payload'

export const Sponsor: CollectionConfig = {
  slug: 'sponsors',
  labels: {
    singular: 'スポンサー',
    plural: 'スポンサー',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    group: 'サイトコンテンツ',
  },
  fields: [
    {
      name: 'name',
      label: 'Organization Name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'url',
      label: 'Website URL',
      type: 'text',
    },
    {
      name: 'backgroundColor',
      label: '背景色',
      type: 'select',
      options: [
        { label: '白', value: 'bg-white' },
        { label: 'ピンク', value: 'bg-pink' },
        { label: 'ブルー', value: 'bg-blue' },
        { label: 'イエロー', value: 'bg-yellow' },
        { label: 'ライム', value: 'bg-lime' },
        { label: 'グリーン', value: 'bg-green' },
        { label: 'グレー', value: 'bg-gray-100' },
        { label: '黒', value: 'bg-black' },
      ],
      defaultValue: 'bg-white',
    },
  ],
}
