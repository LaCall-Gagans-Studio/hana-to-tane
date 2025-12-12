import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Column } from '@/payload-types'

type Props = {
  posts: Column[]
}

export const Reports = ({ posts }: Props) => {
  return (
    <section id="reports" className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className=" px-4 py-1 bg-green text-white font-black text-sm rounded-full mb-4 shadow-sm border-2 border-border">
            ACTIVITY REPORT
          </span>
          <h2 className="text-4xl block md:text-5xl font-black text-text mb-4">活動の様子</h2>
          <p className="text-xl font-bold text-gray-600">日々の活動やイベントの記録</p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                href={`/column/${post.slug}`}
                key={post.id}
                className="group block bg-white border-3 border-border p-4 pb-6 shadow-hard transition-all hover:-translate-y-2 hover:shadow-hard-lg flex flex-col h-full rounded-xl"
              >
                {/* Image Area */}
                <div className="aspect-video w-full bg-gray-100 border-3 border-border mb-6 relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10"></div>
                  {post.image && typeof post.image !== 'number' && post.image.url ? (
                    <Image
                      src={post.image.url}
                      alt={post.image.alt || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300 bg-gray-50">
                      <span className="text-4xl">📷</span>
                    </div>
                  )}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full border-2 border-border font-black text-xs shadow-sm z-20 bg-white text-text">
                    REPORT
                  </span>
                </div>

                {/* Content Area */}
                <div className="px-2 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-2 h-2 rounded-full bg-green"></span>
                    <p className="text-sm font-bold text-gray-500">
                      {new Date(post.publishedDate).toLocaleDateString('ja-JP')}
                    </p>
                  </div>

                  <h3 className="text-xl font-black leading-snug mb-4 text-text group-hover:text-green transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <div className="flex justify-end mt-auto">
                    <span className="text-sm font-bold text-green border-b-2 border-transparent group-hover:border-green transition-all">
                      READ MORE &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/50 border-3 border-border rounded-xl">
            <p className="text-xl font-bold text-gray-500">まだレポートはありません。</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/column?category=free_school"
            className="inline-block px-8 py-3 bg-white text-text border-3 border-border rounded-full font-black hover:bg-green hover:text-white transition-all shadow-hard hover:shadow-none hover:translate-y-[2px]"
          >
            すべての記事を見る
          </Link>
        </div>
      </div>
    </section>
  )
}
