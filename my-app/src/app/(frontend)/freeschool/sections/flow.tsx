import React from 'react'

export const Flow = () => {
  const steps = [
    { num: 1, title: '初回ご相談', desc: 'オンライン・対面・LINE等で', icon: '💬' },
    { num: 2, title: '見学', desc: '保護者のみでもOK', icon: '👀' },
    { num: 3, title: '無料体験', desc: '親子で体験参加', icon: '✨' },
    { num: 4, title: '懇談', desc: '最適な選択肢を一緒に考えます', icon: '🤝' },
    { num: 5, title: 'ご入会', desc: '新しい環境でのスタート', icon: '🎉' },
  ]

  return (
    <section className="py-24 bg-surface relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-text inline-block border-b-4 border-yellow pb-2">
            FLOW
          </h2>
          <p className="mt-4 font-bold text-gray-500">入会までの流れ</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="relative group">
              {/* Arrow for next step */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 text-4xl text-gray-300 font-black z-0">
                  →
                </div>
              )}

              <div className="w-64 bg-white p-6 rounded-3xl border-3 border-border shadow-hard hover:shadow-hard-lg transition-all hover:-translate-y-2 relative z-10 text-center h-full flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow rounded-full border-3 border-border flex items-center justify-center text-2xl font-black text-text shadow-sm mb-6 absolute -top-8">
                  {s.num}
                </div>

                <div className="mt-6 mb-4 text-4xl">{s.icon}</div>

                <h3 className="text-xl font-black text-text mb-2">{s.title}</h3>
                <p className="text-sm font-bold text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
