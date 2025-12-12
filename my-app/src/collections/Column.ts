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
    {
      name: 'targetEvent',
      label: '対象イベント (カレンダー連携)',
      type: 'relationship',
      relationTo: 'events',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'reservationSettings',
      label: '予約設定',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          label: '予約を受け付ける',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'capacity',
          label: '定員 (人)',
          type: 'number',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'deadline',
          label: '締め切り日時',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'customFields',
          label: '追加質問項目',
          type: 'array',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
          fields: [
            {
              name: 'label',
              label: '質問文',
              type: 'text',
              required: true,
            },
            {
              name: 'type',
              label: '入力タイプ',
              type: 'select',
              options: [
                { label: '1行テキスト', value: 'text' },
                { label: '複数行テキスト', value: 'textarea' },
                { label: 'ラジオボタン (はい/いいえ等)', value: 'radio' },
              ],
              defaultValue: 'text',
            },
            {
              name: 'options',
              label: '選択肢 (ラジオボタンの場合のみ)',
              type: 'array',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'radio',
              },
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  label: '選択肢のラベル',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
