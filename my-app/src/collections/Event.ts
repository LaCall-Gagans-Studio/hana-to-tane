import { CollectionConfig } from 'payload'

export const Event: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'イベント',
    plural: 'イベント',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'type'],
    group: '更新コンテンツ',
  },
  fields: [
    {
      name: 'title',
      label: 'イベント名',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      label: 'イベント種別',
      type: 'select',
      options: [
        { label: 'イベント', value: 'event' },
        { label: 'フリースクール', value: 'free_school' },
        { label: 'その他', value: 'other' },
      ],
      defaultValue: 'event',
      required: true,
    },
    {
      name: 'date',
      label: '開始日時',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      label: '終了日時',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'isAllDay',
      label: '終日',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'recurringDays',
      label: '繰り返し曜日 (フリースクール開所日など)',
      type: 'select',
      hasMany: true,
      options: [
        { label: '日曜日', value: 'sun' },
        { label: '月曜日', value: 'mon' },
        { label: '火曜日', value: 'tue' },
        { label: '水曜日', value: 'wed' },
        { label: '木曜日', value: 'thu' },
        { label: '金曜日', value: 'fri' },
        { label: '土曜日', value: 'sat' },
      ],
    },
    {
      name: 'link',
      label: 'リンクURL',
      type: 'text',
    },
    {
      name: 'isHighlight',
      label: '強調表示',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'content',
      label: '詳細内容',
      type: 'richText',
    },
  ],
}
