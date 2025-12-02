import React from 'react'

type PlayParkProps = {
  description?: string | null
}

export const PlayPark = ({ description }: PlayParkProps) => {
  return (
    <section id="playpark" className="py-24 bg-lime relative overflow-hidden">
      {/* Background Pattern - Organic Shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-white text-lime font-black rounded-full border-2 border-border mb-4 shadow-sm">
            PLAY PARK
          </span>
          <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md">自然の中の遊び場</h2>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-[4px_4px_0px_var(--color-border)]">
            たねラボ プレーパーク<span className="text-2xl ml-2 opacity-90">（計画中）</span>
          </h1>
        </div>

        <div className="bg-white rounded-[40px] border-4 border-border shadow-hard-lg p-8 md:p-16 max-w-4xl mx-auto mb-16 relative overflow-hidden">
          {/* Decorative Leaf */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-lime/20 rounded-full blur-xl"></div>

          <p className="text-xl font-bold text-center text-gray-700 leading-relaxed mb-12">
            {description || (
              <>
                ０歳から大人まで、自然の中でゆったりと過ごして、
                <br className="hidden md:block" />
                色んな人とつながれる場所。
                <br />
                コーヒーを飲んだり、音楽を聴いたり、子育ての悩みを話したり。
              </>
            )}
          </p>

          <div className="bg-lime/10 rounded-3xl p-8 md:p-10 border-3 border-border mb-12 relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-lime rounded-full border-3 border-border flex items-center justify-center text-2xl shadow-sm">
              🌳
            </div>
            <h3 className="text-2xl font-black text-center mb-6 text-text mt-4">
              プレーパークって？
            </h3>
            <p className="font-bold text-gray-700 leading-relaxed mb-6">
              従来の公園、既成のブランコ、シーソー、鉄棒などがあるような遊び場と違い、子ども達が想像力で工夫して遊びを作りだすことのできる遊び場。
            </p>
            <p className="font-black text-center text-2xl text-lime drop-shadow-sm">
              木登り、どろんこ、大歓迎。
            </p>
          </div>

          <div className="text-center text-sm font-bold text-gray-400">（写真はイメージです）</div>
        </div>

        {/* Dialogue */}
        <div className="max-w-3xl mx-auto grid gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-pink rounded-full border-2 border-border flex-shrink-0 shadow-sm"></div>
            <div className="bg-white px-6 py-3 rounded-2xl rounded-tl-none border-2 border-border shadow-sm">
              <p className="font-bold text-sm md:text-base">
                プレーパークは全国に整備されつつある、みんなの居場所です。
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-row-reverse">
            <div className="w-12 h-12 bg-blue rounded-full border-2 border-border flex-shrink-0 shadow-sm"></div>
            <div className="bg-white px-6 py-3 rounded-2xl rounded-tr-none border-2 border-border shadow-sm">
              <p className="font-bold text-sm md:text-base">
                鳥取でもプレーパークでみんなが楽しむことができるよう
                <br />
                がんばって整備をすすめていきたいと思います。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
