import { CollectionConfig } from 'payload'

export const Member: CollectionConfig = {
  slug: 'members',
  labels: {
    singular: 'メンバー',
    plural: 'メンバー',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'role'],
    group: 'サイトコンテンツ',
  },
  fields: [
    {
      name: 'type',
      label: 'メンバータイプ',
      type: 'select',
      options: [
        { label: 'スタッフ', value: 'staff' },
        { label: 'ちびっこセンター', value: 'chibikko' },
        { label: 'コラボレーター', value: 'collaborator' },
      ],
      defaultValue: 'staff',
      required: true,
    },
    {
      name: 'collaborationType',
      label: '関わり (コラボレーター用)',
      type: 'textarea',
      admin: {
        condition: (data) => data.type === 'collaborator',
      },
    },
    {
      name: 'isRepresentative',
      label: '大きく表示（スタッフ用）',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: (data) => data.type === 'staff',
      },
    },
    {
      name: 'name',
      label: '名前',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: '役職・肩書き',
      type: 'text',
    },
    {
      name: 'description',
      label: '短い紹介文',
      type: 'textarea',
    },
    {
      name: 'fullDescription',
      label: '詳細紹介文 ',
      type: 'textarea',
    },
    {
      name: 'favoriteWords',
      label: '好きな言葉',
      type: 'text',
    },
    {
      name: 'hobbies',
      label: '趣味',
      type: 'text',
    },
    {
      name: 'qualifications',
      label: '保有する資格',
      type: 'array',
      fields: [
        {
          name: 'name',
          label: '資格名',
          type: 'text',
        },
      ],
    },
    {
      name: 'pastQualifications',
      label: '過去に取得した資格',
      type: 'array',
      fields: [
        {
          name: 'name',
          label: '資格名',
          type: 'text',
        },
      ],
    },
    {
      name: 'links',
      label: 'リンク (SNS等)',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'ラベル',
          type: 'text',
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
        },
      ],
    },
    {
      name: 'image',
      label: 'プロフィール画像',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'color',
      label: 'テーマカラー',
      type: 'select',
      options: [
        { label: 'ピンク', value: 'bg-pink' },
        { label: 'ブルー', value: 'bg-blue' },
        { label: 'イエロー', value: 'bg-yellow' },
        { label: 'ライム', value: 'bg-lime' },
        { label: 'グリーン', value: 'bg-green' },
      ],
      defaultValue: 'bg-blue',
    },
  ],
}
