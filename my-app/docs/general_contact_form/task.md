# タスクリスト: 総合お問い合わせフォームのメール送信

- [x] 新規API Routeの作成 (`src/app/(frontend)/api/contact-general/route.ts`)
  - [x] POSTメソッドの実装
  - [x] `name`, `email`, `type`, `message` の受け取り処理
  - [x] Nodemailerによるメール送信処理（管理者宛＆ユーザー宛）とログ出力
- [x] フォームコンポーネントの修正 (`src/components/ContactForm.tsx`)
  - [x] モック処理の削除
  - [x] `fetch` によるAPI呼び出し処理の実装
  - [x] エラーハンドリングの追加
- [x] 動作確認とWalkthroughの作成
