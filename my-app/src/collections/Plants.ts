import type { CollectionConfig } from 'payload'

export const Plants: CollectionConfig = {
  slug: 'plants',
  labels: {
    singular: 'はなたねシステム',
    plural: 'はなたねシステム',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: () => false,
  },
  admin: {
    useAsTitle: 'dna',
    defaultColumns: [
      'dna',
      'transferId',
      'type',
      'state',
      'growthProgress',
      'streak',
      'hueShift',
      'maxHeight',
      'lastWatered',
      'waterCount',
    ],
    group: '設定',
  },
  fields: [
    {
      name: 'dna',
      type: 'number',
      required: true,
    },
    {
      name: 'transferId',
      type: 'text',
      unique: true,
      index: true,
      required: true, // Required for new flow logic
    },
    {
      name: 'type',
      type: 'text',
      required: true,
    },
    {
      name: 'state',
      type: 'text',
      required: true,
    },
    {
      name: 'growthProgress',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'streak',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'hueShift',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'maxHeight',
      type: 'number',
      defaultValue: 0,
      index: true, // For statistics
    },
    {
      name: 'lastWatered',
      type: 'date',
    },
    {
      name: 'waterCount',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
