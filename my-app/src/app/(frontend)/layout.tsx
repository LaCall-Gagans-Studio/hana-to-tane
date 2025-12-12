import React from 'react'
import './styles.css'
import { Header } from './header'
import { Footer } from './footer'
import { FixedContactMenu } from './FixedContactMenu'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
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
