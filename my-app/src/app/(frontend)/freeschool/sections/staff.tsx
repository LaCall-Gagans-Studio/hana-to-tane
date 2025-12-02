import React from 'react'

export const Staff = () => {
  const staff = [
    {
      name: 'みほちゃん',
      role: '代表',
      desc: '保育士・スクールソーシャルワーカー。3人の子育て中。動物や植物が大好き！',
      color: 'bg-pink',
      icon: '🌸',
    },
    {
      name: 'けいちゃん',
      role: '副代表',
      desc: '元不登校児の経験を持つ。スクールドッグハンドラー、心理カウンセラー。',
      color: 'bg-blue',
      icon: '🌱',
    },
    {
      name: 'ゆうキャン',
      role: 'スタッフ',
      desc: '元塾講師。釣り歴27年のアウトドア派。学習指導を担当。',
      color: 'bg-green',
      icon: '🎣',
    },
    {
      name: 'テディ & おもち',
      role: 'スクールドッグ & うさぎ',
      desc: 'みんなの人気者。食いしん坊で癒やしの存在。',
      color: 'bg-yellow',
      icon: '🐶',
    },
  ]

  return (
    <section className="py-24 bg-surface relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-text inline-block border-b-4 border-lime pb-2">
            STAFF
          </h2>
          <p className="mt-4 font-bold text-gray-500">スタッフ紹介</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {staff.map((s, i) => (
            <div
              key={i}
              className={`bg-white p-6 rounded-3xl border-3 border-border shadow-hard transform transition-all hover:-translate-y-2 hover:shadow-hard-lg ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0`}
            >
              <div
                className={`w-24 h-24 mx-auto ${s.color} rounded-full border-3 border-border flex items-center justify-center text-4xl shadow-sm mb-6`}
              >
                {s.icon}
              </div>

              <h3 className="text-xl font-black text-center mb-2 text-text">{s.name}</h3>
              <p className="text-xs font-bold text-center text-gray-500 mb-4 bg-gray-100 inline-block px-3 py-1 rounded-full mx-auto block w-fit">
                {s.role}
              </p>
              <p className="text-sm font-medium text-gray-600 text-center leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
