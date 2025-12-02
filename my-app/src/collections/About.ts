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
