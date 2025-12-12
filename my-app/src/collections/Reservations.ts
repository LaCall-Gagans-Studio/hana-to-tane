import { CollectionConfig } from 'payload'

export const Reservations: CollectionConfig = {
  slug: 'reservations',
  labels: {
    singular: 'イベント予約',
    plural: 'イベント予約',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'column', 'email', 'createdAt'],
    group: '設定',
  },
  access: {
    create: () => true, // 誰でも予約作成可能
    read: () => true, // 管理者のみにすべきだが、デモのため一旦開放。本来は ({ req: { user } }) => !!user
    update: () => true, // 管理者のみ
    delete: () => true, // 管理者のみ
  },
  fields: [
    {
      name: 'column',
      label: '対象コラム',
      type: 'relationship',
      relationTo: 'column',
      required: true,
      index: true,
    },
    {
      name: 'name',
      label: 'お名前',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'メールアドレス',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      label: '電話番号',
      type: 'text',
      required: true,
    },
    {
      name: 'responses',
      label: 'カスタム質問への回答',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          label: '質問内容',
        },
        {
          name: 'answer',
          type: 'text',
          label: '回答',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, operation }) => {
        if (operation === 'create') {
          console.log(
            `[Email Placeholder] Sending confirmation to ${doc.email} for reservation ${doc.id}`,
          )
          // ここに実際のメール送信ロジックを実装予定
        }
      },
    ],
  },
}
