# Implementation Plan - SEO Metadata

This plan outlines the steps to implement comprehensive SEO metadata for the "Hana to Tane" application, including a professional base configuration and dynamic metadata for specific pages.

## User Review Required

> [!NOTE]
> I have inferred keywords and descriptions from `フリースクール.md`. Please review the generated metadata text in `src/app/(frontend)/layout.tsx` to ensure it aligns with your brand voice.

## Proposed Changes

### Global Metadata

#### [MODIFY] [layout.tsx](<file:///c:/Users/Tohma/Dev/hana-to-tane/my-app/src/app/(frontend)/layout.tsx>)

- Refactor `metadata` export to use the full Next.js Metadata API.
- Add `metadataBase` (using a placeholder or environment variable if available, otherwise `https://hana-to-tane.jp` or similar based on context, or just omit if not strictly needed but recommended). I will use a placeholder `https://example.com` or similar if I can't find the real domain, but I'll check `configPromise` or other files. Actually, I see `https://chibicen.net/` in `フリースクール.md`, but that's for "Chibikko Center". "Hana to Tane" might be different. I'll stick to a safe default or relative paths where possible, but `metadataBase` needs a URL.
- Add `openGraph` and `twitter` configurations.
- Add `keywords` and `authors`.

### Page-Specific Metadata

#### [MODIFY] [news/page.tsx](<file:///c:/Users/Tohma/Dev/hana-to-tane/my-app/src/app/(frontend)/news/page.tsx>)

- Export `generateMetadata` function.
- Set title to "NEWS & TOPICS".
- Set description to "はなとたねからの最新情報...".

#### [MODIFY] [gallery/page.tsx](<file:///c:/Users/Tohma/Dev/hana-to-tane/my-app/src/app/(frontend)/gallery/page.tsx>)

- Export `generateMetadata` function.
- Set title to "はなたねギャラリー".
- Set description to "子供たちの笑顔や、四季折々の活動風景...".

#### [MODIFY] [freeschool/page.tsx](<file:///c:/Users/Tohma/Dev/hana-to-tane/my-app/src/app/(frontend)/freeschool/page.tsx>)

- Export `generateMetadata` function.
- Fetch `freeschool` global data to use dynamic title/description if available, or static fallback.

#### [MODIFY] [column/page.tsx](<file:///c:/Users/Tohma/Dev/hana-to-tane/my-app/src/app/(frontend)/column/page.tsx>)

- Export `generateMetadata` function.
- Use `searchParams` to assume a title based on category/tag if possible, or just "はなとたね図書館".

#### [MODIFY] [event/page.tsx](<file:///c:/Users/Tohma/Dev/hana-to-tane/my-app/src/app/(frontend)/event/page.tsx>)

- Export `generateMetadata` function.
- Set title to "イベントカレンダー".

## Verification Plan

### Automated Tests

- Run `npm run build` (or `pnpm run build`) to ensure no type errors in `generateMetadata` functions.
- There are no E2E tests for metadata specifically, so I will rely on build validation and code review.

### Manual Verification

- Since I cannot open the browser to inspect `<head>` tags on the live site, I will rely on the code structure and type safety.
