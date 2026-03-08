import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, type, message } = data

    // Nodemailerトランスポーターの作成
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: true,
      logger: true,
    })

    // お問い合わせ種別の変換ヘルパー
    const getTypeLabel = (t: string) => {
      const types: Record<string, string> = {
        support: '賛助会員・寄付について',
        recruit: '採用・スタッフ募集について',
        other: 'その他のお問い合わせ',
      }
      return types[t] || t
    }

    // 管理者向け通知メールの内容
    const adminMailOptions = {
      from: `"${name}様より" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL_TO,
      subject: `【総合お問い合わせ】${getTypeLabel(type)}`,
      text: `
ウェブサイトの総合お問い合わせフォームからメッセージがありました。

【お名前】: ${name}
【メールアドレス】: ${email}
【お問い合わせ種別】: ${getTypeLabel(type)}

【お問い合わせ内容】:
${message}
      `,
    }

    // ユーザー向け自動返信メールの内容
    const userMailOptions = {
      from: `"NPO法人はなとたね" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '【NPO法人はなとたね】お問い合わせありがとうございます',
      text: `
${name} 様

この度は「NPO法人はなとたね」へお問い合わせいただき、誠にありがとうございます。
以下の内容でお問い合わせを受け付けました。

内容を確認の上、担当者より折り返しご連絡させていただきます。
今しばらくお待ちくださいますようお願い申し上げます。

--------------------------------------------------
【お名前】: ${name}
【メールアドレス】: ${email}
【お問い合わせ種別】: ${getTypeLabel(type)}

【お問い合わせ内容】:
${message}
--------------------------------------------------

このメールは送信専用アドレスから自動送信されています。
お心当たりのない場合や、ご不明な点がございましたらお知らせください。
      `,
    }

    console.log('[General Contact API] 送信処理を開始します...')
    const [adminInfo, userInfo] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ])

    console.log('[General Contact API] 送信成功:')
    console.log(' - 管理者宛 MessageId:', adminInfo.messageId)
    console.log(' - ユーザー宛 MessageId:', userInfo.messageId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[General Contact API] 送信エラー詳細:', error)
    return NextResponse.json({ error: 'メールの送信に失敗しました。' }, { status: 500 })
  }
}
