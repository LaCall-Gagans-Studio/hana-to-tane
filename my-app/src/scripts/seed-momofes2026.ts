/**
 * momofes2026 コラムに PDF（出店案内チラシ）の内容を投入する
 *
 * 実行:
 *   npx tsx src/scripts/seed-momofes2026.ts
 */
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const tmpDir = path.resolve(__dirname, '../../.tmp-momofes')

type Vendor = { name: string; description: string }

type Section = {
  title: string
  vendors: Vendor[]
}

function uid(): string {
  return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

function textNode(text: string, format = 0) {
  return {
    mode: 'normal' as const,
    text,
    type: 'text' as const,
    style: '',
    detail: 0,
    format,
    version: 1,
  }
}

function paragraph(text: string) {
  return {
    type: 'paragraph' as const,
    format: '' as const,
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
    type: 'heading' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    children: [textNode(text)],
    direction: null,
  }
}

function richTextDoc(children: unknown[]) {
  return {
    root: {
      type: 'root' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      children,
      direction: null,
    },
  }
}

function vendorColumn(vendor: Vendor) {
  const children = [
    heading(vendor.name, 'h3'),
    paragraph(vendor.description || '（詳細は当日会場にてご確認ください）'),
  ]
  return {
    id: uid(),
    content: richTextDoc(children),
  }
}

function layoutForCount(count: number): '1' | '1/2_1/2' | '1/3_1/3_1/3' {
  if (count <= 1) return '1'
  if (count === 2) return '1/2_1/2'
  return '1/3_1/3_1/3'
}

function flexibleColumnsBlock(vendors: Vendor[]) {
  return {
    type: 'block' as const,
    version: 2,
    format: '',
    fields: {
      id: uid(),
      blockName: '',
      blockType: 'flexibleColumns',
      layout: layoutForCount(vendors.length),
      columns: vendors.map(vendorColumn),
    },
  }
}

/** Chunk vendors into rows of 3 — each row becomes one FlexibleColumns block */
function vendorRows(vendors: Vendor[]) {
  const blocks = []
  for (let i = 0; i < vendors.length; i += 3) {
    blocks.push(flexibleColumnsBlock(vendors.slice(i, i + 3)))
  }
  return blocks
}

const sections: Section[] = [
  {
    title: 'FOOD 〜校庭〜',
    vendors: [
      {
        name: '①よしくん🍑',
        description:
          '飲食　ひるぜん焼きそば、スパイラルポテト、牛串、パリパリ鶏皮串、フルーツ飴',
      },
      {
        name: '②ナナナミルク🍑',
        description: 'バナナジュース、旬のフルーツジュース、ソフトクリーム等',
      },
      {
        name: '③モリノコカフェ🍑',
        description:
          'キッチンカーにてスイーツ、軽食等の販売。桃とカスタードホイップのクレープ、桃のふわふわかき氷、桃の豆花、他スイーツ',
      },
      {
        name: '④やまと家🍑',
        description: 'たこ焼き串、ロングフランクフルト、焼き鳥、桃ジュース🍑',
      },
      {
        name: '⑤をこめ屋とニアマイ🍑',
        description: '冷たいドリンク、ベーグル、ベーグルサンド、米粉たい焼き、桃シロップドリンク',
      },
      {
        name: '⑥M-STYLE研究所（焼いも まこちゃん）🍑',
        description: '冷やし焼いも、かき氷、のむもん、焼いもスイーツ',
      },
      {
        name: '⑦小谷屋',
        description: '肉巻きフランク、焼き鳥',
      },
      {
        name: '⑧⑨かずや',
        description: 'フライドポテト、フルーツ飴',
      },
      {
        name: '⑩⑪多幸福🍑',
        description:
          'たこやき、かき氷、ソフトドリンク、チョコバナナ、冷凍パイン、冷凍ピーチ、フランクフルト、チキン串、肉巻きおにぎり、うどん',
      },
      {
        name: '⑫まるた🍑',
        description:
          'ロングポテト、チーズスティック、レインボーチーズドッグ、アイス、コットンキャンディー、マシュマロ、かき氷、ドリンク類',
      },
      {
        name: '⑬だんだんカフェ🍑',
        description:
          '桃パフェ、ソフトクリーム、揚げパン、ドーナツ、炭酸ドリンク、チュロス、アイスパフェ、アイスチュロス、アイスチャイ',
      },
      {
        name: '⑭⑮ボブズ🍑',
        description: 'りんご飴・桃飴・金魚鉢サイダー',
      },
      {
        name: '⑯こここめキッチン🍑',
        description: '生どらやき、どらパフェ、ドリンク',
      },
      {
        name: '⑰⑱ラパン・ブラン🍑',
        description: '焼きそば・唐揚げ・ハンバーガー・スムージー・メロンパン',
      },
      {
        name: '⑲焼きそば',
        description: '鳥取で一番美味い焼きそば！！',
      },
    ],
  },
  {
    title: 'FOOD 〜体育館前〜',
    vendors: [
      {
        name: '⑳ゆるりと。🍑',
        description: '桃のかき氷、たこ焼き、ベーコン串',
      },
      {
        name: 'A. 発酵Cafe桜堂🍑',
        description:
          '日本の国菌「糀」を使った料理、スイーツ、ドリンクを展開。発酵事業コンサルタントとして、企業とコラボ商品企画、カフェのメニュー開発をしております。',
      },
      {
        name: 'B. マンマミーア🍑',
        description: 'ジェラート、ドリンク',
      },
    ],
  },
  {
    title: 'FOOD 〜1F〜',
    vendors: [
      {
        name: '㉑クラーク記念国際高等学校 鳥取キャンパス🍑',
        description: 'クラーク高校のカフェ部が、桃を使ったデザートを販売します！',
      },
      {
        name: '㉒コージーズキッチン',
        description: '子供も食べれるキーマカレー',
      },
      {
        name: '㉓ファーマーズ🍑',
        description: '',
      },
      {
        name: '㉔よっちゃん🍑',
        description:
          'キラキラすくい、かき氷、ジュース、フランクフルト、桃フルーツカット、冷やしうどん、くじ、スーパーボール、ヨーヨー、ペットボトルジュース、お茶',
      },
      {
        name: '㉕アジアンキッチンとりどり🍑',
        description: '神戸桃と桃ゼリーのかき氷パフェとガパオライス',
      },
    ],
  },
  {
    title: 'ACTIVITY 〜2F〜',
    vendors: [
      {
        name: '㉖川村屋🍑',
        description: 'くじ引きと桃サイダー',
      },
      {
        name: '㉗虫の展示',
        description: '',
      },
      {
        name: '㉘かごのお店',
        description: '雑貨、ハギレのブレスレットのワークショップ',
      },
      {
        name: '㉚こども店長プロジェクト',
        description: '',
      },
    ],
  },
  {
    title: 'ACTIVITY 〜3F〜',
    vendors: [
      {
        name: '㉛〜㉞いろことり（ちびっこセンター）',
        description: 'ちぎって、貼って、ペタペタして、桃星人うちわをつくろう！',
      },
      {
        name: '㊵かけルリTOMORUと遊ぼう！',
        description:
          'いろんな先生と来店の方と🍑をかけあわせるとどんな遊びができるかな？お楽しみに♡',
      },
      {
        name: '㊶トリセフ',
        description: '',
      },
      {
        name: '㊷大阪海さくら',
        description: '海洋プラスチックを使って体験ブース',
      },
    ],
  },
  {
    title: 'ACTIVITY 〜体育館〜',
    vendors: [
      {
        name: '㊺桃の木フリマ',
        description: 'フリーマーケットおよびビッグコリントゲーム',
      },
      {
        name: '㊻河上屋',
        description: '射的',
      },
      {
        name: '㊼レインボーD 沢山の景品🍑',
        description: 'くじ引き、射的、おもちゃ販売',
      },
      {
        name: '㊽フランクいっぽ🍑',
        description: 'フランクフルト＆桃コーラー＆Tシャツとレジン＆プラバン＆毛糸雑貨',
      },
    ],
  },
]

function buildContent(mapMediaId: number | string) {
  const children: unknown[] = [
    heading('第3回桃フェス 出店案内', 'h2'),
    paragraph(
      'チラシより出店場所マップと各ブース情報を掲載しています。各ブースの写真は準備でき次第追加予定です。',
    ),
    heading('出店場所マップ', 'h2'),
    {
      id: uid(),
      type: 'upload',
      value: mapMediaId,
      fields: null,
      format: '',
      version: 3,
      relationTo: 'media',
    },
    paragraph(''),
  ]

  for (const section of sections) {
    children.push(heading(section.title, 'h2'))
    children.push(...vendorRows(section.vendors))
    children.push(paragraph(''))
  }

  return richTextDoc(children)
}

async function main() {
  const webpPath = path.join(tmpDir, 'page-1.webp')
  if (!fs.existsSync(webpPath)) {
    throw new Error(`Missing ${webpPath}. Convert page 1 to WebP first.`)
  }

  const payload = await getPayload({ config: configPromise })

  console.log('Uploading map image...')
  const fileBuffer = fs.readFileSync(webpPath)
  const media = await payload.create({
    collection: 'media',
    data: {
      alt: '第3回桃フェス 出店場所マップ',
    },
    file: {
      data: fileBuffer,
      mimetype: 'image/webp',
      name: 'momofes2026-map.webp',
      size: fileBuffer.length,
    },
  })
  console.log('Media created:', media.id, (media as { url?: string }).url)

  const content = buildContent(media.id)

  console.log('Updating column momofes2026...')
  const updated: any = await payload.update({
    collection: 'column',
    id: 12,
    draft: true,
    data: {
      title: '第3回桃フェス 出店案内',
      slug: 'momofes2026',
      category: 'event',
      image: media.id,
      tags: [{ tag: '桃フェス' }, { tag: '出店' }],
      content: content as any,
      _status: 'draft',
    },
  } as any)

  console.log('Updated column:', updated.id, updated.slug, updated.title)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
