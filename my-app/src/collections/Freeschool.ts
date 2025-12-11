import { GlobalConfig } from 'payload'

export const Freeschool: GlobalConfig = {
  slug: 'freeschool',
  label: 'フリースクール',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '概要',
          fields: [
            {
              name: 'summary',
              label: 'Summary Section',
              type: 'group',
              fields: [
                {
                  name: 'visualImage',
                  label: '全景画像 (Visual Image)',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'schoolName',
                  label: '学校名',
                  type: 'text',
                  defaultValue: '森の子がっこう いっぽ',
                },
                {
                  name: 'introTitle',
                  label: '導入タイトル',
                  type: 'text',
                  defaultValue: 'ここからはじまる一歩',
                },
                {
                  name: 'description',
                  label: '説明文',
                  type: 'textarea',
                },
                {
                  name: 'importantPointsTitle',
                  label: 'ポイントタイトル',
                  type: 'text',
                  defaultValue: '大切にしたいこと',
                },
                {
                  name: 'importantPoints',
                  label: '大切にしたいことリスト',
                  type: 'array',
                  fields: [{ name: 'text', label: 'テキスト', type: 'text' }],
                },
                {
                  name: 'dialogueLeft',
                  label: '左吹き出しテキスト',
                  type: 'textarea',
                  defaultValue:
                    '廃校となった旧神戸（かんど）小学校を利用した鳥取のフリースクールになります。',
                },
                {
                  name: 'dialogueRight',
                  label: '右吹き出しテキスト',
                  type: 'textarea',
                  defaultValue: '詳しくは下のボタンをタップしてお問い合わせください。',
                },
              ],
            },
          ],
        },
        {
          label: 'ヒーロー',
          fields: [
            {
              name: 'hero',
              label: 'Hero Section',
              type: 'group',
              fields: [
                { name: 'catchphrase', label: 'キャッチコピー', type: 'text' },
                { name: 'subcopy', label: 'サブコピー', type: 'text' },
                { name: 'mainImage', label: 'メイン画像', type: 'upload', relationTo: 'media' },
                {
                  name: 'decorativeImages',
                  label: '装飾用画像',
                  type: 'array',
                  fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
                },
              ],
            },
          ],
        },
        {
          label: '私たちについて',
          fields: [
            {
              name: 'about',
              label: 'About Section',
              type: 'group',
              fields: [
                { name: 'title', label: 'タイトル', type: 'text' },
                { name: 'body', label: '本文', type: 'richText' },
                {
                  name: 'images',
                  label: '関連画像',
                  type: 'array',
                  fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
                },
                {
                  name: 'benefits',
                  label: '認定・メリット (Check Boxes)',
                  type: 'array',
                  fields: [
                    { name: 'text', label: 'テキスト', type: 'text' },
                    {
                      name: 'color',
                      label: '色',
                      type: 'select',
                      options: [
                        { label: 'Pink', value: 'bg-pink' },
                        { label: 'Blue', value: 'bg-blue' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'メッセージ',
          fields: [
            {
              name: 'message',
              label: 'Message Section',
              type: 'group',
              fields: [
                { name: 'title', label: 'タイトル', type: 'text' },
                { name: 'body', label: '本文', type: 'richText' },
                { name: 'image', label: '代表写真', type: 'upload', relationTo: 'media' },
                { name: 'repName', label: '代表者名', type: 'text' },
                { name: 'repRole', label: '代表肩書き', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'メリット・認定',
          fields: [
            {
              name: 'merits',
              label: 'Merits Section',
              type: 'group',
              fields: [
                {
                  name: 'certificationTitle',
                  label: '認定フリースクールになると (タイトル)',
                  type: 'text',
                  defaultValue: '認定フリースクールになると',
                },
                {
                  name: 'certificationItems',
                  label: '認定メリットリスト',
                  type: 'array',
                  fields: [
                    { name: 'title', label: 'タイトル', type: 'text' },
                    { name: 'description', label: '説明', type: 'textarea' },
                  ],
                },
                {
                  name: 'attendingTitle',
                  label: 'いっぽへ通うと？ (タイトル)',
                  type: 'text',
                  defaultValue: 'いっぽへ通うと？',
                },
                {
                  name: 'attendingBody',
                  label: 'いっぽへ通うと？ (本文)',
                  type: 'richText',
                },
              ],
            },
          ],
        },
        {
          label: 'サポート体制',
          fields: [
            {
              name: 'support',
              label: 'Support Section',
              type: 'group',
              fields: [
                {
                  name: 'learningSupportTitle',
                  label: '学習サポートについて (タイトル)',
                  type: 'text',
                  defaultValue: '学習サポートについて',
                },
                {
                  name: 'learningSupportBody',
                  label: '学習サポートについて (本文)',
                  type: 'richText',
                },
                {
                  name: 'schoolRelationsTitle',
                  label: '所属の学校について (タイトル)',
                  type: 'text',
                  defaultValue: '所属の学校について',
                },
                {
                  name: 'schoolRelationsBody',
                  label: '所属の学校について (本文)',
                  type: 'richText',
                },
              ],
            },
          ],
        },
        {
          label: '特徴',
          fields: [
            {
              name: 'features',
              label: 'Features (特徴)',
              type: 'array',
              fields: [
                { name: 'title', label: 'タイトル', type: 'text' },
                { name: 'description', label: '説明文', type: 'textarea' },
                { name: 'image', label: '画像', type: 'upload', relationTo: 'media' },
                {
                  name: 'backgroundColor',
                  label: '背景色',
                  type: 'select',
                  options: [
                    { label: 'Lime', value: 'bg-lime' },
                    { label: 'Yellow', value: 'bg-yellow' },
                    { label: 'Blue', value: 'bg-blue' },
                    { label: 'Pink', value: 'bg-pink' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: '1日の流れ',
          fields: [
            {
              name: 'flow',
              label: 'Flow (流れ)',
              type: 'array',
              fields: [
                { name: 'stepNumber', label: 'ステップ番号 (例: 01)', type: 'text' },
                { name: 'title', label: 'タイトル', type: 'text' },
                { name: 'description', label: '説明', type: 'textarea' },
                { name: 'image', label: 'イメージ画像', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
        {
          label: 'スケジュール',
          fields: [
            {
              name: 'schedule',
              label: 'Schedule Section',
              type: 'group',
              fields: [
                {
                  name: 'image',
                  label: 'スケジュール画像 (メイン)',
                  type: 'upload',
                  relationTo: 'media',
                },
                { name: 'body', label: '説明 (リッチテキスト)', type: 'richText' },
                {
                  name: 'scheduleItems',
                  label: 'スケジュール詳細 (黒板アイテム)',
                  type: 'array',
                  fields: [
                    { name: 'time', label: '時間 (例: 10:00)', type: 'text' },
                    { name: 'label', label: '内容 (例: 朝の会)', type: 'text' },
                    { name: 'image', label: '画像', type: 'upload', relationTo: 'media' },
                    { name: 'icon', label: 'アイコン (画像がない場合)', type: 'text' },
                    {
                      name: 'rotation',
                      label: '傾き',
                      type: 'select',
                      options: [
                        { label: '右傾き (大)', value: 'rotate-2' },
                        { label: '右傾き (小)', value: 'rotate-1' },
                        { label: '左傾き (大)', value: '-rotate-2' },
                        { label: '左傾き (小)', value: '-rotate-1' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: '料金',
          fields: [
            {
              name: 'price',
              label: 'Price (料金)',
              type: 'group',
              fields: [
                {
                  name: 'plans',
                  label: '料金プラン',
                  type: 'array',
                  fields: [
                    { name: 'planName', label: 'プラン名', type: 'text' },
                    { name: 'price', label: '価格 (例: ¥29,000)', type: 'text' },
                    { name: 'note', label: '補足 (例: /月)', type: 'text' },
                    {
                      name: 'subtitle',
                      label: 'サブタイトル (例: 実質負担...の部分)',
                      type: 'text',
                      defaultValue: '実質負担',
                    },
                    {
                      name: 'features',
                      label: '特徴リスト',
                      type: 'array',
                      fields: [{ name: 'text', label: '特徴テキスト', type: 'text' }],
                    },
                    {
                      name: 'themeColor',
                      label: 'テーマカラー',
                      type: 'select',
                      options: [
                        { label: 'Blue', value: 'blue' },
                        { label: 'Pink', value: 'pink' },
                      ],
                    },
                  ],
                },
                {
                  name: 'annotation',
                  label: '注釈テキスト',
                  type: 'richText',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
