import { Block } from 'payload';

export const FlexibleColumns: Block = {
  slug: 'flexibleColumns',
  labels: {
    singular: '柔軟な段組み',
    plural: '柔軟な段組み',
  },
  fields: [
    {
      name: 'layout',
      type: 'select',
      label: 'レイアウトタイプ',
      options: [
        { label: '2カラム (1:1)', value: '1/2_1/2' },
        { label: '3カラム (1:1:1)', value: '1/3_1/3_1/3' },
        { label: '4カラム (1:1:1:1)', value: '1/4_1/4_1/4_1/4' },
      ],
      defaultValue: '1/2_1/2',
      required: true,
    },
    {
      name: 'columns',
      type: 'array',
      label: 'カラム内容',
      minRows: 2,
      maxRows: 4,
      fields: [
        {
          name: 'content',
          type: 'richText',
          label: '内容',
        },
      ],
    },
  ],
};
