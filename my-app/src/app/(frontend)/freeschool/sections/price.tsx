import React from 'react'

export const Price = () => {
  return (
    <section className="py-24 bg-lime relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_3px,transparent_3px)] bg-size-[20px_20px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white mb-2 drop-shadow-[4px_4px_0px_var(--color-border)]">
            PRICE
          </h2>
          <p className="font-bold text-white/80">ご利用料金</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Plan 1 */}
          <div className="bg-white rounded-3xl border-3 border-border shadow-hard-lg p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform">
            <div className="absolute top-0 left-0 w-full h-4 bg-blue"></div>
            <h3 className="text-2xl font-black text-center mb-6 border-b-2 border-dashed border-gray-300 pb-4">
              水木金コース
            </h3>
            <div className="text-center mb-6">
              <p className="text-5xl font-black text-text mb-2">
                ¥29,000<span className="text-lg font-bold text-gray-500">/月</span>
              </p>
              <p className="inline-block bg-blue/10 text-blue px-4 py-1 rounded-full font-bold text-sm">
                実質負担: ¥9,600〜
              </p>
            </div>
            <ul className="space-y-3 bg-gray-50 p-6 rounded-xl border-2 border-border/10">
              <li className="flex items-center gap-3 font-bold text-gray-600">
                <span className="text-blue">✓</span> 送迎代込み
              </li>
              <li className="flex items-center gap-3 font-bold text-gray-600">
                <span className="text-blue">✓</span> 週3回利用
              </li>
            </ul>
          </div>

          {/* Plan 2 */}
          <div className="bg-white rounded-3xl border-3 border-border shadow-hard-lg p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform">
            <div className="absolute top-0 left-0 w-full h-4 bg-pink"></div>
            <h3 className="text-2xl font-black text-center mb-6 border-b-2 border-dashed border-gray-300 pb-4">
              月5回コース
            </h3>
            <div className="text-center mb-6">
              <p className="text-5xl font-black text-text mb-2">
                ¥22,000<span className="text-lg font-bold text-gray-500">/月</span>
              </p>
              <p className="inline-block bg-pink/10 text-pink px-4 py-1 rounded-full font-bold text-sm">
                実質負担: ¥7,500〜
              </p>
            </div>
            <ul className="space-y-3 bg-gray-50 p-6 rounded-xl border-2 border-border/10">
              <li className="flex items-center gap-3 font-bold text-gray-600">
                <span className="text-pink">✓</span> 送迎代込み
              </li>
              <li className="flex items-center gap-3 font-bold text-gray-600">
                <span className="text-pink">✓</span> 月5回まで利用可
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-block bg-white px-8 py-4 rounded-xl border-3 border-border shadow-hard transform rotate-1">
            <p className="font-bold text-gray-700">
              <span className="text-red-500">※</span> 入会金: ¥10,000 / 保険料: ¥800(年額) / 体験:
              無料
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
