import { Block } from 'payload';

export const Quote: Block = {
  slug: 'quote',
  labels: {
    singular: '引用',
    plural: '引用',
  },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      label: '引用テキスト',
      required: true,
    },
    {
      name: 'source',
      type: 'text',
      label: '出典 (任意)',
    },
    {
      name: 'url',
      type: 'text',
      label: '出典URL (任意)',
    },
  ],
};
