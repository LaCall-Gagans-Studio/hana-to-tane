import React from 'react'
import './styles.css'
import { Header } from './header'
import { Footer } from './footer'
import { FixedContactMenu } from './FixedContactMenu'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | はなとたね',
    default: 'はなとたね公式サイト｜鳥取市のフリースクール＆プレーパーク',
  },
  description:
    'はなとたねは2023年に設立、現在は鳥取市内にフリースクール「森の子がっこういっぽ」の運営をしています。鳥取にプレーパークを作るべく、活動しています。',
  metadataBase: new URL('https://hana-to-tane.vercel.app'), // 仮のURL、本番環境に合わせて変更してください
  keywords: [
    'はなとたね',
    'フリースクール',
    '森の子がっこういっぽ',
    'プレーパーク',
    '鳥取',
    '不登校',
    '子育て',
    '自然体験',
  ],
  authors: [{ name: 'NPO法人はなとたね' }],
  openGraph: {
    title: 'はなとたね公式サイト｜鳥取市のフリースクール＆プレーパーク',
    description:
      'はなとたねは2023年に設立、現在は鳥取市内にフリースクール「森の子がっこういっぽ」の運営をしています。鳥取にプレーパークを作るべく、活動しています。',
    url: 'https://hana-to-tane.vercel.app',
    siteName: 'はなとたね',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'はなとたね公式サイト｜鳥取市のフリースクール＆プレーパーク',
    description:
      'はなとたねは2023年に設立、現在は鳥取市内にフリースクール「森の子がっこういっぽ」の運営をしています。鳥取にプレーパークを作るべく、活動しています。',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FixedContactMenu />
      </body>
    </html>
  )
}
