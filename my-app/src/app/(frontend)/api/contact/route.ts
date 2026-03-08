import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const {
      parentName,
      email,
      phone,
      childName,
      childFurigana,
      grade,
      consultationDate,
      method,
      memo,
    } = data

    // Nodemailerトランスポーターの作成
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465, // 465の場合はtrue, 587等はfalse
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // 管理者向け通知メールの内容
    const adminMailOptions = {
      from: `"${parentName}様より" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL_TO,
      subject: '【森の子がっこういっぽ】新規相談予約がありました',
      text: `
ウェブサイトの相談予約フォームから新しいお問い合わせがありました。

【保護者様のお名前】: ${parentName}
【メールアドレス】: ${email}
【電話番号】: ${phone}
【お子様のお名前】: ${childName} (${childFurigana})
【学年】: ${getGradeText(grade)}
【ご希望日時】: ${consultationDate}
【ご相談方法】: ${method}

【備考・ご質問内容】:
${memo}
      `,
    }

    // ユーザー向け自動返信メールの内容
    const userMailOptions = {
      from: `"森の子がっこういっぽ" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '【森の子がっこういっぽ】お問い合わせありがとうございます',
      text: `
${parentName} 様

この度は「フリースクール森の子がっこういっぽ」へお問い合わせいただき、誠にありがとうございます。
以下の内容でご相談の予約・お問い合わせを受け付けました。

内容を確認の上、担当者より折り返しご連絡させていただきます。
今しばらくお待ちくださいますようお願い申し上げます。

※土曜日・日曜日・月曜日・祝日はお休みのため、休業日にいただいたご連絡への返信は翌営業日以降となります。

--------------------------------------------------
【保護者様のお名前】: ${parentName}
【メールアドレス】: ${email}
【電話番号】: ${phone}
【お子様のお名前】: ${childName} (${childFurigana})
【学年】: ${getGradeText(grade)}
【ご希望日時】: ${consultationDate}
【ご相談方法】: ${method}

【備考・ご質問内容】:
${memo}
--------------------------------------------------

このメールは送信専用アドレスから自動送信されています。
お心当たりのない場合や、ご不明な点がございましたらお知らせください。
      `,
    }

    // 両方のメールを送信
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Mail Send Error:', error)
    return NextResponse.json({ error: 'メールの送信に失敗しました。' }, { status: 500 })
  }
}

// 学年の値を表示用のテキストに変換するヘルパー関数
function getGradeText(grade: string) {
  const gradeMap: Record<string, string> = {
    preschool: '未就学児',
    e1: '小学1年生',
    e2: '小学2年生',
    e3: '小学3年生',
    e4: '小学4年生',
    e5: '小学5年生',
    e6: '小学6年生',
    j1: '中学1年生',
    j2: '中学2年生',
    j3: '中学3年生',
    other: 'その他',
  }
  return gradeMap[grade] || grade
}
