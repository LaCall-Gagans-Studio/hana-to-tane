import React from 'react'

export const Concept = () => {
  const activities = [
    { text: '畑で野菜作り', color: 'bg-lime', rotate: '-rotate-2' },
    { text: '木の実採り', color: 'bg-yellow', rotate: 'rotate-1' },
    { text: '工作', color: 'bg-blue', rotate: '-rotate-1' },
    { text: '楽器演奏', color: 'bg-pink', rotate: 'rotate-2' },
    { text: '読書', color: 'bg-purple', rotate: '-rotate-2' },
    { text: '勉強', color: 'bg-lime', rotate: 'rotate-1' },
    { text: 'ボードゲーム', color: 'bg-yellow', rotate: '-rotate-1' },
    { text: '料理', color: 'bg-blue', rotate: 'rotate-2' },
    { text: '裁縫', color: 'bg-pink', rotate: '-rotate-2' },
    { text: '動物のお世話', color: 'bg-purple', rotate: 'rotate-1' },
  ]

  return (
    <section className="py-24 bg-yellow relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_4px,transparent_4px)] bg-size-[30px_30px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-text mb-8 tracking-tight">
            はなとたねってどんなところ？
          </h2>
          <div className="inline-block bg-white px-8 py-4 rounded-2xl border-3 border-border shadow-hard transform -rotate-1">
            <p className="text-xl md:text-2xl font-black text-text">
              子どもも大人も
              <br className="md:hidden" />
              心地よく居られる場所
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-20 max-w-5xl mx-auto">
          {activities.map((act, i) => (
            <span
              key={i}
              className={`px-6 py-3 ${act.color} text-text font-black rounded-full border-3 border-border shadow-sm transform ${act.rotate} hover:scale-110 hover:rotate-0 transition-all cursor-default`}
            >
              {act.text}
            </span>
          ))}
        </div>

        <div className="text-center mb-20">
          <h3 className="text-3xl md:text-4xl font-black text-text mb-4 leading-tight">
            やりたいこと、やってみたいことが
            <br />
            <span className="inline-block border-b-4 border-white pb-1">できる場所</span>
          </h3>
          <h3 className="text-3xl md:text-4xl font-black text-blue drop-shadow-sm">
            一緒にやる仲間がいる場所
          </h3>
        </div>

        {/* Dialogue */}
        <div className="max-w-3xl mx-auto grid gap-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-pink rounded-full border-3 border-border flex-shrink-0 shadow-sm"></div>
            <div className="bg-white p-6 rounded-3xl rounded-tl-none border-3 border-border shadow-hard flex-1 relative">
              <p className="font-bold text-lg text-text">
                やりたいことがなんでもできる場所。
                <br />
                それが「はなとたね」です。
              </p>
            </div>
          </div>
          <div className="flex items-start gap-6 flex-row-reverse">
            <div className="w-16 h-16 bg-blue rounded-full border-3 border-border flex-shrink-0 shadow-sm"></div>
            <div className="bg-white p-6 rounded-3xl rounded-tr-none border-3 border-border shadow-hard flex-1 relative">
              <p className="font-bold text-lg text-text">
                子どもだけじゃなく、大人も楽しめる場所。
                <br />
                そんな居場所を作っていきます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
