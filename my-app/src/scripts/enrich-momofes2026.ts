/**
 * 2026 桃フェスの告知チラシから、既存の出店一覧の前後に
 * 集客用コンテンツとアクセス案内を追加する。
 *
 * 実行:
 *   npx tsx src/scripts/enrich-momofes2026.ts
 */
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const assetsDir = path.resolve(process.cwd(), '.tmp-momofes-landing')
const marker = 'momofes2026-landing-intro'

function uid(): string {
  return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

function textNode(text: string) {
  return {
    mode: 'normal',
    text,
    type: 'text',
    style: '',
    detail: 0,
    format: 0,
    version: 1,
  }
}

function paragraph(text: string) {
  return {
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    children: text ? [textNode(text)] : [],
    direction: null,
    textStyle: '',
    textFormat: 0,
  }
}

function heading(text: string, tag: 'h2' | 'h3' = 'h2') {
  return {
    tag,
    type: 'heading',
    format: '',
    indent: 0,
    version: 1,
    children: [textNode(text)],
    direction: null,
  }
}

function richTextDoc(children: unknown[]) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children,
      direction: null,
    },
  }
}

function column(title: string, description: string) {
  return {
    id: uid(),
    content: richTextDoc([heading(title, 'h3'), paragraph(description)]),
  }
}

function columns(items: Array<[string, string]>, blockName = '') {
  const count = items.length
  const layout = count <= 1 ? '1' : count === 2 ? '1/2_1/2' : count === 4 ? '1/4_1/4_1/4_1/4' : '1/3_1/3_1/3'
  return {
    type: 'block',
    version: 2,
    format: '',
    fields: {
      id: uid(),
      blockName,
      blockType: 'flexibleColumns',
      layout,
      columns: items.map(([title, description]) => column(title, description)),
    },
  }
}

function callout(
  type: 'info' | 'warning' | 'success',
  icon: string,
  content: string,
  blockName = '',
) {
  return {
    type: 'block',
    version: 2,
    format: '',
    fields: {
      id: uid(),
      blockName,
      blockType: 'callout',
      type,
      icon,
      content: richTextDoc([paragraph(content)]),
    },
  }
}

function quote(text: string, source?: string) {
  return {
    type: 'block',
    version: 2,
    format: '',
    fields: {
      id: uid(),
      blockName: '',
      blockType: 'quote',
      text,
      source: source || '',
      url: '',
    },
  }
}

function cta(label: string, url: string) {
  return {
    type: 'block',
    version: 2,
    format: '',
    fields: {
      id: uid(),
      blockName: '',
      blockType: 'cta',
      label,
      url,
      style: 'primary',
    },
  }
}

function upload(mediaId: number | string) {
  return {
    id: uid(),
    type: 'upload',
    value: mediaId,
    fields: null,
    format: '',
    version: 3,
    relationTo: 'media',
  }
}

async function getOrCreateMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filename: string,
  alt: string,
) {
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  if (existing.docs[0]) return existing.docs[0]

  const filePath = path.join(assetsDir, filename)
  const data = fs.readFileSync(filePath)
  return payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data,
      mimetype: 'image/webp',
      name: filename,
      size: data.length,
    },
  })
}

async function main() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'column',
    where: { slug: { equals: 'momofes2026' } },
    depth: 0,
    draft: true,
    limit: 1,
  })
  const article = result.docs[0] as any
  if (!article) throw new Error('momofes2026 が見つかりません。')

  const existingChildren = article.content?.root?.children || []
  const alreadyEnriched = existingChildren.some(
    (node: any) => node?.fields?.blockName === marker,
  )
  if (alreadyEnriched) {
    console.log('集客コンテンツはすでに追加済みです。')
    process.exit(0)
  }

  const flyer = await getOrCreateMedia(
    payload,
    'momofes2026-flyer.webp',
    '第3回 桃フェス 2026 イベント案内',
  )
  const access = await getOrCreateMedia(
    payload,
    'momofes2026-access.webp',
    '第3回 桃フェス 2026 駐車場・アクセス案内',
  )

  const before = [
    heading('桃を楽しみ、鳥取の未来につなぐ一日', 'h2'),
    paragraph(
      '県内唯一の桃の産地・鳥取市神戸地区を舞台に、「第3回 桃フェス」を開催します。桃を使ったフードやスイーツ、子どもから大人まで楽しめる体験、ステージ企画が集まる夏のイベントです。',
    ),
    callout(
      'success',
      '🍑',
      '2026年8月11日（火・祝）10:00〜15:00開催。入場無料・雨天決行（一部内容を変更する場合があります）。',
      marker,
    ),
    columns([
      ['📅 開催日時', '2026年8月11日（火・祝）10:00〜15:00'],
      ['📍 会場', 'トリノス神戸（旧神戸小学校）鳥取市中砂見936'],
      ['🎫 入場料', '入場無料。ご家族やお友だちと気軽にお越しください。'],
    ]),
    heading('桃フェスで楽しめること', 'h2'),
    columns([
      [
        'Food',
        '桃とカスタードのホイップクレープ、桃ゼリーのかき氷パフェ、桃サイダー、桃パフェなど、桃を楽しむメニューが登場。焼きそば、たこ焼き、唐揚げなどのお祭りグルメも充実します。',
      ],
      [
        'Activity',
        '桃太郎のように強くなろう！水鉄砲大会、モモトリ鬼ごっこ、SDGsコーナー、BIGコリントゲーム、子ども店長コーナー、くじ引きや射的など、遊びと学びがいっぱいです。',
      ],
      [
        'Performance',
        'SDGsクイズ、森のようちえんちびっこセンター、オーサミーデイズなどのステージ企画に加え、「桃の種飛ばし大会」も開催します。',
      ],
    ]),
    heading('今年の注目企画', 'h2'),
    columns([
      [
        '桃星人 vs 地球人 水鉄砲大会',
        '13:00〜13:30に開催予定。水鉄砲の貸し出しもあります。夏ならではのびしょ濡れ企画を楽しもう！',
      ],
      [
        '桃が当たるガラポン抽選会',
        '桃スタンプラリーに参加して、桃が当たるガラポン抽選会にチャレンジできます。',
      ],
      [
        'ドレスコードは桃色',
        '服や靴、帽子、バッグ、アクセサリーなど、ワンポイントでもOK。桃色アイテムを身につけた方にはプレゼントをご用意しています（数量限定）。',
      ],
    ]),
    callout(
      'info',
      '🌱',
      '「桃が捨てられている。なんとかできないか。」——収穫期に出る「くず桃」を活用し、鳥取の桃の魅力と食品ロス削減を楽しく伝えることから始まったお祭りです。旧神戸小学校と地域の恵みを活用し、学びと交流が生まれる一日を目指します。',
    ),
    heading('出店場所・ブース情報', 'h2'),
    paragraph(
      'フード、ワークショップ、遊びのブースが校庭・校舎・体育館に並びます。会場マップと各出店者の内容は以下をご覧ください。',
    ),
  ]

  const after = [
    heading('アクセス・駐車場のご案内', 'h2'),
    paragraph(
      '会場はトリノス神戸（旧神戸小学校）です。江山学園ではありませんので、ナビを利用する際は目的地にご注意ください。',
    ),
    columns([
      ['① トリノス神戸グラウンド', '約100台。会場に最も近い駐車場です。'],
      [
        '② 旧江山中学校グラウンド',
        '約150台。鳥取県鳥取市倭文65番地。住所検索で異なる場所が表示される場合は「大和体育館」と検索してください。',
      ],
      [
        '③ 大和体育館駐車場',
        '約30台の臨時駐車場（11:00〜）。鳥取県鳥取市倭文121-2。',
      ],
    ]),
    callout(
      'success',
      '🚌',
      '旧江山中学校グラウンドから会場まで、無料シャトルバスをおよそ15分間隔で運行します。今年は昨年より増便予定です。',
    ),
    upload(access.id),
    heading('ご来場前にご確認ください', 'h2'),
    callout(
      'warning',
      '⚠️',
      '今年は桃フェス会場での桃そのものの販売はありません。雨天決行ですが、天候などにより一部内容を変更する場合があります。',
    ),
    paragraph(
      '水鉄砲大会など濡れる企画に参加される方は、着替えやタオルをご用意ください。会場や駐車場ではスタッフの案内にご協力をお願いします。',
    ),
    heading('鳥取の桃を、楽しく次の世代へ', 'h2'),
    quote(
      '鳥取県産・神戸地区の桃をもっと多くの人に知ってもらい、後世に残したい。おいしい、楽しい、学びがある桃フェスで、夏の思い出をつくりませんか。',
      '桃フェス実行委員会',
    ),
    cta(
      '会場をGoogleマップで確認',
      'https://www.google.com/maps/search/?api=1&query=%E9%B3%A5%E5%8F%96%E5%B8%82%E4%B8%AD%E7%A0%82%E8%A6%8B936',
    ),
  ]

  await payload.update({
    collection: 'column',
    id: article.id,
    draft: true,
    depth: 0,
    data: {
      title: '第3回 桃フェス 2026｜鳥取の桃を楽しむ夏祭り',
      category: 'event',
      image: flyer.id,
      tags: [
        { tag: '桃フェス' },
        { tag: 'イベント' },
        { tag: '鳥取' },
        { tag: 'フードロス' },
      ],
      content: richTextDoc([...before, ...existingChildren, ...after]),
      _status: 'draft',
    } as any,
  })

  console.log(`更新完了: column=${article.id}, flyer=${flyer.id}, access=${access.id}`)
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
