import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'ニュース',
    plural: 'ニュース',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['publishedDate', 'title', 'category'],
    group: '更新コンテンツ',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'タイトル',
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      label: '公開日',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'カテゴリ',
      options: [
        { label: 'イベント', value: 'EVENT' },
        { label: 'お知らせ', value: 'INFO' },
        { label: 'レポート', value: 'REPORT' },
        { label: 'その他', value: 'OTHER' },
      ],
    },
    {
      name: 'link',
      type: 'text',
      label: 'リンクURL',
      admin: {
        description:
          '詳細ページや外部サイトのURLを入力してください。設定時はクリックで遷移します。',
      },
    },
  ],
}
