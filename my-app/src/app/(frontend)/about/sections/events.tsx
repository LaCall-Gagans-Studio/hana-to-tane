import React from 'react'
import Image from 'next/image'

export const Events = () => {
  const events = [
    '川遊び',
    '草木染め',
    '防災教室',
    '星空観察会',
    '雪遊び',
    '焚き火クッキング',
    '味噌作り',
  ]

  return (
    <section className="py-12 md:py-24 bg-pink relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_3px,transparent_3px)] bg-size-[20px_20px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="inline-block text-4xl md:text-7xl font-black text-white mb-6 drop-shadow-[4px_4px_0px_var(--color-border)] tracking-tighter">
            たねラボ
          </h1>
        </div>

        <div className="bg-white rounded-3xl md:rounded-[40px] border-4 border-border shadow-hard-lg p-6 md:p-16 max-w-5xl mx-auto mb-8 md:mb-16">
          <p className="text-lg md:text-xl font-bold text-center text-gray-700 leading-relaxed mb-8 md:mb-12">
            フリースクール入会の有無に関わらず、家族で参加できるイベントです。
            <br />
            体験の中から学ぶ。ご家族で体験したり、遊んだり。
          </p>

          <div className="text-center mb-12">
            <div className="inline-block bg-yellow px-8 py-3 rounded-full border-3 border-border shadow-hard transform">
              <span className="font-black text-text text-lg">
                月に１回程度、土日祝に開催しています
              </span>
            </div>
          </div>

          <p className="text-center font-bold text-gray-500 mb-12">
            詳しくは、当サイト、インスタグラム、Facebook、公式LINEにてお知らせ中。
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {events.map((ev, i) => (
              <span
                key={i}
                className="inline-block px-4 py-2 md:px-6 md:py-3 bg-blue text-white font-black rounded-xl border-3 border-border shadow-sm transform hover:-translate-y-1 hover:shadow-md transition-all cursor-default"
              >
                {ev}
              </span>
            ))}
          </div>

          <Image
            src="https://media.istockphoto.com/id/2164186064/ja/%E3%82%B9%E3%83%88%E3%83%83%E3%82%AF%E3%83%95%E3%82%A9%E3%83%88/%E8%A6%8B%E6%9C%AC%E5%B8%82%E4%BC%9A%E5%A0%B4%E3%81%AE%E5%AE%B6%E6%97%8F%E3%81%AE%E5%8F%8B%E4%BA%BA.jpg?s=612x612&w=0&k=20&c=88rbpasCugbcOLx_FdlF2ur9N8smx89UpNRdC3HQ8jo="
            alt="プレーパーク"
            width={1000}
            height={700}
            className="rounded-3xl mt-8"
          />
        </div>

        {/* Dialogue */}
        <div className="max-w-3xl mx-auto grid gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full border-2 border-border flex-shrink-0 shadow-sm flex items-center justify-center text-xl">
              🌸
            </div>
            <div className="bg-white/90 px-6 py-3 rounded-2xl border-2 border-border shadow-sm">
              <p className="font-bold text-sm md:text-base">
                他にも、いろいろとみなさんに楽しんでいただける
                <br />
                イベントや活動を考えています。
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-row-reverse">
            <div className="w-12 h-12 bg-blue rounded-full border-2 border-border flex-shrink-0 shadow-sm flex items-center justify-center text-xl">
              🌱
            </div>
            <div className="bg-white/90 px-6 py-3 rounded-2xl border-2 border-border shadow-sm">
              <p className="font-bold text-sm md:text-base">
                これからも、はなとたねをよろしくお願いします。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
