import { GlobalConfig } from 'payload'

export const Banner: GlobalConfig = {
  slug: 'banner',
  label: 'バナー',
  access: {
    read: () => true,
  },
  admin: {
    group: '更新コンテンツ',
  },
  fields: [
    {
      name: 'scrollingBanners',
      label: 'スクロールバナー（上部）',
      type: 'array',
      fields: [
        {
          name: 'image',
          label: '画像',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'link',
          label: 'リンク先URL',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'bigBanners',
      label: 'ビッグバナー（下部）',
      type: 'array',
      fields: [
        {
          name: 'image',
          label: '画像',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'link',
          label: 'リンク先URL',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
