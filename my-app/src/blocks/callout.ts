import { Block } from 'payload';

export const Callout: Block = {
  slug: 'callout',
  labels: {
    singular: 'コールアウト',
    plural: 'コールアウト',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'タイプ',
      options: [
        { label: '情報 (Info)', value: 'info' },
        { label: '警告 (Warning)', value: 'warning' },
        { label: '成功 (Success)', value: 'success' },
      ],
      defaultValue: 'info',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
      label: 'アイコン (絵文字など)',
      defaultValue: '💡',
    },
    {
      name: 'content',
      type: 'richText',
      label: '内容',
      required: true,
    },
  ],
};
