# Payload CMS リッチテキストカスタムブロック実装計画

Payload側のLexicalエディタに `cta`, `accordion`, `customTable` の3つのカスタムブロック（BlocksFeature）を追加し、フロントエンド（コラム記事詳細）でそれらを描画する仕組みを実装します。

## Proposed Changes

### Payload CMS スキーマ定義
Payload側に3つのカスタムブロックを追加し、`Column.ts`の本文エディタ設定に組み込みます。

#### [NEW] [cta.ts](file:///c:/Users/Tohma/Dev/hana-to-tane/my-app/src/blocks/cta.ts)
CTA（コールトゥアクション）ボタン用のブロックスキーマ定義ファイルを作成します。

#### [NEW] [accordion.ts](file:///c:/Users/Tohma/Dev/hana-to-tane/my-app/src/blocks/accordion.ts)
アコーディオン（FAQ）用のブロックスキーマ定義ファイルを作成します。

#### [NEW] [table.ts](file:///c:/Users/Tohma/Dev/hana-to-tane/my-app/src/blocks/table.ts)
カスタムテーブル用のブロックスキーマ定義ファイルを作成します。

#### [MODIFY] [Column.ts](file:///c:/Users/Tohma/Dev/hana-to-tane/my-app/src/collections/Column.ts)
`content`フィールドに`lexicalEditor`を用いた`BlocksFeature`を適用し、上記3つのブロックを使用可能にします。

---

### フロントエンド描画コンポーネント
Payloadから受け取るJSONデータから各カスタムブロックを描画するためのReactコンポーネントを作成し、既存のページに組み込みます。

#### [NEW] [RichTextBlocks.tsx](file:///c:/Users/Tohma/Dev/hana-to-tane/my-app/src/components/Blocks/RichTextBlocks.tsx)
CTA, Accordion, CustomTableのそれぞれを描画するReactコンポーネント（Tailwind CSSでスタイリング済）をまとめて定義したファイルを作成します。

#### [MODIFY] [page.tsx](file:///c:/Users/Tohma/Dev/hana-to-tane/my-app/src/app/%28frontend%29/column/%5Bslug%5D/page.tsx)
140行目付近の `<RichText data={column.content} />` に対して `converters` を渡し、カスタムブロックを描画できるように変更します。

## Open Questions

> [!IMPORTANT]
> - ブロックの見た目（デザイン）はTailwindを使って既存のテーマカラー（`bg-lime`/`text-text`/`border-border` 等ポップなデザイン）をベースに適宜作成しますが、よろしいでしょうか？
> - 今回はまず `Column` コレクションの本文に適用します。`Freeschool.ts` や `Event.ts` など他のコレクションでもリッチテキストを使用している場合、そちらへの適用も希望されますか？（まずはColumnで実装し、後で横展開することも可能です）

## Verification Plan

### Manual Verification
1. Payloadの管理画面（Admin）にてコラム記事の本文フィールドで`/`を入力するか、ブロック追加メニューから「CTAボタン」「アコーディオン」「カスタムテーブル」の追加が可能であることを確認。
2. フロントエンドの個別記事ページにアクセスし、追加したブロックがTailwindのデザインが適用された状態で表示されることを確認。
