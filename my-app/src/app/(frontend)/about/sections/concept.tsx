import React from 'react'

type ConceptProps = {
  data?: {
    title?: string | null
    subtitle?: string | null
    description_1?: string | null
    description_2?: string | null
    activities?:
      | {
          text?: string | null
          color?: ('bg-lime' | 'bg-yellow' | 'bg-blue' | 'bg-pink' | 'bg-purple') | null
          id?: string | null
        }[]
      | null
  } | null
}

export const Concept = ({ data }: ConceptProps) => {
  if (!data) return null

  const activities = data.activities || []

  return (
    <section className="py-24 bg-yellow relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_4px,transparent_4px)] bg-size-[30px_30px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-text mb-8 tracking-tight">
            {data.title || 'はなとたねってどんなところ？'}
          </h2>
          <div className="inline-block bg-white px-8 py-4 rounded-2xl border-3 border-border shadow-hard transform">
            <p className="text-xl md:text-2xl font-black text-text whitespace-pre-wrap">
              {data.subtitle || '子どもも大人も\n心地よく居られる場所'}
            </p>
          </div>
        </div>

        {activities.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-20 max-w-5xl mx-auto">
            {activities.map((act, i) => (
              <span
                key={act.id || i}
                className={`px-6 py-3 ${
                  act.color || 'bg-white'
                } text-text font-black rounded-full border-3 border-border shadow-sm transform ${
                  i % 2 === 0 ? 'rotate-1' : '-rotate-1'
                } hover:scale-110 hover:rotate-0 transition-all cursor-default`}
              >
                {act.text}
              </span>
            ))}
          </div>
        )}

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
          {data.description_1 && (
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-pink rounded-full border-3 border-border flex-shrink-0 shadow-sm"></div>
              <div className="bg-white p-6 rounded-3xl rounded-tl-none border-3 border-border shadow-hard flex-1 relative">
                <p className="font-bold text-lg text-text whitespace-pre-wrap">
                  {data.description_1}
                </p>
              </div>
            </div>
          )}
          {data.description_2 && (
            <div className="flex items-start gap-6 flex-row-reverse">
              <div className="w-16 h-16 bg-blue rounded-full border-3 border-border flex-shrink-0 shadow-sm"></div>
              <div className="bg-white p-6 rounded-3xl rounded-tr-none border-3 border-border shadow-hard flex-1 relative">
                <p className="font-bold text-lg text-text whitespace-pre-wrap">
                  {data.description_2}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
