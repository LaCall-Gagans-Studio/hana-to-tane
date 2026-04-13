import { Block } from 'payload';

export const Table: Block = {
  slug: 'customTable',
  labels: {
    singular: 'カスタムテーブル',
    plural: 'カスタムテーブル',
  },
  fields: [
    {
      name: 'rows',
      type: 'array',
      label: '行データ',
      minRows: 1,
      fields: [
        {
          name: 'columns',
          type: 'array',
          label: '列データ',
          minRows: 1,
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
