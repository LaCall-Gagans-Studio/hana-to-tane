import type { CollectionConfig } from 'payload'

export const Column: CollectionConfig = {
  slug: 'column',
  labels: {
    singular: 'コラム',
    plural: 'コラム',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', 'updatedAt'],
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
      name: 'slug',
      label: 'スラグ',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      label: '公開日',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      label: 'カテゴリー',
      type: 'select',
      options: [
        { label: 'フリースクール', value: 'free_school' },
        { label: 'イベント', value: 'event' },
        { label: 'その他', value: 'other' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      label: 'タグ',
      type: 'array',
      fields: [
        {
          name: 'tag',
          label: 'タグ名',
          type: 'text',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      label: 'メイン画像',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      label: '本文',
      type: 'richText',
    },
  ],
}
