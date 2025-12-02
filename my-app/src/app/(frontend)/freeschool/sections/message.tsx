import React from 'react'

export const Message = () => {
  return (
    <section className="py-24 bg-pink relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_3px,transparent_3px)] bg-size-[20px_20px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white rounded-[3rem] border-4 border-border shadow-hard-lg p-8 md:p-16 max-w-4xl mx-auto relative">
          {/* Stamp Decoration */}
          <div className="absolute top-8 right-8 w-24 h-24 border-4 border-pink/30 rounded-full flex items-center justify-center transform rotate-12 opacity-50 pointer-events-none">
            <span className="text-pink/30 font-black text-xl">MESSAGE</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-text leading-tight">
            フリースクールは
            <br />
            <span className="text-pink border-b-4 border-pink/30">心の病院</span>
          </h2>

          <div className="prose prose-lg max-w-none font-medium text-gray-700 leading-loose text-center mb-12">
            <p>
              心も風邪をひくことがある。
              <br />
              誰でもいつでもなる可能性がある。
            </p>
            <p>
              風邪の時に行ける病院が自分の街にあると思ったら、
              <br className="hidden md:block" />
              安心して生活できるのと同じように、
              <br />
              心が風邪ひいたら、いつでも治しに行ける場所があると思うと
              <br className="hidden md:block" />
              安心して学校に向かえる。
            </p>
            <p className="font-bold text-xl text-text">そんな場所がいっぽです。</p>
            <p>
              また、心が風邪をひいたら、いつでも来て、
              <br className="hidden md:block" />
              治ったらまた元気になれるよ。
              <br />
              そんな安心感で子ども達が生活できるように、
              <br className="hidden md:block" />
              いつでも存在している「いっぽ」でありたい。
            </p>
          </div>

          <div className="text-center border-t-2 border-dashed border-gray-300 pt-8">
            <p className="font-bold text-lg text-gray-500 mb-1">NPO法人はなとたね 代表</p>
            <p className="font-black text-2xl text-text">河上 美穂</p>
          </div>
        </div>

        <div className="text-center mt-16">
          <a
            href="#"
            className="inline-block px-10 py-4 bg-yellow text-text border-3 border-border rounded-full font-black text-xl shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            お問い合わせ・相談予約
          </a>
        </div>
      </div>
    </section>
  )
}
