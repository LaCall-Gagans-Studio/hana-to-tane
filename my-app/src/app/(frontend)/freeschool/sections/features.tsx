import React from 'react'

export const Features = () => {
  const features = [
    {
      title: '自然が豊か',
      desc: '川遊びやスキーなど、四季折々の自然体験',
      color: 'bg-green',
      icon: '🌲',
    },
    {
      title: '学校施設を活用',
      desc: '元小学校の図書室や体育館で広々活動',
      color: 'bg-blue',
      icon: '🏫',
    },
    {
      title: '体験学習が豊富',
      desc: '職業体験、ドローン、プログラミングなど',
      color: 'bg-pink',
      icon: '🎨',
    },
    { title: '自宅送迎あり', desc: 'スタッフがご自宅まで送迎します', color: 'bg-lime', icon: '🚗' },
    {
      title: 'スクールドッグ',
      desc: '犬やうさぎなど、命との触れ合い',
      color: 'bg-yellow',
      icon: '🐶',
    },
  ]

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_2px,transparent_2px)] bg-size-[20px_20px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-black mb-2 tracking-tight drop-shadow-[4px_4px_0px_var(--color-primary)]">
            FEATURES
          </h2>
          <p className="font-bold text-gray-400">いっぽの特徴</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              className={`p-8 rounded-3xl border-3 border-border shadow-hard transform transition-all hover:-translate-y-2 hover:shadow-hard-lg ${f.color} group relative overflow-hidden`}
            >
              <div className="absolute -right-4 -bottom-4 text-8xl opacity-20 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>

              <div className="w-16 h-16 bg-white rounded-2xl border-3 border-border flex items-center justify-center text-4xl shadow-sm mb-6 relative z-10">
                {f.icon}
              </div>

              <h3 className="text-2xl font-black text-text mb-4 relative z-10">{f.title}</h3>
              <p className="font-bold text-text/80 relative z-10 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
