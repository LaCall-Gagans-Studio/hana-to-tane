import { CollectionConfig } from 'payload'
import nodemailer from 'nodemailer'

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
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          try {
            // Get column details
            const columnId = typeof doc.column === 'object' ? doc.column.id : doc.column
            let columnName = '不明なイベント'
            if (columnId) {
              const columnDoc = await req.payload.findByID({
                collection: 'column',
                id: columnId,
              })
              if (columnDoc) {
                columnName = columnDoc.title || '（タイトルなし）'
              }
            }

            const transporter = nodemailer.createTransport({
              host: process.env.SMTP_HOST,
              port: Number(process.env.SMTP_PORT) || 465,
              secure: Number(process.env.SMTP_PORT) === 465,
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
              },
            })

            const responsesText =
              doc.responses && doc.responses.length > 0
                ? doc.responses
                    .map((r: { question: string; answer: string }) => `Q: ${r.question}\nA: ${r.answer}`)
                    .join('\n\n')
                : 'なし'

            const userMailOptions = {
              from: `"NPO法人はなとたね" <${process.env.SMTP_USER}>`,
              to: doc.email,
              subject: '【NPO法人はなとたね】イベントのご予約を受け付けました',
              text: `${doc.name} 様\n\nこの度はイベントにご予約いただき、誠にありがとうございます。\n以下の内容でご予約を受け付けました。\n\n【ご予約イベント】: ${columnName}\n【お名前】: ${doc.name}\n【メールアドレス】: ${doc.email}\n【電話番号】: ${doc.phone}\n【ご質問等（ある場合）】:\n${responsesText}\n\n後ほど担当者より詳細をご連絡させていただきます。\n今しばらくお待ちくださいますようお願い申し上げます。\n\n--------------------------------------------------\nこのメールは送信専用アドレスから自動送信されています。`,
            }

            const adminMailOptions = {
              from: `"${doc.name}様より" <${process.env.SMTP_USER}>`,
              to: process.env.CONTACT_EMAIL_TO,
              subject: `【イベント予約】新規のご予約がありました`,
              text: `イベントの新規ご予約フォームから送信がありました。\n\n【ご予約イベント】: ${columnName}\n【お名前】: ${doc.name}\n【メールアドレス】: ${doc.email}\n【電話番号】: ${doc.phone}\n【ご質問等】：\n${responsesText}`,
            }

            console.log(`[Email] Sending confirmation to ${doc.email} for reservation ${doc.id}`)
            await Promise.all([
              transporter.sendMail(userMailOptions),
              transporter.sendMail(adminMailOptions),
            ])
            console.log('[Email] 予約完了メールと通知メールの送信が完了しました。')
          } catch (error) {
            console.error('[Email Error] 予約完了メールの送信に失敗しました:', error)
          }
        }
      },
    ],
  },
}
