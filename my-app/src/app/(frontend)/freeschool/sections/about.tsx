import React from 'react'

export const About = () => {
  return (
    <section className="py-24 bg-surface relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-blue tracking-tight mb-2">WHAT IS IPPO?</h2>
          <p className="font-bold text-gray-400">いっぽについて</p>
        </div>

        <div className="bg-white rounded-[3rem] border-3 border-border shadow-hard-lg p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
          {/* Decorative Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow/80 rotate-1 shadow-sm"></div>

          <h3 className="text-2xl md:text-3xl font-black text-center mb-8 text-text leading-relaxed">
            自然の中で、
            <br className="md:hidden" />
            自分らしく。
          </h3>

          <p className="text-lg font-medium text-gray-600 leading-loose mb-12 text-center">
            『森の子がっこういっぽ』は、鳥取県教育委員会をはじめ、
            <br className="hidden md:block" />
            鳥取市教育委員会に認定された学校以外の「相談の場」、そして「学びの場」です。
            <br />
            自然体験をとおし児童生徒一人ひとりを大事に、
            <br className="hidden md:block" />
            そして寄り添いながら所属の学校と連携しながらサポートしていきます。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-pink/10 p-6 rounded-2xl border-2 border-pink flex items-center gap-4">
              <div className="w-10 h-10 bg-pink rounded-full flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                ✓
              </div>
              <span className="font-bold text-text">通所費等の補助対象</span>
            </div>
            <div className="bg-blue/10 p-6 rounded-2xl border-2 border-blue flex items-center gap-4">
              <div className="w-10 h-10 bg-blue rounded-full flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                ✓
              </div>
              <span className="font-bold text-text">学校の出席扱い認定実績あり</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
