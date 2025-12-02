import React from 'react'
import Link from 'next/link'

export const Support = () => {
  return (
    <section id="support" className="py-24 bg-surface relative overflow-hidden">
      {/* Background Pattern - Subtle dots */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a349a3_2px,transparent_2px)] bg-size-[30px_30px] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="inline-block text-5xl font-black text-text bg-surface px-8 py-2 border-3 border-border shadow-hard relative">
            SUPPORT
            <span className="absolute -top-4 -right-4 text-4xl animate-bounce-slow">🎁</span>
          </h2>
          <p className="mt-8 text-xl font-bold text-gray-600">
            あなたの支援が、子どもたちの未来をつくります。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Donation / Supporting Member - Gift Box Theme */}
          <div className="bg-white border-3 border-border rounded-3xl p-8 md:p-12 shadow-hard relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute top-0 left-0 w-full h-4 bg-purple/20"></div>
            <div className="absolute top-0 right-12 w-16 h-24 bg-purple/20 rounded-b-lg"></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-20 h-20 bg-purple rounded-2xl border-3 border-border flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-4xl text-white">💝</span>
              </div>

              <h3 className="text-3xl font-black mb-4 text-purple tracking-tight">
                寄付・賛助会員
              </h3>

              <p className="text-lg font-medium text-gray-600 leading-relaxed mb-8 flex-grow">
                私たちの活動は、皆様からの温かいご支援によって支えられています。
                継続的なご支援で、子どもたちの居場所を守ってください。
              </p>

              <Link
                href="/support"
                className="inline-block w-full text-center px-8 py-4 bg-purple text-white border-3 border-border rounded-xl font-black text-lg shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                支援について詳しく見る
              </Link>
            </div>
          </div>

          {/* Recruit - Team Theme */}
          <div className="bg-white border-3 border-border rounded-3xl p-8 md:p-12 shadow-hard relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-20 h-20 bg-yellow rounded-2xl border-3 border-border flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-4xl text-text">🤝</span>
              </div>

              <h3 className="text-3xl font-black mb-4 text-text tracking-tight">スタッフ募集</h3>

              <p className="text-lg font-medium text-gray-600 leading-relaxed mb-8 flex-grow">
                私たちと一緒に活動してくれる仲間を募集しています。
                子どもたちの成長を近くで見守り、共に学び合う仕事です。
              </p>

              <Link
                href="/recruit"
                className="inline-block w-full text-center px-8 py-4 bg-yellow text-text border-3 border-border rounded-xl font-black text-lg shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                採用情報を見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
