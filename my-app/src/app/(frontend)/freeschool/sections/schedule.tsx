import React from 'react'

export const Schedule = () => {
  const schedule = [
    { time: '9:00', label: '送迎開始', icon: '🚗' },
    { time: '10:00', label: '登校・朝の会', icon: '🏫' },
    { time: '11:00', label: '野外学習・体験・調理', icon: '🍳' },
    { time: '14:30', label: '振り返り・掃除', icon: '🧹' },
    { time: '15:00', label: '下校・送迎', icon: '👋' },
  ]

  return (
    <section className="py-24 bg-surface relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-text inline-block border-b-4 border-blue pb-2">
            DAILY SCHEDULE
          </h2>
          <p className="mt-4 font-bold text-gray-500">1日の流れ</p>
        </div>

        <div className="max-w-2xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2 border-l-2 border-dashed border-gray-300"></div>

          <div className="space-y-8">
            {schedule.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-6 md:gap-12 relative ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Time Bubble */}
                <div className="w-16 h-16 md:w-24 md:h-24 bg-blue text-white rounded-full border-3 border-border flex items-center justify-center font-black text-sm md:text-xl shadow-hard z-10 flex-shrink-0">
                  {s.time}
                </div>

                {/* Content Card */}
                <div className="flex-1 bg-white p-6 rounded-2xl border-3 border-border shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="font-bold text-lg md:text-xl text-text">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
