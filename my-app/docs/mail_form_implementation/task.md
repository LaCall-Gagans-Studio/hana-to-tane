# メール送信機能実装タスクリスト

- [x] Nodemailerパッケージのインストール
- [x] `.env` ファイルへのお名前.com SMTPサーバー情報の環境変数追加（ダミーパスワード設定）
- [x] Next.js API Route (`src/app/api/contact/route.ts`) の作成
  - Nodemailerを用いた送信処理の実装
  - 管理者宛の通知メールテンプレート作成
  - 自動返信メール（控え）テンプレート作成
- [x] フロントエンドのフォーム (`consultation-form.tsx`) の修正
  - モック処理から実際のAPI呼び出しへの変更
  - エラーハンドリングとローディング状態の適切な管理
- [x] 動作確認とWalkthroughドキュメントの作成
