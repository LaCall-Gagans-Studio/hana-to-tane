import { GlobalConfig } from 'payload'

export const SiteContent: GlobalConfig = {
  slug: 'siteContent',
  label: '各種リンク等',
  access: {
    read: () => true,
  },
  admin: {
    group: 'サイトコンテンツ',
  },
  fields: [
    {
      name: 'heroLargeLinks',
      label: 'Hero メインリンク',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'テキスト',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
        },
        {
          name: 'colorClass',
          label: '背景色（Tailwind クラス）',
          type: 'select',
          defaultValue: 'bg-[#cfed75]',
          options: [
            { label: 'ライム (bg-[#cfed75])', value: 'bg-[#cfed75]' },
            { label: 'イエロー (bg-yellow)', value: 'bg-yellow' },
            { label: 'ピンク (bg-pink)', value: 'bg-pink' },
            { label: 'ブルー (bg-blue)', value: 'bg-blue' },
          ],
        },
      ],
    },
    {
      name: 'heroSmallLinks',
      label: 'Hero サブリンク',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'テキスト',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
        },
        {
          name: 'hoverClass',
          label: 'ホバー色（Tailwind クラス）',
          type: 'select',
          defaultValue: 'hover:bg-blue',
          options: [
            { label: 'ブルー', value: 'hover:bg-blue' },
            { label: 'ピンク', value: 'hover:bg-pink' },
            { label: 'オレンジ', value: 'hover:bg-orange-400' },
            { label: 'イエロー', value: 'hover:bg-yellow' },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      label: 'SNSリンク',
      type: 'array',
      fields: [
        {
          name: 'platform',
          label: 'プラットフォーム',
          type: 'select',
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'X (Twitter)', value: 'x' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Other', value: 'other' },
          ],
          required: true,
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
