import React from 'react'
import './styles.css'
import { Header } from './header'
import { Footer } from './footer'
import { FixedContactMenu } from './FixedContactMenu'

export const metadata = {
  description:
    'はなとたねは2023年に設立、現在は鳥取市内にフリースクール「森の子がっこういっぽ」の運営をしています。鳥取にプレーパークを作るべく、活動しています。',
  title: 'はなとたね公式サイト｜鳥取市のフリースクール＆プレーパーク',
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
