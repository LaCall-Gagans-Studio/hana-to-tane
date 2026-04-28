import { Block } from 'payload';

export const Accordion: Block = {
  slug: 'accordion',
  labels: {
    singular: 'アコーディオン (FAQ)',
    plural: 'アコーディオン (FAQ)',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      label: 'アコーディオン項目',
      minRows: 1,
      labels: {
        singular: 'アコーディオン項目',
        plural: 'アコーディオン項目',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'タイトル (質問など)',
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          label: '内容',
        },
      ],
    },
  ],
};
