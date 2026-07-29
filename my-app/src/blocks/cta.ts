import { Block } from 'payload';

export const CTA: Block = {
  slug: 'cta',
  labels: {
    singular: 'CTAボタン',
    plural: 'CTAボタン',
  },
  admin: {
    group: 'コンテンツ',
    components: {
      Block: '@/components/admin/blocks/CtaPreview#CtaBlockComponent',
      Label: '@/components/admin/blocks/CtaPreview#CtaBlockLabel',
    },
    images: {
      icon: { url: '/admin/block-icons/cta.svg', alt: 'CTAボタン' },
      thumbnail: { url: '/admin/block-icons/cta-thumb.svg', alt: 'CTAボタン' },
    },
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
