import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'

export const News = async () => {
  const payload = await getPayload({ config: configPromise })
  const newsData = await payload.find({
    collection: 'news',
    limit: 3,
    sort: '-publishedDate',
  })

  // Fetch Banner data (Global)
  const bannerData = await payload.findGlobal({
    slug: 'banner',
  })

  // scrollingBanners: 上部の無限スクロールバナー
  const scrollingBanners = bannerData.scrollingBanners || []
  // bigBanners: 下部の大きいバナー
  const bigBanners = bannerData.bigBanners || []

  return (
    <section id="news" className="bg-surface relative overflow-hidden pb-12 md:pb-24">
      {/* Infinite Scroll Banner */}
      <div className="w-full overflow-hidden bg-white border-border mb-12 md:mb-24 py-4">
        {/* Infinite Scroll Banner */}
        <div className="w-full overflow-hidden bg-white border-border mb-12 md:mb-24 py-4">
          {/* 修正1: w-[200%] を w-max に変更し、中身に合わせて幅が伸びるようにする */}
          <div className="flex animate-infinite-scroll w-max">
            {/* First set of images */}
            {/* 修正2: w-1/2 justify-around を削除し、shrink-0 (縮小禁止) を追加 */}
            <div className="flex shrink-0 items-center gap-4 px-4">
              {scrollingBanners.length > 0 ? (
                scrollingBanners.map((banner: any, i: number) => (
                  <div
                    key={i}
                    // 修正3: w-full を w-[70vw] (スマホで画面の7割) md:w-96 (PCで固定幅) に変更
                    className="aspect-video w-[70vw] md:w-96 rounded-xl border-3 border-border shadow-hard flex items-center justify-center overflow-hidden bg-gray-100 relative"
                  >
                    {banner.image && typeof banner.image === 'object' && banner.image.url ? (
                      <Link
                        href={banner.link || '#'}
                        className="block w-full h-full relative group"
                      >
                        <Image
                          src={banner.image.url}
                          alt={banner.image.alt || `Banner ${i + 1}`}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </Link>
                    ) : (
                      <span className="font-black text-gray-300 text-xl">NO IMAGE</span>
                    )}
                  </div>
                ))
              ) : (
                <div className="w-[100vw] h-full flex items-center justify-center text-gray-400">
                  Banner Not Set
                </div>
              )}
            </div>

            {/* Duplicate set for seamless loop */}
            {/* 修正4: こちらも同様に shrink-0 を適用 */}
            <div className="flex shrink-0 items-center gap-4 px-4">
              {scrollingBanners.length > 0 &&
                scrollingBanners.map((banner: any, i: number) => (
                  <div
                    key={`dup-${i}`}
                    // 修正5: サイズ指定を上と合わせる
                    className="aspect-video w-[70vw] md:w-96 rounded-xl border-3 border-border shadow-hard flex items-center justify-center overflow-hidden bg-gray-100 relative"
                  >
                    {banner.image && typeof banner.image === 'object' && banner.image.url ? (
                      <Link
                        href={banner.link || '#'}
                        className="block w-full h-full relative group"
                      >
                        <Image
                          src={banner.image.url}
                          alt={banner.image.alt || `Banner ${i + 1}`}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </Link>
                    ) : (
                      <span className="font-black text-gray-300 text-xl">NO IMAGE</span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-2/3 lg:w-1/2 mx-auto mt-8 justify-around gap-4 px-4">
          {bigBanners.map((banner: any, i: number) => (
            <div
              key={i}
              className="aspect-video w-full rounded-xl border-3 border-border shadow-hard flex items-center justify-center overflow-hidden bg-gray-100 relative"
            >
              {banner.image && typeof banner.image === 'object' && banner.image.url ? (
                <Link href={banner.link || '#'} className="block w-full h-full relative group">
                  <Image
                    src={banner.image.url}
                    alt={banner.image.alt || `Big Banner ${i + 1}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </Link>
              ) : (
                <span className="font-black text-gray-300 text-xl">NO IMAGE</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a349a3_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="inline-block text-3xl md:text-5xl font-black text-text bg-yellow px-8 py-2 border-3 border-border shadow-hard transform hover:scale-105 transition-transform">
            NEWS & TOPICS
          </h2>
        </div>
        <div className="flex flex-col gap-6 max-w-[800px] mx-auto">
          {newsData.docs.length === 0 ? (
            <p className="text-center font-bold text-gray-500">ニュースはまだありません。</p>
          ) : (
            newsData.docs.map((item, index) => (
              <div
                key={index}
                className={`group relative bg-surface border-3 border-border rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-hard-lg flex flex-col md:flex-row items-start md:items-center gap-4`}
              >
                {/* Ticket holes effect */}
                <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-surface border-r-3 border-border rounded-full"></div>
                <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-surface border-l-3 border-border rounded-full"></div>

                <div className="flex items-center gap-4 w-full md:w-auto min-w-[200px]">
                  <span className="text-lg font-black text-text border-b-4 border-lime">
                    {new Date(item.publishedDate).toLocaleDateString('ja-JP')}
                  </span>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-black border-2 border-text shadow-sm ${
                      item.category === 'EVENT'
                        ? 'bg-pink text-text'
                        : item.category === 'REPORT'
                          ? 'bg-green text-white'
                          : 'bg-blue text-text'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                {item.link ? (
                  <a
                    href={item.link}
                    className="flex-1 flex items-center gap-4 group-hover:text-purple transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="font-bold text-lg line-clamp-1 flex-1">{item.title}</span>
                    <span className="hidden md:block text-2xl font-black text-lime group-hover:translate-x-2 transition-transform">
                      &rarr;
                    </span>
                  </a>
                ) : (
                  <>
                    <span className="font-bold text-lg flex-1 group-hover:text-purple transition-colors line-clamp-1">
                      {item.title}
                    </span>
                    <span className="hidden md:block text-2xl font-black text-lime group-hover:translate-x-2 transition-transform opacity-30">
                      &rarr;
                    </span>
                  </>
                )}
              </div>
            ))
          )}
        </div>
        <div className="text-center mt-16">
          <Link
            href="/news"
            className="inline-block px-10 py-4 bg-blue text-text border-3 border-border rounded-full font-black text-xl uppercase tracking-widest shadow-hard transition-all hover:-translate-y-1 hover:shadow-hard-lg active:translate-y-1 active:shadow-none"
          >
            VIEW ALL NEWS
          </Link>
        </div>
      </div>
    </section>
  )
}
