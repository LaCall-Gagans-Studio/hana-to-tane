import { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Us (Global)',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'intro_message',
      label: 'イントロダクション（メッセージ）',
      type: 'richText',
    },
    {
      name: 'mission',
      label: 'ミッションステートメント',
      type: 'richText',
    },
    {
      name: 'history_years',
      label: '活動年数',
      type: 'number',
      defaultValue: 10,
    },
    {
      name: 'free_school_desc',
      label: 'フリースクール説明',
      type: 'textarea',
    },
    {
      name: 'play_park_desc',
      label: 'プレーパーク説明',
      type: 'textarea',
    },
    {
      name: 'concept',
      label: 'コンセプト',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'タイトル',
          type: 'text',
          defaultValue: 'はなとたねってどんなところ？',
        },
        {
          name: 'subtitle',
          label: 'サブタイトル',
          type: 'text',
          defaultValue: '子どもも大人も心地よく居られる場所',
        },
        {
          name: 'description_1',
          label: '説明文1 (左側)',
          type: 'textarea',
          defaultValue: 'やりたいことがなんでもできる場所。\nそれが「はなとたね」です。',
        },
        {
          name: 'description_2',
          label: '説明文2 (右側)',
          type: 'textarea',
          defaultValue: '子どもだけじゃなく、大人も楽しめる場所。\nそんな居場所を作っていきます。',
        },
        {
          name: 'activities',
          label: '活動キーワード',
          type: 'array',
          fields: [
            {
              name: 'text',
              label: 'テキスト',
              type: 'text',
            },
            {
              name: 'color',
              label: '色',
              type: 'select',
              options: [
                { label: 'ライム', value: 'bg-lime' },
                { label: 'イエロー', value: 'bg-yellow' },
                { label: 'ブルー', value: 'bg-blue' },
                { label: 'ピンク', value: 'bg-pink' },
                { label: 'パープル', value: 'bg-purple' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'overview',
      label: '団体概要',
      type: 'group',
      fields: [
        {
          name: 'org_name',
          label: '団体名',
          type: 'text',
        },
        {
          name: 'address',
          label: '所在地',
          type: 'text',
        },
        {
          name: 'contact_info',
          label: '連絡先',
          type: 'richText',
        },
        {
          name: 'business_content',
          label: '事業内容',
          type: 'textarea',
        },
        {
          name: 'representative',
          label: '代表者名',
          type: 'text',
        },
        {
          name: 'board_members',
          label: '役員名',
          type: 'text',
        },
        {
          name: 'establishment_date',
          label: '設立年月',
          type: 'text',
        },
      ],
    },
  ],
}
