import { Block } from 'payload';

export const CTA: Block = {
  slug: 'cta',
  labels: {
    singular: 'CTAボタン',
    plural: 'CTAボタン',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'ボタンのテキスト',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'リンク先URL',
    },
    {
      name: 'style',
      type: 'select',
      options: [
        { label: 'プライマリ（ピンク）', value: 'primary' },
        { label: 'セカンダリ（ライム）', value: 'secondary' },
        { label: 'ブルー', value: 'blue' },
      ],
      defaultValue: 'primary',
      label: 'ボタンスタイル',
    },
  ],
};
