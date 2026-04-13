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
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'タイトル (質問など)',
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
          label: '内容',
        },
      ],
    },
  ],
};
