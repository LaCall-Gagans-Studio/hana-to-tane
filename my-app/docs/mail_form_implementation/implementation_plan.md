# 実装計画: お問い合わせメール送信機能

## 概要

お名前.comのメールサーバー(`mail1015.onamae.ne.jp`)を利用して、フロントエンドの「新規相談予約フォーム」から実際にメールを送信できるように機能を構築します。

## 対象ファイルと変更内容

### 1. 環境変数 (`.env`)

以下のSMTP設定を追記します（パスワードはダミー）。

- `SMTP_HOST=mail1015.onamae.ne.jp`
- `SMTP_PORT=465`
- `SMTP_USER=info@hanatotane.com`
- `SMTP_PASS=ダミーパスワードを設定`
- `CONTACT_EMAIL_TO=info@hanatotane.com` (通知を受け取るアドレス)

### 2. バックエンド: API Route (新規作成)

#### [NEW] `src/app/api/contact/route.ts`

- `nodemailer`を使用して、SMTPサーバー経由でメールを送信するエンドポイントを作成します。
- 送信先は2箇所：
  1. サイト管理者宛（お問い合わせ内容の通知）
  2. フォーム入力者宛（自動返信・控え）

### 3. フロントエンド: フォーム部分 (修正)

#### [MODIFY] `src/app/(frontend)/freeschool/sections/consultation-form.tsx`

- 現在の `handleSubmit` 内にある `setTimeout` によるモック処理を削除。
- `fetch('/api/contact', { method: 'POST', ... })` を用いて、入力されたデータをバックエンドへ送信する処理に変更します。
- 送信成功時およびエラー発生時のUIハンドリングを追加します。

## 依存パッケージ

- `nodemailer`, `@types/nodemailer`
