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
  ],
}
