import { Block } from 'payload';

export const Table: Block = {
  slug: 'customTable',
  labels: {
    singular: 'カスタムテーブル',
    plural: 'カスタムテーブル',
  },
  admin: {
    group: 'レイアウト',
    components: {
      Block: '@/components/admin/blocks/TablePreview#TableBlockComponent',
      Label: '@/components/admin/blocks/TablePreview#TableBlockLabel',
    },
    images: {
      icon: { url: '/admin/block-icons/table.svg', alt: 'カスタムテーブル' },
      thumbnail: { url: '/admin/block-icons/table-thumb.svg', alt: 'カスタムテーブル' },
    },
  },
  fields: [
    {
      name: 'rows',
      type: 'array',
      label: '行データ',
      minRows: 1,
      labels: {
        singular: '行',
        plural: '行',
      },
      fields: [
        {
          name: 'columns',
          type: 'array',
          label: '列データ',
          minRows: 1,
          labels: {
            singular: '列',
            plural: '列',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'セルの内容',
            },
            {
              name: 'isHeader',
              type: 'checkbox',
              label: 'ヘッダーセル (th) にする',
              defaultValue: false,
            }
          ],
        },
      ],
    },
  ],
};
